# @azphalt/mcp

## 0.2.0

### Minor Changes

- 19c0df7: Relicensed from MIT to the Apache License 2.0, which adds an explicit patent grant and patent retaliation — for a standard other hosts implement, implementers are licensed for contributors' patents, not only their copyright. Every freedom MIT gave is kept; extensions published through azphalt keep their own licences, and `create-azphalt` still writes whichever licence a creator picks.
- fffb800: Harden the host side — the clients, runtimes and conformance suite that consume `.azp` packages:
  
  - **repository-client.** `download()` accepts `expectedDigest` and verifies it, bounds the total with `maxBytes` (the size comes from the server's `Content-Range`), and rejects a short or oversized chunk instead of leaving a zero-filled hole. Package ids and versions are URL-encoded, so a hostile pack member can't redirect a request carrying the bearer token.
  - **mcp.** `extractAsset` verifies the package first, and no longer resolves `__proto__`/`constructor` as asset names. The `azp_verify` description no longer implies `signed: true` identifies a signer.
  - **llm-host.** `scrub` runs to a fixpoint (nested `<|im_<|x|>start|>` could previously be spliced into a live chat-template marker). `chatLlm` rejects non-string content (an array bypassed the session-tag check), no longer sends the bearer to an `auth: none` endpoint, and resolves `${input:…}` base URLs through a new `inputs` option (`llmConsent` no longer throws on them). `installLlm` now requires `consented: true`, refuses an unsigned package (unless `allowUnsigned`), honours `trustedKeys`, validates the package id and owner/repo, and audits the runner workflow with the new `auditWorkflow` — only declared secrets, no `pull_request_target`, no write beyond the manifest's ceiling.
  - **runtime-wasm.** A caller can narrow but never widen the capabilities a package declared. A contribution whose promise never settles is an error, not a silent success. `params`/`assets`/module lookups use own-property checks. Guest `layers.create` is capped. The raw-wasm path bounds module size and memory (`MAX_WASM_MODULE_BYTES`, `MAX_WASM_MEMORY_BYTES`); a non-terminating wasm entry still blocks its thread, so hosts must run untrusted raw-wasm packages in a terminable Worker/process.
  - **web-handoff.** Host-directory install URLs must be `https:` or `market:` (`isSafeInstallUrl`).
  - **azdk.** `Capability` drops the deferred `storage`; `RepositoryErrorResponse` gains `details`.
  - **conformance.** The reject-tampered and reject-unsafe-path checks now drive the host (with a control package it must run), and the capability-gating checks require a baseline run so a host that refuses everything can't pass by erroring. The "has teeth" tests simulate a broken host honestly.
  - **repository-server.** A `private` package's detail is access-gated like its download, and `HEAD` is routed like `GET` (a download `HEAD` doesn't count).

### Patch Changes

- fd27cb6: Runtime dependencies updated to their latest stable releases: zod 4 and `@modelcontextprotocol/sdk` 1.30 (`@azphalt/mcp`), Express 5 (`@azphalt/mock-backend`), and `quickjs-emscripten` 0.32 (`@azphalt/runtime-wasm`).
  
  `create-azphalt` scaffolds with the same latest releases (TypeScript 7, Vite 8, Express 5, current `@azphalt/*` versions), and its generated release workflow uses `actions/checkout@v7`, `actions/setup-node@v7` on Node 24, and `softprops/action-gh-release@v3`.
- Updated dependencies [19c0df7]
- Updated dependencies [a04a765]
- Updated dependencies [d18ff48]
- Updated dependencies [c0c8ee4]
- Updated dependencies [fffb800]
- Updated dependencies [5b51e82]
- Updated dependencies [b32adc4]
- Updated dependencies [2f85213]
- Updated dependencies [de006ee]
- Updated dependencies [d6f56c9]
  - @azphalt/azdk@0.6.0
  - @azphalt/azp@0.6.0

## 0.1.5

### Patch Changes

- Updated dependencies [f36110b]
  - @azphalt/azdk@0.5.0
  - @azphalt/azp@0.5.0

## 0.1.4

### Patch Changes

- Updated dependencies [bdbdb9b]
  - @azphalt/azdk@0.4.0
  - @azphalt/azp@0.4.0

## 0.1.3

### Patch Changes

- Updated dependencies [e5108c8]
  - @azphalt/azdk@0.3.0
  - @azphalt/azp@0.3.0

## 0.1.2

### Patch Changes

- Updated dependencies [5a7869b]
- Updated dependencies [f9a94c8]
- Updated dependencies [955c1f4]
  - @azphalt/azp@0.2.0
  - @azphalt/azdk@0.2.0
