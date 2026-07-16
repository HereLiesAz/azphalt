package components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.awaitEachGesture
import androidx.compose.foundation.gestures.awaitFirstDown
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import theme.skeuomorphicSurface
import theme.ExpressiveMotion

@Composable
fun BentoGrid() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 64.dp, vertical = 32.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().height(300.dp),
            horizontalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            BentoCard(
                title = "Registry",
                subtitle = "Blazing fast package resolution.",
                modifier = Modifier.weight(2f)
            )
            BentoCard(
                title = "SDK",
                subtitle = "Type-safe extensions.",
                modifier = Modifier.weight(1f)
            )
        }
        Row(
            modifier = Modifier.fillMaxWidth().height(400.dp),
            horizontalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            BentoCard(
                title = "Conformance",
                subtitle = "Strict adherence to the Azphalt standard.",
                modifier = Modifier.weight(1f)
            )
            BentoCard(
                title = "Importers",
                subtitle = "Seamless migration tools.",
                modifier = Modifier.weight(2f)
            )
        }
    }
}

@Composable
fun BentoCard(title: String, subtitle: String, modifier: Modifier = Modifier) {
    var isPressed by remember { mutableStateOf(false) }
    
    // Animate scale to implement shuddering/swelling physics
    val scale = animateFloatAsState(
        targetValue = if (isPressed) 0.96f else 1f,
        animationSpec = androidx.compose.animation.core.tween(
            durationMillis = ExpressiveMotion.FastEffectsDuration,
            easing = ExpressiveMotion.FastEffects
        )
    ).value

    Box(
        modifier = modifier
            .fillMaxHeight()
            .scale(scale)
            .clip(RoundedCornerShape(32.dp))
            .background(MaterialTheme.colorScheme.surface)
            .skeuomorphicSurface(depth = 8f)
            .pointerInput(Unit) {
                awaitEachGesture {
                    awaitFirstDown()
                    isPressed = true
                    do {
                        val event = awaitPointerEvent()
                    } while (event.changes.any { it.pressed })
                    isPressed = false
                }
            }
            .padding(32.dp)
    ) {
        Column {
            Text(
                text = title,
                style = MaterialTheme.typography.headlineMedium.copy(
                    fontWeight = FontWeight.ExtraBold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            )
            Spacer(Modifier.height(16.dp))
            Text(
                text = subtitle,
                style = MaterialTheme.typography.bodyLarge.copy(
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
                )
            )
        }
    }
}
