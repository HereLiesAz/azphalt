# azphalt importers

Importers normalize the creative formats people already own — Photoshop brushes, LUTs, shaders, 3D models, ML weights — **into** portable `.azp` asset packages. They are the seeding mechanism for the ecosystem: every `.abr` or `.cube` a user imports becomes a package that runs in any conforming host, so the catalog fills as a byproduct of people bringing what they have.

Each importer is its own small `@azphalt/importer-*` package with the **same shape**: a CLI and a library that both do one thing — parse a native format, validate it, capture its parameters, store the normalized bytes, and wrap them in a manifest.

## The family

| Package | Normalizes | → `AssetType` |
|---|---|---|
| [`importer-abr`](abr) | Photoshop `.abr` sampled brushes | `brush` |
| [`importer-cube`](cube) | `.cube` LUTs (Adobe/IRIDAS, 1D/3D) | `lut` |
| [`importer-isf`](isf) | ISF / GLSL shaders | `shader` |
| [`importer-transition`](transition) | [gl-transitions](https://gl-transitions.com) | `transition` |
| [`importer-image`](image) | Raster images (PNG/JPEG/…) | `image` |
| [`importer-vector`](vector) | Vector art (SVG) | `vector` |
| [`importer-video`](video) | Video clips | `video` |
| [`importer-audio`](audio) | Audio | `audio` |
| [`importer-font`](font) | Fonts | `font` |
| [`importer-palette`](palette) | Color palettes | `palette` |
| [`importer-gltf`](gltf) | glTF / glb 3D models | `mesh` |
| [`importer-material`](material) | Materials | `material` |
| [`importer-hdri`](hdri) | HDRI environment maps | `hdri` |
| [`importer-motion`](motion) | Motion / animation | `motion` |
| [`importer-tflite`](importer-tflite) | TensorFlow Lite models | `tflite` |
| [`importer-litert`](importer-litert) | LiteRT models | `litert` |
| [`importer-onnx`](importer-onnx) | ONNX models | `onnx` |
| [`importer-sherpa`](importer-sherpa) | sherpa-onnx bundles | `sherpa-bundle` |

## The house shape

Every importer exposes both surfaces. **CLI**, for one-off packaging:

~~~sh
pnpm --filter @azphalt/importer-cube build
azphalt-import-cube grade.cube --id com.you.grade -o grade.azp
# real packaging supplies the asset's own license text:
azphalt-import-cube grade.cube --id com.you.grade --license-file LICENSE.txt
~~~

Common flags across importers: `--id` (required, reverse-DNS), `--name`, `--version`, `--author`, `--license` / `--license-file`, and `-o` for the output path.

**Library**, to package programmatically:

~~~ts
import { importCube } from "@azphalt/importer-cube";

const { azp, manifest } = importCube(cubeText, licenseText, { id: "com.you.grade" });
~~~

Each importer:

1. **Validates** the input (magic bytes / format checks) and rejects malformed files.
2. **Captures** the metadata and derives host-neutral parameters (e.g. a brush's spacing/angle, a shader's declared inputs).
3. **Stores** normalized bytes under `assets/` — an imported `.abr` becomes `assets/*.png` plus manifest params, *not* a repackaged `.abr` (see [`spec/package-format.md`](../../spec/package-format.md)).
4. **Builds** the manifest and calls [`@azphalt/azp`](../azp)'s `writeAzp`, so every payload path carries a SHA-256 digest.

Tests round-trip the output back through `verifyAzp` to prove the container is valid.

## Adding an importer

Model a new one on [`cube`](cube) (the cleanest 1:1 case) or [`abr`](abr) (the reference for a lossy native format that must be *normalized*, not repacked). Mirror the CLI flag set and the `license` / `licenseText` options, validate the input up front, and add the target to the `AssetType` union in [`@azphalt/sdk`](../sdk) if it's a new kind. An [asset host](../../docs/ADOPTION_ASSET_HOST.md) applies each `type` with its own engine, so the value is only real once at least one host consumes it.
