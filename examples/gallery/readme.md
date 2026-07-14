# @azphalt/example-gallery

A gallery of **48 example `.azp` packages** — several for every asset type and every extension kind — so an author can copy a working starting point and a host has a fixture set to test against. Each example is verified as a real `.azp`, and the code ones are actually run in the sandbox.

## How it works

Every example is one `Example` object (see [`src/shared.ts`](src/shared.ts)): a manifest (minus the computed `files`), its payload bytes, and — for code extensions — a small runnable check. They're grouped by type under [`src/examples/`](src/examples) and flattened in [`src/index.ts`](src/index.ts).

~~~sh
pnpm --filter @azphalt/example-gallery build   # → writes every example to out/<slug>.azp
pnpm --filter @azphalt/example-gallery test    # verifies each .azp; runs the code examples
~~~

- **Assets** carry `type` + `path` + normalized `params`. Bundled assets store real (or, for raster, a placeholder 1×1 PNG) bytes; **heavy** types (ML models, video, audio, HDRI, fonts) use the **remote-header** pattern from `spec/extension-manifest.md`: `path: ""` plus `remoteUrl` + `checksum` + `byteSize`, so the `.azp` is a lightweight header.
- **Code extensions** (`filter` / `tool` / `command`) ship a `js` module resolved against `@azphalt/sdk`; a couple run as raw `runtime: "wasm"` over the shared-memory image ABI. Each is executed by `@azphalt/runtime-wasm` in the test with an assertion over the result.

## Catalog

### Extensions & plug-ins

**filter (js)**
- `filter-invert` — inverts RGB and requests a redraw.
- `filter-brightness` — a parameterized filter with a slider UI (reads `params`).

**tool (js)**
- `tool-fill` — fills the target with the active color and redraws.
- `tool-measure` — reads the canvas size and stamps it into the first pixel.

**command (js)**
- `command-clear` — zeroes every channel of the target layer.
- `command-set-color` — sets the host's active color.

**filter (raw wasm)**
- `wasm-invert` — inverts every channel over the shared-memory image ABI.
- `wasm-darken` — halves every channel (right-shift) — a second raw-ABI example.

### Assets

**lut** — `lut-teal-orange` (3D `.cube`), `lut-s-curve` (1D `.cube`)
**shader** — `shader-ripple` (ISF, with INPUTS + panel), `shader-plasma` (plain GLSL)
**transition** — `transition-crossfade`, `transition-radial-wipe` (gl-transitions GLSL)
**vector** — `vector-check`, `vector-badge` (SVG)
**palette** — `palette-sunset` (8-color), `palette-grayscale` (16-step) — GIMP `.gpl`
**mesh** — `mesh-triangle`, `mesh-quad` (glTF 2.0 with inline buffers)
**material** — `material-matte-red`, `material-gold` (PBR JSON)
**motion** — `motion-bounce`, `motion-spinner` (Lottie JSON)
**brush** — `brush-round`, `brush-sumi` (PNG tip + normalized params)
**pattern** — `pattern-dots`, `pattern-herringbone`
**stamp** — `stamp-star`, `stamp-leaf`
**image** — `image-logo`, `image-noise`
**hdri** — `hdri-studio`, `hdri-sunset-field` *(remote header)*
**video** — `video-intro`, `video-loop` *(remote header)*
**audio** — `audio-click`, `audio-ambient` *(remote header)*
**font** — `font-display`, `font-mono` *(remote header)*
**tflite** — `tflite-pose`, `tflite-segment` *(remote header)*
**litert** — `litert-depth`, `litert-upscale` *(remote header)*
**onnx** — `onnx-detect`, `onnx-embed` *(remote header)*
**sherpa-bundle** — `sherpa-asr-en`, `sherpa-tts-en` *(remote header)*

## Notes

The raster placeholder pixel and the illustrative remote checksums are exactly that — placeholders; what each example teaches is the **manifest shape** for its type and how the payload is laid out. Real packaging (via the [`@azphalt/importer-*`](../../packages/importers) family) supplies genuine bytes and digests.
