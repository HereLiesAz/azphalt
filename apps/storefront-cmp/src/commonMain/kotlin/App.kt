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
import components.HandoffBanner
import components.HeroCarousel
import components.HeroSection
import components.SortMode
import components.StorefrontControls
import components.buildSections
import kotlinx.coroutines.delay
import androidx.compose.runtime.CompositionLocalProvider
import models.ExtensionState
import models.ExtensionStateEntry
import models.HandoffSession
import models.LocalHostInventory
import models.PackageSummary
import models.forgetInstall
import models.installedEntry
import models.mergeInventories
import network.fetchRegistryList
import network.loadStoredInventory
import network.saveStoredInventory
import theme.AzphaltExpressiveTheme
import theme.ExpressiveMotion

@Composable
fun StorefrontApp(
    /**
     * What the calling host has already done with these extensions (`spec/state-reporting.md` § 3).
     * Empty for the web store and for the app opened on its own — neither has a host to ask.
     */
    hostInventory: Map<String, ExtensionStateEntry> = emptyMap(),
    /**
     * Set when another app launched the store to get something for itself (`models/HandoffSession.kt`).
     *
     * It changes three things and nothing else: where the catalogue is read from (scoped to what the
     * host can run), what the Install button does (hand the bytes back rather than fire a link), and
     * a banner naming who is asking. This is the whole difference between the store a person opens
     * and the store a host opens, and it is deliberately this small.
     */
    handoff: HandoffSession? = null,
) {
    AzphaltExpressiveTheme {
        // The store's own record of what it has handed to a host (`models/LocalInventory.kt`).
        //
        // Loaded once and kept in state so recording an install re-renders every card that mentions
        // it — the grid, the carousels and the detail — without a reload.
        var localInventory by remember { mutableStateOf(loadStoredInventory()) }

        // A host's report wins wherever it says anything; this is only what the store believes in the
        // absence of one. See `mergeInventories`.
        val inventory = remember(localInventory, hostInventory) { mergeInventories(localInventory, hostInventory) }

      CompositionLocalProvider(LocalHostInventory provides inventory) {
        var packages by remember { mutableStateOf<List<PackageSummary>>(emptyList()) }
        var loading by remember { mutableStateOf(true) }
        var selected by remember { mutableStateOf<PackageSummary?>(null) }

        // Search / sort / filter state (kept across detail navigation).
        var query by remember { mutableStateOf("") }
        var sort by remember { mutableStateOf(SortMode.POPULAR) }
        var price by remember { mutableStateOf(0) } // 0 = All, 1 = Free, 2 = Paid
        var category by remember { mutableStateOf<String?>(null) }
        var app by remember { mutableStateOf<String?>(null) }
        // 0 = All, 1 = Installed, 2 = Not installed. Filtering on what you already have is the point
        // of keeping the record at all.
        var owned by remember { mutableStateOf(0) }

        LaunchedEffect(handoff) {
            try {
                // A handoff reads the catalogue narrowed to the requesting host; on its own the store
                // browses everything.
                packages = handoff?.load?.invoke() ?: fetchRegistryList()
            } catch (e: Exception) {
                println("Failed to fetch packages: $e")
            } finally {
                loading = false
            }
        }

        val categories = remember(packages) { packages.flatMap { it.mediaDomains }.distinct().sorted() }
        val apps = remember(packages) { packages.flatMap { it.targetApps }.distinct().sorted() }

        // Any active search/filter switches the page from curated section carousels to one results row.
        val filtering = query.isNotBlank() || price != 0 || category != null || app != null || owned != 0
        val filtered = packages.filter { p ->
            (query.isBlank() || listOf(p.name, p.description ?: "", p.author ?: "", p.id).any { it.contains(query, ignoreCase = true) }) &&
                (when (price) {
                    1 -> p.price == null && p.priceStatus != "paid"
                    2 -> p.price != null || p.priceStatus == "paid"
                    else -> true
                }) &&
                (when (owned) {
                    // `REMOVED` is held rather than dropped so a reinstall can be offered, so "have it"
                    // is a question about the state, not about the key being present.
                    1 -> inventory[p.id]?.state.let { it != null && it != ExtensionState.REMOVED }
                    2 -> inventory[p.id]?.state.let { it == null || it == ExtensionState.REMOVED }
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

        // One session-wide age confirmation: once the viewer confirms 18+, mature cards reveal for the
        // rest of the session (developer-set maturity gate, not verified age assurance).
        var ageConfirmed by remember { mutableStateOf(false) }

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
                DetailScreen(
                    pkg = target,
                    // The whole catalogue, so the install fallback can build the host directory out
                    // of its `kind:"app"` listings (spec/web-handoff.md § Host directory) without a
                    // second fetch.
                    catalog = packages,
                    ageConfirmed = ageConfirmed,
                    onConfirmAge = { ageConfirmed = true },
                    onBack = { selected = null },
                    onHandedOff = { handed ->
                        localInventory = localInventory + (handed.id to installedEntry(handed.id, handed.version))
                        saveStoredInventory(localInventory.values)
                    },
                    // In a handoff the Install button owes the caller bytes, not a link.
                    onAcquire = handoff?.acquire,
                    onForget = { forgotten ->
                        localInventory = forgetInstall(localInventory, forgotten.id)
                        saveStoredInventory(localInventory.values)
                    },
                )
            } else {
                Scaffold(
                    containerColor = MaterialTheme.colorScheme.background,
                    floatingActionButton = {
                        // Publishing is a thing you come to the store to do, not something to offer
                        // somebody who is halfway through another app's task.
                        if (handoff == null) {
                            ExtendedFloatingActionButton(
                                onClick = { println("publish") },
                                containerColor = MaterialTheme.colorScheme.tertiary,
                                contentColor = MaterialTheme.colorScheme.onTertiary,
                                shape = RectangleShape,
                            ) {
                                Text("Publish  +", fontWeight = FontWeight.Bold)
                            }
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
                        if (handoff != null) {
                            item {
                                Box(Modifier.padding(horizontal = 24.dp, vertical = 8.dp)) {
                                    HandoffBanner(callerLabel = handoff.callerLabel, onCancel = handoff.cancel)
                                }
                            }
                        }
                        item {
                            Box(Modifier.padding(horizontal = 24.dp)) { HeroSection(total = packages.size) }
                        }
                        item {
                            Box(Modifier.padding(horizontal = 24.dp)) {
                                StorefrontControls(
                                    query = query, onQuery = { query = it },
                                    sort = sort, onSort = { sort = it },
                                    price = price, onPrice = { price = it },
                                    owned = owned, onOwned = { owned = it },
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
                                    ageConfirmed = ageConfirmed,
                                    onConfirmAge = { ageConfirmed = true },
                                    onOpen = { selected = it },
                                )
                            }
                            else -> items(sections, key = { it.title }) { section ->
                                HeroCarousel(
                                    section = section,
                                    clock = clock,
                                    ageConfirmed = ageConfirmed,
                                    onConfirmAge = { ageConfirmed = true },
                                    onOpen = { selected = it },
                                )
                            }
                        }
                    }
                }
            }
        }
      }
    }
}
