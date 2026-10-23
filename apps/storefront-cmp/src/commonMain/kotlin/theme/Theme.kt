package theme

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

/**
 * The store's Material theme, which is a thin adapter for the Capsule system (`Capsule.kt`): a printed
 * yellow page, ink text, Jost, and full-capsule shapes. Material only sees it so stray framework
 * components (dialogs, text fields, menus) land on the page colours instead of Material's defaults.
 *
 * The old violet / pink / amber light and dark schemes are gone; nothing read them once the Capsule
 * system replaced them.
 */

/** Emphasized type scale — bold, tight display sizes for an expressive voice. */
private val AzphaltType = Typography(
    displayLarge = TextStyle(fontSize = 60.sp, lineHeight = 64.sp, fontWeight = FontWeight(850), letterSpacing = (-1.5).sp),
    displayMedium = TextStyle(fontSize = 44.sp, lineHeight = 48.sp, fontWeight = FontWeight(820), letterSpacing = (-1).sp),
    displaySmall = TextStyle(fontSize = 34.sp, lineHeight = 40.sp, fontWeight = FontWeight(780)),
    headlineLarge = TextStyle(fontSize = 30.sp, lineHeight = 36.sp, fontWeight = FontWeight(760)),
    headlineMedium = TextStyle(fontSize = 26.sp, lineHeight = 32.sp, fontWeight = FontWeight(740)),
    headlineSmall = TextStyle(fontSize = 22.sp, lineHeight = 28.sp, fontWeight = FontWeight(720)),
    titleLarge = TextStyle(fontSize = 20.sp, lineHeight = 26.sp, fontWeight = FontWeight(700)),
    titleMedium = TextStyle(fontSize = 16.sp, lineHeight = 22.sp, fontWeight = FontWeight(680)),
    bodyLarge = TextStyle(fontSize = 16.sp, lineHeight = 24.sp, fontWeight = FontWeight.Normal),
    bodyMedium = TextStyle(fontSize = 14.sp, lineHeight = 20.sp, fontWeight = FontWeight.Normal),
    labelLarge = TextStyle(fontSize = 14.sp, lineHeight = 18.sp, fontWeight = FontWeight(720), letterSpacing = 0.3.sp),
    labelMedium = TextStyle(fontSize = 12.sp, lineHeight = 16.sp, fontWeight = FontWeight(700), letterSpacing = 0.4.sp),
    labelSmall = TextStyle(fontSize = 11.sp, lineHeight = 14.sp, fontWeight = FontWeight(700), letterSpacing = 0.5.sp),
)

/**
 * Every M3 shape token is a full capsule — see `Capsule.kt`.
 *
 * These were five zeros, which is what made the store hard-cornered everywhere regardless of what any
 * call site asked for. In the Capsule system the rule is the opposite and just as absolute: radius is
 * 999px, always, never a rounded rectangle. The exceptions are records, which are not pressable:
 * the record tile, drawn directly, and dialogs, which pass `CapsuleShape.Panel` at every `AlertDialog`
 * call site because the default (`extraLarge`, a 50% radius) would clip a tall dialog's content.
 */
private val AzphaltShapes = Shapes(
    extraSmall = CapsuleShape.Full,
    small = CapsuleShape.Full,
    medium = CapsuleShape.Full,
    large = CapsuleShape.Full,
    extraLarge = CapsuleShape.Full,
)

/**
 * The store's colours, as far as Material is concerned.
 *
 * The Capsule system does not really have a "colour scheme" — the page is yellow, text is ink, and
 * capsules take a hashed hue from `Hues`. This mapping exists so a stray framework component that
 * reads `MaterialTheme.colorScheme` lands somewhere sane instead of on Material's purple defaults.
 * Store code should reach for `Ground` and `Hues` directly.
 *
 * The surface-container family (`surfaceContainer*`, `surfaceDim`/`surfaceBright`) and the inverse
 * roles are listed explicitly, not left to `lightColorScheme()`'s defaults. `lightColorScheme()` only
 * derives the roles you omit from Material's own baseline neutral-variant palette — it does NOT compute
 * them from `primary`/`surface` — so an omitted `surfaceContainerHigh` silently keeps Material's default
 * violet-tinted light gray. `AlertDialog` reads its container color from exactly that role
 * (`AlertDialogDefaults.containerColor`), which is what put a lavender box behind `NoHostSheet` /
 * `FlagDialog` against the yellow page. Every surface role therefore lands on `Ground.Page` (or `Ink` for
 * the inverse pair), so any stray M3 surface — dialog, sheet, menu — matches the one surface this system
 * has: the page itself. `surfaceTint` is transparent because Capsule has no elevation tinting.
 */
private val CapsuleColors = lightColorScheme(
    primary = Ground.Ink,
    onPrimary = Color(0xFFF0D42A),
    secondary = Hues.Bg[0],
    onSecondary = Color.White,
    tertiary = Hues.Bg[2],
    onTertiary = Color.White,
    background = Ground.Page,
    onBackground = Ground.Ink,
    surface = Ground.Page,
    onSurface = Ground.Ink,
    surfaceVariant = Ground.Page,
    // Opaque, not ink at 62%: that was about 4.0:1 on the yellow, under the 4.5:1 AA floor. ~5.7:1.
    onSurfaceVariant = Color(0xFF50461F),
    surfaceTint = Color.Transparent,
    surfaceDim = Ground.Page,
    surfaceBright = Ground.Page,
    surfaceContainerLowest = Ground.Page,
    surfaceContainerLow = Ground.Page,
    surfaceContainer = Ground.Page,
    surfaceContainerHigh = Ground.Page,
    surfaceContainerHighest = Ground.Page,
    inverseSurface = Ground.Ink,
    inverseOnSurface = Ground.Page,
    inversePrimary = Ground.Page,
    outline = Ground.inkAt(0.22f),
    // Hues.Bg[6] (#c6392f) is only ~3.3:1 on the yellow; this red is ~5.6:1, readable at body size.
    error = Color(0xFF8A1C14),
    onError = Color.White,
)

/**
 * `dark` is accepted and ignored.
 *
 * The page is a printed yellow spread; there is no dark variant of printed stock, and a dark mode
 * would be a second design rather than a toggle. Kept in the signature so the existing call sites
 * compile unchanged.
 */
@Composable
fun AzphaltExpressiveTheme(dark: Boolean = true, content: @Composable () -> Unit) {
    val jost = jostFamily()
    CompositionLocalProvider(LocalJost provides jost) {
    MaterialTheme(
        colorScheme = CapsuleColors,
        typography = AzphaltType,
        shapes = AzphaltShapes,
        content = content,
    )
    }
}
