import { describe, it, expect } from "vitest";
import { importGltf } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-gltf", () => {
  it("packages a GLB file into an azp", () => {
    // Fake GLB header
    const glb = new Uint8Array([0x67, 0x6C, 0x54, 0x46, 0x02, 0x00, 0x00, 0x00]);
    
    const azp = importGltf(glb, {
      id: "test.mesh",
      version: "1.0.0",
      author: "Test"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("mesh");
    expect(parsed.manifest.assets![0].path).toBe("assets/model.glb");
    
    expect(parsed.payload["assets/model.glb"]).toEqual(glb);
  });
});
