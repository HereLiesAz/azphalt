/*
 * The desktop half of `spec/web-handoff.md`.
 *
 * Desktop hosts can register URI schemes on every major OS, so the contract needs nothing new here.
 * What it does not have is a way to *ask* whether one is registered: `java.awt.Desktop` will happily
 * report success for a scheme the OS then silently drops. So this actual is the honest middle case —
 * it attempts the handoff and reports only what it can actually observe.
 */
package network

import java.awt.Desktop
import java.net.URI
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

actual suspend fun attemptHandoff(link: String): Boolean = withContext(Dispatchers.IO) {
    // `browse` throws when the platform has no handler registered for the scheme, which is the signal
    // we want. Where it does not throw we cannot tell "launched a host" from "went nowhere", so this
    // reports success — and the caller's fallback stays reachable from the sheet either way rather
    // than depending on this answer being right.
    //
    // No desktop host implements the scheme yet (`web-handoff.md` § Open questions), so in practice
    // this is the throwing path today.
    runCatching {
        val desktop = Desktop.getDesktop()
        if (!desktop.isSupported(Desktop.Action.BROWSE)) return@withContext false
        desktop.browse(URI(link))
        true
    }.getOrDefault(false)
}

actual fun downloadUrl(id: String, version: String): String =
    "https://azphalt.store/packages/$id/versions/$version/download"

actual fun openExternal(url: String) {
    runCatching {
        val desktop = Desktop.getDesktop()
        if (desktop.isSupported(Desktop.Action.BROWSE)) desktop.browse(URI(url))
    }
    // A headless or restricted environment simply cannot open a browser. Nothing to recover.
}
