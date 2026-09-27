import { defineConfig } from "vitest/config";

// build-catalog's tests (fetch, retry) run in plain node — no runtime or DOM needed.
export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
