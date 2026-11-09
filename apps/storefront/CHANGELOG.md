# @azphalt/storefront

## 1.0.2

### Patch Changes

- Updated dependencies [97aaf3a]
  - @azphalt/azdk@0.8.0
  - @azphalt/azp@0.7.0
  - @azphalt/runtime-reference@0.2.2

## 1.0.1

### Patch Changes

- Updated dependencies [c2e8908]
  - @azphalt/azdk@0.7.0
  - @azphalt/azp@0.6.1
  - @azphalt/runtime-reference@0.2.1

## 1.0.0

### Major Changes

- 9340b9a: Retire the Next.js storefront. `apps/storefront` is now only the catalog: the git-pinned registry (`registry/`) and the scripts that build and verify it. The storefront is `apps/storefront-react` served by `apps/storefront-worker`; Vercel keeps serving its last good deployment until the domains move to the Worker.

### Minor Changes

- 5b51e82: Twelve first-party `kind: "llm"` packages on the store: eight free hosted endpoints (Kilo, LLM7, OVHcloud, OpenRouter, Groq, Cerebras, Z.ai, Mistral) and four open-weight models run by pinned llama.cpp in a private GitHub Actions sandbox (Qwen2.5 1.5B, Qwen2.5 Coder 1.5B, SmolLM2 1.7B, Phi-3.5 Mini). They are generated from one table by `gen-llm-packages` and share one setup script, runner and workflow shape. Store cards show the tier; the detail page shows what `spec/llm.md` requires before install: where prompts go, the operator's data handling, the weights' licence, and the setup token's permissions. `submit-check` accepts `kind: "llm"`, and `build-catalog --only` now takes a folder package's id.
- f9dd859: Make the catalog gate check what is actually served:
  
  - `build-catalog --check` now reads every committed `registry/packages/*.azp` and requires it to verify, to carry a signature when the catalog says it is signed, to match the recorded size, and — with its signature set aside — to re-pack to exactly the pinned unsigned digest. Before, it compared only the index and the lockfile, so swapping any `.azp` for different bytes left it green.
  - A full build validates every output filename **before** deleting `registry/packages/` (a bad version string used to leave the directory empty while `catalog.json` still listed everything).
  - Each package is run through the real `.azp` verifier before it is signed with the store key; tarball member names are checked for traversal and the extracted tree is size-bounded; `--only` with no value is an error instead of silently building everything; the catalog's `signed` flag now reflects whether every package is actually signed.
  - `build-previews` uses a fresh scratch directory per run (cleaned afterwards) instead of a shared predictable `/tmp` path, refuses unsafe payload paths, reports unrenderable packages as CI warnings (`--strict` makes them fatal), and no longer swallows motion-preset parse errors.

### Patch Changes

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
- Updated dependencies [152c3b8]
  - @azphalt/azdk@0.6.0
  - @azphalt/azp@0.6.0
  - @azphalt/runtime-reference@0.2.0

## 0.1.5

### Patch Changes

- Updated dependencies [f36110b]
  - @azphalt/azdk@0.5.0
  - @azphalt/azp@0.5.0
  - @azphalt/repository-server@0.1.5
  - @azphalt/registry@0.3.2
  - @azphalt/runtime-reference@0.1.5
  - @azphalt/registry-store-vercel@2.0.2

## 0.1.4

### Patch Changes

- Updated dependencies [bdbdb9b]
  - @azphalt/azdk@0.4.0
  - @azphalt/azp@0.4.0
  - @azphalt/repository-server@0.1.4
  - @azphalt/registry@0.3.1
  - @azphalt/runtime-reference@0.1.4
  - @azphalt/registry-store-vercel@2.0.1

## 0.1.3

### Patch Changes

- Updated dependencies [e5108c8]
  - @azphalt/azdk@0.3.0
  - @azphalt/azp@0.3.0
  - @azphalt/registry@0.3.0
  - @azphalt/registry-store-vercel@2.0.0
  - @azphalt/repository-server@0.1.3
  - @azphalt/runtime-reference@0.1.3

## 0.1.2

### Patch Changes

- Updated dependencies [5a7869b]
- Updated dependencies [debc781]
- Updated dependencies [8d5f5af]
- Updated dependencies [f9a94c8]
- Updated dependencies [955c1f4]
- Updated dependencies [8d5f5af]
- Updated dependencies [821325d]
- Updated dependencies [8911c47]
- Updated dependencies [c0b64e6]
- Updated dependencies [ae8e2cd]
  - @azphalt/registry@0.2.0
  - @azphalt/azp@0.2.0
  - @azphalt/azdk@0.2.0
  - @azphalt/registry-store-vercel@1.0.0
  - @azphalt/repository-server@0.1.2
