# @azphalt/repository-server

## 0.1.8

### Patch Changes

- Updated dependencies [97aaf3a]
  - @azphalt/azdk@0.8.0
  - @azphalt/azp@0.7.0
  - @azphalt/registry@0.5.0

## 0.1.7

### Patch Changes

- Updated dependencies [c2e8908]
  - @azphalt/azdk@0.7.0
  - @azphalt/azp@0.6.1
  - @azphalt/registry@0.4.1

## 0.1.6

### Patch Changes

- 19c0df7: Publishing over the Repository API (`spec/repository-api.md` § 9, `POST /packages`). The store's Worker takes a signed `.azp`, verifies it, applies publisher continuity (first publish pins the key in `apps/storefront/registry/publishers.json`), and opens a review pull request against `submissions/<id>/` — the merge is what publishes, so the catalog keeps no runtime write path. `RepositoryErrorCode` gains `forbidden`, `conflict`, `payload_too_large`, `not_implemented`, `bad_gateway` and `unavailable`; the reference server answers `501 not_implemented` for publishes and maps those statuses to the new codes. The storefront gains a `/publish` page.
- Updated dependencies [19c0df7]
- Updated dependencies [a04a765]
- Updated dependencies [d18ff48]
- Updated dependencies [c0c8ee4]
- Updated dependencies [fffb800]
- Updated dependencies [5b51e82]
- Updated dependencies [b32adc4]
- Updated dependencies [2f85213]
- Updated dependencies [de006ee]
- Updated dependencies [2776538]
- Updated dependencies [d6f56c9]
  - @azphalt/azdk@0.6.0
  - @azphalt/azp@0.6.0
  - @azphalt/registry@0.4.0

## 0.1.5

### Patch Changes

- Updated dependencies [f36110b]
  - @azphalt/azdk@0.5.0
  - @azphalt/azp@0.5.0
  - @azphalt/registry@0.3.2

## 0.1.4

### Patch Changes

- Updated dependencies [bdbdb9b]
  - @azphalt/azdk@0.4.0
  - @azphalt/azp@0.4.0
  - @azphalt/registry@0.3.1

## 0.1.3

### Patch Changes

- Updated dependencies [e5108c8]
  - @azphalt/azdk@0.3.0
  - @azphalt/azp@0.3.0
  - @azphalt/registry@0.3.0

## 0.1.2

### Patch Changes

- Updated dependencies [5a7869b]
- Updated dependencies [debc781]
- Updated dependencies [8d5f5af]
- Updated dependencies [f9a94c8]
- Updated dependencies [955c1f4]
- Updated dependencies [821325d]
- Updated dependencies [8911c47]
- Updated dependencies [c0b64e6]
- Updated dependencies [ae8e2cd]
  - @azphalt/registry@0.2.0
  - @azphalt/azp@0.2.0
  - @azphalt/azdk@0.2.0
