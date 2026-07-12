import { describe, it, expect } from "vitest";
import { importOnnx } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-onnx", () => {
  it("packages a model file into an azp asset", () => {
    const bytes = new Uint8Array([1, 2, 3, 4]);
    const azp = importOnnx(bytes, { id: "test.onnx", version: "1.0.0", author: "Test", filename: "model.bin" });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].type).toBe("onnx");
    expect(parsed.manifest.assets![0].path).toBe("assets/model.bin");
    expect(parsed.payload["assets/model.bin"]).toEqual(bytes);
  });

  it("supports a remoteUrl asset with no inline payload", () => {
    const azp = importOnnx(null, {
      id: "test.onnx.remote",
      version: "1.0.0",
      author: "Test",
      filename: "model.bin",
      remoteUrl: "https://example.com/model.bin",
    });
    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].remoteUrl).toBe("https://example.com/model.bin");
  });
});
