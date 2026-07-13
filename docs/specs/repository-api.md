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
      "priceStatus": "paid"
    }
  ],
  "total": 1,
  "page": 1,
  "pages": 1
}
```

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

A working reference server ships as `@azphalt/repository-server` — a thin facade over `@azphalt/registry` that implements every endpoint above (discovery, search, detail, and the `401`/`402`-gated download). It is tested end-to-end against `@azphalt/repository-client`, so the two sides of the standard are known to agree.
