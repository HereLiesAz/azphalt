/**
 * Next.js configuration for the azphalt storefront.
 *
 * The storefront consumes the workspace packages (`@azphalt/registry`, `@azphalt/azp`,
 * `@azphalt/azdk`) directly from their compiled `dist/` as ESM. `transpilePackages` lets
 * Next run them through its own build pipeline so they are bundled consistently with the
 * app. There is no server database: the catalog lives in the in-memory registry seeded at
 * module load (see `lib/catalog.ts`), so the app is fully self-contained — no network
 * calls, no external services at build or runtime.
 *
 * Deployment: `output: "standalone"` emits a self-contained Node server under
 * `.next/standalone` (see `scripts/bundle.mjs` + README § Deploy) — upload it and run
 * `node apps/storefront/server.js`. To serve under a sub-path (e.g. `example.com/azphalt`),
 * build with `NEXT_BASE_PATH=/azphalt`; leave it unset to serve at the domain root.
 *
 * @type {import('next').NextConfig}
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Pin the file-tracing root to the monorepo root. Otherwise Next *infers* it (walking up for a
// lockfile) and the guess differs across machines/OSes — on some setups the standalone tree nests
// under `apps/storefront/`, on others it lands elsewhere, so `scripts/bundle.mjs` can't rely on a
// fixed path. Pinning it makes the `.next/standalone` layout deterministic everywhere.
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

// Next requires basePath to start with "/" and not end with one; normalize so a value like
// "azphalt" or "/azphalt/" doesn't fail the build.
let basePath = process.env.NEXT_BASE_PATH || undefined;
if (basePath) {
  if (!basePath.startsWith("/")) basePath = `/${basePath}`;
  if (basePath.endsWith("/")) basePath = basePath.slice(0, -1);
  if (basePath === "") basePath = undefined;
}

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@azphalt/registry", "@azphalt/azp", "@azphalt/azdk", "@azphalt/repository-server"],
  // A self-contained server bundle, convenient for `node .next/standalone/.../server.js`.
  output: "standalone",
  // Deterministic standalone layout across machines (see `repoRoot` above).
  outputFileTracingRoot: repoRoot,
  // Optional sub-path mount (baked in at build time). Next prefixes routes + assets with it.
  ...(basePath ? { basePath } : {}),
  async rewrites() {
    return {
      // The normative Repository API (spec/repository-api.md) at its canonical paths, so `azphalt.store`
      // is a conforming repository any host can consume via `@azphalt/repository-client`. These run
      // BEFORE the SPA fallback below, which would otherwise swallow them into the app shell. All map
      // onto the shared handler at `/api/repository/*` (see `app/api/repository/[[...slug]]/route.ts`).
      beforeFiles: [
        { source: "/.well-known/azphalt-repository.json", destination: "/api/repository/.well-known/azphalt-repository.json" },
        { source: "/packages", destination: "/api/repository/packages" },
        { source: "/packages/:path*", destination: "/api/repository/packages/:path*" },
        { source: "/revocations", destination: "/api/repository/revocations" },
        { source: "/updates", destination: "/api/repository/updates" },
      ],
      fallback: [
        {
          source: "/:path*",
          destination: "/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
