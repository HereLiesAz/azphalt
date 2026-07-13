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
| `storage` | *(candidate)* small scoped key/value for the extension's own settings. |

Baseline, no prompt: `params`, `assets`, and read-only `canvas`. Anything that writes pixels or reads user content SHOULD require a grant. **Open:** the consent UX, and whether `storage` ships in `0.1`.

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
- **Raw `wasm` entry (`runtime: "wasm"`).** The module exports `memory` and the entry `filter(ptr, width, height, stride)`; the host writes the target layer into `memory` at `ptr`, calls the entry, and reads it back. Capability host functions are `env` imports. *Implemented* in `@azphalt/runtime-wasm` (first cut: shared-memory bitmap + `canvas.requestRedraw`).
- **Resolved:** straight (non-premultiplied) alpha is the ABI. The SDK types, the reference runtime, and all existing importers and tests emit and consume straight alpha. A host that internally premultiplies MUST convert at the boundary — the extension side is always straight. This is pinned for `0.1` and will not change without a format version bump.
- **Resolved:** depth is **opt-in, defaulting to 8**. A bitmap carries an optional `depth` field (`8` | `16`); absent means 8. At 8-bit `data` is a `Uint8ClampedArray` (channels `0–255`), at 16-bit a `Uint16Array` (channels `0–65535`, little-endian in the raw byte buffer). The channel count is always 4, so only the element type and byte stride change. Every existing producer/consumer stays valid unchanged (no `depth` ⇒ 8-bit). *Implemented* across the SDK `Bitmap` type, `@azphalt/runtime-reference`, and `@azphalt/runtime-wasm` (both the QuickJS and raw-`wasm` paths).

## Enforcement
Capabilities are strings in the manifest. The host builds the host-function table from the granted set only, so an ungranted capability has no importable function — an extension cannot call what it wasn't given, and there is no reflection path to widen the grant at runtime.
