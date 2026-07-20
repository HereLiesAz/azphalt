# The extension manifest (`manifest.json`)

*Normative. UTF-8 JSON at the root of every `.azp`. Declares identity, what the package contributes, and — for code — exactly which capabilities it needs.*

## Top-level fields
| Field | Req | Notes |
|---|---|---|
| `azphalt` | ✔ | Format version, e.g. `"0.1"`. Marks the file as an azphalt manifest. |
| `id` | ✔ | Reverse-DNS, globally unique — e.g. `com.hereliesaz.halftone`. |
| `name` | ✔ | Human-readable. |
| `version` | ✔ | Semver. |
| `kind` | ✔ | `asset` \| `code` \| `mixed` \| `app` \| `mcp` \| `pack`. |
| `license` | ✔ | SPDX id. MIT permits closed/sold extensions; author's choice. For an `asset`-kind package it governs the asset **content** (CC ids blessed) — see § assets → Content rights. |
| `compat` | ✔ | Min host API version, e.g. `">=0.1"`. |
| `description`, `author`, `homepage` | — | Metadata. |
| `targetApps` | — | Reverse-DNS host-app ids this package is scoped to (e.g. `["com.hereliesaz.graffitixr"]`). Empty/absent = **global** (every app). A repository shows an app-scoped package only to a matching app — see repository-api.md § App scoping. Discovery filter, not access control. |
| `preview` | — | Static store-card preview `{ image?, clip? }` — each an in-package path or `https:` URL. `image` is a still (LUT swatch, brush stroke, shader still); `clip` an optional short motion preview for time-based packages. Surfaced in search so a host renders a browse grid without downloading/executing — see repository-api.md § Static previews. |
| `assets` | asset/mixed | Contributed assets (below). |
| `entry`, `runtime` | code/mixed | Code entry module and `js` \| `wasm`. |
| `capabilities` | code/mixed | Declared capabilities (see capability-model.md). |
| `contributes` | code/mixed | Extension points the code registers (below). |
| `app` | app | Companion-app block — how to install/invoke an external Android app or PWA + its handoffs. See § `app` and companion-app.md. |
| `files` | ✔ | Map of payload path → SHA-256 digest (integrity; see package-format.md). |

## `compat`
`compat` declares the host azphalt-API version the package needs, as a **single semver comparator** the host evaluates against its own API version. The `0.1` grammar is a deliberately small, interoperable subset so every host validates it identically:

- one comparator — `>=` `>` `<=` `<` `=` — **optional, defaulting to `>=`** ("minimum host version");
- followed by `MAJOR[.MINOR[.PATCH]]`; omitted parts are `0`, so `0.1` ≡ `0.1.0`.

**Not** in `0.1`: ranges, unions (`||`), hyphen ranges, `^`/`~`, or prerelease tags. A host at API version `H` satisfies `compat` iff `H` (by semver precedence) satisfies the comparator; `>=0.1` is the conventional value. Reference implementation: `@azphalt/azp`'s `compatSatisfies(hostVersion, compat)` and `parseCompat(compat)`.

## `assets`
Each entry requires a `type`, which determines the format of the asset. The supported primitives are:
- **Traditional**: `brush` | `lut` | `pattern` | `stamp` | `shader` | `transition` | `mesh` | `material` | `hdri` | `motion` | `palette` | `image` | `video` | `font` | `audio` | `vector` | `template` | `overlay`
- **AI Models**: `tflite` | `litert` | `onnx` | `sherpa-bundle`

The SDK `AssetType` union (`packages/sdk/src/index.ts`) is the single source of truth for this list; the registry's media-domain map is kept total over it. The **wire format** each `type` delivers (SVG for `vector`, glTF for `mesh`, the `palette` JSON schema, …) is pinned in `package-format.md § Assets`.

Each entry also requires a `path` (relative path into `/assets` inside the `.azp` archive) OR a `remoteUrl` (see below).

**Remote Assets (The VSCode Header Pattern):**
For extremely large files like AI models (e.g. multi-gigabyte `.task` files), bundling the file inside the `.azp` archive is hostile to mobile environments. If an asset is too large to bundle, set `path` to an **empty string** (`"path": ""`) — the key stays present, since it is required — and provide a `remoteUrl` and `checksum` instead. A host treats an empty `path` as "not bundled" and fetches from `remoteUrl`. The `.azp` acts as a lightweight header, and host applications are responsible for using their own resumable background download managers to fetch the file to local storage. You should also provide a `byteSize` to help hosts allocate space.

*Integrity (normative).* The `checksum` string is pinned to the **same `sha256-<hex>` lowercase form** as `manifest.files` digests (`package-format.md § Signing`) — not SRI base64 or multihash. Because a remote asset's bytes aren't present at install, it is **not** covered by the `files` map or `verifyAzp`; it is verified **lazily, at fetch time**. A host **MUST** verify a downloaded `remoteUrl` asset against its `checksum` before use and **reject on mismatch** — the remote analog of the `files` digest gate. `byteSize` is advisory (progress / headroom only); `checksum` is authoritative. Since the manifest is signed verbatim, a trusted signature makes `checksum` itself trustworthy.

**Metadata Fields:**
- `role`: Optional semantic role (e.g., `type: "tflite", role: "depth"`). Crucial for routing generic model graphs to the correct host engine.
- `params`: Normalized, host-neutral settings. A brush's params might be `spacing`, `angle`, `roundness`. See **Per-type `params` conventions** below.
- `ui`: Optional UI panel path to a control panel schema (see ui-schema.md).
- `tags`: Optional tags (e.g., `["sfx", "impact"]`) for marketplace filtering.
- `physical`: Optional real-world scale / print metadata for a **visual** asset — see **Physical metadata** below.
- `contentRights`: Optional usage terms for the asset **content** (attribution, commercial use) — see **Content rights** below.
- `standalone`: In a `mixed` package, whether the asset is usable without the package's code — see **Mixed-package asset independence** below.

### Reusable video / graphic catalog

Beyond paint-shaped assets, the standard covers the reusable **video-catalog** assets an editor shares: `transition`, `motion` (keyframe/animation preset), `video`, `audio`, and `font`, plus two graphic-overlay types:

- **`template`** — a **title / lower-third** template: pre-designed text-over-video or text-over-image graphics with named text slots the host fills in. An `image` + `video`-domain asset (titles / graphic layouts apply to stills too, lower-thirds to footage). Author its fillable slots and layout under `params` (e.g. `fields`, `safeArea`).
- **`overlay`** — a **PNG or animated overlay** composited onto the frame (watermarks, badges, animated stickers). An `image`+`video`-domain asset. Author its default placement under `params` (e.g. `opacity`, `anchor`, `scale`).

These are **data** assets — they render in the host's own compositor, exactly like `lut`/`shader`, and carry no code. An asset-only host (`kind: "asset"`, or the asset half of a `kind: "mixed"` package) can install and use them without any runtime.

### Physical metadata
A visual asset (`image` | `vector` | `stamp` | `pattern`) is pure pixels/paths with no inherent size, so a **spatial (AR)** or **print** host has to guess scale. An optional **`physical`** block lets an author pin the real-world size, so the same asset places or tiles at its intended dimensions on every host:

~~~
{ "type": "vector", "path": "assets/stencil.svg",
  "physical": { "width": 1200, "height": 800, "unit": "mm", "dpi": 300, "tileWidth": 210, "tileHeight": 297 } }
~~~

- `width` / `height` — intended real-world size, in `unit`.
- `unit` — `mm` | `cm` | `in`. **REQUIRED whenever any dimension (`width` / `height` / `tileWidth` / `tileHeight`) is present** — a bare number is unscalable without it. Applies to all dimensions.
- `dpi` — dots per inch, for print / raster reproduction.
- `tileWidth` / `tileHeight` — the tile size for an asset meant to tile across sheets (e.g. an A4-tiled stencil); omit both for single-sheet. A host that can't honor physical scale ignores the block.

### Content rights
For an **`asset`-kind** package (and the asset half of a `mixed` one), the SPDX **`license`** governs the **asset content**, not just code — and the Creative Commons SPDX identifiers (`CC-BY-4.0`, `CC-BY-SA-4.0`, `CC-BY-NC-4.0`, `CC0-1.0`, …) are **blessed first-class** for creative assets. Beyond that, an optional **`contentRights`** block carries machine-checkable usage terms a host surfaces on the marketplace card and a registry can filter on:

~~~
{ "type": "image", "path": "assets/mural.png",
  "contentRights": { "attribution": "Mural © Artist, CC-BY-4.0", "attributionRequired": true, "commercialUse": false } }
~~~

- `attribution` — the exact credit string a host displays when the asset is used.
- `attributionRequired` — whether the license requires the credit be shown.
- `commercialUse` — a summary flag for filtering / badging ("commercial-OK"); the SPDX `license` remains authoritative. (This is the general-content analog of a model's `modelLicense`.)

### Mixed-package asset independence
Assets in a `mixed` package are **standalone data by default** — an asset-only host processing only `manifest.assets` gets usable assets. **But** an asset MAY be generated or completed by the package's code at runtime (a LUT the extension computes, a shader whose uniforms the code feeds); grabbing such an asset without the code yields a broken or empty result. An author marks a code-dependent asset with **`standalone: false`** (default `true`):

~~~
{ "type": "lut", "path": "assets/base.cube" }                       // standalone (default) — usable alone
{ "type": "shader", "path": "assets/fx.glsl", "standalone": false } // needs the code — an asset-only host skips it
~~~

An asset-only host MUST select assets where `standalone !== false` and skip the rest, instead of guessing or refusing every `mixed` package. `standalone` is ignored for `asset`-kind packages (always standalone).

### Per-type `params` conventions

`params` is host-neutral and free-form — a host ignores keys it doesn't understand — but the keys below are **normative conventions**, so a value means the same thing across every host. Each row names the key, its type/range, and its **provider**: `author` (fixed metadata describing the asset — a host MUST NOT edit it), `user` (safe to bind to a `ui` control; the host applies the default when absent), or `host` (supplied by the host at apply time, never authored).

| type | key | type / range (default) | provider |
| --- | --- | --- | --- |
| `lut` | `strength` | number `0..1` (`1`) — dry/wet blend | user |
| `lut` | `inputTransfer` | `srgb` (default) \| `linear` \| `log-c` | author |
| `lut` | `format` | `cube` | author |
| `shader` | `format` | `isf` \| `glsl` | author |
| `shader` | *(declared uniforms)* | per the shader's uniform types | user |
| `transition` | `from` / `to` / `progress` | source frames + normalized `0..1` progress | host |
| `transition` | `format` | e.g. `gl-transition` | author |
| `brush` | `spacing` / `angle` / `roundness` | numbers (engine-defined ranges) | user |
| `overlay` | `opacity` / `anchor` / `scale` | `0..1` (`1`) / `top-left`…`center`…`bottom-right` / number | user |
| `template` | `fields` / `safeArea` | named text slots / inset rect | user / author |
| `motion` | `format` | `az-motion` (default) | author |
| `motion` | `stagger` | number `0..1` (`0`) — text-stagger overlap | user |
| `motion` | `staggerMode` | `character` (default) \| `word` \| `line` | user |

The LUT application semantics behind `strength` / `inputTransfer` (interpolation floor, input-transfer conversion, clamp, alpha) are pinned in [package-format.md § LUT application](./package-format.md#lut-application).

**Canonical `lut` panel.** The conventional control for `strength` is a single `slider` bound to the `strength` key, so every host renders the same dry/wet control:

~~~json
{ "controls": [ { "type": "slider", "key": "strength", "label": "Strength", "min": 0, "max": 1, "step": 0.01, "default": 1 } ] }
~~~

`@azphalt/importer-cube` emits `params.strength` (default `1`) **and** this panel by default, so every imported LUT ships a working blend control.

### Model roles (`role`)
For a **model asset**, `role` routes a generic model graph to the correct host engine. It is an **open** vocabulary — any string is valid — but the following **canonical roles** are blessed, so a model tagged e.g. `role: "depth"` lands in the same engine on every host. Prefer a blessed role where one fits; invent a new string only when none does:

`image-labeling` · `object-detection` · `face-detection` · `subject-segmentation` · `matting` · `image-embedding` · `depth` · `super-resolution` · `speech-to-text` · `audio-event` (a.k.a. `highlight-detection`)

### Model IO descriptor (`io`)
An **optional**, self-describing preprocessing/IO block on a model asset (`onnx` | `tflite` | `litert` | `sherpa-bundle`). With it, a host can preprocess → run the model in its own on-device runtime → interpret the outputs for a whole class of models **with no per-model code**. Every field is optional: a host uses what it understands and ignores the rest. Paired with `role`, `checksum`, and `byteSize`, a host can decide whether it can run a model *before* downloading `byteSize` bytes.

- `inputs[]` — per input tensor:
  - `name` — the tensor name in the model graph.
  - `shape` — dimensions, using `-1` (or `null`) for a dynamic/batch dimension, e.g. `[-1, 3, 256, 256]`.
  - `dtype` — `float32` | `float16` | `int8` | `uint8` | `int32` | `int64` | `bool`.
  - `layout` — `NCHW` | `NHWC` (image tensors).
  - `color` — `RGB` | `BGR` (image tensors).
  - `normalization` — per-channel, as **either** `mean`/`std` (`(x/255 − mean) / std`) **or** `scale`/`bias` (`x·scale + bias`); each is a scalar or a per-channel array.
  - `audio` — for audio models: `sampleRate` (Hz), `window` and `hop` (samples), `channels` (`mono` | `stereo`, or an explicit channel count).
- `outputs[]` — per output tensor:
  - `name` — the tensor name.
  - `semantics` — how to read it: `logits` | `boxes` | `scores` | `mask` | `embedding`.
  - `shape`, `dtype` — as above.
  - `decode` — any decode parameters the semantics needs (e.g. a detector's anchors/variances, or `{ "decoded": true }` for already-decoded boxes).
- `labels` — optional labels: a path to a file bundled in the package (or a `remoteUrl`), or an inline array of label strings.
- `quantization` — the delivered weights' quantization (`type`, plus optional `scale`/`zeroPoint` as a scalar or per-channel array), so a host picks a compatible runtime path.

Example — a `tflite` depth model delivered remotely, fully self-describing:
~~~
{
  "type": "tflite",
  "role": "depth",
  "path": "",
  "remoteUrl": "https://cdn.example.com/models/midas-small.tflite",
  "checksum": "sha256-…",
  "byteSize": 16777216,
  "io": {
    "inputs": [
      {
        "name": "image",
        "shape": [1, 3, 256, 256],
        "dtype": "float32",
        "layout": "NCHW",
        "color": "RGB",
        "normalization": { "mean": [0.485, 0.456, 0.406], "std": [0.229, 0.224, 0.225] }
      }
    ],
    "outputs": [
      { "name": "depth", "semantics": "mask", "shape": [1, 1, 256, 256], "dtype": "float32" }
    ],
    "quantization": { "type": "none" }
  }
}
~~~

### Multi-file model bundles (`files`)
Real on-device models are rarely a single file — a sherpa-onnx bundle is `encoder.onnx` + `decoder.onnx` + `joiner.onnx` + `tokens.txt` + config; a Vosk model is a whole tree; an ONNX pipeline ships weights + a separate `labels.txt`. Instead of one `path`/`remoteUrl`, a model asset MAY declare a **`files`** array of member files — the additive multi-part form (the scalar `path`/`remoteUrl` stays valid for single-file assets):

~~~
{
  "type": "sherpa-bundle",
  "role": "speech-to-text",
  "path": "",
  "files": [
    { "name": "encoder.onnx", "remoteUrl": "https://cdn.example.com/enc.onnx", "checksum": "sha256-…", "byteSize": 120000000, "supportsRange": true },
    { "name": "decoder.onnx", "remoteUrl": "https://cdn.example.com/dec.onnx", "checksum": "sha256-…" },
    { "name": "tokens.txt",   "path": "assets/tokens.txt" }
  ]
}
~~~

- Each member is **either** bundled (`path` under `/assets`) **or** remote (`remoteUrl`) — mix freely (small config in the `.azp`, big weights remote).
- Each member carries its own **`checksum`** (`sha256-<hex>`), so a host verifies **per file** and re-fetches only a corrupt one — same integrity gate as a single remote asset (above).
- `supportsRange: true` tells a host the member's `remoteUrl` honors HTTP `Range`, so its resumable download will work (otherwise a host falls back to a clean restart).
- A host **materializes all members into one directory** and routes that directory by the asset's `role`. This replaces the ad-hoc "a `sherpa-bundle` is secretly a zip" convention every host would otherwise reinvent (and guard against zip-slip) differently.

### Model requirements (`requirements`)
A model asset MAY carry an optional **`requirements`** block — the numbers a host needs to decide whether it can run the model **before** downloading `byteSize` bytes (distinct from `io`, which it needs to *run* the model afterward). All fields optional; a host uses what it understands:

~~~
{
  "type": "onnx",
  "role": "subject-segmentation",
  "requirements": {
    "runtime": "onnxruntime",   // "onnxruntime" | "tflite" | "litert" | "sherpa-onnx"
    "formatVersion": ">=17",    // ONNX opset / TFLite schema floor
    "quantization": "int8",     // "float32" | "float16" | "int8" | "dynamic"
    "accelerator": "cpu",       // "cpu" (runs anywhere) | "gpu" | "nnapi" | "coreml" | "qnn"
    "minRamMB": 512
  }
}
~~~

A host uses it two ways: **filter/skip at plan time** (don't offer an install it can't honor) and let the **registry filter** on it, so a device only sees models it can run. Purely for *gating* — it never changes how a model runs.

### Model license (`modelLicense`)
A model `.azp` almost always bundles **third-party weights** whose license — not the package's SPDX `license` — is what governs the user (many Hugging Face models are CC-BY-NC / gated / RAIL; some Vosk models are research-only). An optional per-asset **`modelLicense`** carries the weights' own terms, which a host **MUST surface before install** and a registry can filter on:

~~~
{
  "type": "onnx",
  "role": "image-labeling",
  "modelLicense": {
    "spdx": "CC-BY-NC-4.0",                              // or "LicenseRef-…" for a non-SPDX license
    "commercialUse": false,                               // machine-checkable summary for filter/badge
    "attributionRequired": true,
    "attribution": "MobileNet-V3 © Google, CC-BY-NC-4.0", // the exact credit string a host displays
    "url": "https://…/LICENSE",
    "sourceUrl": "https://huggingface.co/…"               // provenance of the weights
  }
}
~~~

This keeps azphalt neutral — it's metadata the host displays and the registry filters (`commercialUse`), never enforcement — but it closes a real trap: silently installing a non-commercial model into a monetizable editing pipeline. It is a **different axis** from a paid model's *entitlement* (repository-api.md § Buy-once entitlements): a model can be free-to-download yet non-commercial to *use*.

## `contributes`
What the code adds to the host, each with an `id`:
- `filters` — a pixel operation runnable on a layer/selection.
- `tools` — an interactive tool.
- `commands` — a menu/command entry.
- `transitions` — a two-input blend over a normalized `progress` (0→1), for temporal hosts. It receives frame **A** (`from`), frame **B** (`to`), and `progress`, and writes the blended result to the target — see capability-model.md § Transition ABI. Branded by `defineTransition`; the runtime rejects a filter dispatched as a transition and vice versa.

Each names the `entry` export the host invokes and MAY reference a `ui` panel (see ui-schema.md).

## `capabilities`
The least-privilege list the code needs (`canvas`, `layers`, `bitmap`, `selection`, `color`, `params`, `assets`, `time`, `audio`, …). The host grants only what's declared, prompts for anything non-baseline, and denies the rest. A capability not listed is unreachable — there is no ambient API.

Two are for **temporal / audio hosts** (video, motion editors), both editor-surface, neither on the never-list:
- `time` — read-only access to the host's playback clock: `currentMs`, `durationMs`, `fps`, `frameIndex`. Lets a filter or transition animate.
- `audio` — read and write the current PCM audio block (float32, interleaved; see capability-model.md § Audio-buffer ABI).

## `app`
For a `kind: "app"` **companion app** (an Android app or PWA a host launches to perform a function and hand a result back), the manifest carries an `app` block instead of `assets`/`entry`/`capabilities`. It is a *header* describing how to install and invoke an external OS-level app — it grants **no** capabilities and ships **no** `/code` sandbox payload:

- `platforms` — how to install/invoke per platform: `android` (`packageId`, `minSdk?`, `install?`) and/or `pwa` (`manifestUrl?`, `startUrl?`, `shareTargetUrl?`). At least one is required.
- `handoffs[]` — the functions the companion offers, each with an `id`, an `action` (the host hook), a declared `input` / `output` (azphalt **assets** and/or structured **params**), and a per-platform `transport` (Android `Intent` + result, or PWA share-target + `postMessage` return).

The moat holds because azphalt grants the companion nothing — the OS governs its permissions, the host never runs its code and **validates** the returned assets/params before use, and the user consents before each handoff. The full contract (transports, return semantics, security, discovery) is normative in **companion-app.md**.

## Example
~~~
{
  "azphalt": "0.1",
  "id": "com.hereliesaz.halftone",
  "name": "Halftone",
  "version": "1.2.0",
  "kind": "code",
  "license": "MIT",
  "author": "Az",
  "description": "CMYK halftone filter.",
  "compat": ">=0.1",
  "entry": "code/main.js",
  "runtime": "js",
  "capabilities": ["canvas", "bitmap", "params"],
  "contributes": {
    "filters": [
      { "id": "halftone", "name": "Halftone", "entry": "applyHalftone", "ui": "ui/panel.json" }
    ]
  },
  "files": {
    "code/main.js": "sha256-…",
    "ui/panel.json": "sha256-…"
  }
}
~~~

## Resolved

- **Inter-package dependencies are out of scope for `0.1`.** A package is **self-contained**: it declares no dependency on another package, and a host resolves nothing transitively. Everything a package needs is either in its own payload or reachable through a granted capability. A dependency mechanism (and the resolution, versioning, and trust questions it brings) is deferred to a later version. *(An author who needs shared logic vendors it into the package.)*

## Open
- Localization of `name` / `description` / UI labels (the registry surface is tracked in the repository-API discussion; the manifest/UI surface is still open).
