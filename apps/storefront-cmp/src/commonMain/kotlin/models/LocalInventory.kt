/*
 * The store's own record of what it has handed to a host.
 *
 * `LocalHostInventory` is fed by a *host* telling the store what it holds (`spec/state-reporting.md`
 * § 3), which is the better answer and the one the Android store app gets. The web store has no host
 * to ask: it fires `azphalt://install` and the page it lives on learns nothing. So every card said
 * *Get*, including the ones the user had just installed, and there was no way to see or filter what
 * you already had.
 *
 * This is the store keeping its own books instead. It is a weaker claim than a host's report and is
 * treated as one — see [mergeInventories], where any host report wins outright.
 */
package models

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/** One locally-recorded acquisition. Deliberately the same shape the host channel uses. */
@Serializable
public data class LocalInventoryDoc(
    public val entries: List<ExtensionStateEntry> = emptyList(),
)

private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; encodeDefaults = true }

/** Serialize for persistence. */
public fun encodeLocalInventory(entries: Collection<ExtensionStateEntry>): String =
    json.encodeToString(LocalInventoryDoc.serializer(), LocalInventoryDoc(entries.toList()))

/**
 * Parse persisted inventory, tolerating anything.
 *
 * Same posture as the host channel's parser: this only changes button labels and a filter, so the
 * sane failure mode is to forget rather than to break. Corrupt storage — a half-written value, a
 * document from a future build — costs the user their local history and nothing else.
 */
public fun decodeLocalInventory(raw: String?): Map<String, ExtensionStateEntry> {
    if (raw.isNullOrBlank()) return emptyMap()
    return try {
        json.decodeFromString<LocalInventoryDoc>(raw)
            .entries
            .filter { it.id.isNotBlank() }
            .associateBy { it.id }
    } catch (_: Exception) {
        emptyMap()
    }
}

/**
 * What the store shows, from both sources.
 *
 * **A host's report always wins.** The host knows; the store guessed. If a host says a package is
 * `REMOVED` and the local record still says `INSTALLED`, the truth is `REMOVED` — and the opposite
 * precedence would make the store argue with the device about what is on it. This ordering is the
 * whole reason the local record is safe to keep at all.
 */
public fun mergeInventories(
    local: Map<String, ExtensionStateEntry>,
    host: Map<String, ExtensionStateEntry>,
): Map<String, ExtensionStateEntry> = if (host.isEmpty()) local else local + host

/**
 * The entry recorded when a handoff succeeds.
 *
 * Recorded as [ExtensionState.INSTALLED] rather than `DOWNLOADED`, and the distinction is worth being
 * explicit about: the store did *not* observe an install. It observed that the user pressed Install
 * and that a host claimed the link, which is the last thing a web page can observe. `DOWNLOADED`
 * means "wanted and not yet had", which would be a worse description of that moment than `INSTALLED`
 * — the user's next question is "did that work", and "not yet had" answers it wrongly in the common
 * case.
 *
 * Two things keep that defensible rather than merely convenient: any host report supersedes it
 * ([mergeInventories]), and where no host ever reports — every web visit — the user can say the store
 * was wrong ([forgetInstall]). A guess with no correction is just a wrong answer that persists.
 */
public fun installedEntry(id: String, version: String, at: String? = null): ExtensionStateEntry =
    ExtensionStateEntry(id = id, version = version, state = ExtensionState.INSTALLED, at = at)

/**
 * Drop a locally-recorded install.
 *
 * Removes the entry rather than setting [ExtensionState.REMOVED]: `REMOVED` is a *host's* statement
 * that a package was uninstalled, which is a different claim from the store admitting it never knew.
 * A host that does report will reassert whatever is true on the device regardless.
 */
public fun forgetInstall(
    inventory: Map<String, ExtensionStateEntry>,
    id: String,
): Map<String, ExtensionStateEntry> = inventory - id
