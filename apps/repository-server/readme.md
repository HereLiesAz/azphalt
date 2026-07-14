# @azphalt/repository-server

A **reference implementation** of the azphalt [Repository API](../../spec/repository-api.md) — the standard HTTP interface any backend can expose so hosts can discover and download `.azp` extensions. It is a thin facade over [`@azphalt/registry`](../../packages/registry): the registry does the verifying, indexing, versioning, and byte-serving; this app speaks the wire format.

It is the server counterpart to [`@azphalt/repository-client`](../../packages/repository-client) — the two are tested against each other end-to-end.

## Endpoints

| Method & path | Returns |
| --- | --- |
| `GET /.well-known/azphalt-repository.json` | The repository index (name, version, auth). |
| `GET /packages?q=&types=&tags=&app=&page=` | Paginated search/browse. `types` is a comma list of `AssetType`s; `tags` AND-filters over searchable text; `app` scopes results to a host app (see below). |
| `GET /packages/{id}` | Full metadata, version history, and the latest `Manifest`. |
| `GET /packages/{id}/versions/{version}/download` | The binary `.azp` (`Content-Type: application/x-azphalt`). Gated for paid packages. |

## App scoping

A package can declare `targetApps` (reverse-DNS host-app ids) in its manifest. A package with no `targetApps` is **global**; one with `targetApps` is shown in browse/search **only** when the request's `?app=<id>` matches. So a host app can name itself and publish store entries that surface only to its own users, while the same registry serves every other app. It's a discovery filter, not access control — a caller with the `id` can still fetch details/bytes. Pass the app from the client via `new RepositoryClient({ url, app: "com.you.app" })`.

## Free vs. paid

The free/paid split is the [`Marketplace`](../../packages/registry) overlay, kept separate exactly as the rest of the standard keeps it — money lives only on listings, never in the open registry. A package with an **active listing** is `paid`; its download runs through a `DownloadAuthorizer`:

- no / unrecognized token ⇒ **401 Unauthorized**
- recognized identity without a license for this package ⇒ **402 Payment Required**
- licensed ⇒ **200** with the bytes

Everything without a listing is `free` and served unconditionally. `InMemoryAuthorizer` is a working default (`registerToken`, `grantLicense`); a real deployment plugs in its own accounts/entitlements service.

## Use it

~~~ts
import { Registry, Marketplace, InMemoryStore } from "@azphalt/registry";
import { createRepositoryServer, InMemoryAuthorizer } from "@azphalt/repository-server";

const store = new InMemoryStore();
const registry = new Registry(store);
const marketplace = new Marketplace(registry, store);
await registry.publish(azpBytes);                          // open lane
await marketplace.listForSale("com.you.paid", "seller", { amountCents: 900, currency: "USD" });

const authorizer = new InMemoryAuthorizer().grantLicense("tok", "com.you.paid");
createRepositoryServer({ registry, marketplace, authorizer, index: { name: "My Repo", version: "0.1" } })
  .listen(8787);
~~~

The protocol logic is a transport-neutral `createRepositoryHandler(req) → res`; `createRepositoryServer` mounts it on Node's `http`, but the handler can back any transport.

## Run the demo

A seeded, runnable server (one free package, one consigned package with a demo license):

~~~sh
pnpm --filter @azphalt/repository-server build
PORT=8787 node apps/repository-server/dist/main.js

curl localhost:8787/packages
curl -H "Authorization: Bearer demo-license" \
  localhost:8787/packages/com.demo.paidlut/versions/1.0.0/download -o pack.azp
~~~

Everything is in memory and the token is hard-coded — a demo, not a deployment. A real repository backs the registry with a database + object store and the authorizer with its own entitlements service.
