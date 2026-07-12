import { describe, it, expect } from "vitest";
import { decodePackBits } from "../src/packbits";

describe("decodePackBits", () => {
  it("decodes the canonical Apple/TIFF vector", () => {
    // FE AA | 02 80 00 2A | FD AA  ->  AA AA AA 80 00 2A AA AA AA AA
    const enc = new Uint8Array([0xfe, 0xaa, 0x02, 0x80, 0x00, 0x2a, 0xfd, 0xaa]);
    expect(Array.from(decodePackBits(enc, 10))).toEqual([
      0xaa, 0xaa, 0xaa, 0x80, 0x00, 0x2a, 0xaa, 0xaa, 0xaa, 0xaa,
    ]);
  });

  it("stops at the expected length and treats 128 as a no-op", () => {
    expect(Array.from(decodePackBits(new Uint8Array([0x80, 0x00, 0x42]), 1))).toEqual([0x42]);
  });
});
