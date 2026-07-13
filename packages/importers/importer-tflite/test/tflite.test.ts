import { describe, it, expect } from "vitest";
import { importTflite } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

// Realistic TFLite FlatBuffer: bytes 4..8 spell the "TFL3" file identifier.
const MODEL = new Uint8Array([0, 0, 0, 0, 0x54, 0x46, 0x4c, 0x33, 0, 0, 0, 0]);

describe("importer-tflite", () => {
  it("packages a model file into a verifiable azp asset", () => {
    const azp = importTflite(MODEL, { id: "test.tflite", version: "1.0.0", author: "Test", filename: "model.tflite" });

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].type).toBe("tflite");
    expect(parsed.manifest.assets![0].path).toBe("assets/model.tflite");
    expect(parsed.manifest.assets![0].params?.format).toBe("tflite");
    expect(parsed.payload["assets/model.tflite"]).toEqual(MODEL);
  });

  it("supports a remoteUrl asset with no inline payload", () => {
    const azp = importTflite(null, {
      id: "test.tflite.remote",
      version: "1.0.0",
      author: "Test",
      filename: "model.tflite",
      remoteUrl: "https://example.com/model.tflite",
    });
    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].remoteUrl).toBe("https://example.com/model.tflite");
  });

  it("rejects inline bytes without the TFL3 identifier", () => {
    expect(() =>
      importTflite(new Uint8Array([1, 2, 3, 4]), {
        id: "test.tflite.bad",
        version: "1.0.0",
        author: "Test",
        filename: "model.tflite",
      })
    ).toThrow(/TFL3/);
  });
});
