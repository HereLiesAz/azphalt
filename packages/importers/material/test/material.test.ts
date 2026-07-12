import { describe, it, expect } from "vitest";
import { importMaterial } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

// Real magic bytes for each supported format.
const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46]);
const WEBP = new Uint8Array([
  0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50
]);

const BASE = { id: "test.material", version: "1.0.0", author: "Test" };

describe("importer-material", () => {
  it("packages PBR maps, deriving each extension from its bytes", () => {
    const azp = importMaterial({ ...BASE, maps: { albedo: PNG, normal: PNG } });

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("material");
    // Top-level path points at the albedo map, not the bare "assets/".
    expect(parsed.manifest.assets![0].path).toBe("assets/albedo.png");
    expect(parsed.manifest.assets![0].params).toEqual({
      albedo: "assets/albedo.png",
      normal: "assets/normal.png"
    });
    expect(parsed.payload["assets/albedo.png"]).toEqual(PNG);
    expect(parsed.payload["assets/normal.png"]).toEqual(PNG);
  });

  it("labels a JPEG albedo as .jpg", () => {
    const azp = importMaterial({ ...BASE, maps: { albedo: JPEG } });

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].path).toBe("assets/albedo.jpg");
    expect(parsed.manifest.assets![0].params).toEqual({ albedo: "assets/albedo.jpg" });
    expect(parsed.payload["assets/albedo.jpg"]).toEqual(JPEG);
  });

  it("labels a WebP map as .webp", () => {
    const parsed = readAzp(importMaterial({ ...BASE, maps: { albedo: WEBP } }));
    expect(parsed.manifest.assets![0].path).toBe("assets/albedo.webp");
  });

  it("falls back to basecolor, then the first map, for the top-level path", () => {
    const withBaseColor = readAzp(
      importMaterial({ ...BASE, maps: { basecolor: PNG, normal: PNG } })
    );
    expect(withBaseColor.manifest.assets![0].path).toBe("assets/basecolor.png");

    const noBase = readAzp(importMaterial({ ...BASE, maps: { roughness: PNG, normal: PNG } }));
    expect(noBase.manifest.assets![0].path).toBe("assets/roughness.png");
  });

  it("threads an explicit license and licenseText", () => {
    const parsed = readAzp(
      importMaterial({
        ...BASE,
        license: "Apache-2.0",
        licenseText: "Apache License text.",
        maps: { albedo: PNG }
      })
    );
    expect(parsed.manifest.license).toBe("Apache-2.0");
    expect(new TextDecoder().decode(parsed.payload["LICENSE"])).toBe("Apache License text.");
  });

  it("defaults the license to MIT with placeholder text", () => {
    const parsed = readAzp(importMaterial({ ...BASE, maps: { albedo: PNG } }));
    expect(parsed.manifest.license).toBe("MIT");
    expect(new TextDecoder().decode(parsed.payload["LICENSE"])).toContain("MIT");
  });

  it("rejects an unrecognized image format", () => {
    expect(() =>
      importMaterial({ ...BASE, maps: { albedo: new Uint8Array([0x00, 0x01, 0x02, 0x03]) } })
    ).toThrow(/unrecognized image format for map 'albedo'/);
  });

  it("rejects when no maps are provided", () => {
    expect(() => importMaterial({ ...BASE, maps: {} })).toThrow();
  });
});
