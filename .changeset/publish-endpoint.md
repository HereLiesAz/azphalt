---
"@azphalt/azdk": minor
"@azphalt/repository-server": patch
"@azphalt/storefront-worker": minor
"@azphalt/storefront-react": minor
---

Publishing over the Repository API (`spec/repository-api.md` § 9, `POST /packages`). The store's Worker takes a signed `.azp`, verifies it, applies publisher continuity (first publish pins the key in `apps/storefront/registry/publishers.json`), and opens a review pull request against `submissions/<id>/` — the merge is what publishes, so the catalog keeps no runtime write path. `RepositoryErrorCode` gains `forbidden`, `conflict`, `payload_too_large`, `not_implemented`, `bad_gateway` and `unavailable`; the reference server answers `501 not_implemented` for publishes and maps those statuses to the new codes. The storefront gains a `/publish` page.
