# @azphalt/registry

## 0.2.0

### Minor Changes

- 5a7869b: Repo audit fixes: security, spec-conformance, and correctness.

  - **registry**: the security sweep now **blocks** a manifest declaring any capability outside the capability model (never-list / unknown values like `camera`/`network`) via a new `capability-scope` check; and `periodEnd` no longer overshoots month-end (Jan 31 + 1 month → Feb 28/29, not Mar 3), so a subscription started late in a month is no longer over-granted.
  - **importer-palette**: emits the **normalized** `palette` wire format — a UTF-8 JSON `{ colors: [{ name, color: "#RRGGBB" }] }` — for both `.ase` (now parsed) and JSON input, instead of repackaging the raw `.ase`/hex-array bytes (which no conforming host could read).
  - **azp**: `validateMcpManifest` now rejects a `kind:"mcp"` manifest that also carries a `pack` block (symmetric with the pack validator), keeping mcp header-only.
  - **azdk**: `ColorControl.default` is documented as `#RRGGBB` — or `#RRGGBBAA` when `alpha` is set — matching the panel validator.

- debc781: Consignment checkout now withholds the **processor fee as well as the platform cut** from the seller's payout, so the seller nets exactly the quoted `sellerNet`.

  Previously `Marketplace.checkout()` set the Stripe destination-charge application fee to just `platformFee`, which left the platform eating Stripe's processing cost and the seller receiving `gross − platform` (more than the `gross − processor − platform` the quote promised). The application fee is now `platformFee + processorFee`.

  `CheckoutInput.platformFee` is renamed to **`applicationFee`** to name what the field actually is — the full fee withheld in the destination charge — and `checkout()` computes it from the breakdown. Callers constructing a `CheckoutInput` by hand must rename the field; the amount they should pass is `platformFee + processorFee`.

- 8d5f5af: Add a `PaymentSessionStore` seam so checkout sessions can be persisted (and survive a restart or a
  different serverless instance), plus an `InMemoryPaymentSessionStore` default.

  `StubPaymentProvider` now takes an optional `{ sessions }` store, records the originating
  `CheckoutInput` alongside each session (exposed via `getInput`, so fulfilment reads the package and
  buyer from stored state rather than the request body), and generates session ids with
  `crypto.randomUUID()` instead of a per-process counter that collides across instances. Additive: the
  zero-arg `new StubPaymentProvider()` behaves exactly as before. This is the core-package half of the
  durable-store design (`docs/superpowers/specs/2026-07-14-durable-registry-store-design.md`); the
  Postgres-backed implementation lives in the new `@azphalt/registry-store-vercel`.

- 955c1f4: Marketplace integrity & discovery: content-maturity age-gating, user ratings, developer IP claims, and clone detection beyond exact copies.

  - **`Manifest.maturity` / `PackageSummary.maturity`** (`general` | `mature`) — a developer content-maturity self-attestation that travels in the manifest and projects onto the summary, for a store to put 18+ listings behind an age gate.
  - **`Registry.rate(id, stars)`** + optional **`RegistryStore.addRating`** — record a 1–5 star user rating folded into the aggregate `getRating` returns.
  - **`ip-claim` report reason** + `Report.originalPackageId` / `Report.reporter` — a developer / rights-holder IP claim lane (a claim signed by the original's publisher key is trusted).
  - **`packageSimilarity` / `SimilarityEvidence`** and a new `clone-shape` publish flag — catch reimplemented clones (same shape + fuzzy name/description) that share no bytes, not just exact asset copies.

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
- 8911c47: Add the Stripe Connect **onboarding** surface, the companion to `StripePaymentProvider`'s charge
  surface: a fetch-based `StripeConnect` class (`createExpressAccount`, `createAccountLink`,
  `getAccount`) and a `SellerAccountStore` seam (+ `InMemorySellerAccountStore`) mapping each
  marketplace `sellerId` to its Stripe connected account and live capability flags. Together they let a
  seller self-onboard through Stripe-hosted Express onboarding and let checkout resolve the payout
  destination from durable state instead of a static env map. `fetch` is injectable for tests; no
  `stripe` SDK dependency. The durable `PostgresSellerAccountStore` lives in
  `@azphalt/registry-store-vercel`.
- c0b64e6: Add subscription listings. A `Listing` (and `CheckoutInput`) may carry an `interval` (`"month"` /
  `"year"`); `Marketplace.listForSale` takes an optional `{ interval }`, `checkout` threads it to the
  provider, and `StripePaymentProvider` opens a **subscription-mode** Connect checkout (recurring
  price + `application_fee_percent` split) when an interval is present, a one-time destination charge
  otherwise. A new `periodEnd(fromIso, interval)` helper computes the billing-period end so fulfilment
  can issue an **expiring** `kind:"subscription"` entitlement (the download gate already honors expiry
  via `verifyEntitlement`). Additive: one-time listings and their perpetual entitlements are unchanged.
- ae8e2cd: Add a `SubscriptionStore` seam (+ `InMemorySubscriptionStore`) mapping a processor subscription id to
  its `{ packageId, subject, interval }` grant, so a renewal invoice can re-issue access each period —
  the piece subscription entitlements were missing (they expired after the first period). `@azphalt/registry-store-vercel`
  adds `PostgresSubscriptionStore` (+ a `subscriptions` table) and returns it from `createVercelStores()`.

### Patch Changes

- Updated dependencies [5a7869b]
- Updated dependencies [f9a94c8]
- Updated dependencies [955c1f4]
  - @azphalt/azp@0.2.0
  - @azphalt/azdk@0.2.0

## 0.2.0

### Minor Changes

- c79dec0: Export the download authorizers — `DownloadAuthorizer`, `AuthDecision`, `AuthInput`,
  `InMemoryAuthorizer`, `EntitlementAuthorizer`, and `denyAllAuthorizer`.

  These previously lived inside the reference server, so nothing else could gate paid downloads
  without reimplementing them. They sit next to `issueEntitlement`/`verifyEntitlement`, which they
  already depended on, and the verdict they return (`{authenticated, licensed}`) is transport-agnostic
  — mapping it to `401`/`402` stays each server's job.

  Additive: no existing export changed. `@azphalt/repository-server` re-exports them from here, so its
  public surface is unchanged.
