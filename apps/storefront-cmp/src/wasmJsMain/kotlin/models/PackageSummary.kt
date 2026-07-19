package models

import kotlinx.serialization.Serializable

@Serializable
data class PriceDto(val amountCents: Int, val currency: String)

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
    val capabilities: List<String> = emptyList()
)
