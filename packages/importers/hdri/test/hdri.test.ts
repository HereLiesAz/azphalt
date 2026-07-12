import { describe, it, expect } from "vitest";
import { importHdri } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-hdri", () => {
  it("packages an HDR file into an azp", () => {
    const hdr = new TextEncoder().encode("#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n");
    
    const azp = importHdri(hdr, {
      id: "test.hdri",
      version: "1.0.0",
      author: "Test"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("hdri");
    expect(parsed.manifest.assets![0].path).toBe("assets/env.hdr");
    
    expect(parsed.payload["assets/env.hdr"]).toEqual(hdr);
  });
});
