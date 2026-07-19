package theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * Azphalt's Material 3 Expressive theme. A vibrant, high-chroma tri-color palette (violet / pink /
 * amber) on a warm near-white surface, emphasized typography, and large friendly shapes — the
 * opposite of a sterile, uniform look. See https://m3.material.io/styles.
 */
private val AzphaltColors = lightColorScheme(
    primary = Color(0xFF6C47FF),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFFE7DEFF),
    onPrimaryContainer = Color(0xFF20005E),
    secondary = Color(0xFFFF3D81),
    onSecondary = Color(0xFFFFFFFF),
    secondaryContainer = Color(0xFFFFD9E2),
    onSecondaryContainer = Color(0xFF3E0021),
    tertiary = Color(0xFFEF9A00),
    onTertiary = Color(0xFF1F1400),
    tertiaryContainer = Color(0xFFFFDE9E),
    onTertiaryContainer = Color(0xFF271900),
    background = Color(0xFFFCF8FF),
    onBackground = Color(0xFF1B1B22),
    surface = Color(0xFFFCF8FF),
    onSurface = Color(0xFF1B1B22),
    surfaceVariant = Color(0xFFE6E0EC),
    onSurfaceVariant = Color(0xFF48454F),
    surfaceContainerHighest = Color(0xFFEDE7F4),
    outline = Color(0xFF79767F),
    outlineVariant = Color(0xFFCAC4D0),
    error = Color(0xFFBA1A1A),
    onError = Color(0xFFFFFFFF),
)

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

/** Large, friendly, expressive shapes. */
private val AzphaltShapes = Shapes(
    extraSmall = RoundedCornerShape(8.dp),
    small = RoundedCornerShape(14.dp),
    medium = RoundedCornerShape(20.dp),
    large = RoundedCornerShape(28.dp),
    extraLarge = RoundedCornerShape(40.dp),
)

@Composable
fun AzphaltExpressiveTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = AzphaltColors,
        typography = AzphaltType,
        shapes = AzphaltShapes,
        content = content,
    )
}
