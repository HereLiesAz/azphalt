---
"@azphalt/mock-backend": minor
---

Make the template safe to copy: it serves a version only if it holds it (it used to serve v1.0.0 bytes for any version string, labelled with that string), fails closed on paid packages (any `Bearer x` used to pass; now a token must match `MOCK_PAID_TOKEN`, and with none configured nothing is licensed), answers errors in the spec's `{ error: { code, message } }` envelope, only allows localhost CORS origins unless `CORS_ORIGIN` is set, and gains `GET /packages/:id` and `GET /revocations` so `RepositoryClient.getPackage` / `resolvePack` work against it. It now has tests.
