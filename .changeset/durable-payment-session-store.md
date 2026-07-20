---
"@azphalt/registry": minor
---

Add a `PaymentSessionStore` seam so checkout sessions can be persisted (and survive a restart or a
different serverless instance), plus an `InMemoryPaymentSessionStore` default.

`StubPaymentProvider` now takes an optional `{ sessions }` store, records the originating
`CheckoutInput` alongside each session (exposed via `getInput`, so fulfilment reads the package and
buyer from stored state rather than the request body), and generates session ids with
`crypto.randomUUID()` instead of a per-process counter that collides across instances. Additive: the
zero-arg `new StubPaymentProvider()` behaves exactly as before. This is the core-package half of the
durable-store design (`docs/superpowers/specs/2026-07-14-durable-registry-store-design.md`); the
Postgres-backed implementation lives in the new `@azphalt/registry-store-vercel`.
