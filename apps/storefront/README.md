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

## Storage: ephemeral by default, durable (Neon + Blob) when configured

The catalog defaults to a process-local store ([`lib/catalog.ts`](lib/catalog.ts)), seeded once at
module load with real example `.azp` packages built via `@azphalt/azp`'s `writeAzp` — genuine registry
data published through the same verify-and-index path a real upload takes, needing no database or
credentials. Set **both** `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` and it switches to the durable
[`@azphalt/registry-store-vercel`](../../packages/registry-store-vercel) backend (Neon Postgres +
private Vercel Blob), so the catalog, listings, checkout sessions, and issued entitlements survive
restarts and are shared across serverless instances. Seed a durable store out-of-band (seeding at
module load would have every cold instance re-`publish` and throw):

```sh
DATABASE_URL=… BLOB_READ_WRITE_TOKEN=… pnpm --filter @azphalt/storefront seed
```

## Pages & API

| Route | What it does |
| --- | --- |
| `/` | Two-lane explainer + popular packages (registry sorted by downloads). |
| `/search?q=…&sort=…&kind=…` | Browse + search: `registry.search` when a query is present, else `registry.list` with a sort (downloads / rating / updated / name) and a `kind` filter. |
| `/p/[id]` | Package detail: facts, capabilities, ratings, version history, preview, download — and for a `kind:"app"` companion, the install panel + handoff contract; if consigned, the price, breakdown, and Buy button. |
| `/app/[appId]` | Per-app catalog: what a host app sees — its own app-scoped companions plus globals (`registry.list({ app })`). |
| `GET /api/download/[id]` | Serves the `.azp` bytes (`application/zip`), counting a download. Free packages are open; a **consigned** package is gated on a Bearer entitlement — `401` without a recognized token, `402` for a token that licenses something else. |
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
| `DATABASE_URL` + `BLOB_READ_WRITE_TOKEN` | **Both** present ⇒ the durable Neon + Blob store; otherwise the process-local store. |

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
