---
"@azphalt/registry": minor
---

Add subscription listings. A `Listing` (and `CheckoutInput`) may carry an `interval` (`"month"` /
`"year"`); `Marketplace.listForSale` takes an optional `{ interval }`, `checkout` threads it to the
provider, and `StripePaymentProvider` opens a **subscription-mode** Connect checkout (recurring
price + `application_fee_percent` split) when an interval is present, a one-time destination charge
otherwise. A new `periodEnd(fromIso, interval)` helper computes the billing-period end so fulfilment
can issue an **expiring** `kind:"subscription"` entitlement (the download gate already honors expiry
via `verifyEntitlement`). Additive: one-time listings and their perpetual entitlements are unchanged.
