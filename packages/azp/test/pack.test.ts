import { describe, it, expect } from "vitest";
import { validatePackManifest } from "../src/pack";
import type { Manifest } from "@azphalt/azdk";

const base: Manifest = {
  azphalt: "0.1",
  id: "com.acme.base-set",
  name: "Acme Base Set",
  version: "1.0.0",
  kind: "pack",
  license: "MIT",
  compat: ">=0.1",
  files: { LICENSE: "sha256-def" },
  pack: {
    entries: [
      { id: "com.foldlab.filmluts", version: "1.0.0", required: true, note: "core grades" },
      { id: "com.brushery.inkbrushes", required: false }, // recommended, unpinned
    ],
  },
};

const clone = (): Manifest => JSON.parse(JSON.stringify(base));

describe("validatePackManifest", () => {
  it("accepts a well-formed pack manifest", () => {
    expect(validatePackManifest(base)).toEqual([]);
  });

  it("requires a pack block", () => {
    const m = clone();
    delete (m as { pack?: unknown }).pack;
    expect(validatePackManifest(m).some((e) => e.includes('requires a "pack" block'))).toBe(true);
  });

  it("requires at least one entry", () => {
    const m = clone();
    m.pack!.entries = [];
    expect(validatePackManifest(m).some((e) => e.includes("at least one entry"))).toBe(true);
  });

  it("requires each entry to have a non-empty id", () => {
    const m = clone();
    m.pack!.entries[0] = { id: "" };
    expect(validatePackManifest(m).some((e) => e.includes("non-empty string id"))).toBe(true);
  });

  it("rejects a non-string version", () => {
    const m = clone();
    (m.pack!.entries[0] as { version?: unknown }).version = 1 as unknown as string;
    expect(validatePackManifest(m).some((e) => e.includes("version, when present"))).toBe(true);
  });

  it("rejects a pack that references itself", () => {
    const m = clone();
    m.pack!.entries.push({ id: m.id });
    expect(validatePackManifest(m).some((e) => e.includes("must not reference the pack itself"))).toBe(true);
  });

  it("rejects a duplicate entry", () => {
    const m = clone();
    m.pack!.entries.push({ id: "com.foldlab.filmluts", version: "1.0.0" });
    expect(validatePackManifest(m).some((e) => e.includes("duplicate entry"))).toBe(true);
  });

  it("is header-only: rejects code/assets/app/mcp surfaces", () => {
    const m = clone();
    m.entry = "code/index.js";
    m.capabilities = ["bitmap"];
    m.assets = [{ type: "lut", path: "assets/x.cube" }];
    m.app = { platforms: {}, handoffs: [] } as unknown as Manifest["app"];
    m.mcp = { servers: [] } as unknown as Manifest["mcp"];
    const errs = validatePackManifest(m);
    expect(errs.some((e) => e.includes("must not declare entry/runtime"))).toBe(true);
    expect(errs.some((e) => e.includes("must not declare capabilities"))).toBe(true);
    expect(errs.some((e) => e.includes("must not declare assets"))).toBe(true);
    expect(errs.some((e) => e.includes("must not declare an app block"))).toBe(true);
    expect(errs.some((e) => e.includes("must not declare an mcp block"))).toBe(true);
  });
});
