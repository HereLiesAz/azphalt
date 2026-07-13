import { describe, it, expect } from "vitest";
import { importLitert } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

// Realistic LiteRT/TFLite FlatBuffer: bytes 4..8 spell the "TFL3" file identifier.
const MODEL = new Uint8Array([0, 0, 0, 0, 0x54, 0x46, 0x4c, 0x33, 0, 0, 0, 0]);

describe("importer-litert", () => {
  it("packages a model file into a verifiable azp asset", () => {
    const azp = importLitert(MODEL, { id: "test.litert", version: "1.0.0", author: "Test", filename: "model.tflite" });

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].type).toBe("litert");
    expect(parsed.manifest.assets![0].path).toBe("assets/model.tflite");
    expect(parsed.manifest.assets![0].params?.format).toBe("litert");
    expect(parsed.payload["assets/model.tflite"]).toEqual(MODEL);
  });

  it("supports a remoteUrl asset with no inline payload", () => {
    const azp = importLitert(null, {
      id: "test.litert.remote",
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
      importLitert(new Uint8Array([1, 2, 3, 4]), {
        id: "test.litert.bad",
        version: "1.0.0",
        author: "Test",
        filename: "model.tflite",
      })
    ).toThrow(/TFL3/);
  });
});
