/**
 * Conformance checks for an **MCP-server host** — an app whose MCP client consumes `kind:"mcp"`
 * packages (`spec/mcp-server.md`). Like the companion profile it runs **none** of the server's code
 * and reaches **none** of the editor surface: `load` verifies the header (refusing tampered / unsafe /
 * non-mcp / incompatible packages) and reports the servers it will surface. The host then runs or
 * connects to the server under user consent — outside the azphalt sandbox — which is beyond what this
 * static suite drives.
 */
import { writeAzp } from "@azphalt/azp";
import type { Manifest, McpManifest } from "@azphalt/azdk";
import { pass, fail, satisfiesCompat, type CheckResult } from "./checks.js";
import type { HostProfile } from "./video-audio-checks.js";
import * as fx from "./fixtures.js";

/** What an MCP host reports after loading (verifying) a `kind:"mcp"` package. */
export interface McpLoadReport {
  /** Whether the host accepted the package for use. */
  accepted: boolean;
  /** Why it was refused (when `accepted` is false). */
  reason?: string;
  /** The ids of the servers the host will surface / connect. */
  servers?: string[];
}

/**
 * The minimum an MCP host exposes for the suite to drive it. It **runs no code**: `load` verifies a
 * `kind:"mcp"` header and reports the servers it will surface; connecting to and running the server is
 * the host's own (consented, sandboxed-outside-azphalt) concern.
 */
export interface McpHost {
  load(azp: Uint8Array): McpLoadReport | Promise<McpLoadReport>;
  /** The host API version, e.g. `"0.1"` — so `compat` can gate. */
  apiVersion?: string;
  /** The conformance profile(s) this host supports (e.g. `["mcp"]`). */
  profiles?: HostProfile[];
}

const MCP_MANIFEST: Omit<Manifest, "files"> & { mcp: McpManifest } = {
  azphalt: "0.1",
  id: "com.example.azphalt.fixture-mcp",
  name: "Fixture MCP",
  version: "1.0.0",
  kind: "mcp",
  license: "MIT",
  compat: ">=0.1",
  mcp: {
    servers: [{ id: "fixture", remote: { type: "http", url: "https://mcp.example.com" } }],
    offers: { tools: ["do_thing"] },
  },
};

/** A valid `kind:"mcp"` fixture with one server, `fixture`. */
function mcpAzp(): Uint8Array {
  return writeAzp({ manifest: MCP_MANIFEST, payload: {}, license: "MIT" }).azp;
}

/** A valid mcp header whose `compat` no `0.1` host can satisfy. */
function mcpIncompatibleAzp(): Uint8Array {
  return writeAzp({ manifest: { ...MCP_MANIFEST, compat: ">=99.0" }, payload: {}, license: "MIT" }).azp;
}

async function tryLoad(host: McpHost, azp: Uint8Array): Promise<McpLoadReport> {
  try {
    return await host.load(azp);
  } catch (e) {
    return { accepted: false, reason: `threw: ${e instanceof Error ? e.message : String(e)}` };
  }
}

/** Checklist: refuses an mcp package whose payload fails verification. */
export async function checkMcpRejectTampered(host: McpHost): Promise<CheckResult> {
  const id = "reject-tampered";
  const title = "Refuses a package that fails verification";
  const r = await tryLoad(host, fx.tamperedAzp());
  return r.accepted ? fail(id, title, "host accepted a tampered package") : pass(id, title);
}

/** Checklist: refuses an unsafe payload path (`..`). */
export async function checkMcpRejectUnsafePath(host: McpHost): Promise<CheckResult> {
  const id = "reject-unsafe-path";
  const title = "Refuses a package with an unsafe payload path (`..`)";
  const r = await tryLoad(host, fx.unsafePathAzp());
  return r.accepted ? fail(id, title, "host accepted an unsafe-path package") : pass(id, title);
}

/** Checklist: runs no code — refuses any non-`kind:"mcp"` package (e.g. `kind:"code"`). */
export async function checkMcpRejectNonMcp(host: McpHost): Promise<CheckResult> {
  const id = "reject-non-mcp";
  const title = "Refuses a non-`kind:\"mcp\"` package (runs no code, reaches no editor surface)";
  const r = await tryLoad(host, fx.codeKindAzp());
  return r.accepted ? fail(id, title, "host accepted a kind:code package as an MCP server") : pass(id, title);
}

/** Checklist: accepts a valid mcp package and surfaces its declared server. */
export async function checkMcpSurfacesServer(host: McpHost): Promise<CheckResult> {
  const id = "surfaces-server";
  const title = "Accepts a valid mcp package and surfaces its server";
  const r = await tryLoad(host, mcpAzp());
  if (!r.accepted) return fail(id, title, `host refused a valid mcp package: ${r.reason ?? ""}`);
  if (!r.servers?.includes("fixture")) {
    return fail(id, title, `host did not surface the 'fixture' server (servers=${JSON.stringify(r.servers)})`);
  }
  return pass(id, title, `surfaced ${r.servers.join(", ")}`);
}

/** Checklist: reports an apiVersion and refuses an mcp package whose `compat` it cannot satisfy. */
export async function checkMcpCompat(host: McpHost): Promise<CheckResult> {
  const id = "compat-version";
  const title = "Reports an apiVersion and refuses an incompatible package";
  if (!host.apiVersion) return fail(id, title, "host does not report an apiVersion");
  if (!satisfiesCompat(host.apiVersion, ">=0.1")) {
    return fail(id, title, `apiVersion ${host.apiVersion} does not satisfy >=0.1`);
  }
  const r = await tryLoad(host, mcpIncompatibleAzp());
  return r.accepted
    ? fail(id, title, "host accepted an mcp package whose compat it cannot satisfy")
    : pass(id, title, `apiVersion ${host.apiVersion}; refused an incompatible package`);
}

/** Checklist: declares an `mcp` conformance profile a registry can match on. */
export function checkMcpProfileDeclaration(host: McpHost): CheckResult {
  const id = "profile-declaration";
  const title = "Declares an `mcp` conformance profile";
  const profiles = host.profiles ?? [];
  return profiles.includes("mcp")
    ? pass(id, title, `profiles: ${profiles.join(", ")}`)
    : fail(id, title, `host does not declare the 'mcp' profile (profiles=${JSON.stringify(profiles)})`);
}
