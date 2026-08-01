/*
 * The Capsule system — the visual language of azphalt.org and azphalt.store.
 *
 * Every token here is from the style guide, and most of them are *prohibitions*, which is unusual
 * enough to be worth stating plainly: no borders, no shadows, no cards, no panels, no alpha on a
 * capsule, no tinting, no fading, and nothing that moves at rest. The page is flat printed stock. If a
 * thing can be pressed or names something, it is a capsule; the only surface is the page itself.
 *
 * This replaces a Material 3 palette applied to hard rectangles. The two are not reconcilable and
 * this file is not a skin over the old one — `Theme.kt` still supplies an M3 `ColorScheme` because
 * stray framework components need one, but nothing in the store should be reaching for it.
 */
package theme

import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.Easing
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.foundation.shape.CornerBasedShape
import androidx.compose.ui.unit.dp

/** The ground. Not black, not white — a warm printed yellow. */
object Ground {
    val Page = Color(0xFFE8C81E)
    val FoldLight = Color(0xFFF2D82C)
    val FoldDark = Color(0xFFD9B615)

    /** All body text and the wordmark capsule. The only near-black in the system. */
    val Ink = Color(0xFF1E1A17)

    /**
     * The two-page spread: a soft vertical crease a little left of centre where the pages meet.
     *
     * The stops are the guide's — 0 / 46 / 50 / 54 / 100 — so the fold is about 4% of the width and
     * reads as paper rather than as a gradient someone chose.
     */
    val Spread: Brush = Brush.linearGradient(
        0.00f to Color(0xFFE4C21C),
        0.46f to FoldLight,
        0.50f to FoldDark,
        0.54f to Color(0xFFF2D82C),
        1.00f to Page,
    )

    /** Ink at low alpha — the *only* sanctioned alpha, and never on a capsule. Wells and record tiles. */
    fun inkAt(alpha: Float) = Ink.copy(alpha = alpha)
}

/**
 * Ten capsule hues, each with a darker mate used only for the end-cap.
 *
 * Colour carries **no meaning**. It exists so a stack of capsules reads as a stack rather than as a
 * list, which is why the hue is hashed from the item's identifier rather than chosen: nothing about a
 * package should be inferable from the fact that it came out violet.
 */
object Hues {
    val Bg = listOf(
        Color(0xFF6B4FBB), Color(0xFF2FA9C4), Color(0xFF1F9E86), Color(0xFF5AAE34), Color(0xFFD9A21C),
        Color(0xFFD9762A), Color(0xFFC6392F), Color(0xFFB03A6E), Color(0xFF8E4FA8), Color(0xFF2E6FB7),
    )
    val Cap = listOf(
        Color(0xFF4B3489), Color(0xFF1F7B90), Color(0xFF137060), Color(0xFF3E7D22), Color(0xFFA2760F),
        Color(0xFFA6551A), Color(0xFF93251D), Color(0xFF7F2A4D), Color(0xFF653578), Color(0xFF1E4E85),
    )

    /**
     * The hue for an identifier, stable across runs and platforms.
     *
     * Deliberately not `hashCode()`: Kotlin's differs between JVM and Wasm for the same string, which
     * would give the same package different colours on Android and on the web — a difference a user
     * would notice and could not explain. This is an FNV-1a over the UTF-16 units, which is fixed.
     */
    fun indexFor(id: String): Int {
        var h = 2166136261u
        for (c in id) {
            h = h xor c.code.toUInt()
            h *= 16777619u
        }
        return (h % Bg.size.toUInt()).toInt()
    }

    fun bgFor(id: String): Color = Bg[indexFor(id)]
    fun capFor(id: String): Color = Cap[indexFor(id)]
}

/** Role colours — the fixed few that *do* mean something, unlike the hashed hues. */
object Roles {
    val Acquire = Color(0xFFC6392F) to Color(0xFF93251D)
    val Acquired = Color(0xFF1F9E86) to Color(0xFF137060)
    val Selected = Ground.Ink to Color(0xFFF0D42A)
}

object CapsuleShape {
    /**
     * 999px in the guide; a 50% rounded corner is the same thing at any height.
     *
     * Always a full capsule, never a rounded rectangle — this is the rule the previous design
     * direction broke, and the one most visible when broken.
     */
    val Full: CornerBasedShape = RoundedCornerShape(percent = 50)

    /**
     * The record tile — facts, not a pressable thing.
     *
     * The one place in the system where the radius is not full. Worth flagging rather than hiding: a
     * record is the only object that is neither a capsule nor the page, and giving it a soft rectangle
     * is what keeps "capsule means pressable-or-named" true everywhere else.
     */
    val Record: CornerBasedShape = RoundedCornerShape(18.dp)

    /** A larger record, for the detail panel. */
    val Panel: CornerBasedShape = RoundedCornerShape(26.dp)
}

object CapsuleMotion {
    /** Fast out, long settle. Everything in the system uses this one curve. */
    val Curve: Easing = CubicBezierEasing(0f, 0.9f, 0.1f, 1f)

    /** Unfold and extend both take this long. */
    const val DurationMs = 420

    /** Per-row stagger down a stack, capped so a long list does not take a minute to arrive. */
    const val StaggerMs = 26
    const val MaxStaggeredRows = 20
}

/**
 * Cascade geometry: a stack of capsules is never a tidy column.
 *
 * Widths come from a fixed set and indents from a repeating 5-step cycle, so the eye reads a cascade
 * running down *and across* — the rhythm the printed spread has. Equal widths flush left is the
 * failure mode the guide calls out by name: it reads as a table.
 */
object Cascade {
    private val Widths = listOf(0.88f, 0.66f, 0.94f, 0.72f, 0.80f, 0.60f)

    fun widthFraction(index: Int): Float = Widths[index % Widths.size]

    /** 0, 9, 18, 27, 36, then back to 0. */
    fun indent(index: Int) = ((index % 5) * 9).dp
}
