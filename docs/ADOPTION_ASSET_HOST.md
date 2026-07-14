# Adopting azphalt as an asset host

*How an app becomes a conforming azphalt host for **asset** packages only — no code execution.
[`ADOPTION.md`](ADOPTION.md) covers the full host that runs `code` extensions in a sandbox and
renders their UI; this is the lighter profile for an app that just wants to **consume portable
assets** (LUTs, shaders, transitions, brushes). [Guillotine](https://github.com/HereLiesAz/Guillotine),
the local-first video editor, is the exemplar: it adopts azphalt purely to consume `.cube` LUTs,
ISF/GLSL shaders, and gl-transitions as portable `.azp` packages.*

## Why this profile exists

An `asset`-kind `.azp` is **pure data** — normalized asset bytes, a manifest, integrity digests,
and an optional host-rendered UI panel. It carries no executable code, so consuming it needs
**none** of the runtime machinery a `code` host requires:

| A full (code) host needs… | An asset host needs… |
|---|---|
| A WASM sandbox (QuickJS-in-WASM) | — |
| A capability grant model + host-function table | — |
| The image-buffer ABI / shared memory | — |
| To enforce the never-list against running code | — |
| Verify + read + **apply the asset with its own engine** | ✔ (only this) |

That is exactly why a video editor — whose engine is nothing like a paint host's — can adopt the
standard: it never touches azphalt's editor surface, only its packages.

## What an asset host does

1. **Open and verify.** Treat the `.azp` as a ZIP; run `verifyAzp` (`@azphalt/azp`). It confirms
   safe paths, every payload digest, payload completeness, and — if a `signature.json` is present —
   the Ed25519 signature. **Refuse anything that fails.** (A signature alone is tamper-evidence, not
   identity; check the signer against a trust store with `verifyTrust` where provenance matters —
   see `spec/package-format.md § Signing`.)
2. **Read the manifest.** Reject packages where `kind` is `code`. For `kind: "mixed"`, ignore the
   root-level code fields (`entry`, `runtime`) and process only `manifest.assets` — this profile
   runs no code. A pure `asset` package has only assets.
3. **Apply each asset with your own engine**, dispatched by `type`. **`spec/extension-manifest.md`
   § `assets` is the single source of truth for the `type` vocabulary** (and the SDK `AssetType`
   union is its machine-readable form) — apply the ones your engine understands and *skip the rest*
   (see **Unknown types** below). The full `0.1` set:
   - **Traditional:** `brush` · `lut` · `pattern` · `stamp` · `shader` · `transition` · `mesh` ·
     `material` · `hdri` · `motion` · `palette` · `image` · `video` · `font` · `audio` · `vector` ·
     `template` · `overlay`.
   - **AI models:** `tflite` · `litert` · `onnx` · `sherpa-bundle`.

   The ones with importers + a pinned wire format today:
   - `lut` — a `.cube` color transform → your color pipeline (Guillotine: the `apply_lut` path).
   - `shader` — GLSL/ISF source (`params.format` = `isf`\|`glsl`) → compile and run as a per-clip
     effect; the declared inputs are in `params` and (for user controls) the `ui` panel.
   - `transition` — a gl-transition GLSL (`params.format` = `gl-transition`) → your transition
     engine; `from`/`to`/`progress`/`ratio` are host-provided, the rest are user controls.
   - `brush` / `pattern` / `stamp` — PNG data → your brush/pattern engine (paint hosts).

   **Asset metadata your dispatch should read** (all defined in `spec/extension-manifest.md`
   § `assets`):
   - **`role`** — an optional semantic label on a model asset (e.g. `role: "depth"`,
     `"speech-to-text"`) that routes a generic model graph to the correct host engine slot. Route by
     `role`, not by guessing from the file.
   - **`byteSize`** — an advisory size (bytes), so a host can budget storage/allocate *before*
     fetching a large asset.
   - **The remote-asset pattern** — for a file too large to bundle (multi-hundred-MB models), the
     author sets `path: ""` (the key stays present) and provides **`remoteUrl`** + **`checksum`**
     (SHA-256) + `byteSize`. Treat an empty `path` as "not bundled": fetch from `remoteUrl` with your
     own (resumable) download manager, then **verify the downloaded bytes against `checksum` before
     use and reject on mismatch** — the remote analog of the `files` digest gate.

   **Unknown types.** The `type` vocabulary is **open** and grows across spec versions, so an asset
   host WILL meet a `type` it doesn't recognize. **Parse-and-skip it** — ignore the unrecognized
   asset and apply the ones you do support; do **not** reject the whole package. A package pairing a
   `lut` you understand with, say, a future `holo-widget` you don't should still install its LUT.
   (`@azphalt/conformance`'s `unknown-type-skip` check certifies exactly this.)
4. **Render the UI panel, if present.** When an asset has a `ui` path (e.g. `ui/grade.json`), parse
   it as a `Panel` (`spec/ui-schema.md`) and draw the controls with **your own toolkit** — the same
   declarative slider/toggle/select/color schema a Compose or SwiftUI host renders. Feed the values
   back into the asset's parameters. Do not render extension HTML; there is none.

## Conformance checklist (asset host)

Check your host against **`@azphalt/conformance`** —
`runAssetConformance(host)` drives your host's `load` through these lines and returns a pass/fail
report — rather than against prose.

- [ ] Opens the `.azp`, runs `verifyAzp`, and refuses any package that fails integrity (or, when
      signed, signature) verification.
- [ ] Reads `manifest.assets` and applies each supported `type` with its own engine.
- [ ] **Parses-and-skips an unrecognized asset `type`** — applies the types it supports and ignores
      the rest, rather than rejecting the whole package (`unknown-type-skip`).
- [ ] For a remote asset (`path: ""` + `remoteUrl` + `checksum`), fetches the bytes and **verifies
      them against `checksum` before use**, rejecting on mismatch.
- [ ] Runs **no** code from a package (and rejects `kind: "code"` packages entirely).
- [ ] Renders an asset's `ui` panel natively from the UI schema and round-trips its parameters.
- [ ] Validates the package's `compat` field against its own supported specification version.

Meet these and any conforming asset `.azp` — a LUT built once, a shader, a transition — runs in your
app, and the same package works in every other adopting app. That is the portability promise, for
data-only hosts.

## Importers seed the catalog

The asset packages an asset host consumes are produced by the importers in this repo:
`@azphalt/importer-cube` (LUTs), `@azphalt/importer-isf` (shaders), and
`@azphalt/importer-transition` (gl-transitions) — so the worldwide libraries of these formats become
portable `.azp` packages a video host (or a paint host) can load unchanged.
