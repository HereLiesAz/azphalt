# @azphalt/registry-store-vercel

## 2.0.0

### Patch Changes

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

- Updated dependencies [e5108c8]
  - @azphalt/registry@0.3.0

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
