package models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/**
 * Response from `POST /api/ratings` — the package's new aggregate after a rating is recorded.
 *
 * The Worker never sends an `ok` field: success is a body with the aggregate and no `error`, failure
 * is `{ "error": "…" }` (the HTTP layer hands back the body whatever the status). This used to default
 * `ok` to `false`, so every rating that WAS stored was shown to the user as "Could not submit".
 * [ok] now means "the server did not report an error"; an explicit `ok` in the body still wins.
 */
@Serializable
data class RatingResponse(
    @SerialName("ok") private val okField: Boolean? = null,
    val rating: Float? = null,
    val ratingCount: Int = 0,
    val error: String? = null,
) {
    val ok: Boolean get() = okField ?: (error == null)
}

/**
 * Response from `POST /api/reports` — for a plain flag (`quarantined`) or a developer IP claim
 * (`trusted` when the claim was signed by the original's publisher key).
 */
@Serializable
data class ReportResponse(
    @SerialName("ok") private val okField: Boolean? = null,
    val quarantined: Boolean = false,
    val trusted: Boolean = false,
    val error: String? = null,
) {
    /** True unless the server reported an `error` (the Worker sends no `ok`; see [RatingResponse]). */
    val ok: Boolean get() = okField ?: (error == null)
}
