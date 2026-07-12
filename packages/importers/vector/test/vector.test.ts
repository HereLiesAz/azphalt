import { describe, it, expect } from "vitest";
import { importVector } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

const OPTS = { id: "test.vector", version: "1.0.0", author: "Test", filename: "test.svg" };

describe("importer-vector", () => {
  it("packages an SVG and lifts viewBox/width/height into params", () => {
    const svg = new TextEncoder().encode(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'></svg>"
    );
    const azp = importVector(svg, OPTS);

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    const asset = parsed.manifest.assets![0];
    expect(asset.type).toBe("vector");
    expect(asset.path).toBe("assets/vector.svg");
    expect(asset.params!.format).toBe("svg");
    expect(asset.params!.viewBox).toBe("0 0 24 24");
    expect(asset.params!.width).toBe("24");
    expect(asset.params!.height).toBe("24");
    expect(parsed.payload["assets/vector.svg"]).toEqual(svg);
  });

  it("omits absent viewBox/width/height", () => {
    const svg = new TextEncoder().encode("<svg xmlns='http://www.w3.org/2000/svg'></svg>");
    const parsed = readAzp(importVector(svg, OPTS));
    expect(parsed.manifest.assets![0].params).toEqual({ format: "svg" });
  });

  it("threads an explicit license and licenseText", () => {
    const svg = new TextEncoder().encode("<svg></svg>");
    const parsed = readAzp(
      importVector(svg, { ...OPTS, license: "Apache-2.0", licenseText: "TEXT" })
    );
    expect(parsed.manifest.license).toBe("Apache-2.0");
    expect(new TextDecoder().decode(parsed.payload["LICENSE"])).toBe("TEXT");
  });

  it("rejects XML that has no svg tag", () => {
    const xml = new TextEncoder().encode("<?xml version='1.0'?><foo/>");
    expect(() => importVector(xml, OPTS)).toThrow(/not an SVG/);
  });

  it("rejects non-XML text", () => {
    const txt = new TextEncoder().encode("just some plain text, not markup at all");
    expect(() => importVector(txt, OPTS)).toThrow(/not an SVG/);
  });
});
