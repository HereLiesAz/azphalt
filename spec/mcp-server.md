# MCP servers (`kind: "mcp"`) — RFC

*Status: **Proposed** (design RFC, not yet normative). Extends the package model with a fourth kind —
an **MCP server** ([Model Context Protocol](https://modelcontextprotocol.io)) a host's MCP client
connects to. This document settles the design; the SDK `Kind`/manifest wiring, the `@azphalt/azp`
verification rules, and the registry discovery profile land as it's accepted. Modeled on how VS Code
treats a `.vsix` that contributes an MCP server: the package **declares** the server; the host runs it
under a trust prompt.*

## Why this exists — and why it doesn't break the moat

azphalt's core guarantee (the *moat*) is that a `code` extension is **sandboxed and powerless**: no
camera, no sensors, no network, no filesystem outside its package, and no reach into the host engine
(see `capability-model.md`). An **MCP server is the opposite** — a process that needs filesystem and
network to do anything useful. So an MCP server **cannot be an azphalt-sandboxed extension**, and this
RFC does not try to make it one.

Instead it reuses the pattern proven for companion apps (`companion-app.md`, `kind: "app"`): the
uploaded `.azp` is a **signed manifest header** that *declares how to reach* the server. The host's own
MCP client runs or connects to it — in the OS's / a WASI runtime's sandbox, with permissions the user
granted **to that server**, never to azphalt — and the user consents before first use. The moat holds
because:

- azphalt grants the server **no editor capability**. It reaches **nothing** of the host's editor
  surface (layers, bitmaps, canvas). The never-list is unaffected: nothing here lets a *sandboxed*
  extension gain camera / network / filesystem.
- The `.azp` carries **no `/code` sandbox payload** and declares **no `capabilities`**. It is a header
  describing launch/connection, exactly like a companion app's `app` block.
- The host runs the server under **explicit, VS Code-style trust consent** and governs its permissions
  itself; azphalt's part ends at distributing a signed, verifiable definition.

The result: the marketplace grows from *assets + sandboxed filters + companion apps* to also carry
**MCP servers** — users upload them the way they publish any other package — **without** widening what
a sandboxed extension can do.

## The package (`kind: "mcp"`)

A normal signed `.azp` whose `kind` is `"mcp"`. It carries **no `/code` sandbox payload** and **no
host capabilities** — it is a *manifest header* describing how to reach an MCP server and what it
offers. Its manifest adds one block, `mcp`:

~~~jsonc
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
            // …or a remote header for big binaries (reuses the remoteUrl+checksum pattern):
            // "module": "", "remoteUrl": "https://…/fs.wasm", "checksum": "sha256-…", "byteSize": 8388608,
            "args": ["${input:root}"],
            "env": {},
            "grants": ["fs:read", "fs:write"]      // host-granted, user-consented OS perms (NOT azphalt capabilities)
          },
          // Desktop-native fallback (VS Code parity) for a server with no WASI build:
          "platforms": {
            "desktop": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "${input:root}"], "env": {} },
            "android": { "component": "com.acme.fsmcp/.ServerService" }
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
~~~

### `mcp` block fields

- **`inputs[]`** — values the host prompts for at connect time (never stored in the package). Each is
  `{ id, type, description?, password? }`. `type` starts with `promptString` (mirrors VS Code's
  `inputs`; the union stays open). Referenced elsewhere in the block as `${input:<id>}`.
- **`servers[]`** — one or more logical servers (**at least one** required). Each server has an `id`
  and **at least one** of `local` / `remote`.
- **`offers`** — descriptive advertisement of what the server exposes: `tools` / `resources` /
  `prompts`, each a list of names or a boolean presence flag. It powers the store card and a host's
  pre-connect "can I use this?" check. **Advisory** — the live MCP handshake after connection is
  authoritative.

## Transports

A server declares how a host reaches it. **On-device (`local`) is first-class on every platform,
mobile included, and preferred**; `remote` is the fallback.

### `local` — on-device

The server runs on the user's device, outside the azphalt editor sandbox, under permissions consented
to the *server*. At least one of `wasi` / `platforms` is present.

- **`wasi`** — the **portable** target: a WASM module the host runs in its WASI runtime, on-device on
  desktop **and** mobile. Delivered **either** bundled (`module` is an in-package path under the
  archive, integrity-covered by `manifest.files`) **or** as a remote header (`module` is `""` with
  `remoteUrl` + `checksum` + optional `byteSize` — the same pattern as a large model asset in
  `extension-manifest.md § assets`; a host MUST verify the fetched bytes against `checksum` before
  running). `args` / `env` may reference `${input:…}`. `grants` lists the host/WASI-level permissions
  the server requests (e.g. `fs:read`, `fs:write`, `net`), which the user consents to — **not** azphalt
  editor capabilities.
- **`platforms`** — per-platform **native** launch descriptors, for a server with no WASI build. At
  least one of:
  - **`desktop`** — `{ command, args?, env? }`, a command line the host spawns for a stdio server
    (VS Code parity, e.g. `npx -y …`).
  - **`android`** — `{ component, args? }`, a bundled/installed component or host-runtime entry a
    mobile host launches to run the server on-device. (The exact descriptor is an Open Question.)

### `remote`

`{ type: "http" | "sse", url, headers? }` — a hosted endpoint, reachable on any platform, chosen only
when the author/user wants it. `headers` values may reference `${input:…}`.

### Host selection order

On-device first, remote last: **`local.wasi` → `local.platforms.<thisPlatform>` → `remote`**. A host
runs the first transport it supports — a mobile host with a WASI runtime runs the server on-device; a
desktop host without a WASI build for a given server falls back to its `desktop` command; `remote` is
used only when it is the sole transport a host can honor (or the user selects it).

## Two boundaries, kept distinct

This is the load-bearing security point.

- **`wasi.grants` / a native launch = OS/host-level permissions**, granted **with user consent** to
  the *server* (preopened dirs, network sockets). This is the same execution boundary as a companion
  app: the OS / WASI runtime governs it, azphalt does not. An MCP server *needs* filesystem/network to
  be useful, and that lives here.
- **azphalt editor `capabilities` and the never-list are untouched.** A WASI MCP server gains nothing
  *into* the host's editor surface. A sandboxed `kind:"code"` extension still gets no
  camera/network/filesystem. The two sandboxes never bridge.

## Inputs & secrets

Following VS Code, an MCP server that needs a key or token declares an `input` and the host **prompts
for it at connect time**, substituting `${input:<id>}` into `args` / `env` / `headers`. **A package
MUST NOT contain a literal secret.** Verification (below) rejects a credential-shaped `env` / `headers`
value that is not an `${input:…}` reference, and rejects a reference to an input the manifest does not
declare.

## Verification

`verifyAzp` applies these rules to a `kind: "mcp"` manifest (in addition to the container integrity and
signature checks every package gets). Reference: `@azphalt/azp`'s `validateMcpManifest`.

- The manifest has an `mcp` block, and is **header-only**: no `entry` / `runtime`, no `capabilities`,
  no `assets`, no `app` block.
- `mcp.servers` has **≥ 1** entry; every server has an `id` and **at least one** of `local` / `remote`.
- Every `local` has **at least one** of `wasi` / `platforms`.
- A `wasi` with a non-empty `module` names a path present in `manifest.files` (integrity-covered); a
  `wasi` with `module: ""` carries `remoteUrl` + `checksum`.
- A `remote` has a `url` and a `type` of `http` or `sse`.
- Every `${input:…}` reference (in `args` / `env` / `headers`) resolves to a declared `inputs[].id`.
- **No literal secrets**: a credential-keyed `env` / `headers` value (key matching
  `key` / `token` / `secret` / `password` / `apikey` / `auth` / `credential` / `bearer`) MUST reference
  an input.

Signing (`verifyTrust`), registry counter-signing, and the `/revocations` feed apply unchanged
(`package-format.md § Signing`, `repository-api.md § Revocations`).

## Discovery & registry

An MCP-server package lists in the registry like any other package:

- `kind: "mcp"` flows through the browse/search summary (`repository-api.md` — each summary carries
  `kind`) and the package detail (`GET /packages/{id}` → `manifest.mcp`), so a host tells it apart
  without a per-package round-trip.
- A registry that carries MCP servers advertises the **`"mcp"`** conformance profile in
  `/.well-known/azphalt-repository.json` `profiles` (`repository-api.md § Supported types and
  profiles`), so only a host that implements an MCP client browses for them.
- App-scoping (`targetApps`) works as-is: an MCP server meant for one host's store is app-scoped; a
  general one omits `targetApps` and is global.

Publishing is the existing path — the registry verifies (the rules above) and indexes the package; a
consignment storefront or a PR submission gates on the same verification. No new distribution endpoint
is introduced.

## Open questions

- **Android native launch descriptor** — the precise `platforms.android` shape (a bundled component id
  vs. a host-runtime entry vs. an intent). `0.1` carries an opaque `component` string the host
  resolves.
- **Secret detection** — the rule is a conservative **credential-keyed** check (a credential-shaped
  key's value must reference an input). Whether to broaden it to a value-shape heuristic
  (entropy / known prefixes like `sk-`) is deferred.
- **`grants` vocabulary** — the blessed set (`fs:read` / `fs:write` / `net` / …) and how a host maps it
  to WASI preopens / socket permissions.
- **`offers` verification** — whether a host reconciles the declared `offers` against the live MCP
  handshake on install, or leaves it purely advisory.
- **Conformance** — an `mcp` host-conformance profile in `@azphalt/conformance`
  (`runMcpConformance(host)`), mirroring the `companion` profile, is deferred to a follow-on.
