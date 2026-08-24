/**
 * Conformance checks for a **composable host** — an app whose UI-template renderer consumes
 * `kind:"composable"` packages (`spec/composable.md`). Like the mcp/skill/script profiles it runs
 * **no code** at all: `load` verifies the header (refusing tampered / unsafe / non-composable /
 * incompatible packages) and reports the elements it will surface. Resolving a `templateId` against
 * the host's own build-linked template library, and mapping token values (`hue`/`surface`/`scale`)
 * into the host's own design system, is the host's own concern, beyond what this static suite drives
 * — there is nothing here for azphalt to execute, only data for the host to read.
 */
import { writeAzp } from "@azphalt/azp";
import type { Manifest, ComposableManifest } from "@azphalt/azdk";
import { pass, fail, satisfiesCompat, type CheckResult } from "./checks.js";
import type { HostProfile } from "./video-audio-checks.js";
import * as fx from "./fixtures.js";

/** What a composable host reports after loading (verifying) a `kind:"composable"` package. */
export interface ComposableLoadReport {
  /** Whether the host accepted the package for use. */
  accepted: boolean;
  /** Why it was refused (when `accepted` is false). */
  reason?: string;
  /** The ids of the elements the host will surface. */
  elements?: string[];
}

/**
 * The minimum a composable host exposes for the suite to drive it. It **runs no code**: `load`
 * verifies a `kind:"composable"` header and reports the elements it will surface; resolving each
 * `templateId` against the host's linked template library and rendering it is the host's own
 * concern.
 */
export interface ComposableHost {
  load(azp: Uint8Array): ComposableLoadReport | Promise<ComposableLoadReport>;
  /** The host API version, e.g. `"0.1"` — so `compat` can gate. */
  apiVersion?: string;
  /** The conformance profile(s) this host supports (e.g. `["composable"]`). */
  profiles?: HostProfile[];
}

const COMPOSABLE_MANIFEST: Omit<Manifest, "files"> & { composable: ComposableManifest } = {
  azphalt: "0.1",
  id: "com.example.azphalt.fixture-composable",
  name: "Fixture Composable",
  version: "1.0.0",
  kind: "composable",
  license: "MIT",
  compat: ">=0.1",
  composable: {
    library: { group: "com.example", artifact: "fixture-templates", version: "1.0.0" },
    elements: [
      {
        id: "fixture",
        templateId: "fixture.tile",
        hue: "azure",
        surface: "recordTile",
        scale: "lead",
        act: "create",
        jobs: ["fixture job"],
      },
    ],
  },
};

/** A valid `kind:"composable"` fixture with one element, `fixture`. No payload — a pure header. */
function composableAzp(): Uint8Array {
  return writeAzp({ manifest: COMPOSABLE_MANIFEST, payload: {}, license: "MIT" }).azp;
}

/** A valid composable header whose `compat` no `0.1` host can satisfy. */
function composableIncompatibleAzp(): Uint8Array {
  return writeAzp({ manifest: { ...COMPOSABLE_MANIFEST, compat: ">=99.0" }, payload: {}, license: "MIT" }).azp;
}

async function tryLoad(host: ComposableHost, azp: Uint8Array): Promise<ComposableLoadReport> {
  try {
    return await host.load(azp);
  } catch (e) {
    return { accepted: false, reason: `threw: ${e instanceof Error ? e.message : String(e)}` };
  }
}

/** Checklist: refuses a composable package whose payload fails verification. */
export async function checkComposableRejectTampered(host: ComposableHost): Promise<CheckResult> {
  const id = "reject-tampered";
  const title = "Refuses a package that fails verification";
  const r = await tryLoad(host, fx.tamperedAzp());
  return r.accepted ? fail(id, title, "host accepted a tampered package") : pass(id, title);
}

/** Checklist: refuses an unsafe payload path (`..`). */
export async function checkComposableRejectUnsafePath(host: ComposableHost): Promise<CheckResult> {
  const id = "reject-unsafe-path";
  const title = "Refuses a package with an unsafe payload path (`..`)";
  const r = await tryLoad(host, fx.unsafePathAzp());
  return r.accepted ? fail(id, title, "host accepted an unsafe-path package") : pass(id, title);
}

/** Checklist: runs no code — refuses any non-`kind:"composable"` package (e.g. `kind:"code"`). */
export async function checkComposableRejectNonComposable(host: ComposableHost): Promise<CheckResult> {
  const id = "reject-non-composable";
  const title = "Refuses a non-`kind:\"composable\"` package (runs no code, renders nothing but its own linked templates)";
  const r = await tryLoad(host, fx.codeKindAzp());
  return r.accepted ? fail(id, title, "host accepted a kind:code package as a composable set") : pass(id, title);
}

/** Checklist: accepts a valid composable package and surfaces its declared element. */
export async function checkComposableSurfacesElement(host: ComposableHost): Promise<CheckResult> {
  const id = "surfaces-element";
  const title = "Accepts a valid composable package and surfaces its element";
  const r = await tryLoad(host, composableAzp());
  if (!r.accepted) return fail(id, title, `host refused a valid composable package: ${r.reason ?? ""}`);
  if (!r.elements?.includes("fixture")) {
    return fail(id, title, `host did not surface the 'fixture' element (elements=${JSON.stringify(r.elements)})`);
  }
  return pass(id, title, `surfaced ${r.elements.join(", ")}`);
}

/** Checklist: reports an apiVersion and refuses a composable package whose `compat` it cannot satisfy. */
export async function checkComposableCompat(host: ComposableHost): Promise<CheckResult> {
  const id = "compat-version";
  const title = "Reports an apiVersion and refuses an incompatible package";
  if (!host.apiVersion) return fail(id, title, "host does not report an apiVersion");
  if (!satisfiesCompat(host.apiVersion, ">=0.1")) {
    return fail(id, title, `apiVersion ${host.apiVersion} does not satisfy >=0.1`);
  }
  const r = await tryLoad(host, composableIncompatibleAzp());
  return r.accepted
    ? fail(id, title, "host accepted a composable package whose compat it cannot satisfy")
    : pass(id, title, `apiVersion ${host.apiVersion}; refused an incompatible package`);
}

/** Checklist: declares a `composable` conformance profile a registry can match on. */
export function checkComposableProfileDeclaration(host: ComposableHost): CheckResult {
  const id = "profile-declaration";
  const title = "Declares a `composable` conformance profile";
  const profiles = host.profiles ?? [];
  return profiles.includes("composable")
    ? pass(id, title, `profiles: ${profiles.join(", ")}`)
    : fail(id, title, `host does not declare the 'composable' profile (profiles=${JSON.stringify(profiles)})`);
}
