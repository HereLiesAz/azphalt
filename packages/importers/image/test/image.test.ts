import { describe, it, expect } from "vitest";
import { importImage } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-image", () => {
  it("packages an image file into an azp", () => {
    const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x01]);
    
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
