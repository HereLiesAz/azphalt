import { describe, it, expect } from "vitest";
import { writeAzp, signAzp, generateSigningKey } from "@azphalt/azp";
import { verifyPackage, inspectPackage, extractAsset } from "../src/tools";

/** A minimal asset `.azp` — one LUT payload + a UI panel — built the way an importer would. */
function sampleAzp() {
  return writeAzp({
    manifest: {
      azphalt: "0.1",
      id: "com.example.grade",
      name: "Teal Grade",
      version: "1.2.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      author: "Az",
      description: "A teal color grade.",
      assets: [{ type: "lut", path: "assets/grade.cube", ui: "ui/grade.json", params: { format: "cube" } }],
    },
    payload: {
      "assets/grade.cube": new TextEncoder().encode("TITLE \"Teal\"\nLUT_3D_SIZE 2\n"),
      "ui/grade.json": new TextEncoder().encode("{}"),
    },
    license: "MIT License",
  }).azp;
}

describe("mcp tools", () => {
  it("verifyPackage reports ok + unsigned for a valid unsigned package", () => {
    const r = verifyPackage(sampleAzp());
    expect(r.ok).toBe(true);
    expect(r.errors).toEqual([]);
    expect(r.signed).toBe(false);
  });

  it("verifyPackage reports signed:true once a signature is added", () => {
    const key = generateSigningKey();
    const signed = signAzp(sampleAzp(), { privateKey: key.privateKey });
    const r = verifyPackage(signed);
    expect(r.ok).toBe(true);
    expect(r.signed).toBe(true);
  });

  it("verifyPackage fails a tampered package", () => {
    const azp = sampleAzp();
    azp[azp.length - 20] ^= 0xff; // flip a byte inside the archive
    expect(verifyPackage(azp).ok).toBe(false);
  });

  it("inspectPackage surfaces manifest identity, assets, payload, and verification", () => {
    const report = inspectPackage(sampleAzp());
    expect(report.id).toBe("com.example.grade");
    expect(report.name).toBe("Teal Grade");
    expect(report.version).toBe("1.2.0");
    expect(report.kind).toBe("asset");
    expect(report.license).toBe("MIT");
    expect(report.author).toBe("Az");
    expect(report.assets).toEqual([
      { type: "lut", path: "assets/grade.cube", ui: "ui/grade.json", format: "cube" },
    ]);
    expect(report.payload).toContain("assets/grade.cube");
    expect(report.payload).toContain("ui/grade.json");
    expect(report.payload).toContain("LICENSE");
    expect(report.verify.ok).toBe(true);
  });

  it("extractAsset returns the requested payload entry as base64", () => {
    const { path, bytesBase64 } = extractAsset(sampleAzp(), "assets/grade.cube");
    expect(path).toBe("assets/grade.cube");
    expect(Buffer.from(bytesBase64, "base64").toString()).toBe('TITLE "Teal"\nLUT_3D_SIZE 2\n');
  });

  it("extractAsset throws for a missing asset path", () => {
    expect(() => extractAsset(sampleAzp(), "assets/nope.cube")).toThrow(/not found/);
  });
});
