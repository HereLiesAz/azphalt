import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The API (/api/packages, /api/checkout, /api/reports) lives on the Next.js storefront. In dev we
// proxy to production so this app runs standalone; a co-deployment serves it same-origin.
export default defineConfig({
  plugins: [react()],
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
