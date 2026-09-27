# @azphalt/runtime-wasm

Run an azphalt **code** extension inside a **QuickJS-in-WASM** sandbox (the Javy/Shopify pattern,
via [`quickjs-emscripten`](https://github.com/justjake/quickjs-emscripten)). This is the isolation
substrate `spec/capability-model.md` calls for.

Where [`@azphalt/runtime-reference`](../runtime-reference) proves the *contract* by running a
trusted module in-process, this proves it under **real sandboxing**:

- **No ambient authority** — the guest JS has no `process`, `require`, `fetch`, filesystem, or
  network, and can only `import` the in-package modules and `@azphalt/azdk`. The only way out is a
  host function.
- **Capability-gated host functions** — the runtime injects host functions only for the granted
  capabilities, and builds the `ctx` from them, so an ungranted capability is **absent**, not an
  erroring stub.
- **Binary image ABI** — the bitmap crosses as a single RGBA `ArrayBuffer` (one copy in, one copy
  out); the guest mutates a typed-array view in place, not per-pixel JSON. 8-bit by default
  (`Uint8ClampedArray`); pass `depth: 16` for a `Uint16Array` (channels 0–65535), doubling the byte stride.

## Run a real `.azp`

`runFilter` / `runTool` / `runCommand` / `runTransition` load a real `code`-kind package: verify the
`.azp`, load the `entry` module as an **ES module** (resolving its `import "@azphalt/azdk"` to an
in-sandbox shim), resolve the export named by `contributes.{filters,tools,commands,transitions}[].entry`,
check its brand, and run it against a capability-gated `ctx` — the same contract `runtime-reference`
runs, but sandboxed.

~~~ts
import { runFilter, loadExtension } from "@azphalt/runtime-wasm";

// azp is a code-kind .azp whose manifest declares entry, runtime, capabilities, and a contribution.
const result = await runFilter(
  azp,
  { params: { strength: 1 }, bitmap: { data: [/* RGBA8 */], width: 64, height: 64 } },
  // capabilities default to the manifest's declared set; pass to narrow the grant.
);
result.bitmap;    // the target layer's final pixels
result.layers;    // every layer, result.selection, result.color, result.audio, result.redraws

loadExtension(azp).manifest; // verify + parse without running
~~~

`runTransition(azp, world, opts?)` runs a `contributes.transitions[]` entry. Its world adds the two input frames and the blend position — `{ …world, from, to, progress }` — which
the transition reads as `ctx.from` / `ctx.to` / `ctx.progress` before writing the blend to
`ctx.target` via `ctx.bitmap.write`.

The **full `Host` surface** is bridged, each gated by its capability: `canvas`, `layers`,
`bitmap`, `selection`, `color`, `params`, `assets`, `time`, `audio`. Pass a multi-layer document via
`world.layers` (with `activeLayerId` / `targetLayerId`), a `selection` mask, and a `color`
active/palette; a single `world.bitmap` is the one-layer shorthand. For a temporal host, pass
`world.time` (`{ currentMs, durationMs, fps }`, read through `ctx.time`; `frameIndex` is
`round(currentMs / 1000 * fps)`) and `world.audio` (`{ samples, sampleRate, channels }`, float32
interleaved, read and replaced through `ctx.audio`; the final block comes back as `result.audio`). Bitmaps and the selection mask cross as the binary
`ArrayBuffer` ABI; layer refs and colors cross as JSON.

## Raw `runtime: "wasm"` entries

A `runtime: "wasm"` extension runs on the host's own `WebAssembly` (it *is* the sandbox), against the
shared-memory image ABI from `spec/capability-model.md`. The module **exports** `memory` and the
entry `filter(ptr, width, height, stride)`; the runtime writes the target layer's RGBA8 bytes into
the module's memory at `ptr`, calls the entry, and reads them back. `runFilter` dispatches here
automatically when `manifest.runtime === "wasm"`; the `bitmap` capability is required.

`runTransition` dispatches a raw wasm transition the same way. Its entry is
`entry(fromPtr, toPtr, outPtr, width, height, stride)`: the host writes the two input frames at
`fromPtr` / `toPtr`, the module writes the blend at `outPtr` (each from `alloc` when exported,
otherwise `0`, one frame length, and two frame lengths), and `progress` (0→1) is read through the
nullary `env.txProgress()` import (an f64, not a capability). The two frames and the target layer must
share width, height, and depth. Tools and commands run only on the `js` runtime.

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
| `time`      | `timeCurrentMs()`, `timeDurationMs()`, `timeFps()`, `timeFrameIndex()` | scalars |
| `audio`     | `audioFrames()`, `audioChannels()`, `audioSampleRate()`, `audioRead(outIdx,outCap) → i32`, `audioWrite(inIdx,frames,channels,sampleRate)` | samples cross as float32; `outIdx` / `inIdx` / `outCap` count float32 elements (byte offset = index × 4); `audioRead` returns the float count, or `-1` if `outCap` is too small |

The module owns its memory layout: it picks where keys and scratch buffers live. For the bitmap
region, if the module exports `alloc(size) → ptr` the runtime asks it for a buffer; without `alloc`
the bitmap crosses at `ptr = 0` (the minimal-module convention), which would clobber a module that
keeps its own data in low memory.

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
`layers` / `time` / `audio`, with the string/buffer marshaling convention). Memory for the bitmap
region is negotiated through an optional `alloc` export, falling back to fixed offsets from `0`.
