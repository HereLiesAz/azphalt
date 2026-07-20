# A durable RegistryStore (Neon Postgres + Vercel Blob)

Date: 2026-07-14
Status: Implemented (`@azphalt/registry-store-vercel`; `PaymentSessionStore` in `@azphalt/registry`)
Affects: `packages/registry`, new `packages/registry-store-vercel`, `apps/storefront`
Follows: `2026-07-14-storefront-paid-download-gate-design.md` (must land first — it decides
private-vs-public Blob)

## Problem

`apps/storefront` keeps its catalog in a process-wide `InMemoryStore`, seeded at module load. On a
single long-lived Node server that is merely a stand-in for a database. On Vercel every route
handler is a serverless function, so:

- `POST /api/publish` mutates one instance's memory. It returns `201`, and a later read may hit a
  different instance where the package does not exist. Non-deterministic, which is nastier to
  demo than reliably absent.
- Checkout sessions live in `StubPaymentProvider`'s memory, so `POST /api/checkout/complete` fails
  with "unknown checkout session" whenever it lands on a different instance than the checkout did.

Reads survive today only because every instance seeds the same catalog at module load.

`store.ts` anticipated this: *"a production deployment implements `RegistryStore` over a database +
object store without touching the `Registry`/`Marketplace` logic."*

## Design

### 1. New package: `@azphalt/registry-store-vercel`

`packages/registry-store-vercel`, depending on `@neondatabase/serverless` and `@vercel/blob`, with
`@azphalt/registry` as a peer. Exports `VercelRegistryStore`, `PostgresSessionStore`, and an
idempotent `migrate()`.

A separate package (not inside `@azphalt/registry`) keeps Vercel/Neon dependencies out of the core
package everything else depends on, and makes the store reusable by any deployment of the standard
rather than a storefront detail. Credentials are constructor config, not `process.env` reads inside
the store — the app owns env wiring, and the store stays testable.

### 2. Schema

Four tables, `jsonb` payloads mirroring the existing types rather than normalized columns, so the
schema does not drift every time a type gains a field:

| table | shape |
| --- | --- |
| `versions` | `(id, version)` PK, `metadata jsonb`, `blob_url`, `downloads bigint` |
| `listings` | `package_id` PK, `listing jsonb` |
| `revocations` | `seq bigserial` PK, `entry jsonb`, `revoked_at` (indexed desc) |
| `ratings` | `package_id` PK, `sum bigint`, `count bigint` |

`downloads` as a column gives `incrementDownloads` one atomic `UPDATE ... downloads + $n` — the
operation most likely to be raced, and the one an `InMemoryStore` read-modify-write would silently
lose. `getDownloads(id)` is then `SUM` across versions, matching `InMemoryStore`'s semantics.

Raw SQL over `@neondatabase/serverless`: it is 13 methods over 4 tables, and the SQL stays readable
for a reference implementation others will copy.

### 3. Bytes: private Blob, deterministic keys

`.azp` bytes go to Vercel Blob at `azp/{id}/{version}.azp` with `addRandomSuffix: false` and
`allowOverwrite: true`; `getBytes` fetches them server-side.

**Private, not public** — this is forced by the download gate. A public blob URL is a trivial
bypass of the `401`/`402` on `/api/download/[id]`: the bytes would be one guessable URL away, and
the gate would be decorative. This means depending on Vercel Blob private storage, which is in
public beta (see Risks).

Deterministic keys are what make `putVersion` safe without a distributed transaction. It writes the
blob, then upserts the row:

- blob write fails ⇒ nothing written.
- row write fails ⇒ an orphaned blob, and **no row pointing at missing bytes**.
- re-publish ⇒ overwrites the same key rather than stranding the old one.

The residue is always garbage-collectable, never a dangling reference. That is the right direction
to fail in, and it is why the keys must not be random.

### 4. Sessions: give the provider a storage seam

`CheckoutInput` carries `{packageId, sellerId, buyerId, amount, platformFee}`, but
`StubPaymentProvider.createCheckout` keeps only `{id, url, status, amount}` and **discards the
rest**. That discard is the root of two problems: sessions cannot survive a restart, and fulfilment
cannot tell what a session was for — which is why the gate PR had to add a `sessionSubjects` map in
`lib/catalog.ts`.

Add a `PaymentSessionStore` to `@azphalt/registry`:

```ts
export interface PaymentSessionStore {
  /** Persist a session and the input it was created from. */
  put(session: CheckoutSession, input: CheckoutInput): Promise<void>;
  /** A session and its originating input, or undefined. */
  get(id: string): Promise<{ session: CheckoutSession; input: CheckoutInput } | undefined>;
  /** Replace a session's status (fulfilment / cancellation). */
  setStatus(id: string, status: CheckoutSession["status"]): Promise<CheckoutSession | undefined>;
}
```

`StubPaymentProvider` takes one, defaulting to an in-memory implementation — so its behavior is
unchanged for every existing caller and test. `@azphalt/registry-store-vercel` supplies
`PostgresSessionStore` (a `sessions` table: `id` PK, `session jsonb`, `input jsonb`).

Two consequences worth stating:

- `sessionSubjects` in `lib/catalog.ts` **is deleted**. The provider now remembers what the gate PR
  had to remember on its behalf. Fulfilment reads the package and buyer from the stored input, so
  it still never trusts the request body.
- Session ids must stop being `stub_cs_${++this.seq}` — a per-process counter collides across
  serverless instances, and colliding ids across buyers would hand one buyer another's entitlement.
  Generate with `crypto.randomUUID()`.

The second point is a real bug that only appears once sessions are shared, and it is the reason
this cannot be a pure storage swap.

### 5. Store selection and seeding

`getCatalog()` picks the backend: `DATABASE_URL` **and** `BLOB_READ_WRITE_TOKEN` both present ⇒
`VercelRegistryStore` + `PostgresSessionStore`; otherwise `InMemoryStore` + in-memory sessions +
module-load seeding, exactly as today. `next dev` and `vitest` keep working with no services and no
credentials.

Seeding must leave module load. It calls `registry.publish`, which **rejects duplicate versions**,
so against a durable store every cold instance would re-seed and throw, and two instances racing an
empty store would both publish.

Instead: `pnpm --filter @azphalt/storefront seed` runs `migrate()` then publishes only ids not
already present — idempotent and re-runnable. `lib/catalog.ts` splits "build the example packages"
(pure) from "seed a registry with them", so dev seeding and the seed script share one path.

### 6. Tests

A shared `RegistryStore` contract suite, run against `InMemoryStore` always and
`VercelRegistryStore` when `DATABASE_URL` is set (skipped otherwise, with a `log` line — a silently
skipped suite reads as passing). This is what actually proves the durable store is a faithful
substitute rather than merely type-compatible.

Specific cases beyond the interface's happy path:

- `incrementDownloads` under concurrency totals correctly (the atomic-`UPDATE` claim).
- `putVersion` twice for one `(id, version)` overwrites rather than duplicating.
- `getVersions`/`allPackageIds` on an unknown id return empty, not throw.
- `getRating` with no ratings returns `{ratingCount: 0}`.
- Session ids from two provider instances do not collide.

## Non-goals

- **The Vercel deploy itself.** Config is verified; it needs an account.
- **A real payment provider.** The stub moves no money. Persisting its sessions makes the demo work
  across instances; it does not make it a store.
- **Blob garbage collection** for orphans from a failed row write. Rare, harmless, and a cleanup
  job is its own piece of work.

## Risks

- **Vercel Blob private storage is in public beta.** Load-bearing here, since the gate rules out
  public blobs. If it regresses or its API shifts, the fallback is bytes in Postgres `bytea` —
  simpler and ACID, but a known anti-pattern once packages are multi-MB. Verify the `put`/`get`
  signatures against current docs at implementation time.
- **A durable store makes stub fulfilment more dangerous.** Today a self-issued license dies with
  the process. Persisted, it survives — so `AZPHALT_ALLOW_STUB_FULFILMENT=1` on a deployment now
  mints *lasting* licenses. The env gate matters more after this lands, not less.
- **Neon free tier limits** (0.5GB). Fine for the seeded demo catalog.
- **Cost of provisioning** two Marketplace/first-party resources on the user's Vercel account.
