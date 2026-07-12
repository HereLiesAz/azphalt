# @azphalt/storefront

The **azphalt consignment storefront** — a Next.js (App Router) app that sits on top of the open azphalt standard, the way a store sits on Open VSX. It consumes the `@azphalt/registry` package directly and demonstrates both lanes of the marketplace model (see [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md) § _The marketplace — consignment model_):

- **The registry lane** — free, open distribution. Browse, search, and download `.azp` packages. No payment rails, no fee. This is the layer other apps adopt, and it is self-hostable and neutral by construction.
- **The consignment lane** — the paid overlay, and the _only_ place a fee exists. A creator consigns a package; the storefront handles checkout and shows the honest money split (gross → processor fee, platform fee → seller net). The fee never leaks into the registry.

## Payments are stubbed (dev only)

This storefront wires the marketplace to `@azphalt/registry`'s bundled **`StubPaymentProvider`**, which records checkout sessions in memory and **never contacts a payment processor, holds funds, or moves money**. Every "purchase" is simulated and clearly labelled as such in the UI and the API responses (`"stub": true`). A production deployment swaps in a marketplace-capable, split-payout merchant-of-record. **Do not read anything here as a real payment.**

## No database, no network

The catalog lives entirely in an in-memory registry ([`lib/catalog.ts`](lib/catalog.ts)), seeded once at module load with a handful of real example `.azp` packages built via `@azphalt/azp`'s `writeAzp` — genuine registry data published through the same verify-and-index path a real upload takes. There are no external fonts, CDNs, analytics, or network calls at build or runtime.

## Pages & API

| Route | What it does |
| --- | --- |
| `/` | Two-lane explainer + popular packages (registry sorted by downloads). |
| `/search?q=…` | `registry.search` results. |
| `/p/[id]` | Package detail: facts, capabilities, version history, download, and — if consigned — the price, breakdown, and Buy button. |
| `GET /api/download/[id]` | Serves the `.azp` bytes (`application/zip`), counting a download. |
| `POST /api/publish` | Publishes raw `.azp` bytes to the registry; returns the summary (or `400` with verification errors). |
| `POST /api/checkout` | `{ packageId, buyerId }` → starts a (stubbed) consignment checkout; returns the session + price breakdown. |

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

## License

MIT.
