# Adopting the standard

*How an app becomes a conforming azphalt host. A conforming host can load any `.azp`, run its extensions safely, and render their UI natively — so an extension written once runs in your app unchanged. GraffitiXR is the first; this is what any other app implements.*

## What a host is responsible for
A host embeds a runtime and takes on six jobs. The first five are non-negotiable for conformance; the sixth is the ABI you must match exactly.
1. **Load and verify.** Open the `.azp` (ZIP), read `manifest.json`, reject unsafe paths (absolute, `..`). Verify every payload file against its `files` digest, and — once signing lands — the `signature.json` over the manifest. Refuse anything that fails.
2. **Grant capabilities.** Read `capabilities`. Grant the baseline silently (`params`, `assets`, read-only `canvas`), prompt for the rest, deny the unlisted. A capability not granted must be *absent*, not merely erroring.
3. **Enforce the never-list.** Never expose a host engine — relocalization, SLAM/pose, tracking — nor the camera, sensors, filesystem outside the package, or network. These have no host function in any grant. This is the line that lets the standard be open without leaking your moat.
4. **Run code on a WASM substrate.** `runtime: js` → the entry ES module on QuickJS-in-WASM; `runtime: wasm` → the module against the host ABI. No ambient authority reaches the sandbox except the host-function table you built from the grant set.
5. **Render the UI schema natively.** Parse the `ui` panel and draw the controls with your own toolkit — Compose, SwiftUI, whatever you are. Push control values back through `params`. Do **not** render extension HTML in a webview; native rendering is what conformance means here.
6. **Honor the image-buffer ABI.** Bitmaps cross as shared linear memory: RGBA, 8-bit, straight (non-premultiplied) alpha, row-major, `stride = width * 4`. Pass `ptr, width, height, stride`; let the extension mutate in place.
