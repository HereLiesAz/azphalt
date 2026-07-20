# Use the Store from Your App

Any app — a paint canvas, a video editor, a 3D suite, a music tool — can pull `.azp` extensions
straight from the **azphalt.store** marketplace (or any conforming repository) with a small client SDK.
`azphalt.store` implements the normative [Repository API](/specs/repository-api), so your app talks to
it the same way it would talk to any self-hosted registry — no store-specific code.

## 1. Install the client

```bash
npm install @azphalt/repository-client @azphalt/azp @azphalt/azdk
```

- **`@azphalt/repository-client`** — browse, search, and download from a repository.
- **`@azphalt/azp`** — read the `.azp` container bytes you download.
- **`@azphalt/azdk`** — the shared types (manifest, asset types, etc.).

## 2. Browse & search azphalt.store

```typescript
import { RepositoryClient } from "@azphalt/repository-client";

const store = new RepositoryClient({ url: "https://azphalt.store" });

// Everything the store carries (paged):
const { packages, total } = await store.search();

// Or filter to just what your app can actually use — say a paint app that only wants brushes & LUTs:
const brushes = await store.search({ types: ["brush", "lut"], q: "ink" });
console.log(`Found ${brushes.total} matching packs.`);
```

Each result carries ranking and preview metadata (`downloads`, `rating`, `priceStatus`, `preview`, …)
so you can render a gallery without a per-package round-trip. Read the full record — version history,
capabilities, the latest manifest — with `getPackage`:

```typescript
const detail = await store.getPackage("com.foldlab.filmluts");
```

### Scope the catalog to your app

If you pass your app's reverse-DNS id, the store returns **global** packages plus those an author scoped
to your app (`targetApps`) — the mechanism companions and app-specific extensions use:

```typescript
const store = new RepositoryClient({ url: "https://azphalt.store", app: "com.hereliesaz.graffitixr" });
```

## 3. Download a free package

Free packages are open — no auth, no fee. `download` returns the raw `.azp` bytes; read them with `readAzp`:

```typescript
import { readAzp } from "@azphalt/azp";

const bytes = await store.download("com.foldlab.filmluts", "1.0.0");
const { manifest, payload } = readAzp(bytes);
// payload["assets/portra.cube"] is the LUT, ready to load into your engine.
```

**Big files? Downloads are resumable and parallel.** When the repository supports byte ranges (it
advertises `Accept-Ranges`), `download` fetches the file in chunks — retrying any chunk that drops (so a
flaky connection resumes the exact bytes it lost instead of restarting) and running several in parallel.
This matters most for large model packs. Tune it and track progress:

```typescript
const bytes = await store.download("com.azphalt.model.sherpa-onnx", "1.0.0", {
  concurrency: 6,          // parallel range requests (default 4; 1 = sequential)
  chunkSize: 16 * 1024 * 1024,
  retries: 5,              // per-chunk retries — this is the "resume"
  signal: abortController.signal,
  onProgress: (received, total) => setProgress(received / total),
});
```

If the repository doesn't support ranges, `download` transparently falls back to a single request — same
call, same result.

## 4. Paid packages: the entitlement token

A **consigned** (paid) package's bytes are gated. The store issues a signed, offline-verifiable
**entitlement token** when a buyer completes checkout; you send it as a Bearer credential on `download`.
The gate is exactly the [Repository API](/specs/repository-api) contract:

- **`401`** — no token (or an unrecognized one): the user hasn't authenticated to the store.
- **`402`** — a real token that doesn't license *this* package: they need to buy it.
- **`200`** — a valid entitlement: the bytes.

```typescript
// After the user buys the package on the store, hand its token to the client:
store.setToken(userEntitlementToken);

try {
  const bytes = await store.download("com.hereliesaz.halftone", "1.2.0");
  // …install it…
} catch (err) {
  // The client throws on 401/402 — send the user to the store's checkout for this package.
}
```

Where the token comes from: the buyer purchases on `azphalt.store` (Stripe checkout), and the store
returns the entitlement on the success page and via **`/purchases`** (their license library). Because the
token is a signed claim — not an opaque session — your app can also **verify it offline** against the
repository's public key, published in the index (step 5). Nothing about the paid lane leaks into the free
registry: money lives only on listings.

## 5. Trust the store once (offline verification)

On first contact, read the repository index. When the store issues entitlements it advertises its Ed25519
**signing key** there; add it to your trust store and you can verify this store's tokens — and any author
it counter-signs — without a network round-trip on every download (see the spec's *Trust bootstrap*).

```typescript
const index = await store.getIndex();
// index.name, index.version, index.signingKeys?.[0]?.publicKey
```

## Reading an `.azp` you already have

You don't need the network to open a package a user dragged in — an `.azp` is a signed ZIP container:

```typescript
import { readAzp } from "@azphalt/azp";
import { readFileSync } from "node:fs";

const { manifest, payload } = readAzp(readFileSync("explosion-pack.azp"));
console.log(manifest.name, manifest.assets);
```

## Self-hosting your own repository

`azphalt.store` is one repository, not the only one — the API is neutral and self-hostable. To run your
own catalog (free or paid) that the same client consumes, stand up
[`@azphalt/repository-server`](https://github.com/HereLiesAz/azphalt/tree/main/apps/repository-server),
or adopt the standard directly — see [Adopting the Standard](/ADOPTION).

## Next

- The full contract: [Repository API](/specs/repository-api).
- Run extension **code** safely in your app: the [Capability model](/specs/capability-model) and
  [UI schema](/specs/ui-schema).
- Launch external **companion apps** over a handoff: [Companion Apps](/specs/companion-app).
