import { describe, it, expect } from "vitest";
import { importAbr } from "../src/index.js";
import { verifyAzp } from "@azphalt/azp";

describe("importer-abr", () => {
  it("imports a version 6 ABR file into a valid azp", () => {
    // Fake ABR version 6 header
    const mockAbr = new Uint8Array([0, 6, 0, 0]); // Big-endian 6

    const azp = importAbr(mockAbr, {
      id: "test.abr",
      name: "Test ABR",
      version: "1.0.0",
      author: "Test"
    });

    const verify = verifyAzp(azp);
    expect(verify.ok).toBe(true);
  });

  it("throws on invalid version", () => {
    const mockAbr = new Uint8Array([0, 3, 0, 0]); // Version 3 is unsupported
    expect(() => importAbr(mockAbr, {
      id: "test", name: "test", version: "1.0", author: "test"
    })).toThrow(/Unsupported ABR version: 3/);
  });
});
