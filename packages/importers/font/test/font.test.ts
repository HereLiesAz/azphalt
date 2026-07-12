import { describe, it, expect } from "vitest";
import { importFont } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-font", () => {
  it("packages a font file into an azp", () => {
    const ttf = new Uint8Array([0x00, 0x01, 0x00, 0x00]);
    
    const azp = importFont(ttf, {
      id: "test.font",
      version: "1.0.0",
      author: "Test",
      filename: "test.ttf"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("font");
    expect(parsed.manifest.assets![0].path).toBe("assets/font.ttf");
    
    expect(parsed.payload["assets/font.ttf"]).toEqual(ttf);
  });
});
