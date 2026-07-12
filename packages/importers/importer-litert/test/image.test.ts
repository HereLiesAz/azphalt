import { describe, it, expect } from "vitest";
import { importImage } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-image", () => {
  it("packages an image file into an azp", () => {
    const png = new Uint8Array([0x89, 0x50, 0x4E, 0x47]);
    
    const azp = importImage(png, {
      id: "test.image",
      version: "1.0.0",
      author: "Test",
      filename: "test.png"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("image");
    expect(parsed.manifest.assets![0].path).toBe("assets/image.png");
    
    expect(parsed.payload["assets/image.png"]).toEqual(png);
  });
});
