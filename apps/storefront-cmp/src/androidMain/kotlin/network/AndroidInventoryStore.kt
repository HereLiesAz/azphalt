/*
 * The Android store app's inventory record.
 *
 * Mostly it should not need one. When a host launches this app to acquire something it passes its own
 * inventory (`spec/state-reporting.md` § 3.1), and that report beats anything recorded here — see
 * `models.mergeInventories`. This exists for the standalone case: the app opened from the launcher,
 * with no calling host, where the store is as blind as the web page is.
 */
package network

import android.content.Context
import models.ExtensionStateEntry
import models.decodeLocalInventory
import models.encodeLocalInventory

private const val PREFS = "azphalt.inventory"
private const val KEY = "v1"

private fun prefs() = AndroidAppContext.get()?.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

actual fun loadStoredInventory(): Map<String, ExtensionStateEntry> = try {
    decodeLocalInventory(prefs()?.getString(KEY, null))
} catch (_: Throwable) {
    emptyMap()
}

actual fun saveStoredInventory(entries: Collection<ExtensionStateEntry>) {
    try {
        prefs()?.edit()?.putString(KEY, encodeLocalInventory(entries))?.apply()
    } catch (_: Throwable) {
        // Nicer labels are not worth an exception on a storage failure.
    }
}
