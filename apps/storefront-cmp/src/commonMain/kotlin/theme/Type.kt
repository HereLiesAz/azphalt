/*
 * Jost — the typeface the Capsule system is set in.
 *
 * A geometric grotesque in the Futura line. The whole system leans on it: titles at 900 with negative
 * tracking, capsule labels at 800 uppercase with positive tracking so short words fill their capsule,
 * and body as the only lowercase in the system. Set in a humanist UI sans instead, none of that reads
 * the way it is supposed to — the tracking in particular is tuned for geometric letterforms and looks
 * merely loose on anything else.
 *
 * One **variable** font file rather than nine statics: 135 KB total instead of roughly a megabyte,
 * and every weight the system asks for comes out of the same file. Licensed OFL (see `OFL.txt`
 * alongside it), which is why it can be vendored here at all.
 */
package theme

import androidx.compose.runtime.Composable
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import com.azphalt.storefront.storefront_cmp.generated.resources.Res
import com.azphalt.storefront.storefront_cmp.generated.resources.jost
import org.jetbrains.compose.resources.Font

/**
 * The family, with the five weights the system actually uses.
 *
 * Each entry points at the same variable file and differs only in the weight it requests; the
 * renderer interpolates the axis. Listing them explicitly rather than relying on synthetic bolding is
 * what makes 800 and 900 distinguishable — synthesised weight smears a geometric face badly, and 800
 * against 900 is a distinction the guide depends on.
 */
@Composable
fun jostFamily(): FontFamily = FontFamily(
    Font(Res.font.jost, FontWeight.Medium),
    Font(Res.font.jost, FontWeight.SemiBold),
    Font(Res.font.jost, FontWeight.Bold),
    Font(Res.font.jost, FontWeight.ExtraBold),
    Font(Res.font.jost, FontWeight.Black),
)

/**
 * The family, for the style builders.
 *
 * A composition local because the styles that need it — `capsuleLabelStyle`, `displayStyle`,
 * `eyebrowStyle` — are plain top-level declarations, and loading a font resource is a composable
 * operation. Threading a `FontFamily` parameter through every one of them would put the same argument
 * on a dozen signatures that have nothing else to do with it.
 *
 * Defaults to the platform sans, which is what a preview or a test that never installs the theme
 * will render in. That is the right default: it degrades to the old look rather than to no text.
 */
val LocalJost = androidx.compose.runtime.staticCompositionLocalOf<FontFamily> { FontFamily.Default }
