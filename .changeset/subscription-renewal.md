---
"@azphalt/registry": minor
"@azphalt/registry-store-vercel": minor
---

Add a `SubscriptionStore` seam (+ `InMemorySubscriptionStore`) mapping a processor subscription id to
its `{ packageId, subject, interval }` grant, so a renewal invoice can re-issue access each period —
the piece subscription entitlements were missing (they expired after the first period). `@azphalt/registry-store-vercel`
adds `PostgresSubscriptionStore` (+ a `subscriptions` table) and returns it from `createVercelStores()`.
