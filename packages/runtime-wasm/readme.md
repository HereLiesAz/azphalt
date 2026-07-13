# @azphalt/runtime-wasm

Run an azphalt **code** extension inside a **QuickJS-in-WASM** sandbox (the Javy/Shopify pattern,
via [`quickjs-emscripten`](https://github.com/justjake/quickjs-emscripten)). This is the isolation
substrate `spec/capability-model.md` calls for.

Where [`@azphalt/runtime-reference`](../runtime-reference) proves the *contract* by running a
trusted module in-process, this proves it under **real sandboxing**:

- **No ambient authority** — the guest JS has no `process`, `require`, `fetch`, filesystem, or
  network, and can only `import` the in-package modules and `@azphalt/sdk`. The only way out is a
  host function.
- **Capability-gated host functions** — the runtime injects host functions only for the granted
  capabilities, and builds the `ctx` from them, so an ungranted capability is **absent**, not an
  erroring stub.
- **Binary image ABI** — the bitmap crosses as a single RGBA8 `ArrayBuffer` (one copy in, one copy
  out); the guest mutates a `Uint8ClampedArray` view in place, not per-pixel JSON.

## Run a real `.azp`

`runFilter` loads a real `code`-kind package: it verifies the `.azp`, loads the `entry` module as
an **ES module** (resolving its `import "@azphalt/sdk"` to an in-sandbox shim), resolves the export
named by `contributes.filters[].entry`, checks its `defineFilter` brand, and runs it against a
capability-gated `ctx` — the same contract `runtime-reference` runs, but sandboxed.

~~~ts
import { runFilter, loadExtension } from "@azphalt/runtime-wasm";

// azp is a code-kind .azp whose manifest declares entry, runtime: "js", capabilities, and a filter.
const { bitmap, redraws } = await runFilter(
  azp,
  { params: { strength: 1 }, bitmap: { data: [/* RGBA8 */], width: 64, height: 64 } },
  // capabilities default to the manifest's declared set; pass to narrow the grant.
);

loadExtension(azp).manifest; // verify + parse without running
~~~

## Probe with a bare expression

`runFilterSandboxed` runs a `(ctx) => …` expression directly — a smaller probe of sandboxing,
capability gating, and the buffer round-trip, without packaging a `.azp`.

~~~ts
import { runFilterSandboxed } from "@azphalt/runtime-wasm";

const { bitmap, redraws } = await runFilterSandboxed(
  `(ctx) => {
     const b = ctx.bitmap.read();
     for (let i = 0; i < b.data.length; i += 4) { b.data[i] = 255 - b.data[i]; }
     ctx.bitmap.write(b);
     ctx.canvas.requestRedraw();
   }`,
  { params: {}, bitmap: { data: [/* RGBA8 */], width: 64, height: 64 } },
  { capabilities: ["bitmap", "canvas"] }, // ctx.bitmap + ctx.canvas only; everything else absent
);
~~~

## Scope

`runFilter` runs `runtime: "js"` filter contributions with the `bitmap`, `params`, and `canvas`
capabilities bridged — enough to run a real shipped extension (the `examples/invert` build runs
unchanged). The remaining `Host` sub-APIs (`layers`, `selection`, `color`, `assets`) and the raw
`runtime: "wasm"` path are mechanical extensions of the same gating + bridge pattern; a `wasm`
entry is rejected rather than silently ignored. Across a WASM isolation boundary a copy is
unavoidable, so the buffer ABI is one copy in / one copy out — binary, not the per-pixel JSON of
the first cut.
