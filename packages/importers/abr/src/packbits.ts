/**
 * PackBits (Apple/TIFF RLE) decoder — the compression `.abr` sampled brushes use. A control byte
 * `n`: `0..127` → the next `n+1` bytes are literal; `129..255` → the next byte repeats `257-n`
 * times; `128` is a no-op.
 */
export function decodePackBits(src: Uint8Array, expected: number): Uint8Array {
  const out = new Uint8Array(expected);
  let s = 0;
  let o = 0;
  while (o < expected && s < src.length) {
    const n = src[s++];
    if (n < 128) {
      const count = n + 1;
      for (let i = 0; i < count && o < expected; i++) out[o++] = src[s++];
    } else if (n > 128) {
      const count = 257 - n;
      const b = src[s++];
      for (let i = 0; i < count && o < expected; i++) out[o++] = b;
    }
    // n === 128: no-op
  }
  return out;
}
