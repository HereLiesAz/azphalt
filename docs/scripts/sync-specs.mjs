// Mirror the normative specs into the docs site.
//
// `docs/specs/*.md` are published by VitePress but the source of truth is the repo-root `spec/*.md`
// (README § Documentation points readers there). They were previously hand-copied and drifted. This
// script copies every `spec/*.md` into `docs/specs/` and runs on `predev`/`prebuild`, so the docs site
// can never show a stale spec.
import { readdirSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const specDir = join(here, "..", "..", "spec");
const outDir = join(here, "..", "specs");

mkdirSync(outDir, { recursive: true });
let count = 0;
for (const file of readdirSync(specDir)) {
  if (!file.endsWith(".md")) continue;
  copyFileSync(join(specDir, file), join(outDir, file));
  count++;
}
console.log(`sync-specs: mirrored ${count} spec file(s) → docs/specs`);
