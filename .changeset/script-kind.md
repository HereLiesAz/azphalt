---
"@azphalt/azdk": minor
"@azphalt/azp": minor
"@azphalt/conformance": minor
"@azphalt/submit-check": minor
"create-azphalt": minor
---

Add `kind: "script"` — a native script (bash, Python, PowerShell, …) a host installs and runs the way a package manager installs its own package, resolving declared system `dependencies` (namespaced by package manager) before making the script runnable. Adds the `Kind`/`ScriptManifest` SDK types, `@azphalt/azp`'s `validateScriptManifest` (folded into `verifyAzp`), `@azphalt/conformance`'s `script` host-conformance profile (`runScriptConformance`), a `create-azphalt` "Script" template, and submission validation for the new kind. Like `kind:"mcp"`, a script needs real OS access to do anything useful, so it gets its own kind rather than a "native" flavor of `kind:"code"` — that keeps `code`'s one unconditional guarantee (sandboxed, powerless, safe to auto-run) intact. See `spec/script.md`.
