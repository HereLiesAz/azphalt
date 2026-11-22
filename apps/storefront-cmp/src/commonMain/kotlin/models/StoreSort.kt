package models

/**
 * Sort orders for the catalogue.
 *
 * Only fields a catalogue entry really carries are used: install count, rating, `updatedAt`, name.
 * There is no "first published" field, so there is no "Newest" order.
 *
 * [NOT_INSTALLED] and [INSTALLED] **sort, they do not filter** (the Installed filter row does that):
 * they group on whether the viewer holds the package and order each group by popularity.
 */
enum class SortMode(val label: String) {
    POPULAR("Popular"),
    RATING("Top rated"),
    RECENT("Recently updated"),
    NAME("Name A–Z"),
    NAME_DESC("Name Z–A"),
    NOT_INSTALLED("Not installed first"),
    INSTALLED("Installed first"),
}

private val byName: Comparator<PackageSummary> =
    Comparator<PackageSummary> { a, b -> a.name.compareTo(b.name, ignoreCase = true) }.thenBy { it.name }.thenBy { it.id }

private val byPopular: Comparator<PackageSummary> =
    Comparator<PackageSummary> { a, b -> b.installCount.compareTo(a.installCount) }.then(byName)

/**
 * A sorted copy. Every order is total — ties fall through to name, then id — so the result does
 * not depend on input order. [isHeld] is only consulted by the two install orders.
 */
fun sortPackages(items: List<PackageSummary>, sort: SortMode, isHeld: (String) -> Boolean = { false }): List<PackageSummary> {
    val cmp: Comparator<PackageSummary> = when (sort) {
        SortMode.POPULAR -> byPopular
        SortMode.RATING -> Comparator<PackageSummary> { a, b -> (b.rating ?: -1f).compareTo(a.rating ?: -1f) }.then(byPopular)
        SortMode.RECENT -> Comparator<PackageSummary> { a, b -> (b.updatedAt ?: "").compareTo(a.updatedAt ?: "") }.then(byName)
        SortMode.NAME -> byName
        SortMode.NAME_DESC -> byName.reversed()
        SortMode.NOT_INSTALLED -> Comparator<PackageSummary> { a, b -> isHeld(a.id).compareTo(isHeld(b.id)) }.then(byPopular)
        SortMode.INSTALLED -> Comparator<PackageSummary> { a, b -> isHeld(b.id).compareTo(isHeld(a.id)) }.then(byPopular)
    }
    return items.sortedWith(cmp)
}

/** True when the viewer has the package; `REMOVED` is kept in the record, so presence is not enough. */
fun isHeld(inventory: Map<String, ExtensionStateEntry>, id: String): Boolean =
    inventory[id]?.state.let { it != null && it != ExtensionState.REMOVED }
