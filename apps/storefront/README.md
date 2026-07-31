# @azphalt/storefront

The **azphalt consignment storefront** — a Next.js (App Router) app that sits on top of the open azphalt standard, the way a store sits on Open VSX. It consumes the `@azphalt/registry` package directly and demonstrates both lanes of the marketplace model (see [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md) § _The marketplace — consignment model_):

- **The registry lane** — free, open distribution. Browse, search, and download `.azp` packages. No payment rails, no fee. This is the layer other apps adopt, and it is self-hostable and neutral by construction.
- **The consignment lane** — the paid overlay, and the _only_ place a fee exists. A creator consigns a package; the storefront handles checkout and shows the honest money split (gross → processor fee, platform fee → seller net). The fee never leaks into the registry.

## Payments: stub by default, real Stripe Connect when configured

Out of the box the storefront wires the marketplace to `@azphalt/registry`'s bundled
**`StubPaymentProvider`**, which records checkout sessions but **never contacts a payment processor,
holds funds, or moves money** — every "purchase" is simulated and labelled as such (`"stub": true`).
Set `AZPHALT_STRIPE_SECRET_KEY` (plus the vars below) and it switches to the real, split-payout
**Stripe Connect** provider (`@azphalt/registry`'s `StripePaymentProvider`): the buyer is charged the
gross, the platform fee is retained as an `application_fee_amount`, and the remainder is transferred
to the seller's connected account. The **real fulfilment** path — a signature-verified
`checkout.session.completed` webhook that mints and **persists** a buy-once entitlement — is at
`POST /api/webhooks/stripe`; the buyer retrieves the resulting license from `/checkout/success`.

## The catalog comes from git, not a database

The store serves the `.azp` packages committed under [`registry/packages/`](registry), built from the
commit-pinned sources in [`registry/sources.json`](registry/sources.json). Every serverless instance
reads the same bytes at cold start and reconstructs an identical catalog.

```sh
pnpm --filter @azphalt/storefront build-catalog                     # build + verify against the lockfile
pnpm --filter @azphalt/storefront build-catalog --update            # build at the pinned shas, re-pin integrity
pnpm --filter @azphalt/storefront build-catalog --update --latest   # also move every ref to its default-branch head
pnpm --filter @azphalt/storefront build-catalog --update --only <id>  # one source, leaving its siblings in place
```

**The registry needs no durable storage, because nothing is written at runtime.** Publishing used to
happen over `POST /api/publish` — one HTTP request, landing in one serverless instance's memory. That
is the only thing a database was ever required for, and it is why an unbacked deployment silently lost
every package it accepted: reads kept working off the re-seeded catalog, so the loss was invisible
until the instance recycled.

Publishing at **build time** removes the requirement rather than satisfying it. There is no write to
lose and nothing for instances to disagree about, and durability comes from git — a stronger guarantee
than a database offers, because the store's contents are a reviewable diff, reproducible from source,
and cannot change without a commit.

`integrity` in the lockfile is the sha256 of the **unsigned** `.azp` (a signature is a detached
addition, so it does not perturb the digest). `build-catalog` fails on mismatch, and
`deploy-storefront` re-derives the committed bytes from their pinned commits before shipping, refusing
a catalog that differs from the one that was reviewed.

### Changing what the store serves is a merged PR

[`registry-sync.yml`](../../.github/workflows/registry-sync.yml) rebuilds the packages and opens a PR
when anything moved. **Merging that PR is the publish step**; `deploy-storefront` then takes it live.
The gate on a plugin update is a GitHub review, not an API call.

It runs in one of two modes, because adding an extension and following an existing one upstream are
different operations:

| Mode | Flags | What moves |
| --- | --- | --- |
| `pinned` | `--update` | Builds every source at the sha the lockfile **already pins**. No ref changes. |
| `latest` | `--update --latest` | Re-resolves every source to its default-branch head first, then builds. |

`pinned` is what publishes a **newly added** extension. Adding one is a lockfile edit — the PR appends
an entry to `sources.json` — so its bytes do not exist under `registry/packages/` until a sync builds
them. A `pinned` run adds exactly the missing packages and leaves all ~130 existing pins alone, which
keeps the reviewable diff about the thing that changed.

`latest` is how upstream extension updates get noticed, and necessarily touches every pin.

Which trigger picks which is fixed in the workflow, not passed in — each trigger has one right answer,
so no dispatch payload can talk a run out of the guarantee its trigger exists to provide:

| Trigger | Mode | Why |
| --- | --- | --- |
| Push to `main` touching `sources.json` | `pinned` | The lockfile just changed deliberately; publish exactly what it now says. |
| `repository_dispatch` (`extension-updated`) | `latest` | An extension repo is reporting that it moved. |
| Daily schedule | `latest` | The catch-all sweep for repos that never wired the dispatch. |
| Manual **Run workflow** | your choice, default `pinned` | |

The push trigger means **adding an extension publishes itself**: merge the PR that appends to
`sources.json` and the sync runs on its own. It cannot recurse — a `pinned` run's PR touches only
`packages/` and `catalog.json`, so merging it does not match the path filter, and a `latest` run's PR
does re-pin `sources.json` but the `pinned` run that follows finds the catalog already matching and
exits without opening anything.

### What still needs a database

The **paid lane** does: checkout sessions, issued entitlements, seller accounts, and subscriptions are
genuinely runtime state. Set both `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` and those switch to the
durable [`@azphalt/registry-store-vercel`](../../packages/registry-store-vercel) backend (Neon Postgres
+ private Vercel Blob). Without them the paid lane keeps its state in process memory, which is correct
for `next dev` and the tests and wrong for a deployment that sells anything.

Download tallies, ratings, and abuse reports are in the same position: process-local, reset on
redeploy. They are counters, not catalog — giving them a database is a separate decision from making
the store's *contents* durable.

`POST /api/publish` still answers **`503`** on a deployment with neither store configured, rather than
reporting a write it cannot keep. `AZPHALT_ALLOW_EPHEMERAL_PUBLISH=1` opts a throwaway preview back
in. The baked catalog is unaffected either way — it is read from disk, not from a store.

### Demo examples

`lib/catalog.ts` also carries fabricated examples (Halftone Studio, the mock model packages) covering
every `kind` and both lanes, so `next dev` and the tests have a full catalog with no network and no
services. Their payloads are placeholder bytes like `MOCK_ONNX_BYTES_DEPTH`, so serving them beside
real extensions would offer users installable packages that cannot work: production sets
`AZPHALT_DEMO_SEEDS=0`.

## A conforming repository (the normative Repository API)

Beyond its own UI-facing `/api/*` routes, the storefront **also serves the normative Repository API**
(`spec/repository-api.md`) at its canonical paths, so `azphalt.store` is a repository any app can
consume directly with [`@azphalt/repository-client`](../../packages/repository-client) — the same way a
host talks to the reference [`@azphalt/repository-server`](../repository-server):

```ts
import { RepositoryClient } from "@azphalt/repository-client";
const repo = new RepositoryClient({ url: "https://azphalt.store" });
const { packages } = await repo.search({ q: "lut" });
const bytes = await repo.download("com.foldlab.filmluts", "1.0.0"); // a free package
```

| Endpoint | What it does |
| --- | --- |
| `GET /.well-known/azphalt-repository.json` | The repository index: name/version and — when signing is on — the Ed25519 `signingKeys` a host trusts to verify this store's entitlement tokens offline. Kept cheap/static (no catalog scan); a host learns the catalog's types from `GET /packages?types=`. |
| `GET /packages` | Browse/search (`q`, `types`, `tags`, `app`, `capabilities`, `mediaDomains`, `sort`, `page`), paged, each summary carrying ranking/preview metadata and `priceStatus`. |
| `GET /packages/{id}` | Full metadata + version history + the latest manifest. |
| `GET /packages/{id}/versions/{version}/download` | The binary `.azp`. Free packages are open; a **consigned** one is gated on a Bearer entitlement — `401` without a token, `402` for a token licensing something else — the *same* authorizer the UI download route uses. |
| `GET /revocations?since=` · `POST /updates` | The host-pollable revocation feed and batch update check. |

This isn't a second implementation: the routes mount the reference server's transport-neutral
`createRepositoryHandler` (`lib/repository.ts`) onto the storefront's own `registry` + `market` +
`authorizer`, so the store and the spec **can't drift apart**. Next serves them via `beforeFiles`
rewrites (`next.config.mjs`) onto the catch-all at `app/api/repository/[[...slug]]/route.ts`.

## Pages & API

The storefront's own UI-facing routes (distinct from the normative Repository API above):

| Route | What it does |
| --- | --- |
| `/` | Two-lane explainer + popular packages (registry sorted by downloads). |
| `/search?q=…&sort=…&kind=…` | Browse + search: `registry.search` when a query is present, else `registry.list` with a sort (downloads / rating / updated / name) and a `kind` filter. |
| `/p/[id]` | Package detail: facts, capabilities, ratings, version history, preview, download — and for a `kind:"app"` companion, the install panel + handoff contract; if consigned, the price, breakdown, and Buy button. |
| `/app/[appId]` | Per-app catalog: what a host app sees — its own app-scoped companions plus globals (`registry.list({ app })`). |
| `GET /api/download/[id]` | Serves the `.azp` bytes (`application/vnd.azphalt.package` — see [`spec/package-format.md`](../../spec/package-format.md) § Media type), counting a download. Free packages are open; a **consigned** package is gated on a Bearer entitlement — `401` without a recognized token, `402` for a token that licenses something else. |
| `GET /api/preview/[id]` | Serves a package's static store-card image (`manifest.preview.image`), no download counted. |
| `POST /api/publish` | Publishes raw `.azp` bytes to the registry; returns the summary (or `400` with verification errors). |
| `POST /api/checkout` | `{ packageId, buyerId }` → starts a consignment checkout; returns the session + price breakdown. On the real path the client redirects to `session.url`. |
| `POST /api/checkout/complete` | **Dev only** (`404` unless opted in) — `{ sessionId }` → completes the stub session and returns a signed buy-once entitlement to use as `Authorization: Bearer <token>`. |
| `GET /api/checkout/session/[id]` | The buyer's fulfilment retrieval: returns the entitlement token already issued for a settled session (`200`), or `202` while fulfilment is pending. Mints nothing. |
| `GET /api/purchases?subject=…` | The buyer's "my purchases" recovery: lists every license issued to a buyer id, each with its Bearer download token (so a lost checkout token isn't a dead end). No buyer auth in this reference app; a production deploy gates it behind the buyer's session. Surfaced at `/purchases`. |
| `POST /api/webhooks/stripe` | Real fulfilment: on a signature-verified `checkout.session.completed`, mints/persists the buyer's entitlement (and records a subscription); on `invoice.paid`, renews a subscription (fresh period entitlement, idempotent on the invoice); on `customer.subscription.deleted`, stops renewing; on `account.updated`, refreshes a seller's Connect flags. |
| `POST /api/connect/onboard` | Seller onboarding: `{ sellerId }` → creates the seller's Stripe **Express** connected account (once), persists the mapping, and returns a Stripe-hosted onboarding `url` to redirect to. `404` unless Stripe is configured. |
| `GET /api/connect/status?sellerId=…` | A seller's onboarding status (`onboarded`, `chargesEnabled`, `payoutsEnabled`, `detailsSubmitted`); `refresh=1` re-reads live from Stripe. |
| `POST /api/reports` | File an abuse/quality report `{ packageId, version?, reason, detail? }` (marketplace-integrity § 2). A web report is **untrusted** — queues for review, never auto-quarantines alone. Surfaced at `/report`. |
| `GET /api/reports` | The moderation queue — every report, newest-first. No moderator auth in this reference app (the spec's `GET /reports` is authenticated). Surfaced at `/moderation`. |

## The paid lane's gate

A consigned package's bytes are gated the way `spec/repository-api.md` § Download Package describes,
using the same authorizers as the reference server (`@azphalt/registry`'s `DownloadAuthorizer`), so
the two can't drift apart. Two env vars control it:

| Variable | Effect |
| --- | --- |
| `AZPHALT_SIGNING_KEY` | PEM Ed25519 private key the storefront signs entitlements with, and trusts on the way back in. **Unset (the default) ⇒ every paid download is `401`** and issuance is off — so `next dev` and the tests need no secrets. Generate with `openssl genpkey -algorithm ed25519`. |
| `AZPHALT_ALLOW_STUB_FULFILMENT` | `1` exposes `POST /api/checkout/complete`. Anything else ⇒ `404`. |

### Real payments & storage (all optional; unset ⇒ stub + ephemeral)

| Variable | Effect |
| --- | --- |
| `AZPHALT_STRIPE_SECRET_KEY` | Switches checkout to the real Stripe Connect provider. Absent ⇒ the stub. |
| `AZPHALT_STRIPE_WEBHOOK_SECRET` | Verifies `POST /api/webhooks/stripe` signatures. Required for real fulfilment. |
| `AZPHALT_STRIPE_SUCCESS_URL` / `AZPHALT_STRIPE_CANCEL_URL` | Where Stripe returns the buyer. Point success at `…/checkout/success?session_id={CHECKOUT_SESSION_ID}`. |
| `AZPHALT_STRIPE_CONNECTED_ACCOUNTS` | **Fallback** JSON `{"<sellerId>":"acct_…"}` for a fixed roster. Checkout prefers a seller's **onboarded** account (from `/connect/onboard`, persisted in the seller-account store) and only falls back to this map; a `sellerId` resolved by neither is a hard error, not a misroute. A seller who hasn't finished onboarding (charges not enabled) is refused at checkout. |
| `DATABASE_URL` + `BLOB_READ_WRITE_TOKEN` | **Both** present ⇒ the durable Neon + Blob store for the **paid lane's** runtime state (checkout sessions, entitlements, seller accounts, subscriptions); otherwise process-local. The catalog does not depend on this — it is read from the committed `registry/` bytes either way. |
| `AZPHALT_DEMO_SEEDS` | `0` disables the fabricated demo examples, leaving only the baked catalog. Set on production deploys — the demo payloads are placeholder bytes, so serving them beside real extensions offers users packages that cannot work. |
| `AZPHALT_PACKAGE_SIGNING_KEY` | PKCS#8 PEM Ed25519 key `build-catalog` signs every package with. Unset ⇒ the catalog builds unsigned: still integrity-verified, but pinning no publisher key, so hosts cannot enforce publisher continuity on updates. Deliberately **not** `AZPHALT_SIGNING_KEY` — that one issues entitlements, a different trust role. |

To exercise the **stub** paid lane locally: set `AZPHALT_SIGNING_KEY` + `AZPHALT_ALLOW_STUB_FULFILMENT=1`,
`POST /api/checkout` to open a session, `POST /api/checkout/complete` with its `sessionId` to get a
token, then send that token to `GET /api/download/[id]`. The **real** lane instead completes on Stripe
and fulfils via the webhook; the buyer's token comes from `/checkout/success`.

> **Stub fulfilment mints licenses for payments that never happened.** With
> `AZPHALT_ALLOW_STUB_FULFILMENT=1`, anyone who can reach that route can license anything — the
> tokens are real, signed, and offline-verifiable, which is precisely what makes it unsafe to leave
> on. It demonstrates the *mechanism*, not commercial enforcement. A deployment that enables it is a
> demo, not a store.

## Run it

From the repo root (installs the whole workspace and builds the packages the storefront depends on):

```sh
pnpm install
pnpm build            # builds every package, including this app's `next build`
```

Then, from `apps/storefront`:

```sh
pnpm dev              # http://localhost:3000
# or, against the production build:
pnpm build && pnpm start
```

## Deploy (self-hosted)

The app builds to a **self-contained Node server** (`output: "standalone"`) — no platform lock-in. Package it into an uploadable bundle and run it behind your web server.

**1. Build the bundle** (from the repo root, so the workspace packages build first):

```sh
pnpm install --frozen-lockfile
pnpm --filter "@azphalt/storefront..." build      # build the workspace deps
pnpm --filter @azphalt/storefront bundle          # → apps/storefront/dist-server/
```

To serve under a **sub-path** (e.g. `example.com/azphalt`), set the base path at build time:

```sh
NEXT_BASE_PATH=/azphalt pnpm --filter @azphalt/storefront bundle
```

`dist-server/` is the whole deployable (traced `node_modules` + `.next` + `static` + `public`). It needs **Node 18+** on the host.

**2. Upload** `apps/storefront/dist-server/` to your server (SFTP/rsync).

**3. Run it** (from the uploaded `dist-server/` root):

```sh
PORT=8080 HOSTNAME=127.0.0.1 node apps/storefront/server.js
```

Keep it alive with a process manager (`pm2`, `systemd`, …).

**4. Reverse-proxy** your domain (or sub-path) to it. For `example.com/azphalt` — built with `NEXT_BASE_PATH=/azphalt`, so the app already serves under that prefix; pass it through unchanged:

```nginx
location /azphalt/ {
  proxy_pass http://127.0.0.1:8080;   # no trailing slash → path preserved
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

For a domain root or sub-domain (e.g. `azphalt.store`), build **without** `NEXT_BASE_PATH` and proxy `location /`.

*(Hosted alternative: this is a standard Next.js app, so it also deploys to Vercel/Netlify unchanged — set the project root to `apps/storefront` and the build to `pnpm --filter @azphalt/storefront... build`.)*

## License

MIT.
