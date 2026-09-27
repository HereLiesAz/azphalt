import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { formatVersion, readVersion } from "../../tools/version.mjs";

// The API (/api/*, /packages, /reports) lives in the Cloudflare Worker (apps/storefront-worker), which
// serves this app same-origin in production. In dev we proxy to production so this app runs
// standalone.
export default defineConfig({
  plugins: [react()],
  // The store's version, from the repository's version.properties, baked in at build time so the
  // footer always names the build that is actually deployed — the same four numbers the apps report.
  define: { __AZPHALT_VERSION__: JSON.stringify(formatVersion(readVersion())) },
  server: {
    proxy: {
      "/api": {
        target: "https://azphalt.store",
        changeOrigin: true,
        secure: true,
        followRedirects: true,
      },
    },
  },
});
