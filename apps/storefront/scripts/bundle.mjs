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
import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readlinkSync, rmSync, symlinkSync } from "node:fs";
import { dirname, isAbsolute, join, relative } from "node:path";
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

// Fresh output dir = a copy of the traced standalone server, PRESERVING symlinks. Next + pnpm rely
// on the node_modules symlink structure, so dereferencing it (cp -L) breaks module resolution;
// instead we keep the links and rewrite the *absolute* ones Next emits (which point back into the
// build dir) to be relative — making the bundle self-contained and portable to any path/host.
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(standalone, out, { recursive: true, verbatimSymlinks: true });

let relinked = 0;
function relativizeAbsoluteSymlinks(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = lstatSync(p);
    if (st.isSymbolicLink()) {
      const target = readlinkSync(p);
      // Only the links pointing back into the original standalone tree need rewriting; leave the
      // rest (already-relative links) alone.
      if (isAbsolute(target) && target.startsWith(standalone + "/")) {
        const inBundle = join(out, relative(standalone, target));
        rmSync(p);
        symlinkSync(relative(dirname(p), inBundle), p);
        relinked++;
      }
    } else if (st.isDirectory()) {
      relativizeAbsoluteSymlinks(p);
    }
  }
}
relativizeAbsoluteSymlinks(out);

// Copy the two things standalone omits, into the app's dir inside the bundle.
const appOut = join(out, appInStandalone);
const staticDir = join(appRoot, ".next", "static");
if (existsSync(staticDir)) {
  cpSync(staticDir, join(appOut, ".next", "static"), { recursive: true });
}
if (existsSync(join(appRoot, "public"))) {
  cpSync(join(appRoot, "public"), join(appOut, "public"), { recursive: true });
}

console.log(`✓ Bundle ready:  apps/storefront/dist-server  (${relinked} symlink(s) made relative)`);
console.log("  Upload that folder, then run its server:");
console.log("    PORT=8080 HOSTNAME=127.0.0.1 node apps/storefront/server.js");
console.log("  (from the dist-server root; reverse-proxy your domain/sub-path to it — see README § Deploy)");
