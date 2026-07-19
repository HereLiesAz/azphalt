package network

import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import models.PackageSummary

actual suspend fun fetchRegistryList(): List<PackageSummary> = withContext(Dispatchers.IO) {
    val client = HttpClient.newBuilder().build()
    // Using a placeholder production URL for the desktop API endpoint
    val request = HttpRequest.newBuilder()
        .uri(URI.create("https://azphalt.hereliesaz.com/api/packages"))
        .GET()
        .build()

    val response = client.send(request, HttpResponse.BodyHandlers.ofString())
    json.decodeFromString<List<PackageSummary>>(response.body())
}
