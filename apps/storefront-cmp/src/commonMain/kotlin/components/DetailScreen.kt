package components

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
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
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import models.CheckoutResponse
import models.PackageSummary
import network.startCheckout
import theme.azTurnstileEntrance

/** A full-screen detail view for one package: a big animated hero, metadata, and an install action. */
@Composable
fun DetailScreen(pkg: PackageSummary, onBack: () -> Unit) {
    val cs = MaterialTheme.colorScheme
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
            OutlinedButton(
                onClick = onBack,
                shape = RectangleShape,
                modifier = Modifier.azTurnstileEntrance(index = 0),
            ) { Text("←  Back") }

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
                    Pill(pkg.kind.uppercase(), onContainer.copy(alpha = 0.16f), onContainer)
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

            Spacer(Modifier.height(20.dp))
            Text(
                text = pkg.description ?: "No description available.",
                style = MaterialTheme.typography.bodyLarge,
                color = cs.onSurfaceVariant,
            )

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

    dialogText?.let { message ->
        AlertDialog(
            onDismissRequest = { dialogText = null },
            confirmButton = { TextButton(onClick = { dialogText = null }, shape = RectangleShape) { Text("OK") } },
            title = { Text(if (isPaid(pkg)) "Checkout" else "Install") },
            text = { Text(message) },
        )
    }
}
