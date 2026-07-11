import { describe, it, expect } from "vitest";
import { parseCube, importCube } from "../src/index";
import { readAzp, verifyAzp } from "@azphalt/azp";

const CUBE = [
  'TITLE "Identity 2"',
  "LUT_3D_SIZE 2",
  "0 0 0",
  "1 0 0",
  "0 1 0",
  "1 1 0",
  "0 0 1",
  "1 0 1",
  "0 1 1",
  "1 1 1",
  "",
].join("\n");

const LICENSE = "MIT License\n\nCopyright (c) 2026 Az\n";

describe("parseCube", () => {
  it("parses a 3D LUT", () => {
    const lut = parseCube(CUBE);
    expect(lut.dimensions).toBe(3);
    expect(lut.size).toBe(2);
    expect(lut.entries.length).toBe(8);
    expect(lut.title).toBe("Identity 2");
    expect(lut.domainMin).toEqual([0, 0, 0]);
    expect(lut.domainMax).toEqual([1, 1, 1]);
  });

  it("rejects a wrong entry count", () => {
    expect(() => parseCube("LUT_3D_SIZE 2\n0 0 0\n")).toThrow(/expected 8 entries/);
  });

  it("rejects a file with no size directive", () => {
    expect(() => parseCube("0 0 0\n1 1 1\n")).toThrow(/LUT_1D_SIZE/);
  });
});

describe("importCube", () => {
  it("produces a verifiable .azp asset package", () => {
    const { azp, manifest, lut } = importCube(CUBE, LICENSE, { id: "com.hereliesaz.identity" });

    expect(manifest.kind).toBe("asset");
    expect(manifest.id).toBe("com.hereliesaz.identity");
    expect(manifest.name).toBe("Identity 2");
    expect(manifest.assets?.[0].type).toBe("lut");
    expect(manifest.assets?.[0].params?.size).toBe(2);
    expect(lut.dimensions).toBe(3);

    expect(verifyAzp(azp).ok).toBe(true);

    const back = readAzp(azp);
    expect(Object.keys(back.payload)).toContain("assets/identity-2.cube");
    expect(back.payload["LICENSE"]).toBeTruthy();
    expect(new TextDecoder().decode(back.payload["assets/identity-2.cube"])).toBe(CUBE);
  });

  it("honors an explicit asset name", () => {
    const { manifest } = importCube(CUBE, LICENSE, { id: "com.x.y", assetName: "teal-fade" });
    expect(manifest.assets?.[0].path).toBe("assets/teal-fade.cube");
  });
});
