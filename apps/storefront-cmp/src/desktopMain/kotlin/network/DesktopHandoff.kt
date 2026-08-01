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
import models.installLink

/** No platform-specific encoding here: `intent://` is Chrome-on-Android only. */
actual fun handoffUri(id: String, version: String?): String = installLink(id, version)

actual suspend fun attemptHandoff(link: String): Boolean = withContext(Dispatchers.IO) {
    // Attempt it — a desktop host that registered the scheme gets the link.
    runCatching {
        val desktop = Desktop.getDesktop()
        if (desktop.isSupported(Desktop.Action.BROWSE)) desktop.browse(URI(link))
    }

    // Then report **false regardless**, because this platform cannot tell the two outcomes apart.
    // `Desktop.browse` throws when no handler is registered on some platforms and silently succeeds
    // on others — Linux delegates to `xdg-open`, which commonly exits 0 having done nothing.
    //
    // Returning `true` on the non-throwing path would be the worse failure: `true` means "the user
    // has left for a host", so the caller shows nothing at all — no navigation, no sheet, no
    // download. That is the original dead end reached by a new route, and it would hit exactly the
    // desktop users who have no host, which today is all of them.
    //
    // `false` costs a user who *does* have a host one redundant sheet, which is closable and offers
    // things they can still use. The asymmetry is the whole argument.
    false
}

// Built from the same `API_BASE` this target browses, not a second hardcoded host. With its own
// constant, a desktop build repointed at a self-hosted repository would browse that catalogue and
// then offer the flagship registry's bytes — a mismatch the user cannot see and cannot correct.
actual fun downloadUrl(id: String, version: String): String =
    "${API_BASE.trimEnd('/')}/packages/$id/versions/$version/download"

actual fun openExternal(url: String) {
    runCatching {
        val desktop = Desktop.getDesktop()
        if (desktop.isSupported(Desktop.Action.BROWSE)) desktop.browse(URI(url))
    }
    // A headless or restricted environment simply cannot open a browser. Nothing to recover.
}
