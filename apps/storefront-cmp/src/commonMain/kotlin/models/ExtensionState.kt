package models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/**
 * What a host has done with an extension it acquired — `spec/state-reporting.md` § 1.
 *
 * This is the difference between a catalogue and a store. Without it every card says *Get*, including
 * the ones the user already has; with it a card can say *Open*, *Enable* or *Update*, and the two
 * states that only exist because acquisition and installation are separate steps here — `DOWNLOADED`
 * and `FAILED` — become visible instead of silent.
 */
@Serializable
public enum class ExtensionState {
    /** Bytes held and verified, not installed. The user wanted it and does not yet have it. */
    @SerialName("downloaded")
    DOWNLOADED,

    /** Installed but switched off. */
    @SerialName("installed")
    INSTALLED,

    /** Installed and enabled — available to the user right now. */
    @SerialName("active")
    ACTIVE,

    /** Acquisition or installation did not complete. See [ExtensionStateEntry.reason]. */
    @SerialName("failed")
    FAILED,

    /** Had it, does not now. Distinct from never having had it: it can be offered as a reinstall. */
    @SerialName("removed")
    REMOVED,
}

/** One host-reported state for one package (`spec/state-reporting.md` § 1 — Entry shape). */
@Serializable
public data class ExtensionStateEntry(
    public val id: String,
    public val version: String = "",
    public val state: ExtensionState? = null,
    /** ISO-8601 instant the state was entered, when the host tracked one. */
    public val at: String? = null,
    /** Free text, `failed` only — `integrity-mismatch`, `publisher-change`, `incompatible`. */
    public val reason: String? = null,
)

/** The document a host passes in `azphalt.extra.INVENTORY`. */
@Serializable
public data class HostInventory(
    public val entries: List<ExtensionStateEntry> = emptyList(),
)

/**
 * Parse an inventory document, tolerating everything.
 *
 * This is unauthenticated input from another application, arriving over an intent extra. It gets a
 * store nicer button labels and nothing else — `spec/state-reporting.md` § 3.1 requires it not to
 * influence pricing, entitlement or whether a package may be acquired. So the only sane failure mode
 * is to ignore what does not parse: a host that sends malformed JSON, or a state this build has never
 * heard of, should get the plain *Get* behaviour rather than a broken store.
 *
 * `ignoreUnknownKeys` because the vocabulary is meant to grow, and `coerceInputValues` so an
 * unrecognised `state` string lands as null (dropped below) instead of throwing and taking the whole
 * document with it — losing one entry beats losing five hundred.
 */
private val lenient = Json {
    ignoreUnknownKeys = true
    coerceInputValues = true
    isLenient = true
}

/**
 * States by package id, from an `azphalt.extra.INVENTORY` document. Empty on anything unparseable.
 *
 * Later entries win on a duplicate id: a host that reported the same package twice has told us
 * something contradictory, and the most recent statement is the better guess.
 */
public fun parseHostInventory(json: String?): Map<String, ExtensionStateEntry> {
    if (json.isNullOrBlank()) return emptyMap()
    val parsed = runCatching { lenient.decodeFromString(HostInventory.serializer(), json) }.getOrNull()
        ?: return emptyMap()
    return parsed.entries
        .filter { it.id.isNotBlank() && it.state != null }
        .associateBy { it.id }
}

/**
 * The label a card's action should carry, given what the host reported and what the catalogue offers.
 *
 * `latestVersion` is the store's knowledge, not the host's: *Update* is derived here by comparing
 * versions, because whether something newer exists is the repository's fact and a host cannot know it
 * offline (`spec/state-reporting.md` § 1).
 */
public fun actionLabelFor(entry: ExtensionStateEntry?, latestVersion: String?): String = when (entry?.state) {
    null -> "Get"
    ExtensionState.DOWNLOADED -> "Install"
    ExtensionState.FAILED -> "Retry"
    ExtensionState.REMOVED -> "Reinstall"
    ExtensionState.INSTALLED, ExtensionState.ACTIVE -> {
        val held = entry.version
        if (!latestVersion.isNullOrBlank() && held.isNotBlank() && held != latestVersion) "Update"
        else if (entry.state == ExtensionState.ACTIVE) "Open" else "Enable"
    }
}

/** A short status word for the card's badge, or null when the host said nothing about this package. */
public fun statusLabelFor(entry: ExtensionStateEntry?): String? = when (entry?.state) {
    null -> null
    ExtensionState.DOWNLOADED -> "Downloaded"
    ExtensionState.INSTALLED -> "Installed"
    ExtensionState.ACTIVE -> "Active"
    ExtensionState.FAILED -> "Failed"
    ExtensionState.REMOVED -> "Removed"
}
