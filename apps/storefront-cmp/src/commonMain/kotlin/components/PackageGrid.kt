package components

import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import models.PackageSummary

/** A small pill-shaped indicator (kind, price, capability). */
@Composable
private fun Pill(text: String, container: Color, content: Color) {
    Surface(
        color = container,
        contentColor = content,
        shape = RoundedCornerShape(percent = 50),
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
        )
    }
}

@Composable
fun PackageBentoCard(pkg: PackageSummary) {
    val interaction = remember { MutableInteractionSource() }
    val hovered by interaction.collectIsHoveredAsState()
    val pressed by interaction.collectIsPressedAsState()

    // Bouncy, physics-driven scale on hover/press.
    val scale by animateFloatAsState(
        targetValue = if (pressed) 0.96f else if (hovered) 1.03f else 1f,
        animationSpec = spring(dampingRatio = 0.5f, stiffness = 520f),
    )
    val elevation by animateDpAsState(
        targetValue = if (hovered) 12.dp else 2.dp,
        animationSpec = spring(dampingRatio = 0.7f, stiffness = 400f),
    )

    // Rotate the container color by a stable hash of the id — a playful, colorful bento grid.
    val cs = MaterialTheme.colorScheme
    val palette = listOf(
        cs.primaryContainer to cs.onPrimaryContainer,
        cs.secondaryContainer to cs.onSecondaryContainer,
        cs.tertiaryContainer to cs.onTertiaryContainer,
        cs.surfaceContainerHighest to cs.onSurface,
    )
    val paletteIndex = ((pkg.id.hashCode() % palette.size) + palette.size) % palette.size
    val (container, onContainer) = palette[paletteIndex]

    val priceLabel = pkg.price?.let { "$" + (it.amountCents / 100) + "." + (it.amountCents % 100).toString().padStart(2, '0') }
        ?: "FREE"
    val paid = pkg.price != null || pkg.priceStatus == "paid"

    ElevatedCard(
        onClick = { println("Open ${pkg.id}") },
        modifier = Modifier
            .fillMaxWidth()
            .height(232.dp)
            .scale(scale),
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.elevatedCardColors(containerColor = container, contentColor = onContainer),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = elevation),
        interactionSource = interaction,
    ) {
        Column(modifier = Modifier.fillMaxSize().padding(20.dp)) {
            // Top row: kind pill + price pill.
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Pill(pkg.kind.uppercase(), onContainer.copy(alpha = 0.14f), onContainer)
                Pill(
                    text = priceLabel,
                    container = if (paid) cs.primary else onContainer.copy(alpha = 0.14f),
                    content = if (paid) cs.onPrimary else onContainer,
                )
            }

            Spacer(Modifier.weight(1f))

            Text(
                text = pkg.name,
                style = MaterialTheme.typography.headlineSmall,
                color = onContainer,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
            )
            Spacer(Modifier.height(6.dp))
            Text(
                text = pkg.description ?: "No description available.",
                style = MaterialTheme.typography.bodyMedium,
                color = onContainer.copy(alpha = 0.78f),
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
            )

            if (pkg.capabilities.isNotEmpty() || pkg.author != null) {
                Spacer(Modifier.height(14.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    pkg.capabilities.take(2).forEach { cap ->
                        Pill(cap, onContainer.copy(alpha = 0.10f), onContainer.copy(alpha = 0.85f))
                    }
                    pkg.author?.let {
                        Text(
                            text = it,
                            style = MaterialTheme.typography.labelMedium,
                            color = onContainer.copy(alpha = 0.6f),
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis,
                        )
                    }
                }
            }
        }
    }
}
