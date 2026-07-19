# MCP Server Upload (`kind: "mcp"`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fourth package kind — an MCP server users can package, sign, upload, and list — modeled on VS Code's `.vsix`/`mcp.json`, reusing the companion-app moat (signed header, no editor capabilities, host runs it under consent).

**Architecture:** A new `kind: "mcp"` carries an `mcp` manifest block that *declares how to reach* a server (on-device WASI or per-platform native, and/or remote http/sse) plus what it offers — never a sandbox-run payload. `@azphalt/azp`'s `verifyAzp` gains a `kind:"mcp"`-only structural validator (header-only, no bundled secrets, integrity of a bundled WASI module). The registry indexes and lists it through the existing generic `kind` path. Secrets are declared as `inputs` the host prompts for (`${input:…}`), never stored.

**Tech Stack:** TypeScript (ESM), pnpm workspaces, vitest, fflate, Ed25519 (`node:crypto`). Design doc: `docs/superpowers/specs/2026-07-19-mcp-server-upload-design.md`.

**Working branch:** `feat/mcp-server-upload` (already checked out; the design doc is committed there).

---

## File Structure

- `packages/sdk/src/index.ts` — **modify.** Add `"mcp"` to `Kind`; add the `McpManifest` type family; add `mcp?: McpManifest` to `Manifest`.
- `packages/azp/src/mcp.ts` — **create.** `validateMcpManifest(manifest): string[]` — the `kind:"mcp"` structural rules.
- `packages/azp/src/index.ts` — **modify.** Fold `validateMcpManifest` into `verifyAzp` for `kind:"mcp"` only; re-export it.
- `packages/azp/test/mcp.test.ts` — **create.** Unit tests for `validateMcpManifest`.
- `packages/azp/test/roundtrip.test.ts` — **modify.** Add a full `kind:"mcp"` `.azp` round-trip + verify test (mirrors the existing `kind:"app"` test).
- `packages/registry/test/mcp.test.ts` — **create.** Publish an `mcp` package and list it by kind.
- `spec/mcp-server.md` — **create.** The normative RFC (sibling to `spec/companion-app.md`).
- `spec/extension-manifest.md`, `spec/repository-api.md` — **modify.** Add `mcp` to the `kind` vocabulary and the blessed `profiles` set.

---

### Task 1: SDK — `kind: "mcp"` and the `McpManifest` type family

**Files:**
- Modify: `packages/sdk/src/index.ts:16` (the `Kind` union)
- Modify: `packages/sdk/src/index.ts` (after the companion-app block ending at line ~597, before the `/* ── UI schema ── */` marker)
- Modify: `packages/sdk/src/index.ts:472` (add `mcp?` to `Manifest`)

- [ ] **Step 1: Widen the `Kind` union**

Replace line 16:

```ts
export type Kind = "asset" | "code" | "mixed" | "app" | "mcp";
```

- [ ] **Step 2: Add the `mcp` field to `Manifest`**

In `interface Manifest`, immediately after the `app?: AppManifest;` field (ends ~line 472), add:

```ts
  /**
   * For a `kind: "mcp"` **MCP server** package — a header that declares how a host reaches an MCP
   * server (on-device WASI / per-platform native, and/or remote http/sse) and what it offers. Like
   * {@link AppManifest} it carries no `/code` sandbox payload and no `capabilities`; the host's MCP
   * client runs/connects it under user consent. See {@link McpManifest} and `spec/mcp-server.md`.
   */
  mcp?: McpManifest;
```

- [ ] **Step 3: Add the `McpManifest` type family**

Immediately before the `/* ───────────────────────────── UI schema ───────────────────────────── */` section marker, insert:

```ts
/* ───────────────────────────── MCP server (`kind: "mcp"`) ───────────────────────────── */

/**
 * The `mcp` block of a `kind: "mcp"` package — an **MCP server** a host connects to. Like a companion
 * app it is a manifest *header*: it declares how to reach the server (on-device or remote) and what it
 * offers, carries no `/code` sandbox payload and no azphalt `capabilities`, and the host's MCP client
 * runs/connects it under user consent. On-device is first-class on every platform (mobile included);
 * remote is the fallback. See `spec/mcp-server.md`.
 */
export interface McpManifest {
  /** Values the host prompts for at connect time and substitutes as `${input:<id>}`. Never stored in the package. */
  inputs?: McpInput[];
  /** One or more logical servers — at least one is required. */
  servers: McpServer[];
  /** Descriptive advertisement of what the server exposes — powers the store card and a host pre-check. */
  offers?: McpOffers;
}

/** One value the host prompts the user for at connect time (mirrors VS Code's `inputs`). */
export interface McpInput {
  /** Stable id, referenced elsewhere in the block as `${input:<id>}`. */
  id: string;
  /** Prompt kind. `promptString` is the only blessed value in 0.1; the union stays open for later. */
  type: "promptString" | (string & {});
  /** Human-readable prompt description. */
  description?: string;
  /** Whether the entered value is a secret (masked, not echoed). */
  password?: boolean;
}

/**
 * One logical MCP server. **At least one** of `local` / `remote` is required; a host runs the first
 * transport it supports, preferring on-device (`local.wasi` → `local.platforms.<platform>` → `remote`).
 */
export interface McpServer {
  /** Stable id within the package. */
  id: string;
  /** On-device transport — preferred on every platform. At least one of `wasi` / `platforms` when present. */
  local?: McpLocalTransport;
  /** Remote transport — any platform, chosen only when the author/user wants it. */
  remote?: McpRemoteTransport;
}

/** The on-device transport: a portable WASI target and/or per-platform native launch descriptors. */
export interface McpLocalTransport {
  /** Portable: runs on-device on desktop AND mobile via the host's WASI runtime. */
  wasi?: McpWasiServer;
  /** Per-platform native launch descriptors — at least one when present. */
  platforms?: AtLeastOne<{ desktop: McpDesktopLaunch; android: McpAndroidLaunch }>;
}

/**
 * A WASI MCP server delivered as a WASM module — bundled (`module` is an in-package path) or a remote
 * header (`module` is `""` with `remoteUrl` + `checksum`, the same pattern as a large model asset). The
 * host runs it in its WASI runtime with the OS/host permissions in `grants`, consented by the user —
 * these are NOT azphalt editor capabilities.
 */
export interface McpWasiServer {
  /** In-package path to the `.wasm` module, or `""` when delivered via `remoteUrl`. */
  module: string;
  /** URL to fetch the module from when `module` is `""`. */
  remoteUrl?: string;
  /** `sha256-<hex>` of the remote module — a host MUST verify before running. Required with `remoteUrl`. */
  checksum?: string;
  /** Advisory byte size of the remote module. */
  byteSize?: number;
  /** Server args (may contain `${input:<id>}` references). */
  args?: string[];
  /** Environment variables (values may contain `${input:<id>}`; no literal secrets). */
  env?: Record<string, string>;
  /** Host/WASI-level permissions the server requests, user-consented (e.g. `fs:read`, `fs:write`, `net`). */
  grants?: string[];
}

/** A desktop native launch (VS Code parity): a command line the host spawns for a stdio server. */
export interface McpDesktopLaunch {
  /** Executable, e.g. `"npx"`. */
  command: string;
  /** Arguments (may contain `${input:<id>}` references). */
  args?: string[];
  /** Environment variables (values may contain `${input:<id>}`; no literal secrets). */
  env?: Record<string, string>;
}

/**
 * An Android native launch descriptor for an on-device server. Its exact shape is still being settled
 * (`spec/mcp-server.md § Open questions`); 0.1 carries a launch component the host resolves.
 */
export interface McpAndroidLaunch {
  /** A bundled/installed component or host-runtime entry the host launches to run the server on-device. */
  component: string;
  /** Arguments (may contain `${input:<id>}` references). */
  args?: string[];
}

/** A remote MCP server reached over HTTP or SSE. */
export interface McpRemoteTransport {
  /** Transport protocol. */
  type: "http" | "sse";
  /** Endpoint URL. */
  url: string;
  /** Request headers (values may contain `${input:<id>}`; no literal secrets). */
  headers?: Record<string, string>;
}

/** Descriptive advertisement of what the server exposes (advisory — the live MCP handshake is authoritative). */
export interface McpOffers {
  /** Tool names the server exposes, or a boolean presence flag. */
  tools?: string[] | boolean;
  /** Resource names, or a presence flag. */
  resources?: string[] | boolean;
  /** Prompt names, or a presence flag. */
  prompts?: string[] | boolean;
}
```

- [ ] **Step 4: Build the SDK so downstream typechecks see the new types**

Run: `pnpm --filter @azphalt/azdk build`
Expected: exits 0, no type errors.

- [ ] **Step 5: Commit**

```bash
git add packages/sdk/src/index.ts
git commit -m "feat(sdk): add kind:\"mcp\" and the McpManifest type family"
```

---

### Task 2: `@azphalt/azp` — the `kind:"mcp"` structural validator

**Files:**
- Create: `packages/azp/src/mcp.ts`
- Create: `packages/azp/test/mcp.test.ts`
- Modify: `packages/azp/src/index.ts` (fold into `verifyAzp`; re-export)

- [ ] **Step 1: Write the failing tests**

Create `packages/azp/test/mcp.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { validateMcpManifest } from "../src/mcp";
import type { Manifest } from "@azphalt/azdk";

const base: Manifest = {
  azphalt: "0.1",
  id: "com.acme.azphalt.fs-mcp",
  name: "Filesystem MCP",
  version: "1.0.0",
  kind: "mcp",
  license: "MIT",
  compat: ">=0.1",
  files: { "server/fs.wasm": "sha256-abc", LICENSE: "sha256-def" },
  mcp: {
    inputs: [{ id: "root", type: "promptString", description: "Root dir" }],
    servers: [
      {
        id: "filesystem",
        local: { wasi: { module: "server/fs.wasm", args: ["${input:root}"], grants: ["fs:read"] } },
        remote: { type: "http", url: "https://mcp.acme.com/fs" },
      },
    ],
    offers: { tools: ["read_file"], resources: true, prompts: false },
  },
};

// Deep-clone helper so each test mutates an isolated copy.
const clone = (): Manifest => JSON.parse(JSON.stringify(base));

describe("validateMcpManifest", () => {
  it("accepts a well-formed mcp manifest", () => {
    expect(validateMcpManifest(base)).toEqual([]);
  });

  it("requires an mcp block", () => {
    const m = clone();
    delete (m as { mcp?: unknown }).mcp;
    expect(validateMcpManifest(m).some((e) => e.includes("requires an \"mcp\" block"))).toBe(true);
  });

  it("requires at least one server", () => {
    const m = clone();
    m.mcp!.servers = [];
    expect(validateMcpManifest(m).some((e) => e.includes("at least one server"))).toBe(true);
  });

  it("requires each server to declare local or remote", () => {
    const m = clone();
    m.mcp!.servers[0] = { id: "bare" };
    expect(validateMcpManifest(m).some((e) => e.includes("at least one of local/remote"))).toBe(true);
  });

  it("requires local to declare wasi or platforms", () => {
    const m = clone();
    m.mcp!.servers[0].local = {};
    delete m.mcp!.servers[0].remote;
    expect(validateMcpManifest(m).some((e) => e.includes("at least one of wasi/platforms"))).toBe(true);
  });

  it("requires a checksum for a remote wasi module", () => {
    const m = clone();
    m.mcp!.servers[0].local = { wasi: { module: "", remoteUrl: "https://cdn.acme.com/fs.wasm" } };
    delete m.files["server/fs.wasm"];
    expect(validateMcpManifest(m).some((e) => e.includes("checksum"))).toBe(true);
  });

  it("requires a bundled wasi module to be in manifest.files", () => {
    const m = clone();
    delete m.files["server/fs.wasm"];
    expect(validateMcpManifest(m).some((e) => e.includes("not in manifest.files"))).toBe(true);
  });

  it("rejects a literal secret in a credential-keyed env value", () => {
    const m = clone();
    m.mcp!.servers[0].local!.wasi!.env = { API_KEY: "sk-live-123" };
    expect(validateMcpManifest(m).some((e) => e.includes("literal secret"))).toBe(true);
  });

  it("accepts a credential-keyed value that references an input", () => {
    const m = clone();
    m.mcp!.inputs = [{ id: "key", type: "promptString", password: true }];
    m.mcp!.servers[0].local!.wasi!.env = { API_KEY: "${input:key}" };
    m.mcp!.servers[0].local!.wasi!.args = [];
    expect(validateMcpManifest(m)).toEqual([]);
  });

  it("rejects a reference to an undeclared input", () => {
    const m = clone();
    m.mcp!.servers[0].local!.wasi!.args = ["${input:nope}"];
    expect(validateMcpManifest(m).some((e) => e.includes("undeclared input"))).toBe(true);
  });

  it("rejects editor surface on an mcp package (capabilities)", () => {
    const m = clone();
    m.capabilities = ["bitmap"];
    expect(validateMcpManifest(m).some((e) => e.includes("must not declare capabilities"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm --filter @azphalt/azp exec vitest run test/mcp.test.ts`
Expected: FAIL — `Failed to resolve import "../src/mcp"` (the module doesn't exist yet).

- [ ] **Step 3: Implement the validator**

Create `packages/azp/src/mcp.ts`:

```ts
/**
 * Structural validation for a `kind: "mcp"` manifest — an MCP-server *header* (see `spec/mcp-server.md`).
 * Returns human-readable errors ([] when valid). {@link verifyAzp} calls this **only** for `kind:"mcp"`
 * packages, folding the errors into its report; other kinds are unaffected.
 *
 * Rules: an `mcp` block with ≥1 server; every server has an `id` and at least one of `local`/`remote`;
 * every `local` has at least one of `wasi`/`platforms`; a bundled `wasi.module` is a real payload path
 * listed in `manifest.files`, a remote one (`module: ""`) carries `remoteUrl` + `checksum`; every
 * `${input:…}` reference resolves to a declared input; and no credential-keyed `env`/`headers` value is a
 * literal secret (it must reference an input). An `mcp` package is a header — no editor `capabilities`,
 * `entry`/`runtime`, `assets`, or `app` block.
 */
import type { Manifest } from "@azphalt/azdk";

/** env/header keys whose value must be an `${input:…}` reference, never a literal secret. */
const CREDENTIAL_KEY_RE = /(key|token|secret|password|passwd|api[-_]?key|auth|credential|bearer)/i;
const INPUT_REF_RE = /\$\{input:([^}]+)\}/g;

function referencedInputs(value: string): string[] {
  const ids: string[] = [];
  for (const m of value.matchAll(INPUT_REF_RE)) ids.push(m[1]);
  return ids;
}

export function validateMcpManifest(manifest: Manifest): string[] {
  const errors: string[] = [];
  const mcp = manifest.mcp;
  if (!mcp) {
    errors.push('mcp: kind "mcp" requires an "mcp" block');
    return errors;
  }

  // Header-only — an mcp package declares no sandbox surface.
  if (manifest.entry || manifest.runtime) errors.push("mcp: an mcp package must not declare entry/runtime");
  if (manifest.capabilities && manifest.capabilities.length > 0) errors.push("mcp: an mcp package must not declare capabilities");
  if (manifest.assets && manifest.assets.length > 0) errors.push("mcp: an mcp package must not declare assets");
  if (manifest.app) errors.push("mcp: an mcp package must not declare an app block");

  if (!Array.isArray(mcp.servers) || mcp.servers.length === 0) {
    errors.push("mcp: at least one server is required");
    return errors;
  }

  const declaredInputs = new Set((mcp.inputs ?? []).map((i) => i.id));
  const files = manifest.files ?? {};

  const checkValue = (where: string, key: string, value: string, credentialKey: boolean) => {
    const refs = referencedInputs(value);
    for (const id of refs) {
      if (!declaredInputs.has(id)) errors.push(`mcp: ${where} references undeclared input "${id}"`);
    }
    if (credentialKey && refs.length === 0) {
      errors.push(`mcp: literal secret in ${where} "${key}" — use \${input:…}`);
    }
  };

  const checkRecord = (where: string, rec: Record<string, string> | undefined) => {
    for (const [k, v] of Object.entries(rec ?? {})) checkValue(where, k, v, CREDENTIAL_KEY_RE.test(k));
  };

  const checkArgs = (where: string, args: string[] | undefined) => {
    for (const a of args ?? []) checkValue(where, "", a, false);
  };

  for (const server of mcp.servers) {
    const sid = server.id ? `server "${server.id}"` : "server";
    if (!server.id || typeof server.id !== "string") errors.push("mcp: every server needs an id");
    if (!server.local && !server.remote) errors.push(`mcp: ${sid} needs at least one of local/remote`);

    if (server.local) {
      const { wasi, platforms } = server.local;
      if (!wasi && !platforms) errors.push(`mcp: ${sid} local needs at least one of wasi/platforms`);
      if (wasi) {
        if (wasi.module === "") {
          if (!wasi.remoteUrl) errors.push(`mcp: ${sid} wasi with empty module needs a remoteUrl`);
          if (!wasi.checksum) errors.push(`mcp: ${sid} remote wasi needs a checksum`);
        } else if (typeof wasi.module !== "string") {
          errors.push(`mcp: ${sid} wasi needs a module (path or "")`);
        } else if (!Object.hasOwn(files, wasi.module)) {
          errors.push(`mcp: ${sid} wasi.module "${wasi.module}" is not in manifest.files`);
        }
        checkRecord(`${sid} wasi.env`, wasi.env);
        checkArgs(`${sid} wasi.args`, wasi.args);
      }
      if (platforms?.desktop) {
        if (!platforms.desktop.command) errors.push(`mcp: ${sid} desktop launch needs a command`);
        checkRecord(`${sid} desktop.env`, platforms.desktop.env);
        checkArgs(`${sid} desktop.args`, platforms.desktop.args);
      }
      if (platforms?.android) {
        if (!platforms.android.component) errors.push(`mcp: ${sid} android launch needs a component`);
        checkArgs(`${sid} android.args`, platforms.android.args);
      }
    }

    if (server.remote) {
      if (!server.remote.url) errors.push(`mcp: ${sid} remote needs a url`);
      if (server.remote.type !== "http" && server.remote.type !== "sse") {
        errors.push(`mcp: ${sid} remote type must be http or sse`);
      }
      checkRecord(`${sid} remote.headers`, server.remote.headers);
    }
  }

  return errors;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pnpm --filter @azphalt/azp exec vitest run test/mcp.test.ts`
Expected: PASS — all 11 tests green.

- [ ] **Step 5: Fold the validator into `verifyAzp` and re-export it**

In `packages/azp/src/index.ts`, add the import near the top (after line 9, the `import type { Manifest }` line):

```ts
import { validateMcpManifest } from "./mcp.js";
```

In `verifyAzp`, immediately **before** the `// Signature (optional)` comment (currently line ~153), insert:

```ts
  // Kind-specific structural rules. Only `kind:"mcp"` has any today; every other kind is unaffected.
  if (manifest.kind === "mcp") {
    errors.push(...validateMcpManifest(manifest));
  }
```

At the bottom of the file, after the existing `export { parseCompat, compatSatisfies } from "./compat.js";` line, add:

```ts
export { validateMcpManifest } from "./mcp.js";
```

- [ ] **Step 6: Run the full azp suite + typecheck**

Run: `pnpm --filter @azphalt/azp test`
Expected: PASS — the existing roundtrip/sign/trust/compat suites plus the new `mcp.test.ts`.

Run: `pnpm --filter @azphalt/azp typecheck`
Expected: exits 0, no type errors.

- [ ] **Step 7: Build azp so the registry (next task) links the updated verifier**

Run: `pnpm --filter @azphalt/azp build`
Expected: exits 0.

- [ ] **Step 8: Commit**

```bash
git add packages/azp/src/mcp.ts packages/azp/src/index.ts packages/azp/test/mcp.test.ts
git commit -m "feat(azp): validate kind:\"mcp\" manifests in verifyAzp"
```

---

### Task 3: `@azphalt/azp` — full `.azp` round-trip + verify for an mcp package

**Files:**
- Modify: `packages/azp/test/roundtrip.test.ts` (add two `it(...)` cases before the closing `});`)

- [ ] **Step 1: Write the failing test**

In `packages/azp/test/roundtrip.test.ts`, add these two cases just before the final `});` that closes `describe("azp", …)`:

```ts
  it("round-trips a kind:\"mcp\" server package (bundled wasi module, verifies)", () => {
    const wasm = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 1, 0, 0, 0]); // WASM magic + version
    const mcp = {
      inputs: [{ id: "root", type: "promptString" as const, description: "Root dir" }],
      servers: [
        {
          id: "filesystem",
          local: {
            wasi: { module: "server/fs.wasm", args: ["${input:root}"], grants: ["fs:read", "fs:write"] },
            platforms: { desktop: { command: "npx", args: ["-y", "@modelcontextprotocol/server-filesystem", "${input:root}"] } },
          },
          remote: { type: "http" as const, url: "https://mcp.acme.com/fs" },
        },
      ],
      offers: { tools: ["read_file", "write_file"], resources: true, prompts: false },
    };
    const { azp } = writeAzp({
      manifest: { ...base, id: "com.acme.fs-mcp", name: "Filesystem MCP", kind: "mcp", mcp },
      payload: { "server/fs.wasm": wasm },
      license,
    });

    const back = readAzp(azp).manifest;
    expect(back.kind).toBe("mcp");
    expect(back.mcp?.servers[0].local?.wasi?.module).toBe("server/fs.wasm");
    expect(back.mcp?.servers[0].remote?.url).toBe("https://mcp.acme.com/fs");
    expect(back.mcp?.offers?.tools).toContain("read_file");
    expect(verifyAzp(azp).ok).toBe(true);
  });

  it("rejects a kind:\"mcp\" package that hardcodes a secret", () => {
    const mcp = {
      servers: [
        {
          id: "svc",
          remote: { type: "http" as const, url: "https://mcp.acme.com", headers: { Authorization: "Bearer sk-live-abc" } },
        },
      ],
    };
    const { azp } = writeAzp({
      manifest: { ...base, id: "com.acme.leaky-mcp", name: "Leaky", kind: "mcp", mcp },
      payload: {},
      license,
    });

    const result = verifyAzp(azp);
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("literal secret"))).toBe(true);
  });
```

- [ ] **Step 2: Run the test to verify both cases behave**

Run: `pnpm --filter @azphalt/azp exec vitest run test/roundtrip.test.ts`
Expected: PASS — both new cases green (the first verifies, the second is rejected for the hardcoded secret). If this passes immediately, that is correct: the implementation from Task 2 already supports it; the test is proving the end-to-end wiring through `writeAzp`/`verifyAzp`.

- [ ] **Step 3: Commit**

```bash
git add packages/azp/test/roundtrip.test.ts
git commit -m "test(azp): round-trip + verify a kind:\"mcp\" package"
```

---

### Task 4: Registry — publish and list an mcp package

**Files:**
- Create: `packages/registry/test/mcp.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/registry/test/mcp.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { writeAzp } from "@azphalt/azp";
import { Registry, InMemoryStore, RegistryError } from "../src/index";

const license = "MIT License\n";
const base = { azphalt: "0.1", version: "1.0.0", license: "MIT", compat: ">=0.1" };

function mcpAzp() {
  const wasm = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 1, 0, 0, 0]);
  const mcp = {
    inputs: [{ id: "root", type: "promptString" as const }],
    servers: [
      { id: "fs", local: { wasi: { module: "server/fs.wasm", args: ["${input:root}"] } }, remote: { type: "http" as const, url: "https://mcp.acme.com/fs" } },
    ],
    offers: { tools: ["read_file"] },
  };
  return writeAzp({
    manifest: { ...base, id: "com.acme.fs-mcp", name: "Filesystem MCP", kind: "mcp" as const, mcp },
    payload: { "server/fs.wasm": wasm },
    license,
  }).azp;
}

describe("registry — mcp packages", () => {
  it("publishes a kind:\"mcp\" package and lists it by kind", async () => {
    const registry = new Registry(new InMemoryStore());
    const { package: summary } = await registry.publish(mcpAzp());
    expect(summary.kind).toBe("mcp");
    expect(summary.id).toBe("com.acme.fs-mcp");

    const listed = await registry.list({ kind: "mcp" });
    expect(listed.map((s) => s.id)).toContain("com.acme.fs-mcp");
  });

  it("rejects an mcp package with a hardcoded secret", async () => {
    const bad = writeAzp({
      manifest: {
        ...base,
        id: "com.acme.leaky-mcp",
        name: "Leaky",
        kind: "mcp" as const,
        mcp: { servers: [{ id: "svc", remote: { type: "http" as const, url: "https://x", headers: { Authorization: "Bearer sk-abc" } } }] },
      },
      payload: {},
      license,
    }).azp;

    const registry = new Registry(new InMemoryStore());
    await expect(registry.publish(bad)).rejects.toBeInstanceOf(RegistryError);
  });
});
```

- [ ] **Step 2: Run the test to verify it passes**

Run: `pnpm --filter @azphalt/registry exec vitest run test/mcp.test.ts`
Expected: PASS — both cases green. (`Registry.publish` calls `verifyAzp`, which now runs the mcp rules; the good package indexes and lists, the leaky one throws `RegistryError`.)

If it fails to resolve `@azphalt/azp`, run `pnpm --filter @azphalt/azp build` first (Task 2 Step 7) and retry.

- [ ] **Step 3: Run the full registry suite + typecheck**

Run: `pnpm --filter @azphalt/registry test`
Expected: PASS — existing registry tests plus the new mcp test.

Run: `pnpm --filter @azphalt/registry typecheck`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add packages/registry/test/mcp.test.ts
git commit -m "test(registry): publish and list a kind:\"mcp\" package"
```

---

### Task 5: Specs — the `mcp-server.md` RFC and cross-references

**Files:**
- Create: `spec/mcp-server.md`
- Modify: `spec/extension-manifest.md` (the `kind` row + a pointer)
- Modify: `spec/repository-api.md` (blessed `profiles` set)

- [ ] **Step 1: Write `spec/mcp-server.md`**

Create `spec/mcp-server.md` as the normative RFC, sibling to `spec/companion-app.md`. Adapt the approved design doc (`docs/superpowers/specs/2026-07-19-mcp-server-upload-design.md`) into these sections, matching companion-app.md's voice and depth:

1. **Title + status line** — `# MCP servers (kind: "mcp") — RFC`, `Status: Proposed`.
2. **Why this exists — and why it doesn't break the moat** — an MCP server needs network/filesystem (the opposite of a sandboxed `code` extension), so it is a header the host runs under consent, not sandboxed azphalt code; reuse the four companion-app moat bullets, restated for MCP.
3. **The package (`kind: "mcp"`)** — the `mcp` block, with the full JSONC example from the design doc (`inputs`, `servers[]` with `local.wasi` / `local.platforms` / `remote`, `offers`).
4. **Transports** — `local` (on-device, preferred everywhere): `wasi` (portable, bundled or remote-header) and `platforms.desktop` / `platforms.android`; `remote` (http/sse). State the host selection order: `local.wasi → local.platforms.<platform> → remote`.
5. **Two boundaries, kept distinct** — `wasi.grants` / native launch are OS/host permissions consented to the *server*; azphalt editor `capabilities` and the never-list are untouched.
6. **Inputs & secrets** — `${input:…}` prompted at connect time; no literal secrets in the package (verify-time rejection); credential-keyed `env`/`headers` MUST reference an input.
7. **Verification** — the `validateMcpManifest` rules (header-only; ≥1 server; local/remote; wasi/platforms; bundled-module-in-`files` vs remote `remoteUrl`+`checksum`; declared inputs; no literal secrets). Signing/trust/revocations apply unchanged.
8. **Discovery & registry** — `kind:"mcp"` flows through summaries; a registry advertises the `"mcp"` profile; app-scoping works as-is.
9. **Open questions** — the four from the design doc (android descriptor shape; secret-detection rule; `grants` vocabulary; whether `offers` is verified against the live handshake).

- [ ] **Step 2: Add `mcp` to the manifest `kind` vocabulary**

In `spec/extension-manifest.md`, find the `kind` row of the top-level fields table (currently `` `asset` \| `code` \| `mixed` \| `app` ``) and change it to:

```
| `kind` | ✔ | `asset` \| `code` \| `mixed` \| `app` \| `mcp`. |
```

Then, after the `## app` section, add a short `## mcp` section:

```markdown
## `mcp`
For a `kind: "mcp"` **MCP server** (a server a host's MCP client connects to), the manifest carries an
`mcp` block instead of `assets`/`entry`/`capabilities`/`app`. Like `app`, it is a *header*: it declares
how to reach the server (on-device `local` — a portable `wasi` module and/or per-platform native launch
— and/or a `remote` http/sse url), the `inputs` the host prompts for at connect time (`${input:…}`,
never stored), and a descriptive `offers` of its tools/resources/prompts. It grants no azphalt
capabilities and ships no `/code` sandbox payload; the host runs/connects it under user consent. The
full contract is normative in **mcp-server.md**.
```

- [ ] **Step 3: Add `"mcp"` to the blessed profiles**

In `spec/repository-api.md`, in the **Supported types and profiles** subsection, update the blessed-profile list from `` the blessed set is `"image"`, `"video-audio"`, and `"companion"` `` to `` the blessed set is `"image"`, `"video-audio"`, `"companion"`, and `"mcp"` ``. Add one sentence: "A registry that carries `kind:"mcp"` **MCP-server** packages (`mcp-server.md`) advertises `"mcp"` so only a host that implements an MCP client browses for them."

Also, in the **Kind** paragraph (under § Get Package Details / search response), extend the kind list from `(\"asset\" · \"code\" · \"mixed\" · \"app\")` to include `· "mcp"`.

- [ ] **Step 4: Commit**

```bash
git add spec/mcp-server.md spec/extension-manifest.md spec/repository-api.md
git commit -m "docs(spec): normative RFC for kind:\"mcp\" MCP-server packages"
```

---

### Task 6: Full-workspace verification

- [ ] **Step 1: Typecheck the whole workspace**

Run: `pnpm -r typecheck`
Expected: every package exits 0. (If a package other than sdk/azp/registry fails to resolve the new `Kind`/`McpManifest`, rebuild the sdk: `pnpm --filter @azphalt/azdk build`, then re-run.)

- [ ] **Step 2: Run the whole test suite**

Run: `pnpm -r test`
Expected: all packages' vitest suites pass, including the new azp and registry mcp tests.

- [ ] **Step 3: Final commit (if any incidental fixes were needed)**

```bash
git add -A
git commit -m "chore: workspace typecheck + tests green for kind:\"mcp\""
```

---

## Notes for the implementer

- **On-device is the default, not a mobile afterthought.** The selection order (`local.wasi → local.platforms → remote`) and the WASI-first framing are load-bearing — don't reorder them to prefer remote.
- **`wasi.grants` are NOT azphalt capabilities.** They are OS/WASI permissions the *server* requests, consented by the user — a different sandbox than the editor capability model. Keep the two vocabularies separate in code and prose.
- **The validator only runs for `kind:"mcp"`.** Never make `verifyAzp` structurally validate other kinds — existing packages/tests assume integrity-only verification for them.
- **Secret detection is intentionally conservative** (credential-*keyed* env/headers must reference an input). Broadening it to a value heuristic is an Open Question, deferred.
