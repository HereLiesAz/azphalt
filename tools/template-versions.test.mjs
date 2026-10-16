// CLAUDE.md § Dependencies: the create-azphalt templates are dependencies too — keep their ranges on the
// same versions as the repository. The templates are standalone manifests (not in the pnpm workspace),
// so nothing else notices when a workspace package ships a new minor and the templates fall behind.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const templatesDir = join(root, "packages/create-azphalt/templates");
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

/** name → current version, for every workspace package. */
function workspaceVersions() {
  const out = new Map();
  for (const group of ["packages", "apps"]) {
    for (const dir of readdirSync(join(root, group), { withFileTypes: true })) {
      if (!dir.isDirectory()) continue;
      const pj = join(root, group, dir.name, "package.json");
      if (existsSync(pj)) {
        const p = readJson(pj);
        if (p.name) out.set(p.name, p.version);
      }
    }
  }
  return out;
}

const parse = (v) => v.replace(/^[\^~>=\s]+/, "").split(".").map(Number);

/** Whether a caret/tilde range's floor is on the same release line as `version` (0.x: same minor). */
function onSameLine(range, version) {
  const [rM, rm, rp] = parse(range);
  const [vM, vm, vp] = parse(version);
  if (rM !== vM) return false;
  if (rM === 0) return rm === vm && rp <= vp; // caret on 0.x only spans one minor
  return rm < vm || (rm === vm && rp <= vp);
}

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
  const versions = workspaceVersions();
  const stale = [];
  for (const t of readdirSync(templatesDir)) {
    const pj = join(templatesDir, t, "package.json");
    if (!existsSync(pj)) continue;
    const p = readJson(pj);
    for (const [name, range] of Object.entries({ ...p.dependencies, ...p.devDependencies })) {
      if (!name.startsWith("@azphalt/")) continue;
      const current = versions.get(name);
      if (current && !onSameLine(range, current)) stale.push(`${t}: ${name} ${range} (workspace is ${current})`);
    }
  }
  assert.deepEqual(stale, [], "templates behind the workspace — bump their ranges:\n" + stale.join("\n"));
});

export const __onSameLine = onSameLine;

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
