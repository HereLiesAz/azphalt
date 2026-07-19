package components

import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
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
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import models.PackageSummary

/** A small pill-shaped indicator (kind, price, capability). */
@Composable
internal fun Pill(text: String, container: Color, content: Color) {
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

/** The container/on-container color pair for a package, rotated by a stable hash for a colorful grid. */
@Composable
internal fun paletteFor(id: String): Pair<Color, Color> {
    val cs = MaterialTheme.colorScheme
    val palette = listOf(
        cs.primaryContainer to cs.onPrimaryContainer,
        cs.secondaryContainer to cs.onSecondaryContainer,
        cs.tertiaryContainer to cs.onTertiaryContainer,
        cs.surfaceContainerHighest to cs.onSurface,
    )
    return palette[((id.hashCode() % palette.size) + palette.size) % palette.size]
}

internal fun priceLabel(pkg: PackageSummary): String =
    pkg.price?.let { "$" + (it.amountCents / 100) + "." + (it.amountCents % 100).toString().padStart(2, '0') } ?: "FREE"

internal fun isPaid(pkg: PackageSummary): Boolean = pkg.price != null || pkg.priceStatus == "paid"

@Composable
fun PackageBentoCard(pkg: PackageSummary, onOpen: (PackageSummary) -> Unit) {
    val interaction = remember { MutableInteractionSource() }
    val hovered by interaction.collectIsHoveredAsState()
    val pressed by interaction.collectIsPressedAsState()

    // Bouncy, physics-driven scale + elevation on hover/press.
    val scale by animateFloatAsState(
        targetValue = if (pressed) 0.96f else if (hovered) 1.03f else 1f,
        animationSpec = spring(dampingRatio = 0.5f, stiffness = 520f),
    )
    val elevation by animateDpAsState(
        targetValue = if (hovered) 12.dp else 2.dp,
        animationSpec = spring(dampingRatio = 0.7f, stiffness = 400f),
    )

    val cs = MaterialTheme.colorScheme
    val (container, onContainer) = paletteFor(pkg.id)
    val paid = isPaid(pkg)

    ElevatedCard(
        onClick = { onOpen(pkg) },
        modifier = Modifier
            .fillMaxWidth()
            .height(272.dp)
            .scale(scale),
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.elevatedCardColors(containerColor = container, contentColor = onContainer),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = elevation),
        interactionSource = interaction,
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            // Live animated preview of what the plugin does, with kind + price pills overlaid.
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .background(onContainer.copy(alpha = 0.05f)),
            ) {
                PreviewArt(pkg, tint = onContainer, modifier = Modifier.fillMaxSize())
                Row(
                    modifier = Modifier.fillMaxWidth().padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.Top,
                ) {
                    Pill(pkg.kind.uppercase(), onContainer.copy(alpha = 0.16f), onContainer)
                    Pill(
                        text = priceLabel(pkg),
                        container = if (paid) cs.primary else onContainer.copy(alpha = 0.16f),
                        content = if (paid) cs.onPrimary else onContainer,
                    )
                }
            }

            // Title + description block.
            Column(modifier = Modifier.padding(start = 20.dp, end = 20.dp, top = 14.dp, bottom = 18.dp)) {
                Text(
                    text = pkg.name,
                    style = MaterialTheme.typography.titleLarge,
                    color = onContainer,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                Spacer(Modifier.height(4.dp))
                Text(
                    text = pkg.description ?: "No description available.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = onContainer.copy(alpha = 0.75f),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                )
            }
        }
    }
}
