# Scripts (`kind: "script"`)

*Status: **Normative**. Extends the package model with an eighth kind — a **native script**
(bash, Python, PowerShell, or any other interpreted script) a host installs and runs the way a
package manager installs and runs one of its own packages: resolving declared system dependencies
first, then making the script runnable. The SDK `Kind`/manifest wiring, the `@azphalt/azp`
verification rules (`validateScriptManifest` folded into `verifyAzp`), the `create-azphalt`
template, the registry discovery profile, and the `script` host-conformance profile
(`runScriptConformance`) are all implemented and on `main`.*

## Why this exists — and why it doesn't break the moat

A **script** needs real OS access to be useful — a real filesystem, a real process, and often
other system packages installed alongside it (a Termux-backed terminal host is the motivating
case: installing a script should feel exactly like `apt install`/`pkg install`, not like loading a
sandboxed filter). That is the same reasoning that already keeps an **MCP server** out of the
`code` sandbox (`mcp-server.md`): "an MCP server is the opposite [of `code`] — a process that needs
filesystem and network to do anything useful… an MCP server cannot be an azphalt-sandboxed
extension." A script is no different, and for the same reason: **it cannot be a `kind:"code"`
extension**, and this spec does not fold it into `code` by adding a "native" runtime flavor —
`kind:"code"` keeps its one unconditional guarantee (sandboxed, powerless, safe to run with zero
prompts) precisely because nothing that needs real OS access is ever allowed to hide behind it.
That is why `mcp`, `app`, and now `script` each get their **own top-level kind** instead of a
sub-flag under `code`.

The package (below) is a signed header + real payload, same shape as `skill`: it carries **no**
azphalt `capabilities` and **no** `/code` sandbox `entry`/`runtime`. The moat holds because:

- azphalt grants a script package **no editor capability**. It reaches **nothing** of the host's
  editor surface (layers, bitmaps, canvas). The never-list is unaffected.
- Dependency installation and script execution happen entirely at the **host's own OS/package-
  manager layer**, under whatever consent that host requires (the same boundary a companion app's
  platform install or an MCP server's `grants` already draw) — never as an azphalt editor
  capability.
- The script format itself is out of scope here, the same way `mcp-server.md` defers wire
  semantics to the Model Context Protocol: this spec defines only how a script is **packaged,
  declared, and discovered**, not how any particular interpreter or package manager works.

## The package (`kind: "script"`)

A normal signed `.azp` whose `kind` is `"script"`. It carries **no `capabilities`** and **no**
`/code` sandbox `entry`/`runtime` — it is a header plus the script payload. Its manifest adds one
block, `script`:

~~~jsonc
{
  "azphalt": "0.1",
  "id": "com.acme.azphalt.git-sync",
  "name": "Git Sync",
  "version": "1.0.0",
  "kind": "script",
  "license": "MIT",
  "compat": ">=0.1",
  "script": {
    "interpreter": "bash",
    "entry": "script/git-sync.sh",
    "command": "git-sync",
    "dependencies": { "apt": ["git", "openssh"] }
  },
  "files": { "script/git-sync.sh": "sha256-…" }
}
~~~

### `script` block fields

- **`interpreter`** *(required)* — what runs the script, e.g. `"bash"`, `"python3"`, `"pwsh"`. Open
  vocabulary: a host maps this to an actual executable on its platform, and, when the same name
  also appears in `dependencies`, to the package that provides it.
- **`entry`** *(required)* — the in-package path to the script payload. Real, integrity-covered
  payload, the same as `skill`'s `SKILL.md` — not a pointer to something to launch elsewhere.
- **`command`** *(optional)* — the name the script should be callable as once installed (e.g. on
  `PATH`). Absent means the host picks a reasonable default from `id`/`name`.
- **`args`** *(optional)* — default arguments passed on every invocation, before any
  caller-supplied ones.
- **`dependencies`** *(optional)* — system packages the script needs, namespaced by package
  manager (`"apt"`, `"brew"`, `"apk"`, …), each namespace an array of package names. Open
  vocabulary, mirroring `mcp`'s `grants`: a host installs only the namespace(s) it understands and
  ignores the rest. **Omit it entirely** for a script needing nothing beyond what the host already
  guarantees (e.g. a `bash` script on a host that always has `bash`). The interpreter's own package
  is an ordinary entry here when it might not already be present — `dependencies: { "apt":
  ["python3"] }` alongside `interpreter: "python3"` is expected, not redundant: `interpreter` says
  what to run the script *with*, `dependencies` says what must be *installed* first, and they
  commonly name the same package for exactly that reason. A script whose only dependency is its
  own interpreter still declares it here, so a host with that interpreter missing installs it
  rather than failing at run time.

## Installation

A conforming host installs a `script` package the way a package manager installs one of its own:

1. Verify the package (below).
2. Resolve `dependencies` for every namespace the host understands, installing anything missing,
   under whatever consent that host's package manager already requires — this is **the host's own
   OS-level action**, not something azphalt mediates.
3. Extract `entry` to wherever the host keeps installed script payloads, and make it callable as
   `command` (or a host-chosen default).

A host that doesn't recognize any namespace in `dependencies` MAY still install the package and
attempt to run `interpreter` directly if it happens to already be present — `dependencies` is a
hint for a host that can act on it, not a hard requirement for one that can't.

## Verification

`verifyAzp` applies these rules to a `kind: "script"` manifest (in addition to the container
integrity and signature checks every package gets). Reference: `@azphalt/azp`'s
`validateScriptManifest`.

- The manifest has a `script` block, and is **header-only**: no `entry` / `runtime` (the
  *code-sandbox* fields — distinct from `script.entry`), no `capabilities`, no `assets`, no
  `app` / `mcp` / `pack` / `skill` block.
- `script.interpreter` is a non-empty string.
- `script.entry` names a path present in `manifest.files` — a declared script MUST be a real,
  integrity-covered payload entry, not just a claim.
- `script.command` and each string in `script.args`, when present, are non-empty.
- `script.dependencies`, when present, is an object whose every value is a non-empty array of
  non-empty package-name strings.

Verification does not interpret the script's contents, validate that `interpreter` names a real
executable, or confirm any `dependencies` package name actually exists in any package manager's
repositories — those are host-side and package-manager-side concerns, out of scope for a
container-format verifier.

Signing (`verifyTrust`), registry counter-signing, and the `/revocations` feed apply unchanged
(`package-format.md § Signing`, `repository-api.md § Revocations`).

## Discovery & registry

A script package lists in the registry like any other package:

- `kind: "script"` flows through the browse/search summary (`repository-api.md` — each summary
  carries `kind`) and the package detail (`GET /packages/{id}` → `manifest.script`), so a host
  tells it apart without a per-package round-trip.
- A registry that carries script packages advertises the **`"script"`** conformance profile in
  `/.well-known/azphalt-repository.json` `profiles` (`repository-api.md § Supported types and
  profiles`), so only a host that implements a script installer browses for them.
- App-scoping (`targetApps`) works as-is: a script meant for one host's terminal is app-scoped; a
  general one omits `targetApps` and is global.

Publishing is the existing path — the registry verifies (the rules above) and indexes the package;
no new distribution endpoint is introduced.

## Conformance

`@azphalt/conformance` ships a `script` host-conformance profile, `runScriptConformance(host)`
(mirroring the `mcp`/`skill` profiles): it drives a fixture `kind:"script"` package and asserts the
host verifies the header, refuses a tampered / unsafe-path / non-`kind:"script"` / incompatible
package, and surfaces the declared `command`. A conforming host declares a `"script"` profile for
registry matching.
