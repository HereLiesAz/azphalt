package components

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
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
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import models.CheckoutResponse
import models.PackageSummary
import network.startCheckout
import network.submitIpClaim
import network.submitRating
import network.submitReport
import theme.azTurnstileEntrance
import util.formatCount
import util.formatRating

/** A full-screen detail view for one package: a big animated hero, metadata, ratings, and actions. */
@Composable
fun DetailScreen(
    pkg: PackageSummary,
    ageConfirmed: Boolean,
    onConfirmAge: () -> Unit,
    onBack: () -> Unit,
) {
    val cs = MaterialTheme.colorScheme

    // A developer-flagged 18+ package shows an age gate before its detail (belt-and-suspenders — the
    // card gate normally confirms first, but a deep link could land here directly).
    if (pkg.isMature && !ageConfirmed) {
        Column(
            modifier = Modifier.fillMaxSize().background(cs.background).padding(32.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Pill("18+", cs.secondary, cs.onSecondary)
            Spacer(Modifier.height(16.dp))
            Text("Mature content", style = MaterialTheme.typography.headlineSmall, color = cs.onBackground)
            Spacer(Modifier.height(8.dp))
            Text(
                "“${pkg.name}” is flagged 18+ by its developer.",
                style = MaterialTheme.typography.bodyLarge,
                color = cs.onSurfaceVariant,
                textAlign = TextAlign.Center,
            )
            Spacer(Modifier.height(24.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedButton(onClick = onBack, shape = RectangleShape) { Text("←  Back") }
                Button(
                    onClick = onConfirmAge,
                    shape = RectangleShape,
                    colors = ButtonDefaults.buttonColors(containerColor = cs.secondary, contentColor = cs.onSecondary),
                ) { Text("I'm 18 or older", fontWeight = FontWeight.Bold) }
            }
        }
        return
    }

    val (container, onContainer) = paletteFor(pkg.id)
    val transition = rememberInfiniteTransition(label = "detail")
    val phase by transition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(durationMillis = 5200, easing = LinearEasing), RepeatMode.Restart),
        label = "phase",
    )
    val scope = rememberCoroutineScope()
    var busy by remember { mutableStateOf(false) }
    var dialogText by remember { mutableStateOf<String?>(null) }
    var showFlag by remember { mutableStateOf(false) }

    // Live rating state, seeded from the summary and updated when the viewer rates.
    var rating by remember(pkg.id) { mutableStateOf(pkg.rating) }
    var ratingCount by remember(pkg.id) { mutableStateOf(pkg.ratingCount) }
    var myStars by remember(pkg.id) { mutableStateOf(0) }
    var rateBusy by remember(pkg.id) { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(cs.background)
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
                OutlinedButton(onClick = onBack, shape = RectangleShape) { Text("←  Back") }
                OutlinedButton(onClick = { showFlag = true }, shape = RectangleShape) { Text("⚑  Flag") }
            }

            Spacer(Modifier.height(20.dp))

            // Big animated hero of the plugin's behavior — an outlined sharp Metro panel.
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(220.dp)
                    .azTurnstileEntrance(index = 1)
                    .background(container.copy(alpha = 0.14f))
                    .border(1.dp, onContainer.copy(alpha = 0.55f), RectangleShape),
            ) {
                PreviewArt(pkg, tint = onContainer, phase = phase, modifier = Modifier.fillMaxSize())
                Row(
                    modifier = Modifier.fillMaxWidth().padding(20.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        Pill(pkg.kind.uppercase(), onContainer.copy(alpha = 0.16f), onContainer)
                        if (pkg.isMature) Pill("18+", cs.secondary, cs.onSecondary)
                    }
                    Pill("v${pkg.version}", onContainer.copy(alpha = 0.16f), onContainer)
                }
            }

            Spacer(Modifier.height(28.dp))
            Text(
                pkg.name,
                style = MaterialTheme.typography.displaySmall,
                color = cs.onBackground,
                modifier = Modifier.azTurnstileEntrance(index = 2),
            )
            pkg.author?.let {
                Spacer(Modifier.height(6.dp))
                Text("by $it", style = MaterialTheme.typography.titleMedium, color = cs.onSurfaceVariant)
            }

            // Downloads + rating summary.
            Spacer(Modifier.height(12.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
                val ratingLabel = formatRating(rating, ratingCount)
                Text(
                    ratingLabel ?: "No ratings yet",
                    style = MaterialTheme.typography.titleMedium,
                    color = if (ratingLabel != null) cs.primary else cs.onSurfaceVariant,
                )
                if (pkg.downloads > 0) {
                    Text(
                        "${formatCount(pkg.downloads)} installs",
                        style = MaterialTheme.typography.titleMedium,
                        color = cs.onSurfaceVariant,
                    )
                }
            }

            Spacer(Modifier.height(20.dp))
            Text(
                text = pkg.description ?: "No description available.",
                style = MaterialTheme.typography.bodyLarge,
                color = cs.onSurfaceVariant,
            )

            // Interactive star rating — tap a star to record a 1–5 vote.
            Spacer(Modifier.height(24.dp))
            Text("Rate this extension", style = MaterialTheme.typography.labelLarge, color = cs.onBackground)
            Spacer(Modifier.height(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                for (star in 1..5) {
                    Text(
                        text = "★",
                        style = MaterialTheme.typography.headlineMedium,
                        color = if (star <= myStars) cs.tertiary else cs.onSurfaceVariant.copy(alpha = 0.35f),
                        modifier = Modifier
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
                                            dialogText = r.error ?: "Could not submit your rating."
                                        }
                                    } catch (e: Exception) {
                                        dialogText = e.message ?: "Could not submit your rating."
                                    }
                                    rateBusy = false
                                }
                            }
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

            if (pkg.capabilities.isNotEmpty()) {
                Spacer(Modifier.height(24.dp))
                Text("Capabilities", style = MaterialTheme.typography.labelLarge, color = cs.onBackground)
                Spacer(Modifier.height(10.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    pkg.capabilities.take(6).forEach { Pill(it, cs.secondaryContainer, cs.onSecondaryContainer) }
                }
            }

            // A pack (kind:"pack") lists the packages it bundles — each installed and licensed on its own.
            pkg.pack?.let { pack ->
                Spacer(Modifier.height(24.dp))
                Text("What's inside", style = MaterialTheme.typography.labelLarge, color = cs.onBackground)
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
                                .border(1.dp, cs.outline.copy(alpha = 0.4f), RectangleShape)
                                .padding(12.dp),
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically,
                            ) {
                                Text(entry.id, style = MaterialTheme.typography.bodyMedium, color = cs.onBackground)
                                if (entry.required) {
                                    Pill("BASE", cs.primary.copy(alpha = 0.16f), cs.primary)
                                } else {
                                    Pill("OPTIONAL", cs.secondaryContainer, cs.onSecondaryContainer)
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
            Button(
                enabled = !busy,
                shape = RectangleShape,
                modifier = Modifier.azTurnstileEntrance(index = 3),
                onClick = {
                    if (isPaid(pkg)) {
                        scope.launch {
                            busy = true
                            val result = try {
                                startCheckout(pkg.id)
                            } catch (e: Exception) {
                                CheckoutResponse(error = e.message ?: "Checkout failed")
                            }
                            dialogText = result.error ?: result.message ?: "Checkout started."
                            busy = false
                        }
                    } else if (pkg.pack != null) {
                        dialogText = "“${pkg.name}” bundles ${pkg.pack.entries.size} extensions — a host installs each from any Azphalt-conforming repository (paid members need their own purchase)."
                    } else {
                        dialogText = "“${pkg.name}” is free — install it from any Azphalt-conforming host."
                    }
                },
                colors = ButtonDefaults.buttonColors(containerColor = cs.primary, contentColor = cs.onPrimary),
            ) {
                Text(
                    text = when {
                        busy -> "Working…"
                        pkg.pack != null -> "Install pack  ·  ${pkg.pack.entries.size} items"
                        isPaid(pkg) -> "Get  ·  ${priceLabel(pkg)}"
                        else -> "Install  ·  Free"
                    },
                    fontWeight = FontWeight.Bold,
                )
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
            onDismissRequest = { dialogText = null },
            confirmButton = { TextButton(onClick = { dialogText = null }, shape = RectangleShape) { Text("OK") } },
            title = { Text(if (isPaid(pkg)) "Checkout" else "Install") },
            text = { Text(message) },
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
                        shape = RectangleShape,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    OutlinedTextField(
                        value = signature,
                        onValueChange = { signature = it },
                        label = { Text("Signature (optional)") },
                        singleLine = true,
                        shape = RectangleShape,
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
                    shape = RectangleShape,
                    modifier = Modifier.fillMaxWidth(),
                )
            }
        },
        confirmButton = {
            TextButton(
                enabled = !busy && (!ipMode || original.isNotBlank()),
                shape = RectangleShape,
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
        dismissButton = { TextButton(onClick = onDismiss, shape = RectangleShape) { Text("Cancel") } },
    )
}
