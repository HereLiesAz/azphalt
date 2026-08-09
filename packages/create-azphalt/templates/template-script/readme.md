# My Script

An azphalt **script** package (`kind: "script"`) — a native script (bash, Python, PowerShell, …)
that a host installs and runs the way a package manager's own package is: your `script.dependencies`
tell the host what system packages to resolve first, then it runs the script with real OS access.
Like an MCP server, it runs **outside** the azphalt editor sandbox — azphalt distributes the package,
the host's own OS/package-manager governs what it can do. See the [script spec](https://azphalt.org/specs/script).

## What's here

- **`manifest.json`** — the `script` block:
  - `interpreter` — what runs the script (`bash`, `python3`, `pwsh`, …).
  - `entry` — the in-package path to the script file.
  - `command` — the name it should be callable as once installed.
  - `dependencies` — system packages, namespaced by package manager (`apt`, `brew`, …). Optional —
    omit entirely if the script needs nothing beyond what's already on the host. The interpreter's
    own package commonly belongs here too, so the host can install it if missing.
- **`script/main.sh`** — the script itself. Rename/replace it and update `manifest.json`'s `entry`
  to match (and `interpreter` if you switch languages).
- **`build.js`** — bundles `script/` (and, if present, `preview/`) into a `.azp`. No azphalt
  capabilities, no code sandbox — just the manifest, the script, and LICENSE.
- **`LICENSE`** — SPDX-identified license text.

## Build

~~~sh
npm install
npm run build        # → my-script-1.0.0.azp
~~~

Then sign it (see `SIGNING.md`) and upload it to a repository — or drop it on the storefront's
**Publish** page.
