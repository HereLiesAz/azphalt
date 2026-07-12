import { describe, it, expect } from "vitest";
import { importPalette } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-palette", () => {
  it("packages an ASE file into an azp", () => {
    // Fake ASEF header
    const asef = new Uint8Array([0x41, 0x53, 0x45, 0x46, 0x00, 0x01, 0x00, 0x00]);
    
    const azp = importPalette(asef, {
      id: "test.palette",
      version: "1.0.0",
      author: "Test"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("palette");
    expect(parsed.manifest.assets![0].path).toBe("assets/palette.ase");
    
    expect(parsed.payload["assets/palette.ase"]).toEqual(asef);
  });

  it("packages a JSON array into an azp", () => {
    const jsonStr = `["#ffffff", "#000000"]`;
    const jsonBytes = new TextEncoder().encode(jsonStr);

    const azp = importPalette(jsonBytes, {
      id: "test.palette.json",
      version: "1.0.0",
      author: "Test"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].path).toBe("assets/palette.json");
  });
});
