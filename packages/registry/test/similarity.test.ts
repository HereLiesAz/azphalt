/**
 * Clone-similarity scoring — the "not just exact copies" cases. Exact byte copies are caught by asset
 * overlap; a reimplemented clone (no shared bytes) must still surface via shape + name/description.
 */
import { describe, it, expect } from "vitest";
import type { Manifest } from "@azphalt/azdk";
import { packageSimilarity, normalizeName } from "../src/index";

const base = { azphalt: "0.1", version: "1.0.0", license: "MIT", compat: ">=0.1" } as const;
function m(over: Partial<Manifest>): Manifest {
  return { ...base, id: "x", name: "X", kind: "asset", files: {}, ...over } as Manifest;
}

describe("packageSimilarity", () => {
  it("scores an exact asset copy as a near-total match, even under a different name", () => {
    const a = m({ name: "Brush Pack", assets: [{ type: "brush", path: "a" }], files: { a: "sha256-DEAD" } });
    const b = m({ name: "Totally Unrelated Title", assets: [{ type: "brush", path: "a" }], files: { a: "sha256-DEAD" } });
    const s = packageSimilarity(a, b);
    expect(s.assetOverlap).toBe(1);
    expect(s.score).toBeGreaterThanOrEqual(0.6);
    expect(s.signals.some((x) => x.includes("byte-identical"))).toBe(true);
  });

  it("flags a reimplemented clone with NO shared bytes via shape + description", () => {
    const a = m({
      name: "Comic Screentone",
      assets: [{ type: "brush", path: "a" }],
      files: { a: "sha256-AAAA" },
      description: "halftone dot screen brush pack for comic shading and manga inking",
    });
    const b = m({
      name: "Manga Dot Shader",
      assets: [{ type: "brush", path: "b" }],
      files: { b: "sha256-BBBB" },
      description: "halftone dot screen brush pack for comic shading and manga inking effects",
    });
    const s = packageSimilarity(a, b);
    expect(s.assetOverlap).toBe(0); // different bytes — a digest check would miss this
    expect(s.structureMatch).toBe(true);
    expect(s.descriptionSimilarity).toBeGreaterThanOrEqual(0.5);
    expect(s.score).toBeGreaterThan(0.2);
    expect(s.signals.some((x) => x.includes("shape"))).toBe(true);
  });

  it("catches a fuzzy name clone (typo/reword), not just substrings", () => {
    const a = m({ name: "Halftone", files: {} });
    const b = m({ name: "Haltone", files: {} }); // dropped a letter — no substring, but close
    expect(packageSimilarity(a, b).nameSimilarity).toBeGreaterThanOrEqual(0.6);
  });

  it("scores genuinely unrelated packages low", () => {
    const a = m({ name: "Ink Brushes", assets: [{ type: "brush", path: "a" }], files: { a: "sha256-1" }, description: "hand drawn ink brushes" });
    const b = m({ name: "Depth Model", assets: [{ type: "model", path: "b" }], files: { b: "sha256-2" }, description: "monocular depth estimation neural network" });
    const s = packageSimilarity(a, b);
    expect(s.assetOverlap).toBe(0);
    expect(s.structureMatch).toBe(false); // different asset-type palette
    expect(s.score).toBeLessThan(0.3);
  });

  it("normalizeName strips case and punctuation", () => {
    expect(normalizeName("Half-Tone Kit!")).toBe("halftonekit");
  });
});
