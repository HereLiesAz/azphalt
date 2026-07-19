package main

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.itemsIndexed
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import components.DetailScreen
import components.HeroSection
import components.PackageBentoCard
import components.SortMode
import components.StorefrontControls
import kotlinx.coroutines.delay
import models.PackageSummary
import network.fetchRegistryList
import theme.AzphaltExpressiveTheme

/** The still frame non-active card previews hold (so exactly one card animates at a time). */
private const val STILL_FRAME = 0.32f

@Composable
fun StorefrontApp() {
    AzphaltExpressiveTheme {
        var packages by remember { mutableStateOf<List<PackageSummary>>(emptyList()) }
        var loading by remember { mutableStateOf(true) }
        var selected by remember { mutableStateOf<PackageSummary?>(null) }

        // Search / sort / filter state (kept across detail navigation).
        var query by remember { mutableStateOf("") }
        var sort by remember { mutableStateOf(SortMode.POPULAR) }
        var price by remember { mutableStateOf(0) } // 0 = All, 1 = Free, 2 = Paid
        var category by remember { mutableStateOf<String?>(null) }
        var app by remember { mutableStateOf<String?>(null) }

        LaunchedEffect(Unit) {
            try {
                packages = fetchRegistryList()
            } catch (e: Exception) {
                println("Failed to fetch packages: $e")
            } finally {
                loading = false
            }
        }

        val current = selected
        if (current != null) {
            DetailScreen(current, onBack = { selected = null })
            return@AzphaltExpressiveTheme
        }

        val categories = remember(packages) { packages.flatMap { it.mediaDomains }.distinct().sorted() }
        val apps = remember(packages) { packages.flatMap { it.targetApps }.distinct().sorted() }

        val filtered = packages.filter { p ->
            (query.isBlank() || listOf(p.name, p.description ?: "", p.author ?: "", p.id).any { it.contains(query, ignoreCase = true) }) &&
                (when (price) {
                    1 -> p.price == null && p.priceStatus != "paid"
                    2 -> p.price != null || p.priceStatus == "paid"
                    else -> true
                }) &&
                (category == null || category in p.mediaDomains) &&
                (app == null || p.targetApps.isEmpty() || app in p.targetApps)
        }
        val shown = when (sort) {
            SortMode.POPULAR -> filtered.sortedByDescending { it.downloads }
            SortMode.RATING -> filtered.sortedByDescending { it.rating ?: -1f }
            SortMode.RECENT -> filtered.sortedByDescending { it.updatedAt ?: "" }
            SortMode.NAME -> filtered.sortedBy { it.name.lowercase() }
        }

        // One shared clock; a single card animates at a time, auto-advancing through the grid.
        val clockTransition = rememberInfiniteTransition(label = "clock")
        val clock by clockTransition.animateFloat(
            initialValue = 0f,
            targetValue = 1f,
            animationSpec = infiniteRepeatable(tween(durationMillis = 5200, easing = LinearEasing), RepeatMode.Restart),
            label = "clock",
        )
        var activeIndex by remember { mutableStateOf(0) }
        LaunchedEffect(shown.size) {
            if (shown.isEmpty()) return@LaunchedEffect
            while (true) {
                delay(2600)
                activeIndex = (activeIndex + 1) % shown.size
            }
        }
        val active = if (shown.isEmpty()) -1 else activeIndex % shown.size

        Scaffold(
            containerColor = MaterialTheme.colorScheme.background,
            floatingActionButton = {
                ExtendedFloatingActionButton(
                    onClick = { println("publish") },
                    containerColor = MaterialTheme.colorScheme.tertiary,
                    contentColor = MaterialTheme.colorScheme.onTertiary,
                ) {
                    Text("Publish  +", fontWeight = FontWeight.Bold)
                }
            },
        ) { padding ->
            // A SINGLE scroll container (a nested LazyVerticalGrid-in-LazyColumn crashes Compose).
            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 320.dp),
                modifier = Modifier.fillMaxSize().padding(padding),
                contentPadding = PaddingValues(start = 24.dp, end = 24.dp, top = 8.dp, bottom = 96.dp),
                horizontalArrangement = Arrangement.spacedBy(20.dp),
                verticalArrangement = Arrangement.spacedBy(20.dp),
            ) {
                item(span = { GridItemSpan(maxLineSpan) }) {
                    HeroSection(total = packages.size)
                }
                item(span = { GridItemSpan(maxLineSpan) }) {
                    StorefrontControls(
                        query = query, onQuery = { query = it },
                        sort = sort, onSort = { sort = it },
                        price = price, onPrice = { price = it },
                        categories = categories, category = category, onCategory = { category = it },
                        apps = apps, app = app, onApp = { app = it },
                    )
                }
                when {
                    loading -> item(span = { GridItemSpan(maxLineSpan) }) {
                        Box(Modifier.fillMaxWidth().height(160.dp), contentAlignment = Alignment.Center) {
                            CircularProgressIndicator(color = MaterialTheme.colorScheme.primary)
                        }
                    }
                    shown.isEmpty() -> item(span = { GridItemSpan(maxLineSpan) }) {
                        Box(Modifier.fillMaxWidth().height(160.dp), contentAlignment = Alignment.Center) {
                            Text(
                                "No extensions match your search.",
                                style = MaterialTheme.typography.titleMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                    else -> itemsIndexed(shown) { index, pkg ->
                        PackageBentoCard(
                            pkg = pkg,
                            phase = if (index == active) clock else STILL_FRAME,
                            onOpen = { selected = it },
                        )
                    }
                }
            }
        }
    }
}
