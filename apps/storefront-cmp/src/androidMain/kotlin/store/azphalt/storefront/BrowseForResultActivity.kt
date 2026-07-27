package store.azphalt.storefront

import android.app.Activity
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import models.PackageSummary
import network.downloadPackage
import network.fetchRegistryList
import theme.AzphaltExpressiveTheme

/**
 * The store as another app opens it: browse, pick, and hand the verified bytes back.
 *
 * Every exit from this activity is a result. A host launched it with `startActivityForResult` and is
 * sitting in its own `onActivityResult` waiting; finishing without one leaves it waiting on a callback
 * that never arrives, which is worse than a clean cancel.
 */
class BrowseForResultActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
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

private sealed interface Phase {
    data object Loading : Phase
    data class Browsing(val packages: List<PackageSummary>) : Phase
    data class Fetching(val pkg: PackageSummary) : Phase
    data class Failed(val message: String) : Phase
}

@Composable
private fun HandoffFlow(
    request: BrowseRequest,
    callerLabel: String?,
    onAcquired: (AcquiredPackage) -> Unit,
    onCancel: () -> Unit,
) {
    var phase by remember { mutableStateOf<Phase>(Phase.Loading) }
    // Held separately from `phase` so cancelling a purchase can return to the list without refetching.
    var browsed by remember { mutableStateOf<List<PackageSummary>>(emptyList()) }

    LaunchedEffect(request) {
        phase = try {
            val all = fetchRegistryList(
                app = request.app,
                mediaDomains = request.mediaDomains,
                kinds = request.kinds,
                repository = request.repository,
            )
            // Filter again locally. The repository applies `app` scoping itself, but `kinds` and
            // `mediaDomains` are this app's promise to the host, and a repository that ignores a query
            // parameter must not turn into the store returning something the host cannot run.
            browsed = all.filter { request.accepts(it.kind, it.mediaDomains, it.targetApps) }
            Phase.Browsing(browsed)
        } catch (e: Exception) {
            Phase.Failed(e.message ?: "could not reach the repository")
        }
    }

    Scaffold(containerColor = MaterialTheme.colorScheme.background) { padding ->
        Box(Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) {
            when (val p = phase) {
                is Phase.Loading -> CircularProgressIndicator()

                is Phase.Failed -> Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.padding(32.dp),
                ) {
                    Text("Couldn't load the store", style = MaterialTheme.typography.titleMedium)
                    Text(p.message, style = MaterialTheme.typography.bodySmall, textAlign = TextAlign.Center)
                }

                is Phase.Fetching -> Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                ) {
                    CircularProgressIndicator()
                    Text("Verifying ${p.pkg.name}…", style = MaterialTheme.typography.bodyMedium)
                }

                is Phase.Browsing -> HandoffPicker(
                    packages = p.packages,
                    callerLabel = callerLabel,
                    onCancel = onCancel,
                    onPick = { pkg ->
                        phase = Phase.Fetching(pkg)
                    },
                )
            }
        }
    }

    // Purchase (if paid), download, verify — all off the main thread — then hand back.
    val fetching = (phase as? Phase.Fetching)?.pkg
    val context = androidx.compose.ui.platform.LocalContext.current
    LaunchedEffect(fetching) {
        val pkg = fetching ?: return@LaunchedEffect
        phase = try {
            // A paid package needs an entitlement before the repository will serve its bytes, and on
            // Play that entitlement can only come from a Play purchase.
            val entitlement = if (pkg.priceStatus == "paid") {
                val activity = context as? Activity
                    ?: return@LaunchedEffect run { phase = Phase.Failed("no activity for the purchase flow") }
                when (val outcome = Billing(context).purchase(activity, pkg.id, request.repository)) {
                    is PurchaseOutcome.Entitled -> outcome.entitlementToken
                    // Backing out of a purchase returns to the list, not to an error screen — the user
                    // did not fail at anything, they changed their mind.
                    is PurchaseOutcome.Cancelled -> return@LaunchedEffect run { phase = Phase.Browsing(browsed) }
                    is PurchaseOutcome.Failed -> return@LaunchedEffect run { phase = Phase.Failed(outcome.message) }
                }
            } else {
                null
            }

            val downloaded = withContext(Dispatchers.IO) {
                downloadPackage(pkg.id, pkg.version, request.repository, entitlement)
            }
            val acquired = withContext(Dispatchers.IO) {
                stageForHandoff(context, downloaded.bytes, downloaded.integrity, downloaded.entitlement)
            }
            onAcquired(acquired)
            return@LaunchedEffect
        } catch (e: Exception) {
            Phase.Failed(e.message ?: "verification failed")
        }
    }
}
