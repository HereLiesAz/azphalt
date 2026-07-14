/**
 * Conformance checks for a **companion-app host** — an app (GraffitiXR, Guillotine, …) that consumes
 * `kind:"app"` companion packages: it verifies the header, matches the platform it runs on, gets
 * OS-style consent, launches an external Android app or PWA over the declared transport, and validates
 * the returned assets/params against the handoff's declared `output` before ingesting them
 * (`spec/companion-app.md`, `docs/ADOPTION_COMPANION_HOST.md`). It runs **none** of the companion's
 * code and reaches **none** of the editor surface, so this profile drives a small {@link CompanionHost}
 * contract: `load` (verify + refuse non-app / tampered / unsafe / incompatible) and `invoke` (consent,
 * least-input, transport, return-validation).
 */
import { readAzp } from "@azphalt/azp";
import type { AppManifest, Handoff, HandoffIO, Manifest } from "@azphalt/azdk";
import { pass, fail, satisfiesCompat, type CheckResult } from "./checks.js";
import type { HostProfile } from "./video-audio-checks.js";
import * as fx from "./fixtures.js";

/** A platform a companion host can launch a handoff on. */
export type CompanionPlatform = "android" | "pwa";

/** What a companion host reports after loading (verifying) a `kind:"app"` package. */
export interface CompanionLoadReport {
  /** Whether the host accepted the package for use. */
  accepted: boolean;
  /** Why it was refused (when `accepted` is false). */
  reason?: string;
  /** The ids of the handoffs the host will surface to the user (actions it can place). */
  offered?: string[];
  /** The platform the host matched for this package (the one it runs on). */
  platform?: CompanionPlatform;
}

/** The result a companion would hand back — the suite passes this to `invoke` for the host to validate. */
export interface CompanionReturn {
  /** Assets returned, by declared {@link import("@azphalt/azdk").AssetType}. */
  assets?: string[];
  /** Structured params returned. */
  params?: Record<string, unknown>;
}

/** What a companion host reports after driving one handoff. */
export interface CompanionInvocation {
  /** Whether the host obtained OS-style consent before launching. */
  consented: boolean;
  /** The platform/transport the host launched on. */
  platform?: CompanionPlatform;
  /** The input the host actually handed off — the suite checks it matches the declared `input`. */
  sentInput?: HandoffIO;
  /** Whether the host accepted the companion's return after validating it against `output`. */
  accepted: boolean;
  /** Why the return was refused (when `accepted` is false). */
  reason?: string;
}

/**
 * The minimum a companion host exposes for the suite to drive it. It **runs no code**: `load` verifies
 * a `kind:"app"` header (refusing tampered / unsafe / non-app / incompatible packages) and reports the
 * handoffs it will surface; `invoke` drives one handoff — obtaining consent, handing off **only** the
 * declared input, launching a transport for a platform it supports, and validating the companion's
 * return against the declared `output`.
 */
export interface CompanionHost {
  load(azp: Uint8Array): CompanionLoadReport | Promise<CompanionLoadReport>;
  invoke(
    azp: Uint8Array,
    handoffId: string,
    ret: CompanionReturn,
  ): CompanionInvocation | Promise<CompanionInvocation>;
  /** The host API version, e.g. `"0.1"` — so `compat` can gate. */
  apiVersion?: string;
  /** The conformance profile(s) this host supports (e.g. `["companion"]`). */
  profiles?: HostProfile[];
  /** The platforms this host can launch a companion on (an Android host → `["android"]`). */
  platforms?: CompanionPlatform[];
}

async function tryLoad(host: CompanionHost, azp: Uint8Array): Promise<CompanionLoadReport> {
  try {
    return await host.load(azp);
  } catch (e) {
    return { accepted: false, reason: `threw: ${e instanceof Error ? e.message : String(e)}` };
  }
}

async function tryInvoke(
  host: CompanionHost,
  azp: Uint8Array,
  handoffId: string,
  ret: CompanionReturn,
): Promise<CompanionInvocation> {
  try {
    return await host.invoke(azp, handoffId, ret);
  } catch (e) {
    // A throw during invocation is a refusal of the return, not consent granted.
    return { consented: false, accepted: false, reason: `threw: ${e instanceof Error ? e.message : String(e)}` };
  }
}

/** Read the fixture's declared `app` block and its first handoff — the contract the host must honor. */
function fixtureHandoff(azp: Uint8Array): { app: AppManifest; handoff: Handoff } {
  const { manifest } = readAzp(azp) as { manifest: Manifest };
  const app = manifest.app;
  if (!app) throw new Error("companion fixture has no app block");
  const handoff = app.handoffs[0];
  if (!handoff) throw new Error("companion fixture declares no handoffs");
  return { app, handoff };
}

/** Compare a sent {@link HandoffIO} against the declared one — no extra assets, no extra params. */
function ioExceeds(sent: HandoffIO | undefined, declared: HandoffIO | undefined): string | null {
  const declaredAssets = new Set(declared?.assets ?? []);
  const declaredParams = new Set(Object.keys(declared?.params ?? {}));
  for (const a of sent?.assets ?? []) {
    if (!declaredAssets.has(a)) return `sent undeclared input asset '${a}'`;
  }
  for (const p of Object.keys(sent?.params ?? {})) {
    if (!declaredParams.has(p)) return `sent undeclared input param '${p}'`;
  }
  return null;
}

/** Checklist: refuses a companion package whose payload fails verification. */
export async function checkCompanionRejectTampered(host: CompanionHost): Promise<CheckResult> {
  const id = "reject-tampered";
  const title = "Refuses a companion package that fails verification";
  const r = await tryLoad(host, fx.companionTamperedAzp());
  return r.accepted ? fail(id, title, "host accepted a tampered companion package") : pass(id, title);
}

/** Checklist: refuses an unsafe payload path (`..`). */
export async function checkCompanionRejectUnsafePath(host: CompanionHost): Promise<CheckResult> {
  const id = "reject-unsafe-path";
  const title = "Refuses a package with an unsafe payload path (`..`)";
  const r = await tryLoad(host, fx.unsafePathAzp());
  return r.accepted ? fail(id, title, "host accepted an unsafe-path package") : pass(id, title);
}

/** Checklist: runs no code — refuses any non-`kind:"app"` package (e.g. `kind:"code"`). */
export async function checkCompanionRejectNonApp(host: CompanionHost): Promise<CheckResult> {
  const id = "reject-non-app";
  const title = "Refuses a non-`kind:\"app\"` package (runs no code, reaches no editor surface)";
  const r = await tryLoad(host, fx.codeKindAzp());
  return r.accepted ? fail(id, title, "host accepted a kind:code package as a companion") : pass(id, title);
}

/** Checklist: accepts a valid companion and surfaces its handoff on a platform it supports. */
export async function checkCompanionOffersHandoff(host: CompanionHost): Promise<CheckResult> {
  const id = "offers-handoff";
  const title = "Accepts a valid companion and surfaces its handoff on a supported platform";
  const azp = fx.companionAzp();
  const { handoff } = fixtureHandoff(azp);
  const r = await tryLoad(host, azp);
  if (!r.accepted) return fail(id, title, `host refused a valid companion package: ${r.reason ?? ""}`);
  if (!r.offered?.includes(handoff.id)) {
    return fail(id, title, `host did not surface the '${handoff.id}' handoff (offered=${JSON.stringify(r.offered)})`);
  }
  // The title asserts a supported platform, so a host that never reports one fails — not passes by omission.
  if (!r.platform) return fail(id, title, "host did not report the platform it matched");
  const supported = new Set(host.platforms ?? []);
  if (!supported.has(r.platform)) {
    return fail(id, title, `host matched platform '${r.platform}' it does not declare support for`);
  }
  return pass(id, title, `offered ${r.offered.join(", ")} on ${r.platform}`);
}

/** Checklist: shows OS-style consent before launching a handoff (spec § Security "Consent, every time"). */
export async function checkCompanionConsent(host: CompanionHost): Promise<CheckResult> {
  const id = "consent";
  const title = "Shows OS-style consent before launching a handoff";
  const { handoff } = fixtureHandoff(fx.companionAzp());
  const r = await tryInvoke(host, fx.companionAzp(), handoff.id, { assets: ["image"], params: { width: 100 } });
  return r.consented ? pass(id, title) : fail(id, title, "host launched a handoff without reporting consent");
}

/** Checklist: hands off **only** the declared input — no ambient data channel (spec § "Least input"). */
export async function checkCompanionLeastInput(host: CompanionHost): Promise<CheckResult> {
  const id = "least-input";
  const title = "Hands off only the declared `input` — nothing more";
  const azp = fx.companionAzp();
  const { handoff } = fixtureHandoff(azp);
  const r = await tryInvoke(host, azp, handoff.id, { assets: ["image"], params: { width: 100 } });
  if (!r.accepted) return fail(id, title, `host refused a valid return: ${r.reason ?? ""}`);
  // A host that reports no input at all can't be certified least-input — that would pass vacuously.
  if (!r.sentInput) return fail(id, title, "host did not report the input it handed off");
  const excess = ioExceeds(r.sentInput, handoff.input);
  return excess ? fail(id, title, excess) : pass(id, title);
}

/**
 * Checklist: validates the untrusted return against the declared `output` before ingesting — accepts a
 * conforming return and rejects one carrying an undeclared asset type (spec § "Untrusted return").
 */
export async function checkCompanionValidatesReturn(host: CompanionHost): Promise<CheckResult> {
  const id = "validate-return";
  const title = "Validates the return against declared `output`; rejects an undeclared asset type";
  const azp = fx.companionAzp();
  const { handoff } = fixtureHandoff(azp);
  // A conforming return: an `image` asset + the declared `width` param — must be accepted.
  const good = await tryInvoke(host, azp, handoff.id, { assets: ["image"], params: { width: 100 } });
  if (!good.accepted) return fail(id, title, `host rejected a conforming return: ${good.reason ?? ""}`);
  // A hostile return: a `video` asset the handoff's `output` never declared — must be rejected.
  const bad = await tryInvoke(host, azp, handoff.id, { assets: ["video"], params: { width: 100 } });
  return bad.accepted
    ? fail(id, title, "host ingested a return carrying an undeclared 'video' asset type")
    : pass(id, title);
}

/** Checklist: reports an apiVersion and refuses a companion whose `compat` it cannot satisfy. */
export async function checkCompanionCompat(host: CompanionHost): Promise<CheckResult> {
  const id = "compat-version";
  const title = "Reports an apiVersion and refuses an incompatible companion";
  if (!host.apiVersion) return fail(id, title, "host does not report an apiVersion");
  if (!satisfiesCompat(host.apiVersion, ">=0.1")) {
    return fail(id, title, `apiVersion ${host.apiVersion} does not satisfy >=0.1`);
  }
  const r = await tryLoad(host, fx.companionIncompatibleAzp());
  return r.accepted
    ? fail(id, title, "host accepted a companion whose compat it cannot satisfy")
    : pass(id, title, `apiVersion ${host.apiVersion}; refused an incompatible companion`);
}

/** Checklist: declares a `companion` conformance profile a registry can match on. */
export function checkCompanionProfileDeclaration(host: CompanionHost): CheckResult {
  const id = "profile-declaration";
  const title = "Declares a `companion` conformance profile";
  const profiles = host.profiles ?? [];
  return profiles.includes("companion")
    ? pass(id, title, `profiles: ${profiles.join(", ")}`)
    : fail(id, title, `host does not declare the 'companion' profile (profiles=${JSON.stringify(profiles)})`);
}
