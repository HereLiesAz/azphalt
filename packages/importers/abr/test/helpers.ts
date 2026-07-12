/**
 * Independent big-endian byte writer + fixture builders for the tests. These construct `.abr` and
 * descriptor bytes straight from the documented layout — deliberately NOT via the parser — so a
 * passing test means an independent writer and the reader agree, not that the parser round-trips
 * itself.
 */

export class Writer {
  private parts: number[] = [];

  u8(v: number): this {
    this.parts.push(v & 0xff);
    return this;
  }
  u16(v: number): this {
    return this.u8(v >>> 8).u8(v);
  }
  i16(v: number): this {
    return this.u16(v & 0xffff);
  }
  u32(v: number): this {
    return this.u8(v >>> 24).u8(v >>> 16).u8(v >>> 8).u8(v);
  }
  i32(v: number): this {
    return this.u32(v >>> 0);
  }
  f64(v: number): this {
    const b = new Uint8Array(8);
    new DataView(b.buffer).setFloat64(0, v);
    return this.raw(b);
  }
  ascii(s: string): this {
    for (let i = 0; i < s.length; i++) this.u8(s.charCodeAt(i));
    return this;
  }
  /** Photoshop Unicode string: length (incl. NUL) + UTF-16BE + NUL. */
  unicode(s: string): this {
    this.u32(s.length + 1);
    for (let i = 0; i < s.length; i++) this.u16(s.charCodeAt(i));
    return this.u16(0);
  }
  raw(u8: Uint8Array | number[]): this {
    for (const x of u8) this.u8(x);
    return this;
  }
  build(): Uint8Array {
    return new Uint8Array(this.parts);
  }
  get length(): number {
    return this.parts.length;
  }
}

/** 4-byte key with the zero length-prefix (the `readKey` "code" form). */
function code(w: Writer, key: string): Writer {
  return w.u32(0).ascii(key);
}

/** bounds(long) + depth(8) + compression(0=raw) + raw gray bytes. */
export function sampledTailRaw(width: number, height: number, gray: number[]): Uint8Array {
  return new Writer()
    .i32(0)
    .i32(0)
    .i32(height)
    .i32(width)
    .u16(8)
    .u8(0)
    .raw(gray)
    .build();
}

/** bounds(long) + depth(8) + compression(1=RLE) + per-row u16 lengths + PackBits rows.
 *  Each row is encoded as a single repeat run of `value` (exercises the decoder's repeat path). */
export function sampledTailRleConst(width: number, height: number, value: number): Uint8Array {
  const w = new Writer().i32(0).i32(0).i32(height).i32(width).u16(8).u8(1);
  for (let y = 0; y < height; y++) w.u16(2); // each row is 2 bytes: [control][value]
  for (let y = 0; y < height; y++) w.u8(257 - width).u8(value); // repeat `value` width times
  return w.build();
}

/** A v1/v2 sampled `.abr` with one brush. */
export function abrV12(opts: {
  version: 1 | 2;
  name?: string;
  spacing: number;
  tail: Uint8Array;
}): Uint8Array {
  const block = new Writer();
  if (opts.version === 2) block.unicode(opts.name ?? "");
  block.u32(0).u16(opts.spacing).u8(0).i16(0).i16(0).i16(0).i16(0).raw(opts.tail);
  const b = block.build();
  return new Writer().u16(opts.version).u16(1).u16(2).u32(b.length).raw(b).build();
}

/** A descriptor body: name + classID + items. `items` are pre-encoded (key + OSType + value). */
export function descriptor(items: Uint8Array[]): Uint8Array {
  const w = new Writer().unicode(""); // descriptor name
  code(w, "Brsh"); // classID
  w.u32(items.length);
  for (const it of items) w.raw(it);
  return w.build();
}

export const item = {
  untf: (key: string, unit: string, v: number) =>
    code(new Writer(), key).ascii("UntF").ascii(unit).f64(v).build(),
  doub: (key: string, v: number) => code(new Writer(), key).ascii("doub").f64(v).build(),
  text: (key: string, v: string) => code(new Writer(), key).ascii("TEXT").unicode(v).build(),
  bool: (key: string, v: boolean) => code(new Writer(), key).ascii("bool").u8(v ? 1 : 0).build(),
};

/** A v6 `.abr` with one sampled brush (`samp`) and a dynamics descriptor (`desc`). */
export function abrV6(opts: { name?: string; tail: Uint8Array; desc: Uint8Array }): Uint8Array {
  const samp = new Writer();
  const entry = new Writer().unicode(opts.name ?? "").raw(opts.tail).build();
  samp.u32(entry.length).raw(entry);
  const sampData = samp.build();

  const descData = new Writer().u32(16).raw(opts.desc).build(); // leading descriptor version 16

  return new Writer()
    .u16(6)
    .u16(2)
    .ascii("8BIM")
    .ascii("samp")
    .u32(sampData.length)
    .raw(sampData)
    .ascii("8BIM")
    .ascii("desc")
    .u32(descData.length)
    .raw(descData)
    .build();
}
