// Print the workspace's npm-publishable packages, one per line.
//   node scripts/publishable.mjs             → "name"
//   node scripts/publishable.mjs --versions  → "name@version"
//
// Publishable = non-private AND living under packages/** — the apps (storefront,
// marketplace, mock-backend) and the docs site are non-private workspace projects
// but are NOT npm targets, so filtering on `private` alone is too broad.
import { execSync } from "node:child_process";

const withVersions = process.argv.includes("--versions");
const raw = execSync("pnpm ls -r --depth -1 --json", { encoding: "utf8" });
const list = JSON.parse(raw)
  .filter((p) => p.name && p.private !== true && /\/packages\//.test(p.path || ""))
  .sort((a, b) => a.name.localeCompare(b.name));

for (const p of list) console.log(withVersions ? `${p.name}@${p.version}` : p.name);
