---
"@azphalt/azp": minor
"@azphalt/azdk": minor
---

Harden the `.azp` core against hostile packages, and share the guards so every consumer (importers, registry, worker, runtime, MCP tools) inherits them:

- **Path safety.** A new `unsafePathReason` / `isUnsafePath` rejects zip-slip in all its shapes — absolute paths, backslash separators, drive letters, NUL bytes, and `.`/`..`/empty segments — not just the `/`-separated `..` form. `verifyAzp` now applies it to every payload entry **and** every `manifest.files` key, and validates `entry` / `assets[].path` / asset `files[]` member paths (an `asset` package previously got no path checks at all).
- **Decompression bombs.** A new `safeUnzip` caps entry count and uncompressed size (per-entry and total), matching the Kotlin verifier. `readAzp`, `verifyAzp`, `signAzp`, and `verifyTrust` all route through it, so a small archive can no longer inflate to gigabytes before any check runs.
- **Manifest integrity.** `parseJsonNoDuplicateKeys` rejects a `manifest.json` with duplicate keys (the signature is over the raw bytes, so duplicates were a cross-implementation forgery vector). Required fields (`azphalt`/`id`/`name`/`version`/`license`/`compat`) and known `kind` are now enforced, and an unknown kind is rejected rather than waved through unvalidated.
- **No-throw verification.** The payload map is null-prototype (a `__proto__` entry name can no longer mutate a prototype), `manifest.files` lookups use `Object.hasOwn`, and each kind validator runs inside a `try` so malformed input becomes an error string, never an uncaught exception.
- **URL schemes.** `mcp` (`remote.url`, `wasi.remoteUrl` + checksum) and `app` (`android.install`, `pwa.startUrl`/`manifestUrl`/`shareTargetUrl`) now require `https://` (or a same-origin path / `market://` where appropriate), closing `javascript:` / `file:` / cleartext URLs in listings a storefront renders.

`Kind` gains the `llm` / `role` / `workflow` header kinds that already had validators and live registry packages but were missing from the union.
