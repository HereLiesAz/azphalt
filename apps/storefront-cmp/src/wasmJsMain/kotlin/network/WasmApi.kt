package network

import kotlin.js.JsString
import kotlin.js.toJsString
import kotlinx.browser.window
import kotlinx.coroutines.await
import models.CheckoutResponse
import models.PackageSummary
import org.w3c.fetch.RequestInit
import org.w3c.fetch.Response

actual suspend fun fetchRegistryList(): List<PackageSummary> {
    // Kotlin/Wasm needs each Promise<T>.await() pinned via the receiver's expected type: fetch
    // resolves to a Response, and Response.text() resolves to a JsString we bring to a Kotlin String.
    val response: Response = window.fetch("/api/packages").await()
    val body: JsString = response.text().await()
    return json.decodeFromString<List<PackageSummary>>(body.toString())
}

actual suspend fun startCheckout(packageId: String): CheckoutResponse {
    val payload = "{\"packageId\":\"$packageId\",\"buyerId\":\"buyer_web\"}"
    val response: Response = window.fetch(
        "/api/checkout",
        RequestInit(method = "POST", body = payload.toJsString()),
    ).await()
    val body: JsString = response.text().await()
    return json.decodeFromString<CheckoutResponse>(body.toString())
}

actual suspend fun httpPostJson(path: String, body: String): String {
    val response: Response = window.fetch(
        path,
        RequestInit(method = "POST", body = body.toJsString()),
    ).await()
    val text: JsString = response.text().await()
    return text.toString()
}
