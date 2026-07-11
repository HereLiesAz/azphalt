/**
 * Reader for a Photoshop Action Descriptor — the structure a `.abr` v6+ `desc` section carries,
 * holding brush dynamics (diameter, spacing, angle, roundness, hardness, …). Implements the
 * documented OSType item encoding; throws on an unknown type rather than misread it.
 */
import { Reader } from "./binary.js";

export type DescValue = number | string | boolean | DescObject | DescValue[];
export interface DescObject {
  [key: string]: DescValue;
}

/** A key that is either a 4-byte code (when the length prefix is 0) or a length-prefixed string. */
function readKey(r: Reader): string {
  const len = r.u32();
  return len === 0 ? r.ascii(4) : r.ascii(len);
}

function readValue(r: Reader, ostype: string): DescValue {
  switch (ostype) {
    case "Objc":
    case "GlbO":
      return readBody(r);
    case "doub":
      return r.f64();
    case "UntF": {
      r.ascii(4); // unit code (e.g. '#Pxl', '#Prc', '#Ang') — value only is kept
      return r.f64();
    }
    case "TEXT":
      return r.unicode();
    case "bool":
      return r.u8() !== 0;
    case "long":
      return r.i32();
    case "comp": {
      const hi = r.u32();
      const lo = r.u32();
      return hi * 0x100000000 + lo;
    }
    case "enum": {
      readKey(r); // type id
      return readKey(r); // enum value
    }
    case "VlLs": {
      const n = r.u32();
      const arr: DescValue[] = [];
      for (let i = 0; i < n; i++) arr.push(readValue(r, r.ascii(4)));
      return arr;
    }
    case "tdta": {
      const n = r.u32();
      r.skip(n);
      return `<${n} raw bytes>`;
    }
    default:
      throw new Error(`unsupported descriptor OSType '${ostype}'`);
  }
}

function readBody(r: Reader): DescObject {
  r.unicode(); // descriptor name (usually empty)
  readKey(r); // class id
  const count = r.u32();
  const obj: DescObject = {};
  for (let i = 0; i < count; i++) {
    const key = readKey(r);
    obj[key] = readValue(r, r.ascii(4));
  }
  return obj;
}

/** Parse a descriptor from `bytes`, tolerating an optional leading 4-byte version (== 16). */
export function readDescriptor(bytes: Uint8Array): DescObject {
  const r = new Reader(bytes);
  const save = r.pos;
  if (r.u32() !== 16) r.seek(save);
  return readBody(r);
}
