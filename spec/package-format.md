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
- Assets are normalized, host-neutral data: brush tips and grain as PNG (8-bit gray or RGBA), LUTs as `.cube`, patterns/stamps as PNG, shaders and transitions as GLSL source. Per-asset parameters (and a shader's or transition's declared inputs) live in the manifest, never in a host-proprietary blob.
- Importers MUST emit this normalized form — an imported `.abr` becomes `assets/*.png` plus manifest params, not a repackaged `.abr`.

## Code
- Entry module(s) declared in the manifest (`entry`, `runtime`). `runtime: js` → an ES module on QuickJS-in-WASM; `runtime: wasm` → a WASM module against the host ABI.
- Code has NO ambient authority (see capability-model.md). It reaches the editor only through host functions, for capabilities it declared and was granted.

## Signing
- **Integrity:** `manifest.json` MUST carry a SHA-256 digest of every payload file under `files` (path → digest). A host MUST verify each file against its digest before use.
- **Authenticity:** `signature.json` is a detached **Ed25519** signature over the canonical bytes of `manifest.json`, plus the signer's public key / key id. Signing the manifest transitively signs the payload through the digests. *Implemented* in `@azphalt/azp` (`signAzp` / `generateSigningKey`); `verifyAzp` validates it when present.
- **Open — trust model.** Who counts as a trusted signer (author self-signed, registry counter-signed, web-of-trust) and how keys are distributed is undecided. Until it is, treat a signature as tamper-evidence, not identity.

## Versioning
- `azphalt` (format version) gates compatibility. The package's own `version` is semver.
