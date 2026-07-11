import { describe, it, expect } from "vitest";
import { unzipSync, zipSync } from "fflate";
import { writeAzp, readAzp, verifyAzp, digest } from "../src/index";

const license = "MIT License\n\nCopyright (c) 2026 Az\n";

const base = {
  azphalt: "0.1",
  name: "X",
  version: "1.0.0",
  kind: "asset" as const,
  license: "MIT",
  compat: ">=0.1",
};

describe("azp", () => {
  it("writes, reads back, and verifies", () => {
    const payload = { "assets/hello.txt": new TextEncoder().encode("hello") };
    const { azp, manifest } = writeAzp({
      manifest: { ...base, id: "com.hereliesaz.hello", name: "Hello" },
      payload,
      license,
    });

    expect(manifest.files["assets/hello.txt"]).toBe(digest(payload["assets/hello.txt"]));
    expect(manifest.files["LICENSE"]).toBeTruthy();

    const back = readAzp(azp);
    expect(back.manifest.id).toBe("com.hereliesaz.hello");
    expect(new TextDecoder().decode(back.payload["assets/hello.txt"])).toBe("hello");
    expect(new TextDecoder().decode(back.payload["LICENSE"])).toBe(license);

    expect(verifyAzp(azp).ok).toBe(true);
  });

  it("flags a digest mismatch when the payload is tampered", () => {
    const { azp } = writeAzp({
      manifest: { ...base, id: "com.hereliesaz.x" },
      payload: { "assets/a.bin": new Uint8Array([1, 2, 3]) },
      license,
    });

    const files = unzipSync(azp);
    files["assets/a.bin"] = new Uint8Array([9, 9, 9]); // payload changes, manifest digest does not
    const tampered = zipSync(files);

    const result = verifyAzp(tampered);
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("digest mismatch"))).toBe(true);
  });

  it("rejects bytes that are not a package", () => {
    expect(verifyAzp(new Uint8Array([1, 2, 3, 4])).ok).toBe(false);
  });
});
