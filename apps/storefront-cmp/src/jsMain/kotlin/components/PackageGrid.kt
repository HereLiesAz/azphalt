package components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.awaitEachGesture
import androidx.compose.foundation.gestures.awaitFirstDown
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlinx.browser.window
import kotlinx.coroutines.await
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import theme.skeuomorphicSurface
import theme.ExpressiveMotion

@Serializable
data class PriceDto(val amountCents: Int, val currency: String)

@Serializable
data class PackageDto(
    val id: String,
    val name: String,
    val description: String? = null,
    val author: String? = null,
    val version: String,
    val price: PriceDto? = null
)

val json = Json { ignoreUnknownKeys = true }

suspend fun fetchPackages(): List<PackageDto> {
    return try {
        val response = window.fetch("/api/packages").await()
        val text = response.text().await()
        json.decodeFromString(text)
    } catch (e: Exception) {
        println("Failed to load packages: ${e.message}")
        emptyList()
    }
}

@Composable
fun PackageBentoCard(pkg: PackageDto) {
    var isPressed by remember { mutableStateOf(false) }

    val scale = animateFloatAsState(
        targetValue = if (isPressed) 0.96f else 1f,
        animationSpec = androidx.compose.animation.core.tween(
            durationMillis = ExpressiveMotion.FastEffectsDuration,
            easing = ExpressiveMotion.FastEffects
        )
    ).value

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(280.dp)
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
            .clickable {
                window.location.href = "/pkg/${pkg.id}"
            }
            .padding(32.dp)
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            Text(
                text = pkg.name,
                style = MaterialTheme.typography.headlineMedium.copy(
                    fontWeight = FontWeight.ExtraBold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            )
            Spacer(Modifier.height(16.dp))
            Text(
                text = pkg.description ?: "",
                style = MaterialTheme.typography.bodyLarge.copy(
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
                ),
                maxLines = 3
            )
            Spacer(Modifier.weight(1f))
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                val authorText = pkg.author ?: "Unknown"
                Text(
                    text = "@$authorText",
                    style = MaterialTheme.typography.labelLarge.copy(
                        color = MaterialTheme.colorScheme.primary,
                        fontWeight = FontWeight.Bold
                    )
                )
                Spacer(Modifier.weight(1f))
                if (pkg.price != null) {
                    val amount = pkg.price.amountCents / 100.0
                    val currency = pkg.price.currency
                    Text(
                        text = "$$amount $currency",
                        style = MaterialTheme.typography.titleMedium.copy(
                            color = Color(0xFF10B981),
                            fontWeight = FontWeight.ExtraBold
                        )
                    )
                } else {
                    Text(
                        text = "FREE",
                        style = MaterialTheme.typography.titleMedium.copy(
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                            fontWeight = FontWeight.Bold
                        )
                    )
                }
            }
        }
    }
}
