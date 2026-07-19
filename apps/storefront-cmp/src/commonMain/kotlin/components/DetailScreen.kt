package components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import models.PackageSummary

/** A full-screen detail view for one package: a big animated hero, metadata, and an install action. */
@Composable
fun DetailScreen(pkg: PackageSummary, onBack: () -> Unit) {
    val cs = MaterialTheme.colorScheme
    val (container, onContainer) = paletteFor(pkg.id)
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
            FilledTonalButton(onClick = onBack) { Text("←  Back") }

            Spacer(Modifier.height(20.dp))

            // Big animated hero of the plugin's behavior.
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(220.dp)
                    .clip(RoundedCornerShape(32.dp))
                    .background(container),
            ) {
                PreviewArt(pkg, tint = onContainer, modifier = Modifier.fillMaxSize())
                Row(
                    modifier = Modifier.fillMaxWidth().padding(20.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                ) {
                    Pill(pkg.kind.uppercase(), onContainer.copy(alpha = 0.16f), onContainer)
                    Pill("v${pkg.version}", onContainer.copy(alpha = 0.16f), onContainer)
                }
            }

            Spacer(Modifier.height(28.dp))
            Text(pkg.name, style = MaterialTheme.typography.displaySmall, color = cs.onBackground)
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

            Spacer(Modifier.height(32.dp))
            Button(
                onClick = { println("install ${pkg.id}") },
                colors = ButtonDefaults.buttonColors(containerColor = cs.primary, contentColor = cs.onPrimary),
            ) {
                Text(
                    text = if (isPaid(pkg)) "Get  ·  ${priceLabel(pkg)}" else "Install  ·  Free",
                    fontWeight = FontWeight.Bold,
                )
            }
            Spacer(Modifier.height(48.dp))
        }
    }
}
