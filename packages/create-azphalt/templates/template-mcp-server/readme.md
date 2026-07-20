# My MCP Server

An azphalt **MCP-server** package (`kind: "mcp"`) — a signed header that declares how a host's MCP
client reaches your [Model Context Protocol](https://modelcontextprotocol.io) server. Like a companion
app, it runs **outside** the azphalt editor sandbox (in the host's / a WASI runtime's own sandbox, with
permissions the user consents to), and azphalt only distributes the definition. See the
[MCP server spec](https://azphalt.org/specs/mcp-server).

## What's here

- **`manifest.json`** — the only real content. Edit the `mcp` block:
  - `inputs` — values the host prompts for at connect time and substitutes as `${input:<id>}`. **Never
    put a literal secret in the package** — reference an input instead (it's a verify-time rejection).
  - `servers[]` — one or more servers. Each declares how to reach it:
    - `local` — on-device (preferred): a portable `wasi` module and/or per-platform native launch
      (`platforms.desktop` = a `command`/`args`, `platforms.android` = a `component`).
    - `remote` — an `http` / `sse` `url`.
  - `offers` — a descriptive list of the tools / resources / prompts you expose (powers the store card).
- **`build.js`** — packages the header into a `.azp` (no code, no assets — just the manifest + LICENSE).
- **`LICENSE`** — SPDX-identified license text.

The starter manifest declares a `desktop` launch (`npx …`) plus a `remote` URL, so a desktop host runs
it locally and a mobile host connects over HTTP. To run on-device on **mobile**, add a `wasi` block
under `local` pointing at a WASM build of your server.

## Build

~~~sh
npm install
npm run build        # → my-mcp-server-1.0.0.azp
~~~

Then sign it (see `SIGNING.md`) and upload it to a repository — or drop it on the storefront's
**Publish** page.
