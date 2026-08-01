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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import theme.ExpressiveShapes
import models.ExtensionState
import models.ExtensionStateEntry
import models.LocalHostInventory
import models.PackageSummary
import models.statusLabelFor
import theme.azTiltOnPress
import theme.azTurnstileEntrance
import util.formatCount
import util.formatRating

/**
 * A small outlined tag (kind, price, capability) — a sharp Metro rectangle with a hairline border in
 * the content color over a faint [container] fill, replacing the old 50%-rounded pill.
 */
@Composable
internal fun Pill(text: String, container: Color, content: Color) {
    Box(
        modifier = Modifier
            .background(container)
            .border(1.dp, content.copy(alpha = 0.55f), ExpressiveShapes.Card)
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
/**
 * Card geometry, owned here with the card rather than by whoever lays it out.
 *
 * Sized so a row shows more of the catalogue than it does of any one card: at the old 340×300 a
 * desktop viewport fitted about three, which made browsing a paging exercise and gave a two-line
 * description the same visual weight as the artwork above it.
 *
 * These were previously a private pair in `SectionCarousel` plus an unrelated default height on this
 * composable — and because the carousel is the only caller and always passes an explicit size, that
 * default was dead. Two numbers claiming to set one thing, one of them ignored. One source now.
 */
internal const val CARD_WIDTH = 244
internal const val CARD_HEIGHT = 216

@Composable
fun PackageCard(
    pkg: PackageSummary,
    phase: Float,
    index: Int,
    onOpen: (PackageSummary) -> Unit,
    modifier: Modifier = Modifier.fillMaxWidth().height(CARD_HEIGHT.dp),
    ageConfirmed: Boolean = true,
    onConfirmAge: () -> Unit = {},
) {
    // What the calling host reported about this package, if anything (`spec/state-reporting.md` § 3).
    // Null means the host said nothing — the standalone app and every web visitor — and the card must
    // then look exactly as it did before any of this existed.
    val state: ExtensionStateEntry? = LocalHostInventory.current[pkg.id]
    // A developer-flagged 18+ package stays behind an age gate until the viewer confirms: the preview
    // art is hidden and a tap confirms age instead of opening the detail.
    val gated = pkg.isMature && !ageConfirmed
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
        onClick = { if (gated) onConfirmAge() else onOpen(pkg) },
        modifier = modifier
            // Additive WP7 turnstile: the tile pivots in around its left edge, cascaded across the
            // row. Capped so a card scrolled in far down the list doesn't wait a full cascade.
            .azTurnstileEntrance(index = index.coerceAtMost(6))
            .azTiltOnPress()
            .scale(scale),
        shape = ExpressiveShapes.Pill,
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
                contentAlignment = Alignment.Center,
            ) {
                if (gated) {
                    // Age gate: hide the visual behind a scrim until the viewer confirms they're 18+.
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.fillMaxSize().background(cs.surface).padding(16.dp),
                        verticalArrangement = Arrangement.Center,
                    ) {
                        Pill("18+", cs.secondary, cs.onSecondary)
                        Spacer(Modifier.height(10.dp))
                        Text(
                            "Mature content — tap to confirm you're 18 or older",
                            style = MaterialTheme.typography.labelMedium,
                            color = cs.onSurfaceVariant,
                            textAlign = TextAlign.Center,
                        )
                    }
                } else {
                    PreviewArt(pkg, tint = onContainer, phase = phase, modifier = Modifier.fillMaxSize())
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(10.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Top,
                    ) {
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            // For a pack, the kind pill also shows how many extensions it bundles.
                            Pill(
                                text = pkg.pack?.let { "PACK · ${it.entries.size}" } ?: pkg.kind.uppercase(),
                                container = onContainer.copy(alpha = 0.16f),
                                content = onContainer,
                            )
                            if (pkg.isMature) Pill("18+", cs.secondary, cs.onSecondary)
                            // What the host has already done with this one. Placed with the kind and
                            // maturity pills rather than the price, because it describes the user's
                            // relationship to the package, not the package's terms.
                            statusLabelFor(state)?.let { status ->
                                val failed = state?.state == ExtensionState.FAILED
                                Pill(
                                    text = status.uppercase(),
                                    // Failure is the one state worth pulling the eye: it means the
                                    // user tried to get this and did not.
                                    container = if (failed) cs.error else cs.tertiary,
                                    content = if (failed) cs.onError else cs.onTertiary,
                                )
                            }
                        }
                        Pill(
                            text = priceLabel(pkg),
                            container = if (paid) cs.primary else onContainer.copy(alpha = 0.16f),
                            content = if (paid) cs.onPrimary else onContainer,
                        )
                    }
                }
            }

            // Title + description block, then a downloads / rating footer.
            Column(modifier = Modifier.padding(start = 12.dp, end = 12.dp, top = 9.dp, bottom = 10.dp)) {
                Text(
                    text = pkg.name,
                    style = MaterialTheme.typography.titleMedium,
                    color = onContainer,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                Spacer(Modifier.height(2.dp))
                Text(
                    text = pkg.description ?: "No description available.",
                    style = MaterialTheme.typography.bodySmall,
                    color = onContainer.copy(alpha = 0.75f),
                    // One line. At two, a card's height was set by its longest description rather than
                    // by anything about the extension, and the row read as a wall of prose.
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                Spacer(Modifier.height(6.dp))
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                ) {
                    formatRating(pkg.rating, pkg.ratingCount)?.let {
                        Text(it, style = MaterialTheme.typography.labelMedium, color = onContainer)
                    }
                    if (pkg.downloads > 0) {
                        Text(
                            "${formatCount(pkg.downloads)} installs",
                            style = MaterialTheme.typography.labelMedium,
                            color = onContainer.copy(alpha = 0.7f),
                        )
                    }
                }
            }
        }
    }
}
