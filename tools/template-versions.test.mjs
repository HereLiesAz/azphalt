// CLAUDE.md § Dependencies: the create-azphalt templates are dependencies too — keep their ranges on the
// same versions as the repository. The templates are standalone manifests (not in the pnpm workspace),
// so nothing else notices when a workspace package ships a new minor and the templates fall behind.
// `pnpm run version` fixes them automatically (tools/sync-template-ranges.mjs, same rule via tools/lib/release-line.mjs);
// this test is the backstop for hand-made version bumps and for any path that skips that script.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { findOffenders, workspaceVersions } from "./lib/release-line.mjs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const templatesDir = join(root, "packages/create-azphalt/templates");
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

// Ranges the repository itself uses for shared tooling.
function repoToolRange(name) {
  for (const f of ["package.json", "apps/storefront-react/package.json"]) {
    const p = readJson(join(root, f));
    const r = { ...p.dependencies, ...p.devDependencies }[name];
    if (r) return r;
  }
  return undefined;
}

test("every template's @azphalt/* range is on the workspace package's current release line", () => {
  const versions = workspaceVersions(root);
  const stale = [];
  for (const t of readdirSync(templatesDir)) {
    const pj = join(templatesDir, t, "package.json");
    if (!existsSync(pj)) continue;
    for (const o of findOffenders(readJson(pj), versions)) stale.push(`${t}: ${o.name} ${o.range} (workspace is ${o.current})`);
  }
  assert.deepEqual(
    stale,
    [],
    "templates behind the workspace — run `node tools/sync-template-ranges.mjs`:\n" + stale.join("\n"),
  );
});

test("shared tooling ranges in the templates match the repository's", () => {
  const drift = [];
  for (const t of readdirSync(templatesDir)) {
    const pj = join(templatesDir, t, "package.json");
    if (!existsSync(pj)) continue;
    const p = readJson(pj);
    for (const [name, range] of Object.entries({ ...p.dependencies, ...p.devDependencies })) {
      if (name.startsWith("@azphalt/")) continue;
      const repo = repoToolRange(name);
      if (repo && repo !== range) drift.push(`${t}: ${name} ${range} (repository uses ${repo})`);
    }
  }
  assert.deepEqual(drift, [], drift.join("\n"));
});
