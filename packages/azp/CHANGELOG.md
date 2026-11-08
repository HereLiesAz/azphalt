# @azphalt/azp

## 0.6.1

### Patch Changes

- Updated dependencies [c2e8908]
  - @azphalt/azdk@0.7.0

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
- 5b51e82: `kind: "llm"` (`spec/llm.md`): off-device language models. `@azphalt/azdk` adds `"llm"` to `Kind`, an `llm` block to `Manifest`, and the `LlmManifest` types. `@azphalt/azp` adds `validateLlmManifest`, which `verifyAzp` runs for `kind:"llm"` packages (§ Verification), and `role`/`workflow` packages now refuse an `llm` block.
- b32adc4: Add the `moyai-session` direct LLM protocol and configurable `${input:...}` endpoint URLs so keyless self-hosted Moyai deployments can be distributed as normal Azphalt `kind:"llm"` packages.

### Patch Changes

- d18ff48: Harden the `font` kind. Name-table reading is bounded (a crafted font can no longer stall
  verification). A font package may carry only its faces, `LICENSE` and preview images, may not declare
  `workflow`/`role`/`llm`/`contributes`, and each SFNT face must have `head`, `cmap` and outline tables;
  `workflow`, `role` and `llm` packages may not declare a `font` block. Font packages report the `font`
  media domain. `importFontPackage` drops out-of-range weights, refuses facts it can't state truthfully and
  verifies what it builds. The `create-azphalt` font template no longer packs its own placeholder file and
  stops with the store's reasons when a package wouldn't be accepted.
- de006ee: Close the registry's package-takeover and payout holes (spec/repository-api.md § 9):
  
  - **Publish requires a signature and pins the publisher key.** `Registry.publish` rejects an unsigned package (new `requireSignature`, default `true`), rejects a version signed by a key other than the one that first published the id (`enforcePublisherPinning`, default `true`), rejects a revoked key up front, and rejects a version that collides in precedence with an existing one (`1.0.0+evil` next to `1.0.0`). Package ids are lowercase-only so case variants can't squat.
  - **Quarantine actually removes a package.** `latest()` no longer falls back to a yanked version, so a fully-yanked (auto-quarantined) package stops resolving, serving, browsing, and searching.
  - **A listing can't be re-pointed at another seller.** `listForSale` rejects a different `sellerId` on an already-listed package, which closes the payout hijack.
  - **Subscription entitlements must expire.** A `subscription` without `expiresAt` can no longer be issued, and verifies as not live if one is presented.
  - **Sweep.** The secret scan strips every `${input:…}` placeholder and judges what's left (so `sk-live-abc${input:x}` is blocked while `Bearer ${input:x}` passes), no longer skips every nested object named `files`, and `storage` (deferred in 0.1) is no longer an accepted capability.
  - **submit-check matches the registry gate**: official SemVer grammar, lowercase ids, and it now runs the same security sweep so a bad submission fails at the PR, not at publish.
  - The reference server signs its demo seed. The unsafe-path error text stays byte-stable (`unsafe path: <path>`) because the conformance fixtures other hosts vendor pin it.
- Updated dependencies [19c0df7]
- Updated dependencies [a04a765]
- Updated dependencies [c0c8ee4]
- Updated dependencies [fffb800]
- Updated dependencies [5b51e82]
- Updated dependencies [b32adc4]
- Updated dependencies [2f85213]
- Updated dependencies [d6f56c9]
  - @azphalt/azdk@0.6.0

## 0.5.0

### Minor Changes

- f36110b: Add `kind: "script"` — a native script (bash, Python, PowerShell, …) a host installs and runs the way a package manager installs its own package, resolving declared system `dependencies` (namespaced by package manager) before making the script runnable. Adds the `Kind`/`ScriptManifest` SDK types, `@azphalt/azp`'s `validateScriptManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `script` host-conformance profile (`runScriptConformance`), a `create-azphalt` "Script" template, and submission validation for the new kind. Like `kind:"mcp"`, a script needs real OS access to do anything useful, so it gets its own kind rather than a "native" flavor of `kind:"code"` — that keeps `code`'s one unconditional guarantee (sandboxed, powerless, safe to auto-run) intact. See `spec/script.md`.

### Patch Changes

- Updated dependencies [f36110b]
  - @azphalt/azdk@0.5.0

## 0.4.0

### Minor Changes

- bdbdb9b: Add `kind: "skill"` — a bundle of one or more [Agent Skills](https://agentskills.io/specification) (`SKILL.md` + optional `scripts`/`references`/`assets`) an AI-agent host loads. Adds the `Kind`/`SkillManifest`/`SkillEntry` SDK types, `@azphalt/azp`'s `validateSkillManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `skill` host-conformance profile (`runSkillConformance`), a `create-azphalt` "Skill" template, and submission validation for the new kind. See `spec/skill.md`.

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

### Patch Changes

- 5a7869b: Repo audit fixes: security, spec-conformance, and correctness.

  - **registry**: the security sweep now **blocks** a manifest declaring any capability outside the capability model (never-list / unknown values like `camera`/`network`) via a new `capability-scope` check; and `periodEnd` no longer overshoots month-end (Jan 31 + 1 month → Feb 28/29, not Mar 3), so a subscription started late in a month is no longer over-granted.
  - **importer-palette**: emits the **normalized** `palette` wire format — a UTF-8 JSON `{ colors: [{ name, color: "#RRGGBB" }] }` — for both `.ase` (now parsed) and JSON input, instead of repackaging the raw `.ase`/hex-array bytes (which no conforming host could read).
  - **azp**: `validateMcpManifest` now rejects a `kind:"mcp"` manifest that also carries a `pack` block (symmetric with the pack validator), keeping mcp header-only.
  - **azdk**: `ColorControl.default` is documented as `#RRGGBB` — or `#RRGGBBAA` when `alpha` is set — matching the panel validator.

- Updated dependencies [5a7869b]
- Updated dependencies [f9a94c8]
- Updated dependencies [955c1f4]
  - @azphalt/azdk@0.2.0
