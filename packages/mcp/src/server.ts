/**
 * The azphalt MCP server: exposes the `.azp` operations in `./tools` over the Model Context
 * Protocol, so any MCP host — Guillotine's controller, an editor's agent, a CLI — can verify,
 * inspect, and pull assets out of a package without linking `@azphalt/azp` directly.
 *
 * `.azp` bytes cross MCP (a JSON transport) as **base64**. The server does no host work: it never
 * applies an asset, only reports on and extracts from the container. That keeps it inside the
 * standard's moat — an MCP client gets data, never the host engine.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { verifyPackage, inspectPackage, extractAsset } from "./tools.js";

const NAME = "azphalt-mcp";
const VERSION = "0.1.0";

/** Decode a base64 `.azp` payload to bytes. Thrown errors surface to the client as `isError`. */
function decode(azpBase64: string): Uint8Array {
  return new Uint8Array(Buffer.from(azpBase64, "base64"));
}

/** JSON tool result — MCP carries text, so structured reports are serialized. */
function json(value: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] };
}

/** An error tool result, per the MCP `isError` convention. */
function fail(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

/** Build the azphalt MCP server with the verify / inspect / extract tools registered. */
export function createServer(): McpServer {
  const server = new McpServer({ name: NAME, version: VERSION });

  server.registerTool(
    "azp_verify",
    {
      title: "Verify an .azp package",
      description:
        "Check a base64-encoded .azp for integrity: safe paths, every payload file matching its " +
        "manifest digest, and — if a signature is present — a valid Ed25519 signature. Returns " +
        "{ ok, errors, signed }.",
      inputSchema: { azpBase64: z.string().describe("The .azp file, base64-encoded.") },
    },
    async ({ azpBase64 }) => {
      try {
        return json(verifyPackage(decode(azpBase64)));
      } catch (e) {
        return fail(`azp_verify failed: ${(e as Error).message}`);
      }
    },
  );

  server.registerTool(
    "azp_inspect",
    {
      title: "Inspect an .azp package",
      description:
        "Read a base64-encoded .azp's manifest: identity (id/name/version/kind/license/author/" +
        "description), its contributed assets, the payload file list, and a verification report. " +
        "Does not run any code.",
      inputSchema: { azpBase64: z.string().describe("The .azp file, base64-encoded.") },
    },
    async ({ azpBase64 }) => {
      try {
        return json(inspectPackage(decode(azpBase64)));
      } catch (e) {
        return fail(`azp_inspect failed: ${(e as Error).message}`);
      }
    },
  );

  server.registerTool(
    "azp_extract_asset",
    {
      title: "Extract one asset from an .azp package",
      description:
        "Pull a single payload entry (e.g. 'assets/grade.cube') out of a base64-encoded .azp and " +
        "return it base64-encoded as { path, bytesBase64 }. The host applies it with its own engine.",
      inputSchema: {
        azpBase64: z.string().describe("The .azp file, base64-encoded."),
        assetPath: z.string().describe("In-package path of the asset, e.g. 'assets/grade.cube'."),
      },
    },
    async ({ azpBase64, assetPath }) => {
      try {
        return json(extractAsset(decode(azpBase64), assetPath));
      } catch (e) {
        return fail(`azp_extract_asset failed: ${(e as Error).message}`);
      }
    },
  );

  return server;
}
