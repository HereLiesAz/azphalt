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

For the Play lane, set a Google service account as a secret
(without the secret, `POST /entitlements/play` answers `501`):

~~~sh
npx wrangler secret put PLAY_SERVICE_ACCOUNT_JSON   # the key file's JSON
~~~

`PLAY_PACKAGE_NAME` is already in `wrangler.jsonc` vars: `com.hereliesaz.azphalt.store`, the store app's
`applicationId` (`apps/storefront-cmp/build.gradle.kts`). The two must match, or Google answers 404 and
every purchase reads as `402`.

The service account needs Play Console access to the app with *View financial data* (to read orders)
and *Manage orders* (to acknowledge them).

`STRIPE_WEBHOOK_SECRET` is required for subscriptions, renewals, cancellations, refunds and disputes.
Only the *first* fulfilment of a one-time purchase has a fallback without it: the success page polls
the Checkout Session from Stripe (`GET /api/checkout/session/{id}`). Renewals, cancellations, refunds
and disputes arrive only by webhook. Register the endpoint for `checkout.session.completed`,
`checkout.session.async_payment_succeeded`, `invoice.paid`, `customer.subscription.deleted`,
`account.updated`, `charge.refunded`, `charge.dispute.created` and `charge.dispute.closed`.
`ADMIN_TOKEN` protects paid-package uploads, seller binding and the moderation queue; make it a random
token of at least 32 bytes. An optional `CONNECT_INVITE_SECRET` keys seller invite codes (§ Listings).

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
the counters live in Cloudflare, so the Worker never stores an address. The same limiter covers
`POST /api/checkout` (two Stripe calls and a session row each), `POST /entitlements/play` (a Google
token exchange and a Play API call each), seller onboarding, the admin surface, and the minting of
install-report tokens: past the limit a download still succeeds, but carries no report token.

Request bodies are capped by counting the bytes as they arrive, not by trusting `Content-Length`: a
chunked or header-less body is cut off at the cap (4 MB publish, 1 MB `/updates`, 256 KB `/installs`,
64 KB for other JSON, 100 MB paid uploads).

## Install counts

`spec/repository-api.md` § 8 and `spec/state-reporting.md` § 4. Every full `200` download (free or
paid), within the write limit, carries an `azphalt-report-token` header: 32 random bytes, stored with only the package and
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
token). An unacknowledged purchase is acknowledged only after the entitlement has been issued, so a
purchase that never became a licence stays unacknowledged and Play refunds it after three days. The
product must be the listing's `playProductId`, or the package id when that is unset. The exchange
needs an active listing (a new sale), and is rate-limited like any other write.

A listing with an `interval` is sold as a Play subscription and checked through
`purchases.subscriptionsv2`. It entitles only while the subscription is active or in its grace period
and includes that product. The entitlement is `kind: "subscription"` and expires when the product's
current period does, so the store app exchanges the token again after a renewal. Its subject is the
base order id (`GPA.…` without the `..N` renewal suffix), so renewals keep one subject.

`402` means Google does not recognise the purchase or subscription as entitling; `502` means Google
could not be asked.

## In-app purchasing (host apps)

A host app such as Graffux sells paid packages inside itself, over the same server. The server
performs and verifies every purchase and issues the entitlement; the app installs the package and
checks the entitlement's signature on the device. Buying in-app is an option, never a gate: a package
bought on azphalt.store, or from a developer's own site or app, installs through the host's existing
deep-link / store-app path with its entitlement honoured exactly the same.

### Routes

`GET /billing/route?app=<applicationId>&distribution=play|direct&country=<CC>&packageId=<id>` returns
`{ route, program?, clientApi?, reportToGoogle, reason?, productId?, price? }`, decided by the policy
table in [`src/billing-policy.ts`](src/billing-policy.ts) (`GET /billing/policy` serves it):

| Route | When |
|---|---|
| `stripe` | Not a Play build (GitHub APK, sideload); or a Play build in a country whose Google programme does not require Play Billing alongside, when the app is enrolled (US). |
| `choice` | A Play build where the programme requires Play Billing alongside, when enrolled (EEA, UK, AU, JP: billing choice; IN, KR: user choice). Google shows the choice screen. |
| `play` | Everywhere else, and wherever the app is not enrolled (`reason: "not_enrolled"`). |

Enrolment is declared per app in `PLAY_BILLING_PROGRAMS`. The device also checks programme
availability with the Play Billing Library, which reports "unavailable" for an app Google has not
enrolled, so a wrong flag still falls back to Play Billing.

### Fees

| Sale | Seller receives |
|---|---|
| Web (azphalt.store), Stripe | price − Stripe fee − `PLATFORM_FEE_BPS` (15%) |
| In-app, Stripe | price − Stripe fee − 15% − `IN_APP_FEE_BPS` (5%); buyer pays tax on top (Stripe Tax) |
| In-app, Play | pre-tax price − Google's fee (`PLAY_SERVICE_FEE_BPS`, 15%) − 15% − 5%; 10% of that held 90 days |

`GET /api/listings/{packageId}/breakdown` shows a seller all three for a listing; the checkout
response's `breakdown` carries an `inAppFee` line for in-app checkouts.

### Play-route payouts

On the Play route Google collects and pays the platform; the seller is paid by Stripe Connect transfer
from the platform balance. Every verified Play sale is a row in the payout ledger
([`src/ledger.ts`](src/ledger.ts)) with gross, tax, Google's fee, the platform fee, the seller share,
currency and country (from Google's `orders.get`). The share is paid in two parts: 90% after
`PLAY_PAYOUT_HOLD_HOURS` (default 96: Play's 48-hour self-service refund window plus 48 hours), and the
`PLAY_HOLDBACK_BPS` (10%) holdback after `PLAY_HOLDBACK_DAYS` (90). A transfer that fails for lack of
balance (Google has not paid out yet) backs off and retries; a seller with no connected account goes
to review.

A cron (`triggers.crons`) sweeps Google's Voided Purchases API every run. A void revokes the
entitlement and recovers the seller share: unreleased holdback first (that sale's, then the seller's
others), then unpaid parts, then a Stripe transfer reversal; what a reversal cannot recover is a debit
netted against the seller's next payout. Every step is in `ledger_events`.

Operators: `GET /api/admin/payouts?status=pending|processing|retry|paid|cancelled|reversed|review|voided`,
`GET /api/admin/payouts/{orderId}` (with its event history), `POST /api/admin/payouts/{orderId}/release`
`{ part }` to requeue a reviewed part, `POST /api/admin/in-app/run` to run the jobs now. All Bearer
`ADMIN_TOKEN`.

### Play products

The cron also keeps every `PLAY_SYNC_PACKAGES` app's Play catalogue in step with the listings
([`src/play-products.ts`](src/play-products.ts)): an active one-time listing becomes a one-time
product (`monetization.onetimeproducts`, upserted with `allowMissing`, regional prices from
`pricing:convertRegionPrices`, purchase option activated), a paused one is deactivated, and nothing is
written when nothing changed. Developers never touch Play Console. Subscription listings are not sold
through Play in host apps; they go to Stripe.

### Alternative-billing reports

A Stripe sale made under a Google programme carries the app's external transaction token. It is
reported to `externalTransactions` when fulfilled (Google's deadline is 24 hours) and its refund is
reported when Stripe refunds it; failures retry on the cron.

### Tax

On Play-route sales Google is the merchant of record to the buyer and remits the tax in the price;
the platform is the merchant of record towards the seller, whom it pays from its own balance. On
in-app Stripe sales the platform is the merchant of record (destination charges) and Stripe Tax
collects tax on top. This code computes no tax: **the owner should confirm the tax treatment** of both
routes (including whether seller payouts need 1099-K/DAC7 reporting) with an adviser.

### Owner configuration

Vars (`wrangler.jsonc`): `PLAY_PACKAGE_NAMES`, `PLAY_SYNC_PACKAGES`, `PLAY_BILLING_PROGRAMS`,
`PLAY_SERVICE_FEE_BPS`, `IN_APP_FEE_BPS`, `PLAY_PAYOUT_HOLD_HOURS`, `PLAY_HOLDBACK_BPS`,
`PLAY_HOLDBACK_DAYS`, `STRIPE_AUTOMATIC_TAX_IN_APP`, `PLAY_PAYOUTS_ENABLED`. Secrets (existing):
`PLAY_SERVICE_ACCOUNT_JSON`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `ADMIN_TOKEN`.

## Update checks

`POST /updates` (`spec/repository-api.md` § 6) takes the host's installed `[{ id, version }]` (at most
5000 entries, 1 MB) and answers `{ updates: [{ id, latest }] }`. Only ids whose served, non-yanked
version is strictly newer by semver precedence are listed ([`src/semver.ts`](src/semver.ts));
current, ahead and unknown ids are omitted.

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

`status` decides who can **buy**, never who can **download**: `"active"` is on sale; `"paused"` stops
new checkouts (and hides the card), while everyone who already paid keeps downloading it. A listing with
no `status` is paused. `node tools/validate-listings.mjs` checks the file (a positive integer
`amountCents` of at least 50, an ISO currency in capitals, `status` present, `sha256-<hex>` integrity,
well-formed `interval`, `stripeAccountId` and `playProductId`); it runs in `pnpm test`.

For a subscription, add `"interval": "month"` or `"year"`. If the store app sells the package under
a different Play product id, add `"playProductId"`. Subscription checkout is refused until a
Stripe webhook secret is configured.

Seller payout accounts are bound only with the operator's authority, because a `sellerId` is public (it
appears in `listings.json`) and binding a Stripe account to it decides who gets paid. The operator
mints a per-seller **invite code** — `POST /api/admin/connect/invite` `{ sellerId }` with
`Authorization: Bearer $ADMIN_TOKEN` — and gives it to that seller. The code is
`<issuedAt base36>.<HMAC-SHA256(K, "connect-invite:v2:" + sellerId + ":" + issuedAt)>`, where `K` is
`CONNECT_INVITE_SECRET` or, unset, `HKDF-SHA256(ADMIN_TOKEN, info "azphalt connect-invite v2")`: bound to
one id, valid for **7 days**, never a MAC made with the admin token itself, and revoked for everyone by
rotating the key. The seller then self-onboards at `/connect/onboard`
(`?sellerId=…&invite=…`), which posts `{ sellerId, inviteCode, email?, country? }` to
`POST /api/connect/onboard`; the operator's bearer token is also accepted there. Without one of the two
the endpoint answers `401`, so nobody can onboard their own bank account against someone else's id.
`GET /api/connect/status?sellerId=` is public but returns only readiness flags; the Stripe account id
and `refresh=1` are operator-only. At checkout the `stripeAccountId` in the reviewed listing wins over
a stored mapping.

Binding rules:

- If any of a seller's listings pins a `stripeAccountId`, onboarding only ever continues **that**
  account. A seller with no stored account, or a different one, gets `409`; the operator binds the
  pinned account with `PUT /api/admin/connect/sellers/{sellerId}` `{ accountId }` (which also refuses
  an account that contradicts the pin).
- `PUT /api/admin/connect/sellers/{sellerId}` `{ accountId }` rebinds a seller (it reads the account from
  Stripe first); `DELETE` the same path unbinds it, so the seller can onboard afresh. Admin.
- Concurrent onboard calls for one seller cannot create two Stripe accounts: the first takes a claim in
  the Durable Object, the others get `409` until it finishes, and the stored row is insert-only.
- After onboarding, pin the returned `acct_…` in `listings.json` so payouts are part of the review.

A checkout session is fulfilled only once its `payment_status` is `paid`
(`checkout.session.async_payment_succeeded` covers delayed methods). Errors from Stripe are logged and
answered with a generic message: Stripe's text can name a seller's account.

### Refunds and disputes

A refund or a chargeback revokes **that purchase's** entitlement, not the version:

- `charge.refunded` with `refunded: true` (a full refund) revokes the entitlement the charge paid for.
  A partial refund keeps the licence.
- `charge.dispute.created` revokes it; `charge.dispute.closed` with `status: "won"` restores it (a
  lost dispute stays revoked, and a refund is never undone by a later dispute win).

The charge is matched to its entitlement through the payment intent (and, for subscriptions, the
invoice) recorded at fulfilment; for a purchase fulfilled before that was recorded, the Worker asks
Stripe for the Checkout Session by payment intent. A revoked token gets `403` from the paid download,
drops out of `/api/purchases`, and its success page answers `403`; every other buyer is unaffected.
`/api/admin/revocations` is for yanking a **version** (malware, a takedown), which withdraws it from
everyone: never use it to handle a single refund.

### Recovering a purchase

A buyer's licence lives in the signed `azphalt_buyer_session` cookie and behind the success page's
`session_id` link. Checkout always collects an email (and creates a Stripe Customer for one-time
purchases), and Stripe sends the receipt there. A buyer who has lost both the cookie and the link
writes in with that email; find the payment in the Stripe dashboard by email, take its Checkout Session
id (`cs_…`), and either send them `https://azphalt.store/checkout/success?session_id=cs_…` (opening it
restores the cookie) or fetch the token with `GET /api/admin/entitlements/{sessionId}` (admin) and send
that.

Known limit: ratings are one-per-browser only for honest browsers — a client that discards its
cookie can add more, and the per-IP `WRITE_LIMITER` binding is the only brake. Bind it in production.

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

The free lane is checked too: `export-catalog.mjs` records `fileDigest` (sha256 of the exact file
served, which, unlike `integrity`, covers a signed file) and the Worker refuses a full `200` download
whose bytes do not hash to it, so a same-size swap on the moving branch is never served. Ranged `206`
responses are checked by size only; the client's own digest check covers the assembled file.

**Size.** The upload endpoint accepts up to 100 MB (the free plan's request limit), but a Worker
isolate has 128 MB of memory and both the upload and a full paid download hold the package in memory
more than once (the request body, then the stored chunks and the merged buffer). In practice keep
paid packages **under about 40 MB**, and put heavy assets behind a `remoteUrl` as the package format
intends.

## Deploying

[`.github/workflows/deploy-storefront.yml`](../../.github/workflows/deploy-storefront.yml) is bound to
`HereLiesAz/workflows`' shared `cloudflare-worker-deploy.yml`, which runs it centrally on every push to
`main` that touches the storefront, the Worker, the registry, the docs or the specs. It installs the
workspace, builds and tests this package, checks the exported catalog, deploys with Wrangler, and then
runs [`scripts/verify-deployment.mjs`](scripts/verify-deployment.mjs) against the new version's own
`workers.dev` URL. The central controller needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## Domains

The four hostnames are attached to this Worker as **Custom Domains** in the Cloudflare dashboard
(Workers & Pages → `azphalt` → Settings → Domains & Routes), not in `wrangler.jsonc`, so a deploy
never fails on a zone that isn't on the account yet.

All four are attached. What remains of the move off Vercel:

1. Set the secrets above.
2. Point the Stripe webhook at `https://azphalt.store/api/webhooks/stripe`.
3. Remove the domains from the Vercel project and delete it.

After any deploy, `node apps/storefront-worker/scripts/verify-deployment.mjs https://azphalt.store`
checks the live store, and `https://azphalt.org/` the docs.

Deploys come from the central workflow on pushes to `main` (§ Deploying). A manual run of
`deploy-storefront.yml` does not deploy: the gateway ignores manual runs of a tracker.

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
