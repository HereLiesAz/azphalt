import { describe, it, expect } from "vitest";
import { importFont, importFontPackage } from "../src/index.js";

/** A minimal SFNT: name (family/style), OS/2 (weight), head, cmap, glyf and, with axes, fvar. */
function sfnt(family: string, weight: number, axes: Array<[string, number, number, number]> = []): Uint8Array {
  const utf16 = (t: string) => { const b = new Uint8Array(t.length * 2); for (let i = 0; i < t.length; i++) { b[i * 2] = t.charCodeAt(i) >> 8; b[i * 2 + 1] = t.charCodeAt(i) & 255; } return b; };
  const strs = [utf16(family), utf16("Bold")];
  const name = new DataView(new ArrayBuffer(6 + 24 + strs[0].length + strs[1].length));
  name.setUint16(2, 2); name.setUint16(4, 30);
  [[1, 0], [2, strs[0].length]].forEach(([id, off], i) => { const r = 6 + i * 12; name.setUint16(r, 3); name.setUint16(r + 6, id); name.setUint16(r + 8, strs[i].length); name.setUint16(r + 10, off); });
  new Uint8Array(name.buffer).set(strs[0], 30); new Uint8Array(name.buffer).set(strs[1], 30 + strs[0].length);
  const os2 = new DataView(new ArrayBuffer(64)); os2.setUint16(4, weight);
  const tables: Array<[string, Uint8Array]> = [["OS/2", new Uint8Array(os2.buffer)], ["cmap", new Uint8Array(4)], ["glyf", new Uint8Array(4)], ["head", new Uint8Array(54)], ["name", new Uint8Array(name.buffer)]];
  if (axes.length) {
    const fv = new DataView(new ArrayBuffer(16 + axes.length * 20)); fv.setUint16(4, 16); fv.setUint16(8, axes.length); fv.setUint16(10, 20);
    axes.forEach(([tag, a, d, z], i) => { const o = 16 + i * 20; for (let k = 0; k < 4; k++) fv.setUint8(o + k, tag.charCodeAt(k)); fv.setInt32(o + 4, a * 65536); fv.setInt32(o + 8, d * 65536); fv.setInt32(o + 12, z * 65536); });
    tables.push(["fvar", new Uint8Array(fv.buffer)]);
  }
  tables.sort((x, y) => (x[0] < y[0] ? -1 : 1));
  let pos = 12 + tables.length * 16;
  const out = new Uint8Array(pos + tables.reduce((n, t) => n + t[1].length, 0));
  const dv = new DataView(out.buffer); dv.setUint32(0, 0x00010000); dv.setUint16(4, tables.length);
  tables.forEach(([tag, data], i) => { for (let k = 0; k < 4; k++) out[12 + i * 16 + k] = tag.charCodeAt(k); dv.setUint32(12 + i * 16 + 8, pos); dv.setUint32(12 + i * 16 + 12, data.length); out.set(data, pos); pos += data.length; });
  return out;
}
import { readAzp, verifyAzp } from "@azphalt/azp";

describe("importer-font", () => {
  it("packages a font file into an azp", () => {
    const ttf = new Uint8Array([0x00, 0x01, 0x00, 0x00]);
    
    const azp = importFont(ttf, {
      id: "test.font",
      version: "1.0.0",
      author: "Test",
      filename: "test.ttf"
    });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    expect(parsed.manifest.assets![0].type).toBe("font");
    expect(parsed.manifest.assets![0].path).toBe("assets/font.ttf");
    
    expect(parsed.payload["assets/font.ttf"]).toEqual(ttf);
  });

  it("packages a woff2 as a font-kind package that verifies", () => {
    const woff2 = new Uint8Array([0x77, 0x4f, 0x46, 0x32, 0, 0, 0, 0]);
    const azp = importFontPackage(woff2, { id: "com.acme.azphalt.fancy", version: "1.0.0", author: "Acme", family: "Fancy Face" });
    const parsed = readAzp(azp);
    expect(parsed.manifest.kind).toBe("font");
    expect(parsed.manifest.font!.family).toBe("Fancy Face");
    expect(parsed.manifest.font!.faces[0]).toMatchObject({ path: "fonts/FancyFace.woff2", format: "woff2" });
    expect(parsed.payload["fonts/FancyFace.woff2"]).toEqual(woff2);
    expect(verifyAzp(azp).errors ?? []).toEqual([]);
  });

  it("refuses woff, collections and unreadable fonts", () => {
    expect(() => importFontPackage(new Uint8Array([0x77, 0x4f, 0x46, 0x46, 0]), { id: "a.b", version: "1.0.0", author: "x", family: "F" })).toThrow(/ttf, otf or woff2/);
    expect(() => importFontPackage(new Uint8Array([0, 1, 0, 0]), { id: "a.b", version: "1.0.0", author: "x" })).toThrow(/readable/);
  });

  it("packages a variable TrueType font from the font's own facts, verified", () => {
    const azp = importFontPackage(sfnt("Fancy Sans", 700, [["wght", 100, 400, 900], ["wdth", 75, 100, 125]]), { id: "com.acme.azphalt.fancy", version: "1.0.0", author: "Acme" });
    expect(verifyAzp(azp).errors ?? []).toEqual([]);
    const face = readAzp(azp).manifest.font!.faces[0];
    expect(face).toMatchObject({ path: "fonts/FancySans-Bold.ttf", format: "ttf", style: "Bold", weight: 700, variable: true });
    expect(face.axes!.map((a) => a.tag)).toEqual(["wght", "wdth"]);
  });

  it("drops a weight azphalt wouldn't accept instead of emitting a bad package", () => {
    const azp = importFontPackage(sfnt("Heavy", 1200), { id: "com.acme.azphalt.heavy", version: "1.0.0", author: "Acme" });
    expect(verifyAzp(azp).errors ?? []).toEqual([]);
    expect(readAzp(azp).manifest.font!.faces[0].weight).toBeUndefined();
  });

  it("refuses what it can't describe truthfully", () => {
    expect(() => importFontPackage(sfnt("x".repeat(200), 400), { id: "a.b", version: "1.0.0", author: "x" })).toThrow(/longer than 128/);
    expect(() => importFontPackage(sfnt("Bad", 400, [["w\u0001ht", 1, 2, 3]]), { id: "a.b", version: "1.0.0", author: "x" })).toThrow(/axis tag/);
  });
});
