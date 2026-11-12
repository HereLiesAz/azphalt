/*
 * Azrienoch variable font, version 1.1 (HereLiesAz/azrienoch).
 *
 * The same verified upstream font ships in the Compose storefront and the
 * React storefront. A single TTF exposes the weight axis for the Capsule
 * system's 500–900 labels. The upstream SIL OFL license applies.
 *
 * jostFamily / LocalJost remain as compatibility names for existing callers;
 * their actual font is Azrienoch, not Jost.
 */
package theme

import androidx.compose.runtime.Composable
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import com.azphalt.storefront.storefront_cmp.generated.resources.Res
import com.azphalt.storefront.storefront_cmp.generated.resources.azrienoch_vf
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
    Font(Res.font.azrienoch_vf, FontWeight.Medium),
    Font(Res.font.azrienoch_vf, FontWeight.SemiBold),
    Font(Res.font.azrienoch_vf, FontWeight.Bold),
    Font(Res.font.azrienoch_vf, FontWeight.ExtraBold),
    Font(Res.font.azrienoch_vf, FontWeight.Black),
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
