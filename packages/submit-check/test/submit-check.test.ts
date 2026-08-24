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

  // Every non-payload, non-asset `kind` gets its own submission test — `asset` above already covers
  // the payload/remote-asset paths; these exercise the header kinds (`app`, `mcp`, `pack`) and the
  // real-payload-but-no-/code kinds (`skill`, `script`, `composable`) through the same
  // validateSubmission -> writeAzp -> verifyAzp path submissions actually go through, so a drift like
  // the one `KINDS` fixed (three header kinds silently rejected as "invalid kind") gets caught here.

  it("accepts a well-formed app (companion) submission", () => {
    const dir = makeSubmission("com.you.companion", {
      "manifest.json": JSON.stringify({
        azphalt: "0.1",
        id: "com.you.companion",
        name: "Companion",
        version: "1.0.0",
        kind: "app",
        license: "MIT",
        compat: ">=0.1",
        app: {
          platforms: { android: { packageId: "com.you.companion" } },
          roles: ["companion"],
          handoffs: [
            {
              id: "edit",
              action: "edit-image",
              name: "Edit",
              input: { assets: ["image"] },
              output: { assets: ["image"] },
              transport: { android: { intentAction: "com.you.companion.EDIT", resultMimeTypes: ["image/png"] } },
            },
          ],
        },
      }),
      LICENSE: "MIT\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok, r.errors.join("; ")).toBe(true);
    rmSync(dir, { recursive: true, force: true });
  });

  it("accepts a well-formed mcp submission", () => {
    const dir = makeSubmission("com.you.mcp", {
      "manifest.json": JSON.stringify({
        azphalt: "0.1",
        id: "com.you.mcp",
        name: "MCP Server",
        version: "1.0.0",
        kind: "mcp",
        license: "MIT",
        compat: ">=0.1",
        mcp: { servers: [{ id: "main", remote: { type: "http", url: "https://mcp.example.com" } }] },
      }),
      LICENSE: "MIT\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok, r.errors.join("; ")).toBe(true);
    rmSync(dir, { recursive: true, force: true });
  });

  it("accepts a well-formed pack submission", () => {
    const dir = makeSubmission("com.you.pack", {
      "manifest.json": JSON.stringify({
        azphalt: "0.1",
        id: "com.you.pack",
        name: "Starter Pack",
        version: "1.0.0",
        kind: "pack",
        license: "MIT",
        compat: ">=0.1",
        pack: { entries: [{ id: "com.other.thing", required: true }] },
      }),
      LICENSE: "MIT\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok, r.errors.join("; ")).toBe(true);
    rmSync(dir, { recursive: true, force: true });
  });

  it("accepts a well-formed skill submission", () => {
    const dir = makeSubmission("com.you.skill", {
      "manifest.json": JSON.stringify({
        azphalt: "0.1",
        id: "com.you.skill",
        name: "Release Notes",
        version: "1.0.0",
        kind: "skill",
        license: "MIT",
        compat: ">=0.1",
        skill: { skills: [{ id: "release-notes", name: "Release Notes", description: "Draft release notes." }] },
      }),
      LICENSE: "MIT\n",
      "skills/release-notes/SKILL.md": "---\nname: release-notes\ndescription: Draft release notes.\n---\nDo the thing.\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok, r.errors.join("; ")).toBe(true);
    rmSync(dir, { recursive: true, force: true });
  });

  it("accepts a well-formed script submission", () => {
    const dir = makeSubmission("com.you.script", {
      "manifest.json": JSON.stringify({
        azphalt: "0.1",
        id: "com.you.script",
        name: "Git Sync",
        version: "1.0.0",
        kind: "script",
        license: "MIT",
        compat: ">=0.1",
        script: { interpreter: "bash", entry: "script/git-sync.sh", command: "git-sync" },
      }),
      LICENSE: "MIT\n",
      "script/git-sync.sh": "#!/usr/bin/env bash\necho sync\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok, r.errors.join("; ")).toBe(true);
    rmSync(dir, { recursive: true, force: true });
  });

  it("accepts a well-formed composable submission", () => {
    const dir = makeSubmission("com.you.composable", {
      "manifest.json": JSON.stringify({
        azphalt: "0.1",
        id: "com.you.composable",
        name: "Confirm Record Tile",
        version: "1.0.0",
        kind: "composable",
        license: "MIT",
        compat: ">=0.1",
        composable: {
          library: { group: "com.hereliesaz.conveyance", artifact: "conveyance-m3-expressive", version: "1.4.0" },
          elements: [
            {
              id: "confirm-record",
              templateId: "m3e.tile.record",
              hue: "azure",
              surface: "recordTile",
              scale: "lead",
              act: "create",
              jobs: ["confirms a destructive action"],
            },
          ],
        },
      }),
      LICENSE: "MIT\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok, r.errors.join("; ")).toBe(true);
    rmSync(dir, { recursive: true, force: true });
  });

  it("rejects a composable submission carrying azphalt capabilities (header-only)", () => {
    const dir = makeSubmission("com.you.composable-bad", {
      "manifest.json": JSON.stringify({
        azphalt: "0.1",
        id: "com.you.composable-bad",
        name: "Bad Composable",
        version: "1.0.0",
        kind: "composable",
        license: "MIT",
        compat: ">=0.1",
        capabilities: ["bitmap"],
        composable: {
          library: { group: "com.example", artifact: "templates" },
          elements: [
            { id: "x", templateId: "t", hue: "azure", surface: "recordTile", scale: "lead", act: "create", jobs: ["j"] },
          ],
        },
      }),
      LICENSE: "MIT\n",
    });
    const r = validateSubmission(dir);
    expect(r.ok).toBe(false);
    expect(r.errors.join("\n")).toMatch(/must not declare capabilities/);
    rmSync(dir, { recursive: true, force: true });
  });
});
