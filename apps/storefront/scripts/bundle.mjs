/**
 * Assemble the Next.js standalone output into a single, self-contained folder you can upload
 * (SFTP/rsync) and run with `node`. Run AFTER `next build` (the `bundle` script chains them).
 *
 * Next's `output: "standalone"` traces every runtime dependency into `.next/standalone`, but by
 * design it does NOT copy the static assets (`.next/static`) or `public/` — you do. For a pnpm
 * monorepo the app usually nests under `.next/standalone/apps/storefront/` (we pin
 * `outputFileTracingRoot` to the repo root in next.config.mjs so this is deterministic), but Next's
 * layout has varied across versions/OSes, so we *locate* `server.js` rather than assume its path.
 *
 * Output: `apps/storefront/dist-server/` — the whole thing is the deployable. To run it:
 *   PORT=8080 HOSTNAME=127.0.0.1 node <app-subdir>/server.js
 * (behind a reverse proxy; see README § Deploy).
 */
import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readlinkSync, rmSync, symlinkSync } from "node:fs";
import { dirname, isAbsolute, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(appRoot, ".next", "standalone");
const out = join(appRoot, "dist-server");

if (!existsSync(standalone)) {
  console.error(
    "✗ .next/standalone not found. Run `next build` first (with output:'standalone' in next.config.mjs).",
  );
  process.exit(1);
}

// Find where `server.js` lives inside the standalone tree. With a pinned tracing root it's under
// `apps/storefront/`, but older Next layouts put it at the root, so probe both and, failing that,
// scan. `appInStandalone` is the app's sub-dir *relative to* the standalone root ("" = root).
function locateAppDir() {
  const candidates = [join("apps", "storefront"), ""];
  for (const c of candidates) {
    if (existsSync(join(standalone, c, "server.js"))) return c;
  }
  // Fallback: shallow scan for the nearest server.js (skip node_modules).
  const found = findServerJs(standalone, 4);
  if (found != null) return relative(standalone, dirname(found));
  return null;
}

function findServerJs(dir, depth) {
  if (depth < 0) return null;
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return null;
  }
  if (entries.some((e) => e.isFile() && e.name === "server.js")) return join(dir, "server.js");
  for (const e of entries) {
    if (e.isDirectory() && e.name !== "node_modules") {
      const hit = findServerJs(join(dir, e.name), depth - 1);
      if (hit != null) return hit;
    }
  }
  return null;
}

const appInStandalone = locateAppDir();
if (appInStandalone == null) {
  console.error("✗ Could not find server.js under .next/standalone. Its top-level contents are:");
  for (const name of readdirSync(standalone)) console.error("    " + name);
  console.error("  Re-run `next build` with output:'standalone' set in next.config.mjs.");
  process.exit(1);
}
// Relative path used in the run instructions (POSIX-style so it's copy-pasteable on any shell).
const serverRel = join(appInStandalone, "server.js").split(sep).join("/");

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
      if (isAbsolute(target) && target.startsWith(standalone + sep)) {
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
console.log(`    PORT=8080 HOSTNAME=127.0.0.1 node ${serverRel}`);
console.log("  (from the dist-server root; reverse-proxy your domain/sub-path to it — see README § Deploy)");
