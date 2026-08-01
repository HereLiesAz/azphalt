@file:OptIn(androidx.compose.foundation.layout.ExperimentalLayoutApi::class)

package main

import androidx.compose.animation.AnimatedContent
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
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.sp
import components.Capsule
import components.CascadeCatalog
import components.CascadeResults
import components.displayStyle
import components.eyebrowStyle
import theme.CapsuleShape
import theme.Ground
import theme.Roles
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

        // The idle clock is gone. It drove a permanently-running preview animation on the cards,
        // and the Capsule system forbids exactly that: "nothing moves at rest — no breathing, no
        // spinners, no fades." Motion here is arrival only (the unfold cascade) and response to a
        // press (a capsule extending). A page that is not being touched is still.

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
                    // The page IS the surface. A yellow spread with the fold, and the cascade drawn
                    // straight onto it — no scaffold surface, no cards, no panels.
                    Box(Modifier.fillMaxSize().background(Ground.Spread).padding(padding)) {
                        val header: @Composable () -> Unit = {
                            Column(Modifier.padding(bottom = 4.dp)) {
                                if (handoff != null) {
                                    HandoffBanner(callerLabel = handoff.callerLabel, onCancel = handoff.cancel)
                                    Spacer(Modifier.height(22.dp))
                                }
                                CapsuleHeader(
                                    total = packages.size,
                                    query = query,
                                    onQuery = { query = it },
                                    filtering = filtering,
                                    shownCount = shown.size,
                                )
                                Spacer(Modifier.height(14.dp))
                                CapsuleFilters(
                                    price = price, onPrice = { price = it },
                                    owned = owned, onOwned = { owned = it },
                                    categories = categories, category = category, onCategory = { category = it },
                                )
                            }
                        }

                        when {
                            loading -> Column(Modifier.fillMaxSize().padding(horizontal = 30.dp)) { header() }
                            filtering -> CascadeResults(
                                packages = shown,
                                onOpen = { selected = it },
                                listState = listState,
                                modifier = Modifier.padding(horizontal = 30.dp),
                                header = header,
                            )
                            else -> CascadeCatalog(
                                sections = sections,
                                onOpen = { selected = it },
                                listState = listState,
                                modifier = Modifier.padding(horizontal = 30.dp),
                                header = header,
                            )
                        }
                    }
                }
            }
        }
      }
    }
}

/**
 * The page head: wordmark capsule, search well, headline, count.
 *
 * Replaces the marketing hero and the outlined text field. The search well is a capsule-shaped patch
 * of ink at 14% with no icon and no border — the placeholder states the count, which is the guide's
 * way of telling you the size of the thing you are searching without a label saying "Search".
 */
@Composable
private fun CapsuleHeader(
    total: Int,
    query: String,
    onQuery: (String) -> Unit,
    filtering: Boolean,
    shownCount: Int,
) {
    Column(Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Capsule(
                label = "Azphalt",
                background = Ground.Ink,
                labelSize = 20,
                height = 50.dp,
            )
            Box(
                modifier = Modifier
                    .clip(CapsuleShape.Full)
                    .background(Ground.inkAt(0.14f))
                    .padding(horizontal = 22.dp, vertical = 12.dp),
            ) {
                BasicTextField(
                    value = query,
                    onValueChange = onQuery,
                    singleLine = true,
                    textStyle = TextStyle(
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 0.6.sp,
                        color = Ground.Ink,
                    ),
                    cursorBrush = SolidColor(Roles.Acquire.first),
                    modifier = Modifier.width(230.dp),
                    decorationBox = { inner ->
                        if (query.isEmpty()) {
                            Text(
                                text = "SEARCH $total EXTENSIONS",
                                style = TextStyle(
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 0.6.sp,
                                    color = Ground.inkAt(0.45f),
                                ),
                            )
                        }
                        inner()
                    },
                )
            }
        }

        Spacer(Modifier.height(28.dp))

        Row(verticalAlignment = Alignment.Bottom) {
            Text(
                text = if (filtering) "Results" else "The catalogue",
                style = displayStyle(54),
            )
            Spacer(Modifier.width(16.dp))
            Text(
                text = if (filtering) "$shownCount found" else "$total portable",
                style = eyebrowStyle,
                modifier = Modifier.padding(bottom = 8.dp),
            )
        }
    }
}

/**
 * Filters, as small capsules.
 *
 * Unselected capsules carry no end-cap — the guide's rule for a small filter — so selection reads as
 * "this one gained a cap and went ink" rather than as a colour change a colour-blind viewer would
 * miss. Sort is gone: with the catalogue as an index rather than a ranked list, a sort order was
 * ordering something the user is no longer reading top-to-bottom.
 */
@Composable
private fun CapsuleFilters(
    price: Int,
    onPrice: (Int) -> Unit,
    owned: Int,
    onOwned: (Int) -> Unit,
    categories: List<String>,
    category: String?,
    onCategory: (String?) -> Unit,
) {
    @Composable
    fun row(items: List<Pair<String, Boolean>>, onPick: (Int) -> Unit) {
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items.forEachIndexed { i, (label, selected) ->
                Capsule(
                    label = label,
                    background = if (selected) Roles.Selected.first else Ground.inkAt(0.14f),
                    cap = if (selected) Roles.Selected.second else null,
                    labelSize = 11,
                    height = 32.dp,
                    onClick = { onPick(i) },
                )
            }
        }
    }

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        row(listOf("All" to (price == 0), "Free" to (price == 1), "Paid" to (price == 2))) { onPrice(it) }
        row(listOf("Any" to (owned == 0), "Installed" to (owned == 1), "Not installed" to (owned == 2))) { onOwned(it) }
        if (categories.isNotEmpty()) {
            val labels = listOf("All types" to (category == null)) + categories.map { it to (category == it) }
            row(labels) { i -> onCategory(if (i == 0) null else categories[i - 1]) }
        }
    }
}
