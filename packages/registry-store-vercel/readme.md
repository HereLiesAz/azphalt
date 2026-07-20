# @azphalt/registry-store-vercel

A durable backend for [`@azphalt/registry`](../registry) over **Neon Postgres** (metadata, listings,
checkout sessions, issued entitlements) and **Vercel Blob** (`.azp` bytes). Drop it in wherever a
deployment needs state to survive restarts and serverless fan-out — the `Registry`/`Marketplace`
logic never changes, only where state lives. The cloud dependencies live only here, behind an
`@azphalt/registry` peer, so the core package everything else builds on stays dependency-light.

```ts
import { createVercelStores } from "@azphalt/registry-store-vercel";
import { Registry, Marketplace, StubPaymentProvider } from "@azphalt/registry";

const { store, sessions, entitlements, migrate } = createVercelStores({
  connectionString: process.env.DATABASE_URL!,
  blobToken: process.env.BLOB_READ_WRITE_TOKEN!,
});
await migrate(); // idempotent; safe to re-run

const registry = new Registry(store);
const market = new Marketplace(registry, store, {
  payments: new StubPaymentProvider({ sessions }),
});
```

## What it provides

| Export | Implements | Backing |
| --- | --- | --- |
| `VercelRegistryStore` | `RegistryStore` | Neon + private Blob |
| `PostgresSessionStore` | `PaymentSessionStore` | Neon |
| `PostgresEntitlementStore` | `EntitlementStore` | Neon |
| `migrate(sql)` / `createVercelStores(...).migrate()` | — | Neon (idempotent DDL) |

## Bytes go to **private** Blob

`.azp` bytes are written at a deterministic key `azp/{id}/{version}.azp` with `addRandomSuffix: false`
and `allowOverwrite: true`. Access is **private** by default and must stay so where the paid-download
gate is in force: a public blob URL is one guessable request away from the bytes, which would make the
`401`/`402` on the download route decorative. `getBytes` fetches server-side with the store's token.

Deterministic keys make `putVersion` safe without a distributed transaction: it writes the blob, then
the row. A blob failure writes nothing; a row failure leaves an orphaned (garbage-collectable) blob
but **never a row pointing at missing bytes**; a re-publish overwrites the same key.

## Credentials are config, not ambient

Every constructor takes its connection string / token as an argument — the store never reads
`process.env`. The app owns env wiring, and the store stays testable.

## Non-goals

- **The Vercel/Neon deploy itself** — this package is the code; provisioning needs an account.
- **Blob orphan GC** for the rare torn write — harmless residue; a cleanup job is separate work.
