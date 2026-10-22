import { describe, it, expect } from "vitest";
import { validateFontManifest, fontSignatureMatches } from "../src/font";
import { readSfntInfo } from "../src/sfnt";
import type { Manifest } from "@azphalt/azdk";

/** Builds a minimal SFNT with `name`, `OS/2` and (optionally) `fvar` tables. */
function sfnt(opts: { family: string; style?: string; weight?: number; axes?: Array<[string, number, number, number]> }): Uint8Array {
  const utf16 = (s: string) => {
    const b = new Uint8Array(s.length * 2);
    for (let i = 0; i < s.length; i++) { b[i * 2] = s.charCodeAt(i) >> 8; b[i * 2 + 1] = s.charCodeAt(i) & 255; }
    return b;
  };
  const names: Array<[number, string]> = [[1, opts.family], [2, opts.style ?? "Regular"]];
  const strs = names.map(([, s]) => utf16(s));
  const nameLen = 6 + names.length * 12 + strs.reduce((n, s) => n + s.length, 0);
  const name = new DataView(new ArrayBuffer(nameLen));
  name.setUint16(2, names.length); name.setUint16(4, 6 + names.length * 12);
  let off = 0;
  names.forEach(([id], i) => {
    const r = 6 + i * 12;
    name.setUint16(r, 3); name.setUint16(r + 6, id); name.setUint16(r + 8, strs[i].length); name.setUint16(r + 10, off);
    new Uint8Array(name.buffer).set(strs[i], 6 + names.length * 12 + off);
    off += strs[i].length;
  });
  const os2 = new DataView(new ArrayBuffer(64)); os2.setUint16(4, opts.weight ?? 400);
  const tables: Array<[string, Uint8Array]> = [["OS/2", new Uint8Array(os2.buffer)], ["name", new Uint8Array(name.buffer)]];
  if (opts.axes) {
    const fv = new DataView(new ArrayBuffer(16 + opts.axes.length * 20));
    fv.setUint16(4, 16); fv.setUint16(8, opts.axes.length); fv.setUint16(10, 20);
    opts.axes.forEach(([tag, min, def, max], i) => {
      const a = 16 + i * 20;
      for (let k = 0; k < 4; k++) fv.setUint8(a + k, tag.charCodeAt(k));
      fv.setInt32(a + 4, min * 65536); fv.setInt32(a + 8, def * 65536); fv.setInt32(a + 12, max * 65536);
    });
    tables.push(["fvar", new Uint8Array(fv.buffer)]);
  }
  tables.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  let pos = 12 + tables.length * 16;
  const head = new DataView(new ArrayBuffer(pos)); head.setUint32(0, 0x00010000); head.setUint16(4, tables.length);
  const body: Uint8Array[] = [];
  tables.forEach(([tag, data], i) => {
    for (let k = 0; k < 4; k++) head.setUint8(12 + i * 16 + k, tag.charCodeAt(k));
    head.setUint32(12 + i * 16 + 8, pos); head.setUint32(12 + i * 16 + 12, data.length);
    body.push(data); pos += data.length;
  });
  const out = new Uint8Array(pos); out.set(new Uint8Array(head.buffer), 0);
  let at = 12 + tables.length * 16;
  for (const b of body) { out.set(b, at); at += b.length; }
  return out;
}

const wght = { tag: "wght", min: 100, default: 400, max: 900 };
const base = (): Manifest => ({
  azphalt: "0.1", id: "com.acme.azphalt.fancy", name: "Fancy", version: "1.0.0", kind: "font", license: "OFL-1.1", compat: ">=0.1",
  files: { "fonts/Fancy.ttf": "sha256-a", LICENSE: "sha256-b" },
  font: { family: "Fancy", faces: [{ path: "fonts/Fancy.ttf", format: "ttf", variable: true, axes: [wght] }] },
});
const bytes = () => ({ "fonts/Fancy.ttf": sfnt({ family: "Fancy", axes: [["wght", 100, 400, 900]] }) });
const has = (errs: string[], s: string) => errs.some((e) => e.includes(s));

describe("readSfntInfo", () => {
  it("reads family, weight and axes", () => {
    const i = readSfntInfo(sfnt({ family: "Fancy", weight: 700, axes: [["wght", 100, 400, 900]] }))!;
    expect(i.family).toBe("Fancy");
    expect(i.weight).toBe(700);
    expect(i.variable).toBe(true);
    expect(i.axes).toEqual([{ tag: "wght", min: 100, default: 400, max: 900 }]);
  });
  it("returns undefined for junk and truncation", () => {
    expect(readSfntInfo(new Uint8Array([1, 2, 3]))).toBeUndefined();
    expect(readSfntInfo(sfnt({ family: "X" }).slice(0, 20))).toBeUndefined();
  });
});

describe("validateFontManifest", () => {
  it("accepts a well-formed variable font with its bytes", () => {
    expect(validateFontManifest(base(), bytes())).toEqual([]);
  });
  it("accepts a manifest without payload", () => {
    expect(validateFontManifest(base())).toEqual([]);
  });
  it("requires a font block and faces", () => {
    const m = base(); delete (m as { font?: unknown }).font;
    expect(has(validateFontManifest(m), 'requires a "font" block')).toBe(true);
    const n = base(); n.font!.faces = [];
    expect(has(validateFontManifest(n), "at least one face")).toBe(true);
  });
  it("rejects faces outside fonts/ or undeclared in files", () => {
    const m = base(); m.font!.faces[0].path = "Fancy.ttf";
    expect(has(validateFontManifest(m), "under fonts/")).toBe(true);
    const n = base(); n.files = { LICENSE: "sha256-b" };
    expect(has(validateFontManifest(n), "not in manifest.files")).toBe(true);
  });
  it("rejects undeclared fonts/ files", () => {
    const m = base(); m.files!["fonts/Extra.ttf"] = "sha256-c";
    expect(has(validateFontManifest(m), "not declared by any face")).toBe(true);
  });
  it("rejects bad axes", () => {
    const m = base(); m.font!.faces[0].axes = [{ tag: "wght", min: 900, default: 400, max: 100 }];
    expect(has(validateFontManifest(m), "min <= default <= max")).toBe(true);
    const n = base(); n.font!.faces[0].variable = false;
    expect(has(validateFontManifest(n), "not marked variable")).toBe(true);
  });
  it("rejects executable surface", () => {
    const m = base(); m.capabilities = ["bitmap"];
    expect(has(validateFontManifest(m), "must not declare capabilities")).toBe(true);
  });
  it("rejects bytes that are not the declared format", () => {
    expect(has(validateFontManifest(base(), { "fonts/Fancy.ttf": new Uint8Array([1, 2, 3, 4, 5]) }), "not a ttf font file")).toBe(true);
  });
  it("rejects axes that disagree with the font file", () => {
    const wrong = { "fonts/Fancy.ttf": sfnt({ family: "Fancy", axes: [["wght", 200, 400, 800]] }) };
    expect(has(validateFontManifest(base(), wrong), "does not match the font file")).toBe(true);
    const stat = { "fonts/Fancy.ttf": sfnt({ family: "Fancy" }) };
    expect(has(validateFontManifest(base(), stat), "declared variable but the file is static")).toBe(true);
  });
  it("checks woff2 by signature", () => {
    const m = base();
    m.files = { "fonts/Fancy.woff2": "sha256-a", LICENSE: "sha256-b" };
    m.font!.faces = [{ path: "fonts/Fancy.woff2", format: "woff2" }];
    expect(validateFontManifest(m, { "fonts/Fancy.woff2": new Uint8Array([0x77, 0x4f, 0x46, 0x32, 0]) })).toEqual([]);
    expect(fontSignatureMatches(new Uint8Array([0, 0, 0, 0]), "woff2")).toBe(false);
  });
});
