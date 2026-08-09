# @azphalt/registry

## 0.3.1

### Patch Changes

- Updated dependencies [bdbdb9b]
  - @azphalt/azdk@0.4.0
  - @azphalt/azp@0.4.0

## 0.3.0

### Minor Changes

- e5108c8: **web-handoff**: the `azphalt://install` deep link, plus the manifest and validation it needs.

  `spec/web-handoff.md` closes the gap `store-app.md` § Open questions named but declined to guess at: a
  web storefront could show a package and charge for it, but had no way to hand one to a host, so every
  web browse ended at "install it from any conforming host" — telling the user to go back to the app
  they had just left. A page now emits `azphalt://install?id=&version=[&repo=]`, and any conforming host
  that claims the scheme installs it. Deliberately host-agnostic: no host is named in the link, because
  an HTTPS App Link would make whoever controls `assetlinks.json` the gatekeeper of which apps may
  receive a package, and `GOVERNANCE.md` rules that out.

  - **`@azphalt/azdk`** — `AppManifest` gains `roles` (`"companion"` / `"host"`, defaulting to
    `["companion"]` so existing listings keep their meaning) and `hostId`; `handoffs` becomes optional,
    required only of a companion. `hasAppRole` applies the default. New `MEDIA_TYPE` /
    `MEDIA_TYPE_DEPRECATED` constants give the `.azp` media type one source in code.
  - **`@azphalt/azp`** — new `validateAppManifest`, wired into `verifyAzp`. `kind:"app"` was the one
    header kind with **no** structural rules, so a package could claim to be an app while carrying no
    `app` block and nothing installable. That mattered little when the block was only read by a host
    deciding whether to launch a companion; it matters now that a storefront builds a **host directory**
    out of these listings and offers them to users as places to install software.
  - **`@azphalt/registry`** — a browse summary for a `kind:"app"` package now carries the **reduced**
    `app` block (`roles`, `hostId`, `platforms`; never `handoffs`), and `@azphalt/azdk` gains
    `AppSummary` / `toAppSummary` for it. This is what makes a host directory one request:
    `repository-api.md` previously stated outright that the `app` block was _not_ in the summary, so the
    discovery procedure `web-handoff.md` prescribes returned entries with nothing to match on, and every
    directory built against the normative API was silently empty.
  - **`@azphalt/repository-client`** — `search({ kind })`, matching the new `kind` query parameter on
    `GET /packages`. Without it the host directory could not be fetched at all: `ListQuery.kind` existed
    as an internal type but the HTTP surface never parsed it, so `?kind=app` silently returned the
    entire catalogue.
  - **`@azphalt/web-handoff`** (new) — the storefront half, for any web storefront: build the link,
    attempt it, detect that nothing claimed it, and select the hosts worth offering. The spec requires
    this ladder of every conforming storefront and its middle step is a **heuristic** (no browser API
    answers "is this scheme registered"), so a per-storefront reimplementation is a per-storefront
    behaviour. Zero dependencies, and it takes a structural package shape rather than a nominal type so
    a storefront with its own catalogue type can adopt it without changing that type. Its tests mirror
    the Compose storefront's Kotlin suite case for case, so the two implementations cannot drift
    quietly.
  - **`@azphalt/submit-check`** — accepts the three **header** kinds. Its allowed-kinds list had drifted
    to `asset`/`code`/`mixed`, so `app`, `mcp` and `pack` were rejected as "invalid kind" — which made
    three documented submission paths impossible, including the host listing `web-handoff.md` § Host
    directory tells people to publish.
  - **`@azphalt/registry-store-vercel`** — blobs are stored as `application/vnd.azphalt.package` rather
    than `application/zip`; a blob's stored content type is what a direct blob URL serves, so the old
    value handed browsers an archive to unpack instead of a package for a host to open.

  **Media type.** `application/vnd.azphalt.package` is now normative, stated once in
  `spec/package-format.md` § Media type and cross-referenced everywhere else. It was previously three
  different strings in three places: `application/x-azphalt` (the Repository API and its server),
  `application/vnd.azphalt.package` (the store-app handoff), and `application/zip` (the storefront's own
  download route). `application/x-azphalt` becomes a deprecated alias — clients SHOULD accept it,
  servers MUST NOT send it. The `x-` prefix was deprecated for new types by RFC 6648; `vnd.` is the
  correct tree for a format an organization defines, and RFC 6838 § 3.2 opens it without requiring
  registration.

### Patch Changes

- Updated dependencies [e5108c8]
  - @azphalt/azdk@0.3.0
  - @azphalt/azp@0.3.0

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
