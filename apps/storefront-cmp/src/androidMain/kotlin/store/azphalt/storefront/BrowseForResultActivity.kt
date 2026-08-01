package store.azphalt.storefront

import android.app.Activity
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import main.StorefrontApp
import models.HandoffSession
import models.PackageSummary
import network.downloadPackage
import network.fetchRegistryList
import theme.AzphaltExpressiveTheme

/**
 * The store as another app opens it: browse, pick, and hand the verified bytes back.
 *
 * The browsing surface here is [StorefrontApp] — the identical storefront [MainActivity] shows, with
 * a [HandoffSession] attached. It used to be a bespoke list, and the result was that arriving from a
 * host dropped you into a visibly poorer store than the one you would have opened yourself. Who is
 * asking, and where the bytes go, are the only things a browse request actually changes.
 *
 * Every exit from this activity is a result. A host launched it with `startActivityForResult` and is
 * sitting in its own `onActivityResult` waiting; finishing without one leaves it waiting on a callback
 * that never arrives, which is worse than a clean cancel.
 */
class BrowseForResultActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // This entry point renders the same shared UI as MainActivity, so it needs the same context
        // installed — a user who reaches a detail screen through a host's browse request can still
        // press Install (network/AndroidHandoff.kt).
        network.AndroidAppContext.install(this)
        enableEdgeToEdge()

        val request = BrowseRequest.from(intent)
        if (request == null) {
            // `app` is required (spec/store-app.md § The request). Without it there is no scoping and
            // no way to tell the user who is asking, so refuse rather than guess.
            setResult(Activity.RESULT_CANCELED)
            finish()
            return
        }

        // Default to cancelled. If this activity dies for any reason before a selection completes —
        // the user backs out, the process is killed, something throws — the host gets a clean no-op
        // instead of a silent hang.
        setResult(Activity.RESULT_CANCELED)

        setContent {
            AzphaltExpressiveTheme {
                HandoffFlow(
                    request = request,
                    callerLabel = callerLabel(),
                    onAcquired = { acquired ->
                        val result = handoffResult(this, listOf(acquired))
                        result.data?.let { grantTo(this, callingPackage, it) }
                        setResult(Activity.RESULT_OK, result)
                        finish()
                    },
                    onCancel = {
                        setResult(Activity.RESULT_CANCELED)
                        finish()
                    },
                )
            }
        }
    }

    /**
     * A human-readable name for the app that launched this.
     *
     * The spec asks the store to show who it is acting for, and `callingPackage` is the only value
     * here the caller cannot forge — the `app` extra is just a string they typed. Falling back to the
     * extra when the caller is unknown is a display convenience, not an identity claim.
     */
    private fun callerLabel(): String? {
        val pkg = callingPackage ?: return null
        return runCatching {
            val pm = packageManager
            pm.getApplicationLabel(pm.getApplicationInfo(pkg, 0)).toString()
        }.getOrNull() ?: pkg
    }
}

@Composable
private fun HandoffFlow(
    request: BrowseRequest,
    callerLabel: String?,
    onAcquired: (AcquiredPackage) -> Unit,
    onCancel: () -> Unit,
) {
    // The package the user pressed Install on, while it is being bought / downloaded / verified.
    var acquiring by remember { mutableStateOf<PackageSummary?>(null) }
    var failure by remember { mutableStateOf<String?>(null) }

    val session = remember(request, callerLabel) {
        HandoffSession(
            callerLabel = callerLabel,
            load = {
                try {
                    val all = fetchRegistryList(
                        app = request.app,
                        mediaDomains = request.mediaDomains,
                        kinds = request.kinds,
                        repository = request.repository,
                    )
                    // Filter again locally. The repository applies `app` scoping itself, but `kinds`
                    // and `mediaDomains` are this app's promise to the host, and a repository that
                    // ignores a query parameter must not turn into the store returning something the
                    // host cannot run.
                    all.filter { request.accepts(it.kind, it.mediaDomains, it.targetApps) }
                } catch (e: Exception) {
                    // The storefront treats a failed load as an empty catalogue, which on its own
                    // would leave the user staring at a store with nothing in it and no reason given.
                    failure = e.message ?: "could not reach the repository"
                    emptyList()
                }
            },
            acquire = { pkg -> acquiring = pkg },
            cancel = onCancel,
        )
    }

    Box(Modifier.fillMaxSize()) {
        StorefrontApp(hostInventory = request.inventory, handoff = session)

        // Over the storefront rather than instead of it: the catalogue the user was just looking at
        // stays put behind this, so a failed or cancelled purchase returns them exactly where they
        // were with no refetch.
        acquiring?.let { pkg ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(MaterialTheme.colorScheme.scrim.copy(alpha = 0.7f)),
                contentAlignment = Alignment.Center,
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                    modifier = Modifier.padding(32.dp),
                ) {
                    CircularProgressIndicator(color = MaterialTheme.colorScheme.primary)
                    Text(
                        "Verifying ${pkg.name}…",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface,
                    )
                }
            }
        }
    }

    failure?.let { message ->
        AlertDialog(
            onDismissRequest = { failure = null },
            confirmButton = {
                TextButton(onClick = { failure = null }, shape = RectangleShape) { Text("OK") }
            },
            title = { Text("Couldn't finish") },
            text = { Text(message) },
        )
    }

    // Purchase (if paid), download, verify — all off the main thread — then hand back.
    val context = androidx.compose.ui.platform.LocalContext.current
    LaunchedEffect(acquiring) {
        val pkg = acquiring ?: return@LaunchedEffect
        try {
            // A paid package needs an entitlement before the repository will serve its bytes, and on
            // Play that entitlement can only come from a Play purchase.
            val entitlement = if (pkg.priceStatus == "paid") {
                val activity = context as? Activity
                    ?: return@LaunchedEffect run {
                        failure = "no activity for the purchase flow"
                        acquiring = null
                    }
                when (val outcome = Billing(context).purchase(activity, pkg.id, request.repository)) {
                    is PurchaseOutcome.Entitled -> outcome.entitlementToken
                    // Backing out of a purchase returns to the catalogue, not to an error — the user
                    // did not fail at anything, they changed their mind.
                    is PurchaseOutcome.Cancelled -> return@LaunchedEffect run { acquiring = null }
                    is PurchaseOutcome.Failed -> return@LaunchedEffect run {
                        failure = outcome.message
                        acquiring = null
                    }
                }
            } else {
                null
            }

            val downloaded = withContext(Dispatchers.IO) {
                downloadPackage(pkg.id, pkg.version, request.repository, entitlement)
            }
            val acquired = withContext(Dispatchers.IO) {
                stageForHandoff(
                    context,
                    downloaded.bytes,
                    downloaded.integrity,
                    downloaded.entitlement,
                    downloaded.reportToken,
                )
            }
            onAcquired(acquired)
        } catch (e: Exception) {
            failure = e.message ?: "verification failed"
            acquiring = null
        }
    }
}
