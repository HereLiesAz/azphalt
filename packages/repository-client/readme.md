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

- `new RepositoryClient({ url, token?, app? })` — `app` is this host app's reverse-DNS id; when set, search results are scoped to it (global packages plus those whose `targetApps` include it).
- `setToken(token)` — set or replace the Bearer token.
- `getIndex()` → the repository's discovery document (`RepositoryIndex`).
- `search({ q?, types?, tags?, page?, kind?, app? })` → a paginated `PackageSearchResponse`. `kind` is a list of package kinds to keep (e.g. `["asset"]` for a host with no code sandbox, `["app"]` for a host directory); `app` overrides the client's `app` for this call.
- `getPackage(id)` → the package's manifest / detail.
- `getPack(id)` → the `PackManifest` of a `kind: "pack"` extension pack (read from the detail's nested `manifest`, or a flat body). Throws if `id` is not a pack.
- `resolvePack(id)` → `{ entries: ResolvedPackEntry[] }`: each pack member with a concrete `version` (its pinned one, or the member's `latest` / `version` from the repository), plus `name` and `priceStatus` when looked up. Members are resolved concurrently; each still needs its own `download` and licence.
- `download(id, version, opts?)` → the binary `.azp` as a `Uint8Array`. It fetches in HTTP `Range` windows and retries failed chunks, so an interrupted download resumes the lost bytes; if the repository ignores `Range` (answers `200`), the whole file comes back in the first response. `DownloadOptions`:
  - `concurrency` — chunks fetched in parallel (default `4`; `1` is sequential). Only used when the repository supports ranges.
  - `chunkSize` — bytes per chunk (default 8 MiB).
  - `retries` — per-chunk retries on a network error or `5xx`, with exponential backoff (default `3`).
  - `signal` — an `AbortSignal` that aborts the whole download.
  - `onProgress(received, total)` — called as bytes arrive.

Types (`RepositoryIndex`, `PackageSummary`, `PackageSearchResponse`, `PackManifest`) come from [`@azphalt/azdk`](../sdk). Verify downloaded bytes with [`@azphalt/azp`](../azp)'s `verifyAzp` before use.
