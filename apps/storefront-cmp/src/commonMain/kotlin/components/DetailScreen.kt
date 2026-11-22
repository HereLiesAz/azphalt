package components

import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import models.CheckoutResponse
import models.installCount
import models.ExtensionState
import models.ExtensionStateEntry
import models.HostOption
import models.NotInstalled
import models.RequiredAction
import models.isInstalled
import models.notInstalledStateFor
import models.requiredActionsFor
import models.statusLineFor
import models.LocalHostInventory
import models.PackageSummary
import models.hostsFor
import network.attemptHandoff
import network.handoffUri
import network.startCheckout
import network.submitIpClaim
import network.submitRating
import network.submitReport
import theme.Hues
import theme.Ground
import theme.Roles
import theme.CapsuleShape
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.ui.graphics.Color
import theme.azTurnstileEntrance
import util.formatCount
import util.formatRating

/** A full-screen detail view for one package: a big animated hero, metadata, ratings, and actions. */
@Composable
fun DetailScreen(
    pkg: PackageSummary,
    catalog: List<PackageSummary>,
    ageConfirmed: Boolean,
    onConfirmAge: () -> Unit,
    onBack: () -> Unit,
    /** A host took the link. The store records it so the catalog can show and filter on it. */
    onHandedOff: (PackageSummary) -> Unit = {},
    /** The user says the store's record is wrong. See `models.forgetInstall`. */
    onForget: (PackageSummary) -> Unit = {},
    /**
     * Set when the store is browsing on another app's behalf (`models/HandoffSession.kt`): take this
     * package and hand it back to whoever asked.
     *
     * When present it replaces both of the standalone actions — the `azphalt://install` link and the
     * web checkout. A host that launched the store with `startActivityForResult` is sitting in its
     * own callback waiting for verified bytes; firing a scheme at whatever else on the device happens
     * to claim it would answer a question nobody asked, and leave the caller waiting.
     */
    onAcquire: ((PackageSummary) -> Unit)? = null,
) {
    val cs = MaterialTheme.colorScheme

    // A developer-flagged 18+ package shows an age gate before its detail (belt-and-suspenders — the
    // card gate normally confirms first, but a deep link could land here directly).
    if (pkg.isMature && !ageConfirmed) {
        Column(
            modifier = Modifier.fillMaxSize().background(Ground.Spread).padding(32.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Pill("18+", Roles.Acquire.first)
            Spacer(Modifier.height(16.dp))
            Text("Mature content", style = MaterialTheme.typography.headlineSmall, color = cs.onBackground)
            Spacer(Modifier.height(8.dp))
            Text(
                "“${pkg.name}” is flagged 18+ by its developer.",
                style = bodyStyle,
                textAlign = TextAlign.Center,
            )
            Spacer(Modifier.height(24.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Capsule(label = "Back", background = Ground.Ink, labelSize = 11, height = 34.dp, onClick = onBack)
                Button(
                    onClick = onConfirmAge,
                    shape = CapsuleShape.Full,
                    colors = ButtonDefaults.buttonColors(containerColor = cs.secondary, contentColor = cs.onSecondary),
                ) { Text("I'm 18 or older", fontWeight = FontWeight.Bold) }
            }
        }
        return
    }

    val (container, onContainer) = paletteFor(pkg.id)
    // A still frame, not a loop. The preview used to animate forever; "nothing moves at rest" is a
    // rule of the system, and a permanently-running canvas is the loudest way to break it.
    val phase = STILL_FRAME
    val scope = rememberCoroutineScope()
    var busy by remember { mutableStateOf(false) }
    var dialogText by remember { mutableStateOf<String?>(null) }
    var showFlag by remember { mutableStateOf(false) }

    // The install fallback (spec/web-handoff.md § When no host is installed). Non-null once a handoff
    // attempt has come back with "nothing claimed it" — never shown pre-emptively, because on a device
    // that does have a host the user should simply arrive there.
    var noHost by remember(pkg.id) { mutableStateOf(false) }
    // The receipt, after a successful handoff. Empty until there is something true to put in it.
    var receipt by remember(pkg.id) { mutableStateOf<List<Pair<String, String>>>(emptyList()) }
    val hosts = remember(pkg.id, catalog) { hostsFor(pkg, catalog) }

    // Whether the store believes the viewer already has this — from a host's report where there is
    // one, otherwise from the store's own record (`models/LocalInventory.kt`).
    val entry = LocalHostInventory.current[pkg.id]
    // Installed and usable. `DOWNLOADED` and `FAILED` are not: counting them here is how a package that
    // had never been installed was offered as "Install again" and badged "Have".
    val held = isInstalled(entry)
    // What is not installed about this package, and so what the main button has to do. Null when it
    // is installed. One pure decision (`models/NotInstalled.kt`), the same on every platform.
    val missing = notInstalledStateFor(
        entry = entry,
        priceLabel = if (isPaid(pkg)) priceLabel(pkg) else null,
        packItems = pkg.pack?.entries?.size,
    )
    val primaryAction: RequiredAction? = missing?.let { requiredActionsFor(it, pkg.name).first() }
    // The last checkout failure, kept so the dialog can offer *Retry checkout* instead of only OK.
    var checkoutFailed by remember(pkg.id) { mutableStateOf(false) }

    /**
     * The web handoff — one implementation for the Install button and for the sheet's *Try again*.
     *
     * Shared rather than written twice, because written twice is what it was and the two copies had
     * already diverged: the retry attempted the handoff and then recorded nothing and said nothing,
     * so a user who had no host, installed one from the sheet, and pressed Try again — the most
     * likely first-ever install there is — succeeded in complete silence.
     *
     * One link shape for everything free, packs included: a pack is a package with an id and the host
     * resolves its members (`spec/web-handoff.md` § Packs). Nothing here names a host.
     */
    val handoff: () -> Unit = {
        scope.launch {
            busy = true
            val handed = attemptHandoff(handoffUri(pkg.id, pkg.version))
            // Only on "nothing claimed it". A user who left for a host and came back should not find
            // an apology waiting for them.
            noHost = !handed
            if (handed) {
                onHandedOff(pkg)
                // Only what the store actually observed: a host took the link, and it knows which
                // version it named. It did NOT witness the download, the digest check or the
                // signature — the host does those, out of sight. Claiming them would be a receipt
                // for work this side never watched happen.
                receipt = listOf(
                    "Sent to a host" to "Ok",
                    "Version" to pkg.version,
                    "Verified by the host" to "On arrival",
                )
                dialogText = "“${pkg.name}” was sent to your host. It'll show as installed here — " +
                    "if it didn't arrive, install it again."
            }
            busy = false
        }
    }

    /** What the main button does: buy if paid, hand back if acting for a caller, otherwise the handoff. */
    val installAction: () -> Unit = {
        when {
            // Acting for a caller: purchase (if paid), download, verify and return — all
            // of it driven by the entry point that owes the result.
            onAcquire != null -> onAcquire(pkg)
            isPaid(pkg) -> {
                scope.launch {
                    busy = true
                    checkoutFailed = false
                    val result = try {
                        startCheckout(pkg.id)
                    } catch (e: Exception) {
                        CheckoutResponse(error = e.message ?: "Checkout failed")
                    }
                    checkoutFailed = result.error != null
                    dialogText = result.error ?: result.message ?: "Checkout started."
                    busy = false
                }
            }
            else -> handoff()
        }
    }

    // Live rating state, seeded from the summary and updated when the viewer rates.
    var rating by remember(pkg.id) { mutableStateOf(pkg.rating) }
    var ratingCount by remember(pkg.id) { mutableStateOf(pkg.ratingCount) }
    var myStars by remember(pkg.id) { mutableStateOf(0) }
    var rateBusy by remember(pkg.id) { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Ground.Spread)
            .verticalScroll(rememberScrollState()),
    ) {
        Column(
            modifier = Modifier
                .widthIn(max = 880.dp)
                .align(Alignment.CenterHorizontally)
                .padding(24.dp),
        ) {
            Row(
                modifier = Modifier.fillMaxWidth().azTurnstileEntrance(index = 0),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Capsule(label = "Back", background = Ground.Ink, labelSize = 11, height = 34.dp, onClick = onBack)
                Capsule(label = "Flag", background = Ground.inkAt(0.14f), labelSize = 11, height = 34.dp, onClick = { showFlag = true })
            }

            Spacer(Modifier.height(20.dp))

            // Big animated hero of the plugin's behavior — an outlined sharp Metro panel.
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(220.dp)
                    .azTurnstileEntrance(index = 1)
                    // A record, not a card: 9% ink, one soft radius, no border and no shadow.
                    .clip(CapsuleShape.Panel)
                    .background(Ground.inkAt(0.09f)),
            ) {
                PreviewArt(pkg, tint = onContainer, phase = phase, modifier = Modifier.fillMaxSize())
                Row(
                    modifier = Modifier.fillMaxWidth().padding(20.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        Pill(pkg.kind, Hues.bgFor(pkg.id))
                        pkg.llm?.let { Pill(it.tierLabel, Ground.Ink) }
                        if (pkg.isMature) Pill("18+", Roles.Acquire.first)
                    }
                    Pill("v${pkg.version}", Ground.Ink)
                }
            }

            Spacer(Modifier.height(28.dp))
            Text(
                pkg.name,
                style = displayStyle(44),
                modifier = Modifier.azTurnstileEntrance(index = 2),
            )
            pkg.author?.let {
                Spacer(Modifier.height(6.dp))
                Text("by $it", style = MaterialTheme.typography.titleMedium, color = cs.onSurfaceVariant)
            }

            // Downloads + rating summary.
            Spacer(Modifier.height(14.dp))
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                FactCapsule("Kind", pkg.kind)
                FactCapsule("Version", pkg.version)
                formatRating(rating, ratingCount)?.let { FactCapsule("Rated", it) }
                if (pkg.installCount > 0) FactCapsule("Installs", formatCount(pkg.installCount))
            }
            Spacer(Modifier.height(20.dp))
            RecordTile(modifier = Modifier.fillMaxWidth(), padding = PaddingValues(24.dp)) {
                Column {
                    Text(text = pkg.description ?: "No description available.", style = bodyStyle)
                    Spacer(Modifier.height(18.dp))
                    RecordLine("Identifier", pkg.id)
                    Spacer(Modifier.height(7.dp))
                    pkg.author?.let {
                        RecordLine("Publisher", it)
                        Spacer(Modifier.height(7.dp))
                    }
                    RecordLine("Media", pkg.mediaDomains.joinToString(", ").ifBlank { "any" })
                }
            }

            // Interactive star rating — tap a star to record a 1–5 vote.
            Spacer(Modifier.height(24.dp))
            Text("Rate this extension", style = eyebrowStyle)
            Spacer(Modifier.height(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                for (star in 1..5) {
                    Text(
                        text = "★",
                        style = MaterialTheme.typography.headlineMedium,
                        color = if (star <= myStars) cs.tertiary else cs.onSurfaceVariant.copy(alpha = 0.35f),
                        modifier = Modifier
                            // 48dp: the minimum touch target. TalkBack reads "N stars, button"
                            // rather than "★" five times.
                            .sizeIn(minWidth = 48.dp, minHeight = 48.dp)
                            .semantics {
                                contentDescription = if (star == 1) "1 star" else "$star stars"
                                role = Role.Button
                                selected = star == myStars
                            }
                            .clickable(enabled = !rateBusy) {
                                myStars = star
                                scope.launch {
                                    rateBusy = true
                                    try {
                                        val r = submitRating(pkg.id, star)
                                        if (r.ok) {
                                            rating = r.rating
                                            ratingCount = r.ratingCount
                                        } else {
                                            // Reset, or the row below thanks the user for a rating
                                            // that was rejected. The web store does the same.
                                            myStars = 0
                                            dialogText = r.error ?: "Could not submit your rating."
                                        }
                                    } catch (e: Exception) {
                                        myStars = 0
                                        dialogText = e.message ?: "Could not submit your rating."
                                    }
                                    rateBusy = false
                                }
                            }
                            .wrapContentSize(Alignment.Center)
                            .padding(horizontal = 4.dp),
                    )
                }
                if (myStars > 0) {
                    Spacer(Modifier.width(12.dp))
                    Text(
                        if (rateBusy) "Saving…" else "Thanks for rating!",
                        style = MaterialTheme.typography.bodyMedium,
                        color = cs.onSurfaceVariant,
                    )
                }
            }

            pkg.llm?.let { llm ->
                Spacer(Modifier.height(24.dp))
                LlmDisclosure(llm)
            }

            if (pkg.capabilities.isNotEmpty()) {
                Spacer(Modifier.height(24.dp))
                Text("Capabilities", style = eyebrowStyle)
                Spacer(Modifier.height(10.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    pkg.capabilities.take(6).forEach { Pill(it, Hues.bgFor(it)) }
                }
            }

            // A pack (kind:"pack") lists the packages it bundles — each installed and licensed on its own.
            pkg.pack?.let { pack ->
                Spacer(Modifier.height(24.dp))
                Text("What's inside", style = eyebrowStyle)
                Spacer(Modifier.height(4.dp))
                Text(
                    "This pack bundles other extensions by reference — each is installed and licensed on its own.",
                    style = MaterialTheme.typography.bodySmall,
                    color = cs.onSurfaceVariant,
                )
                Spacer(Modifier.height(12.dp))
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    pack.entries.forEach { entry ->
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(CapsuleShape.Record)
                                .background(Ground.inkAt(0.09f))
                                .padding(14.dp),
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically,
                            ) {
                                Text(entry.id, style = MaterialTheme.typography.bodyMedium, color = cs.onBackground)
                                if (entry.required) {
                                    Pill("Base", Ground.Ink)
                                } else {
                                    Pill("Optional", Ground.inkAt(0.30f))
                                }
                            }
                            entry.note?.let {
                                Spacer(Modifier.height(4.dp))
                                Text(it, style = MaterialTheme.typography.bodySmall, color = cs.onSurfaceVariant)
                            }
                        }
                    }
                }
            }

            Spacer(Modifier.height(32.dp))
            // Said before the button, so a recorded-but-not-installed state is never silent: the
            // line explains what is wrong and the button does the one thing that fixes it.
            missing?.let(::statusLineFor)?.let { line ->
                Text(
                    line,
                    style = MaterialTheme.typography.bodyMedium,
                    color = cs.onSurfaceVariant,
                    modifier = Modifier.padding(bottom = 8.dp).semantics { liveRegion = LiveRegionMode.Polite },
                )
            }
            val mainLabel = when {
                busy -> "Working…"
                held -> "Install again"
                else -> primaryAction?.label ?: "Install again"
            }
            Button(
                enabled = !busy,
                shape = CapsuleShape.Full,
                modifier = Modifier
                    .heightIn(min = 48.dp)
                    .azTurnstileEntrance(index = 3)
                    .semantics {
                        // The visible label is a short form ("Install · Free"); say the whole thing.
                        contentDescription = if (busy) "Working" else (primaryAction?.description ?: "Install ${pkg.name} again")
                        role = Role.Button
                    },
                onClick = installAction,
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (held) Roles.Acquired.first else Roles.Acquire.first,
                    contentColor = Color.White,
                ),
            ) {
                if (busy) {
                    CircularProgressIndicator(modifier = Modifier.size(18.dp), strokeWidth = 2.dp, color = Color.White)
                    Spacer(Modifier.width(10.dp))
                }
                Text(text = mainLabel, fontWeight = FontWeight.Bold)
            }

            if (receipt.isNotEmpty()) {
                Spacer(Modifier.height(14.dp))
                Receipt(lines = receipt, modifier = Modifier.fillMaxWidth())
            }

            // The store's record is a guess: a handoff can succeed and the install still not happen,
            // and on the web nothing will ever contradict it. This is how the user says so.
            if (held) {
                Spacer(Modifier.height(10.dp))
                // The line above says it is installed and the button above installs it again; this is for
                // the third case, where the store's guess was simply wrong. A 48dp target, like the rest.
                TextButton(
                    onClick = { onForget(pkg) },
                    shape = CapsuleShape.Full,
                    modifier = Modifier.heightIn(min = 48.dp).semantics {
                        contentDescription = "Not installed? Remove ${pkg.name} from my library"
                    },
                ) {
                    Text("Not installed? Remove from my library", color = cs.onSurfaceVariant)
                }
            }
            Spacer(Modifier.height(48.dp))
        }
    }

    if (showFlag) {
        FlagDialog(
            pkg = pkg,
            onDismiss = { showFlag = false },
            onDone = { message ->
                showFlag = false
                dialogText = message
            },
        )
    }

    dialogText?.let { message ->
        AlertDialog(
            shape = CapsuleShape.Panel,
            onDismissRequest = { dialogText = null },
            confirmButton = {
                if (checkoutFailed) {
                    // A failed checkout is not a dead end: the next step is to start it again.
                    TextButton(
                        onClick = {
                            dialogText = null
                            installAction()
                        },
                        shape = CapsuleShape.Full,
                        modifier = Modifier.heightIn(min = 48.dp),
                    ) { Text("Retry checkout") }
                } else {
                    TextButton(onClick = { dialogText = null }, shape = CapsuleShape.Full, modifier = Modifier.heightIn(min = 48.dp)) { Text("OK") }
                }
            },
            dismissButton = if (checkoutFailed) {
                { TextButton(onClick = { dialogText = null; checkoutFailed = false }, shape = CapsuleShape.Full, modifier = Modifier.heightIn(min = 48.dp)) { Text("Close") } }
            } else null,
            title = { Text(if (isPaid(pkg)) "Checkout" else "Install") },
            text = { Text(message) },
        )
    }

    if (noHost) {
        NoHostSheet(
            pkg = pkg,
            state = NotInstalled.HostMissing(hosts = hosts, scopedTo = pkg.targetApps),
            onRetry = {
                // Close the sheet, then run the same handoff the button runs — including recording it
                // and telling the user. The user may have installed a host and come back, which is
                // precisely what the retry is for.
                noHost = false
                handoff()
            },
            onDismiss = { noHost = false },
        )
    }
}

/**
 * The flag / IP-claim sheet. A user "Report" files an abuse/quality flag; toggling to "IP claim" lets a
 * rights-holder assert infringement of their **own** published package (signing with their publisher key
 * makes the claim trusted server-side). Both post to `/api/reports`.
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun FlagDialog(
    pkg: PackageSummary,
    onDismiss: () -> Unit,
    onDone: (String) -> Unit,
) {
    val cs = MaterialTheme.colorScheme
    val scope = rememberCoroutineScope()
    val reasons = listOf("malware", "clone", "deceptive", "secret-leak", "broken", "other")
    var ipMode by remember { mutableStateOf(false) }
    var reason by remember { mutableStateOf(reasons.first()) }
    var detail by remember { mutableStateOf("") }
    var original by remember { mutableStateOf("") }
    var signature by remember { mutableStateOf("") }
    var busy by remember { mutableStateOf(false) }

    AlertDialog(
        shape = CapsuleShape.Panel,
        onDismissRequest = onDismiss,
        title = { Text(if (ipMode) "IP claim" else "Report a problem") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    FilterChip(selected = !ipMode, onClick = { ipMode = false }, label = { Text("Report") })
                    FilterChip(selected = ipMode, onClick = { ipMode = true }, label = { Text("IP claim") })
                }
                if (ipMode) {
                    Text(
                        "Assert this extension infringes YOUR published work. Sign with the publisher key that " +
                            "signed your package to file a trusted claim; otherwise it queues for review.",
                        style = MaterialTheme.typography.bodySmall,
                        color = cs.onSurfaceVariant,
                    )
                    OutlinedTextField(
                        value = original,
                        onValueChange = { original = it },
                        label = { Text("Your package id (the original)") },
                        singleLine = true,
                        shape = CapsuleShape.Full,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    OutlinedTextField(
                        value = signature,
                        onValueChange = { signature = it },
                        label = { Text("Signature (optional)") },
                        singleLine = true,
                        shape = CapsuleShape.Full,
                        modifier = Modifier.fillMaxWidth(),
                    )
                } else {
                    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        reasons.forEach { r ->
                            FilterChip(selected = reason == r, onClick = { reason = r }, label = { Text(r) })
                        }
                    }
                }
                OutlinedTextField(
                    value = detail,
                    onValueChange = { detail = it.take(2000) },
                    label = { Text("Details (optional)") },
                    shape = CapsuleShape.Full,
                    modifier = Modifier.fillMaxWidth(),
                )
            }
        },
        confirmButton = {
            TextButton(
                enabled = !busy && (!ipMode || original.isNotBlank()),
                shape = CapsuleShape.Full,
                onClick = {
                    scope.launch {
                        busy = true
                        val message = try {
                            if (ipMode) {
                                val r = submitIpClaim(pkg.id, original.trim(), detail.ifBlank { null }, signature.ifBlank { null })
                                when {
                                    !r.ok -> r.error ?: "Could not file the claim."
                                    r.trusted -> "IP claim filed and verified against your key — sent to moderation."
                                    else -> "IP claim filed — queued for human review."
                                }
                            } else {
                                val r = submitReport(pkg.id, reason, detail.ifBlank { null })
                                if (r.ok) "Report filed — thanks. Moderators will review it." else (r.error ?: "Could not file the report.")
                            }
                        } catch (e: Exception) {
                            e.message ?: "Network error filing the report."
                        }
                        busy = false
                        onDone(message)
                    }
                },
            ) { Text(if (busy) "Sending…" else "Submit") }
        },
        dismissButton = { TextButton(onClick = onDismiss, shape = CapsuleShape.Full) { Text("Cancel") } },
    )
}
