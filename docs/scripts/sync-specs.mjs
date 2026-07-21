// Mirror the normative specs into the docs site.
//
// `docs/specs/*.md` are published by VitePress but the source of truth is the repo-root `spec/*.md`
// (README § Documentation points readers there). They were previously hand-copied and drifted. This
// script copies every `spec/*.md` into `docs/specs/` and runs on `predev`/`prebuild`, so the docs site
// can never show a stale spec.
//
// The specs link to sibling repo directories with paths like `](../apps/…)` / `](../packages/…)` that
// resolve when a spec is rendered from `spec/` on GitHub, but are dead links from `docs/specs/` (a
// different depth) and would fail the VitePress dead-link check. Rewrite those to absolute GitHub URLs
// so they work on the docs site and the build passes.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const specDir = join(here, "..", "..", "spec");
const outDir = join(here, "..", "specs");
const REPO_TREE = "https://github.com/HereLiesAz/azphalt/tree/main/";

mkdirSync(outDir, { recursive: true });
let count = 0;
for (const file of readdirSync(specDir)) {
  if (!file.endsWith(".md")) continue;
  // A spec sits at repo-root/spec, so `../<x>` is repo-root/<x> — map it to the GitHub tree URL.
  const content = readFileSync(join(specDir, file), "utf8").replace(/\]\((?:\.\/)?\.\.\//g, `](${REPO_TREE}`);
  writeFileSync(join(outDir, file), content);
  count++;
}
console.log(`sync-specs: mirrored ${count} spec file(s) → docs/specs`);
