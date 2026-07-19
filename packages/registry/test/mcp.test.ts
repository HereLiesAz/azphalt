import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import { Registry, InMemoryStore, RegistryError } from "../src/index";

const license = "MIT License\n";
const base = { azphalt: "0.1", version: "1.0.0", license: "MIT", compat: ">=0.1" };

function mcpAzp() {
  const wasm = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 1, 0, 0, 0]);
  const mcp = {
    inputs: [{ id: "root", type: "promptString" as const }],
    servers: [
      { id: "fs", local: { wasi: { module: "server/fs.wasm", args: ["${input:root}"] } }, remote: { type: "http" as const, url: "https://mcp.acme.com/fs" } },
    ],
    offers: { tools: ["read_file"] },
  };
  return writeAzp({
    manifest: { ...base, id: "com.acme.fs-mcp", name: "Filesystem MCP", kind: "mcp" as const, mcp },
    payload: { "server/fs.wasm": wasm },
    license,
  }).azp;
}

describe("registry — mcp packages", () => {
  it("publishes a kind:\"mcp\" package and lists it by kind", async () => {
    const registry = new Registry(new InMemoryStore());
    const { package: summary } = await registry.publish(mcpAzp());
    expect(summary.kind).toBe("mcp");
    expect(summary.id).toBe("com.acme.fs-mcp");

    const listed = await registry.list({ kind: "mcp" });
    expect(listed.map((s) => s.id)).toContain("com.acme.fs-mcp");
  });

  it("rejects an mcp package with a hardcoded secret", async () => {
    const bad = writeAzp({
      manifest: {
        ...base,
        id: "com.acme.leaky-mcp",
        name: "Leaky",
        kind: "mcp" as const,
        mcp: { servers: [{ id: "svc", remote: { type: "http" as const, url: "https://x", headers: { Authorization: "Bearer sk-abc" } } }] },
      },
      payload: {},
      license,
    }).azp;

    const registry = new Registry(new InMemoryStore());
    await expect(registry.publish(bad)).rejects.toBeInstanceOf(RegistryError);
  });
});
