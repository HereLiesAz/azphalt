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

/** A processor checkout session returned by `POST /api/checkout`. */
@Serializable
data class CheckoutSessionDto(
    val id: String = "",
    val url: String = "",
    val status: String = "pending",
    val amount: MoneyDto? = null,
)

/** Response from `POST /api/checkout` (real Stripe in production; stubbed only in local/test mode). */
@Serializable
data class CheckoutResponse(
    val stub: Boolean = false,
    val message: String? = null,
    val error: String? = null,
    /** Machine-readable reason for [error], e.g. `already_owned` (409): the account holds the licence. */
    val code: String? = null,
    val session: CheckoutSessionDto? = null,
    val breakdown: PriceBreakdownDto? = null,
)

/**
 * The answer to show once the checkout page has been *asked* to open. If nothing opened, the user is
 * not at a checkout page, so it is a failure (the main button then says Retry) rather than the
 * "Checkout started" a successful session would have reported.
 */
fun checkoutAfterOpen(checkout: CheckoutResponse, opened: Boolean): CheckoutResponse =
    if (opened) checkout else CheckoutResponse(error = "Couldn't open the checkout page.")
