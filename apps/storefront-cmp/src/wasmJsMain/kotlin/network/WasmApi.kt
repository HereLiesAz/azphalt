package network

import kotlin.js.JsString
import kotlinx.browser.window
import kotlinx.coroutines.await
import models.PackageSummary
import org.w3c.fetch.Response

actual suspend fun fetchRegistryList(): List<PackageSummary> {
    // Kotlin/Wasm needs each Promise<T>.await() pinned via the receiver's expected type: fetch
    // resolves to a Response, and Response.text() resolves to a JsString we bring to a Kotlin String.
    val response: Response = window.fetch("/api/packages").await()
    val body: JsString = response.text().await()
    return json.decodeFromString<List<PackageSummary>>(body.toString())
}
