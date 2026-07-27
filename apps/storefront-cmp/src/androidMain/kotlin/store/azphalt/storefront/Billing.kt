/*
 * The paid lane, via Google Play Billing.
 *
 * A Play-distributed app that sells digital goods cannot send the user to a web checkout for them, so
 * the Stripe flow the desktop and web storefronts use is not available here (spec/store-app.md §
 * Paid packages). The shape is:
 *
 *   1. Play takes the money and returns a purchase token.
 *   2. The registry verifies that token with Google and issues the same signed entitlement it would
 *      have issued against a web payment.
 *   3. That entitlement travels to the host in `azphalt.extra.ENTITLEMENT`, and the host verifies it
 *      offline exactly as it would one bought any other way.
 *
 * The host never learns how the purchase was made, which is the point: billing is the store app's
 * problem, and keeping it that way is half of "I don't want to build a storefront".
 *
 * A purchase token is deliberately **not** treated as proof of entitlement by itself. It is a receipt
 * from Google to this app; only the registry can turn it into something a host will accept, because
 * only the registry holds the signing key. A client that minted its own entitlement would be trivially
 * bypassed by patching the client.
 */
package store.azphalt.storefront

import android.app.Activity
import android.content.Context
import com.android.billingclient.api.AcknowledgePurchaseParams
import com.android.billingclient.api.BillingClient
import com.android.billingclient.api.BillingClientStateListener
import com.android.billingclient.api.BillingFlowParams
import com.android.billingclient.api.BillingResult
import com.android.billingclient.api.PendingPurchasesParams
import com.android.billingclient.api.ProductDetails
import com.android.billingclient.api.Purchase
import com.android.billingclient.api.PurchasesUpdatedListener
import com.android.billingclient.api.QueryProductDetailsParams
import com.android.billingclient.api.acknowledgePurchase
import com.android.billingclient.api.queryProductDetails
import kotlin.coroutines.resume
import kotlinx.coroutines.suspendCancellableCoroutine
import network.exchangePlayPurchase

/**
 * The Play product id for a package.
 *
 * Play SKUs are lowercase and allow only letters, digits, underscore and period, so a reverse-DNS
 * package id maps across directly. Keeping it derivable rather than stored means a newly published
 * paid package needs no extra mapping table to become purchasable.
 */
public fun playProductId(packageId: String): String =
    packageId.lowercase().replace(Regex("[^a-z0-9_.]"), "_")

/** What a purchase attempt produced. */
public sealed interface PurchaseOutcome {
    /** Bought (or already owned), and the registry issued an entitlement the host can verify. */
    public data class Entitled(public val entitlementToken: String) : PurchaseOutcome
    /** The user backed out. Not an error — the caller should return to browsing, not show a failure. */
    public data object Cancelled : PurchaseOutcome
    public data class Failed(public val message: String) : PurchaseOutcome
}

/**
 * A Play Billing session scoped to one purchase.
 *
 * `BillingClient` is connection-oriented and delivers purchases through a listener rather than a
 * return value, so this wraps one attempt into a single suspending call and closes the connection
 * afterwards.
 */
public class Billing(private val context: Context) {

    private var client: BillingClient? = null
    private var pending: ((List<Purchase>?, BillingResult) -> Unit)? = null

    private val listener = PurchasesUpdatedListener { result, purchases ->
        pending?.invoke(purchases, result)
    }

    private suspend fun connect(): BillingClient = suspendCancellableCoroutine { cont ->
        val c = BillingClient.newBuilder(context)
            .setListener(listener)
            // Required from Billing 7: a one-time product purchase can come back PENDING (cash at a
            // convenience store, a parent's approval). Declaring that up front is what stops the
            // library rejecting the flow outright.
            .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
            .build()
        client = c
        c.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(result: BillingResult) {
                if (result.responseCode == BillingClient.BillingResponseCode.OK) {
                    if (cont.isActive) cont.resume(c)
                } else if (cont.isActive) {
                    cont.cancel(IllegalStateException("Play Billing unavailable: ${result.debugMessage}"))
                }
            }

            override fun onBillingServiceDisconnected() {
                // Deliberately not retried here. A dropped connection mid-purchase resolves on the
                // next attempt, and Play reconciles the purchase itself — silently reconnecting and
                // re-launching a billing flow risks charging twice for one user intent.
            }
        })
    }

    /**
     * Buy [packageId], then exchange the Play purchase for a registry entitlement.
     *
     * Acknowledgement matters and is easy to miss: Play automatically refunds any purchase not
     * acknowledged within three days. It happens only after the registry has issued the entitlement,
     * so a purchase this app could not turn into something usable stays unacknowledged and the user
     * gets their money back rather than paying for nothing.
     */
    public suspend fun purchase(activity: Activity, packageId: String, repository: String?): PurchaseOutcome {
        val c = try {
            connect()
        } catch (e: Exception) {
            return PurchaseOutcome.Failed(e.message ?: "could not reach Play Billing")
        }

        try {
            val productId = playProductId(packageId)
            val query = QueryProductDetailsParams.newBuilder()
                .setProductList(
                    listOf(
                        QueryProductDetailsParams.Product.newBuilder()
                            .setProductId(productId)
                            .setProductType(BillingClient.ProductType.INAPP)
                            .build(),
                    ),
                )
                .build()

            val details: ProductDetails = c.queryProductDetails(query).productDetailsList?.firstOrNull()
                ?: return PurchaseOutcome.Failed("“$packageId” is not available for purchase on this account")

            val flow = BillingFlowParams.newBuilder()
                .setProductDetailsParamsList(
                    listOf(
                        BillingFlowParams.ProductDetailsParams.newBuilder()
                            .setProductDetails(details)
                            .build(),
                    ),
                )
                .build()

            val purchase = awaitPurchase(c, activity, flow) ?: return PurchaseOutcome.Cancelled

            if (purchase.purchaseState != Purchase.PurchaseState.PURCHASED) {
                // PENDING is a real outcome, not a failure: the user has committed but Play has not
                // collected yet. Nothing is owed to them until it does.
                return PurchaseOutcome.Failed("Purchase is pending — it will unlock once Play completes it.")
            }

            val entitlement = try {
                exchangePlayPurchase(
                    packageId = packageId,
                    productId = productId,
                    purchaseToken = purchase.purchaseToken,
                    repository = repository,
                )
            } catch (e: Exception) {
                return PurchaseOutcome.Failed(
                    "Paid, but the licence could not be issued: ${e.message ?: "registry unreachable"}. " +
                        "It will be granted automatically when the registry is reachable again.",
                )
            }

            if (!purchase.isAcknowledged) {
                c.acknowledgePurchase(
                    AcknowledgePurchaseParams.newBuilder().setPurchaseToken(purchase.purchaseToken).build(),
                )
            }

            return PurchaseOutcome.Entitled(entitlement)
        } finally {
            client?.endConnection()
            client = null
        }
    }

    /** Bridge the `PurchasesUpdatedListener` callback into the suspending flow. Null means cancelled. */
    private suspend fun awaitPurchase(
        c: BillingClient,
        activity: Activity,
        flow: BillingFlowParams,
    ): Purchase? = suspendCancellableCoroutine { cont ->
        pending = { purchases, result ->
            pending = null
            if (cont.isActive) {
                when (result.responseCode) {
                    BillingClient.BillingResponseCode.OK -> cont.resume(purchases?.firstOrNull())
                    BillingClient.BillingResponseCode.USER_CANCELED -> cont.resume(null)
                    // Already owned is a success from the user's point of view — they paid before, on
                    // this device or another. Treating it as an error would make a reinstall look like
                    // a broken purchase.
                    BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED -> cont.resume(purchases?.firstOrNull())
                    else -> cont.cancel(IllegalStateException("Play Billing: ${result.debugMessage}"))
                }
            }
        }
        c.launchBillingFlow(activity, flow)
        cont.invokeOnCancellation { pending = null }
    }
}
