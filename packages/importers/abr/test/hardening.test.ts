import { describe, it, expect } from "vitest";
import { Reader } from "../src/binary";
import { decodePackBits } from "../src/packbits";
import { readDescriptor } from "../src/descriptor";
import { parseAbr } from "../src/index";
import { Writer } from "./helpers";

describe("malformed-input hardening", () => {
  it("Reader.bytes/ascii/seek throw past the buffer end", () => {
    const r = new Reader(new Uint8Array([1, 2]));
    expect(() => r.bytes(5)).toThrow(RangeError);
    expect(() => r.ascii(5)).toThrow(RangeError);
    expect(() => r.seek(99)).toThrow(RangeError);
  });

  it("PackBits throws on a truncated run instead of emitting zeros", () => {
    expect(() => decodePackBits(new Uint8Array([0x02, 0xaa]), 3)).toThrow(/packbits/); // literal promises 3, 1 given
    expect(() => decodePackBits(new Uint8Array([0xfd]), 4)).toThrow(/packbits/); // repeat with no value byte
  });

  it("PackBits throws on an under-filled row rather than silently zero-filling", () => {
    // One literal byte decodes to 1 output byte but the row expects 5 — must fail, not pad with zeros.
    expect(() => decodePackBits(new Uint8Array([0x00, 0xaa]), 5)).toThrow(/underflow/);
    // Empty source, non-zero expected.
    expect(() => decodePackBits(new Uint8Array([]), 3)).toThrow(/underflow/);
  });

  it("descriptor nesting is bounded (deep Objc chain throws, not stack overflow)", () => {
    // Build a descriptor nesting Objc objects far past MAX_DEPTH: each body is name(u16=0) + classKey
    // (u32=0 + 4 ascii) + count(u32=1) + itemKey(u32=0 + 4 ascii) + OSType("Objc") then the child.
    const w = new Writer();
    for (let i = 0; i < 200; i++) {
      w.unicode("").u32(0).ascii("Objc").u32(1).u32(0).ascii("Chld").ascii("Objc");
    }
    // innermost: a body with count 0
    w.unicode("").u32(0).ascii("Objc").u32(0);
    expect(() => readDescriptor(w.build())).toThrow(/too deep/);
  });

  it("descriptor rejects an absurd item count instead of looping/allocating", () => {
    const bytes = new Writer().unicode("").u32(0).ascii("Brsh").u32(0xffffffff).build();
    expect(() => readDescriptor(bytes)).toThrow(/exceeds remaining/);
  });

  it("parseAbr throws on a truncated v1/2 brush rather than reading garbage", () => {
    // version 2, count 1, type 2 (sampled), size 4, then a truncated block
    const bytes = new Writer().u16(2).u16(1).u16(2).u32(4).raw([0, 0, 0, 0]).build();
    expect(() => parseAbr(bytes)).toThrow();
  });
});
