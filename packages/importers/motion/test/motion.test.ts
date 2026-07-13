import { describe, it, expect } from "vitest";
import { importMotion } from "../src/index.js";
import { readAzp, verifyAzp } from "@azphalt/azp";

const OPTS = { id: "test.motion", version: "1.0.0", author: "Test" };

describe("importer-motion", () => {
  it("packages a cubic-bezier array and lifts it into params", () => {
    const azp = importMotion("[0.25, 0.1, 0.25, 1.0]", OPTS);

    expect(verifyAzp(azp).ok).toBe(true);

    const parsed = readAzp(azp);
    expect(parsed.manifest.assets).toBeDefined();
    const asset = parsed.manifest.assets![0];
    expect(asset.type).toBe("motion");
    expect(asset.path).toBe("assets/motion.json");
    expect(asset.params!.format).toBe("cubic-bezier");
    expect(asset.params!.bezier).toEqual([0.25, 0.1, 0.25, 1.0]);

    const back = JSON.parse(new TextDecoder().decode(parsed.payload["assets/motion.json"]));
    expect(back).toEqual([0.25, 0.1, 0.25, 1.0]);
  });

  it("threads an explicit license and licenseText", () => {
    const parsed = readAzp(
      importMotion("[0, 0, 1, 1]", { ...OPTS, license: "Apache-2.0", licenseText: "TEXT" })
    );
    expect(parsed.manifest.license).toBe("Apache-2.0");
    expect(new TextDecoder().decode(parsed.payload["LICENSE"])).toBe("TEXT");
  });

  it("rejects non-JSON input", () => {
    expect(() => importMotion("not json at all", OPTS)).toThrow(/valid JSON/);
  });

  it("rejects a wrong-length array", () => {
    expect(() => importMotion("[1, 2, 3]", OPTS)).toThrow(/cubic-bezier/);
  });

  it("rejects a non-numeric array", () => {
    expect(() => importMotion('["a", 1, 2, 3]', OPTS)).toThrow(/cubic-bezier/);
  });

  it("rejects X control coords outside [0, 1] (Y may overshoot)", () => {
    expect(() => importMotion("[1.5, 0, 0.5, 1]", OPTS)).toThrow(/between 0 and 1/);
    expect(() => importMotion("[0.25, 0.1, -0.2, 1]", OPTS)).toThrow(/between 0 and 1/);
    // Y outside [0,1] is allowed (bouncy easing), so this must still pass.
    expect(verifyAzp(importMotion("[0.5, -0.5, 0.5, 1.5]", OPTS)).ok).toBe(true);
  });
});
