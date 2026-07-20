import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { runMcpConformance, satisfiesCompat, type McpHost } from "../src/index";
import type { Manifest } from "@azphalt/azdk";

/**
 * A reference conforming MCP-server host. It runs **no** code: verify → refuse non-`mcp` → gate on
 * compat → surface the declared servers. Running/connecting the server (consented, outside the azphalt
 * sandbox) is the host's own concern, beyond this static suite.
 */
const HOST_VERSION = "0.1";

const mcpHost: McpHost = {
  apiVersion: HOST_VERSION,
  profiles: ["mcp"],
  load(azp) {
    if (!verifyAzp(azp).ok) return { accepted: false, reason: "verification failed" };
    const { manifest } = readAzp(azp) as { manifest: Manifest };
    if (manifest.kind !== "mcp") return { accepted: false, reason: "not kind:mcp — this host runs no code" };
    if (!satisfiesCompat(HOST_VERSION, manifest.compat)) return { accepted: false, reason: "incompatible compat" };
    const servers = manifest.mcp?.servers?.map((s) => s.id) ?? [];
    return { accepted: true, servers };
  },
};

describe("@azphalt/conformance — MCP-server host", () => {
  it("certifies a conforming MCP host — every check passes", async () => {
    const report = await runMcpConformance(mcpHost);
    const failed = report.checks.filter((c) => !c.ok);
    expect(failed, failed.map((c) => `${c.id}: ${c.detail}`).join("\n")).toEqual([]);
    expect(report.ok).toBe(true);
    expect(report.checks).toHaveLength(6);
  });

  it("has teeth — a host that accepts everything fails the verify/kind checks", async () => {
    const broken: McpHost = {
      apiVersion: "0.1",
      profiles: ["mcp"],
      load: () => ({ accepted: true, servers: ["x"] }),
    };
    const report = await runMcpConformance(broken);
    expect(report.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-tampered")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-non-mcp")?.ok).toBe(false);
  });

  it("fails a host that does not surface the declared server", async () => {
    const silent: McpHost = { ...mcpHost, load: (azp) => ({ accepted: verifyAzp(azp).ok, servers: [] }) };
    const report = await runMcpConformance(silent);
    expect(report.checks.find((c) => c.id === "surfaces-server")?.ok).toBe(false);
  });

  it("fails a host that does not declare the mcp profile", async () => {
    const report = await runMcpConformance({ ...mcpHost, profiles: [] });
    expect(report.checks.find((c) => c.id === "profile-declaration")?.ok).toBe(false);
  });

  it("fails a host that does not report an apiVersion", async () => {
    const report = await runMcpConformance({ ...mcpHost, apiVersion: undefined });
    expect(report.checks.find((c) => c.id === "compat-version")?.ok).toBe(false);
  });
});
