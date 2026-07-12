import { describe, it, expect } from "vitest";
import { importMotion } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-motion", () => {
  it("packages a motion JSON array into an azp", () => {
    const json = `[0.25, 0.1, 0.25, 1.0]`;
    
    const azp = importMotion(json, {
      id: "test.motion",
      version: "1.0.0",
      author: "Test"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("motion");
    expect(parsed.manifest.assets![0].path).toBe("assets/motion.json");
    
    const parsedBack = JSON.parse(new TextDecoder().decode(parsed.payload["assets/motion.json"]));
    expect(parsedBack).toEqual([0.25, 0.1, 0.25, 1.0]);
  });
});
