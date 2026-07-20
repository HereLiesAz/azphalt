---
"@azphalt/registry-store-vercel": minor
---

New package: a durable `RegistryStore` for `@azphalt/registry` over Neon Postgres + Vercel Blob.

Exports `VercelRegistryStore` (metadata in Postgres, `.azp` bytes in **private** Blob at deterministic
`azp/{id}/{version}.azp` keys), `PostgresSessionStore` (`PaymentSessionStore`), `PostgresEntitlementStore`
(`EntitlementStore`), an idempotent `migrate()`, and a `createVercelStores()` helper that wires all
three from one connection string. The cloud dependencies live only here, behind an `@azphalt/registry`
peer, so the core package stays dependency-light. Implements the approved durable-store design
(`docs/superpowers/specs/2026-07-14-durable-registry-store-design.md`).
