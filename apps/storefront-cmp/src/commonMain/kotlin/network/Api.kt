package network

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import models.CheckoutResponse
import models.PackageSummary
import models.RatingResponse
import models.ReportResponse

val json = Json { ignoreUnknownKeys = true }

expect suspend fun fetchRegistryList(): List<PackageSummary>

/** Begin a consignment purchase for [packageId] (the paid lane). Stubbed server-side in the demo. */
expect suspend fun startCheckout(packageId: String): CheckoutResponse

/** POST [body] (a JSON string) to [path] on the storefront API and return the raw response text. */
expect suspend fun httpPostJson(path: String, body: String): String

/** Record one 1–5 star rating for [packageId]; returns the package's new aggregate. */
suspend fun submitRating(packageId: String, stars: Int): RatingResponse {
    val body = buildJsonObject {
        put("packageId", packageId)
        put("stars", stars)
    }.toString()
    return json.decodeFromString<RatingResponse>(httpPostJson("/api/ratings", body))
}

/** File a user abuse/quality flag against [packageId] (marketplace-integrity § 2). */
suspend fun submitReport(packageId: String, reason: String, detail: String?): ReportResponse {
    val body = buildJsonObject {
        put("packageId", packageId)
        put("reason", reason)
        if (!detail.isNullOrBlank()) put("detail", detail)
    }.toString()
    return json.decodeFromString<ReportResponse>(httpPostJson("/api/reports", body))
}

/**
 * File a developer / rights-holder IP claim: [packageId] allegedly infringes the claimant's own
 * [originalPackageId]. A [signature] over `azphalt-ip-claim:v1:<packageId>:<originalPackageId>` by the
 * original's publisher key makes the claim trusted; otherwise it queues for human review.
 */
suspend fun submitIpClaim(
    packageId: String,
    originalPackageId: String,
    detail: String?,
    signature: String?,
): ReportResponse {
    val body = buildJsonObject {
        put("packageId", packageId)
        put("reason", "ip-claim")
        put("originalPackageId", originalPackageId)
        if (!detail.isNullOrBlank()) put("detail", detail)
        if (!signature.isNullOrBlank()) put("signature", signature)
    }.toString()
    return json.decodeFromString<ReportResponse>(httpPostJson("/api/reports", body))
}

/**
 * Fetch raw bytes for [url], or null if it cannot be loaded.
 *
 * Used for store-card preview images. Returns null rather than throwing because a missing preview is
 * a cosmetic absence, not an error: the card falls back to its procedural art and the grid keeps
 * rendering. A preview that failed to load must never be able to take the store down with it.
 */
expect suspend fun fetchBytes(url: String): ByteArray?
