---
"@azphalt/repository-client": minor
"@azphalt/mcp": minor
"@azphalt/llm-host": minor
"@azphalt/runtime-wasm": minor
"@azphalt/web-handoff": minor
"@azphalt/conformance": minor
"@azphalt/azdk": minor
---

Harden the host side — the clients, runtimes and conformance suite that consume `.azp` packages:

- **repository-client.** `download()` accepts `expectedDigest` and verifies it, bounds the total with `maxBytes` (the size comes from the server's `Content-Range`), and rejects a short or oversized chunk instead of leaving a zero-filled hole. Package ids and versions are URL-encoded, so a hostile pack member can't redirect a request carrying the bearer token.
- **mcp.** `extractAsset` verifies the package first, and no longer resolves `__proto__`/`constructor` as asset names. The `azp_verify` description no longer implies `signed: true` identifies a signer.
- **llm-host.** `scrub` runs to a fixpoint (nested `<|im_<|x|>start|>` could previously be spliced into a live chat-template marker). `chatLlm` rejects non-string content (an array bypassed the session-tag check), no longer sends the bearer to an `auth: none` endpoint, and resolves `${input:…}` base URLs through a new `inputs` option (`llmConsent` no longer throws on them). `installLlm` now requires `consented: true`, refuses an unsigned package (unless `allowUnsigned`), honours `trustedKeys`, validates the package id and owner/repo, and audits the runner workflow with the new `auditWorkflow` — only declared secrets, no `pull_request_target`, no write beyond the manifest's ceiling.
- **runtime-wasm.** A caller can narrow but never widen the capabilities a package declared. A contribution whose promise never settles is an error, not a silent success. `params`/`assets`/module lookups use own-property checks. Guest `layers.create` is capped. The raw-wasm path bounds module size and memory (`MAX_WASM_MODULE_BYTES`, `MAX_WASM_MEMORY_BYTES`); a non-terminating wasm entry still blocks its thread, so hosts must run untrusted raw-wasm packages in a terminable Worker/process.
- **web-handoff.** Host-directory install URLs must be `https:` or `market:` (`isSafeInstallUrl`).
- **azdk.** `Capability` drops the deferred `storage`; `RepositoryErrorResponse` gains `details`.
- **conformance.** The reject-tampered and reject-unsafe-path checks now drive the host (with a control package it must run), and the capability-gating checks require a baseline run so a host that refuses everything can't pass by erroring. The "has teeth" tests simulate a broken host honestly.
- **repository-server.** A `private` package's detail is access-gated like its download, and `HEAD` is routed like `GET` (a download `HEAD` doesn't count).
