# @azphalt/storefront-react

## 0.2.3

### Patch Changes

- Updated dependencies [62cfc0e]
  - @azphalt/registry@0.5.1

## 0.2.2

### Patch Changes

- Updated dependencies [97aaf3a]
  - @azphalt/azdk@0.8.0
  - @azphalt/azp@0.7.0
  - @azphalt/registry@0.5.0

## 0.2.1

### Patch Changes

- Updated dependencies [c2e8908]
  - @azphalt/azdk@0.7.0
  - @azphalt/azp@0.6.1
  - @azphalt/registry@0.4.1

## 0.2.0

### Minor Changes

- 047509a: The Cloudflare storefront reaches parity with the Next.js deployment ahead of the domain cutover: the Worker serves azphalt.org's docs by hostname, takes ratings (one per browser, buyers only for paid packages) and reports (untrusted, moderated behind `ADMIN_TOKEN`), and deploys through the shared Cloudflare workflow with a post-deploy check. The React storefront gains rating, reporting, moderation and per-app pages, static privacy and terms pages, a version footer, and a network-first service worker. The docs keep their bundles in `docs-assets/`.
- 5b51e82: Twelve first-party `kind: "llm"` packages on the store: eight free hosted endpoints (Kilo, LLM7, OVHcloud, OpenRouter, Groq, Cerebras, Z.ai, Mistral) and four open-weight models run by pinned llama.cpp in a private GitHub Actions sandbox (Qwen2.5 1.5B, Qwen2.5 Coder 1.5B, SmolLM2 1.7B, Phi-3.5 Mini). They are generated from one table by `gen-llm-packages` and share one setup script, runner and workflow shape. Store cards show the tier; the detail page shows what `spec/llm.md` requires before install: where prompts go, the operator's data handling, the weights' licence, and the setup token's permissions. `submit-check` accepts `kind: "llm"`, and `build-catalog --only` now takes a folder package's id.
- 19c0df7: Publishing over the Repository API (`spec/repository-api.md` § 9, `POST /packages`). The store's Worker takes a signed `.azp`, verifies it, applies publisher continuity (first publish pins the key in `apps/storefront/registry/publishers.json`), and opens a review pull request against `submissions/<id>/` — the merge is what publishes, so the catalog keeps no runtime write path. `RepositoryErrorCode` gains `forbidden`, `conflict`, `payload_too_large`, `not_implemented`, `bad_gateway` and `unavailable`; the reference server answers `501 not_implemented` for publishes and maps those statuses to the new codes. The storefront gains a `/publish` page.
- 947b722: Storefront and demo-client fixes: prices render in the listing's own currency (not a hardcoded `$`); install counts now show (the Worker supplies `installs`, the UI only read `downloads`); package-supplied `terms` and licence URLs are `https:`-only and an invalid `baseUrl` no longer blanks the page; the Sell page takes the operator's invite code. In the demo marketplace, a slow reply for a previously selected package can no longer overwrite the current one, and a package without `types` no longer throws.
- 15dc31c: The Worker's remaining Repository API gaps are filled:
  
  - **Revocations.** Moderators can yank a version, directly or by resolving a report, from the `/moderation` page. It goes on `/revocations`, drops out of listings, shows `yanked: true` in its detail, and its download answers `404`.
  - **Install counts.** Every full download carries an `azphalt-report-token`, and `POST /installs` counts installs and uninstalls against those tokens and their receipts. Free downloads are now streamed from the git catalog so the token can ride along.
  - **Play purchases.** `POST /entitlements/play` verifies one-time purchases with the Android Publisher API through a service account (RS256 JWT over WebCrypto) and issues the store-signed entitlement. It answers `501` until `PLAY_PACKAGE_NAME` and `PLAY_SERVICE_ACCOUNT_JSON` are set.
  
  The privacy policy now describes install counts and Play verification as they are.

### Patch Changes

- f4ee9b5: Storefront UX and accessibility: a visible search field with a focus ring, a plain-language catalogue error with Retry, a seller page that explains the seller ID and invite code and links to an invite request, accessible dialogs (role, focus trap, Escape), AA-contrast secondary and error text, 44px touch targets, Capsule-styled cards, dialogs and legal pages, and a yellow PWA theme colour.
- Updated dependencies [19c0df7]
- Updated dependencies [a04a765]
- Updated dependencies [d18ff48]
- Updated dependencies [c0c8ee4]
- Updated dependencies [fffb800]
- Updated dependencies [5b51e82]
- Updated dependencies [b32adc4]
- Updated dependencies [2f85213]
- Updated dependencies [de006ee]
- Updated dependencies [2776538]
- Updated dependencies [d6f56c9]
  - @azphalt/azdk@0.6.0
  - @azphalt/azp@0.6.0
  - @azphalt/registry@0.4.0
  - @azphalt/web-handoff@0.4.0

## 0.1.3

### Patch Changes

- Updated dependencies
  - @azphalt/web-handoff@0.3.0

## 0.1.2

### Patch Changes

- Updated dependencies [e5108c8]
  - @azphalt/web-handoff@0.2.0
