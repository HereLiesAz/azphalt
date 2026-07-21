---
"@azphalt/registry": minor
"@azphalt/importer-palette": minor
"@azphalt/azp": patch
"@azphalt/azdk": patch
---

Repo audit fixes: security, spec-conformance, and correctness.

- **registry**: the security sweep now **blocks** a manifest declaring any capability outside the capability model (never-list / unknown values like `camera`/`network`) via a new `capability-scope` check; and `periodEnd` no longer overshoots month-end (Jan 31 + 1 month → Feb 28/29, not Mar 3), so a subscription started late in a month is no longer over-granted.
- **importer-palette**: emits the **normalized** `palette` wire format — a UTF-8 JSON `{ colors: [{ name, color: "#RRGGBB" }] }` — for both `.ase` (now parsed) and JSON input, instead of repackaging the raw `.ase`/hex-array bytes (which no conforming host could read).
- **azp**: `validateMcpManifest` now rejects a `kind:"mcp"` manifest that also carries a `pack` block (symmetric with the pack validator), keeping mcp header-only.
- **azdk**: `ColorControl.default` is documented as `#RRGGBB` — or `#RRGGBBAA` when `alpha` is set — matching the panel validator.
