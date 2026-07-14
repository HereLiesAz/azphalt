/**
 * Assemble the Next.js standalone output into a single, self-contained folder you can upload
 * (SFTP/rsync) and run with `node`. Run AFTER `next build` (the `bundle` script chains them).
 *
 * Next's `output: "standalone"` traces every runtime dependency into `.next/standalone`, but by
 * design it does NOT copy the static assets (`.next/static`) or `public/` — you do. For a pnpm
 * monorepo the app nests under `.next/standalone/apps/storefront/`, so the copies land there and
 * the entry point is `apps/storefront/server.js`.
 *
 * Output: `apps/storefront/dist-server/` — the whole thing is the deployable. To run it:
 *   PORT=8080 HOSTNAME=127.0.0.1 node apps/storefront/server.js
 * (behind a reverse proxy; see README § Deploy).
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(appRoot, ".next", "standalone");
const out = join(appRoot, "dist-server");
// Where the app lives inside the standalone tree (monorepo nesting).
const appInStandalone = join("apps", "storefront");

if (!existsSync(join(standalone, appInStandalone, "server.js"))) {
  console.error(
    "✗ .next/standalone/apps/storefront/server.js not found. Run `next build` first " +
      "(with output:'standalone' in next.config.mjs).",
  );
  process.exit(1);
}

// Fresh output dir = a verbatim copy of the traced standalone server + its node_modules.
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(standalone, out, { recursive: true });

// Copy the two things standalone omits, into the app's dir inside the bundle.
const appOut = join(out, appInStandalone);
cpSync(join(appRoot, ".next", "static"), join(appOut, ".next", "static"), { recursive: true });
if (existsSync(join(appRoot, "public"))) {
  cpSync(join(appRoot, "public"), join(appOut, "public"), { recursive: true });
}

console.log("✓ Bundle ready:  apps/storefront/dist-server");
console.log("  Upload that folder, then run its server:");
console.log("    PORT=8080 HOSTNAME=127.0.0.1 node apps/storefront/server.js");
console.log("  (from the dist-server root; reverse-proxy your domain/sub-path to it — see README § Deploy)");
