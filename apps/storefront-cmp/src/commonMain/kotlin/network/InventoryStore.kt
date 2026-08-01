package network

import models.ExtensionStateEntry

/**
 * Where the store's own inventory record lives on this platform.
 *
 * Per-platform because "remember this across visits" has no common answer: the browser has
 * `localStorage`, the packaged apps have a filesystem, and the Android store app mostly should not
 * be guessing at all — a host tells it what it holds (`spec/state-reporting.md` § 3), and that report
 * beats anything this could record.
 *
 * Implementations MUST NOT throw. Storage can be full, disabled, or blocked by a privacy setting, and
 * none of those are worth failing a browse over — the cost of losing this is nicer button labels.
 */
expect fun loadStoredInventory(): Map<String, ExtensionStateEntry>

/** Persist [entries], replacing what was there. Silent no-op where there is nowhere to put it. */
expect fun saveStoredInventory(entries: Collection<ExtensionStateEntry>)
