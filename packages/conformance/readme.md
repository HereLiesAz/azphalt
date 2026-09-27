# @azphalt/conformance

A runnable conformance suite for azphalt **hosts**. It turns the checklist in
[`ADOPTION.md`](../../docs/ADOPTION.md) and the normative specs
([capability-model](../../spec/capability-model.md), [ui-schema](../../spec/ui-schema.md),
[package-format](../../spec/package-format.md)) into an executable battery, so an adopter can
**self-certify** instead of checking their host against prose.

~~~ts
import { runConformance } from "@azphalt/conformance";
import { runFilter } from "@azphalt/runtime-wasm";

const report = await runConformance({ runFilter, apiVersion: "0.1" });
report.ok;      // true ⇒ conforming
report.checks;  // [{ id, title, ok, detail }, …] — one per checklist line
~~~

## What a host provides

Implement `CodeHost` — the minimum the suite drives: run a filter from `.azp` bytes against an
in-memory world, and report your host API version. `@azphalt/runtime-wasm`'s `runFilter` already
is this shape, so it's the worked reference host.

~~~ts
interface CodeHost {
  runFilter(azp: Uint8Array, world, opts?): Promise<{ bitmap, redraws }>;
  apiVersion?: string; // e.g. "0.1", so `compat` can gate
}
~~~

## The checks

Each maps to a conformance-checklist line and returns `{ id, title, ok, detail }`:

| id | asserts |
|---|---|
| `reject-tampered` | a payload failing its digest is refused |
| `reject-unsafe-path` | a `..` payload path is refused |
| `capability-gating` | an ungranted capability is **absent**, so the filter fails |
| `never-list` | no `process` / `require` / `fetch` / sockets in the sandbox |
| `abi-roundtrip` | the RGBA8 straight-alpha buffer round-trips |
| `params-roundtrip` | control values reach the extension through `params` |
| `ui-schema` | the ui panel is valid and covers every `0.1` control type |
| `compat-version` | the host reports an API version satisfying a package's `compat` |

## Runners for other host profiles

`runConformance` is the code-host battery. Each other kind of host has its own runner. All return a
`ConformanceReport` — `{ ok, checks }`, with `ok` true only if every check passed — and each takes
the minimum interface that profile needs. Every runner except `runConformance` and
`runVideoAudioConformance` drives the host through a single `load(azp)` that verifies the package and
runs none of its code; a `load` that throws counts as a refusal. `apiVersion` (e.g. `"0.1"`) is what
the `compat-version` check gates on, and `profiles` is what the `profile-declaration` check reads.

### `runAssetConformance(host: AssetHost)`

For an **asset host** — an app that consumes `asset`-kind packages but runs no code
([`ADOPTION_ASSET_HOST.md`](../../docs/ADOPTION_ASSET_HOST.md)).

~~~ts
const report = await runAssetConformance({
  load: (azp) => myHost.load(azp), // → { accepted, reason?, appliedTypes? }
  apiVersion: "0.1",
});
~~~

Checks: `reject-tampered`, `reject-unsafe-path`, `reject-kind-code`, `accepts-asset`,
`unknown-type-skip`, `ui-schema`, `compat-version`, `reject-bad-panel`. There is no
`profile-declaration` check.

### `runVideoAudioConformance(host: VideoAudioHost)`

For a **video / audio (temporal) host**. The host implements `runFilter(azp, world, opts?)` and
`runTransition(azp, world, opts?)` — the same bytes-in contract as `@azphalt/runtime-wasm`'s
functions — and declares `profiles` (must include `"video-audio"`) and `supports`
(`{ capabilities, contributionKinds }`, which must include the `time` and `audio` capabilities and the
`transitions` kind).

~~~ts
import { runFilter, runTransition } from "@azphalt/runtime-wasm";

const report = await runVideoAudioConformance({
  runFilter, runTransition, apiVersion: "0.1",
  profiles: ["video-audio"],
  supports: { capabilities: ["time", "audio"], contributionKinds: ["filters", "transitions"] },
});
report.profiles; // the profiles the host declared
~~~

Checks: `reject-tampered`, `reject-unsafe-path`, `declares-temporal-support`, `transition-dispatch`,
`audio-abi`, `audio-capability-gating`, `profile-declaration`, `compat-version`. The report is a
`VideoAudioConformanceReport`, which adds `profiles`.

### `runCompanionConformance(host: CompanionHost)`

For a host that consumes `kind:"app"` companion packages
([`spec/companion-app.md`](../../spec/companion-app.md)). Besides `load` (reporting `offered`
handoff ids and the matched `platform`), the host implements `invoke(azp, handoffId, ret)`, which
drives one handoff and reports whether it `consented`, the `sentInput` it handed off, and whether it
`accepted` the companion's return after validating it against the declared `output`. It also
declares `platforms` (`"android"` / `"pwa"`) and `profiles` (must include `"companion"`).

Checks: `reject-tampered`, `reject-unsafe-path`, `reject-non-app`, `offers-handoff`, `consent`,
`least-input`, `validate-return`, `compat-version`, `profile-declaration`.

### `runMcpConformance(host: McpHost)`

For a host that consumes `kind:"mcp"` packages ([`spec/mcp-server.md`](../../spec/mcp-server.md)).
`load` reports the `servers` it will surface; `profiles` must include `"mcp"`. Connecting to and
running the server is outside the suite.

Checks: `reject-tampered`, `reject-unsafe-path`, `reject-non-mcp`, `surfaces-server`,
`compat-version`, `profile-declaration`.

### `runSkillConformance(host: SkillHost)`

For an AI-agent host that consumes `kind:"skill"` packages ([`spec/skill.md`](../../spec/skill.md)).
`load` reports the `skills` it will surface; `profiles` must include `"skill"`. Parsing `SKILL.md`
and exposing it to the agent is outside the suite.

Checks: `reject-tampered`, `reject-unsafe-path`, `reject-non-skill`, `surfaces-skill`,
`compat-version`, `profile-declaration`.

### `runScriptConformance(host: ScriptHost)`

For a host that consumes `kind:"script"` packages ([`spec/script.md`](../../spec/script.md)).
`load` reports the `command` it will surface; `profiles` must include `"script"`. Resolving
dependencies and invoking the script is outside the suite.

Checks: `reject-tampered`, `reject-unsafe-path`, `reject-non-script`, `surfaces-command`,
`compat-version`, `profile-declaration`.

### `runComposableConformance(host: ComposableHost)`

For a host that consumes `kind:"composable"` packages
([`spec/composable.md`](../../spec/composable.md)). `load` reports the `elements` it will surface;
`profiles` must include `"composable"`. Resolving each `templateId` against the host's template
library and rendering it is outside the suite.

Checks: `reject-tampered`, `reject-unsafe-path`, `reject-non-composable`, `surfaces-element`,
`compat-version`, `profile-declaration`.

~~~ts
// The load-only runners share this shape:
const report = await runMcpConformance({
  load: (azp) => myHost.load(azp), // → { accepted, reason?, servers? }
  apiVersion: "0.1",
  profiles: ["mcp"],
});
~~~

## Other exports

`validatePanel(panel)` is also exported standalone, for hosts and importers to validate a UI panel
against `spec/ui-schema.md`.
