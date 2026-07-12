import { describe, it, expect } from "vitest";
import { importMaterial } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-material", () => {
  it("packages PBR texture maps into an azp", () => {
    const dummyPng = new Uint8Array([0x89, 0x50, 0x4E, 0x47]);
    
    const azp = importMaterial({
      id: "test.material",
      version: "1.0.0",
      author: "Test",
      maps: {
        albedo: dummyPng,
        normal: dummyPng
      }
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("material");
    
    expect(parsed.manifest.assets![0].params).toEqual({
      albedo: "assets/albedo.png",
      normal: "assets/normal.png"
    });
    
    expect(parsed.payload["assets/albedo.png"]).toEqual(dummyPng);
    expect(parsed.payload["assets/normal.png"]).toEqual(dummyPng);
  });
});
