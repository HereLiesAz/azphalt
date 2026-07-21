# @azphalt/registry-store-vercel

## 1.0.0

### Minor Changes

- 8d5f5af: New package: a durable `RegistryStore` for `@azphalt/registry` over Neon Postgres + Vercel Blob.

  Exports `VercelRegistryStore` (metadata in Postgres, `.azp` bytes in **private** Blob at deterministic
  `azp/{id}/{version}.azp` keys), `PostgresSessionStore` (`PaymentSessionStore`), `PostgresEntitlementStore`
  (`EntitlementStore`), an idempotent `migrate()`, and a `createVercelStores()` helper that wires all
  three from one connection string. The cloud dependencies live only here, behind an `@azphalt/registry`
  peer, so the core package stays dependency-light. Implements the approved durable-store design
  (`docs/superpowers/specs/2026-07-14-durable-registry-store-design.md`).

- 821325d: Add resumable, concurrent downloads over HTTP byte ranges. `@azphalt/registry` gains
  `Registry.serveRange` (+ `RangeNotSatisfiableError`, `ByteRangeSpec`) and two optional `RegistryStore`
  methods, `getByteSize` / `getByteRange`, implemented on `InMemoryStore`; a ranged read does not count a
  download. `@azphalt/registry-store-vercel` implements both against Blob (`head` for size, a `Range`
  fetch for the window) so a chunked download doesn't pull the whole object per chunk. The reference
  server's download endpoint now answers `Range` with `206 Partial Content` (+ `Content-Range`,
  `Accept-Ranges`), `416` for an unsatisfiable range, and advertises `Accept-Ranges` on full responses —
  with the paid gate still enforced first. `@azphalt/repository-client.download()` fetches in parallel
  chunks with per-chunk retry (resuming the exact bytes lost on a dropped connection), reassembles in
  order, and falls back to a single request when the server has no range support; new `DownloadOptions`
  (`concurrency`, `chunkSize`, `retries`, `signal`, `onProgress`).
- ae8e2cd: Add a `SubscriptionStore` seam (+ `InMemorySubscriptionStore`) mapping a processor subscription id to
  its `{ packageId, subject, interval }` grant, so a renewal invoice can re-issue access each period —
  the piece subscription entitlements were missing (they expired after the first period). `@azphalt/registry-store-vercel`
  adds `PostgresSubscriptionStore` (+ a `subscriptions` table) and returns it from `createVercelStores()`.

### Patch Changes

- Updated dependencies [5a7869b]
- Updated dependencies [debc781]
- Updated dependencies [8d5f5af]
- Updated dependencies [955c1f4]
- Updated dependencies [821325d]
- Updated dependencies [8911c47]
- Updated dependencies [c0b64e6]
- Updated dependencies [ae8e2cd]
  - @azphalt/registry@0.2.0
