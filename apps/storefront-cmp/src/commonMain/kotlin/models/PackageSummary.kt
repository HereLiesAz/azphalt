package models

import kotlinx.serialization.Serializable

@Serializable
data class PriceDto(val amountCents: Int, val currency: String)

/** One member of a pack (kind:"pack") — a reference to another package, not a copy of its bytes. */
@Serializable
data class PackEntryDto(
    val id: String,
    val version: String? = null,
    val required: Boolean = false,
    val note: String? = null,
)

/** A pack's member references, surfaced from its manifest by the browse API for the detail view. */
@Serializable
data class PackDto(val entries: List<PackEntryDto> = emptyList())

@Serializable
data class PackageSummary(
    val id: String,
    val name: String,
    val kind: String = "code",
    val description: String? = null,
    val author: String? = null,
    val version: String,
    val price: PriceDto? = null,
    val priceStatus: String = "free",
    val capabilities: List<String> = emptyList(),
    val downloads: Int = 0,
    val rating: Float? = null,
    val ratingCount: Int = 0,
    val updatedAt: String? = null,
    val targetApps: List<String> = emptyList(),
    val mediaDomains: List<String> = emptyList(),
    val types: List<String> = emptyList(),
    /** Developer content-maturity self-attestation: "general" (default) or "mature" (18+, age-gated). */
    val maturity: String = "general",
    val pack: PackDto? = null
) {
    /** True when the developer flagged this as 18+ content the store should put behind an age gate. */
    val isMature: Boolean get() = maturity == "mature"
}
