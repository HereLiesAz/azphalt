---
"@azphalt/mcp": patch
"@azphalt/mock-backend": patch
"@azphalt/registry-store-vercel": patch
"@azphalt/runtime-wasm": patch
"create-azphalt": patch
---

Runtime dependencies updated to their latest stable releases: zod 4 and `@modelcontextprotocol/sdk` 1.30 (`@azphalt/mcp`), Express 5 (`@azphalt/mock-backend`), `@vercel/blob` 2.8 (`@azphalt/registry-store-vercel`), and `quickjs-emscripten` 0.32 (`@azphalt/runtime-wasm`).

`create-azphalt` scaffolds with the same latest releases (TypeScript 7, Vite 8, Express 5, current `@azphalt/*` versions), and its generated release workflow uses `actions/checkout@v7`, `actions/setup-node@v7` on Node 24, and `softprops/action-gh-release@v3`.
