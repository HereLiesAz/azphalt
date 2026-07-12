import { describe, it, expect } from "vitest";
import { importSherpa } from "../src/index.js";
import { readAzp } from "@azphalt/azp";

describe("importer-sherpa", () => {
  it("packages a model file into an azp asset", () => {
    const bytes = new Uint8Array([1, 2, 3, 4]);
    const azp = importSherpa(bytes, { id: "test.sherpa", version: "1.0.0", author: "Test", filename: "model.bin" });

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].type).toBe("sherpa-bundle");
    expect(parsed.manifest.assets![0].path).toBe("assets/model.bin");
    expect(parsed.payload["assets/model.bin"]).toEqual(bytes);
  });

  it("supports a remoteUrl asset with no inline payload", () => {
    const azp = importSherpa(null, {
      id: "test.sherpa.remote",
      version: "1.0.0",
      author: "Test",
      filename: "model.bin",
      remoteUrl: "https://example.com/model.bin",
    });
    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].remoteUrl).toBe("https://example.com/model.bin");
  });
});
