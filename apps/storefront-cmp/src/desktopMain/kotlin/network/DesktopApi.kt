package network

import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import models.CheckoutResponse
import models.PackageSummary

private const val API_BASE = "https://azphalt.store"

actual suspend fun fetchRegistryList(): List<PackageSummary> = withContext(Dispatchers.IO) {
    val client = HttpClient.newBuilder().build()
    val request = HttpRequest.newBuilder()
        .uri(URI.create("$API_BASE/api/packages"))
        .GET()
        .build()

    val response = client.send(request, HttpResponse.BodyHandlers.ofString())
    json.decodeFromString<List<PackageSummary>>(response.body())
}

actual suspend fun startCheckout(packageId: String): CheckoutResponse = withContext(Dispatchers.IO) {
    val payload = "{\"packageId\":\"$packageId\",\"buyerId\":\"buyer_web\"}"
    val request = HttpRequest.newBuilder()
        .uri(URI.create("$API_BASE/api/checkout"))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(payload))
        .build()
    val response = HttpClient.newBuilder().build().send(request, HttpResponse.BodyHandlers.ofString())
    json.decodeFromString<CheckoutResponse>(response.body())
}

actual suspend fun httpPostJson(path: String, body: String): String = withContext(Dispatchers.IO) {
    val request = HttpRequest.newBuilder()
        .uri(URI.create("$API_BASE$path"))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(body))
        .build()
    HttpClient.newBuilder().build().send(request, HttpResponse.BodyHandlers.ofString()).body()
}
