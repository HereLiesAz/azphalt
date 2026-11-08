// Tests for tools/brush-previews.mjs. Run with `node --test "tools/*.test.mjs"` (part of `pnpm test`).
import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { brushDefinitionDigest, canonicalJson, checkBrushPreviews, ingest, isKinetic, listBrushes, pngSize, readIndex, strokesForPack, DEFAULTS } from "./brush-previews.mjs";

// A 1x1 PNG is too small to pass the size rule, so build a valid 128x64 header-only-ish PNG for fixtures.
function png(w = 128, h = 64, salt = 0) {
  const b = Buffer.alloc(40, salt);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(b, 0);
  b.writeUInt32BE(13, 8);
  b.write("IHDR", 12, "latin1");
  b.writeUInt32BE(w, 16);
  b.writeUInt32BE(h, 20);
  return b;
}

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), "azphalt-bp-"));
  const subs = join(dir, "submissions");
  const pack = join(subs, "p.kinetic");
  mkdirSync(join(pack, "assets"), { recursive: true });
  writeFileSync(join(pack, "assets/tip.png"), png(8, 8, 1));
  writeFileSync(join(pack, "assets/tip2.png"), png(8, 8, 2));
  writeFileSync(join(pack, "manifest.json"), JSON.stringify({
    id: "p.kinetic",
    assets: [
      { type: "brush", path: "assets/tip.png", params: { name: "Spray", spacing: 0.1, program: { step: "hide = 1;" } } },
      { type: "brush", path: "assets/tip2.png", params: { name: "Plain", spacing: 0.2 } },
    ],
  }));
  const render = join(dir, "render", "p.kinetic");
  const kinetic = ["a", "b", "c"].map((l, i) => ({ file: `1/${i}.png`, label: l }));
  mkdirSync(join(render, "1"), { recursive: true });
  mkdirSync(join(render, "2"), { recursive: true });
  kinetic.forEach((s, i) => writeFileSync(join(render, s.file), png(128, 64, i)));
  writeFileSync(join(render, "2/0.png"), png(128, 64, 9));
  writeFileSync(join(render, "index.json"), JSON.stringify({
    pack: "p.kinetic",
    renderer: { engine: "test" },
    brushes: [{ asset: "assets/tip.png", strokes: kinetic }, { asset: "assets/tip2.png", strokes: [{ file: "2/0.png", label: "swoop" }] }],
  }));
  return { dir, opts: { submissionsDir: subs, previewsDir: join(dir, "out") }, render: join(dir, "render"), manifest: join(pack, "manifest.json") };
}

test("canonical JSON ignores key order; the digest ignores the name but not the program or the tip", () => {
  assert.equal(canonicalJson({ b: 1, a: { d: 2, c: [1, { z: 1, y: 2 }] } }), canonicalJson({ a: { c: [1, { y: 2, z: 1 }], d: 2 }, b: 1 }));
  const a = { params: { name: "X", spacing: 1, program: { step: "a;" } } };
  const tip = Buffer.from("tip");
  assert.equal(brushDefinitionDigest(a, tip), brushDefinitionDigest({ params: { ...a.params, name: "Renamed" } }, tip));
  assert.notEqual(brushDefinitionDigest(a, tip), brushDefinitionDigest({ params: { ...a.params, program: { step: "b;" } } }, tip));
  assert.notEqual(brushDefinitionDigest(a, tip), brushDefinitionDigest(a, Buffer.from("other")));
  assert.equal(isKinetic(a), true);
  assert.equal(isKinetic({ params: { spacing: 1 } }), false);
});

test("ingest is deterministic: the same render yields a byte-identical index and images", () => {
  const f = fixture();
  ingest(f.render, f.opts);
  const first = readFileSync(join(f.opts.previewsDir, "index.json"), "utf8");
  rmSync(f.opts.previewsDir, { recursive: true });
  ingest(f.render, f.opts);
  assert.equal(readFileSync(join(f.opts.previewsDir, "index.json"), "utf8"), first);
  assert.deepEqual(checkBrushPreviews(f.opts), []);
  const strokes = strokesForPack(readIndex(f.opts.previewsDir), "p.kinetic");
  assert.equal(strokes.length, 4);
  assert.ok(strokes.every((s) => s.image.startsWith("/previews/brushes/p.kinetic/")));
});

test("check: a changed brush program makes its preview stale", () => {
  const f = fixture();
  ingest(f.render, f.opts);
  const m = JSON.parse(readFileSync(f.manifest, "utf8"));
  m.assets[0].params.program.step = "hide = 0;";
  writeFileSync(f.manifest, JSON.stringify(m));
  assert.match(checkBrushPreviews(f.opts).join("\n"), /Spray: preview is stale/);
});

test("check: a kinetic brush needs several strokes, and coverage is demanded unless onlyIndexed", () => {
  const f = fixture();
  ingest(f.render, f.opts);
  const idxPath = join(f.opts.previewsDir, "index.json");
  const idx = JSON.parse(readFileSync(idxPath, "utf8"));
  const e = idx.packs["p.kinetic"]["assets/tip.png"];
  e.strokes = e.strokes.slice(0, 1);
  writeFileSync(idxPath, JSON.stringify(idx));
  assert.match(checkBrushPreviews(f.opts).join("\n"), /kinetic brush needs at least 3/);
  delete idx.packs["p.kinetic"]["assets/tip2.png"];
  writeFileSync(idxPath, JSON.stringify(idx));
  assert.match(checkBrushPreviews(f.opts).join("\n"), /Plain: no preview/);
  assert.doesNotMatch(checkBrushPreviews({ ...f.opts, onlyIndexed: true }).join("\n"), /no preview/);
});

test("check: a tampered, missing or non-PNG image is reported", () => {
  const f = fixture();
  ingest(f.render, f.opts);
  const base = join(f.opts.previewsDir, "p.kinetic");
  const rel = (b) => readdirOf(join(base, b));
  const one = join(base, "tip", rel("tip")[0]);
  writeFileSync(one, png(128, 64, 200));
  assert.match(checkBrushPreviews(f.opts).join("\n"), /does not match its recorded digest/);
  writeFileSync(one, Buffer.from("not a png at all, just text that is long enough to try"));
  assert.match(checkBrushPreviews(f.opts).join("\n"), /is not a PNG/);
  rmSync(one);
  assert.match(checkBrushPreviews(f.opts).join("\n"), /does not exist/);
});

test("ingest refuses a render for a brush that is not in the manifest", () => {
  const f = fixture();
  const p = join(f.render, "p.kinetic", "index.json");
  const r = JSON.parse(readFileSync(p, "utf8"));
  r.brushes[0].asset = "assets/nope.png";
  writeFileSync(p, JSON.stringify(r));
  assert.throws(() => ingest(f.render, f.opts), /not in the manifest/);
});

test("ingest refuses a stroke file that escapes the render directory, and an unsafe pack id", () => {
  const f = fixture();
  writeFileSync(join(f.dir, "secret.png"), png(128, 64, 5));
  const p = join(f.render, "p.kinetic", "index.json");
  const r = JSON.parse(readFileSync(p, "utf8"));
  r.brushes[0].strokes[0].file = "../../secret.png";
  writeFileSync(p, JSON.stringify(r));
  assert.throws(() => ingest(f.render, f.opts), /escapes the render directory/);
  r.brushes[0].strokes[0].file = "1/0.png";
  r.pack = "../evil";
  writeFileSync(p, JSON.stringify(r));
  assert.throws(() => ingest(f.render, f.opts), /unsafe pack id/);
});

test("pngSize reads IHDR and rejects other bytes", () => {
  assert.deepEqual(pngSize(png(300, 150)), { width: 300, height: 150 });
  assert.equal(pngSize(Buffer.from("hello")), null);
});

test("every brush in the store has a valid, current preview (kinetic brushes several)", () => {
  // Full coverage, not onlyIndexed: a new brush listed without a rendered preview fails `pnpm test`.
  // Render it with Graffux's PackRenderHarness and `node tools/brush-previews.mjs ingest <dir>`.
  assert.deepEqual(checkBrushPreviews(), []);
  assert.ok(listBrushes(DEFAULTS.submissionsDir).length > 0);
});

import { readdirSync } from "node:fs";
function readdirOf(d) { return readdirSync(d); }
