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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
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
/**
 * A small capsule — kinds, versions, capabilities, pack membership.
 *
 * Was a bordered rectangle with a tinted fill. In the Capsule system a thing that names something is
 * a capsule like everything else: full radius, solid hue, white label, no border. The [content]
 * parameter is gone rather than ignored, so a call site cannot quietly keep passing an ink-on-tint
 * pair that no longer applies.
 */
@Composable
internal fun Pill(text: String, background: Color) {
    Capsule(label = text, background = background, labelSize = 10, height = 26.dp)
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

// PackageCard and its carousel are gone. They were a bordered surface with artwork inside it, laid
// out in a column of equal boxes — the two things the Capsule system has none of. The catalogue is
// components/Cascade.kt now. What survives here are the helpers the detail screen still uses.
