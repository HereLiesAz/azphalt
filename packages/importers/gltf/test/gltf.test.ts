import { describe, it, expect } from "vitest";
import { importGltf, parseGltf } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

/** Build a realistic GLB: 12-byte header + a JSON chunk, with a correct total-length field. */
function buildGlb(jsonText: string): Uint8Array {
  const encoded = new TextEncoder().encode(jsonText);
  const pad = (4 - (encoded.length % 4)) % 4;
  const json = new Uint8Array(encoded.length + pad);
  json.set(encoded);
  json.fill(0x20, encoded.length); // pad the JSON chunk with spaces to a 4-byte boundary

  const total = 12 + 8 + json.length;
  const buf = new Uint8Array(total);
  const view = new DataView(buf.buffer);
  view.setUint32(0, 0x46546c67, true); // magic "glTF"
  view.setUint32(4, 2, true); // version 2
  view.setUint32(8, total, true); // declared total length
  view.setUint32(12, json.length, true); // chunk length
  view.setUint32(16, 0x4e4f534a, true); // chunk type "JSON"
  buf.set(json, 20);
  return buf;
}

const GLB = buildGlb('{"asset":{"version":"2.0"}}');
const GLTF_JSON = new TextEncoder().encode('{"asset":{"version":"2.0"}}');

describe("parseGltf", () => {
  it("parses a binary GLB header", () => {
    const info = parseGltf(GLB);
    expect(info.format).toBe("glb");
    expect(info.version).toBe(2);
    expect(info.byteLength).toBe(GLB.length);
  });

  it("parses a text glTF JSON document", () => {
    const info = parseGltf(GLTF_JSON);
    expect(info.format).toBe("gltf");
    expect(info.version).toBe("2.0");
  });

  it("rejects a truncated GLB", () => {
    expect(() => parseGltf(new Uint8Array([0x67, 0x6c, 0x54, 0x46, 0x02]))).toThrow(
      /truncated/,
    );
  });

  it("rejects a GLB that overstates its length", () => {
    const bad = GLB.slice();
    new DataView(bad.buffer).setUint32(8, GLB.length + 100, true);
    expect(() => parseGltf(bad)).toThrow(/declares/);
  });

  it("rejects non-glTF bytes", () => {
    expect(() => parseGltf(new Uint8Array([1, 2, 3, 4]))).toThrow(/not a valid glTF/);
  });
});

describe("importGltf", () => {
  it("packages a GLB into a verifiable azp", () => {
    const azp = importGltf(GLB, { id: "test.mesh", version: "1.0.0", author: "Test" });
    expect(verifyAzp(azp).ok).toBe(true);

    const { manifest, payload } = readAzp(azp);
    expect(manifest.assets?.[0].type).toBe("mesh");
    expect(manifest.assets?.[0].path).toBe("assets/model.glb");
    expect(manifest.assets?.[0].params?.format).toBe("glb");
    expect(payload["assets/model.glb"]).toEqual(GLB);
    expect(payload["LICENSE"]).toBeTruthy();
  });

  it("packages a text glTF into a verifiable azp", () => {
    const azp = importGltf(GLTF_JSON, { id: "test.mesh", version: "1.0.0", author: "Test" });
    expect(verifyAzp(azp).ok).toBe(true);

    const { manifest } = readAzp(azp);
    expect(manifest.assets?.[0].path).toBe("assets/model.gltf");
    expect(manifest.assets?.[0].params?.format).toBe("gltf");
  });

  it("threads an explicit license and license text", () => {
    const azp = importGltf(GLB, {
      id: "test.mesh",
      version: "1.0.0",
      author: "Test",
      license: "Apache-2.0",
      licenseText: "Apache License, Version 2.0\n\n...full text...\n",
    });
    const { manifest, payload } = readAzp(azp);
    expect(manifest.license).toBe("Apache-2.0");
    expect(new TextDecoder().decode(payload["LICENSE"])).toContain("Apache License");
  });

  it("rejects invalid input", () => {
    expect(() =>
      importGltf(new Uint8Array([1, 2, 3, 4]), { id: "x", version: "1.0.0", author: "T" }),
    ).toThrow();
  });
});
