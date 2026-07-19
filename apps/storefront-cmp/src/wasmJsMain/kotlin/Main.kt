package main

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.*
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.window.ComposeViewport
import components.HeroSection
import components.PackageGrid
import kotlinx.browser.document
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

@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    // Compose for Web (Kotlin/Wasm) entry point: render the app into the document body.
    // CanvasBasedWindow + skiko's onWasmReady were the old js-canvas API; ComposeViewport is the
    // current wasmJs one.
    ComposeViewport(document.body!!) {
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
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    item {
                        HeroSection()
                    }
                    item {
                        PackageGrid(packages)
                    }
                }
            }
        }
    }
}
