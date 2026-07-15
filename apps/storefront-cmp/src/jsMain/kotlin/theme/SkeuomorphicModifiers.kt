package theme

import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color

fun Modifier.skeuomorphicSurface(
    depth: Float = 4f
) = this.drawWithContent {
    drawContent()
    
    // Top Specular highlight for inherent conveyance
    drawRect(
        color = Color.White.copy(alpha = 0.3f),
        topLeft = Offset.Zero,
        size = size.copy(height = depth)
    )
    
    // Bottom Inset shadow
    drawRect(
        color = Color.Black.copy(alpha = 0.2f),
        topLeft = Offset(0f, size.height - depth),
        size = size.copy(height = depth)
    )
}
