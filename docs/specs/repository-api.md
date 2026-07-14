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
  },
  "signingKeys": [
    { "publicKey": "MCowBQYDK2VwAyEA…", "keyId": "reg-2026", "label": "Official SFX Library" }
  ]
}
```

**Trust bootstrap.** `signingKeys` publishes the registry's Ed25519 signing public key(s) (base64 SPKI DER). A host adds them to its trust store on first contact — trusting the registry **once** — and thereby (a) transitively trusts every author the registry counter-signs (see package-format.md § Signing) and (b) can verify the registry's buy-once **entitlement tokens** offline (see § Download). Reference: `@azphalt/azp`'s `trustStoreFromKeys(index.signingKeys)` → `verifyTrust`. Key distribution over TLS from the well-known URL is the bootstrap; a host MAY additionally pin keys out-of-band.

### 2. Search Packages
`GET /packages`

Queries the repository for available packages. Host applications should use query parameters to filter results.

**Query Parameters:**
- `q` (string): Text search query.
- `types` (string): Comma-separated list of `AssetType`s to filter by (e.g., `types=brush,vector`).
- `tags` (string): Comma-separated list of tags to filter by.
- `app` (string): The requesting host app's reverse-DNS id, for **app scoping** (see below).
- `capabilities` (string): Comma-separated capabilities the **host can grant**. Keeps only packages whose required capabilities are a **subset** — i.e. packages the host could actually run (a paint host won't surface an extension needing `audio`).
- `mediaDomains` (string): Comma-separated media domains the host can run (`image` / `video` / `audio` / `3d` / `model` / `font`). Keeps packages whose domains **intersect** the set (see **Media domains** below).
- `sort` (string): `popular` (downloads, default) · `recent` (last update) · `rating` · `name`.
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
      "targetApps": [],
      "downloads": 5231,
      "rating": 4.7,
      "ratingCount": 88,
      "updatedAt": "2026-05-02T12:00:00Z",
      "byteSize": 4194304,
      "mediaDomains": ["audio"],
      "preview": { "image": "preview/card.png", "clip": "https://cdn.example.com/explosions.mp4" }
    }
  ],
  "total": 1,
  "page": 1,
  "pages": 1
}
```

The ranking/preview fields (`downloads`, `rating`, `ratingCount`, `updatedAt`, `byteSize`, `mediaDomains`, `preview`) let a gallery **rank, sort, and preview without downloading or executing** a package. `rating`/`ratingCount` are present only when the repository tracks ratings; everything else is always computed. A repository MAY omit any optional field it does not track.

**App scoping.** A package MAY declare `targetApps` in its manifest (a list of reverse-DNS host-app ids). A package with an empty/absent `targetApps` is **global** — visible to every app. A package with a non-empty `targetApps` is **app-scoped** — a repository MUST show it in browse/search **only** when the request's `app` matches one of its `targetApps`. When `app` is omitted, no scoping filter is applied (every package is returned). This lets a host app publish store entries meant only for its own users while the same registry serves other apps. Scoping is a **discovery** filter, not access control: a caller that already knows a package's `id` MAY still fetch its details and bytes.

**Media domains.** Each summary carries `mediaDomains`, a coarse set drawn from `image` / `video` / `audio` / `3d` / `model` / `font`, derived from the package's asset types **and** capabilities: raster capabilities (`canvas`/`layers`/`bitmap`/`selection`/`color`) imply `image`; `time` and a `transitions` contribution imply `video`; `audio` implies `audio`; asset types map per their nature (a LUT and a shader span `image` **and** `video`, a mesh is `3d`, an `onnx` model is `model`, and so on). The `mediaDomains` query keeps a package when its domains **intersect** the host's — a video/audio host (`mediaDomains=video,audio`) keeps a LUT (`image,video`) and audio SFX but drops a paint-only brush (`image`). This is a discovery filter, letting a host avoid surfacing extensions it structurally cannot run.

**Static previews.** A package MAY set a top-level `preview` in its manifest — `{ "image"?, "clip"? }`, each an in-package path or an `https:` URL. `image` is a still for the store card (a LUT swatch, brush stroke, shader still); `clip` is an optional short motion preview for time-based packages (`transition` / `motion` / `video`). The repository surfaces `preview` in the search response so a host can render a browse grid **without downloading or executing** the package. Previews are advisory metadata, never a substitute for verifying the `.azp` before use.

### 3. Get Package Details
`GET /packages/{id}`

Retrieves the full metadata and history for a specific package, including the JSON `Manifest`.

### 4. Download Package
`GET /packages/{id}/versions/{version}/download`

Downloads the binary `.azp` payload. 

**Authentication Requirement:**
If a package is marked `priceStatus: "paid"`, the host application must provide a Bearer token in the `Authorization` header. 
If the token is missing or invalid, or the user does not have a license, the server MUST return standard HTTP `401 Unauthorized` or `402 Payment Required`.

**Buy-once entitlements (offline-verifiable).** For a **perpetual, buy-once** purchase, the Bearer token MAY be a **registry-signed entitlement token** rather than a session token — so a host verifies the license **locally**, with no per-open phone-home (footage never leaves the device). The token is `{ claims, signature, publicKey }`:

```json
{
  "claims": { "packageId": "com.sfx.explosions-pack", "subject": "user_42", "kind": "perpetual", "issuedAt": "2026-06-01T00:00:00Z", "keyId": "reg-2026" },
  "signature": "base64-ed25519-over-canonical-claims",
  "publicKey": "base64-spki-of-the-registry-key"
}
```

The registry issues it (Ed25519 over the canonical claims) at purchase; the host verifies it against a registry key from § Trust bootstrap. It is **valid** when the signature verifies, the issuer key is trusted, the token isn't expired (a `perpetual` token never is; a `subscription` carries `expiresAt`), and `claims.packageId` matches the requested package. The server-side gate maps the same verdict to the `401`/`402`/`200` above: a validly-signed token from a trusted registry is an authenticated identity (`402` if it doesn't cover this package or has expired), anything else is `401`. Reference: `@azphalt/registry`'s `issueEntitlement` / `verifyEntitlement`, wired into the reference server's `EntitlementAuthorizer`. This reuses the same Ed25519 trust plumbing as package signing — no new cryptography.

**Response (200 OK):**
Headers: `Content-Type: application/x-azphalt`
Body: (binary fflate archive)

### 5. Revocations Feed
`GET /revocations`

A host-pollable feed of package **versions pulled after publish** (a bad or malicious version yanked post-release). A host that has **already installed** a package has no other way to learn it was later revoked; it polls this endpoint — optionally `?since=<ISO-8601>` for only entries after its last check — and can then warn the user or disable the extension it previously trusted. This closes the post-install security gap and dovetails with the signature/trust model: a revoked version a host had counter-signed can be surfaced and quarantined.

**Query Parameters:**
- `since` (string, optional): ISO-8601 instant; return only revocations strictly **after** it.

**Response (200 OK):**
```json
{
  "revocations": [
    { "id": "com.sfx.explosions-pack", "version": "1.1.0", "reason": "malware", "revokedAt": "2026-06-01T09:30:00Z" }
  ]
}
```

Entries are newest-first. `reason` is optional. A per-version `yanked` flag is also present in the version history from `GET /packages/{id}`; the feed is the efficient way for an installed host to discover revocations it wasn't watching for.

## Reference implementation

A working reference server ships as `@azphalt/repository-server` — a thin facade over `@azphalt/registry` that implements every endpoint above (discovery, search, detail, and the `401`/`402`-gated download). It is tested end-to-end against `@azphalt/repository-client`, so the two sides of the standard are known to agree.
