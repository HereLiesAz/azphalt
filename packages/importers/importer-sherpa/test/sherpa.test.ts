import { describe, it, expect } from "vitest";
import { importSherpa } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

// A sherpa bundle is opaque; any non-empty byte string is a valid payload.
const MODEL = new Uint8Array([1, 2, 3, 4]);

describe("importer-sherpa", () => {
  it("packages a bundle into a verifiable azp asset", () => {
    const azp = importSherpa(MODEL, { id: "test.sherpa", version: "1.0.0", author: "Test", filename: "bundle.tar" });

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].type).toBe("sherpa-bundle");
    expect(parsed.manifest.assets![0].path).toBe("assets/bundle.tar");
    expect(parsed.manifest.assets![0].params?.format).toBe("sherpa-bundle");
    expect(parsed.payload["assets/bundle.tar"]).toEqual(MODEL);
  });

  it("supports a remoteUrl asset with no inline payload", () => {
    const azp = importSherpa(null, {
      id: "test.sherpa.remote",
      version: "1.0.0",
      author: "Test",
      filename: "bundle.tar",
      remoteUrl: "https://example.com/bundle.tar",
    });
    const parsed = readAzp(azp);
    expect(parsed.manifest.assets![0].remoteUrl).toBe("https://example.com/bundle.tar");
  });

  it("rejects an empty inline bundle", () => {
    expect(() =>
      importSherpa(new Uint8Array([]), {
        id: "test.sherpa.bad",
        version: "1.0.0",
        author: "Test",
        filename: "bundle.tar",
      })
    ).toThrow(/empty sherpa bundle/);
  });
});
