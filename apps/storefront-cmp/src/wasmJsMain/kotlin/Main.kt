package main

import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.window.ComposeViewport
import kotlinx.browser.document

/**
 * The id of the element the app mounts into, rendered by the page that hosts this bundle.
 *
 * See [main] for why the app does not mount into `document.body`.
 */
private const val MOUNT_ID = "compose-root"

@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    // Mount into a dedicated container, not `document.body`.
    //
    // The storefront is served by a Next.js page, and in the App Router React *owns* `<body>` — it
    // renders it and reconciles its children during hydration. Compose appending its own container
    // there put the two in conflict over the same parent, and the container never survived: the
    // bundle loaded, `main()` ran, the app composed and fetched its catalogue, and nothing was ever
    // in the DOM to draw into. No error was raised anywhere, on either side. The page was simply
    // blank, which is the worst way for this to fail — it looks like the store has no content
    // rather than like something is broken.
    //
    // A container the host page renders explicitly belongs to the host, and Compose only fills it.
    // Falling back to `body` keeps the bundle working in its own standalone `index.html`, which has
    // no such element and no React.
    val mount = document.getElementById(MOUNT_ID) ?: document.body!!
    ComposeViewport(mount) {
        StorefrontApp()
    }
}
