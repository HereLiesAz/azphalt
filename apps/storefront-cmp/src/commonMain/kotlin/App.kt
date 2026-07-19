package main

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
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
import models.PackageSummary
import network.fetchRegistryList
import theme.AzphaltExpressiveTheme

@Composable
fun StorefrontApp() {
    AzphaltExpressiveTheme {
        var packages by remember { mutableStateOf<List<PackageSummary>>(emptyList()) }
        var loading by remember { mutableStateOf(true) }
        var filter by remember { mutableStateOf(0) } // 0 = All, 1 = Free, 2 = Paid
        var selected by remember { mutableStateOf<PackageSummary?>(null) }

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
        } else {
            val shown = when (filter) {
                1 -> packages.filter { it.price == null && it.priceStatus != "paid" }
                2 -> packages.filter { it.price != null || it.priceStatus == "paid" }
                else -> packages
            }

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
                        HeroSection(
                            total = packages.size,
                            selectedFilter = filter,
                            onFilter = { filter = it },
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
                                    "No extensions match this filter.",
                                    style = MaterialTheme.typography.titleMedium,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                )
                            }
                        }
                        else -> items(shown) { pkg ->
                            PackageBentoCard(pkg, onOpen = { selected = it })
                        }
                    }
                }
            }
        }
    }
}
