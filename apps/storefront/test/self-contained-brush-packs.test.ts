/**
 * The six grouped brush packs are self-contained `kind:"asset"` packages: each carries its own tip
 * images and brush params instead of referencing separately-published single-brush packages. These
 * tests pin the conversion so it stays lossless and so no pack can be left pointing at a member the
 * store no longer serves.
 *
 * `fixtures/brush-pack-singles.json` records what each of the 26 retired single-brush packages
 * (`com.hereliesaz.azphalt.brush-*`, pinned in sources.json at the time) shipped: its tip bytes'
 * sha256, its params and tags, its licence.
 */
import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const registry = join(here, "..", "registry");
const submissions = join(here, "..", "..", "..", "submissions");

interface Single {
  pack: string;
  single: string;
  name: string;
  path: string;
  license: string;
  tipSha256: string;
  tags: string[];
  params: Record<string, unknown>;
  required: boolean;
}
const singles = JSON.parse(readFileSync(join(here, "fixtures", "brush-pack-singles.json"), "utf8")) as Single[];
const expectedCounts: Record<string, number> = {
  "com.hereliesaz.azphalt.pack.acrylic": 4,
  "com.hereliesaz.azphalt.pack.oil": 4,
  "com.hereliesaz.azphalt.pack.ink-and-marker": 6,
  "com.hereliesaz.azphalt.pack.charcoal-and-chalk": 4,
  "com.hereliesaz.azphalt.pack.spray-kit": 4,
  "com.hereliesaz.azphalt.pack.watercolor": 4,
};
const readManifest = (dir: string) => JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8"));
const lockIds: string[] = JSON.parse(readFileSync(join(registry, "sources.json"), "utf8")).sources.map((s: { id: string }) => s.id);

describe("self-contained brush packs", () => {
  it("fixture covers 26 singles across the six packs", () => {
    expect(singles).toHaveLength(26);
    for (const [id, n] of Object.entries(expectedCounts)) expect(singles.filter((s) => s.pack === id)).toHaveLength(n);
  });

  for (const [id, count] of Object.entries(expectedCounts)) {
    describe(id, () => {
      const dir = join(submissions, id);
      const m = readManifest(dir);
      const members = singles.filter((s) => s.pack === id);

      it("is an asset package with the same id, carrying every brush", () => {
        expect(m.id).toBe(id);
        expect(m.kind).toBe("asset");
        expect(m.pack).toBeUndefined();
        expect(m.assets).toHaveLength(count);
        expect(m.assets.every((a: { type: string }) => a.type === "brush")).toBe(true);
      });

      it("is not also defined under registry/local (an id resolves to one package)", () => {
        expect(existsSync(join(registry, "local", id))).toBe(false);
      });

      it("keeps each brush's name, params, tags and tip bytes unchanged, in the old order", () => {
        expect(m.assets.map((a: { params: { name: string } }) => a.params.name)).toEqual(members.map((s) => s.name));
        m.assets.forEach((a: { path: string; tags: string[]; params: Record<string, unknown> }, i: number) => {
          const s = members[i];
          const { name, ...rest } = a.params;
          expect(name).toBe(s.name);
          expect(rest).toEqual(s.params);
          expect(a.tags).toEqual(s.tags);
          expect(a.path).toBe(s.path);
          const sha = createHash("sha256").update(readFileSync(join(dir, a.path))).digest("hex");
          expect(sha).toBe(s.tipSha256);
        });
      });

      it("declares every licence present, and credits each attribution-required tip", () => {
        const declared = String(m.license).split(" AND ");
        expect(new Set(declared)).toEqual(new Set(members.map((s) => s.license)));
        const licenseText = readFileSync(join(dir, "LICENSE"), "utf8");
        m.assets.forEach((a: { contentRights?: { attribution: string; attributionRequired: boolean } }, i: number) => {
          const s = members[i];
          if (s.license === "CC-BY-4.0") {
            expect(a.contentRights?.attributionRequired).toBe(true);
            expect(a.contentRights?.attribution).toMatch(/Tip artwork by/);
          }
          expect(licenseText).toContain(s.name);
        });
      });

      it("ships no payload file the manifest does not reference", () => {
        const referenced = new Set<string>(m.assets.map((a: { path: string }) => a.path));
        const onDisk = readdirSync(join(dir, "assets")).map((f) => `assets/${f}`);
        expect(new Set(onDisk)).toEqual(referenced);
      });
    });
  }
});

describe("registry: no dangling single brushes or pack members", () => {
  it("sources.json no longer pins any single-brush package", () => {
    expect(lockIds.filter((id) => id.includes(".brush-"))).toEqual([]);
  });

  it("every kind:pack entry resolves to a package this registry serves", () => {
    const served = new Set<string>(lockIds);
    for (const base of [join(registry, "local"), submissions]) {
      for (const d of readdirSync(base, { withFileTypes: true })) {
        if (d.isDirectory() && existsSync(join(base, d.name, "manifest.json"))) served.add(d.name);
      }
    }
    const dangling: string[] = [];
    for (const base of [join(registry, "local"), submissions]) {
      for (const d of readdirSync(base, { withFileTypes: true })) {
        const mf = join(base, d.name, "manifest.json");
        if (!d.isDirectory() || !existsSync(mf)) continue;
        const man = readManifest(join(base, d.name));
        if (man.kind !== "pack") continue;
        for (const e of man.pack.entries as { id: string }[]) if (!served.has(e.id)) dangling.push(`${man.id} -> ${e.id}`);
      }
    }
    expect(dangling).toEqual([]);
  });
});
