import { describe, it, expect } from "vitest";
import { unzlibSync } from "fflate";
import { encodeGrayPng } from "../src/png";

function readChunks(png: Uint8Array): Record<string, Uint8Array> {
  const dv = new DataView(png.buffer, png.byteOffset, png.byteLength);
  const chunks: Record<string, Uint8Array> = {};
  let p = 8;
  while (p < png.length) {
    const len = dv.getUint32(p);
    let type = "";
    for (let i = 0; i < 4; i++) type += String.fromCharCode(png[p + 4 + i]);
    chunks[type] = png.subarray(p + 8, p + 8 + len);
    p += 12 + len; // length(4) + type(4) + data + crc(4)
  }
  return chunks;
}

describe("encodeGrayPng", () => {
  it("writes a valid grayscale PNG that decodes back to the pixels", () => {
    const width = 3;
    const height = 2;
    const gray = new Uint8Array([0, 64, 128, 192, 255, 32]);
    const png = encodeGrayPng(width, height, gray);

    expect(Array.from(png.subarray(0, 8))).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);

    const chunks = readChunks(png);
    const ih = new DataView(chunks.IHDR.buffer, chunks.IHDR.byteOffset, chunks.IHDR.byteLength);
    expect(ih.getUint32(0)).toBe(width);
    expect(ih.getUint32(4)).toBe(height);
    expect(chunks.IHDR[8]).toBe(8); // bit depth
    expect(chunks.IHDR[9]).toBe(0); // grayscale
    expect(chunks.IEND).toBeDefined();

    const raw = unzlibSync(chunks.IDAT);
    const back: number[] = [];
    for (let y = 0; y < height; y++) {
      expect(raw[y * (width + 1)]).toBe(0); // "None" filter byte per row
      for (let x = 0; x < width; x++) back.push(raw[y * (width + 1) + 1 + x]);
    }
    expect(back).toEqual(Array.from(gray));
  });
});
