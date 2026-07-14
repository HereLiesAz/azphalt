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
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Pin the file-tracing root to the workspace root. Left unset, Next infers it by walking up for
// lockfiles and picking the outermost — so an unrelated package-lock.json anywhere above the repo
// (e.g. in the user's home dir) silently re-roots the trace there and `.next/standalone` gains a
// prefix of the path from THAT root down to the app. scripts/bundle.mjs looks for the app at
// `apps/storefront`, so a drifted root breaks the bundle on some machines and not others.
const workspaceRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

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
  transpilePackages: ["@azphalt/registry", "@azphalt/azp", "@azphalt/azdk"],
  // A self-contained server bundle, convenient for `node .next/standalone/.../server.js`.
  output: "standalone",
  outputFileTracingRoot: workspaceRoot,
  // Optional sub-path mount (baked in at build time). Next prefixes routes + assets with it.
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
