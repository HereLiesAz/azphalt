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
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readlinkSync,
  realpathSync,
  rmSync,
  statSync,
  symlinkSync,
} from "node:fs";
import { dirname, isAbsolute, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(appRoot, ".next", "standalone");
const out = join(appRoot, "dist-server");
// Next traces from `outputFileTracingRoot` (pinned to the workspace root in next.config.mjs) and
// mirrors the layout from that root down into `.next/standalone` — so the bundle mirrors it too,
// and a path under the workspace root maps into the bundle by its root-relative path. Computed the
// same way next.config.mjs computes the pin; if the two ever drift apart the mapping below yields
// paths that don't exist and verifySelfContained() fails the build rather than shipping.
const workspaceRoot = join(appRoot, "..", "..");

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

/**
 * Is `p` inside `root`? Decided with path.relative rather than a `p.startsWith(root + "/")` prefix
 * test: that hardcodes a separator, so it silently never matches on Windows (`C:\...\standalone`).
 */
function contains(root, p) {
  const rel = relative(root, p);
  return rel !== "" && rel !== ".." && !rel.startsWith(".." + sep) && !isAbsolute(rel);
}

/** Every symlink under `dir`, recursively. */
function* symlinksIn(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = lstatSync(p);
    if (st.isSymbolicLink()) yield p;
    else if (st.isDirectory()) yield* symlinksIn(p);
  }
}

// Fresh output dir = a copy of the traced standalone server, PRESERVING symlinks. Next + pnpm rely
// on the node_modules symlink structure, so dereferencing it (cp -L) breaks module resolution — and
// would duplicate every multiply-linked package and risk walking pnpm's link cycles forever.
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(standalone, out, { recursive: true, verbatimSymlinks: true });

// The links pnpm/Next emit are absolute and point back into the BUILD MACHINE's workspace
// (`<workspaceRoot>/node_modules/.pnpm/...`), which won't exist on the host. Each target has a real
// counterpart inside the bundle at the same workspace-relative path, so rewrite each link to point
// there, relative to its own directory — making the bundle path-independent and portable.
let relinked = 0;
for (const link of symlinksIn(out)) {
  const target = readlinkSync(link);
  // Already-relative links are portable as-is. Absolute links outside the workspace can't be
  // mapped into the bundle; leave them for verifySelfContained() to report.
  if (!isAbsolute(target) || !contains(workspaceRoot, target)) continue;

  const inBundle = join(out, relative(workspaceRoot, target));
  // Windows needs the link type to match the target ('dir' vs 'file'); Linux ignores it. Don't rely
  // on Node's autodetection: it resolves a *relative* target against process.cwd() rather than the
  // link's directory, so it would misdetect here and create file links where dir links are needed.
  const type = existsSync(inBundle) && statSync(inBundle).isDirectory() ? "dir" : "file";
  rmSync(link);
  symlinkSync(relative(dirname(link), inBundle), link, type);
  relinked++;
}

// Copy the two things standalone omits, into the app's dir inside the bundle.
const appOut = join(out, appInStandalone);
const staticDir = join(appRoot, ".next", "static");
if (existsSync(staticDir)) {
  cpSync(staticDir, join(appOut, ".next", "static"), { recursive: true });
}
if (existsSync(join(appRoot, "public"))) {
  cpSync(join(appRoot, "public"), join(appOut, "public"), { recursive: true });
}

/**
 * Assert the property the bundle actually needs: every symlink resolves to a real path INSIDE it.
 *
 * This is the check, not a formality. The previous version of this script reported what it had
 * attempted ("0 symlink(s) made relative") instead of what it had achieved, so a rewrite pass that
 * matched nothing was indistinguishable from a correct no-op — it printed success while leaving
 * every link pointing at the build machine. Verifying the postcondition is what makes that
 * impossible: a bundle that isn't portable fails the build here.
 */
function verifySelfContained() {
  // Compare against the resolved root: `out` itself may sit behind a symlink (e.g. a git worktree
  // or /tmp), and realpathSync() below returns fully-resolved paths.
  const outReal = realpathSync(out);
  const escaped = [];
  let total = 0;

  for (const link of symlinksIn(out)) {
    total++;
    let resolved;
    try {
      resolved = realpathSync(link);
    } catch {
      escaped.push(`${relative(out, link)} -> ${readlinkSync(link)}  (dangling)`);
      continue;
    }
    if (!contains(outReal, resolved)) {
      escaped.push(`${relative(out, link)} -> ${readlinkSync(link)}  (escapes to ${resolved})`);
    }
  }

  if (escaped.length > 0) {
    console.error(
      `✗ ${escaped.length} of ${total} symlink(s) do not resolve inside the bundle. It is NOT ` +
        `portable — these would break on any host that lacks the build machine's paths:`,
    );
    for (const e of escaped) console.error(`    ${e}`);
    process.exit(1);
  }
  return total;
}
const verified = verifySelfContained();

console.log(`✓ Bundle ready:  apps/storefront/dist-server`);
console.log(`  Verified: all ${verified} symlink(s) resolve inside the bundle (${relinked} rewritten).`);
console.log("  Upload that folder, then run its server:");
console.log(`    PORT=8080 HOSTNAME=127.0.0.1 node ${serverRel}`);
console.log("  (from the dist-server root; reverse-proxy your domain/sub-path to it — see README § Deploy)");
