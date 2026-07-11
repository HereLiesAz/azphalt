import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { importAbr, parseAbr, UnsupportedAbrError } from "../src/index";
import { abrV12, abrV6, descriptor, item, sampledTailRaw, sampledTailRleConst } from "./helpers";

const gray6 = [0, 40, 80, 120, 160, 200]; // 3×2

describe("parseAbr v1/2", () => {
  it("parses a raw sampled brush with name + spacing", () => {
    const bytes = abrV12({ version: 2, name: "Dry Ink", spacing: 25, tail: sampledTailRaw(3, 2, gray6) });
    const f = parseAbr(bytes);
    expect(f.version).toBe(2);
    expect(f.brushes).toHaveLength(1);
    const b = f.brushes[0];
    expect(b.kind).toBe("sampled");
    expect(b.name).toBe("Dry Ink");
    expect(b.spacing).toBe(25);
    expect(b.width).toBe(3);
    expect(b.height).toBe(2);
    expect(Array.from(b.gray!)).toEqual(gray6);
  });

  it("decodes RLE (PackBits) rows", () => {
    const bytes = abrV12({ version: 1, spacing: 10, tail: sampledTailRleConst(4, 2, 200) });
    const b = parseAbr(bytes).brushes[0];
    expect(b.width).toBe(4);
    expect(b.height).toBe(2);
    expect(Array.from(b.gray!)).toEqual([200, 200, 200, 200, 200, 200, 200, 200]);
  });
});

describe("parseAbr v6", () => {
  it("parses a samp bitmap plus desc dynamics", () => {
    const desc = descriptor([
      item.untf("Dmtr", "#Pxl", 40),
      item.untf("Spcn", "#Prc", 25),
      item.doub("Hrdn", 0.8),
    ]);
    const f = parseAbr(abrV6({ name: "Tip", tail: sampledTailRaw(3, 2, gray6), desc }));
    expect(f.version).toBe(6);
    const b = f.brushes[0];
    expect(b.name).toBe("Tip");
    expect(Array.from(b.gray!)).toEqual(gray6);
    expect(b.params!.diameter).toBe(40);
    expect(b.params!.spacing).toBe(25);
    expect(b.params!.hardness).toBeCloseTo(0.8);
  });
});

describe("importAbr", () => {
  it("produces a verifiable .azp brush asset with a PNG tip", () => {
    const bytes = abrV12({ version: 2, name: "Dry Ink", spacing: 25, tail: sampledTailRaw(3, 2, gray6) });
    const { azp, manifest, brush } = importAbr(bytes, "MIT\n", { id: "com.hereliesaz.dry-ink" });

    expect(manifest.kind).toBe("asset");
    expect(manifest.assets?.[0].type).toBe("brush");
    expect(manifest.assets?.[0].params?.width).toBe(3);
    expect(manifest.assets?.[0].params?.spacing).toBe(25);
    expect(brush.width).toBe(3);
    expect(verifyAzp(azp).ok).toBe(true);

    const back = readAzp(azp);
    expect(Object.keys(back.payload)).toContain("assets/dry-ink.png");
    expect(back.payload["LICENSE"]).toBeTruthy();
    expect(Array.from(back.payload["assets/dry-ink.png"].subarray(0, 8))).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  });

  it("throws on an unsupported version", () => {
    expect(() => parseAbr(new Uint8Array([0, 99]))).toThrow(UnsupportedAbrError);
  });
});
