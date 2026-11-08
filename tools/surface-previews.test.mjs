// Tests for tools/surface-previews.mjs and tools/gen-surfaces.mjs. Run with `node --test "tools/*.test.mjs"`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
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
  const svg = join(f.opts.previewsDir, "com.hereliesaz.azphalt.surfaces.blocks/column.svg");
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
