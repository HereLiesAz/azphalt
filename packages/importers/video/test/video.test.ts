import { describe, it, expect } from "vitest";
import { importVideo } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

describe("importer-video", () => {
  it("packages an MP4 (ISO-BMFF) file into a verifiable azp", () => {
    // A realistic `ftyp` box: box size + "ftyp" tag + major brand "isom" + minor
    // version + compatible brands.
    const mp4 = new Uint8Array([
      0x00, 0x00, 0x00, 0x18,
      0x66, 0x74, 0x79, 0x70, // "ftyp"
      0x69, 0x73, 0x6f, 0x6d, // major brand "isom"
      0x00, 0x00, 0x02, 0x00, // minor version
      0x69, 0x73, 0x6f, 0x6d, // compatible "isom"
      0x6d, 0x70, 0x34, 0x32, // compatible "mp42"
    ]);

    const azp = importVideo(mp4, {
      id: "test.video",
      version: "1.0.0",
      author: "Test",
    });

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("video");
    expect(parsed.manifest.assets![0].path).toBe("assets/video.mp4");
    expect(parsed.manifest.assets![0].params?.format).toBe("mp4");
    expect(parsed.manifest.assets![0].params?.brand).toBe("isom");
    expect(parsed.payload["assets/video.mp4"]).toEqual(mp4);
    expect(parsed.payload["LICENSE"]).toBeTruthy();
  });

  it("detects a QuickTime major brand as .mov", () => {
    const mov = new Uint8Array([
      0x00, 0x00, 0x00, 0x14,
      0x66, 0x74, 0x79, 0x70, // "ftyp"
      0x71, 0x74, 0x20, 0x20, // major brand "qt  "
      0x00, 0x00, 0x00, 0x00,
      0x71, 0x74, 0x20, 0x20, // compatible "qt  "
    ]);

    const azp = importVideo(mov, { id: "test.mov", version: "1.0.0", author: "Test" });

    expect(verifyAzp(azp).ok).toBe(true);
    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].path).toBe("assets/video.mov");
    expect(parsed.manifest.assets![0].params?.format).toBe("mov");
    expect(parsed.manifest.assets![0].params?.brand).toBe("qt  ");
  });

  it("detects a WebM/Matroska EBML header as .webm", () => {
    const webm = new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 0x01, 0x00, 0x00, 0x00]);

    const azp = importVideo(webm, { id: "test.webm", version: "1.0.0", author: "Test" });

    expect(verifyAzp(azp).ok).toBe(true);
    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].path).toBe("assets/video.webm");
    expect(parsed.manifest.assets![0].params?.format).toBe("webm");
    // WebM carries no ISO-BMFF brand.
    expect(parsed.manifest.assets![0].params?.brand).toBeUndefined();
  });

  it("threads a custom license id and license text", () => {
    const mp4 = new Uint8Array([
      0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d,
    ]);

    const azp = importVideo(mp4, {
      id: "test.license",
      version: "1.0.0",
      author: "Test",
      license: "Apache-2.0",
      licenseText: "Apache License Version 2.0 — full text here\n",
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.license).toBe("Apache-2.0");
    expect(new TextDecoder().decode(parsed.payload["LICENSE"])).toBe(
      "Apache License Version 2.0 — full text here\n",
    );
  });

  it("rejects unrecognized container bytes", () => {
    const junk = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07]);
    expect(() =>
      importVideo(junk, { id: "test.bad", version: "1.0.0", author: "Test" }),
    ).toThrow(/unrecognized video container/);
  });
});
