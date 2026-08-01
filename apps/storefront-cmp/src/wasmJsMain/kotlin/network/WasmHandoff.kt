/*
 * The browser half of `spec/web-handoff.md`. This is the case the spec was written for: a page that
 * cannot install anything itself, naming a package and hoping something on the device claims it.
 */
package network

import kotlinx.browser.document
import kotlinx.browser.window
import kotlinx.coroutines.delay
import models.installIntentUri
import models.installLink

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

/** The current page URL, used as the `intent://` fallback target. */
private fun currentHref(): String = js("window.location.href")

/** The browser's user-agent string. */
private fun userAgent(): String = js("navigator.userAgent")

/**
 * Whether this is Chrome on Android — the one browser that understands `intent://`.
 *
 * Excludes Firefox and Opera explicitly: both put "Android" and, in Opera's case, "Chrome" in the
 * user-agent while handling `intent://` differently or not at all, and a wrong guess here navigates
 * the user to a URL they cannot read instead of merely failing to hand off.
 */
private fun isChromeAndroid(): Boolean {
    val ua = userAgent()
    return ua.contains("Android") && ua.contains("Chrome") && !ua.contains("Firefox") && !ua.contains("OPR")
}

actual fun handoffUri(id: String, version: String?): String =
    // The fallback URL is this very page: if nothing claims the scheme, Chrome returns here and the
    // heuristic below never has to run.
    if (isChromeAndroid()) installIntentUri(id, version, currentHref()) else installLink(id, version)

actual suspend fun attemptHandoff(link: String): Boolean {
    // Departure is recorded by listeners rather than sampled at the end: a user can leave for a host
    // and come back well inside the wait window, and by the time it expires `visibilityState` is
    // "visible" again. Sampling would read that as "nothing claimed it" and show the fallback to
    // somebody who had just installed the package.
    var left = false
    // Held in vals so the same references can be removed again. Passing a lambda literal directly to
    // both add and remove would register one function and unregister a different one, which is how a
    // listener leak survives a `removeEventListener` that looks correct.
    val mark: (org.w3c.dom.events.Event) -> Unit = { left = true }
    val onVisibility: (org.w3c.dom.events.Event) -> Unit = { if (documentHidden()) left = true }

    fun cleanup() {
        window.removeEventListener("pagehide", mark)
        window.removeEventListener("blur", mark)
        document.removeEventListener("visibilitychange", onVisibility)
    }

    return try {
        window.addEventListener("pagehide", mark)
        window.addEventListener("blur", mark)
        document.addEventListener("visibilitychange", onVisibility)

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
    } finally {
        // Every path, including cancellation. Without this each Install press left three live
        // listeners closing over a dead `left`, so a session of ten presses ran thirty callbacks on
        // every tab switch.
        cleanup()
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
