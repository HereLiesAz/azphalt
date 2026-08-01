/*
 * The web store's inventory record, in `localStorage`.
 *
 * This is the platform the record exists for: a browser fires `azphalt://install` and learns nothing
 * about what happened next, so without keeping its own books the store cannot tell a visitor which
 * extensions they already have.
 */
package network

import kotlinx.browser.window
import models.ExtensionStateEntry
import models.decodeLocalInventory
import models.encodeLocalInventory

/**
 * Versioned so the shape can change without having to read old documents.
 *
 * `localStorage` is per-origin, which is the right scope: a self-hosted storefront keeps its own
 * record rather than inheriting the flagship's, and neither can see the other's.
 */
private const val KEY = "azphalt.inventory.v1"

actual fun loadStoredInventory(): Map<String, ExtensionStateEntry> = try {
    decodeLocalInventory(window.localStorage.getItem(KEY))
} catch (_: Throwable) {
    // `localStorage` throws outright when storage is disabled — Safari private browsing historically,
    // and any browser with site data blocked. A visitor who has turned storage off has said something
    // about what they want remembered, and the store should browse fine having heard it.
    emptyMap()
}

actual fun saveStoredInventory(entries: Collection<ExtensionStateEntry>) {
    try {
        window.localStorage.setItem(KEY, encodeLocalInventory(entries))
    } catch (_: Throwable) {
        // Also the quota-exceeded path. Dropping the record is the correct failure: it degrades the
        // labels back to what they were before any of this existed.
    }
}
