import { describe, it, expect } from "vitest";
import { importTflite } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-tflite", () => {
  it("packages a model file into an azp asset", () => {
    const bytes = new Uint8Array([1, 2, 3, 4]);
    const azp = importTflite(bytes, { id: "test.tflite", version: "1.0.0", author: "Test", filename: "model.bin" });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].type).toBe("tflite");
    expect(parsed.manifest.assets![0].path).toBe("assets/model.bin");
    expect(parsed.payload["assets/model.bin"]).toEqual(bytes);
  });

  it("supports a remoteUrl asset with no inline payload", () => {
    const azp = importTflite(null, {
      id: "test.tflite.remote",
      version: "1.0.0",
      author: "Test",
      filename: "model.bin",
      remoteUrl: "https://example.com/model.bin",
    });
    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].remoteUrl).toBe("https://example.com/model.bin");
  });
});
