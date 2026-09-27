/**
 * Assemble the Worker's static assets into `dist/`: the React storefront at the root and the VitePress
 * docs under `dist/_docs/`. One asset bundle serves both sites; `src/index.ts` routes by hostname
 * (azphalt.store → the storefront, azphalt.org → `/_docs/*`).
 *
 * Both inputs must already be built. `pnpm --filter "@azphalt/storefront-worker..." build` does that:
 * the React app and the docs are workspace devDependencies of this package, so pnpm builds them first.
 *
 * The docs keep their hashed bundles in `docs-assets/` rather than VitePress's default `assets/`
 * (`docs/.vitepress/config.mjs` § assetsDir). The storefront's own `/assets/*` bypasses the Worker
 * (`wrangler.jsonc` § run_worker_first), so a docs page asking for `/assets/…` on azphalt.org would
 * get the storefront's file instead of its own.
 */
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..", "..");
const storefront = resolve(root, "apps/storefront-react/dist");
const docs = resolve(root, "docs/.vitepress/dist");
const out = resolve(here, "..", "dist");

for (const [name, dir] of [["storefront", storefront], ["docs", docs]]) {
  if (!existsSync(dir)) throw new Error(`assemble-assets: the ${name} build is missing at ${dir}`);
}
if (existsSync(resolve(docs, "assets"))) {
  throw new Error("assemble-assets: the docs build wrote assets/, which the storefront's /assets/* would shadow");
}

rmSync(out, { recursive: true, force: true });
cpSync(storefront, out, { recursive: true });
cpSync(docs, resolve(out, "_docs"), { recursive: true });
console.log(`assemble-assets: storefront + docs → ${out}`);
