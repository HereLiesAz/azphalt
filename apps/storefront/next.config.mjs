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
  // Optional sub-path mount (baked in at build time). Next prefixes routes + assets with it.
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
