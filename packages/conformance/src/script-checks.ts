/**
 * Conformance checks for a **script host** — an app whose native-script installer consumes
 * `kind:"script"` packages (`spec/script.md`). Like the mcp/skill profiles it runs **none** of the
 * script's code itself as part of verification: `load` verifies the header (refusing tampered /
 * unsafe / non-script / incompatible packages) and reports the script it will surface. Resolving
 * `dependencies` and actually invoking the script (with whatever OS/package-manager access and
 * user consent that requires, outside the azphalt sandbox) is the host's own concern, beyond what
 * this static suite drives.
 */
import { writeAzp } from "@azphalt/azp";
import type { Manifest, ScriptManifest } from "@azphalt/azdk";
import { pass, fail, satisfiesCompat, type CheckResult } from "./checks.js";
import type { HostProfile } from "./video-audio-checks.js";
import * as fx from "./fixtures.js";

/** What a script host reports after loading (verifying) a `kind:"script"` package. */
export interface ScriptLoadReport {
  /** Whether the host accepted the package for use. */
  accepted: boolean;
  /** Why it was refused (when `accepted` is false). */
  reason?: string;
  /** The `command` (or `entry`, if `command` is absent) the host will surface. */
  command?: string;
}

/**
 * The minimum a script host exposes for the suite to drive it. It **runs no code**: `load`
 * verifies a `kind:"script"` header and reports the script it will surface; resolving
 * dependencies and invoking the script is the host's own concern.
 */
export interface ScriptHost {
  load(azp: Uint8Array): ScriptLoadReport | Promise<ScriptLoadReport>;
  /** The host API version, e.g. `"0.1"` — so `compat` can gate. */
  apiVersion?: string;
  /** The conformance profile(s) this host supports (e.g. `["script"]`). */
  profiles?: HostProfile[];
}

const enc = (s: string) => new TextEncoder().encode(s);

const SCRIPT_BYTES = enc("#!/usr/bin/env bash\necho fixture\n");

const SCRIPT_MANIFEST: Omit<Manifest, "files"> & { script: ScriptManifest } = {
  azphalt: "0.1",
  id: "com.example.azphalt.fixture-script",
  name: "Fixture Script",
  version: "1.0.0",
  kind: "script",
  license: "MIT",
  compat: ">=0.1",
  script: {
    interpreter: "bash",
    entry: "script/main.sh",
    command: "fixture-script",
    dependencies: { apt: ["bash"] },
  },
};

/** A valid `kind:"script"` fixture. */
function scriptAzp(): Uint8Array {
  return writeAzp({
    manifest: SCRIPT_MANIFEST,
    payload: { "script/main.sh": SCRIPT_BYTES },
    license: "MIT",
  }).azp;
}

/** A valid script header whose `compat` no `0.1` host can satisfy. */
function scriptIncompatibleAzp(): Uint8Array {
  return writeAzp({
    manifest: { ...SCRIPT_MANIFEST, compat: ">=99.0" },
    payload: { "script/main.sh": SCRIPT_BYTES },
    license: "MIT",
  }).azp;
}

async function tryLoad(host: ScriptHost, azp: Uint8Array): Promise<ScriptLoadReport> {
  try {
    return await host.load(azp);
  } catch (e) {
    return { accepted: false, reason: `threw: ${e instanceof Error ? e.message : String(e)}` };
  }
}

/** Checklist: refuses a script package whose payload fails verification. */
export async function checkScriptRejectTampered(host: ScriptHost): Promise<CheckResult> {
  const id = "reject-tampered";
  const title = "Refuses a package that fails verification";
  const r = await tryLoad(host, fx.tamperedAzp());
  return r.accepted ? fail(id, title, "host accepted a tampered package") : pass(id, title);
}

/** Checklist: refuses an unsafe payload path (`..`). */
export async function checkScriptRejectUnsafePath(host: ScriptHost): Promise<CheckResult> {
  const id = "reject-unsafe-path";
  const title = "Refuses a package with an unsafe payload path (`..`)";
  const r = await tryLoad(host, fx.unsafePathAzp());
  return r.accepted ? fail(id, title, "host accepted an unsafe-path package") : pass(id, title);
}

/** Checklist: refuses any non-`kind:"script"` package (e.g. `kind:"code"`). */
export async function checkScriptRejectNonScript(host: ScriptHost): Promise<CheckResult> {
  const id = "reject-non-script";
  const title = "Refuses a non-`kind:\"script\"` package";
  const r = await tryLoad(host, fx.codeKindAzp());
  return r.accepted ? fail(id, title, "host accepted a kind:code package as a script") : pass(id, title);
}

/** Checklist: accepts a valid script package and surfaces its command. */
export async function checkScriptSurfacesCommand(host: ScriptHost): Promise<CheckResult> {
  const id = "surfaces-command";
  const title = "Accepts a valid script package and surfaces its command";
  const r = await tryLoad(host, scriptAzp());
  if (!r.accepted) return fail(id, title, `host refused a valid script package: ${r.reason ?? ""}`);
  if (r.command !== "fixture-script") {
    return fail(id, title, `host did not surface the 'fixture-script' command (command=${JSON.stringify(r.command)})`);
  }
  return pass(id, title, `surfaced ${r.command}`);
}

/** Checklist: reports an apiVersion and refuses a script package whose `compat` it cannot satisfy. */
export async function checkScriptCompat(host: ScriptHost): Promise<CheckResult> {
  const id = "compat-version";
  const title = "Reports an apiVersion and refuses an incompatible package";
  if (!host.apiVersion) return fail(id, title, "host does not report an apiVersion");
  if (!satisfiesCompat(host.apiVersion, ">=0.1")) {
    return fail(id, title, `apiVersion ${host.apiVersion} does not satisfy >=0.1`);
  }
  const r = await tryLoad(host, scriptIncompatibleAzp());
  return r.accepted
    ? fail(id, title, "host accepted a script package whose compat it cannot satisfy")
    : pass(id, title, `apiVersion ${host.apiVersion}; refused an incompatible package`);
}

/** Checklist: declares a `script` conformance profile a registry can match on. */
export function checkScriptProfileDeclaration(host: ScriptHost): CheckResult {
  const id = "profile-declaration";
  const title = "Declares a `script` conformance profile";
  const profiles = host.profiles ?? [];
  return profiles.includes("script")
    ? pass(id, title, `profiles: ${profiles.join(", ")}`)
    : fail(id, title, `host does not declare the 'script' profile (profiles=${JSON.stringify(profiles)})`);
}
