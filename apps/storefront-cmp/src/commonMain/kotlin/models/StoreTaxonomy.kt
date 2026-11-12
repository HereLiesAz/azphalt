package models

import com.azphalt.storefront.storefront_cmp.generated.resources.Res
import kotlinx.serialization.Serializable
import org.jetbrains.compose.resources.ExperimentalResourceApi
import kotlinx.serialization.json.Json

/**
 * Presentation-only taxonomy shared byte-for-byte with the React store.
 * This changes neither package manifests nor the repository API. Hosts load
 * this bundled resource locally, so the catalog works offline after loading.
 */
@Serializable
data class StoreCategory(
    val id: String,
    val label: String,
    val parent: String? = null,
    val idContains: List<String> = emptyList(),
    val idEquals: List<String> = emptyList(),
    val kinds: List<String> = emptyList(),
    val types: List<String> = emptyList(),
    val mediaDomains: List<String> = emptyList(),
)

@Serializable
data class StoreTaxonomy(
    val schema: Int,
    val description: String = "",
    val categories: List<StoreCategory>,
) {
    /** Children are also in their ancestors, so filtering Brushes includes Acrylic. */
    fun keys(pkg: PackageSummary): List<String> {
        val id = pkg.id.lowercase()
        val matches = mutableSetOf<String>()
        for (category in categories) {
            val hit = category.idEquals.any { it.lowercase() == id } ||
                category.idContains.any { id.contains(it.lowercase()) } ||
                category.kinds.any { it.equals(pkg.kind, ignoreCase = true) } ||
                category.types.any { type -> pkg.types.any { it.equals(type, ignoreCase = true) } } ||
                category.mediaDomains.any { domain -> pkg.mediaDomains.any { it.equals(domain, ignoreCase = true) } }
            if (!hit) continue
            var current: StoreCategory? = category
            val seen = mutableSetOf<String>()
            while (current != null && seen.add(current.id)) {
                matches += current.id
                val parent = current.parent
                current = if (parent == null) null else categories.firstOrNull { it.id == parent }
            }
        }
        if (matches.isEmpty()) matches += "kind/" + pkg.kind.lowercase()
        return matches.toList()
    }

    /** Only show categories present in this catalog, in the shared curated order. */
    fun available(packages: List<PackageSummary>): List<StoreCategory> {
        val keys = packages.flatMap(::keys).toSet()
        val known = categories.filter { it.id in keys }
        val extra = keys.filter { it.startsWith("kind/") }.sorted().map { id ->
            val raw = id.substringAfter("/")
            StoreCategory(id = id, label = raw.replaceFirstChar { it.uppercase() })
        }
        return known + extra
    }

    fun label(id: String): String =
        categories.firstOrNull { it.id == id }?.label
            ?: id.substringAfter("/").replaceFirstChar { it.uppercase() }
}

/** The same JSON React imports directly; no platform-specific rule duplication. */
@OptIn(ExperimentalResourceApi::class)
suspend fun loadStoreTaxonomy(): StoreTaxonomy {
    val source = Res.readBytes("files/store-taxonomy.json").decodeToString()
    return Json { ignoreUnknownKeys = true }.decodeFromString<StoreTaxonomy>(source).also {
        require(it.schema == 1) { "Unsupported storefront taxonomy schema" }
    }
}
