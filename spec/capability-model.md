# Capability model

*Normative, and the load-bearing security doc. It defines the entire surface an extension can reach — and everything it cannot. This is the boundary that lets azphalt be open without exposing any host's engine.*

## Principle
An extension operates only on the **editor surface** — layers, bitmaps, the canvas, the selection, color. It has **no ambient authority**: the WASM sandbox exposes no syscalls, no filesystem, no network, no device access. The one way out of the sandbox is a host function, and host functions implement exactly the capabilities below — nothing else. **Deny by default.**

## Granted capabilities
Declared in the manifest, granted by the host, enforced at the host-function boundary.
- `canvas`: Active canvas size / DPI; composite read; request a redraw.
- `layers`: Enumerate / create / reorder *editable* layers; read/write pixels; get/set opacity + blend mode.
- `bitmap`: Allocate and read/write image buffers via the shared-memory ABI.
- `selection`: Read and modify the current selection mask.
- `color`: Read / set the active color and palette.
- `params`: Read values from the extension's declared UI controls.
- `assets`: Read files bundled in the extension's own package.

## The never-list — not capabilities, no API
An extension MUST NOT reach, and a host MUST NOT expose:
- Any host engine — relocalization, SLAM / pose, tracking, teleological recovery, or their maps and models.
- The camera feed or device sensors (accelerometer, gyroscope, GPS).
- The filesystem outside its own package, other packages' data, or other apps.
- The network.
These have no host function. They are *absent*, not merely gated.
