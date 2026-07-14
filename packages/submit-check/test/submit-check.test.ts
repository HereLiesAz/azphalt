import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateSubmission, validateSubmissions } from "../src/index";

const SUBMISSIONS = fileURLToPath(new URL("../../../submissions", import.meta.url));

/** Build a throwaway submission folder and return its path. */
function makeSubmission(id: string, files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "azp-sub-"));
  const dir = join(root, id);
  for (const [rel, content] of Object.entries(files)) {
    const abs = join(dir, rel);
    mkdirSync(join(abs, ".."), { recursive: true });
    writeFileSync(abs, content);
  }
  return dir;
}

const goodManifest = (id: string) =>
  JSON.stringify({
    azphalt: "0.1",
    id,
    name: "Thing",
    version: "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    capabilities: ["assets"],
    assets: [{ type: "lut", path: "assets/x.cube" }],
  });

describe("submit-check", () => {
  it("accepts the bundled example submission", () => {
    const results = validateSubmissions(SUBMISSIONS);
    const hello = results.find((r) => r.id === "com.azphalt.example.hello-lut");
    expect(hello, "the example submission should be present").toBeTruthy();
    expect(hello!.ok, hello!.errors.join("; ")).toBe(true);
    // Every bundled submission must be valid (so the repo's own CI stays green).
    expect(results.every((r) => r.ok), results.flatMap((r) => r.errors).join("; ")).toBe(true);
  });

  it("accepts a well-formed submission", () => {
    const dir = makeSubmission("com.you.good", {
      "manifest.json": goodManifest("com.you.good"),
      LICENSE: "MIT\n",
      "assets/x.cube": "LUT_1D_SIZE 2\n0 0 0\n1 1 1\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok, r.errors.join("; ")).toBe(true);
    rmSync(dir, { recursive: true, force: true });
  });

  it("rejects folder/id mismatch, missing LICENSE, and a missing referenced path", () => {
    const dir = makeSubmission("com.you.wrongname", {
      "manifest.json": goodManifest("com.you.good"), // id ≠ folder, and assets/x.cube absent
    });
    const r = validateSubmission(dir);
    expect(r.ok).toBe(false);
    expect(r.errors.join("\n")).toMatch(/must equal manifest.id/);
    expect(r.errors.join("\n")).toMatch(/missing LICENSE/);
    expect(r.errors.join("\n")).toMatch(/asset path not found/);
    rmSync(dir, { recursive: true, force: true });
  });

  it("rejects a bad id and missing required fields", () => {
    const dir = makeSubmission("nodots", {
      "manifest.json": JSON.stringify({ id: "nodots", name: "X" }),
      LICENSE: "MIT\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok).toBe(false);
    expect(r.errors.join("\n")).toMatch(/reverse-DNS/);
    expect(r.errors.join("\n")).toMatch(/missing required manifest field: azphalt/);
    rmSync(dir, { recursive: true, force: true });
  });

  it("accepts a heavy asset declared with a remote header (empty path + remoteUrl)", () => {
    const dir = makeSubmission("com.you.remote", {
      "manifest.json": JSON.stringify({
        azphalt: "0.1",
        id: "com.you.remote",
        name: "Remote Model",
        version: "1.0.0",
        kind: "asset",
        license: "MIT",
        compat: ">=0.1",
        assets: [{ type: "onnx", path: "", remoteUrl: "https://example.com/m.onnx", checksum: "sha256-abc", byteSize: 123 }],
      }),
      LICENSE: "MIT\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok, r.errors.join("; ")).toBe(true);
    rmSync(dir, { recursive: true, force: true });
  });
});
