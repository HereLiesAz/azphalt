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
- Assets are normalized, host-neutral data: brush tips and grain as PNG (8-bit gray or RGBA), LUTs as `.cube`, patterns/stamps as PNG. Per-asset parameters live in the manifest, never in a host-proprietary blob.
- Importers MUST emit this normalized form — an imported `.abr` becomes `assets/*.png` plus manifest params, not a repackaged `.abr`.

## Code
- Entry module(s) declared in the manifest (`entry`, `runtime`). `runtime: js` → an ES module on QuickJS-in-WASM; `runtime: wasm` → a WASM module against the host ABI.
- Code has NO ambient authority (see capability-model.md). It reaches the editor only through host functions, for capabilities it declared and was granted.

## Signing
- **Integrity:** `manifest.json` MUST carry a SHA-256 digest of every payload file under `files` (path → digest). A host MUST verify each file against its digest before use.
- **Authenticity:** `signature.json` is a detached **Ed25519** signature over the canonical bytes of `manifest.json`, plus the signer's public key / key id. Signing the manifest transitively signs the payload through the digests.
- **Trust model.** A signature alone is *tamper-evidence*, not identity: `verifyAzp` only confirms it is internally consistent. **Identity is an explicit trusted-key set.** A host holds a trust store of Ed25519 public keys; a package is *trusted* when its signer key is directly in the store, or was **counter-signed** by a registry key in the store. A counter-signature (an Ed25519 signature over the author's SPKI public-key bytes, stored in `signature.json` under `countersignature`) lets a host trust one registry instead of every author, and does not disturb the author's manifest signature. Key distribution is out-of-band. *Implemented* in `@azphalt/azp` (`verifyTrust`, `countersign`).

### Signing status
Signing is **implemented**: `@azphalt/azp` produces `signature.json` (`signAzp` / `generateSigningKey`), `verifyAzp` validates it when present, and `verifyTrust(azp, store)` decides trust. Signing is still **optional** — the SDK, importers, and CLI emit unsigned packages by default. A host consuming `.azp` files MUST:
1. Verify file-level integrity via the `manifest.files` digests (enforced by `verifyAzp()`), and reject any failure.
2. For a signed package, verify the signature (`verifyAzp` folds this into `ok`), and — where provenance matters — check the signer against a trust store via `verifyTrust`.
3. Treat an unsigned or untrusted-but-valid package as having integrity but no established provenance, and warn accordingly (e.g., "not from a trusted signer; install only from sources you trust").

## Versioning
- `azphalt` (format version) gates compatibility. The package's own `version` is semver.
