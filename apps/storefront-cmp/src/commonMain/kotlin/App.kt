package main

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.compose.animation.scaleOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import components.CatalogSection
import components.DetailScreen
import components.HeroCarousel
import components.HeroSection
import components.SortMode
import components.StorefrontControls
import components.buildSections
import kotlinx.coroutines.delay
import models.PackageSummary
import network.fetchRegistryList
import theme.AzphaltExpressiveTheme
import theme.ExpressiveMotion

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

        val categories = remember(packages) { packages.flatMap { it.mediaDomains }.distinct().sorted() }
        val apps = remember(packages) { packages.flatMap { it.targetApps }.distinct().sorted() }

        // Any active search/filter switches the page from curated section carousels to one results row.
        val filtering = query.isNotBlank() || price != 0 || category != null || app != null
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
        val sections = remember(packages) { buildSections(packages) }

        // Hoisted above the catalog↔detail swap so the browse scroll position survives expanding an
        // item and coming back.
        val listState = rememberLazyListState()

        // One shared clock; within each carousel a single card animates at a time.
        val clockTransition = rememberInfiniteTransition(label = "clock")
        val clock by clockTransition.animateFloat(
            initialValue = 0f,
            targetValue = 1f,
            animationSpec = infiniteRepeatable(tween(durationMillis = 5200, easing = LinearEasing), RepeatMode.Restart),
            label = "clock",
        )

        // Clicking a card expands it into the detail view; going back collapses it. Both directions are
        // an expressive scale + fade so the navigation reads as the item growing / shrinking in place.
        val scaleSpec = tween<Float>(durationMillis = 420, easing = ExpressiveMotion.DefaultSpatialEasing)
        val fadeSpec = tween<Float>(durationMillis = 260, easing = ExpressiveMotion.DefaultEffectsEasing)
        AnimatedContent(
            targetState = selected,
            transitionSpec = {
                if (targetState != null) {
                    // Opening: the detail grows in while the catalog recedes.
                    (fadeIn(fadeSpec) + scaleIn(animationSpec = scaleSpec, initialScale = 0.90f)) togetherWith
                        (fadeOut(fadeSpec) + scaleOut(animationSpec = scaleSpec, targetScale = 1.05f))
                } else {
                    // Closing: the detail shrinks back down to the catalog.
                    (fadeIn(fadeSpec) + scaleIn(animationSpec = scaleSpec, initialScale = 1.05f)) togetherWith
                        (fadeOut(fadeSpec) + scaleOut(animationSpec = scaleSpec, targetScale = 0.90f))
                }
            },
            label = "catalog-detail",
        ) { target ->
            if (target != null) {
                DetailScreen(target, onBack = { selected = null })
            } else {
                Scaffold(
                    containerColor = MaterialTheme.colorScheme.background,
                    floatingActionButton = {
                        ExtendedFloatingActionButton(
                            onClick = { println("publish") },
                            containerColor = MaterialTheme.colorScheme.tertiary,
                            contentColor = MaterialTheme.colorScheme.onTertiary,
                            shape = RectangleShape,
                        ) {
                            Text("Publish  +", fontWeight = FontWeight.Bold)
                        }
                    },
                ) { padding ->
                    // LazyColumn of horizontal carousels — a LazyRow per section is safe inside a
                    // LazyColumn (orthogonal axes); only nesting same-axis lazy scrollers crashes.
                    LazyColumn(
                        state = listState,
                        modifier = Modifier.fillMaxSize().padding(padding),
                        contentPadding = PaddingValues(top = 8.dp, bottom = 96.dp),
                        verticalArrangement = Arrangement.spacedBy(30.dp),
                    ) {
                        item {
                            Box(Modifier.padding(horizontal = 24.dp)) { HeroSection(total = packages.size) }
                        }
                        item {
                            Box(Modifier.padding(horizontal = 24.dp)) {
                                StorefrontControls(
                                    query = query, onQuery = { query = it },
                                    sort = sort, onSort = { sort = it },
                                    price = price, onPrice = { price = it },
                                    categories = categories, category = category, onCategory = { category = it },
                                    apps = apps, app = app, onApp = { app = it },
                                )
                            }
                        }
                        when {
                            loading -> item {
                                Box(Modifier.fillMaxWidth().height(160.dp), contentAlignment = Alignment.Center) {
                                    CircularProgressIndicator(color = MaterialTheme.colorScheme.primary)
                                }
                            }
                            filtering && shown.isEmpty() -> item {
                                Box(Modifier.fillMaxWidth().height(160.dp), contentAlignment = Alignment.Center) {
                                    Text(
                                        "No extensions match your search.",
                                        style = MaterialTheme.typography.titleMedium,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                                    )
                                }
                            }
                            filtering -> item {
                                HeroCarousel(
                                    section = CatalogSection("Results", "${shown.size} matching", shown),
                                    clock = clock,
                                    onOpen = { selected = it },
                                )
                            }
                            else -> items(sections, key = { it.title }) { section ->
                                HeroCarousel(section = section, clock = clock, onOpen = { selected = it })
                            }
                        }
                    }
                }
            }
        }
    }
}
