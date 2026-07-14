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
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@azphalt/registry", "@azphalt/azp", "@azphalt/azdk"],
  // A self-contained server bundle, convenient for `node .next/standalone/server.js`.
  output: "standalone",
};

export default nextConfig;
