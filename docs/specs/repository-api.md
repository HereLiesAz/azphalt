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
  "supportedTypes": ["audio", "lut", "transition"],
  "profiles": ["video-audio"],
  "signingKeys": [
    { "publicKey": "MCowBQYDK2VwAyEA…", "keyId": "reg-2026", "label": "Official SFX Library" }
  ]
}
```

**Trust bootstrap.** `signingKeys` publishes the registry's Ed25519 signing public key(s) (base64 SPKI DER). A host adds them to its trust store on first contact — trusting the registry **once** — and thereby (a) transitively trusts every author the registry counter-signs (see package-format.md § Signing) and (b) can verify the registry's buy-once **entitlement tokens** offline (see § Download). Reference: `@azphalt/azp`'s `trustStoreFromKeys(index.signingKeys)` → `verifyTrust`. Key distribution over TLS from the well-known URL is the bootstrap; a host MAY additionally pin keys out-of-band.

**Supported types and profiles.** Two optional fields let a host decide whether a repository is worth talking to **before** it browses:
- `supportedTypes` — the `assets[].type`s this repository serves (a subset of the SDK `AssetType` union). The discovery-time analog of the `GET /packages?types=` filter: a paint host seeing only `["audio","transition"]` knows there's nothing for it here.
- `profiles` — the conformance **host profiles** the catalog targets (the same vocabulary a host declares via `@azphalt/conformance` — the blessed set is `"image"`, `"video-audio"`, `"companion"`, and `"mcp"`). A host reads it to confirm the registry's packages match a profile it implements (azphalt #27 items 5 & 7 — the registry side of package↔host compatibility). A registry that carries `kind:"app"` **companion** packages (`companion-app.md`) advertises `"companion"` so only a host that implements the handoff runtime browses for them; companions are almost always **app-scoped** (below), so a host also passes its own `app` id. A registry that carries `kind:"mcp"` **MCP-server** packages (`mcp-server.md`) advertises `"mcp"` so only a host that implements an MCP client browses for them.

Both are advisory hints; absent means "unspecified — query to learn". They never replace verifying an individual `.azp` before use.

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
      "nameLocalized": { "en": "Cinematic Explosions", "es": "Explosiones Cinematográficas" },
      "descriptionLocalized": { "en": "High-quality SFX…", "es": "Efectos de sonido…" },
      "author": "SFX Studio",
      "version": "1.2.0",
      "latest": "1.2.0",
      "kind": "asset",
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

**Kind.** Each summary carries `kind` (`"asset"` · `"code"` · `"mixed"` · `"app"` · `"mcp"`), so a host tells package classes apart straight from the browse list. A companion host filtering an app-scoped catalog (below) to the `companion` profile keeps the `kind:"app"` entries — no per-package detail round-trip to learn a package is a **companion** (`companion-app.md`). The `app` block (platforms + handoffs) itself is not in the summary; a host reads it from the package's detail (`GET /packages/{id}` → `manifest.app`) before offering a handoff.

**App scoping.** A package MAY declare `targetApps` in its manifest (a list of reverse-DNS host-app ids). A package with an empty/absent `targetApps` is **global** — visible to every app. A package with a non-empty `targetApps` is **app-scoped** — a repository MUST show it in browse/search **only** when the request's `app` matches one of its `targetApps`. When `app` is omitted, no scoping filter is applied (every package is returned). This lets a host app publish store entries meant only for its own users while the same registry serves other apps. Scoping is a **discovery** filter, not access control: a caller that already knows a package's `id` MAY still fetch its details and bytes. Companion (`kind:"app"`) packages are almost always app-scoped — a `capture-stencil` companion belongs to its host's store, not everyone's.

**Media domains.** Each summary carries `mediaDomains`, a coarse set drawn from `image` / `video` / `audio` / `3d` / `model` / `font`, derived from the package's asset types **and** capabilities: raster capabilities (`canvas`/`layers`/`bitmap`/`selection`/`color`) imply `image`; `time` and a `transitions` contribution imply `video`; `audio` implies `audio`; asset types map per their nature (a LUT and a shader span `image` **and** `video`, a mesh is `3d`, an `onnx` model is `model`, and so on). The `mediaDomains` query keeps a package when its domains **intersect** the host's — a video/audio host (`mediaDomains=video,audio`) keeps a LUT (`image,video`) and audio SFX but drops a paint-only brush (`image`). This is a discovery filter, letting a host avoid surfacing extensions it structurally cannot run.

**Static previews.** A package MAY set a top-level `preview` in its manifest — `{ "image"?, "clip"? }`, each an in-package path or an `https:` URL. `image` is a still for the store card (a LUT swatch, brush stroke, shader still); `clip` is an optional short motion preview for time-based packages (`transition` / `motion` / `video`). The repository surfaces `preview` in the search response so a host can render a browse grid **without downloading or executing** the package. Previews are advisory metadata, never a substitute for verifying the `.azp` before use.

**Localized strings.** The flat `name` / `description` are single-language and **always present** (the fallback). A package MAY additionally carry `nameLocalized` / `descriptionLocalized` — a **BCP-47 language-tag → string** map (sourced from the same-named optional manifest fields) — and the repository surfaces them on each summary and on the detail object. A localized host picks the entry matching the user's locale (with sensible fallback, e.g. `es-MX` → `es` → the flat field). Absent means "only the flat string is available". This is the registry surface of the localization open question in `extension-manifest.md` / `ui-schema.md`.

**`latest`.** Each summary carries `latest` — the **newest installable version's** semver — so a host doesn't re-implement version precedence over `versions[]`. In a summary it equals `version`; it is also surfaced on the detail object (below), where the full history is present.

### 3. Get Package Details
`GET /packages/{id}`

Retrieves the full metadata and history for a specific package, including the JSON `Manifest`. The response carries a top-level **`latest`** (the newest installable version's semver, disambiguating the `versions[]` history), the flat `name` / `description`, and the optional `nameLocalized` / `descriptionLocalized` maps (see § Localized strings).

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
Headers: `Content-Type: application/x-azphalt`, `Accept-Ranges: bytes`
Body: (binary fflate archive)

**Range requests (resumable & parallel downloads).** A server SHOULD support HTTP byte ranges so a
host can resume an interrupted transfer and fetch a large `.azp` (e.g. a multi-hundred-MB model) as
several parallel chunks:

- Every full `200` response advertises `Accept-Ranges: bytes`.
- A `Range: bytes=start-end` (also `bytes=start-` and the suffix form `bytes=-N`) request returns
  `206 Partial Content` with `Content-Range: bytes start-end/total` and only the requested bytes. The
  **paid gate runs first** — a ranged request for a `paid` package still requires the entitlement
  (`401`/`402` as above), so ranges never bypass licensing.
- An unsatisfiable range (start at/after the end) returns `416 Range Not Satisfiable` with
  `Content-Range: bytes */total`.
- A server MAY ignore a malformed or multi-range header and return the full `200` instead.
- **Ranged requests MUST NOT count as downloads.** One logical transfer is many range requests
  (chunks, retries, resumes); only a full `200` (or the host's own accounting) increments the tally.

A server that cannot serve ranges simply omits `Accept-Ranges` and always returns `200`; a conforming
client (e.g. `@azphalt/repository-client`) detects this and downloads in a single request.

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

### 6. Batch Update Check
`POST /updates`

Checks a whole installed library for updates in **one** request, instead of one `GET /packages/{id}` per installed package. The body is a JSON array of the host's installed `{ id, version }`; the response lists **only** the ids that have a strictly newer installable (non-yanked) version.

**Request body:**
```json
[
  { "id": "com.sfx.explosions-pack", "version": "1.1.0" },
  { "id": "com.hereliesaz.halftone",  "version": "1.2.0" }
]
```

**Response (200 OK):**
```json
{ "updates": [ { "id": "com.sfx.explosions-pack", "latest": "1.2.0" } ] }
```

Only ids with something newer appear; an id that is current, ahead, or unknown is silently omitted (a host treats "absent" as "up to date"). `latest` uses the same newest-non-yanked resolution as everywhere else. A malformed body (not a JSON array of `{ id: string, version: string }`) returns `400` with the error envelope below. This is the only non-`GET` endpoint in the API; it is read-only despite the verb (a `POST` because the request carries a body).

## Error responses

Every non-2xx response carries a normative JSON **error envelope** so a host can branch on a stable machine code and show a human message, rather than parsing a bare status:

```json
{ "error": { "code": "payment_required", "message": "This package requires a license." } }
```

`code` is drawn from a fixed vocabulary: `bad_request` (`400`), `unauthorized` (`401`), `payment_required` (`402`), `not_found` (`404`), `method_not_allowed` (`405`), `rate_limited` (`429`), `server_error` (`500`). `message` is human-readable and MAY change; branch on `code`, display `message`. (The `401` / `402` download gate and the `400` validation failures above all use this shape.)

## Reference implementation

A working reference server ships as [`@azphalt/repository-server`](../apps/repository-server) — a thin facade over [`@azphalt/registry`](../packages/registry) that implements every endpoint above (discovery, search, detail, and the `401`/`402`-gated download). It is tested end-to-end against [`@azphalt/repository-client`](../packages/repository-client), so the two sides of the standard are known to agree.
