# @azphalt/mcp

An [MCP](https://modelcontextprotocol.io) server that exposes azphalt `.azp` operations to any MCP host — verify a package, inspect its manifest, and extract a single asset. A host controller (e.g. [Guillotine](https://github.com/HereLiesAz/Guillotine)'s MCP client) uses it to reason about a package before applying its assets with the host's own engine.

It hands out **data, never the host engine**: the server only reports on and extracts from the container — it never runs code or touches an editor surface — so it stays inside the standard's moat.

## Run

~~~jsonc
// in an MCP host's server config
{ "mcpServers": { "azphalt": { "command": "azphalt-mcp" } } }
~~~

## Tools

`.azp` bytes cross MCP (a JSON transport) as **base64**.

| Tool | Input | Returns |
|---|---|---|
| `azp_verify` | `{ azpBase64 }` | `{ ok, errors, signed }` — integrity + (if present) Ed25519 signature |
| `azp_inspect` | `{ azpBase64 }` | manifest identity, `assets`, payload file list, and a verify report |
| `azp_extract_asset` | `{ azpBase64, assetPath }` | `{ path, bytesBase64 }` for one payload entry |

## Library use

The operations are also exported as pure functions (no transport), for direct use or testing:

~~~ts
import { verifyPackage, inspectPackage, extractAsset } from "@azphalt/mcp";

verifyPackage(azpBytes);                 // { ok, errors, signed }
inspectPackage(azpBytes).assets;         // [{ type, path, ui?, format? }, …]
extractAsset(azpBytes, "assets/x.cube"); // { path, bytesBase64 }
~~~

Built on [`@azphalt/azp`](../azp). See [`spec/package-format.md`](../../spec/package-format.md).
