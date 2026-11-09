import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, statSync, utimesSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { caretFor, correctRange, onSameLine } from "./lib/release-line.mjs";
import { syncTemplateRanges } from "./sync-template-ranges.mjs";

const script = join(fileURLToPath(new URL(".", import.meta.url)), "sync-template-ranges.mjs");

function fixture(templates) {
  const root = mkdtempSync(join(tmpdir(), "sync-ranges-"));
  const pkg = (group, dir, name, version) => {
    mkdirSync(join(root, group, dir), { recursive: true });
    writeFileSync(join(root, group, dir, "package.json"), JSON.stringify({ name, version }));
  };
  pkg("packages", "azp", "@azphalt/azp", "0.8.2");
  pkg("packages", "sdk", "@azphalt/azdk", "0.9.0");
  pkg("packages", "stable", "@azphalt/stable", "1.2.3");
  pkg("apps", "app", "@azphalt/app", "2.0.0");
  for (const [name, text] of Object.entries(templates)) {
    mkdirSync(join(root, "packages/create-azphalt/templates", name), { recursive: true });
    writeFileSync(join(root, "packages/create-azphalt/templates", name, "package.json"), text);
  }
  return root;
}
const tpl = (deps, indent = 2, nl = "\n") =>
  JSON.stringify({ name: "t", version: "0.0.0", dependencies: deps, devDependencies: { vite: "^8.0.0" } }, null, indent) + nl;
const read = (root, t) => readFileSync(join(root, "packages/create-azphalt/templates", t, "package.json"), "utf8");

test("rule: 0.x spans one minor, >=1 spans one major", () => {
  assert.equal(onSameLine("^0.8.0", "0.8.5"), true);
  assert.equal(onSameLine("^0.7.0", "0.8.0"), false);
  assert.equal(onSameLine("^0.8.3", "0.8.2"), false);
  assert.equal(onSameLine("^1.0.0", "1.2.3"), true);
  assert.equal(onSameLine("^1.4.0", "1.2.3"), false);
  assert.equal(onSameLine("^1.9.0", "2.0.0"), false);
  assert.equal(onSameLine("^0.8.0", "0.8.0-next.1"), true);
});

test("caretFor / correctRange", () => {
  assert.equal(caretFor("0.8.0"), "^0.8.0");
  assert.equal(caretFor("1.2.3"), "^1.0.0");
  assert.equal(caretFor("2.0.0"), "^2.0.0");
  assert.equal(correctRange("^1.0.0", "1.2.3"), "^1.0.0");
  assert.equal(correctRange("^0.7.0", "0.8.0"), "^0.8.0");
});

test("rewrites stale 0.x and >=1 ranges, leaves current ones, non-workspace and non-semver deps alone", () => {
  const root = fixture({
    a: tpl({ "@azphalt/azp": "^0.7.0", "@azphalt/azdk": "^0.9.0", "@azphalt/stable": "^0.9.0", "@azphalt/app": "^1.0.0" }),
    b: tpl({ "@azphalt/unknown": "^0.1.0", "@azphalt/azp": "workspace:*", left: "^0.0.1" }),
  });
  try {
    const { changed } = syncTemplateRanges(root);
    assert.deepEqual(changed, ["packages/create-azphalt/templates/a/package.json"]);
    const a = JSON.parse(read(root, "a"));
    assert.deepEqual(a.dependencies, {
      "@azphalt/azp": "^0.8.0",
      "@azphalt/azdk": "^0.9.0",
      "@azphalt/stable": "^1.0.0",
      "@azphalt/app": "^2.0.0",
    });
    assert.equal(a.devDependencies.vite, "^8.0.0");
    assert.equal(read(root, "b"), tpl({ "@azphalt/unknown": "^0.1.0", "@azphalt/azp": "workspace:*", left: "^0.0.1" }));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("preserves indent, key order and trailing-newline state; touches only the range text", () => {
  for (const [indent, nl] of [[2, "\n"], [4, "\n"], [2, ""]]) {
    const before = tpl({ "@azphalt/azp": "^0.7.0", other: "^1.0.0" }, indent, nl);
    const root = fixture({ a: before });
    try {
      syncTemplateRanges(root);
      assert.equal(read(root, "a"), before.replace('"^0.7.0"', '"^0.8.0"'));
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  }
});

test("rewrites peer and dev sections too", () => {
  const text = JSON.stringify({ devDependencies: { "@azphalt/azp": "^0.7.0" }, peerDependencies: { "@azphalt/azdk": "^0.8.0" } }, null, 2) + "\n";
  const root = fixture({ a: text });
  try {
    syncTemplateRanges(root);
    assert.deepEqual(JSON.parse(read(root, "a")), {
      devDependencies: { "@azphalt/azp": "^0.8.0" },
      peerDependencies: { "@azphalt/azdk": "^0.9.0" },
    });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("idempotent, and only changed files are written", () => {
  const root = fixture({ a: tpl({ "@azphalt/azp": "^0.7.0" }), b: tpl({ "@azphalt/azp": "^0.8.0" }) });
  try {
    const bPath = join(root, "packages/create-azphalt/templates/b/package.json");
    const old = new Date("2001-01-01T00:00:00Z");
    utimesSync(bPath, old, old);
    assert.equal(syncTemplateRanges(root).changed.length, 1);
    assert.equal(statSync(bPath).mtimeMs, old.getTime(), "unchanged file must not be rewritten");
    const once = read(root, "a");
    assert.deepEqual(syncTemplateRanges(root).changed, []);
    assert.equal(read(root, "a"), once);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("--check exits 1 listing offenders without writing, 0 when in sync", () => {
  const root = fixture({ a: tpl({ "@azphalt/azp": "^0.7.0" }) });
  try {
    const before = read(root, "a");
    const bad = spawnSync(process.execPath, [script, "--check", `--root=${root}`], { encoding: "utf8" });
    assert.equal(bad.status, 1);
    assert.match(bad.stderr, /a: @azphalt\/azp \^0\.7\.0 \(workspace is 0\.8\.2\)/);
    assert.equal(read(root, "a"), before);
    const fix = spawnSync(process.execPath, [script, `--root=${root}`], { encoding: "utf8" });
    assert.equal(fix.status, 0);
    const ok = spawnSync(process.execPath, [script, "--check", `--root=${root}`], { encoding: "utf8" });
    assert.equal(ok.status, 0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
