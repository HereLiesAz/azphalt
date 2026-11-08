#!/usr/bin/env node
/**
 * Generates the sample surface packs under submissions/ (spec/package-format.md § Surface format).
 * Every surface is procedural: a few profile curves in the unit box, no images. The output is
 * committed; rerunning this tool reproduces it byte for byte.
 *
 *   node tools/gen-surfaces.mjs            write the packs
 *   node tools/gen-surfaces.mjs --check    fail if the committed files differ
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const r4 = (n) => Math.round(n * 1e4) / 1e4;
const pt = (a, b) => [r4(a), r4(b)];
const rect = (x0, y0, x1, y1) => [pt(x0, y0), pt(x1, y0), pt(x1, y1), pt(x0, y1)];
const arc = (cx, cy, r, from, to, n) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = from + ((to - from) * i) / n;
    return pt(cx + r * Math.cos(t), cy - r * Math.sin(t));
  });
const circle = (cx, cy, r, n) => arc(cx, cy, r, 0, 2 * Math.PI, n).slice(0, n);

/** name, description, tags, front (x,y), side (z,y), top (x,z). */
const SURFACES = {
  slab: {
    name: "Slab", tags: ["slab", "box", "wall"],
    front: rect(0.05, 0.25, 0.95, 0.75), side: rect(0, 0.25, 0.4, 0.75), top: rect(0.05, 0, 0.95, 0.4),
  },
  column: {
    name: "Column", tags: ["column", "cylinder", "pillar"],
    front: rect(0.3, 0.05, 0.7, 0.95), side: rect(0, 0.05, 0.4, 0.95), top: circle(0.5, 0.2, 0.2, 32),
  },
  pyramid: {
    name: "Pyramid", tags: ["pyramid", "roof"],
    front: [pt(0.1, 0.95), pt(0.9, 0.95), pt(0.5, 0.05)], side: [pt(0, 0.95), pt(0.8, 0.95), pt(0.4, 0.05)],
  },
  arch: {
    name: "Arch", tags: ["arch", "doorway", "wall"],
    front: [
      ...arc(0.5, 0.5, 0.45, Math.PI, 0, 24), pt(0.95, 0.95), pt(0.75, 0.95),
      ...arc(0.5, 0.5, 0.25, 0, Math.PI, 16), pt(0.25, 0.95), pt(0.05, 0.95),
    ],
    side: rect(0, 0.05, 0.3, 0.95), top: rect(0.05, 0, 0.95, 0.3),
  },
  wave: {
    name: "Wave", tags: ["wave", "sheet", "curtain"],
    front: Array.from({ length: 49 }, (_, i) => pt(0.05 + (0.9 * i) / 48, 0.5 + 0.25 * Math.sin((4 * Math.PI * i) / 48))),
  },
  orb: {
    name: "Orb", tags: ["orb", "round", "carved"],
    front: circle(0.5, 0.5, 0.45, 32), side: circle(0.5, 0.5, 0.45, 32), top: circle(0.5, 0.5, 0.45, 32),
  },
};

const PACKS = [
  { id: "com.hereliesaz.azphalt.surfaces.blocks", name: "Surfaces: Blocks", surfaces: ["slab", "column"],
    description: "Two solid surfaces carved from straight and circular outlines: a thick slab and a round column." },
  { id: "com.hereliesaz.azphalt.surfaces.monuments", name: "Surfaces: Monuments", surfaces: ["pyramid", "arch"],
    description: "A four-sided pyramid and a wall with an arched doorway, each carved from its front, side and top outlines." },
  { id: "com.hereliesaz.azphalt.surfaces.rounded", name: "Surfaces: Rounded", surfaces: ["wave", "orb"],
    description: "A rippling curtain (one front curve, no depth drawn) and an orb carved from three circular outlines, so it is round-ish with soft edges rather than a true sphere." },
];

const CC0 = `CC0 1.0 Universal (Public Domain Dedication)

The surface outlines in this package were generated procedurally by HereLiesAz and are dedicated to the
public domain under CC0 1.0: https://creativecommons.org/publicdomain/zero/1.0/legalcode
To the extent possible under law, the author has waived all copyright and related rights.
`;

export function build() {
  const out = new Map();
  for (const p of PACKS) {
    const dir = join("submissions", p.id);
    const assets = p.surfaces.map((key) => {
      const s = SURFACES[key];
      const payload = { format: "azphalt.surface", version: 1, name: s.name, front: s.front };
      if (s.side) payload.side = s.side;
      if (s.top) payload.top = s.top;
      const path = `assets/${key}.json`;
      out.set(join(dir, path), JSON.stringify(payload) + "\n");
      return { type: "surface", path, tags: ["surfaces", ...s.tags], params: { name: s.name } };
    });
    out.set(join(dir, "manifest.json"), JSON.stringify({
      azphalt: "0.1", id: p.id, name: p.name, version: "1.0.0", kind: "asset", license: "CC0-1.0",
      compat: ">=0.1", description: p.description, author: "HereLiesAz", targetApps: ["com.hereliesaz.graffux"],
      assets,
    }, null, 2) + "\n");
    out.set(join(dir, "LICENSE"), CC0);
  }
  return out;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes("--check");
  let bad = 0;
  for (const [rel, text] of build()) {
    const file = join(root, rel);
    if (check) {
      if (!existsSync(file) || readFileSync(file, "utf8") !== text) { console.error("gen-surfaces: out of date: " + rel); bad++; }
    } else {
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, text);
    }
  }
  process.exit(bad ? 1 : 0);
}
