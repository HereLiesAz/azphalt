import { defineConfig } from "vitest/config";

// The storefront's logic tests exercise the pure lib helpers (catalog seeding,
// formatting) in a node environment — no Next runtime or DOM needed.
export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
