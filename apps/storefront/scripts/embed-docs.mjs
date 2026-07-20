/**
 * Build the VitePress docs and embed them under the storefront's `public/_docs`, so **azphalt.org**
 * can serve the documentation from the *same* Vercel deployment as **azphalt.store** — routed by the
 * host-based rewrites in `next.config.mjs` (azphalt.org → `/_docs/*`). No separate hosting, no DNS
 * change: both domains already point at this one deployment.
 *
 * `AZPHALT_DOCS_EMBED=1` disables VitePress `cleanUrls`, so page links are `.html` and map 1:1 onto the
 * static files under `/_docs` when Next rewrites `azphalt.org/x` → `/_docs/x`.
 *
 * Run by the deploy workflow before `vercel build`; also runnable locally to preview the routing.
 */
import { execSync } from "node:child_process";
import { cpSync, rmSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..", "..");
const dist = resolve(repoRoot, "docs/.vitepress/dist");
const dest = resolve(here, "..", "public", "_docs");

execSync("pnpm --filter docs build", {
  cwd: repoRoot,
  stdio: "inherit",
  env: { ...process.env, AZPHALT_DOCS_EMBED: "1" },
});
if (!existsSync(dist)) throw new Error(`embed-docs: VitePress produced no dist at ${dist}`);

rmSync(dest, { recursive: true, force: true });
cpSync(dist, dest, { recursive: true });
console.log(`embed-docs: docs → ${dest}`);
