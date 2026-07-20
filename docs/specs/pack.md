# Extension packs (`kind: "pack"`)

*Status: **Normative**. Extends the package model with a package kind — a **pack** — that references
other packages instead of carrying its own payload. The SDK `Kind`/manifest wiring, the `@azphalt/azp`
verification rules (`validatePackManifest` folded into `verifyAzp`), the `create-azphalt` template, and
the `@azphalt/repository-client` resolution helpers are implemented and on `main`. Modeled on the same
header-only pattern as companion apps (`kind:"app"`) and MCP servers (`kind:"mcp"`).*

## Why this exists

Creators and host apps want to ship a **curated set** of extensions, not just one: a "recommended"
bundle, or a **base set** an app installs for a new user. A pack is that set as a first-class, portable,
signed package — a `.azp` whose `kind` is `"pack"` and whose manifest lists **member packages by id**.

A pack **references**, it does not **contain**. Members may be authored by anyone — a pack curator can
recommend other creators' packages without copying their bytes or their license. Each member is resolved
from a repository and installed through the normal path, honoring its **own** free/paid gate: a pack is
free to publish even when it recommends a paid extension, and money still lives only on the member's own
listing. Nothing about packs widens the moat: a pack has no `/code`, no `capabilities`, no assets — it
is inert metadata until a host resolves its members.

## The package (`kind: "pack"`)

A normal signed `.azp` whose `kind` is `"pack"`. It carries **no `/code` payload**, **no
`capabilities`**, and **no `assets`** — only its manifest, `LICENSE`, and an optional store-card
`preview`. Its manifest adds one block, `pack`:

~~~jsonc
{
  "azphalt": "0.1",
  "id": "com.example.azphalt.paint-starter",
  "name": "Paint Starter Pack",
  "version": "1.0.0",
  "kind": "pack",
  "license": "MIT",
  "compat": ">=0.1",
  "description": "The base set for my paint app.",
  // Scope the pack to your app (optional). Omit for a global pack.
  "targetApps": ["com.example.myapp"],
  "pack": {
    "entries": [
      { "id": "com.foldlab.filmluts", "version": "1.0.0", "required": true,  "note": "core LUTs" },
      { "id": "com.brushery.inkbrushes",                    "required": true,  "note": "default brushes (latest)" },
      { "id": "com.hereliesaz.halftone",                    "required": false, "note": "optional paid add-on" }
    ]
  },
  "files": { /* manifest + LICENSE + optional preview — no member bytes */ }
}
~~~

### `pack` block fields

- **`entries[]`** — the member packages, in presentation order. **At least one** required. Each entry:
  - **`id`** (required) — the member package's reverse-DNS id. May belong to a different author.
  - **`version`** (optional) — an exact version to pin. **Absent = resolve the member's latest** at
    install time, so the pack tracks the member as it evolves. Pin when the pack depends on a specific
    version's behavior.
  - **`required`** (optional) — `true` ⇒ part of the **base set**: a host installs it by default with
    the pack. `false` / absent ⇒ **recommended**: surfaced for the user to opt into. One pack can carry
    both, expressing "install these, and you might also like these".
  - **`note`** (optional) — a short human string shown beside the member (why it's included).

## Verification

`verifyAzp` applies these rules to a `kind: "pack"` manifest (in addition to the container integrity and
signature checks every package gets). Reference: `@azphalt/azp`'s `validatePackManifest`.

- The manifest has a `pack` block, and is **header-only**: no `entry` / `runtime`, no `capabilities`,
  no `assets`, no `app` block, no `mcp` block.
- `pack.entries` has **≥ 1** entry; every entry has a non-empty string `id`, and a `version` (if
  present) that is a non-empty string.
- An entry MUST NOT reference the pack **itself**, and no two entries may be the same `id` + `version`.
- Member existence is **not** checked at publish time — a pack is a list of references, resolved lazily
  by a host; a member may be added to the registry after the pack, or live in a different repository.

Signing, registry counter-signing, and the `/revocations` feed apply unchanged
(`package-format.md § Signing`, `repository-api.md § Revocations`).

## Discovery & installation

A pack lists in the registry like any other package: `kind: "pack"` flows through the browse/search
summary and the package detail (`GET /packages/{id}` → `manifest.pack`), and `targetApps` scopes it to
an app (`repository-api.md § App scoping`) so an app's base set shows in *its* store.

A host installs a pack by **resolving** its members and downloading each — `@azphalt/repository-client`
provides `getPack(id)` (the member list) and `resolvePack(id)` (each member with a concrete version + its
free/paid status), then `download(id, version)` per member:

~~~ts
const { entries } = await client.resolvePack("com.example.azphalt.paint-starter");
for (const m of entries) {
  if (!m.required) continue;                 // install the base set; offer the rest
  const bytes = await client.download(m.id, m.version);  // paid members still need their own entitlement
  install(readAzp(bytes));
}
~~~

Publishing is the existing path — the registry verifies (the rules above) and indexes the package; a
consignment storefront or a PR submission gates on the same verification. **No new distribution
endpoint is introduced.**

## Shipping a pack pre-installed (offline base set)

Because an `.azp` is a signed archive a host reads with `readAzp` (and verifies with `verifyAzp` /
`verifyTrust`), a developer can also **bundle** the member packages' bytes in their app and load them at
startup — no registry, no network — using the pack manifest as the list of what to include. The pack is
the declarative "which extensions" list; the app chooses **bundle-now** (offline pre-install) vs.
**fetch-on-first-run** (resolve + download). Both honor the same verification a live install does.
