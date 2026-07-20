---
"@azphalt/registry": minor
"@azphalt/registry-store-vercel": minor
"@azphalt/repository-client": minor
---

Add resumable, concurrent downloads over HTTP byte ranges. `@azphalt/registry` gains
`Registry.serveRange` (+ `RangeNotSatisfiableError`, `ByteRangeSpec`) and two optional `RegistryStore`
methods, `getByteSize` / `getByteRange`, implemented on `InMemoryStore`; a ranged read does not count a
download. `@azphalt/registry-store-vercel` implements both against Blob (`head` for size, a `Range`
fetch for the window) so a chunked download doesn't pull the whole object per chunk. The reference
server's download endpoint now answers `Range` with `206 Partial Content` (+ `Content-Range`,
`Accept-Ranges`), `416` for an unsatisfiable range, and advertises `Accept-Ranges` on full responses —
with the paid gate still enforced first. `@azphalt/repository-client.download()` fetches in parallel
chunks with per-chunk retry (resuming the exact bytes lost on a dropped connection), reassembles in
order, and falls back to a single request when the server has no range support; new `DownloadOptions`
(`concurrency`, `chunkSize`, `retries`, `signal`, `onProgress`).
