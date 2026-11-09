#!/usr/bin/env node
// Keeps the create-azphalt templates' @azphalt/* ranges on each workspace package's current release line.
//
//   node tools/sync-template-ranges.mjs           rewrite stale ranges in place (idempotent)
//   node tools/sync-template-ranges.mjs --check   write nothing; list stale ranges and exit 1 if any
//   node tools/sync-template-ranges.mjs --changeset   as the first form, and when any template changed also
//                                                  write .changeset/sync-template-ranges.md (create-azphalt
//                                                  patch), because the published scaffolder bundles the templates
//   ... --changeset --bump                         then also run `changeset version` once more to consume it
//                                                  (only when a template changed, so it never runs with nothing
//                                                  to consume, which `changeset version` treats as an error)
//
// The rule lives in tools/lib/release-line.mjs, shared with tools/template-versions.test.mjs. Run by the
// root `version` script right after `changeset version`, so the "Version Packages" PR already carries
// correct template ranges. Only the range text is replaced: indentation, key order and the trailing
// newline of each manifest are preserved, and files that need no change are not touched.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { findOffenders, templateManifests, workspaceVersions } from "./lib/release-line.mjs";

const defaultRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

/** Replace one `"name": "range"` inside `section`'s object, textually. Returns the new source or null. */
function rewriteRange(src, section, name, range, fixed) {
  const start = src.search(new RegExp(`"${esc(section)}"\\s*:\\s*\\{`));
  if (start < 0) return null;
  const end = src.indexOf("}", start);
  const block = src.slice(start, end);
  const re = new RegExp(`("${esc(name)}"\\s*:\\s*")${esc(range)}(")`);
  if (!re.test(block)) return null;
  return src.slice(0, start) + block.replace(re, `$1${fixed}$2`) + src.slice(end);
}

/** @returns {{ changed: string[], offenders: string[] }} paths relative to root, and human-readable lines. */
export function syncTemplateRanges(root = defaultRoot, { check = false } = {}) {
  const versions = workspaceVersions(root);
  const changed = [];
  const offenders = [];
  for (const { template, path } of templateManifests(root)) {
    const src = readFileSync(path, "utf8");
    const found = findOffenders(JSON.parse(src), versions);
    if (!found.length) continue;
    let next = src;
    for (const o of found) {
      offenders.push(`${template}: ${o.name} ${o.range} (workspace is ${o.current}) -> ${o.fixed}`);
      const out = rewriteRange(next, o.section, o.name, o.range, o.fixed);
      if (out === null) throw new Error(`${path}: could not locate "${o.name}": "${o.range}" in ${o.section}`);
      next = out;
    }
    changed.push(relative(root, path));
    if (!check) writeFileSync(path, next);
  }
  return { changed, offenders };
}

/** Schedules a create-azphalt patch release for a template change (the scaffolder ships the templates). */
export function writeScaffolderChangeset(root, offenders) {
  const dir = join(root, ".changeset");
  if (!existsSync(dir)) throw new Error(`${dir} does not exist; cannot write a changeset`);
  const body = offenders.map((o) => `- ${o}`).join("\n");
  writeFileSync(
    join(dir, "sync-template-ranges.md"),
    `---\n"create-azphalt": patch\n---\n\nBring the bundled template dependency ranges up to the current workspace release lines:\n\n${body}\n`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const rootArg = args.find((a) => a.startsWith("--root="));
  const root = rootArg ? rootArg.slice(7) : defaultRoot;
  const { changed, offenders } = syncTemplateRanges(root, { check });
  if (args.includes("--changeset") && !check && changed.length) {
    writeScaffolderChangeset(root, offenders);
    if (args.includes("--bump")) {
      const r = spawnSync("changeset", ["version"], { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
      if (r.status !== 0) process.exit(r.status ?? 1);
    }
  }
  if (check) {
    if (offenders.length) {
      console.error("create-azphalt template ranges are behind the workspace:\n" + offenders.join("\n"));
      console.error("\nRun: node tools/sync-template-ranges.mjs");
      process.exit(1);
    }
    console.log("create-azphalt template ranges are on the workspace release lines.");
  } else {
    for (const o of offenders) console.log(o);
    console.log(changed.length ? `Updated ${changed.length} template manifest(s).` : "Template ranges already in sync.");
  }
}
