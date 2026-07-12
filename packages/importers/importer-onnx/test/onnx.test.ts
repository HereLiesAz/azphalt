import { describe, it, expect } from "vitest";
import { importOnnx } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

// Realistic ONNX ModelProto: first field is ir_version (field 1, varint), so byte 0 is 0x08.
const MODEL = new Uint8Array([0x08, 0x07, 0x12, 0x00]);

describe("importer-onnx", () => {
  it("packages a model file into a verifiable azp asset", () => {
    const azp = importOnnx(MODEL, { id: "test.onnx", version: "1.0.0", author: "Test", filename: "model.onnx" });

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].type).toBe("onnx");
    expect(parsed.manifest.assets![0].path).toBe("assets/model.onnx");
    expect(parsed.manifest.assets![0].params?.format).toBe("onnx");
    expect(parsed.payload["assets/model.onnx"]).toEqual(MODEL);
  });

  it("supports a remoteUrl asset with no inline payload", () => {
    const azp = importOnnx(null, {
      id: "test.onnx.remote",
      version: "1.0.0",
      author: "Test",
      filename: "model.onnx",
      remoteUrl: "https://example.com/model.onnx",
    });
    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].remoteUrl).toBe("https://example.com/model.onnx");
  });

  it("rejects inline bytes that are not an ONNX protobuf model", () => {
    expect(() =>
      importOnnx(new Uint8Array([1, 2, 3, 4]), {
        id: "test.onnx.bad",
        version: "1.0.0",
        author: "Test",
        filename: "model.onnx",
      })
    ).toThrow(/ONNX/);
  });
});
