// Tests for tools/version.mjs. Run with `node --test "tools/*.test.mjs"` (part of `pnpm test`).
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { bumpVersion, formatVersion, readVersion } from "./version.mjs";

function file(content) {
  const path = join(mkdtempSync(join(tmpdir(), "azphalt-version-")), "version.properties");
  writeFileSync(path, content);
  return path;
}

/** The pairs the shared release workflows grep for, as `key=value` lines. */
function keys(path) {
  return readFileSync(path, "utf8").split("\n").filter((l) => l && !l.startsWith("#"));
}

test("a bump writes both the canonical keys and their aliases", () => {
  const path = file("versionMajor=0\nversionMinor=14\nversionPatch=26\nversionBuild=1\n\nmajor=0\nminor=14\npatch=26\nbuild=1\n");
  assert.equal(formatVersion(bumpVersion("patch", path)), "0.14.27.2");
  assert.deepEqual(keys(path), [
    "versionMajor=0", "versionMinor=14", "versionPatch=27", "versionBuild=2",
    "major=0", "minor=14", "patch=27", "build=2",
  ]);
});

test("keys the tool does not own survive a bump", () => {
  const path = file("versionMajor=1\nversionMinor=2\nversionPatch=3\nversionBuild=4\nversionMinorLast=2\n");
  bumpVersion("minor", path);
  assert.ok(keys(path).includes("versionMinorLast=2"));
  assert.equal(formatVersion(readVersion(path)), "1.3.0.5");
});

test("the canonical key wins when the two sets disagree, as in the shared contract", () => {
  const path = file("versionMajor=0\nversionMinor=15\nversionPatch=1\nversionBuild=9\nmajor=0\nminor=14\npatch=26\nbuild=1\n");
  assert.equal(formatVersion(readVersion(path)), "0.15.1.9");
});

test("a file with only the short keys still reads, and gains the canonical keys on bump", () => {
  const path = file("major=0\r\nminor=1\r\npatch=2\r\nbuild=7\r\n");
  assert.equal(formatVersion(readVersion(path)), "0.1.2.7");
  bumpVersion("patch", path);
  assert.ok(keys(path).includes("versionBuild=8"));
  assert.ok(keys(path).includes("build=8"));
});

test("a missing or malformed number is rejected", () => {
  assert.throws(() => readVersion(file("versionMajor=0\nversionMinor=1\nversionPatch=2\n")), /versionBuild/);
  assert.throws(() => readVersion(file("versionMajor=0\nversionMinor=x\nversionPatch=2\nversionBuild=3\n")), /non-negative integer/);
});

test("a major bump resets minor and patch but never the build", () => {
  const path = file("versionMajor=0\nversionMinor=19\nversionPatch=4\nversionBuild=7\n");
  assert.equal(formatVersion(bumpVersion("major", path)), "1.0.0.8");
});

test("a minor bump resets the patch and still advances the build", () => {
  const path = file("versionMajor=0\nversionMinor=19\nversionPatch=4\nversionBuild=7\n");
  assert.equal(formatVersion(bumpVersion("minor", path)), "0.20.0.8");
});

test("an unknown bump kind is refused and leaves the file alone", () => {
  const content = "versionMajor=0\nversionMinor=1\nversionPatch=2\nversionBuild=3\n";
  const path = file(content);
  assert.throws(() => bumpVersion("build", path), /unknown bump kind/);
  assert.equal(readFileSync(path, "utf8"), content);
});

test("readVersion reads what a bump wrote", () => {
  const path = file("versionMajor=2\nversionMinor=3\nversionPatch=4\nversionBuild=5\n");
  bumpVersion("patch", path);
  assert.deepEqual(readVersion(path), { major: 2, minor: 3, patch: 5, build: 6 });
});
