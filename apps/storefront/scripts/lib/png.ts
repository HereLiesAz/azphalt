/**
 * A minimal, deterministic PNG encoder — RGBA8, no interlacing, no ancillary chunks.
 *
 * Deliberately hand-rolled rather than pulled from a dependency. `sharp` is present in the tree only
 * as an optional transitive of `next` and is not resolvable from this package, and the alternatives
 * are native builds whose output can shift between versions. Preview bytes end up compared by digest
 * in CI, so "the same input encodes to the same bytes on every machine, forever" matters more here
 * than breadth of format support.
 *
 * Determinism comes from fixing everything the format leaves open: filter type 0 on every scanline
 * (no adaptive heuristic), a fixed zlib level, and no `tIME`/`tEXt` chunks.
 */
import { deflateSync } from "node:zlib";

/** CRC-32 (IEEE), the polynomial PNG specifies for every chunk. */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Uint8Array): Uint8Array {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, "ascii");
  Buffer.from(data).copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return new Uint8Array(out);
}

/**
 * Encode straight-alpha RGBA8 (`stride = width * 4`, the image-buffer ABI in
 * `spec/capability-model.md`) as a PNG.
 */
export function encodePng(rgba: Uint8Array, width: number, height: number): Uint8Array {
  if (rgba.length !== width * height * 4) {
    throw new Error(`png: expected ${width * height * 4} bytes for ${width}x${height}, got ${rgba.length}`);
  }

  // Each scanline is prefixed with its filter byte; 0 = None, chosen for reproducibility.
  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const src = y * width * 4;
    const dst = y * (1 + width * 4);
    raw[dst] = 0;
    Buffer.from(rgba.buffer, rgba.byteOffset + src, width * 4).copy(raw, dst + 1);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type 6 = RGBA
  ihdr[10] = 0; // deflate
  ihdr[11] = 0; // adaptive filtering
  ihdr[12] = 0; // no interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", new Uint8Array(ihdr)),
    chunk("IDAT", new Uint8Array(deflateSync(raw, { level: 9 }))),
    chunk("IEND", new Uint8Array(0)),
  ]);
}
