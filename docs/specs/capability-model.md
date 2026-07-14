# Capability model

*Normative, and the load-bearing security doc. It defines the entire surface an extension can reach — and everything it cannot. This is the boundary that lets azphalt be open without exposing any host's engine.*

## Principle
An extension operates only on the **editor surface** — layers, bitmaps, the canvas, the selection, color. It has **no ambient authority**: the WASM sandbox exposes no syscalls, no filesystem, no network, no device access. The one way out of the sandbox is a host function, and host functions implement exactly the capabilities below — nothing else. **Deny by default.**

## Granted capabilities
Declared in the manifest, granted by the host, enforced at the host-function boundary.

| Capability | Grants |
|---|---|
| `canvas` | Active canvas size / DPI; composite read; request a redraw. |
| `layers` | Enumerate / create / reorder *editable* layers; read/write pixels; get/set opacity + blend mode. |
| `bitmap` | Allocate and read/write image buffers via the shared-memory ABI (below). |
| `selection` | Read and modify the current selection mask. |
| `color` | Read / set the active color and palette. |
| `params` | Read values from the extension's declared UI controls (see ui-schema.md). |
| `assets` | Read files bundled in the extension's own package. |
| `time` | Read the host's playback clock — `currentMs`, `durationMs`, `fps`, `frameIndex`. Temporal hosts only (video / motion). Read-only. |
| `audio` | Read and write the current PCM audio block (see the audio-buffer ABI below). |
| `storage` | *(deferred to a future version — not in `0.1`)* small scoped key/value for the extension's own settings. |

Baseline, no prompt: `params`, `assets`, read-only `canvas`, and read-only `time`. Anything that writes pixels, audio, or reads user content SHOULD require a grant.

**Consent.** The model is **deny-by-default**: a host grants a capability only if the manifest declares it, and for anything beyond the baseline set above the host SHOULD obtain the user's consent before granting it (and MAY remember the choice per extension). A denied capability is simply absent — its host function is never built, so the extension cannot call it. The **exact consent UX is host-defined** — a prompt, an install-time permission list, a settings toggle — the standard fixes only the *deny-by-default* rule and the least-privilege declaration, not the presentation.

**`storage` is deferred.** A persistent key/value store is a new stateful surface with its own retention, quota, and privacy questions, so it is **not part of `0.1`** — `0.1` keeps the sandbox surface small and locked. It remains a candidate for a later version; until then an extension has no persistence beyond its own package and the host's `params`.

`time` and `audio` extend the surface toward **temporal** and **audio** hosts (video editors, motion tools) without touching the never-list — they are still editor-surface, not the host's engine.

## The never-list — not capabilities, no API
An extension MUST NOT reach, and a host MUST NOT expose:
- Any host engine — relocalization, SLAM / pose, tracking, teleological recovery, or their maps and models.
- The camera feed or device sensors (accelerometer, gyroscope, GPS).
- The filesystem outside its own package, other packages' data, or other apps.
- The network.

These have no host function. They are *absent*, not merely gated.

## Image-buffer ABI
Bitmaps cross the boundary as shared linear memory (the WASM instance's memory):
- Layout: RGBA, **straight (non-premultiplied) alpha**, row-major, tightly packed. Bit depth is **8 by default, 16 opt-in** (see below); the element count is always `width * height * 4`, so the *byte* stride is `width * 4 * bytesPerChannel` (4 at 8-bit, 8 at 16-bit).
- The host passes `ptr, width, height, stride`; the extension reads/writes in place — no copy on the hot path.
- **Raw `wasm` entry (`runtime: "wasm"`).** The module exports `memory` and the entry `filter(ptr, width, height, stride)`; the host writes the target layer into `memory` at `ptr`, calls the entry, and reads it back. Capability host functions are `env` imports, present only for the granted capabilities (importing an ungranted one fails instantiation). Non-bitmap data crosses through the module's own memory: an **input** the module supplies is a `(ptr, len)` pair it wrote there; an **output** the host returns is written into a module-supplied `(outPtr, outCap)` scratch buffer and the call returns the byte length (`-1` = not found). The wired imports: `canvas` (`requestRedraw`, `canvasWidth/Height/Dpi`), `params` (`paramNumber/paramBool(kPtr,kLen)`, `paramString(kPtr,kLen,outPtr,outCap)`), `color` (`colorActive(outPtr)`, `colorSetActive(inPtr)` — 4 RGBA bytes), `assets` (`assetRead(pPtr,pLen,outPtr,outCap)`), `selection` (`selectionSize`, `selectionRead(outPtr)`), `layers` (`layerCount`). **Scratch offset:** if the module exports `alloc(size) -> ptr`, the host calls it to obtain the bitmap buffer (so a compiler-emitted module that manages its own heap/stack is never clobbered); absent `alloc`, the bitmap crosses at the fixed `ptr = 0`. *Implemented* in `@azphalt/runtime-wasm`.
- **Resolved:** straight (non-premultiplied) alpha is the ABI. The SDK types, the reference runtime, and all existing importers and tests emit and consume straight alpha. A host that internally premultiplies MUST convert at the boundary — the extension side is always straight. This is pinned for `0.1` and will not change without a format version bump.
- **Resolved:** depth is **opt-in, defaulting to 8**. A bitmap carries an optional `depth` field (`8` | `16`); absent means 8. At 8-bit `data` is a `Uint8ClampedArray` (channels `0–255`), at 16-bit a `Uint16Array` (channels `0–65535`, little-endian in the raw byte buffer). The channel count is always 4, so only the element type and byte stride change. Every existing producer/consumer stays valid unchanged (no `depth` ⇒ 8-bit). *Implemented* across the SDK `Bitmap` type, `@azphalt/runtime-reference`, and `@azphalt/runtime-wasm` (both the QuickJS and raw-`wasm` paths).

## Audio-buffer ABI
Granted by `audio`. The current PCM block crosses the boundary as an `AudioBuffer`:
- Layout: **32-bit float, interleaved**, nominal range `[-1, 1]` (values outside are permitted but the host MAY clip on write-back). `samples` is a `Float32Array` whose length is exactly `frames * channels`; frame `f`, channel `c` lives at `samples[f * channels + c]`. `channels` is the interleave stride, `sampleRate` is in Hz.
- `audio.read()` returns a **copy** the extension owns; `audio.write(buffer)` replaces the host block. The host validates `samples.length % channels === 0` on write and rejects otherwise — no partial frames.
- **Raw `wasm` entry.** Audio crosses through the module's own memory as float32 element indices (not byte offsets). The `audio` import wires: `audioFrames()` / `audioChannels()` / `audioSampleRate()` (the current block's geometry), `audioRead(outFloatIdx, outCapFloats)` — writes up to `outCapFloats` interleaved samples into `memory` starting at float index `outFloatIdx`, returns the number of samples written (`-1` if the scratch is too small), and `audioWrite(inFloatIdx, frames, channels, sampleRate)` — reads `frames * channels` samples from `memory` at float index `inFloatIdx` and installs them as the new block. *Implemented* across the SDK `AudioApi`/`AudioBuffer` types, `@azphalt/runtime-reference`, and `@azphalt/runtime-wasm` (QuickJS and raw-`wasm` env imports).

## Transition ABI
A `transitions` contribution (see extension-manifest.md) blends **two** input frames into one output over a normalized `progress`:
- The dispatch supplies `from` and `to` (each a `Bitmap`, same image-buffer ABI above) plus `progress` in `[0, 1]` — `0` is fully `from`, `1` is fully `to`. The transition composes its result and writes it to `target` via `bitmap.write`, exactly like a filter writes the active layer.
- `TransitionContext` is the granted `Host` plus `{ from, to, progress, target }`. A transition is branded by `defineTransition` and MUST NOT be dispatched as a filter (or vice versa) — the runtime checks the brand and rejects a mismatch.
- Dispatched via `runTransition(manifest, module, world, { from, to, progress }, transitionId?)`. *Implemented* for the `js` runtime in `@azphalt/runtime-reference` and `@azphalt/runtime-wasm` (QuickJS).
- **Raw `wasm` entry (`runtime: "wasm"`).** The module exports `memory` and the entry `transition(fromPtr, toPtr, outPtr, width, height, stride)`; the host writes the two input frames into `memory` at `fromPtr`/`toPtr`, the module composes the blended frame into `outPtr`, and the host reads it back into the target layer. `progress` (0→1) crosses as the nullary `env.txProgress()` import (an `f64`) — the transition's only extra input, not a capability. The two inputs and the target layer MUST share width, height, and depth. The three buffers come from the module's `alloc(size)` export when present (else the fixed offsets `from | to | out`). Capability `env` imports are the same as for a filter, `bitmap` required. *Implemented* in `@azphalt/runtime-wasm`.

## Enforcement
Capabilities are strings in the manifest. The host builds the host-function table from the granted set only, so an ungranted capability has no importable function — an extension cannot call what it wasn't given, and there is no reflection path to widen the grant at runtime.
