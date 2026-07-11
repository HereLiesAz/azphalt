# The `.azp` package format

*Normative. The on-disk container an extension ships as: assets, code, manifest, signature. Format version `0.1` — pre-stable, may break.*

## Container
- A `.azp` file MUST be a ZIP archive (Deflate or Store) — same shape as `.vsix` / `.crx` / `.brushset`. No container-level encryption.
- Entries MUST use forward-slash paths, UTF-8 names, no absolute paths, no `..` traversal. A host MUST reject a package with unsafe paths.
- For reproducible signing, entries SHOULD be written in sorted path order with fixed timestamps.

## Required tree
manifest.json     REQUIRED — the manifest (see extension-manifest.md)
signature.json    REQUIRED once signed — detached signature (§ Signing)
/assets/          asset payload: brush tips, grain maps, .cube LUTs, patterns, stamps
/code/            code payload: entry module(s) — .js and/or .wasm
/ui/              optional — UI schema files, if not inlined in the manifest
LICENSE           REQUIRED — SPDX-identified license text (author's choice)
README.md         optional

Every package MUST contain `manifest.json` and `LICENSE`. `assets/` and/or `code/` are present per `kind`.

## Package kind
Declared in the manifest as `kind`: `asset` | `code` | `mixed`.
- `asset` — data only (brushes, LUTs, patterns). No executable code; a host MAY load it with no runtime. This is what importers produce.
- `code` — one or more extensions on the sandbox (JS on QuickJS-in-WASM, or raw WASM).
- `mixed` — both (e.g. a filter shipping its own LUTs).
