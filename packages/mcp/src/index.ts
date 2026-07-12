/**
 * `@azphalt/mcp` — an MCP server exposing azphalt `.azp` operations (verify / inspect / extract) to
 * any Model Context Protocol host. The pure operations live in `./tools` (transport-free, unit-
 * testable); `./server` wires them into an {@link https://modelcontextprotocol.io | MCP} server; the
 * `azphalt-mcp` binary (`./bin`) serves it over stdio.
 *
 * A host controller — e.g. Guillotine's MCP client — calls these tools to reason about a package
 * before applying its assets with the host's own engine. The server hands out data, never the host
 * engine: it stays inside the standard's moat.
 */
export {
  verifyPackage,
  inspectPackage,
  extractAsset,
  type VerifyReport,
  type InspectReport,
  type AssetSummary,
  type ExtractResult,
} from "./tools.js";
export { createServer } from "./server.js";
