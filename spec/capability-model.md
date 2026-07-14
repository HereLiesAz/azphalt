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
- Layout: RGBA, 8 bits/channel, **straight (non-premultiplied) alpha**, row-major, tightly packed (`stride = width * 4`).
- The host passes `ptr, width, height, stride`; the extension reads/writes in place — no copy on the hot path.
- **Raw `wasm` entry (`runtime: "wasm"`).** The module exports `memory` and the entry `filter(ptr, width, height, stride)`; the host writes the target layer into `memory` at `ptr`, calls the entry, and reads it back. Capability host functions are `env` imports, present only for the granted capabilities (importing an ungranted one fails instantiation). Non-bitmap data crosses through the module's own memory: an **input** the module supplies is a `(ptr, len)` pair it wrote there; an **output** the host returns is written into a module-supplied `(outPtr, outCap)` scratch buffer and the call returns the byte length (`-1` = not found). The wired imports: `canvas` (`requestRedraw`, `canvasWidth/Height/Dpi`), `params` (`paramNumber/paramBool(kPtr,kLen)`, `paramString(kPtr,kLen,outPtr,outCap)`), `color` (`colorActive(outPtr)`, `colorSetActive(inPtr)` — 4 RGBA bytes), `assets` (`assetRead(pPtr,pLen,outPtr,outCap)`), `selection` (`selectionSize`, `selectionRead(outPtr)`), `layers` (`layerCount`). *Implemented* in `@azphalt/runtime-wasm`; the bitmap crosses at a fixed `ptr = 0` (a negotiated offset / `alloc` export is the remaining refinement).
- **Resolved:** straight (non-premultiplied) alpha is the ABI. The SDK types, the reference runtime, and all existing importers and tests emit and consume straight alpha. A host that internally premultiplies MUST convert at the boundary — the extension side is always straight. This is pinned for `0.1` and will not change without a format version bump.
- **Open:** 16-bit depth is a later question. Pin before the ABI stabilizes past `0.1`.

## Enforcement
Capabilities are strings in the manifest. The host builds the host-function table from the granted set only, so an ungranted capability has no importable function — an extension cannot call what it wasn't given, and there is no reflection path to widen the grant at runtime.
