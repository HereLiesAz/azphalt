package models

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/** Independent expected category membership for representative package kinds. */
class StoreTaxonomyTest {
    private val taxonomy = StoreTaxonomy(
        schema = 1,
        categories = listOf(
            StoreCategory(id = "brushes", label = "Brushes", idContains = listOf(".brush-")),
            StoreCategory(id = "brushes/oil", label = "Oil Painting", parent = "brushes",
                idContains = listOf(".brush-oil-")),
            StoreCategory(id = "automation", label = "Workflows", kinds = listOf("workflow")),
        ),
    )

    @Test
    fun `oil brush belongs to its parent and its specific medium`() {
        val pkg = PackageSummary(
            id = "com.hereliesaz.azphalt.brush-oil-filbert",
            name = "Filbert", kind = "asset", version = "1.0.0",
        )
        assertEquals(listOf("brushes", "brushes/oil"), taxonomy.keys(pkg))
        assertEquals(listOf("Brushes", "Oil Painting"), taxonomy.available(listOf(pkg)).map { it.label })
    }

    @Test
    fun `workflow without any media domain remains discoverable`() {
        val pkg = PackageSummary(id = "com.example.audit", name = "Audit", kind = "workflow", version = "1.0.0")
        assertEquals(listOf("automation"), taxonomy.keys(pkg))
    }

    @Test
    fun `unmatched future kind receives a fallback category`() {
        val pkg = PackageSummary(id = "com.example.future", name = "Future", kind = "new-kind", version = "1.0.0")
        assertEquals(listOf("kind/new-kind"), taxonomy.keys(pkg))
        assertTrue(taxonomy.available(listOf(pkg)).any { it.id == "kind/new-kind" && it.label == "New-kind" })
    }
}
