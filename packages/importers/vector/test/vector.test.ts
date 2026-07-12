import { describe, it, expect } from "vitest";
import { importVector } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-vector", () => {
  it("packages an SVG file into an azp", () => {
    const svg = new TextEncoder().encode("<svg xmlns='http://www.w3.org/2000/svg'></svg>");
    
    const azp = importVector(svg, {
      id: "test.vector",
      version: "1.0.0",
      author: "Test",
      filename: "test.svg"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("vector");
    expect(parsed.manifest.assets![0].path).toBe("assets/vector.svg");
    
    expect(parsed.payload["assets/vector.svg"]).toEqual(svg);
  });
});
