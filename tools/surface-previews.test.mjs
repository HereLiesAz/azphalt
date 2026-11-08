// Tests for tools/surface-previews.mjs and tools/gen-surfaces.mjs. Run with `node --test "tools/*.test.mjs"`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "./gen-surfaces.mjs";
import { checkPreviews, isClosed, listSurfaces, outlineSvg, readIndex, surfacesForPack, writePreviews, DEFAULTS } from "./surface-previews.mjs";

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), "azphalt-sp-"));
  const submissionsDir = join(dir, "submissions");
  for (const pack of ["blocks", "monuments", "rounded"]) {
    const id = `com.hereliesaz.azphalt.surfaces.${pack}`;
    cpSync(join(DEFAULTS.submissionsDir, id), join(submissionsDir, id), { recursive: true });
  }
  return { dir, opts: { submissionsDir, previewsDir: join(dir, "out") } };
}

test("the committed sample packs are exactly what the generator produces", () => {
  for (const [rel, text] of build()) {
    assert.equal(readFileSync(join(DEFAULTS.submissionsDir, "..", rel), "utf8"), text, rel);
  }
});

test("every sample surface is listed and the committed previews are current", () => {
  assert.equal(listSurfaces().length, 6);
  assert.deepEqual(checkPreviews(), []);
});

test("write then check is clean and deterministic; a changed surface makes its preview stale", () => {
  const f = fixture();
  assert.equal(writePreviews(f.opts), 6);
  const first = readFileSync(join(f.opts.previewsDir, "index.json"), "utf8");
  writePreviews(f.opts);
  assert.equal(readFileSync(join(f.opts.previewsDir, "index.json"), "utf8"), first);
  assert.deepEqual(checkPreviews(f.opts), []);
  const p = join(f.opts.submissionsDir, "com.hereliesaz.azphalt.surfaces.blocks/assets/slab.json");
  const s = JSON.parse(readFileSync(p, "utf8"));
  s.front[0][0] = 0.1;
  writeFileSync(p, JSON.stringify(s));
  assert.match(checkPreviews(f.opts).join("\n"), /Slab: preview is stale/);
  rmSync(f.dir, { recursive: true });
});

test("a missing preview file or a tampered SVG is reported", () => {
  const f = fixture();
  writePreviews(f.opts);
  const col = readIndex(f.opts.previewsDir).packs["com.hereliesaz.azphalt.surfaces.blocks"].find((e) => e.surface === "Column");
  const svg = join(f.opts.previewsDir, col.image.slice("/previews/surfaces/".length));
  writeFileSync(svg, "<svg/>");
  assert.match(checkPreviews(f.opts).join("\n"), /Column.*does not match/);
  rmSync(svg);
  assert.match(checkPreviews(f.opts).join("\n"), /Column.*does not exist/);
  rmSync(f.dir, { recursive: true });
});

test("outline: closed shapes are filled, open curves are not; names cannot break the markup", () => {
  assert.equal(isClosed([[0, 0], [1, 0], [1, 1]]), true);
  assert.equal(isClosed([[0, 0], [0.5, 0.5], [1, 1]]), false);
  assert.match(outlineSvg({ name: 'a"<b', front: [[0, 0], [1, 0], [1, 1]] }), /fill="#7c6bd6"/);
  assert.doesNotMatch(outlineSvg({ name: 'a"<b', front: [[0, 0], [1, 1]] }), /a"<b/);
});

test("surfacesForPack returns surface and image only", () => {
  const s = surfacesForPack(readIndex(), "com.hereliesaz.azphalt.surfaces.blocks");
  assert.deepEqual(s.map((x) => x.surface), ["Slab", "Column"]);
  assert.deepEqual(Object.keys(s[0]).sort(), ["image", "surface"]);
  assert.equal(surfacesForPack(readIndex(), "nope"), undefined);
});

test("an obsolete indexed entry or a leftover SVG fails until previews are regenerated", () => {
  const f = fixture();
  writePreviews(f.opts);
  const pack = "com.hereliesaz.azphalt.surfaces.blocks";
  // Column leaves the package; its preview and index entry are still there.
  const mp = join(f.opts.submissionsDir, pack, "manifest.json");
  const m = JSON.parse(readFileSync(mp, "utf8"));
  m.assets = m.assets.filter((a) => a.params.name !== "Column");
  writeFileSync(mp, JSON.stringify(m));
  const errs = checkPreviews(f.opts).join("\n");
  assert.match(errs, /Column: indexed but no longer in the package/);
  assert.match(errs, /column.*\.svg is not used by any surface/);
  writePreviews(f.opts);
  assert.deepEqual(checkPreviews(f.opts), []);
  assert.deepEqual(surfacesForPack(readIndex(f.opts.previewsDir), pack).map((s) => s.surface), ["Slab"]);
  rmSync(f.dir, { recursive: true });
});

test("same basename in different directories gets distinct previews", () => {
  const f = fixture();
  const pack = "com.hereliesaz.azphalt.surfaces.blocks";
  const dir = join(f.opts.submissionsDir, pack);
  const mp = join(dir, "manifest.json");
  const m = JSON.parse(readFileSync(mp, "utf8"));
  mkdirSync(join(dir, "assets/a"), { recursive: true });
  mkdirSync(join(dir, "assets/b"), { recursive: true });
  const base = JSON.parse(readFileSync(join(dir, "assets/slab.json"), "utf8"));
  writeFileSync(join(dir, "assets/a/shape.json"), JSON.stringify({ ...base, name: "A" }));
  writeFileSync(join(dir, "assets/b/shape.json"), JSON.stringify({ ...base, name: "B", front: [[0, 0], [1, 1]] }));
  // "Shape 1" and "shape-1" would collide under slug normalisation alone.
  writeFileSync(join(dir, "assets/Shape 1.json"), JSON.stringify({ ...base, name: "C" }));
  writeFileSync(join(dir, "assets/shape-1.json"), JSON.stringify({ ...base, name: "D", front: [[0, 0], [1, 1]] }));
  m.assets = ["assets/a/shape.json", "assets/b/shape.json", "assets/Shape 1.json", "assets/shape-1.json"].map((path, i) => ({
    type: "surface", path, params: { name: "ABCD"[i] },
  }));
  writeFileSync(mp, JSON.stringify(m));
  writePreviews(f.opts);
  assert.deepEqual(checkPreviews(f.opts), []);
  const entries = readIndex(f.opts.previewsDir).packs[pack];
  assert.equal(new Set(entries.map((e) => e.image)).size, 4);
  const svgs = entries.map((e) => readFileSync(join(f.opts.previewsDir, e.image.slice("/previews/surfaces/".length)), "utf8"));
  assert.notEqual(svgs[0], svgs[1]);
  assert.notEqual(svgs[2], svgs[3]);
  rmSync(f.dir, { recursive: true });
});
