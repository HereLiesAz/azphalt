/*
 * The browser half of `spec/web-handoff.md`. This is the case the spec was written for: a page that
 * cannot install anything itself, naming a package and hoping something on the device claims it.
 */
package network

import kotlinx.browser.document
import kotlinx.browser.window
import kotlinx.coroutines.delay

/**
 * How long to wait before concluding nothing claimed the link.
 *
 * There is no API that answers "is this scheme registered", so this is an inference and the number is
 * a judgement, not a measurement: long enough that a cold app launch does not get called a failure,
 * short enough that a user with no host is not left watching nothing happen. It is only ever an upper
 * bound — a host that takes the link fires `visibilitychange` or `pagehide` and we stop waiting
 * immediately, so the full delay elapses only in the case where the answer really is "nothing here".
 */
private const val HANDOFF_WAIT_MS = 1_400L

/** Poll interval while waiting — fine enough to feel immediate, coarse enough to cost nothing. */
private const val POLL_MS = 50L

/**
 * Whether the page is currently hidden.
 *
 * Reached through `js(...)` because Kotlin/Wasm's `Document` binding exposes neither `hidden` nor
 * `visibilityState` — the typed DOM surface is narrower than the browser's, and this is the sanctioned
 * escape hatch for the gap rather than a shortcut around the bindings.
 */
private fun documentHidden(): Boolean = js("document.hidden")

actual suspend fun attemptHandoff(link: String): Boolean {
    // Departure is recorded by listeners rather than sampled at the end: a user can leave for a host
    // and come back well inside the wait window, and by the time it expires `visibilityState` is
    // "visible" again. Sampling would read that as "nothing claimed it" and show the fallback to
    // somebody who had just installed the package.
    var left = false
    val mark: (Any) -> Unit = { left = true }
    return try {
        window.addEventListener("pagehide", mark)
        window.addEventListener("blur", mark)
        document.addEventListener("visibilitychange", {
            if (documentHidden()) left = true
        })

        // `location.href` rather than an iframe or an anchor click: modern browsers treat a top-level
        // navigation to an unhandled scheme as a no-op, which is the behaviour this whole dance is
        // built around. An iframe would be blocked outright in several of them.
        window.location.href = link

        var waited = 0L
        while (waited < HANDOFF_WAIT_MS && !left) {
            delay(POLL_MS)
            waited += POLL_MS
        }
        left
    } catch (_: Throwable) {
        // A navigation the browser refuses is "no host", not an error to surface. The caller shows
        // the fallback either way.
        false
    }
}

// Relative on purpose: a conforming storefront serving this bundle from its own domain should hand
// out its own bytes, not the flagship registry's.
actual fun downloadUrl(id: String, version: String): String =
    "/packages/$id/versions/$version/download"

actual fun openExternal(url: String) {
    // `_blank` with `noopener` so the opened tab cannot reach back into this one through
    // `window.opener` — the host listings are third-party URLs from the registry.
    window.open(url, "_blank", "noopener,noreferrer")
}
