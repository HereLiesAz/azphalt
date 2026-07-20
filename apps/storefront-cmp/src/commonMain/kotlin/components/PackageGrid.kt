package components

import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import models.PackageSummary
import theme.azTiltOnPress
import theme.azTurnstileEntrance

/**
 * A small outlined tag (kind, price, capability) — a sharp Metro rectangle with a hairline border in
 * the content color over a faint [container] fill, replacing the old 50%-rounded pill.
 */
@Composable
internal fun Pill(text: String, container: Color, content: Color) {
    Box(
        modifier = Modifier
            .background(container)
            .border(1.dp, content.copy(alpha = 0.55f), RectangleShape)
            .padding(horizontal = 10.dp, vertical = 5.dp),
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.labelSmall,
            color = content,
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

/**
 * A single outlined Metro tile for one package: a live procedural preview, kind/price tags, and a
 * title/description block. Sized by [modifier] so the same card serves both the full-width results
 * layout and the fixed-width cards inside a [HeroCarousel]. All AzNavRail motion (turnstile entrance,
 * tilt-on-press, hover scale, animated border) is applied on top of whatever [modifier] sets.
 */
@Composable
fun PackageCard(
    pkg: PackageSummary,
    phase: Float,
    index: Int,
    onOpen: (PackageSummary) -> Unit,
    modifier: Modifier = Modifier.fillMaxWidth().height(272.dp),
) {
    val interaction = remember { MutableInteractionSource() }
    val hovered by interaction.collectIsHoveredAsState()
    val pressed by interaction.collectIsPressedAsState()

    // Bouncy, physics-driven scale on hover/press (kept). The old elevation lift becomes a border
    // that brightens and thickens on hover, so the flat Metro tile still answers the pointer.
    val scale by animateFloatAsState(
        targetValue = if (pressed) 0.96f else if (hovered) 1.03f else 1f,
        animationSpec = spring(dampingRatio = 0.5f, stiffness = 520f),
    )
    val borderWidth by animateDpAsState(
        targetValue = if (hovered) 2.dp else 1.dp,
        animationSpec = spring(dampingRatio = 0.7f, stiffness = 400f),
    )
    val borderAlpha by animateFloatAsState(
        targetValue = if (hovered) 0.95f else 0.5f,
        animationSpec = spring(dampingRatio = 0.7f, stiffness = 400f),
    )

    val cs = MaterialTheme.colorScheme
    val (container, onContainer) = paletteFor(pkg.id)
    val paid = isPaid(pkg)

    OutlinedCard(
        onClick = { onOpen(pkg) },
        modifier = modifier
            // Additive WP7 turnstile: the tile pivots in around its left edge, cascaded across the
            // row. Capped so a card scrolled in far down the list doesn't wait a full cascade.
            .azTurnstileEntrance(index = index.coerceAtMost(6))
            .azTiltOnPress()
            .scale(scale),
        shape = RectangleShape,
        colors = CardDefaults.outlinedCardColors(
            containerColor = container.copy(alpha = 0.14f),
            contentColor = onContainer,
        ),
        border = BorderStroke(borderWidth, onContainer.copy(alpha = borderAlpha)),
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
                PreviewArt(pkg, tint = onContainer, phase = phase, modifier = Modifier.fillMaxSize())
                Row(
                    modifier = Modifier.fillMaxWidth().padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.Top,
                ) {
                    // For a pack, the kind pill also shows how many extensions it bundles.
                    Pill(
                        text = pkg.pack?.let { "PACK · ${it.entries.size}" } ?: pkg.kind.uppercase(),
                        container = onContainer.copy(alpha = 0.16f),
                        content = onContainer,
                    )
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
