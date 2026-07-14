# @azphalt/registry

The azphalt **registry** and **consignment marketplace** — the service layer the storefront sits on. Two lanes, kept separable (see [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md)):

- **Registry** — the free, open distribution lane: verify a `.azp` (via [`@azphalt/azp`](../azp)), index it, resolve versions (semver, with yank), serve bytes, and browse/search. No money model touches this lane, which is what keeps the standard neutral and self-hostable.
- **Marketplace** — the paid **consignment** overlay: layer a sell-through listing on a package that already lives in the registry, compute the money split, and hand the charge to a `PaymentProvider`. It is the *only* place a fee exists.

~~~ts
import { Registry, Marketplace, InMemoryStore } from "@azphalt/registry";

const store = new InMemoryStore();
const registry = new Registry(store);

// Open lane — publish & serve, free.
await registry.publish(azpBytes);            // verifies + indexes; versions are immutable
await registry.search("halftone");
const { bytes } = await registry.serve("com.you.thing"); // latest, counts a download

// Paid lane — consignment.
const market = new Marketplace(registry, store);         // SAME store as the registry
await market.listForSale("com.you.thing", "seller_1", { amountCents: 499, currency: "USD" });
const { session, breakdown } = await market.checkout("com.you.thing", "buyer_1");
//     breakdown: { gross, processorFee, platformFee, sellerNet }
~~~

## Storage

`InMemoryStore` (process memory) is the default and backs the tests. A deployment implements the `RegistryStore` interface over a database + object store — the `Registry`/`Marketplace` logic is unchanged.

## Payments

`PaymentProvider` is an interface; a real deployment plugs in a marketplace-capable, split-payout merchant-of-record (see [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md) on why marketplace payout ≠ single-vendor MoR). Two implementations ship:

- **`StubPaymentProvider`** (default) — moves no money; records sessions in memory for local dev and tests. Never deploy it.
- **`StripePaymentProvider`** — a real **Stripe Connect** backend using *destination charges*: the buyer pays the gross, the platform retains its consignment cut as an `application_fee_amount`, and the remainder transfers to the seller's connected account. It calls Stripe's REST API with `fetch` (no `stripe` SDK dependency; the `fetch` is injectable for tests).

~~~ts
import { Marketplace, StripePaymentProvider, stripeConfigFromEnv } from "@azphalt/registry";

const payments = new StripePaymentProvider(
  stripeConfigFromEnv(process.env, {
    // The marketplace owns the sellerId → Stripe connected-account mapping (recorded at onboarding).
    connectedAccountFor: (sellerId) => lookupStripeAccount(sellerId), // → "acct_…"
  }),
);
const market = new Marketplace(registry, store, { payments }); // opt in; stub stays the default
~~~

**The one human step** — going live needs credentials the operator holds, which this repo never contains:

- `AZPHALT_STRIPE_SECRET_KEY` — a live Stripe secret key (`sk_live_…`).
- `AZPHALT_STRIPE_SUCCESS_URL` / `AZPHALT_STRIPE_CANCEL_URL` — post-checkout return URLs (optional `AZPHALT_STRIPE_API_BASE` override).
- A `connectedAccountFor(sellerId) → "acct_…"` mapping of each seller's onboarded Stripe Connect account.

Without those the provider throws on construction; the storefront (`apps/storefront`) stays on `StubPaymentProvider` and moves no real money.

## Status

Both lanes work end to end: publish/verify/version/serve/search, and the consignment overlay with money-split quoting. Storage defaults to in-memory (`InMemoryStore`); a deployment implements `RegistryStore` over its own database + object store. The Stripe Connect provider is implemented (pending live keys — see above). This package is consumed by the Next.js storefront (`apps/storefront`) and fronted over HTTP by the reference [`@azphalt/repository-server`](../../apps/repository-server).
