import { defineConfig } from "vitest/config";

// Separate from vite.config.ts, which reads version.properties at load time; the sort tests are pure.
export default defineConfig({ test: { include: ["src/**/*.test.ts"] } });
