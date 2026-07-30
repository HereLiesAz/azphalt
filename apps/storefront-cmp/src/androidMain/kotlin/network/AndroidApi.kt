/*
 * The Android network layer.
 *
 * Unlike the desktop and web actuals, this one talks to the **Repository API** (`/packages`) rather
 * than the storefront's private `/api` namespace. That is not a style preference: app scoping,
 * `mediaDomains` and `kinds` are Repository API query parameters, and they are exactly what a store
 * app acting for another application needs. `/api/packages` returns the whole catalogue with no way
 * to narrow it.
 *
 * It is also what lets `EXTRA_REPOSITORY` work at all — a host pinned to its own conforming
 * repository passes its base URL, and everything here keeps working against it.
 */
package network

import java.net.HttpURLConnection
import java.net.URI
import java.net.URLEncoder
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import models.CheckoutResponse
import models.PackageSummary

/** The public azphalt repository. Overridable per request so a host can point at its own. */
public const val DEFAULT_REPOSITORY: String = "https://www.azphalt.store"

private const val TIMEOUT_MS = 20_000

/**
 * Cap on a downloaded package.
 *
 * The verifier has its own decompression limit, but that only applies once bytes are in memory —
 * this stops a hostile or misconfigured repository from streaming until the device runs out of it.
 */
private const val MAX_PACKAGE_BYTES = 64L * 1024 * 1024

/** A response body plus the response headers a caller needs. */
private class Fetched(val bytes: ByteArray, val headers: Map<String, String>)

private fun httpGet(url: String, bearer: String? = null): ByteArray = httpFetch(url, bearer).bytes

private fun httpFetch(url: String, bearer: String? = null): Fetched {
    val conn = (URI.create(url).toURL().openConnection() as HttpURLConnection).apply {
        requestMethod = "GET"
        connectTimeout = TIMEOUT_MS
        readTimeout = TIMEOUT_MS
        setRequestProperty("accept", "application/json, application/octet-stream")
        // A paid package's download is gated on the entitlement (repository-api.md § Download Package):
        // without it the repository answers 401/402, which is the correct behaviour, not a bug to
        // work around.
        if (bearer != null) setRequestProperty("authorization", "Bearer $bearer")
        instanceFollowRedirects = true
    }
    try {
        val code = conn.responseCode
        if (code !in 200..299) {
            val detail = conn.errorStream?.readBytes()?.decodeToString()?.take(200).orEmpty()
            throw IllegalStateException("HTTP $code from $url${if (detail.isBlank()) "" else ": $detail"}")
        }
        val out = java.io.ByteArrayOutputStream()
        val buf = ByteArray(32 * 1024)
        var total = 0L
        conn.inputStream.use { input ->
            while (true) {
                val n = input.read(buf)
                if (n <= 0) break
                total += n
                if (total > MAX_PACKAGE_BYTES) throw IllegalStateException("response exceeds ${MAX_PACKAGE_BYTES / 1024 / 1024} MiB")
                out.write(buf, 0, n)
            }
        }
        // Lower-cased keys: HTTP header names are case-insensitive and a server may spell
        // `azphalt-report-token` however it likes.
        val headers = buildMap {
            for ((key, values) in conn.headerFields) {
                val name = key?.lowercase() ?: continue
                values.firstOrNull()?.let { put(name, it) }
            }
        }
        return Fetched(out.toByteArray(), headers)
    } finally {
        conn.disconnect()
    }
}

private fun enc(v: String): String = URLEncoder.encode(v, "UTF-8")

/**
 * Browse a conforming repository, narrowed to what the calling host can actually use.
 *
 * `limit` is set high because the picker shows one flat list; the repository pages at 20 by default,
 * and a store that silently showed the user the first twenty of a hundred-and-thirty would look
 * broken rather than paginated.
 */
public suspend fun fetchRegistryList(
    app: String,
    mediaDomains: List<String> = emptyList(),
    kinds: List<String> = emptyList(),
    repository: String? = null,
): List<PackageSummary> = withContext(Dispatchers.IO) {
    val base = (repository ?: DEFAULT_REPOSITORY).trimEnd('/')
    val params = buildList {
        add("app=${enc(app)}")
        add("limit=200")
        if (mediaDomains.isNotEmpty()) add("mediaDomains=${enc(mediaDomains.joinToString(","))}")
        if (kinds.isNotEmpty()) add("kinds=${enc(kinds.joinToString(","))}")
    }
    val body = httpGet("$base/packages?${params.joinToString("&")}").decodeToString()

    // `/packages` answers `{ packages, total, page, pages }`; be tolerant of a bare array so this also
    // works against a repository that serves the list directly.
    val parsed = json.parseToJsonElement(body)
    val array: JsonArray = when (parsed) {
        is JsonArray -> parsed
        is JsonObject -> parsed["packages"]?.jsonArray ?: JsonArray(emptyList())
        else -> JsonArray(emptyList())
    }
    array.map { json.decodeFromJsonElement(PackageSummary.serializer(), it) }
}

/** A package's bytes plus the metadata the handoff passes back to the host. */
public data class DownloadedPackage(
    public val bytes: ByteArray,
    public val integrity: String?,
    public val entitlement: String?,
    /**
     * The `azphalt-report-token` response header, when the repository issued one
     * (`spec/state-reporting.md` § 4.2). Absent from repositories that keep no install statistics —
     * which is most of them, since the endpoint is optional.
     */
    public val reportToken: String? = null,
)

/**
 * Fetch one package's `.azp`.
 *
 * `integrity` comes from the repository's own summary rather than being recomputed here: it is the
 * digest of the *unsigned* package, which cannot be derived from signed bytes without reproducing the
 * exact archive the publisher built.
 */
public suspend fun downloadPackage(
    id: String,
    version: String,
    repository: String? = null,
    entitlement: String? = null,
): DownloadedPackage = withContext(Dispatchers.IO) {
    val base = (repository ?: DEFAULT_REPOSITORY).trimEnd('/')

    val integrity = runCatching {
        val detail = httpGet("$base/packages/${enc(id)}").decodeToString()
        json.parseToJsonElement(detail).jsonObject["versions"]?.jsonArray
            ?.firstOrNull { it.jsonObject["version"]?.jsonPrimitive?.content == version }
            ?.jsonObject?.get("integrity")?.jsonPrimitive?.content
    }.getOrNull()

    val fetched = httpFetch("$base/packages/${enc(id)}/versions/${enc(version)}/download", bearer = entitlement)
    DownloadedPackage(
        bytes = fetched.bytes,
        integrity = integrity,
        entitlement = entitlement,
        reportToken = fetched.headers["azphalt-report-token"],
    )
}

// --- expect/actual for the shared Compose UI -------------------------------------------------------
//
// The shared storefront calls these with no notion of a calling app, so the no-argument actual browses
// the public repository unscoped — that is the standalone MainActivity case.

public actual suspend fun fetchRegistryList(): List<PackageSummary> = withContext(Dispatchers.IO) {
    val body = httpGet("$DEFAULT_REPOSITORY/packages?limit=200").decodeToString()
    val parsed = json.parseToJsonElement(body)
    val array: JsonArray = when (parsed) {
        is JsonArray -> parsed
        is JsonObject -> parsed["packages"]?.jsonArray ?: JsonArray(emptyList())
        else -> JsonArray(emptyList())
    }
    array.map { json.decodeFromJsonElement(PackageSummary.serializer(), it) }
}

public actual suspend fun httpPostJson(path: String, body: String): String = withContext(Dispatchers.IO) {
    val conn = (URI.create("$DEFAULT_REPOSITORY$path").toURL().openConnection() as HttpURLConnection).apply {
        requestMethod = "POST"
        connectTimeout = TIMEOUT_MS
        readTimeout = TIMEOUT_MS
        doOutput = true
        setRequestProperty("content-type", "application/json")
    }
    try {
        conn.outputStream.use { it.write(body.toByteArray()) }
        val stream = if (conn.responseCode in 200..299) conn.inputStream else conn.errorStream
        stream?.readBytes()?.decodeToString().orEmpty()
    } finally {
        conn.disconnect()
    }
}

/**
 * Trade a verified Play purchase for a registry-signed entitlement.
 *
 * The exchange has to happen server-side because only the registry can verify the token with Google
 * and only the registry holds the signing key. A client that minted its own entitlement would be
 * bypassed by anyone willing to patch the client, which is the whole reason the host is told to
 * verify the entitlement's signature rather than trust its bearer.
 */
public suspend fun exchangePlayPurchase(
    packageId: String,
    productId: String,
    purchaseToken: String,
    repository: String? = null,
): String = withContext(Dispatchers.IO) {
    val base = (repository ?: DEFAULT_REPOSITORY).trimEnd('/')
    val body = buildJsonObject {
        put("packageId", packageId)
        put("productId", productId)
        put("purchaseToken", purchaseToken)
    }.toString()

    val conn = (URI.create("$base/entitlements/play").toURL().openConnection() as HttpURLConnection).apply {
        requestMethod = "POST"
        connectTimeout = TIMEOUT_MS
        readTimeout = TIMEOUT_MS
        doOutput = true
        setRequestProperty("content-type", "application/json")
    }
    try {
        conn.outputStream.use { it.write(body.toByteArray()) }
        val code = conn.responseCode
        val text = (if (code in 200..299) conn.inputStream else conn.errorStream)?.readBytes()?.decodeToString().orEmpty()
        if (code !in 200..299) throw IllegalStateException("HTTP $code: ${text.take(200)}")
        json.parseToJsonElement(text).jsonObject["entitlement"]?.jsonPrimitive?.content
            ?: throw IllegalStateException("registry returned no entitlement")
    } finally {
        conn.disconnect()
    }
}

public actual suspend fun startCheckout(packageId: String): CheckoutResponse {
    // Deliberately not the web checkout. A Play-distributed app selling digital goods must use Play
    // Billing (spec/store-app.md § Paid packages), so the paid lane on Android goes through
    // store.azphalt.storefront.Billing rather than this shared entry point.
    throw UnsupportedOperationException(
        "paid packages on Android go through Play Billing, not the web checkout",
    )
}

public actual suspend fun fetchBytes(url: String): ByteArray? = withContext(Dispatchers.IO) {
    runCatching { httpGet(if (url.startsWith("http")) url else "$DEFAULT_REPOSITORY$url") }.getOrNull()
}
