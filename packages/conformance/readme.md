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

`validatePanel(panel)` is also exported standalone, for hosts and importers to validate a UI panel
against `spec/ui-schema.md`.
