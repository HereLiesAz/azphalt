---
"@azphalt/registry": minor
---

Add the Stripe Connect **onboarding** surface, the companion to `StripePaymentProvider`'s charge
surface: a fetch-based `StripeConnect` class (`createExpressAccount`, `createAccountLink`,
`getAccount`) and a `SellerAccountStore` seam (+ `InMemorySellerAccountStore`) mapping each
marketplace `sellerId` to its Stripe connected account and live capability flags. Together they let a
seller self-onboard through Stripe-hosted Express onboarding and let checkout resolve the payout
destination from durable state instead of a static env map. `fetch` is injectable for tests; no
`stripe` SDK dependency. The durable `PostgresSellerAccountStore` lives in
`@azphalt/registry-store-vercel`.
