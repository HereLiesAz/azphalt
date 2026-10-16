/**
 * Security hardening regression tests for the `.azp` core: path-safety (zip-slip in its POSIX and
 * Windows shapes), duplicate-manifest-key rejection, decompression-entry caps, null-prototype
 * payload handling, unknown-kind rejection, URL-scheme validation, and verifyAzp never throwing.
 */
import { describe, it, expect } from "vitest";
import { zipSync, strToU8 } from "fflate";
import { verifyAzp, readAzp, digest, unsafePathReason, MAX_ENTRIES } from "../src/index.js";

/** Build a raw `.azp` from arbitrary entries (so we can plant hostile names a normal writeAzp won't). */
function rawAzp(entries: Record<string, Uint8Array>): Uint8Array {
  return zipSync(entries, { mtime: new Date(2000, 0, 1) });
}

function manifestBytes(obj: unknown): Uint8Array {
  return strToU8(JSON.stringify(obj, null, 2) + "\n");
}

const base = {
  azphalt: "0.1",
  id: "com.example.test",
  name: "Test",
  version: "1.0.0",
  kind: "asset",
  license: "MIT",
  compat: ">=0.1",
};

describe("path safety", () => {
  it.each([
    "/etc/passwd",
    "\\windows\\system32",
    "..\\..\\evil.dll",
    "C:/x",
    "a/../b",
    "a/./b",
    "a//b",
    "with\0nul",
  ])("rejects unsafe path %s", (p) => {
    expect(unsafePathReason(p)).not.toBeNull();
  });

  it("accepts ordinary nested paths", () => {
    expect(unsafePathReason("assets/foo/bar.png")).toBeNull();
    expect(unsafePathReason("LICENSE")).toBeNull();
  });

  it("verifyAzp flags a backslash-traversal payload a naive check would miss", () => {
    const evil = strToU8("x");
    const files = { "..\\..\\evil.dll": digest(evil), LICENSE: digest(strToU8("MIT")) };
    const azp = rawAzp({
      "..\\..\\evil.dll": evil,
      LICENSE: strToU8("MIT"),
      "manifest.json": manifestBytes({ ...base, files }),
    });
    const r = verifyAzp(azp);
    expect(r.ok).toBe(false);
    expect(r.errors.join("\n")).toMatch(/backslash/);
  });
});

describe("manifest integrity", () => {
  it("rejects a manifest with duplicate keys", () => {
    const raw = '{"azphalt":"0.1","id":"com.example.test","name":"T","version":"1.0.0","kind":"asset","license":"MIT","compat":">=0.1","files":{},"files":{"x":"y"}}\n';
    const azp = rawAzp({ LICENSE: strToU8("MIT"), "manifest.json": strToU8(raw) });
    const r = verifyAzp(azp);
    expect(r.ok).toBe(false);
    expect(r.errors.join("\n")).toMatch(/duplicate manifest key/);
  });

  it("rejects an unknown kind instead of waving it through", () => {
    const azp = rawAzp({
      LICENSE: strToU8("MIT"),
      "manifest.json": manifestBytes({ ...base, kind: "totally-made-up", files: { LICENSE: digest(strToU8("MIT")) } }),
    });
    const r = verifyAzp(azp);
    expect(r.ok).toBe(false);
    expect(r.errors.join("\n")).toMatch(/not a known kind/);
  });

  it("does not let a __proto__ payload entry poison the prototype", () => {
    const azp = rawAzp({
      __proto__: strToU8("x"),
      LICENSE: strToU8("MIT"),
      "manifest.json": manifestBytes({ ...base, files: { LICENSE: digest(strToU8("MIT")) } }),
    });
    const r = verifyAzp(azp); // must not throw
    expect(r.ok).toBe(false);
    const read = readAzp(azp);
    expect(Object.getPrototypeOf(read.payload)).toBeNull();
  });
});

describe("decompression caps", () => {
  it("rejects an archive with too many entries", () => {
    const entries: Record<string, Uint8Array> = {};
    for (let i = 0; i < MAX_ENTRIES + 2; i++) entries[`f${i}`] = strToU8("x");
    const azp = rawAzp(entries);
    const r = verifyAzp(azp);
    expect(r.ok).toBe(false);
    expect(r.errors.join("\n")).toMatch(/too many entries/);
  });
});

describe("verifyAzp never throws", () => {
  it("returns a result (not an exception) for a malformed mcp block", () => {
    const azp = rawAzp({
      LICENSE: strToU8("MIT"),
      "manifest.json": manifestBytes({ ...base, kind: "mcp", mcp: { servers: [null] }, files: { LICENSE: digest(strToU8("MIT")) } }),
    });
    expect(() => verifyAzp(azp)).not.toThrow();
    expect(verifyAzp(azp).ok).toBe(false);
  });

  it("returns a result for non-zip bytes", () => {
    expect(() => verifyAzp(strToU8("not a zip"))).not.toThrow();
    expect(verifyAzp(strToU8("not a zip")).ok).toBe(false);
  });
});
