import { describe, it, expect } from "vitest";
import { importFont, importFontPackage } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

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

  it("packages a woff2 as a font-kind package that verifies", () => {
    const woff2 = new Uint8Array([0x77, 0x4f, 0x46, 0x32, 0, 0, 0, 0]);
    const azp = importFontPackage(woff2, { id: "com.acme.azphalt.fancy", version: "1.0.0", author: "Acme", family: "Fancy Face" });
    const parsed = readAzp(azp);
    expect(parsed.manifest.kind).toBe("font");
    expect(parsed.manifest.font!.family).toBe("Fancy Face");
    expect(parsed.manifest.font!.faces[0]).toMatchObject({ path: "fonts/FancyFace.woff2", format: "woff2" });
    expect(parsed.payload["fonts/FancyFace.woff2"]).toEqual(woff2);
    expect(verifyAzp(azp).errors ?? []).toEqual([]);
  });

  it("refuses woff, collections and unreadable fonts", () => {
    expect(() => importFontPackage(new Uint8Array([0x77, 0x4f, 0x46, 0x46, 0]), { id: "a.b", version: "1.0.0", author: "x", family: "F" })).toThrow(/ttf, otf or woff2/);
    expect(() => importFontPackage(new Uint8Array([0, 1, 0, 0]), { id: "a.b", version: "1.0.0", author: "x" })).toThrow(/readable/);
  });
});
