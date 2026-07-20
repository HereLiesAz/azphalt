/**
 * The security sweep (`spec/marketplace-integrity.md § 1`) — an automated battery run at publish and
 * update. It is **defense-in-depth and labelling**, never the thing that makes an extension safe (the
 * capability sandbox is). Each check yields `pass` / `flag` / `block`; the report's overall verdict is
 * the worst of its checks. `block` prevents indexing; `flag` indexes with a warning a host surfaces.
 *
 * Pure and store-free: `scanPackage(bytes, opts)` → {@link ScanReport}. The registry runs it in
 * `publish`; an author can run it pre-submit.
 */
import { digest, readAzp, verifyAzp } from "@azphalt/azp";
import type { Capability, Manifest } from "@azphalt/azdk";

export type ScanVerdict = "pass" | "flag" | "block";

export interface ScanCheck {
  /** Stable check id, e.g. `"secret-scan"`. */
  id: string;
  verdict: ScanVerdict;
  /** Human-readable reason when not `pass`. */
  detail?: string;
}

export interface ScanReport {
  /** The worst verdict across `checks`. */
  verdict: ScanVerdict;
  checks: ScanCheck[];
  /** ISO-8601 instant. */
  scannedAt: string;
}

export interface ScanOptions {
  /** Known-bad container digests (`sha256-…`, as {@link digest} emits) — a hit blocks. */
  denylistDigests?: readonly string[];
  /** Revoked publisher public keys (base64 SPKI, as in `signature.json`) — a hit blocks. */
  denylistKeys?: readonly string[];
  /** Injected clock for deterministic tests. */
  now?: string;
}

// A manifest value whose KEY looks like a credential must be an `${input:…}` reference, never a literal.
// NB: `authorization` (not bare `auth`) so it doesn't false-match the very common `author` field.
const CREDENTIAL_KEY_RE = /(key|token|secret|password|passwd|api[-_]?key|authorization|credential|bearer)/i;
const INPUT_REF_RE = /\$\{input:[^}]{1,128}\}/;

const RANK: Record<ScanVerdict, number> = { pass: 0, flag: 1, block: 2 };
function worst(checks: ScanCheck[]): ScanVerdict {
  return checks.reduce<ScanVerdict>((w, c) => (RANK[c.verdict] > RANK[w] ? c.verdict : w), "pass");
}

/** Recursively find credential-keyed string literals in the manifest that aren't `${input:…}` refs. */
function secretScan(manifest: Manifest): ScanCheck {
  const hits: string[] = [];
  const walk = (node: unknown, path: string): void => {
    if (node == null) return;
    if (Array.isArray(node)) {
      node.forEach((v, i) => walk(v, `${path}[${i}]`));
      return;
    }
    if (typeof node === "object") {
      for (const [k, v] of Object.entries(node)) {
        // The `files` digest map is keyed by file PATHS (which may contain substrings like "tokens/")
        // and its values are integrity digests, never secrets — skip it entirely.
        if (k === "files") continue;
        // A value that is a content digest (`sha256-…`) is never a credential, whatever its key.
        const isDigest = typeof v === "string" && /^sha256-/i.test(v);
        if (typeof v === "string" && !isDigest && CREDENTIAL_KEY_RE.test(k) && v.length >= 8 && !INPUT_REF_RE.test(v)) {
          hits.push(`${path}.${k}`);
        }
        walk(v, `${path}.${k}`);
      }
    }
  };
  walk(manifest, "manifest");
  return hits.length > 0
    ? { id: "secret-scan", verdict: "block", detail: `credential-shaped literal(s): ${hits.join(", ")}` }
    : { id: "secret-scan", verdict: "pass" };
}

/** Flag a `code`/`mixed` package that declares capabilities but contributes no executable extension point. */
function capabilityAudit(manifest: Manifest): ScanCheck {
  if (manifest.kind !== "code" && manifest.kind !== "mixed") return { id: "capability-audit", verdict: "pass" };
  const caps = (manifest.capabilities ?? []) as Capability[];
  const c = manifest.contributes;
  const contributions =
    (c?.filters?.length ?? 0) + (c?.tools?.length ?? 0) + (c?.commands?.length ?? 0) + (c?.transitions?.length ?? 0);
  if (caps.length > 0 && contributions === 0) {
    return {
      id: "capability-audit",
      verdict: "flag",
      detail: `declares ${caps.length} capabilit${caps.length === 1 ? "y" : "ies"} but contributes no extension point`,
    };
  }
  return { id: "capability-audit", verdict: "pass" };
}

/** Run the security sweep over a `.azp`'s bytes. */
export function scanPackage(azpBytes: Uint8Array, opts: ScanOptions = {}): ScanReport {
  const checks: ScanCheck[] = [];

  const verified = verifyAzp(azpBytes);
  checks.push(
    verified.ok
      ? { id: "container", verdict: "pass" }
      : { id: "container", verdict: "block", detail: verified.errors.join("; ") },
  );

  if (new Set(opts.denylistDigests ?? []).has(digest(azpBytes))) {
    checks.push({ id: "denylist-digest", verdict: "block", detail: "container digest is denylisted" });
  }

  // Parse once; container check already blocked a corrupt package, so this is best-effort.
  let manifest: Manifest | undefined;
  let payload: Record<string, Uint8Array> | undefined;
  try {
    ({ manifest, payload } = readAzp(azpBytes));
  } catch {
    /* handled by the container check */
  }

  if (manifest) {
    checks.push(secretScan(manifest));
    checks.push(capabilityAudit(manifest));
  }

  const denyKeys = new Set(opts.denylistKeys ?? []);
  if (denyKeys.size > 0 && payload?.["signature.json"]) {
    try {
      const sig = JSON.parse(new TextDecoder().decode(payload["signature.json"])) as { publicKey?: string };
      if (sig.publicKey && denyKeys.has(sig.publicKey)) {
        checks.push({ id: "denylist-key", verdict: "block", detail: "publisher key is denylisted" });
      }
    } catch {
      /* a malformed signature is the container check's concern */
    }
  }

  return { verdict: worst(checks), checks, scannedAt: opts.now ?? new Date().toISOString() };
}
