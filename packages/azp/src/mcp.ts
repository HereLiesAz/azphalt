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
// Bounded quantifier ({1,128}, not +): an input id is short, and an unbounded `[^}]+` before `\}`
// backtracks O(n) per `${input:` start — polynomial on a crafted value (CodeQL js/polynomial-redos).
const INPUT_REF_RE = /\$\{input:([^}]{1,128})\}/g;

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
