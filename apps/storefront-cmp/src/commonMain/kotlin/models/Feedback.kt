package models

import kotlinx.serialization.Serializable

/** Response from `POST /api/ratings` — the package's new aggregate after a rating is recorded. */
@Serializable
data class RatingResponse(
    val ok: Boolean = false,
    val rating: Float? = null,
    val ratingCount: Int = 0,
    val error: String? = null,
)

/**
 * Response from `POST /api/reports` — for a plain flag (`quarantined`) or a developer IP claim
 * (`trusted` when the claim was signed by the original's publisher key).
 */
@Serializable
data class ReportResponse(
    val ok: Boolean = false,
    val quarantined: Boolean = false,
    val trusted: Boolean = false,
    val error: String? = null,
)
