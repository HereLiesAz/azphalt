/**
 * Big-endian byte reader for Photoshop binary structures (`.abr`, action descriptors). Photoshop
 * stores everything big-endian; `DataView` defaults to big-endian, so no flags are needed.
 */
export class Reader {
  private view: DataView;
  pos = 0;

  constructor(private buf: Uint8Array) {
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  }

  get length(): number {
    return this.buf.length;
  }
  get remaining(): number {
    return this.buf.length - this.pos;
  }
  eof(): boolean {
    return this.pos >= this.buf.length;
  }

  u8(): number {
    return this.view.getUint8(this.pos++);
  }
  i16(): number {
    const v = this.view.getInt16(this.pos);
    this.pos += 2;
    return v;
  }
  u16(): number {
    const v = this.view.getUint16(this.pos);
    this.pos += 2;
    return v;
  }
  i32(): number {
    const v = this.view.getInt32(this.pos);
    this.pos += 4;
    return v;
  }
  u32(): number {
    const v = this.view.getUint32(this.pos);
    this.pos += 4;
    return v;
  }
  f64(): number {
    const v = this.view.getFloat64(this.pos);
    this.pos += 8;
    return v;
  }

  /** Guard a read of `n` bytes at the current position against the buffer end (malformed input). */
  private check(n: number): void {
    if (n < 0 || this.pos + n > this.buf.length) {
      throw new RangeError(`read of ${n} byte(s) at ${this.pos} exceeds buffer length ${this.buf.length}`);
    }
  }

  /** A view into the underlying buffer — copy with `.slice()` if it must outlive the reader. */
  bytes(n: number): Uint8Array {
    this.check(n);
    const b = this.buf.subarray(this.pos, this.pos + n);
    this.pos += n;
    return b;
  }
  ascii(n: number): string {
    this.check(n);
    let s = "";
    for (let i = 0; i < n; i++) s += String.fromCharCode(this.buf[this.pos++]);
    return s;
  }
  skip(n: number): void {
    this.check(n);
    this.pos += n;
  }
  seek(p: number): void {
    if (p < 0 || p > this.buf.length) {
      throw new RangeError(`seek to ${p} out of bounds (length ${this.buf.length})`);
    }
    this.pos = p;
  }

  /** Photoshop Unicode string: `u32` length in UTF-16 code units, then UTF-16BE; trailing NUL dropped. */
  unicode(): string {
    const len = this.u32();
    this.check(len * 2); // reject an absurd claimed length before allocating/looping
    let s = "";
    for (let i = 0; i < len; i++) {
      const c = this.u16();
      if (c !== 0) s += String.fromCharCode(c);
    }
    return s;
  }
}
