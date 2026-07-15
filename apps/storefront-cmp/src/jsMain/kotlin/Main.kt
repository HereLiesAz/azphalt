import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.CanvasBasedWindow
import kotlinx.browser.window
import kotlinx.coroutines.await
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import theme.skeuomorphicSurface
import org.w3c.fetch.RequestInit

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

@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    CanvasBasedWindow(title = "Azphalt Storefront") {
        MaterialTheme(
            colorScheme = darkColorScheme(
                background = Color(0xFF0F172A),
                surface = Color(0xFF1E293B),
                primary = Color(0xFF38BDF8),
                onPrimary = Color.Black
            )
        ) {
            StorefrontApp()
        }
    }
}

@Composable
fun StorefrontApp() {
    var packages by remember { mutableStateOf<List<PackageDto>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        try {
            val response = window.fetch("/api/packages").await()
            val text = response.text().await()
            packages = json.decodeFromString(text)
        } catch (e: Exception) {
            println("Failed to load packages: ${e.message}")
        } finally {
            isLoading = false
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(Color(0xFF0F172A), Color(0xFF020617))
                )
            )
            .padding(32.dp)
    ) {
        Column {
            Text(
                "Azphalt Premium Collection",
                style = MaterialTheme.typography.headlineLarge.copy(
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            )
            Spacer(modifier = Modifier.height(24.dp))

            if (isLoading) {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.CenterHorizontally))
            } else {
                LazyVerticalGrid(
                    columns = GridCells.Adaptive(300.dp),
                    horizontalArrangement = Arrangement.spacedBy(24.dp),
                    verticalArrangement = Arrangement.spacedBy(24.dp)
                ) {
                    items(packages) { pkg ->
                        PackageCard(pkg)
                    }
                }
            }
        }
    }
}

@Composable
fun PackageCard(pkg: PackageDto) {
    var isHovered by remember { mutableStateOf(false) }

    // Simple glassmorphism card
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp)
            .clip(RoundedCornerShape(16.dp))
            .background(Color.White.copy(alpha = 0.05f))
            .skeuomorphicSurface(depth = 2f)
            .clickable {
                window.location.href = "/pkg/${pkg.id}"
            }
            .padding(24.dp)
    ) {
        Column {
            Text(
                text = pkg.name,
                style = MaterialTheme.typography.titleLarge.copy(color = Color.White, fontWeight = FontWeight.Bold)
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = pkg.description ?: "",
                style = MaterialTheme.typography.bodyMedium.copy(color = Color.White.copy(alpha = 0.7f)),
                maxLines = 3
            )
            Spacer(modifier = Modifier.weight(1f))
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                Text(
                    text = pkg.author ?: "Unknown",
                    style = MaterialTheme.typography.labelMedium.copy(color = Color(0xFF38BDF8))
                )
                Spacer(modifier = Modifier.weight(1f))
                if (pkg.price != null) {
                    Text(
                        text = "$${(pkg.price.amountCents / 100.0)} ${pkg.price.currency}",
                        style = MaterialTheme.typography.labelLarge.copy(color = Color(0xFF10B981), fontWeight = FontWeight.Bold)
                    )
                } else {
                    Text(
                        text = "FREE",
                        style = MaterialTheme.typography.labelLarge.copy(color = Color.White.copy(alpha = 0.5f))
                    )
                }
            }
        }
    }
}
