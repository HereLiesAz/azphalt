import { describe, it, expect } from "vitest";
import { importPalette } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

/** A minimal, valid ASE file with one RGB colour ("White" = 1,1,1). */
function whiteAse(): Uint8Array {
  return new Uint8Array([
    0x41, 0x53, 0x45, 0x46, // "ASEF"
    0x00, 0x01, 0x00, 0x00, // version 1.0
    0x00, 0x00, 0x00, 0x01, // 1 block
    0x00, 0x01, // block type: colour entry
    0x00, 0x00, 0x00, 0x20, // block length: 32
    0x00, 0x06, // name: 6 UTF-16 units (incl. null)
    0x00, 0x57, 0x00, 0x68, 0x00, 0x69, 0x00, 0x74, 0x00, 0x65, 0x00, 0x00, // "White\0"
    0x52, 0x47, 0x42, 0x20, // "RGB "
    0x3f, 0x80, 0x00, 0x00, 0x3f, 0x80, 0x00, 0x00, 0x3f, 0x80, 0x00, 0x00, // 1.0, 1.0, 1.0
    0x00, 0x02, // colour type: normal
  ]);
}

function paletteJson(azp: Uint8Array): { colors: Array<{ name: string; color: string }> } {
  const parsed = readAzp(azp);
  expect(parsed.manifest.assets![0].type).toBe("palette");
  // The emitted asset is ALWAYS the normalized JSON, never the raw input bytes.
  expect(parsed.manifest.assets![0].path).toBe("assets/palette.json");
  return JSON.parse(new TextDecoder().decode(parsed.payload["assets/palette.json"]));
}

describe("importer-palette", () => {
  it("normalizes an ASE file into the `{ colors: [{ name, color }] }` wire format", () => {
    const azp = importPalette(whiteAse(), { id: "test.palette", version: "1.0.0", author: "Test" });
    expect(paletteJson(azp).colors).toEqual([{ name: "White", color: "#ffffff" }]);
  });

  it("normalizes a JSON hex array into named `#RRGGBB` swatches", () => {
    const jsonBytes = new TextEncoder().encode(`["#fff", "#000000"]`);
    const azp = importPalette(jsonBytes, { id: "test.palette.json", version: "1.0.0", author: "Test" });
    expect(paletteJson(azp).colors).toEqual([
      { name: "#FFFFFF", color: "#ffffff" },
      { name: "#000000", color: "#000000" },
    ]);
  });

  it("passes through named colours from a `{ colors: [...] }` object", () => {
    const jsonBytes = new TextEncoder().encode(JSON.stringify({ colors: [{ name: "Signal White", color: "#F2F2F0" }] }));
    const azp = importPalette(jsonBytes, { id: "test.palette.obj", version: "1.0.0", author: "Test" });
    expect(paletteJson(azp).colors).toEqual([{ name: "Signal White", color: "#f2f2f0" }]);
  });

  it("rejects an input that is neither ASE nor a valid palette", () => {
    expect(() => importPalette(new TextEncoder().encode("not json"), { id: "x", version: "1.0.0", author: "T" })).toThrow();
  });
});
