# @azphalt/azdk

## 0.7.0

### Minor Changes

- c2e8908: `PreviewRef.strokes`: rendered sample strokes of a brush (`PreviewStroke { brush, label, image }`), so a store card can show a real stroke for every brush and several scenarios for a kinetic one.

## 0.6.0

### Minor Changes

- 19c0df7: Relicensed from MIT to the Apache License 2.0, which adds an explicit patent grant and patent retaliation — for a standard other hosts implement, implementers are licensed for contributors' patents, not only their copyright. Every freedom MIT gave is kept; extensions published through azphalt keep their own licences, and `create-azphalt` still writes whichever licence a creator picks.
- a04a765: Harden the `.azp` core against hostile packages, and share the guards so every consumer (importers, registry, worker, runtime, MCP tools) inherits them:
  
  - **Path safety.** A new `unsafePathReason` / `isUnsafePath` rejects zip-slip in all its shapes — absolute paths, backslash separators, drive letters, NUL bytes, and `.`/`..`/empty segments — not just the `/`-separated `..` form. `verifyAzp` now applies it to every payload entry **and** every `manifest.files` key, and validates `entry` / `assets[].path` / asset `files[]` member paths (an `asset` package previously got no path checks at all).
  - **Decompression bombs.** A new `safeUnzip` caps entry count and uncompressed size (per-entry and total), matching the Kotlin verifier. `readAzp`, `verifyAzp`, `signAzp`, and `verifyTrust` all route through it, so a small archive can no longer inflate to gigabytes before any check runs.
  - **Manifest integrity.** `parseJsonNoDuplicateKeys` rejects a `manifest.json` with duplicate keys (the signature is over the raw bytes, so duplicates were a cross-implementation forgery vector). Required fields (`azphalt`/`id`/`name`/`version`/`license`/`compat`) and known `kind` are now enforced, and an unknown kind is rejected rather than waved through unvalidated.
  - **No-throw verification.** The payload map is null-prototype (a `__proto__` entry name can no longer mutate a prototype), `manifest.files` lookups use `Object.hasOwn`, and each kind validator runs inside a `try` so malformed input becomes an error string, never an uncaught exception.
  - **URL schemes.** `mcp` (`remote.url`, `wasi.remoteUrl` + checksum) and `app` (`android.install`, `pwa.startUrl`/`manifestUrl`/`shareTargetUrl`) now require `https://` (or a same-origin path / `market://` where appropriate), closing `javascript:` / `file:` / cleartext URLs in listings a storefront renders.
  
  `Kind` gains the `llm` / `role` / `workflow` header kinds that already had validators and live registry packages but were missing from the union.
- c0c8ee4: Add the `font` package kind: a compiled font family (`ttf`/`otf`/`woff2`) with a `font` manifest block
  (family, designer, scripts, languages, sampleText, faces with variable axes). `verifyAzp` validates it
  (`validateFontManifest`), cross-checking declared axes against the font's own `fvar` table; the registry
  browse summary carries a `font` card; `importFontPackage` builds one; `create-azphalt` gains `template-font`.
  See `spec/font.md`.
- fffb800: Harden the host side — the clients, runtimes and conformance suite that consume `.azp` packages:
  
  - **repository-client.** `download()` accepts `expectedDigest` and verifies it, bounds the total with `maxBytes` (the size comes from the server's `Content-Range`), and rejects a short or oversized chunk instead of leaving a zero-filled hole. Package ids and versions are URL-encoded, so a hostile pack member can't redirect a request carrying the bearer token.
  - **mcp.** `extractAsset` verifies the package first, and no longer resolves `__proto__`/`constructor` as asset names. The `azp_verify` description no longer implies `signed: true` identifies a signer.
  - **llm-host.** `scrub` runs to a fixpoint (nested `<|im_<|x|>start|>` could previously be spliced into a live chat-template marker). `chatLlm` rejects non-string content (an array bypassed the session-tag check), no longer sends the bearer to an `auth: none` endpoint, and resolves `${input:…}` base URLs through a new `inputs` option (`llmConsent` no longer throws on them). `installLlm` now requires `consented: true`, refuses an unsigned package (unless `allowUnsigned`), honours `trustedKeys`, validates the package id and owner/repo, and audits the runner workflow with the new `auditWorkflow` — only declared secrets, no `pull_request_target`, no write beyond the manifest's ceiling.
  - **runtime-wasm.** A caller can narrow but never widen the capabilities a package declared. A contribution whose promise never settles is an error, not a silent success. `params`/`assets`/module lookups use own-property checks. Guest `layers.create` is capped. The raw-wasm path bounds module size and memory (`MAX_WASM_MODULE_BYTES`, `MAX_WASM_MEMORY_BYTES`); a non-terminating wasm entry still blocks its thread, so hosts must run untrusted raw-wasm packages in a terminable Worker/process.
  - **web-handoff.** Host-directory install URLs must be `https:` or `market:` (`isSafeInstallUrl`).
  - **azdk.** `Capability` drops the deferred `storage`; `RepositoryErrorResponse` gains `details`.
  - **conformance.** The reject-tampered and reject-unsafe-path checks now drive the host (with a control package it must run), and the capability-gating checks require a baseline run so a host that refuses everything can't pass by erroring. The "has teeth" tests simulate a broken host honestly.
  - **repository-server.** A `private` package's detail is access-gated like its download, and `HEAD` is routed like `GET` (a download `HEAD` doesn't count).
- 5b51e82: `kind: "llm"` (`spec/llm.md`): off-device language models. `@azphalt/azdk` adds `"llm"` to `Kind`, an `llm` block to `Manifest`, and the `LlmManifest` types. `@azphalt/azp` adds `validateLlmManifest`, which `verifyAzp` runs for `kind:"llm"` packages (§ Verification), and `role`/`workflow` packages now refuse an `llm` block.
- b32adc4: Add the `moyai-session` direct LLM protocol and configurable `${input:...}` endpoint URLs so keyless self-hosted Moyai deployments can be distributed as normal Azphalt `kind:"llm"` packages.
- 2f85213: `RepositoryErrorCode` gains `forbidden`, `conflict`, `payload_too_large`, `not_implemented`, `bad_gateway` and `unavailable`, for the Repository API's new `POST /packages` publish endpoint (`spec/repository-api.md` § 9).

### Patch Changes

- d6f56c9: `PackageSearchResponse` from the public entry point now carries the widened `PackageSummary`, so search pages can hold `workflow` and `role` packages. Fixes the `@azphalt/repository-server` type error.

## 0.5.0

### Minor Changes

- f36110b: Add `kind: "script"` — a native script (bash, Python, PowerShell, …) a host installs and runs the way a package manager installs its own package, resolving declared system `dependencies` (namespaced by package manager) before making the script runnable. Adds the `Kind`/`ScriptManifest` SDK types, `@azphalt/azp`'s `validateScriptManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `script` host-conformance profile (`runScriptConformance`), a `create-azphalt` "Script" template, and submission validation for the new kind. Like `kind:"mcp"`, a script needs real OS access to do anything useful, so it gets its own kind rather than a "native" flavor of `kind:"code"` — that keeps `code`'s one unconditional guarantee (sandboxed, powerless, safe to auto-run) intact. See `spec/script.md`.

## 0.4.0

### Minor Changes

- bdbdb9b: Add `kind: "skill"` — a bundle of one or more [Agent Skills](https://agentskills.io/specification) (`SKILL.md` + optional `scripts`/`references`/`assets`) an AI-agent host loads. Adds the `Kind`/`SkillManifest`/`SkillEntry` SDK types, `@azphalt/azp`'s `validateSkillManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `skill` host-conformance profile (`runSkillConformance`), a `create-azphalt` "Skill" template, and submission validation for the new kind. See `spec/skill.md`.

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
- 955c1f4: Marketplace integrity & discovery: content-maturity age-gating, user ratings, developer IP claims, and clone detection beyond exact copies.

  - **`Manifest.maturity` / `PackageSummary.maturity`** (`general` | `mature`) — a developer content-maturity self-attestation that travels in the manifest and projects onto the summary, for a store to put 18+ listings behind an age gate.
  - **`Registry.rate(id, stars)`** + optional **`RegistryStore.addRating`** — record a 1–5 star user rating folded into the aggregate `getRating` returns.
  - **`ip-claim` report reason** + `Report.originalPackageId` / `Report.reporter` — a developer / rights-holder IP claim lane (a claim signed by the original's publisher key is trusted).
  - **`packageSimilarity` / `SimilarityEvidence`** and a new `clone-shape` publish flag — catch reimplemented clones (same shape + fuzzy name/description) that share no bytes, not just exact asset copies.

### Patch Changes

- 5a7869b: Repo audit fixes: security, spec-conformance, and correctness.

  - **registry**: the security sweep now **blocks** a manifest declaring any capability outside the capability model (never-list / unknown values like `camera`/`network`) via a new `capability-scope` check; and `periodEnd` no longer overshoots month-end (Jan 31 + 1 month → Feb 28/29, not Mar 3), so a subscription started late in a month is no longer over-granted.
  - **importer-palette**: emits the **normalized** `palette` wire format — a UTF-8 JSON `{ colors: [{ name, color: "#RRGGBB" }] }` — for both `.ase` (now parsed) and JSON input, instead of repackaging the raw `.ase`/hex-array bytes (which no conforming host could read).
  - **azp**: `validateMcpManifest` now rejects a `kind:"mcp"` manifest that also carries a `pack` block (symmetric with the pack validator), keeping mcp header-only.
  - **azdk**: `ColorControl.default` is documented as `#RRGGBB` — or `#RRGGBBAA` when `alpha` is set — matching the panel validator.
