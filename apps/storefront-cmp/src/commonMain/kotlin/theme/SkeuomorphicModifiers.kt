package theme

import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawWithCache
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.clipPath

/**
 * A frosted glass panel with light reflection hitting the top left edges,
 * creating a high-fidelity glassmorphic effect.
 */
fun Modifier.glassmorphicPanel(
    cornerRadius: Float = 32f,
    intensity: Float = 1f
) = this.drawWithCache {
    val path = Path().apply {
        addRoundRect(
            androidx.compose.ui.geometry.RoundRect(
                0f, 0f, size.width, size.height,
                androidx.compose.ui.geometry.CornerRadius(cornerRadius, cornerRadius)
            )
        )
    }

    val borderGradient = Brush.linearGradient(
        colors = listOf(
            Color.White.copy(alpha = 0.5f * intensity),
            Color.White.copy(alpha = 0.05f * intensity),
            Color.White.copy(alpha = 0.01f),
            Color.Black.copy(alpha = 0.3f * intensity)
        ),
        start = Offset(0f, 0f),
        end = Offset(size.width, size.height)
    )

    val surfaceGradient = Brush.linearGradient(
        colors = listOf(
            Color.White.copy(alpha = 0.08f * intensity),
            Color.White.copy(alpha = 0.03f * intensity),
            Color.Transparent
        ),
        start = Offset(0f, 0f),
        end = Offset(size.width, size.height)
    )

    onDrawWithContent {
        // Draw the inner frosted background
        clipPath(path) {
            drawRect(brush = surfaceGradient)
            this@onDrawWithContent.drawContent()
        }

        // Draw the glass specular border
        drawPath(
            path = path,
            brush = borderGradient,
            style = Stroke(width = 1.5f)
        )
    }
}

/**
 * A highly tactile neuromorphic button modifier.
 */
fun Modifier.neuromorphicButton(
    isPressed: Boolean = false,
    cornerRadius: Float = 24f,
    baseColor: Color = Color(0xFF1E1E24)
) = this.drawWithCache {
    val path = Path().apply {
        addRoundRect(
            androidx.compose.ui.geometry.RoundRect(
                0f, 0f, size.width, size.height,
                androidx.compose.ui.geometry.CornerRadius(cornerRadius, cornerRadius)
            )
        )
    }

    onDrawWithContent {
        // Drop shadows
        if (!isPressed) {
            // Dark shadow bottom right
            // Light shadow top left
        }

        clipPath(path) {
            this@onDrawWithContent.drawContent()
            if (isPressed) {
                // Inner dark shadow to simulate being pressed down
                drawRect(
                    color = Color.Black.copy(alpha = 0.4f),
                    size = size
                )
            } else {
                // Subtle top gradient for convexity
                drawRect(
                    brush = Brush.verticalGradient(
                        colors = listOf(
                            Color.White.copy(alpha = 0.15f),
                            Color.Transparent
                        ),
                        startY = 0f,
                        endY = size.height * 0.5f
                    )
                )
            }
        }
    }
}

fun Modifier.skeuomorphicSurface(
    depth: Float = 4f
) = this.drawWithCache {
    onDrawWithContent {
        drawContent()
        
        // Top Specular highlight for inherent conveyance
        drawRect(
            color = Color.White.copy(alpha = 0.15f),
            topLeft = Offset.Zero,
            size = size.copy(height = depth)
        )
        
        // Bottom Inset shadow
        drawRect(
            color = Color.Black.copy(alpha = 0.4f),
            topLeft = Offset(0f, size.height - depth),
            size = size.copy(height = depth)
        )
    }
}
