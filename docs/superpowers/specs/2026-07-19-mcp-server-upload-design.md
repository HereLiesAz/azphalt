# Design: Uploading MCP servers (`kind: "mcp"`)

*Status: Design (approved for planning, 2026-07-19). Adds a fourth package kind — an
**MCP server** users can package, sign, upload, and install through azphalt — modeled on how VS
Code treats a `.vsix` that contributes an MCP server. This document settles the design; the
normative `spec/mcp-server.md` RFC, the SDK/verify wiring, and the registry profile land from the
implementation plan.*

## Why this exists — and why it doesn't break the moat

azphalt's core guarantee (the *moat*) is that a `code` extension is **sandboxed and powerless**: no
network, no filesystem outside its package, no host engine (see `spec/capability-model.md`). An **MCP
server is the opposite** — a networked process that needs filesystem and network to do anything
useful. So an MCP server **cannot be an azphalt-sandboxed extension**, and this design does not try to
make it one.

Instead it reuses the pattern already proven for companion apps (`spec/companion-app.md`,
`kind: "app"`): the uploaded `.azp` is a **signed manifest header** that *declares how to reach* a
server. The host's own MCP client runs or connects to it — in the OS's / a WASI runtime's sandbox,
with permissions the user granted **to that server**, never to azphalt — and the user gives explicit
consent before first use. The moat holds because:

- azphalt grants the server **no editor capability**. It reaches **nothing** of the host's editor
  surface (layers, bitmaps, canvas). The never-list is unaffected: nothing here lets a *sandboxed*
  extension gain camera / network / filesystem.
- The `.azp` carries **no `/code` sandbox payload** and declares **no `capabilities`**. It is a
  header describing launch/connection, exactly like a companion app's `app` block.
- The host runs the server under **explicit, VS Code-style trust consent** and governs its
  permissions itself; azphalt's part ends at distributing a signed, verifiable definition.

The result: the marketplace grows from *assets + sandboxed filters + companion apps* to also carry
**MCP servers** — users upload them the way they publish any other package — **without** widening
what a sandboxed extension can do.

### The north star

Per the project's standing guide: *do it how VS Code does it, as a `.vsix`.* VS Code's `mcp.json`
declares servers by transport (`stdio` command/args/env, or `http`/`sse` url), prompts for secrets via
`inputs`, and runs the server under a trust prompt. This design mirrors that surface, with one
deliberate divergence (below) so on-device servers are first-class on azphalt's mobile flagship hosts.

## Design decisions

1. **A new `kind: "mcp"`, not an overload.** An MCP server is modeled as its own package kind with an
   `mcp` manifest block — a sibling to `kind: "app"`. Rejected alternatives: overloading `kind:"app"`
   (companion `handoffs` are launch-for-result, a different shape than a persistent MCP
   client/server) and a new `assets[].type` (assets are inert data the host renders; an MCP server is
   a live connection).

2. **On-device is first-class and the default on *every* platform — mobile included.** azphalt is
   on-device-first everywhere else (WASM runtime, on-device ML models, "footage never leaves the
   device"). Defaulting mobile to remote would contradict that ethos, so it is rejected. Remote is a
   **fallback**, chosen only when the author/user wants it.

3. **`local` supports both a portable WASI target and per-platform native descriptors.** WASI lets one
   artifact run on-device on desktop **and** mobile via the host's WASI runtime; per-platform
   descriptors keep desktop `npx`/binary parity with VS Code working today. Authors pick either or
   both.

4. **Secrets are never in the package.** Following VS Code, the manifest declares `inputs` the host
   prompts for at connect time (`${input:...}`). An uploaded package containing a literal secret is a
   verify-time rejection.

## The package (`kind: "mcp"`)

A normal signed `.azp` whose `kind` is `"mcp"`. No `/code` payload, no `capabilities`. Its manifest
adds one block, `mcp`:

```jsonc
{
  "azphalt": "0.1",
  "id": "com.acme.azphalt.filesystem-mcp",
  "name": "Filesystem MCP",
  "version": "1.0.0",
  "kind": "mcp",
  "license": "MIT",
  "compat": ">=0.1",
  "mcp": {
    // Secrets are NEVER in the package. Declared here, prompted by the host (VS Code's `inputs`).
    "inputs": [ { "id": "root", "type": "promptString", "description": "Root directory to expose" } ],
    "servers": [
      {
        "id": "filesystem",
        // ON-DEVICE — preferred on every platform, mobile included.
        "local": {
          // Portable: runs on-device on desktop AND mobile via the host's WASI runtime.
          "wasi": {
            "module": "server/filesystem.wasm",   // bundled in the .azp …
            // …or a remote header for big binaries (reuses the existing remoteUrl+checksum pattern):
            // "module": "", "remoteUrl": "https://…/fs.wasm", "checksum": "sha256-…", "byteSize": 8388608,
            "args": ["${input:root}"],
            "env": {},
            "grants": ["fs:read", "fs:write"]      // host-granted, user-consented OS perms (NOT azphalt capabilities)
          },
          // Desktop-native fallback (VS Code parity) for a server with no WASI build:
          "platforms": {
            "desktop": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "${input:root}"], "env": {} },
            "android": { /* a bundled/installed component or host-runtime entry */ }
          }
        },
        // REMOTE — any platform, chosen only when author/user wants it.
        "remote": { "type": "http", "url": "https://mcp.acme.com/fs" }   // "http" | "sse"
      }
    ],
    // Descriptive only — powers the store card + a host's "can I use this?" pre-check.
    "offers": { "tools": ["read_file", "write_file"], "resources": true, "prompts": false }
  },
  "files": { "server/filesystem.wasm": "sha256-…" /* + manifest + LICENSE + preview */ }
}
```

### `mcp` block fields

- **`inputs[]`** — values the host prompts for at connect time (never stored in the package).
  Each: `{ id, type, description, password? }`. `type` starts with `promptString` (mirrors VS Code's
  `inputs`; a small blessed set, extensible later). Referenced elsewhere in the block as
  `${input:<id>}`.
- **`servers[]`** — one or more logical servers. Each server:
  - `id` — stable within the package.
  - `local` — the on-device transport (preferred). At least one of `wasi` / `platforms.*` when
    present.
    - `wasi` — `{ module | (module:"" + remoteUrl + checksum + byteSize), args?, env?, grants? }`.
      `module` is an in-package path or the empty-string remote-header form (the same pattern as
      large model assets in `spec/extension-manifest.md`). `grants` are the host/WASI-level
      permissions the server requests (e.g. `fs:read`, `fs:write`, `net`), consented by the user —
      **not** azphalt editor capabilities.
    - `platforms` — per-platform native launch descriptors: `desktop` (`{ command, args?, env? }`,
      VS Code parity) and/or `android` (a bundled/installed component or host-runtime entry; exact
      shape settled in the RFC).
  - `remote` — `{ type: "http" | "sse", url, headers? }`. Any platform.
  - At least one of `local` / `remote` is REQUIRED per server.
- **`offers`** — descriptive advertisement of what the server exposes: `tools` (names), `resources`
  (bool or names), `prompts` (bool or names). Powers the store card and a host's pre-connect "can I
  use this?" check. Advisory, never a substitute for the live MCP handshake.

### Host selection order

On-device first, remote last: **`local.wasi` → `local.platforms.<thisPlatform>` → `remote`**. A host
runs the first transport it supports. A mobile host with a WASI runtime runs the server on-device; a
desktop host without a WASI build for a given server falls back to its `desktop` command; remote is
used only when it is the sole option a host can honor (or the user selects it).

## Two boundaries, kept distinct

This is the load-bearing security point.

- **`wasi.grants` / native launch = OS/host-level permissions**, granted **with user consent** to the
  *server* (preopened dirs, network sockets). This is the same execution boundary as a companion app:
  the OS / WASI runtime governs it, azphalt does not. An MCP server *needs* filesystem/network to be
  useful, and that lives here.
- **azphalt editor `capabilities` and the never-list are untouched.** A WASI MCP server gains nothing
  *into* the host's editor surface. A sandboxed `kind:"code"` extension still gets no
  camera/network/filesystem. The two sandboxes never bridge.

## Verification (`@azphalt/azp`)

`verifyAzp` gains `kind: "mcp"` rules:

- Manifest has an `mcp` block; no `entry` / `runtime` / `capabilities` / `assets` / `app`.
- Every `servers[]` entry has a valid `id` and at least one of `local` / `remote`; every `local` has
  at least one of `wasi` / `platforms.*`.
- Bundled `wasi.module` paths are present in `files` and pass the SHA-256 digest gate; the
  empty-string remote-header form carries `remoteUrl` + `checksum` (+ `byteSize`), verified lazily at
  fetch time exactly like a remote asset.
- **No literal secrets.** `env` / `headers` values that look like credentials MUST be `${input:...}`
  references, not literals — a literal secret is a rejection. (Heuristic + required-reference rule
  settled in the RFC.)
- Signing, trust (`verifyTrust`), registry counter-sign, and the `/revocations` feed apply unchanged.

## Registry & discovery

- `kind: "mcp"` flows through the existing read API generically (`GET /packages` summaries already
  carry `kind`; `GET /packages/{id}` returns the full manifest incl. `mcp`).
- Add **`"mcp"`** to the blessed `profiles` vocabulary (`spec/repository-api.md § Supported types and
  profiles`, alongside `image` / `video-audio` / `companion`). A registry serving MCP servers
  advertises `"mcp"` in `/.well-known/azphalt-repository.json`; only a host that implements an MCP
  client browses for them.
- No new endpoints. App-scoping (`targetApps`) works as-is for host-specific servers; global servers
  omit it.

## Upload / publish path (the headline)

"Allow users to upload MCP servers" = the **existing** publish surfaces accept `kind: "mcp"`:

- The consignment **storefront** (`apps/storefront` on `@azphalt/registry`) — its author upload flow
  accepts an `mcp` package, runs the `verifyAzp` `mcp` rules, indexes it, and lists it with the
  `"mcp"` profile.
- **PR submission** (`submissions/`) — same verify rules gate a submitted `mcp` package.

No new distribution endpoint is introduced; MCP servers ride the same verify → index → list → download
path as every other package.

## Scope

**In scope (this design → one plan):**
- `spec/mcp-server.md` — the normative RFC (sibling to `companion-app.md`).
- SDK: `"mcp"` in the `Kind` union; `mcp`-block manifest types.
- `@azphalt/azp`: `verifyAzp` rules for `kind: "mcp"`.
- Registry: `"mcp"` discovery profile; index/serve `mcp` packages.
- Storefront + submission publish path accepts `kind: "mcp"`.

**Deferred (follow-on plans):**
- `@azphalt/conformance`: an `mcp` host-conformance profile (`runMcpConformance(host)`), mirroring the
  `companion` profile.
- `create-azphalt`: a scaffold template for an MCP-server package.
- Broadening `inputs.type` beyond `promptString`; the exact `android` native-launch descriptor shape.

## Open questions (for the RFC to settle)

- The precise `platforms.android` native-launch descriptor (bundled component id vs. host-runtime
  entry vs. intent).
- The exact no-literal-secret detection rule (required `${input:...}` for known credential-shaped
  keys vs. a heuristic scan).
- The `wasi.grants` vocabulary (`fs:read` / `fs:write` / `net` / …) and how a host maps it to WASI
  preopens / socket permissions.
- Whether `offers` should be verified against the live server handshake on install, or remain purely
  advisory.
