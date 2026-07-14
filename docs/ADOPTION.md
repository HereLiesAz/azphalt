# Adopting the standard

*How an app becomes a conforming azphalt host. A conforming host can load any `.azp`, run its extensions safely, and render their UI natively — so an extension written once runs in your app unchanged. [GraffitiXR](https://github.com/HereLiesAz/GraffitiXR) (paint / AR) and [Guillotine](https://github.com/HereLiesAz/Guillotine) (video / audio) are the first hosts; this is what any other app implements.*

> **Only consuming assets?** If your app just wants portable **assets** — LUTs, shaders, transitions, brushes — and runs no extension code (e.g. a video editor like Guillotine), you need a much lighter profile: verify, read, and apply. See [`ADOPTION_ASSET_HOST.md`](ADOPTION_ASSET_HOST.md).

## What a host is responsible for

A host embeds a runtime and takes on six jobs. The first five are non-negotiable for conformance; the sixth is the ABI you must match exactly.

1. **Load and verify.** Open the `.azp` (ZIP), read `manifest.json`, reject unsafe paths (absolute, `..`). Verify every payload file against its `files` digest, and the `signature.json` over the manifest when present (`verifyAzp`). Where provenance matters, check the signer against a trust store (`verifyTrust`; see `spec/package-format.md` § Signing). Refuse anything that fails.
2. **Grant capabilities.** Read `capabilities`. Grant the baseline silently (`params`, `assets`, read-only `canvas`), prompt for the rest, deny the unlisted. A capability not granted must be *absent*, not merely erroring.
3. **Enforce the never-list.** Never expose a host engine — relocalization, SLAM/pose, tracking — nor the camera, sensors, filesystem outside the package, or network. These have no host function in any grant. This is the line that lets the standard be open without leaking your moat.
4. **Run code on a WASM substrate.** `runtime: js` → the entry ES module on QuickJS-in-WASM; `runtime: wasm` → the module against the host ABI. No ambient authority reaches the sandbox except the host-function table you built from the grant set.
5. **Render the UI schema natively.** Parse the `ui` panel and draw the controls with your own toolkit — Compose, SwiftUI, whatever you are. Push control values back through `params`. Do **not** render extension HTML in a webview; native rendering is what conformance means here.
6. **Honor the image-buffer ABI.** Bitmaps cross as shared linear memory: RGBA, straight (non-premultiplied) alpha, row-major, 4 channels per pixel. Depth is **8-bit by default, 16-bit opt-in** (`spec/capability-model.md` § Image-buffer ABI), so the byte stride is `width * 4 * bytesPerChannel`. Pass `ptr, width, height, stride`; let the extension mutate in place.

## The shape of it

Your host implements the `Host` interface from `@azphalt/sdk` — `canvas`, `layers`, `bitmap`, `selection`, `color`, `params`, `assets` — but instantiates only the sub-APIs a given extension was granted. Everything the extension calls routes through those functions and nothing else. `packages/runtime-reference` is a working host that loads and runs an extension against the contract; read it as the executable spec, and check your host against the **`@azphalt/conformance`** suite — `runConformance(host)` returns a pass/fail report over the checklist below — rather than against prose.

## Conformance checklist

- [ ] Rejects unsafe paths and any file failing its digest.
- [ ] Grants exactly the declared capabilities; unlisted ones are unreachable.
- [ ] Exposes no engine, camera, sensor, filesystem, or network path to extensions.
- [ ] Runs `js` and `wasm` entries on a WASM substrate.
- [ ] Renders every `0.1` control type natively and round-trips `params`.
- [ ] Matches the RGBA straight-alpha buffer ABI (8-bit default; 16-bit opt-in).
- [ ] Reports its host API version so `compat` can gate.

Meet these and any conforming `.azp` runs in your app. That is the whole promise.
