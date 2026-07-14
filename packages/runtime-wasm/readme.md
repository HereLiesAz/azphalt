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
- **Binary image ABI** — the bitmap crosses as a single RGBA `ArrayBuffer` (one copy in, one copy
  out); the guest mutates a typed-array view in place, not per-pixel JSON. 8-bit by default
  (`Uint8ClampedArray`); pass `depth: 16` for a `Uint16Array` (channels 0–65535), doubling the byte stride.

## Run a real `.azp`

`runFilter` / `runTool` / `runCommand` load a real `code`-kind package: verify the `.azp`, load the
`entry` module as an **ES module** (resolving its `import "@azphalt/sdk"` to an in-sandbox shim),
resolve the export named by `contributes.{filters,tools,commands}[].entry`, check its brand, and run
it against a capability-gated `ctx` — the same contract `runtime-reference` runs, but sandboxed.

~~~ts
import { runFilter, loadExtension } from "@azphalt/runtime-wasm";

// azp is a code-kind .azp whose manifest declares entry, runtime, capabilities, and a contribution.
const result = await runFilter(
  azp,
  { params: { strength: 1 }, bitmap: { data: [/* RGBA8 */], width: 64, height: 64 } },
  // capabilities default to the manifest's declared set; pass to narrow the grant.
);
result.bitmap;    // the target layer's final pixels
result.layers;    // every layer, result.selection, result.color, result.redraws

loadExtension(azp).manifest; // verify + parse without running
~~~

The **full `Host` surface** is bridged, each gated by its capability: `canvas`, `layers`,
`bitmap`, `selection`, `color`, `params`, `assets`. Pass a multi-layer document via `world.layers`
(with `activeLayerId` / `targetLayerId`), a `selection` mask, and a `color` active/palette; a single
`world.bitmap` is the one-layer shorthand. Bitmaps and the selection mask cross as the binary
`ArrayBuffer` ABI; layer refs and colors cross as JSON.

## Raw `runtime: "wasm"` entries

A `runtime: "wasm"` extension runs on the host's own `WebAssembly` (it *is* the sandbox), against the
shared-memory image ABI from `spec/capability-model.md`. The module **exports** `memory` and the
entry `filter(ptr, width, height, stride)`; the runtime writes the target layer's RGBA8 bytes into
the module's memory at `ptr`, calls the entry, and reads them back. `runFilter` dispatches here
automatically when `manifest.runtime === "wasm"`; the `bitmap` capability is required.

### The `env` import ABI

Capability-gated host functions are passed as `env` imports — only those for granted capabilities are
present, so importing an ungranted one fails instantiation (deny-by-default). Everything crosses
through the module's own linear memory: an **input** the module supplies is a `(ptr, len)` pair it
wrote there; an **output** the host returns is written into a module-supplied `(outPtr, outCap)`
scratch buffer, and the call returns the byte length (compare it to your `cap` to detect truncation;
`-1` means not-found).

| capability  | import (signature → result) | marshaling |
| ----------- | --------------------------- | ---------- |
| `canvas`    | `requestRedraw()`, `canvasWidth() → i32`, `canvasHeight() → i32`, `canvasDpi() → i32` | scalars |
| `params`    | `paramNumber(kPtr,kLen) → f64`, `paramBool(kPtr,kLen) → i32`, `paramString(kPtr,kLen,outPtr,outCap) → i32` | key is a UTF-8 `(ptr,len)`; `paramString` writes the value into the scratch buffer |
| `color`     | `colorActive(outPtr)`, `colorSetActive(inPtr)` | 4 bytes RGBA at the pointer |
| `assets`    | `assetRead(pPtr,pLen,outPtr,outCap) → i32` | path is a UTF-8 `(ptr,len)`; bytes written into the scratch buffer |
| `selection` | `selectionSize() → i32`, `selectionRead(outPtr)` | size then a copy of the mask bytes |
| `layers`    | `layerCount() → i32` | scalar |

The module owns its memory layout: it picks where keys, scratch buffers, and the bitmap-`ptr` region
live. The bitmap crosses at `ptr = 0` in this runtime (a module reserving low memory would want a
host-provided offset or an `alloc` export — see Scope).

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

The full `Host` surface and both entry runtimes (`js` on QuickJS-in-WASM, raw `wasm`) are covered,
including the raw-wasm `env` ABI above (`canvas` / `params` / `color` / `assets` / `selection` /
`layers`, with the string/buffer marshaling convention). The one simplification left is memory
layout: the bitmap crosses at a fixed `ptr = 0`, so a module reserving low memory for its own data
would want a host-provided offset or an `alloc` export to negotiate the region — a natural next step.
