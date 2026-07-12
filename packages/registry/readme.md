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

`PaymentProvider` is an interface; a real deployment plugs in a marketplace-capable, split-payout merchant-of-record (Stripe Connect and the like — see [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md) on why marketplace payout ≠ single-vendor MoR). The bundled **`StubPaymentProvider`** moves no money and exists only for local dev and tests — never deploy it.

## Status

Early. In-memory storage and a stub payment provider; the persistence and MoR backends, and the Next.js storefront (`apps/storefront`) that consumes this package, follow.
