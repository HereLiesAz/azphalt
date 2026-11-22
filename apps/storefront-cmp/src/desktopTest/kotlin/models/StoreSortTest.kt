package models

import kotlin.test.Test
import kotlin.test.assertEquals

class StoreSortTest {
    private fun p(id: String, name: String, installs: Int? = null, downloads: Int = 0, rating: Float? = null, updated: String? = null) =
        PackageSummary(id = id, name = name, version = "1.0.0", installs = installs, downloads = downloads, rating = rating, updatedAt = updated)

    private val items = listOf(
        p("c", "charlie", installs = 5, rating = 4f, updated = "2026-01-02"),
        p("a", "Alpha", installs = 50, rating = 4.5f, updated = "2026-03-01"),
        p("b", "bravo", downloads = 5, updated = "2026-02-01"),
        p("d", "Delta", installs = 50),
    )
    private val held = setOf("a", "b")
    private fun ids(s: SortMode, list: List<PackageSummary> = items) = sortPackages(list, s) { it in held }.map { it.id }

    @Test fun popular() = assertEquals(listOf("a", "d", "b", "c"), ids(SortMode.POPULAR))
    @Test fun rating() = assertEquals(listOf("a", "c", "d", "b"), ids(SortMode.RATING))
    @Test fun recent() = assertEquals(listOf("a", "b", "c", "d"), ids(SortMode.RECENT))
    @Test fun nameAscIgnoresCase() = assertEquals(listOf("a", "b", "c", "d"), ids(SortMode.NAME))
    @Test fun nameDesc() = assertEquals(listOf("d", "c", "b", "a"), ids(SortMode.NAME_DESC))
    @Test fun notInstalledFirst() = assertEquals(listOf("d", "c", "a", "b"), ids(SortMode.NOT_INSTALLED))
    @Test fun installedFirst() = assertEquals(listOf("a", "b", "d", "c"), ids(SortMode.INSTALLED))

    @Test fun installOrdersWithNothingHeldEqualPopular() =
        assertEquals(ids(SortMode.POPULAR), sortPackages(items, SortMode.NOT_INSTALLED).map { it.id })

    @Test fun everyOrderIsDeterministicForAnyInputOrder() {
        SortMode.values().forEach { assertEquals(ids(it), ids(it, items.reversed()), it.name) }
    }

    @Test fun fullTiesBreakOnId() =
        assertEquals(listOf("y", "z"), sortPackages(listOf(p("z", "Same"), p("y", "Same")), SortMode.NAME).map { it.id })

    @Test fun removedIsNotHeld() {
        val inv = mapOf(
            "x" to installedEntry("x", "1"),
            "r" to ExtensionStateEntry(id = "r", version = "1", state = ExtensionState.REMOVED),
        )
        assertEquals(listOf(true, false, false), listOf(isHeld(inv, "x"), isHeld(inv, "r"), isHeld(inv, "none")))
    }
}
