# @azphalt/storefront-worker

## 0.2.0

### Minor Changes

- 047509a: The Cloudflare storefront reaches parity with the Next.js deployment ahead of the domain cutover: the Worker serves azphalt.org's docs by hostname, takes ratings (one per browser, buyers only for paid packages) and reports (untrusted, moderated behind `ADMIN_TOKEN`), and deploys through the shared Cloudflare workflow with a post-deploy check. The React storefront gains rating, reporting, moderation and per-app pages, static privacy and terms pages, a version footer, and a network-first service worker. The docs keep their bundles in `docs-assets/`.
- 19c0df7: Publishing over the Repository API (`spec/repository-api.md` § 9, `POST /packages`). The store's Worker takes a signed `.azp`, verifies it, applies publisher continuity (first publish pins the key in `apps/storefront/registry/publishers.json`), and opens a review pull request against `submissions/<id>/` — the merge is what publishes, so the catalog keeps no runtime write path. `RepositoryErrorCode` gains `forbidden`, `conflict`, `payload_too_large`, `not_implemented`, `bad_gateway` and `unavailable`; the reference server answers `501 not_implemented` for publishes and maps those statuses to the new codes. The storefront gains a `/publish` page.
- 15dc31c: The Worker's remaining Repository API gaps are filled:
  
  - **Revocations.** Moderators can yank a version, directly or by resolving a report, from the `/moderation` page. It goes on `/revocations`, drops out of listings, shows `yanked: true` in its detail, and its download answers `404`.
  - **Install counts.** Every full download carries an `azphalt-report-token`, and `POST /installs` counts installs and uninstalls against those tokens and their receipts. Free downloads are now streamed from the git catalog so the token can ride along.
  - **Play purchases.** `POST /entitlements/play` verifies one-time purchases with the Android Publisher API through a service account (RS256 JWT over WebCrypto) and issues the store-signed entitlement. It answers `501` until `PLAY_PACKAGE_NAME` and `PLAY_SERVICE_ACCOUNT_JSON` are set.
  
  The privacy policy now describes install counts and Play verification as they are.
- bb90a34: Harden the paid lane and admin surface:
  
  - **Payout takeover closed.** `POST /api/connect/onboard` now requires the operator's `ADMIN_TOKEN` or a per-seller invite code the operator mints with the new `POST /api/admin/connect/invite` (it was open, so anyone could bind their own Stripe account to a public `sellerId`); the React "Sell" page asks for the code, and checkout prefers the reviewed `stripeAccountId` in `listings.json` over a stored mapping. `GET /api/connect/status` no longer returns the Stripe account id or lets an anonymous caller trigger a Stripe refresh.
  - **No entitlement for unpaid sessions.** A completed checkout session is fulfilled only when `payment_status` is `paid` / `no_payment_required` (a delayed bank debit is `complete` but `unpaid`); `checkout.session.async_payment_succeeded` fulfils it when funds settle.
  - **Failed yank no longer marks a report resolved.** The revocation is written before the report is resolved, so a 409 leaves the report open.
  - **Admin token** is compared in constant time and the admin surface goes through the write limiter.
  - **Publish**: the uploaded `.azp` is bounded when inflated (entry count, per-entry and total size) so a small archive can't exhaust the isolate before signature checks; path checks match `@azphalt/azp` (backslash, drive letter, NUL, `.`/empty segments).
  - **Security headers** (`nosniff`, `X-Frame-Options`, `frame-ancestors 'none'`, `Referrer-Policy`, HSTS) on every response.
  - First test coverage for the webhook, onboarding auth, headers and the zip cap.
- f66b4ae: The store Worker answers `POST /updates` (`spec/repository-api.md` § 6), the batch update check. It lists only installed ids whose served, non-yanked version is newer by semver precedence.
  
  `POST /entitlements/play` now verifies subscription listings through `purchases.subscriptionsv2` instead of answering `501`. An active (or grace-period) subscription gets a store-signed `kind: "subscription"` entitlement that expires with the current period. It is issued to the base order id, so renewals keep one subject, and the subscription is acknowledged.

### Patch Changes

- 5b51e82: Twelve first-party `kind: "llm"` packages on the store: eight free hosted endpoints (Kilo, LLM7, OVHcloud, OpenRouter, Groq, Cerebras, Z.ai, Mistral) and four open-weight models run by pinned llama.cpp in a private GitHub Actions sandbox (Qwen2.5 1.5B, Qwen2.5 Coder 1.5B, SmolLM2 1.7B, Phi-3.5 Mini). They are generated from one table by `gen-llm-packages` and share one setup script, runner and workflow shape. Store cards show the tier; the detail page shows what `spec/llm.md` requires before install: where prompts go, the operator's data handling, the weights' licence, and the setup token's permissions. `submit-check` accepts `kind: "llm"`, and `build-catalog --only` now takes a folder package's id.
- 4227ed1: Everything that was `store.azphalt` is now `com.hereliesaz.azphalt`:
  
  - The store app is `com.hereliesaz.azphalt.store`: its application id, namespace and Kotlin package.
  - The `.azp` verifier library is `com.hereliesaz.azphalt.azp`.
  - The browse intent is `com.hereliesaz.azphalt.action.BROWSE`, in the app and in `spec/store-app.md` and `spec/state-reporting.md`.
  
  The Worker's `PLAY_PACKAGE_NAME` matches the app id.
  
  The storefront Worker is named `azphalt`, matching the Worker created in the Cloudflare dashboard. Workers Builds refuses to build when the two names differ.
- da52070: `POST /packages` gets its GitHub token from the central gateway Worker over a service binding (`GITHUB_TOKENS` → `RepositoryTokens.azphaltPublishToken()`): a short-lived App installation token narrowed to HereLiesAz/azphalt, fetched only after a package verifies. The Worker stores no GitHub secret; a fixed `GITHUB_PUBLISH_TOKEN` remains as an override for deployments without the gateway, and a failed mint answers `503`.
- 152c3b8: Tighten format sniffing and runtime parity: the audio importer no longer labels ADTS AAC (and reserved MPEG versions) as `mp3`, the glTF importer rejects a GLB that is not version 2 or declares an impossible length, `runtime-reference` now matches `runtime-wasm` on prototype names (not params/assets), a missing string param (`""` rather than `"undefined"`) and asset reads (a copy, not the live payload), and the Worker's publish endpoint rejects a manifest with duplicate keys.
