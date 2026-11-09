# @azphalt/mock-backend

## 0.2.2

### Patch Changes

- Updated dependencies [97aaf3a]
  - @azphalt/azp@0.7.0

## 0.2.1

### Patch Changes

- @azphalt/azp@0.6.1

## 0.2.0

### Minor Changes

- 947b722: Make the template safe to copy: it serves a version only if it holds it (it used to serve v1.0.0 bytes for any version string, labelled with that string), fails closed on paid packages (any `Bearer x` used to pass; now a token must match `MOCK_PAID_TOKEN`, and with none configured nothing is licensed), answers errors in the spec's `{ error: { code, message } }` envelope, only allows localhost CORS origins unless `CORS_ORIGIN` is set, and gains `GET /packages/:id` and `GET /revocations` so `RepositoryClient.getPackage` / `resolvePack` work against it. It now has tests.

### Patch Changes

- fd27cb6: Runtime dependencies updated to their latest stable releases: zod 4 and `@modelcontextprotocol/sdk` 1.30 (`@azphalt/mcp`), Express 5 (`@azphalt/mock-backend`), and `quickjs-emscripten` 0.32 (`@azphalt/runtime-wasm`).
  
  `create-azphalt` scaffolds with the same latest releases (TypeScript 7, Vite 8, Express 5, current `@azphalt/*` versions), and its generated release workflow uses `actions/checkout@v7`, `actions/setup-node@v7` on Node 24, and `softprops/action-gh-release@v3`.
- Updated dependencies [19c0df7]
- Updated dependencies [a04a765]
- Updated dependencies [d18ff48]
- Updated dependencies [c0c8ee4]
- Updated dependencies [5b51e82]
- Updated dependencies [b32adc4]
- Updated dependencies [de006ee]
  - @azphalt/azp@0.6.0

## 0.1.5

### Patch Changes

- Updated dependencies [f36110b]
  - @azphalt/azp@0.5.0

## 0.1.4

### Patch Changes

- Updated dependencies [bdbdb9b]
  - @azphalt/azp@0.4.0

## 0.1.3

### Patch Changes

- Updated dependencies [e5108c8]
  - @azphalt/azp@0.3.0

## 0.1.2

### Patch Changes

- Updated dependencies [5a7869b]
- Updated dependencies [f9a94c8]
  - @azphalt/azp@0.2.0
