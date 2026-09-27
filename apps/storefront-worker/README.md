# Azphalt storefront Worker

The production backend for **azphalt.store** and **azphalt.org**: one Cloudflare Worker that serves the
static React storefront ([`apps/storefront-react`](../storefront-react)), the VitePress docs
([`docs/`](../../docs)), the Repository API, and the paid lane, over Cloudflare Workers + one SQLite
Durable Object. It replaces the former Vercel/Neon runtime path.

## What it serves

| Host | Serves |
|---|---|
| `azphalt.store`, `www.azphalt.store` | The React storefront, the Repository API (`/packages`, `/revocations`, `/installs`, `/entitlements/play`, `/.well-known/azphalt.json`, …), publishing, checkout, purchases, ratings, reports and moderation |
| `azphalt.org`, `www.azphalt.org` | The docs, mapped onto `/_docs/*` of the same asset bundle, with the docs' own 404 page |

`pnpm --filter "@azphalt/storefront-worker..." build` builds both sites and assembles them into
`dist/` ([`scripts/assemble-assets.mjs`](scripts/assemble-assets.mjs)): the storefront at the root, the
docs under `_docs/`. Every request runs through the Worker except the storefront's hashed
`/assets/*`, which Cloudflare serves directly (`wrangler.jsonc` § `run_worker_first`). The docs keep
their bundles in `docs-assets/` for that reason.

The privacy policy and terms are static HTML in the storefront's `public/` (`/privacy`, `/terms`), so
they read without JavaScript.

## Zero-fixed-cost design

- Static assets are served by the Worker.
- Repository metadata is exported at build time from the reviewed git catalog.
- Checkout, session, entitlement, seller, subscription, rating and report state lives in one SQLite
  Durable Object.
- The Worker generates and persists its buyer-session HMAC secret and Ed25519 entitlement signing
  keypair on first use.
- Free package bytes come from the reviewed git-backed catalog; the Worker streams them (Range passes
  through) instead of redirecting, so a full download can carry its install-report token.
- Paid package bytes are stored only in protected Durable Object chunks and are returned only after a
  valid signed entitlement is presented.

Cloudflare free-tier exhaustion should stop serving rather than silently create a hosting bill. Stripe
still charges its normal per-transaction processing fee when a purchase succeeds.

## Secrets

Set these once on the deployed Worker (the deploy workflow does not carry them):

~~~sh
cd apps/storefront-worker
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put ADMIN_TOKEN
~~~

For the Play lane, also set the store app's id as a var and a Google service account as a secret
(both unset → `POST /entitlements/play` answers `501`):

~~~sh
npx wrangler secret put PLAY_SERVICE_ACCOUNT_JSON   # the key file's JSON
# wrangler.jsonc vars: "PLAY_PACKAGE_NAME": "store.azphalt.storefront"
~~~

The service account needs Play Console access to the app with *View financial data* (to read orders)
and *Manage orders* (to acknowledge them).

`STRIPE_WEBHOOK_SECRET` is required for subscriptions and renewal/cancellation events. One-time
purchases can still fulfil from the Stripe Checkout session on the success page if the webhook is
delayed. `ADMIN_TOKEN` protects paid-package uploads and the moderation queue.

There is **no GitHub secret**. `POST /packages` asks the central gateway Worker (`workflows`, from
HereLiesAz/workflows) for a token over the `GITHUB_TOKENS` service binding: its `RepositoryTokens`
entrypoint mints a GitHub App installation token narrowed to `HereLiesAz/azphalt` with contents and
pull-requests write, valid for an hour. A service binding is private to the Cloudflare account, so
the minter has no public URL. The App must hold those two permissions, or minting fails and publishes
answer `503`. A deployment without the gateway can set a fixed `GITHUB_PUBLISH_TOKEN` secret instead
(fine-grained, Contents and Pull requests read/write on `PUBLISH_REPOSITORY`); with neither,
`POST /packages` answers `501`.

## Publishing

`POST /packages` ([`spec/repository-api.md`](../../spec/repository-api.md) § 9, [`src/publish.ts`](src/publish.ts))
takes a signed `.azp` and answers `202` with a pull request, never by serving the bytes. The Worker:

1. verifies the container over WebCrypto — safe paths, every digest, no unlisted payload, and the
   Ed25519 signature over `manifest.json` (per-kind manifest checks run in the PR's submission check);
2. applies publisher continuity: an id already pinned in
   [`apps/storefront/registry/publishers.json`](../storefront/registry/publishers.json) must be signed
   by its pinned key (`403` otherwise); an unpinned id already in the catalog, or with a folder on
   `main`, is maintained by hand (`409`); a new id gets pinned by the same PR;
3. writes `submissions/<id>/` — manifest without `files`, `LICENSE`, payload, replacing the previous
   version's files — on a `publish/<id>/<version>` branch and opens the PR. A second publish of the
   same version while the first is open is `409`.

Limits come from the free plan: 4 MB per package, at most 30 binary files (each is one GitHub API call;
text files go inline), and 3 publishes a minute per IP (`PUBLISH_LIMITER`). The storefront's `/publish`
page is a form over the same endpoint.

## Ratings, reports and moderation

- `POST /api/ratings` `{ packageId, stars }` — one rating per package per browser. The rater is the
  opaque buyer subject in the signed `azphalt_buyer_session` cookie (minted if absent); rating again
  replaces the earlier rating. A paid package can only be rated by a subject holding an entitlement to
  it. Averages and counts are merged into `/packages`, `/packages/{id}` and `/api/packages`.
- `POST /reports` (also `/api/reports`) — `spec/marketplace-integrity.md` § 2. Nothing identifying the
  filer is stored. Every report is **untrusted**: this store has no counter-signed hosts or verified
  accounts, so nothing is auto-quarantined; an IP claim's `signature` is kept for a moderator to check.
- `GET /reports` (also `/api/reports`) — the moderation queue, newest 500 first, with any decision
  (`resolution`, `resolvedAt`). `Authorization: Bearer $ADMIN_TOKEN`. The storefront's `/moderation`
  page asks for the token, holds it in memory only, and offers *Dismiss* and *Yank* on each report.
- `POST /api/reports/{id}/resolve` `{ action: "dismiss" | "yank", reason? }` — records the decision.
  `yank` revokes the reported version (the one served now, if the report named none) with the report's
  reason. Admin.
- `POST /api/admin/revocations` `{ packageId, version?, reason? }` yanks directly; `DELETE
  /api/admin/revocations/{id}/{version}` undoes it. Admin.
- `GET /revocations?since=` — the feed installed hosts poll (`spec/repository-api.md` § 5). A yanked
  version drops out of `/packages` and `/api/packages`, shows `yanked: true` in its detail, and its
  download answers `404`.

Public writes are limited to 10 a minute per IP by Cloudflare's rate-limit binding (`WRITE_LIMITER`);
the counters live in Cloudflare, so the Worker never stores an address.

## Install counts

`spec/repository-api.md` § 8 and `spec/state-reporting.md` § 4. Every full `200` download (free or
paid) carries an `azphalt-report-token` header: 32 random bytes, stored with only the package and
version, deleted unspent after 30 days. Ranged `206` responses carry none. `POST /installs` spends a
token for an `installed` event (it must have been minted for the same package) and returns a receipt;
an `uninstalled` event spends that receipt. `activated`/`deactivated` are accepted and not counted.
`installs` and `uninstalls` appear on `/packages` and `/api/packages` summaries — never as active
installs.

## Play purchases

`POST /entitlements/play` `{ packageId, productId, purchaseToken }` (`spec/repository-api.md` § 7,
[`src/play.ts`](src/play.ts)). The Worker signs a service-account JWT (RS256, WebCrypto), trades it
for an OAuth token, and reads the purchase from the Android Publisher API. A completed purchase gets
the same store-signed entitlement a web purchase does, issued to `play-account:<obfuscatedExternalAccountId>`
when the app set one, otherwise `play-order:<orderId>` (stable across reinstalls, which restore the same
token). An unacknowledged purchase is acknowledged. The product must be the listing's `playProductId`,
or the package id when that is unset. One-time products only: a subscription listing answers `501`.
`402` means Google does not recognise the purchase; `502` means Google could not be asked.

## Listings

The public storefront overlay is `apps/storefront-react/public/listings.json`:

~~~json
[
  {
    "packageId": "com.example.package",
    "sellerId": "seller_example",
    "amountCents": 500,
    "currency": "USD",
    "status": "active"
  }
]
~~~

For a subscription, add `"interval": "month"` or `"year"`. If the store app sells the package under
a different Play product id, add `"playProductId"`. Subscription checkout is refused until a
Stripe webhook secret is configured.

A seller connects their Stripe Express account at `/connect/onboard`; the Worker persists the
seller-to-account mapping and refreshes capability flags from Stripe.

## Uploading paid package bytes

Paid bytes must never be committed to the public registry. Upload the exact `.azp` version to the
protected Worker endpoint:

~~~sh
curl -X PUT \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/vnd.azphalt.package" \
  --data-binary @package.azp \
  "https://azphalt.store/api/admin/packages/com.example.package/1.0.0"
~~~

Checkout is refused until the listed package/version exists in protected storage.

## Deploying

[`.github/workflows/deploy-storefront.yml`](../../.github/workflows/deploy-storefront.yml) is bound to
`HereLiesAz/workflows`' shared `cloudflare-worker-deploy.yml`, which runs it centrally on every push to
`main` that touches the storefront, the Worker, the registry, the docs or the specs. It installs the
workspace, builds and tests this package, checks the exported catalog, deploys with Wrangler, and then
runs [`scripts/verify-deployment.mjs`](scripts/verify-deployment.mjs) against the new version's own
`workers.dev` URL. The central controller needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## Domains

The four hostnames are attached to this Worker as **Custom Domains** in the Cloudflare dashboard
(Workers & Pages → `azphalt-store` → Settings → Domains & Routes), not in `wrangler.jsonc`, so a deploy
never fails on a zone that isn't on the account yet.

Until they are attached, the domains are served by the Vercel deployment of
[`apps/storefront`](../storefront), which does the same host split. To move them:

1. Let one deploy of this Worker succeed and check it on its `workers.dev` URL
   (`node apps/storefront-worker/scripts/verify-deployment.mjs https://azphalt-store.<account>.workers.dev`,
   and `/_docs/` for the docs).
2. Set the secrets above.
3. Add `azphalt.store` and `azphalt.org` to the Cloudflare account, then attach the four hostnames as
   Custom Domains of `azphalt-store`.
4. Point the Stripe webhook at `https://azphalt.store/api/webhooks/stripe`.
5. Confirm the live hosts, then remove the domains from the Vercel project and delete it. Drop
   `apps/storefront/vercel.json` in the same change.

## Local development

~~~sh
pnpm install --frozen-lockfile
pnpm --filter "@azphalt/storefront-worker..." build
pnpm --filter @azphalt/storefront-worker test
cd apps/storefront-worker && npx wrangler dev
# the docs host: curl -H "Host: azphalt.org" http://localhost:8787/
~~~

The tests run the real `AzphaltState` over `node:sqlite` and a stand-in for the asset layer
([`test/harness.ts`](test/harness.ts)).
