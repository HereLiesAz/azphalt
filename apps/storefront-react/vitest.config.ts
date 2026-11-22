import { defineConfig } from "vitest/config";

// Separate from vite.config.ts, which reads version.properties at load time; the sort tests are pure.
export default defineConfig({
  // Resolve the workspace package from source, so the suites run on a fresh install without
  // `@azphalt/web-handoff` having been built first (its `main` points at `dist/`).
  resolve: { alias: { "@azphalt/web-handoff": new URL("../../packages/web-handoff/src/index.ts", import.meta.url).pathname } },
  test: { include: ["src/**/*.test.ts"] },
});
