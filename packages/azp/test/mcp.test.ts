import { describe, it, expect } from "vitest";
import { validateMcpManifest } from "../src/mcp";
import type { Manifest } from "@azphalt/azdk";

const base: Manifest = {
  azphalt: "0.1",
  id: "com.acme.azphalt.fs-mcp",
  name: "Filesystem MCP",
  version: "1.0.0",
  kind: "mcp",
  license: "MIT",
  compat: ">=0.1",
  files: { "server/fs.wasm": "sha256-abc", LICENSE: "sha256-def" },
  mcp: {
    inputs: [{ id: "root", type: "promptString", description: "Root dir" }],
    servers: [
      {
        id: "filesystem",
        local: { wasi: { module: "server/fs.wasm", args: ["${input:root}"], grants: ["fs:read"] } },
        remote: { type: "http", url: "https://mcp.acme.com/fs" },
      },
    ],
    offers: { tools: ["read_file"], resources: true, prompts: false },
  },
};

// Deep-clone helper so each test mutates an isolated copy.
const clone = (): Manifest => JSON.parse(JSON.stringify(base));

describe("validateMcpManifest", () => {
  it("accepts a well-formed mcp manifest", () => {
    expect(validateMcpManifest(base)).toEqual([]);
  });

  it("requires an mcp block", () => {
    const m = clone();
    delete (m as { mcp?: unknown }).mcp;
    expect(validateMcpManifest(m).some((e) => e.includes("requires an \"mcp\" block"))).toBe(true);
  });

  it("requires at least one server", () => {
    const m = clone();
    m.mcp!.servers = [];
    expect(validateMcpManifest(m).some((e) => e.includes("at least one server"))).toBe(true);
  });

  it("rejects an mcp package that also carries a pack block (header-only)", () => {
    const m = clone();
    (m as { pack?: unknown }).pack = { entries: [{ id: "com.other.thing" }] };
    expect(validateMcpManifest(m).some((e) => e.includes("must not declare a pack block"))).toBe(true);
  });

  it("requires each server to declare local or remote", () => {
    const m = clone();
    m.mcp!.servers[0] = { id: "bare" };
    expect(validateMcpManifest(m).some((e) => e.includes("at least one of local/remote"))).toBe(true);
  });

  it("requires local to declare wasi or platforms", () => {
    const m = clone();
    m.mcp!.servers[0].local = {};
    delete m.mcp!.servers[0].remote;
    expect(validateMcpManifest(m).some((e) => e.includes("at least one of wasi/platforms"))).toBe(true);
  });

  it("requires a checksum for a remote wasi module", () => {
    const m = clone();
    m.mcp!.servers[0].local = { wasi: { module: "", remoteUrl: "https://cdn.acme.com/fs.wasm" } };
    delete m.files["server/fs.wasm"];
    expect(validateMcpManifest(m).some((e) => e.includes("checksum"))).toBe(true);
  });

  it("requires a bundled wasi module to be in manifest.files", () => {
    const m = clone();
    delete m.files["server/fs.wasm"];
    expect(validateMcpManifest(m).some((e) => e.includes("not in manifest.files"))).toBe(true);
  });

  it("rejects a literal secret in a credential-keyed env value", () => {
    const m = clone();
    m.mcp!.servers[0].local!.wasi!.env = { API_KEY: "sk-live-123" };
    expect(validateMcpManifest(m).some((e) => e.includes("literal secret"))).toBe(true);
  });

  it("accepts a credential-keyed value that references an input", () => {
    const m = clone();
    m.mcp!.inputs = [{ id: "key", type: "promptString", password: true }];
    m.mcp!.servers[0].local!.wasi!.env = { API_KEY: "${input:key}" };
    m.mcp!.servers[0].local!.wasi!.args = [];
    expect(validateMcpManifest(m)).toEqual([]);
  });

  it("rejects a reference to an undeclared input", () => {
    const m = clone();
    m.mcp!.servers[0].local!.wasi!.args = ["${input:nope}"];
    expect(validateMcpManifest(m).some((e) => e.includes("undeclared input"))).toBe(true);
  });

  it("rejects editor surface on an mcp package (capabilities)", () => {
    const m = clone();
    m.capabilities = ["bitmap"];
    expect(validateMcpManifest(m).some((e) => e.includes("must not declare capabilities"))).toBe(true);
  });
});
