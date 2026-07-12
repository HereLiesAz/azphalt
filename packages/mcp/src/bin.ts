#!/usr/bin/env node
/**
 * `azphalt-mcp` — serve the azphalt MCP tools over stdio, the transport MCP hosts launch a server
 * with. Add to a host's config, e.g.:
 *
 *   { "mcpServers": { "azphalt": { "command": "azphalt-mcp" } } }
 */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Stay alive until the transport (stdin) closes; the SDK resolves `connect` immediately.
}

main().catch((err) => {
  // stdout is the MCP channel — diagnostics go to stderr so they never corrupt the protocol.
  console.error("azphalt-mcp: fatal:", err);
  process.exit(1);
});
