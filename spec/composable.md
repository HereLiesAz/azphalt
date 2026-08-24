# Composables (`kind: "composable"`)

*Status: **Normative**. Extends the package model with a ninth kind — a **composable set**: one or
more UI element *descriptions*, interpreted by a host's own already-compiled renderer. Modeled on
`app`/`mcp`/`pack`: the uploaded `.azp` is a pure header — data, no code, no payload beyond the
manifest itself.*

## Why this exists — and why it doesn't break the moat

A **composable** package distributes a UI element the way `skill`/`script` distribute a skill or a
script: through the same signed, verified, revocable pipeline every other `.azp` uses. But a UI
element on most hosts is *compiled bytecode* (a Compose composable, a SwiftUI view, a React
component) — loading foreign bytecode into a host's own process would run with that host's full
ambient permissions, a different trust category than `code` (sandboxed, powerless by default) or
`script` (a separate OS process). That is not a capability azphalt grants to anything, and a
`composable` package is no exception.

So `kind: "composable"` never carries code. Its payload is **data**: which of the host's own
already-linked UI **templates** to instantiate, and which of the host's own token values — a color
role, a surface shape, a type-scale step — to apply to it. A host's own compiled renderer reads
this data and builds the element; nothing arrives that the host didn't already ship. This is the
same reasoning `mcp-server.md` and `script.md` give for their own kinds, pushed one step further:
where `script` keeps native execution *outside* the azphalt sandbox (a separate process), and
`skill` keeps its payload as *text* a model reads, `composable` keeps its payload as *values* a
host's own compiled code switches on — never a new code path, only a new input to existing ones.

**Templates are a build-time dependency, not a runtime download.** The vocabulary of `templateId`
values a composable package may reference comes from a template *library* — an actual versioned
artifact (e.g. a Gradle `implementation("group:artifact:x.y.z")`, an npm package, …) the **host
app** links at build time and resolves however it already resolves any other dependency. A `.azp`
composable package never bundles, patches, or extends that vocabulary — it only *selects* from
whichever template ids the host happens to have linked. The trust boundary is exactly "what the
host's own build already resolved," which is why this is safe without any azphalt-side sandbox:

- A composable package built against template ids from a library the installing host never linked
  simply **fails to resolve** — a missing-template error, ordinary and inert, the same shape as
  referencing an asset `type` a host doesn't recognize. It is not a security question because
  nothing was ever fetched or executed on the host's behalf; the host looked up a string in a table
  it built itself and found nothing there.
- azphalt has **no** opinion on, and does not track, which template libraries exist or what their
  ids mean. That vocabulary is entirely the host + template-library's own contract — the same way
  `mcp-server.md` doesn't define what an MCP tool does and `script.md` doesn't validate that an
  `interpreter` names a real executable.

The moat holds because:

- azphalt grants a composable package **no editor capability** and **no code-sandbox surface**. It
  carries no `entry`/`runtime`, no `capabilities` — it reaches nothing `code` can reach, and it
  reaches nothing beyond what a host's own linked template renderer already exposes.
- The package is a **pure header**, like `app`/`mcp`/`pack` — no `/code`, and unlike `skill`/
  `script` it does not even need a bundled data file: every field is inline in the manifest.
  (An author MAY still bundle a static preview under `preview`, same as any other kind.)
- Resolving a `templateId` against the host's linked library, and mapping a token value (`hue`,
  `surface`, `scale`) to the host's own design-token system, happens entirely in the **host's own
  already-compiled code** — azphalt verifies only that the manifest is well-formed, never what the
  values mean.

## The package (`kind: "composable"`)

A normal signed `.azp` whose `kind` is `"composable"`. It carries **no `capabilities`** and **no**
`entry`/`runtime` — it is a header naming a template library and one or more elements to
instantiate from it. Its manifest adds one block, `composable`:

~~~jsonc
{
  "azphalt": "0.1",
  "id": "com.acme.azphalt.confirm-record-tile",
  "name": "Confirm Record Tile",
  "version": "1.0.0",
  "kind": "composable",
  "license": "MIT",
  "compat": ">=0.1",
  "composable": {
    "library": {
      "group": "com.hereliesaz.conveyance",
      "artifact": "conveyance-m3-expressive",
      "version": "1.4.0"
    },
    "elements": [
      {
        "id": "confirm-record",
        "templateId": "m3e.tile.record",
        "hue": "azure",
        "surface": "recordTile",
        "scale": "lead",
        "act": "create",
        "jobs": ["confirms-a-destructive-action", "shows-the-record-being-created"]
      }
    ]
  },
  "files": {}
}
~~~

### `composable` block fields

- **`library`** *(required)* — the build-resolved template library this package's `templateId`
  values are drawn from. Purely **descriptive metadata** for a host/registry to display and match
  against — azphalt never fetches, verifies, or resolves it; the host's own build system already
  did that. An open shape:
  - **`group`** *(required)* — the library's package-manager group/namespace (e.g. a Gradle/Maven
    `groupId`, an npm scope).
  - **`artifact`** *(required)* — the library's artifact/module name.
  - **`version`** *(optional)* — the version this package was authored against. Advisory: a host
    resolves `templateId` against whatever version of the library it actually linked, which may
    differ; a template id absent from the host's linked version simply fails to resolve.
- **`elements[]`** *(required, ≥ 1)* — one or more UI elements this package describes. Each entry:
  - **`id`** *(required)* — a directory-safe name identifying the element within the package,
    unique within it. Not a payload path — `composable` bundles no per-element file.
  - **`templateId`** *(required)* — the id of a template the named `library` provides. Open
    vocabulary, entirely defined by that library — azphalt validates only that it is a non-empty
    string; whether it names a real template is the host's own lookup to make (and to fail
    harmlessly) at install/render time.
  - **`hue`** *(required)* — the host's color-role token this element should render with (e.g. one
    of a host's fourteen named hues, or a "caps" variant). Open vocabulary, host-defined.
  - **`surface`** *(required)* — the host's surface-shape token, e.g. `recordTile` \| `note` \|
    `capsule`. Open vocabulary — azphalt does not enumerate a host's shape system.
  - **`scale`** *(required)* — the host's type-scale step, e.g. `hero` \| `section` \| `lead` \|
    `body` \| `capsule` \| `eyebrow` \| `endCap` \| `micro`. Open vocabulary, host-defined.
  - **`act`** *(required)* — what the element **does** — the user-facing action it performs (e.g.
    `create`, `delete`, `send`). Open vocabulary: azphalt validates only that it is a non-empty
    string; a host maps it to its own action/intent system.
  - **`jobs[]`** *(required, ≥ 1)* — a checkable declaration of the **real jobs** this element does
    — plain-language statements of what it is *for*, not how it looks (e.g. `"confirms a
    destructive action"`). This is the accountability surface: an element declares its purpose so a
    host, a reviewer, or a later audit can check the element against its own claim, rather than
    trusting that a `hue`/`surface`/`scale` combination alone says what something is for. azphalt
    validates only that each entry is a non-empty string; interpreting or enforcing a job's claim
    (e.g. that a `delete` act's element is actually destructive-looking) is a host/reviewer concern.

`hue`, `surface`, `scale`, and `act` are intentionally **open vocabulary**, the same posture
`script.md`'s `interpreter` and `extension-manifest.md`'s asset `role` already take: azphalt fixes
the *shape* of the data, never a specific app's token names, so this kind stays usable by any host
with its own design-token system, not just the one that motivated it.

## Verification

`verifyAzp` applies these rules to a `kind: "composable"` manifest (in addition to the container
integrity and signature checks every package gets). Reference: `@azphalt/azp`'s
`validateComposableManifest`.

- The manifest has a `composable` block, and is **header-only**: no `entry` / `runtime`, no
  `capabilities`, no `assets`, no `app` / `mcp` / `pack` / `skill` / `script` block.
- `composable.library` is present, with non-empty string `group` and `artifact` (and `version`,
  when present, a non-empty string).
- `composable.elements` has **≥ 1** entry; every entry has:
  - a non-empty, directory-safe `id` (no path separators, not `.` or `..`), unique within the
    package;
  - non-empty string `templateId`, `hue`, `surface`, `scale`, and `act`;
  - a non-empty `jobs` array of non-empty strings.

Verification does **not** interpret what any `templateId`, `hue`, `surface`, `scale`, or `act`
value means, confirm a `templateId` exists in the named library, or judge whether a `jobs` claim is
accurate — those are host-side (and, for `jobs`, human-review-side) concerns, out of scope for a
container-format verifier. In particular: **verification never contacts, resolves, or downloads
the named `library`.** It is metadata only; nothing about `composable` implies fetching a package
at install or render time.

Signing (`verifyTrust`), registry counter-signing, and the `/revocations` feed apply unchanged
(`package-format.md § Signing`).

## Discovery & registry

A composable package lists in the registry like any other package:

- `kind: "composable"` flows through the browse/search summary (`repository-api.md` — each summary
  carries `kind`) and the package detail (`GET /packages/{id}` → `manifest.composable`), so a host
  tells it apart without a per-package round-trip.
- A registry that carries composable packages advertises the **`"composable"`** conformance profile
  in `/.well-known/azphalt-repository.json` `profiles` (`repository-api.md § Supported types and
  profiles`), so only a host that has actually linked a matching template library browses for them.
- App-scoping (`targetApps`) works as-is: a composable set meant for one host's own template system
  is app-scoped (the common case, since `templateId` and token values are host-specific); a general
  one omits `targetApps`, though in practice a `composable` package is rarely useful to more than
  one host given how host-specific its vocabulary is.

Publishing is the existing path — the registry verifies (the rules above) and indexes the package;
no new distribution endpoint is introduced.

## Conformance

`@azphalt/conformance` ships a `composable` host-conformance profile,
`runComposableConformance(host)` (mirroring the `mcp`/`skill`/`script` profiles): it drives a
fixture `kind:"composable"` package and asserts the host verifies the header, refuses a tampered /
unsafe-path / non-`kind:"composable"` / incompatible package, and surfaces the declared elements —
**without ever executing anything**, since there is nothing here to execute. A conforming host
declares a `"composable"` profile for registry matching.
