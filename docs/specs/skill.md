# Skills (`kind: "skill"`)

*Status: **Normative**. Extends the package model with a seventh kind — a **skill bundle**: one or more
[Agent Skills](https://agentskills.io/specification) an AI-agent host loads. The SDK `Kind`/manifest
wiring, the `@azphalt/azp` verification rules (`validateSkillManifest` folded into `verifyAzp`), the
`create-azphalt` template, the registry discovery profile, and the `skill` host-conformance profile
(`runSkillConformance`) are all implemented and on `main`. Modeled on how this spec already treats an MCP
server (`mcp-server.md`): the package **declares** the bundled skill(s); the host's own agent runtime
reads and exposes them.*

## Why this exists — and why it doesn't break the moat

A **skill** is instructional text (a `SKILL.md`, plus optional `scripts/`, `references/`, `assets/`) an
AI agent reads to learn how to do something — it is not code an azphalt runtime executes, and it touches
none of the editor surface a `code` extension can reach (see `capability-model.md`). So, like an MCP
server, a skill bundle **cannot be an azphalt-sandboxed `code` extension**, and this spec does not try to
make it one.

Instead it reuses the header pattern proven for MCP servers and companion apps: the uploaded `.azp`
carries **no `/code` sandbox payload** and declares **no `capabilities`**. Unlike those two kinds it does
bundle a real payload — the `SKILL.md` files and their support directories — because that payload *is*
the skill; there is nothing to "connect to" or "launch" the way there is for a server or a companion app.
The moat holds because:

- azphalt grants a skill package **no editor capability**. It reaches **nothing** of the host's editor
  surface (layers, bitmaps, canvas). The never-list is unaffected.
- The `.azp` carries **no `capabilities`**, no `entry`/`runtime`. A skill host's agent loop reads
  `SKILL.md` as text and decides what to do with it under whatever sandboxing that host already applies
  to its own agent — azphalt's part ends at distributing a signed, verifiable bundle.
- The `SKILL.md` **format itself** — frontmatter fields, the `scripts/`/`references/`/`assets/`
  convention, how a host is meant to select and load a skill — is defined by the external
  [Agent Skills specification](https://agentskills.io/specification), the same way `mcp-server.md` defers
  wire-protocol semantics to the [Model Context Protocol](https://modelcontextprotocol.io). This spec
  defines only how a skill bundle is **packaged and discovered** inside a `.azp`.

The result: the marketplace grows from *assets + sandboxed filters + companion apps + MCP servers* to
also carry **skills** — users upload them the way they publish any other package — **without** widening
what a sandboxed extension can do.

## The package (`kind: "skill"`)

A normal signed `.azp` whose `kind` is `"skill"`. It carries **no `capabilities`** and **no `entry`** —
it is a bundle of one or more skills. Its manifest adds one block, `skill`:

~~~jsonc
{
  "azphalt": "0.1",
  "id": "com.acme.azphalt.release-notes-skill",
  "name": "Release Notes",
  "version": "1.0.0",
  "kind": "skill",
  "license": "MIT",
  "compat": ">=0.1",
  "skill": {
    "skills": [
      {
        "id": "release-notes",
        "name": "Release Notes",
        "description": "Draft release notes from a range of commits."
      }
    ]
  },
  "files": {
    "skills/release-notes/SKILL.md": "sha256-…",
    "skills/release-notes/scripts/collect-commits.sh": "sha256-…",
    "skills/release-notes/references/style-guide.md": "sha256-…"
  }
}
~~~

### `skill` block fields

- **`skills[]`** — one or more bundled skills (**at least one** required). Each entry has:
  - **`id`** — a directory-safe name; the package payload has the skill at `skills/<id>/SKILL.md`.
  - **`name`** / **`description`** *(optional)* — mirror the `SKILL.md` frontmatter. **Advisory**: they
    power the store card and a host's browse list without extracting and parsing every bundled skill; a
    host that reads `SKILL.md` treats it, not this block, as authoritative.

## Discovery & layout

Each entry in `skill.skills` corresponds to a directory `skills/<id>/` in the package payload, containing
at minimum a `SKILL.md` file — the same discovery convention the
[Agent Plugins Specification](https://agent-plugins.org/specification) defines for a plugin's `skills/`
directory: one level of subdirectories, each identified by a `SKILL.md` at its top, with no recursive
search for additional skills beneath it. `scripts/`, `references/`, and `assets/` are conventional
subdirectories a `SKILL.md` may point into, per the Agent Skills format; azphalt does not interpret their
contents.

A skill's `SKILL.md` MUST resolve within the filesystem-resolved plugin root (`package-format.md` § path
containment applies to every payload path, not only skills). Whether a discovered `SKILL.md` itself
conforms to the Agent Skills format — required frontmatter fields, body structure — is validated by the
host's skill loader, not by azphalt package verification; a host that finds a bundled `SKILL.md` it
cannot parse skips that skill and continues loading the rest of the package, the same tolerance
`mcp-server.md` gives an unrecognized `offers` shape.

## Verification

`verifyAzp` applies these rules to a `kind: "skill"` manifest (in addition to the container integrity and
signature checks every package gets). Reference: `@azphalt/azp`'s `validateSkillManifest`.

- The manifest has a `skill` block, and is **header-only**: no `entry` / `runtime`, no `capabilities`, no
  `assets`, no `app` / `mcp` / `pack` block.
- `skill.skills` has **≥ 1** entry; every entry has a non-empty, directory-safe `id` (no path separators,
  not `.` or `..`), unique within the package.
- Every entry's `skills/<id>/SKILL.md` names a path present in `manifest.files` — a declared skill MUST
  be a real, integrity-covered payload entry, not just a claim in the manifest.

Verification does **not** parse `SKILL.md` itself or validate it against the Agent Skills frontmatter
schema — that is a host-side concern, exactly as `mcp-server.md`'s `offers` block is advisory and the
live MCP handshake is authoritative.

Signing (`verifyTrust`), registry counter-signing, and the `/revocations` feed apply unchanged
(`package-format.md § Signing`, `repository-api.md § Revocations`).

## Discovery & registry

A skill package lists in the registry like any other package:

- `kind: "skill"` flows through the browse/search summary (`repository-api.md` — each summary carries
  `kind`) and the package detail (`GET /packages/{id}` → `manifest.skill`), so a host tells it apart
  without a per-package round-trip.
- A registry that carries skill packages advertises the **`"skill"`** conformance profile in
  `/.well-known/azphalt-repository.json` `profiles` (`repository-api.md § Supported types and
  profiles`), so only a host that implements an agent skill loader browses for them.
- App-scoping (`targetApps`) works as-is: a skill meant for one host's agent is app-scoped; a general one
  omits `targetApps` and is global.

Publishing is the existing path — the registry verifies (the rules above) and indexes the package; no new
distribution endpoint is introduced.

## Conformance

`@azphalt/conformance` ships a `skill` host-conformance profile, `runSkillConformance(host)` (mirroring
the `mcp` profile): it drives a fixture `kind:"skill"` package and asserts the host verifies the header,
refuses a tampered / unsafe-path / non-`kind:"skill"` / incompatible package, and surfaces the bundled
skill's id. A conforming host declares a `"skill"` profile for registry matching.
