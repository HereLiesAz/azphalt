package models

import kotlinx.serialization.Serializable

@Serializable
data class MoneyDto(val amountCents: Int, val currency: String = "USD")

@Serializable
data class PriceBreakdownDto(
    val gross: MoneyDto? = null,
    val processorFee: MoneyDto? = null,
    val platformFee: MoneyDto? = null,
    val sellerNet: MoneyDto? = null,
)

/** Response from `POST /api/checkout` (the consignment paid lane; stubbed in the dev storefront). */
@Serializable
data class CheckoutResponse(
    val stub: Boolean = false,
    val message: String? = null,
    val error: String? = null,
    val breakdown: PriceBreakdownDto? = null,
)
