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
 * What a client that opens the processor's page itself (desktop) answers once checkout has started.
 *
 * Real checkout continues on the processor's hosted page, so a started session is only half done
 * until that page is opened. [open] is the platform's opener and reports whether it handed the URL to
 * anything; if it did not, the user is not at a checkout page, so this is a **failure** (the main
 * button then says Retry) rather than the "Checkout started" a successful session would have reported.
 * It is the only place the opener is consulted, so a call site cannot open the page and forget to
 * check.
 */
fun finishCheckout(checkout: CheckoutResponse, open: (String) -> Boolean): CheckoutResponse {
    val url = checkout.session?.url.orEmpty()
    if (checkout.stub || checkout.error != null || url.isBlank()) return checkout
    return if (open(url)) checkout else CheckoutResponse(error = "Couldn't open the checkout page.")
}
