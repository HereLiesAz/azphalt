package main

import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.window.ComposeViewport
import kotlinx.browser.document

@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    // Compose for Web (Kotlin/Wasm) entry point: render the app into the document body.
    ComposeViewport(document.body!!) {
        StorefrontApp()
    }
}
