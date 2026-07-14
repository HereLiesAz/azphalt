# Repository API — canonical sample responses

These JSON files are **canonical sample responses** for the azphalt Repository API
(`spec/repository-api.md`), one per endpoint. They exist so a host building a **registry client** — in
any language — can vendor them into its own tests and assert its parser agrees with the reference,
instead of matching the spec's inline examples by eye (which lets two hosts silently diverge). This is
the registry-endpoint analog of the signed-`.azp` conformance fixtures from azphalt #32.

Each file is `{ method, path, status, body }`:

| File | Endpoint |
|---|---|
| `well-known.json` | `GET /.well-known/azphalt-repository.json` (with `signingKeys`, `supportedTypes`, `profiles`) |
| `packages.json` | `GET /packages` (search/browse summary list) |
| `package-detail.json` | `GET /packages/{id}` (manifest + version history + `latest`) |
| `revocations.json` | `GET /revocations` |
| `updates.json` | `POST /updates` (batch update check) |
| `download-401-unauthenticated.json` | `GET …/download` on a paid package with no token → error envelope |
| `download-402-unlicensed.json` | …with a valid-but-unlicensed token → error envelope |

## They can't drift

They are **emitted by the reference server** (`@azphalt/repository-server`), not hand-written:
`test/repository-fixtures.test.ts` regenerates them from a deterministic seed and **asserts the live
handler still matches the committed files**, so CI fails on any unintended change to the wire format.
Timestamps are pinned to `2026-01-01T00:00:00.000Z` (the only non-deterministic field); every other
value — digests included — is reproducible.

After an **intentional** wire-format change, refresh them:

~~~sh
UPDATE_FIXTURES=1 pnpm --filter @azphalt/repository-server test
~~~
