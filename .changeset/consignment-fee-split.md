---
"@azphalt/registry": minor
---

Consignment checkout now withholds the **processor fee as well as the platform cut** from the seller's payout, so the seller nets exactly the quoted `sellerNet`.

Previously `Marketplace.checkout()` set the Stripe destination-charge application fee to just `platformFee`, which left the platform eating Stripe's processing cost and the seller receiving `gross − platform` (more than the `gross − processor − platform` the quote promised). The application fee is now `platformFee + processorFee`.

`CheckoutInput.platformFee` is renamed to **`applicationFee`** to name what the field actually is — the full fee withheld in the destination charge — and `checkout()` computes it from the breakdown. Callers constructing a `CheckoutInput` by hand must rename the field; the amount they should pass is `platformFee + processorFee`.
