package main

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import components.HeroSection
import components.PackageBentoCard
import models.PackageSummary
import network.fetchRegistryList

val DarkThemeColors = darkColorScheme(
    primary = Color(0xFF6C47FF),
    background = Color(0xFF05050A),
    surface = Color(0xFF151520),
    onPrimary = Color.White,
    onBackground = Color.White,
    onSurface = Color.White
)

@Composable
fun StorefrontApp() {
    MaterialTheme(colorScheme = DarkThemeColors) {
        var packages by remember { mutableStateOf<List<PackageSummary>>(emptyList()) }

        LaunchedEffect(Unit) {
            try {
                packages = fetchRegistryList()
            } catch (e: Exception) {
                println("Failed to fetch packages: $e")
            }
        }

        // Main Storefront Layout with deep space gradient
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.radialGradient(
                        colors = listOf(Color(0xFF12121C), Color(0xFF05050A)),
                        center = Offset(500f, -200f),
                        radius = 2000f
                    )
                )
        ) {
            // A SINGLE vertical scroll container. The previous structure nested the package
            // LazyVerticalGrid inside a LazyColumn item, which measures the grid with an infinite
            // maximum height — Compose throws IllegalStateException at runtime and the whole app
            // renders blank. Here the grid IS the scroller, and the hero is a full-width header via
            // a spanning item.
            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 340.dp),
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(32.dp),
                horizontalArrangement = Arrangement.spacedBy(32.dp),
                verticalArrangement = Arrangement.spacedBy(32.dp)
            ) {
                item(span = { GridItemSpan(maxLineSpan) }) {
                    HeroSection()
                }
                items(packages) { pkg ->
                    PackageBentoCard(pkg)
                }
            }
        }
    }
}
