package network

import kotlinx.browser.window
import kotlinx.coroutines.await
import kotlinx.serialization.json.Json
import models.PackageSummary

val json = Json { ignoreUnknownKeys = true }

suspend fun fetchRegistryList(): List<PackageSummary> {
    val response = window.fetch("/api/packages").await()
    val text = response.text().await()
    return json.decodeFromString(text)
}
