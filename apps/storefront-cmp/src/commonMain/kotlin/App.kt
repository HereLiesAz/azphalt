package main

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import components.HeroSection
import components.PackageBentoCard
import models.PackageSummary
import network.fetchRegistryList
import theme.AzphaltExpressiveTheme

@Composable
fun StorefrontApp() {
    AzphaltExpressiveTheme {
        var packages by remember { mutableStateOf<List<PackageSummary>>(emptyList()) }
        var filter by remember { mutableStateOf(0) } // 0 = All, 1 = Free, 2 = Paid

        LaunchedEffect(Unit) {
            try {
                packages = fetchRegistryList()
            } catch (e: Exception) {
                println("Failed to fetch packages: $e")
            }
        }

        val shown = when (filter) {
            1 -> packages.filter { it.priceStatus != "paid" && it.price == null }
            2 -> packages.filter { it.priceStatus == "paid" || it.price != null }
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
            // The hero is a full-width spanning header row above the adaptive card grid.
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
                items(shown) { pkg ->
                    PackageBentoCard(pkg)
                }
            }
        }
    }
}
