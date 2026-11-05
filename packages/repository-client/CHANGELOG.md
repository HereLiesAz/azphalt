# @azphalt/repository-client

## 0.4.0

### Minor Changes

- 19c0df7: Relicensed from MIT to the Apache License 2.0, which adds an explicit patent grant and patent retaliation — for a standard other hosts implement, implementers are licensed for contributors' patents, not only their copyright. Every freedom MIT gave is kept; extensions published through azphalt keep their own licences, and `create-azphalt` still writes whichever licence a creator picks.
- fffb800: Harden the host side — the clients, runtimes and conformance suite that consume `.azp` packages:
  
  - **repository-client.** `download()` accepts `expectedDigest` and verifies it, bounds the total with `maxBytes` (the size comes from the server's `Content-Range`), and rejects a short or oversized chunk instead of leaving a zero-filled hole. Package ids and versions are URL-encoded, so a hostile pack member can't redirect a request carrying the bearer token.
  - **mcp.** `extractAsset` verifies the package first, and no longer resolves `__proto__`/`constructor` as asset names. The `azp_verify` description no longer implies `signed: true` identifies a signer.
  - **llm-host.** `scrub` runs to a fixpoint (nested `<|im_<|x|>start|>` could previously be spliced into a live chat-template marker). `chatLlm` rejects non-string content (an array bypassed the session-tag check), no longer sends the bearer to an `auth: none` endpoint, and resolves `${input:…}` base URLs through a new `inputs` option (`llmConsent` no longer throws on them). `installLlm` now requires `consented: true`, refuses an unsigned package (unless `allowUnsigned`), honours `trustedKeys`, validates the package id and owner/repo, and audits the runner workflow with the new `auditWorkflow` — only declared secrets, no `pull_request_target`, no write beyond the manifest's ceiling.
  - **runtime-wasm.** A caller can narrow but never widen the capabilities a package declared. A contribution whose promise never settles is an error, not a silent success. `params`/`assets`/module lookups use own-property checks. Guest `layers.create` is capped. The raw-wasm path bounds module size and memory (`MAX_WASM_MODULE_BYTES`, `MAX_WASM_MEMORY_BYTES`); a non-terminating wasm entry still blocks its thread, so hosts must run untrusted raw-wasm packages in a terminable Worker/process.
  - **web-handoff.** Host-directory install URLs must be `https:` or `market:` (`isSafeInstallUrl`).
  - **azdk.** `Capability` drops the deferred `storage`; `RepositoryErrorResponse` gains `details`.
  - **conformance.** The reject-tampered and reject-unsafe-path checks now drive the host (with a control package it must run), and the capability-gating checks require a baseline run so a host that refuses everything can't pass by erroring. The "has teeth" tests simulate a broken host honestly.
  - **repository-server.** A `private` package's detail is access-gated like its download, and `HEAD` is routed like `GET` (a download `HEAD` doesn't count).
- 15dc31c: `publish(azp)` — `POST /packages` (`repository-api.md` § 9). Resolves to the pending review (`202`) or the live package (`201`); a refusal throws `PublishError` carrying the status, the envelope's `code` and any per-problem `details`.

### Patch Changes

- Updated dependencies [19c0df7]
- Updated dependencies [a04a765]
- Updated dependencies [c0c8ee4]
- Updated dependencies [fffb800]
- Updated dependencies [5b51e82]
- Updated dependencies [b32adc4]
- Updated dependencies [2f85213]
- Updated dependencies [d6f56c9]
  - @azphalt/azdk@0.6.0

## 0.3.2

### Patch Changes

- Updated dependencies [f36110b]
  - @azphalt/azdk@0.5.0

## 0.3.1

### Patch Changes

- Updated dependencies [bdbdb9b]
  - @azphalt/azdk@0.4.0

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

## 0.2.0

### Minor Changes

- f9a94c8: Add extension packs — a new `kind: "pack"` package that references other packages (a recommended
  bundle, or an app's base set) instead of carrying its own payload. `@azphalt/azdk` adds `PackManifest`
  / `PackEntry` and the `pack` block on `Manifest` (members are `{ id, version?, required?, note? }`);
  `@azphalt/azp` adds `validatePackManifest` (folded into `verifyAzp` for `kind:"pack"`): header-only, ≥1
  entry, no self-reference, no duplicates. `@azphalt/repository-client` adds `getPack(id)` and
  `resolvePack(id)` (each member with a concrete version + free/paid status) so a host can install the
  base set and offer the rest, downloading each member — which is still free/paid-gated individually, so a
  free pack may recommend a paid member. `create-azphalt` gains an **Extension Pack** template. Packs are
  header-only and inert (no `/code`, capabilities, or assets), so the registry indexes them like any other
  package with no code change. Normative spec: `spec/pack.md`.
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

### Patch Changes

- 9894f9a: Fix `getPack` / `resolvePack` against a real repository. The Repository API's `GET /packages/{id}`
  carries `kind` and the `pack` block on the nested `manifest` (per the spec), not at the top level, but
  `getPack` checked a top-level `detail.kind` — so it threw "not an extension pack" against the reference
  server (and the storefront), even for a valid pack. It now reads `kind`/`pack` from `detail.manifest`
  (falling back to a flat body). Caught by a new end-to-end test that resolves and installs a pack over
  the reference server.
- Updated dependencies [5a7869b]
- Updated dependencies [f9a94c8]
- Updated dependencies [955c1f4]
  - @azphalt/azdk@0.2.0
