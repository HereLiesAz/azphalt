# Repository API Standard

The `azphalt` Repository API defines a standard HTTP/REST interface that allows any backend to act as a discovery and distribution catalog for `.azp` extensions.

## Standard Endpoints

### 1. Repository Discovery
`GET /.well-known/azphalt-repository.json`

Provides global metadata about the repository, its supported API versions, and its authentication protocol.

**Response (200 OK):**
```json
{
  "name": "Official SFX Library",
  "version": "0.1",
  "description": "High-quality sound effects for video editors.",
  "auth": {
    "type": "oauth2",
    "url": "https://sfx.example.com/oauth/authorize"
  }
}
```

### 2. Search Packages
`GET /packages`

Queries the repository for available packages. Host applications should use query parameters to filter results.

**Query Parameters:**
- `q` (string): Text search query.
- `types` (string): Comma-separated list of `AssetType`s to filter by (e.g., `types=brush,vector`).
- `tags` (string): Comma-separated list of tags to filter by.
- `app` (string): The requesting host app's reverse-DNS id, for **app scoping** (see below).
- `page` (integer): For pagination.

**Response (200 OK):**
```json
{
  "packages": [
    {
      "id": "com.sfx.explosions-pack",
      "name": "Cinematic Explosions",
      "author": "SFX Studio",
      "version": "1.2.0",
      "types": ["audio"],
      "priceStatus": "paid",
      "targetApps": []
    }
  ],
  "total": 1,
  "page": 1,
  "pages": 1
}
```

**App scoping.** A package MAY declare `targetApps` in its manifest (a list of reverse-DNS host-app ids). A package with an empty/absent `targetApps` is **global** — visible to every app. A package with a non-empty `targetApps` is **app-scoped** — a repository MUST show it in browse/search **only** when the request's `app` matches one of its `targetApps`. When `app` is omitted, no scoping filter is applied (every package is returned). This lets a host app publish store entries meant only for its own users while the same registry serves other apps. Scoping is a **discovery** filter, not access control: a caller that already knows a package's `id` MAY still fetch its details and bytes.

### 3. Get Package Details
`GET /packages/{id}`

Retrieves the full metadata and history for a specific package, including the JSON `Manifest`.

### 4. Download Package
`GET /packages/{id}/versions/{version}/download`

Downloads the binary `.azp` payload. 

**Authentication Requirement:**
If a package is marked `priceStatus: "paid"`, the host application must provide a Bearer token in the `Authorization` header. 
If the token is missing or invalid, or the user does not have a license, the server MUST return standard HTTP `401 Unauthorized` or `402 Payment Required`.

**Response (200 OK):**
Headers: `Content-Type: application/x-azphalt`
Body: (binary fflate archive)

## Reference implementation

A working reference server ships as [`@azphalt/repository-server`](../apps/repository-server) — a thin facade over [`@azphalt/registry`](../packages/registry) that implements every endpoint above (discovery, search, detail, and the `401`/`402`-gated download). It is tested end-to-end against [`@azphalt/repository-client`](../packages/repository-client), so the two sides of the standard are known to agree.
