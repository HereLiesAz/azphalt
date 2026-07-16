import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.CanvasBasedWindow
import components.BentoGrid
import components.HeroSection
import components.PackageBentoCard
import components.PackageDto
import components.fetchPackages

@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    CanvasBasedWindow(title = "Azphalt Storefront") {
        MaterialTheme(
            colorScheme = darkColorScheme(
                background = Color(0xFF0A0A0B), // Deep slate black
                surface = Color(0xFF16161A), // Sleek elevated surface
                primary = Color(0xFF9F86FF), // Neon violet for actions
                onPrimary = Color.White
            )
        ) {
            var packages by remember { mutableStateOf<List<PackageDto>>(emptyList()) }
            var isLoading by remember { mutableStateOf(true) }

            LaunchedEffect(Unit) {
                packages = fetchPackages()
                isLoading = false
            }

            LazyVerticalGrid(
                columns = GridCells.Adaptive(360.dp),
                modifier = Modifier
                    .fillMaxSize()
                    .background(MaterialTheme.colorScheme.background)
                    .padding(32.dp),
                horizontalArrangement = Arrangement.spacedBy(24.dp),
                verticalArrangement = Arrangement.spacedBy(24.dp)
            ) {
                // Hero Section spans all columns
                item(span = { GridItemSpan(maxLineSpan) }) {
                    HeroSection()
                }

                // Bento Grid layout features span all columns
                item(span = { GridItemSpan(maxLineSpan) }) {
                    BentoGrid()
                }
                
                // Listings title
                item(span = { GridItemSpan(maxLineSpan) }) {
                    Column(modifier = Modifier.padding(top = 48.dp, bottom = 16.dp)) {
                        Text(
                            text = "Featured Listings",
                            style = MaterialTheme.typography.headlineLarge.copy(
                                fontWeight = FontWeight.ExtraBold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        )
                    }
                }

                // Dynamic Listings
                if (isLoading) {
                    item(span = { GridItemSpan(maxLineSpan) }) {
                        Box(modifier = Modifier.fillMaxWidth().height(200.dp), contentAlignment = Alignment.Center) {
                            CircularProgressIndicator()
                        }
                    }
                } else {
                    items(packages) { pkg ->
                        PackageBentoCard(pkg)
                    }
                }
            }
        }
    }
}
