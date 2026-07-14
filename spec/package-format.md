# The `.azp` package format

*Normative. The on-disk container an extension ships as: assets, code, manifest, signature. Format version `0.1` — pre-stable, may break.*

## Container
- A `.azp` file MUST be a ZIP archive (Deflate or Store) — same shape as `.vsix` / `.crx` / `.brushset`. No container-level encryption.
- Entries MUST use forward-slash paths, UTF-8 names, no absolute paths, no `..` traversal. A host MUST reject a package with unsafe paths.
- For reproducible signing, entries SHOULD be written in sorted path order with fixed timestamps.

## Required tree
~~~
manifest.json     REQUIRED — the manifest (see extension-manifest.md)
signature.json    REQUIRED once signed — detached signature (§ Signing)
/assets/          asset payload: brush tips, grain maps, .cube LUTs, patterns, stamps
/code/            code payload: entry module(s) — .js and/or .wasm
/ui/              optional — UI schema files, if not inlined in the manifest
LICENSE           REQUIRED — SPDX-identified license text (author's choice)
README.md         optional
~~~
Every package MUST contain `manifest.json` and `LICENSE`. `assets/` and/or `code/` are present per `kind`.

## Package kind
Declared in the manifest as `kind`: `asset` | `code` | `mixed`.
- `asset` — data only (brushes, LUTs, patterns). No executable code; a host MAY load it with no runtime. This is what importers produce.
- `code` — one or more extensions on the sandbox (JS on QuickJS-in-WASM, or raw WASM).
- `mixed` — both (e.g. a filter shipping its own LUTs).

## Assets
- Assets are **normalized, host-neutral data** — never a host-proprietary blob. Per-asset parameters (and a shader's or transition's declared inputs) live in the manifest.
- Importers MUST emit this normalized form — an imported `.abr` becomes `assets/*.png` plus manifest params, not a repackaged `.abr`.

### Wire formats
Each asset `type` (defined in `extension-manifest.md § assets`) pins the byte format its `path` (or `remoteUrl`) delivers, so any conforming host consumes identical bytes identically. Where a row lists several formats, a host MUST support the **bold** one (the interoperability floor) and MAY support the others; an importer SHOULD emit the bold one unless an asset requires otherwise.

| `type` | Wire format |
|---|---|
| `brush`, `pattern`, `stamp` | **PNG** (8-bit gray or RGBA) |
| `lut` | **`.cube`** (Adobe Cube LUT) |
| `shader` | GLSL or ISF **source** (UTF-8 text); `params.format` = `glsl` \| `isf` |
| `transition` | GLSL **source** (UTF-8 text); `params.format` = `gl-transition` |
| `image` | **PNG**, JPEG, or WebP |
| `vector` | **SVG** — the *static* SVG 1.1 / SVG Tiny 1.2 profile (see below) |
| `font` | **SFNT** (`.otf` / `.ttf`), or WOFF2 |
| `mesh`, `material` | **glTF 2.0** — `.glb` (binary) or `.gltf` with its referenced resources bundled under `/assets`; a `material` travels as a glTF material |
| `hdri` | **Radiance `.hdr`**, or OpenEXR `.exr` |
| `audio` | **WAV / PCM** (the uncompressed floor), or Ogg/Opus, FLAC, MP3 |
| `video` | **MP4** (H.264 + AAC), or WebM (VP9 + Opus) |
| `motion` | **JSON** keyframe/animation preset — host-neutral, keys per `extension-manifest.md` `params` conventions |
| `palette` | **JSON** — see [§ Palette format](#palette-format) |
| `overlay` | **PNG** (or APNG / animated WebP) |
| `template` | **JSON** layout referencing bundled `image`/`vector` assets, with fillable slots under `params` |
| `tflite`, `litert`, `onnx`, `sherpa-bundle` | the model's **native** file(s) (`.tflite` / `.onnx` / …); large or multi-part models use the remote-asset / multi-file patterns in `extension-manifest.md § assets` |

**Static SVG profile (`vector`).** A `vector` asset is a self-contained SVG document: **no** `<script>`, **no** active/interactive elements (`<foreignObject>`, `<iframe>`, `<embed>`, `<object>` — `<foreignObject>` in particular can embed arbitrary HTML/XHTML that slips past a naive `<script>` filter), **no** event-handler attributes (`onload`, `on*`), **no** external or remote references (`<image href="http…">`, external `<use>`, CSS `@import`, web-font URLs) — any raster it embeds MUST be a `data:` URI. A host MUST render it as inert graphics and MUST NOT execute script or fetch anything it references.

**Self-containment (the moat).** No asset's bytes may make a host fetch from the network or read outside the package. The **only** sanctioned remote path is the manifest's explicit `remoteUrl` large-file pattern, which is checksum-gated (`extension-manifest.md § assets`). A host MUST ignore — never fetch — any external reference embedded inside asset bytes.

### Palette format
A `palette` asset (`type: "palette"`) is a UTF-8 **JSON** file under `/assets`. It is an **ordered** list of named sRGB colors — order is significant (swatch order in a picker). Shape:

~~~json
{
  "colors": [
    { "name": "Signal White", "color": "#F2F2F0" },
    { "name": "Wildfire Red", "color": "#C41E1E", "brand": "MTN 94", "sku": "RV-3020", "finish": "matte" }
  ]
}
~~~

- `colors` — REQUIRED, an ordered array. Each entry:
  - `name` — REQUIRED, human-readable swatch name.
  - `color` — REQUIRED, sRGB as `#RRGGBB` (strictly 7 characters, e.g. `#F2F2F0`; shorthand `#RGB` is **not** permitted; lowercase or uppercase hex; no alpha — a palette entry is an opaque swatch).
  - `brand`, `sku`, `finish` — OPTIONAL **colorant metadata** mapping the swatch to a physical product (e.g. a spray-paint can). `finish` is an open vocabulary; blessed values: `matte` · `satin` · `gloss` · `metallic` · `fluorescent`. A host ignores keys it doesn't understand.

This lets the ecosystem distribute brand-accurate color sets (Montana, MTN, …) as portable `.azp` packages a host can match against real colorants.

## Code
- Entry module(s) declared in the manifest (`entry`, `runtime`). `runtime: js` → an ES module on QuickJS-in-WASM; `runtime: wasm` → a WASM module against the host ABI.
- Code has NO ambient authority (see capability-model.md). It reaches the editor only through host functions, for capabilities it declared and was granted.

## Signing
- **Integrity:** `manifest.json` MUST carry a digest of every payload file under `files` (path → digest). The digest is **`sha256-<hex>`** — the literal prefix `sha256-` followed by the **lowercase-hex** SHA-256 of the file's exact bytes (e.g. `sha256-2c26b46b68ffc6…`). Only SHA-256 is defined for `0.1`. A host MUST recompute each file's digest and reject any mismatch before use. (This is *not* SRI base64 or multihash — it is the fixed `sha256-`+lowercase-hex form `@azphalt/azp`'s `digest()` emits.)
- **Authenticity:** `signature.json` is a detached **Ed25519** signature over the **exact `manifest.json` byte sequence stored in the archive**, plus the signer's public key / key id. The bytes are signed and verified **verbatim — there is no re-canonicalization** (no JCS/RFC 8785, no whitespace normalization, no key reordering): a verifier MUST read `manifest.json` from the container as-is and check the signature against those bytes. Signing the manifest transitively signs the payload through the `files` digests. The public key is base64 SPKI, `alg` is `ed25519`. A worked **test vector** — private key, public key, manifest bytes, and expected signature — lives at `packages/azp/test/vectors/signature-vector.json` for cross-implementation checks. *Implemented* in `@azphalt/azp` (`signAzp` / `generateSigningKey`); `verifyAzp` validates it when present.
- **Trust model.** A signature alone is *tamper-evidence*, not identity — `verifyAzp` only confirms it is internally consistent. **Identity is decided by an explicit trusted-key set.** A host holds a trust store of Ed25519 public keys; a package is *trusted* when either its signer key is directly in the store, or its signer key was **counter-signed** by a registry key in the store. A counter-signature is an Ed25519 signature over the **vouched-for key's** SPKI public-key bytes (the author at the base of the chain, or the previous counter-signer), stored in `signature.json` under `countersignature` (`publicKey`, `signature`, optional `keyId`, optional nested `countersignature`); it does not disturb the author's manifest signature, so integrity still verifies. This lets a host trust one registry instead of every author. Counter-signatures **nest** into a chain — a registry key can itself be counter-signed by a higher authority (`countersignature.countersignature`, each hop signing the key below it) — and a package is trusted when any key along the chain is in the store and every hop down to it verifies. Key distribution (how a host learns which keys/registries to trust) is out-of-band by design. *Implemented* in `@azphalt/azp` (`verifyTrust(azp, store)`, `countersign`).

### Signing status
Signing is **implemented**: `@azphalt/azp` produces `signature.json` (`signAzp` / `generateSigningKey`), `verifyAzp` validates it when present, and `verifyTrust(azp, store)` decides trust. Signing is still **optional** — the SDK, importers, and CLI emit unsigned packages by default. A host consuming `.azp` files MUST:
1. Verify file-level integrity via the `manifest.files` digests (enforced by `verifyAzp()`), and reject any failure.
2. For a signed package, verify the signature (`verifyAzp` folds this into `ok`), and — where provenance matters — check the signer against a trust store via `verifyTrust`.
3. Treat an unsigned or untrusted-but-valid package as having integrity but no established provenance, and warn accordingly (e.g., "not from a trusted signer; install only from sources you trust").

## Versioning
- `azphalt` (format version) gates compatibility. The package's own `version` is semver.
