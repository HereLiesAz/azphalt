import { describe, expect, it } from "vitest";
import type { Manifest } from "@azphalt/azdk";
import {
  isClosedOutline, parseSurface, validateSurfaceAssets, SURFACE_MAX_BYTES, SURFACE_MAX_POINTS,
} from "../src/surface.js";

const ok = (over: Record<string, unknown> = {}) =>
  JSON.stringify({ format: "azphalt.surface", version: 1, name: "Slab", front: [[0, 0], [1, 0], [1, 1], [0, 1]], ...over });
const err = (text: string | Uint8Array) => {
  const r = parseSurface(text);
  if (r.ok) throw new Error("expected rejection");
  return r.error;
};

describe("parseSurface", () => {
  it("accepts a minimal front-only surface and optional side/top", () => {
    expect(parseSurface(ok()).ok).toBe(true);
    const r = parseSurface(ok({ side: [[0, 0], [1, 1]], top: [[0, 0], [1, 0], [1, 1]] }));
    expect(r.ok && r.surface.side?.length).toBe(2);
  });
  it("rejects wrong format, version, unknown keys, missing front", () => {
    expect(err(ok({ format: "x" }))).toMatch(/format/);
    expect(err(ok({ version: 2 }))).toMatch(/version/);
    expect(err(ok({ relief: [] }))).toMatch(/unknown key/);
    expect(err(JSON.stringify({ format: "azphalt.surface", version: 1, name: "a" }))).toMatch(/front is required/);
  });
  it("rejects non-finite, out-of-range, malformed points", () => {
    expect(err(ok({ front: [[0, 0], [1e999, 1]] }))).toMatch(/non-finite/);
    expect(err(ok({ front: [[0, 0], [1.01, 1]] }))).toMatch(/unit box/);
    expect(err(ok({ front: [[0, 0], [-0.1, 1]] }))).toMatch(/unit box/);
    expect(err(ok({ front: [[0, 0], [1]] }))).toMatch(/pair/);
    expect(err(ok({ front: [[0, 0], ["1", 1]] }))).toMatch(/non-finite/);
    expect(err(ok({ front: [[0, 0]] }))).toMatch(/at least 2/);
    expect(err(ok({ front: [[0.5, 0.5], [0.5, 0.5]] }))).toMatch(/too short/);
  });
  it("bounds point count, size, depth and name", () => {
    const many = Array.from({ length: SURFACE_MAX_POINTS + 1 }, (_, i) => [i / 300, 0.5]);
    expect(err(ok({ front: many }))).toMatch(/limit/);
    expect(err(new Uint8Array(SURFACE_MAX_BYTES + 1))).toMatch(/larger/);
    expect(err("[".repeat(5000))).toMatch(/nested/);
    expect(err(ok({ name: "" }))).toMatch(/name/);
    expect(err(ok({ name: "x".repeat(65) }))).toMatch(/longer/);
    expect(err(ok({ name: "a\u0007b" }))).toMatch(/control/);
  });
  it("rejects duplicate keys, bad UTF-8 and non-objects", () => {
    expect(err('{"format":"azphalt.surface","format":"azphalt.surface"}')).toMatch(/duplicate/);
    expect(err(new Uint8Array([0xff, 0xfe, 0x7b]))).toMatch(/UTF-8/);
    expect(err("[]")).toMatch(/object/);
    expect(err("nope")).toMatch(/JSON/);
  });
});

describe("isClosedOutline", () => {
  it("tells area from an open curve", () => {
    expect(isClosedOutline([[0, 0], [1, 0], [1, 1], [0, 1]])).toBe(true);
    expect(isClosedOutline([[0, 0], [0.5, 0.2], [1, 0]])).toBe(true);
    expect(isClosedOutline([[0, 0], [0.5, 0.5], [1, 1]])).toBe(false);
  });
});

describe("validateSurfaceAssets", () => {
  const manifest = (asset: Record<string, unknown>) => ({ assets: [{ type: "surface", ...asset }] }) as unknown as Manifest;
  const enc = (s: string) => new TextEncoder().encode(s);
  it("passes a good asset and checks the declared name and path", () => {
    const m = manifest({ path: "assets/a.json", params: { name: "Slab" } });
    expect(validateSurfaceAssets(m, { "assets/a.json": enc(ok()) })).toEqual([]);
    expect(validateSurfaceAssets(manifest({ path: "assets/a.json", params: { name: "Other" } }), { "assets/a.json": enc(ok()) }).join()).toMatch(/params.name/);
    expect(validateSurfaceAssets(manifest({ path: "assets/a.png", params: { name: "Slab" } }), {}).join()).toMatch(/\.json/);
    expect(validateSurfaceAssets(manifest({ path: "", remoteUrl: "https://x/y.json" }), {}).join()).toMatch(/bundled/);
  });
  it("reports a malformed payload and duplicate names", () => {
    const m = manifest({ path: "assets/a.json", params: { name: "Slab" } });
    expect(validateSurfaceAssets(m, { "assets/a.json": enc("{}") }).join()).toMatch(/format/);
    const two = { assets: [
      { type: "surface", path: "a.json", params: { name: "Slab" } },
      { type: "surface", path: "b.json", params: { name: "Slab" } },
    ] } as unknown as Manifest;
    expect(validateSurfaceAssets(two, { "a.json": enc(ok()), "b.json": enc(ok()) }).join()).toMatch(/duplicate/);
  });
});
