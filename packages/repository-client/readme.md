# @azphalt/repository-client

A small client SDK for the azphalt [Repository API](../../spec/repository-api.md) — the standard HTTP interface any backend can expose so a host can discover and download `.azp` extensions. It's the caller side of [`@azphalt/repository-server`](../../apps/repository-server); the two are tested against each other end-to-end.

## Use it

~~~ts
import { RepositoryClient } from "@azphalt/repository-client";

const client = new RepositoryClient({ url: "https://packages.example.com" });

const index = await client.getIndex();               // GET /.well-known/azphalt-repository.json
const results = await client.search({ types: ["lut"], q: "cinematic", page: 1 });
const manifest = await client.getPackage("com.example.grade");
const bytes = await client.download("com.example.grade", "1.2.0"); // the raw .azp
~~~

## Paid packages

If a package is marked `priceStatus: "paid"`, the download needs a Bearer token. Pass one at construction or set it later:

~~~ts
const client = new RepositoryClient({ url, token: "…" });
client.setToken("…"); // e.g. after an OAuth exchange
~~~

`download()` throws a clear error on **401 Unauthorized** (missing/invalid token) and **402 Payment Required** (no license), matching the spec's gating.

## API

- `getIndex()` → the repository's discovery document (`RepositoryIndex`).
- `search({ q?, types?, tags?, page? })` → a paginated `PackageSearchResponse`.
- `getPackage(id)` → the package's manifest / detail.
- `download(id, version)` → the binary `.azp` as a `Uint8Array`.

Types (`RepositoryIndex`, `PackageSummary`, `PackageSearchResponse`) come from [`@azphalt/azdk`](../sdk). Verify downloaded bytes with [`@azphalt/azp`](../azp)'s `verifyAzp` before use.
