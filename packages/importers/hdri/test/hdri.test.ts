import { describe, it, expect } from "vitest";
import { importHdri, parseHdri } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

const HDR = new TextEncoder().encode(
  "#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y 2 +X 2\n",
);

/** OpenEXR: 4-byte magic 0x76 0x2f 0x31 0x01 followed by header bytes. */
const EXR = new Uint8Array([0x76, 0x2f, 0x31, 0x01, 0x00, 0x00, 0x00, 0x00]);

describe("parseHdri", () => {
  it("detects Radiance HDR", () => {
    expect(parseHdri(HDR).format).toBe("hdr");
  });

  it("detects OpenEXR", () => {
    expect(parseHdri(EXR).format).toBe("exr");
  });

  it("rejects unrecognized bytes instead of mislabeling them", () => {
    expect(() => parseHdri(new Uint8Array([0, 1, 2, 3, 4, 5]))).toThrow(
      /unrecognized HDRI format/,
    );
  });
});

describe("importHdri", () => {
  it("packages a Radiance HDR into a verifiable azp", () => {
    const azp = importHdri(HDR, { id: "test.hdri", version: "1.0.0", author: "Test" });
    expect(verifyAzp(azp).ok).toBe(true);

    const { manifest, payload } = readAzp(azp);
    expect(manifest.assets?.[0].type).toBe("hdri");
    expect(manifest.assets?.[0].path).toBe("assets/env.hdr");
    expect(manifest.assets?.[0].params?.format).toBe("hdr");
    expect(payload["assets/env.hdr"]).toEqual(HDR);
    expect(payload["LICENSE"]).toBeTruthy();
  });

  it("packages an OpenEXR into a verifiable azp with the correct label", () => {
    const azp = importHdri(EXR, { id: "test.hdri", version: "1.0.0", author: "Test" });
    expect(verifyAzp(azp).ok).toBe(true);

    const { manifest } = readAzp(azp);
    expect(manifest.assets?.[0].path).toBe("assets/env.exr");
    expect(manifest.assets?.[0].params?.format).toBe("exr");
  });

  it("threads an explicit license and license text", () => {
    const azp = importHdri(HDR, {
      id: "test.hdri",
      version: "1.0.0",
      author: "Test",
      license: "CC0-1.0",
      licenseText: "CC0 1.0 Universal\n\n...full text...\n",
    });
    const { manifest, payload } = readAzp(azp);
    expect(manifest.license).toBe("CC0-1.0");
    expect(new TextDecoder().decode(payload["LICENSE"])).toContain("CC0 1.0 Universal");
  });

  it("rejects unrecognized input", () => {
    expect(() =>
      importHdri(new Uint8Array([9, 9, 9, 9]), { id: "x", version: "1.0.0", author: "T" }),
    ).toThrow(/unrecognized HDRI format/);
  });
});
