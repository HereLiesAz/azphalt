import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { runCompanionConformance, satisfiesCompat, type CompanionHost } from "../src/index";
import type { HandoffIO, Manifest } from "@azphalt/azdk";

/**
 * A reference conforming companion-app host — the worked example a real store-providing app (GraffitiXR,
 * Guillotine) mirrors. It runs **no** code: verify → refuse non-`app` → gate on compat → surface the
 * handoff on a platform it supports → consent → send only the declared input → validate the return
 * against the declared `output`. `HOST_VERSION` / `PLATFORMS` stand in for the host's own OS surface.
 */
const HOST_VERSION = "0.1";
const PLATFORMS = ["android"] as const;

/** Validate a returned IO against the handoff's declared `output`: no undeclared asset types or params. */
function returnConformsTo(ret: { assets?: string[]; params?: Record<string, unknown> }, output?: HandoffIO): boolean {
  const okAssets = new Set(output?.assets ?? []);
  const okParams = new Set(Object.keys(output?.params ?? {}));
  for (const a of ret.assets ?? []) if (!okAssets.has(a)) return false;
  for (const p of Object.keys(ret.params ?? {})) if (!okParams.has(p)) return false;
  return true;
}

const companionHost: CompanionHost = {
  apiVersion: HOST_VERSION,
  profiles: ["companion"],
  platforms: [...PLATFORMS],
  load(azp) {
    if (!verifyAzp(azp).ok) return { accepted: false, reason: "verification failed" };
    const { manifest } = readAzp(azp) as { manifest: Manifest };
    if (manifest.kind !== "app") return { accepted: false, reason: "not kind:app — this host runs no code" };
    if (!satisfiesCompat(HOST_VERSION, manifest.compat)) return { accepted: false, reason: "incompatible compat" };
    const app = manifest.app;
    if (!app) return { accepted: false, reason: "no app block" };
    // Match the platform this host runs on.
    const platform = PLATFORMS.find((p) => app.platforms[p]);
    if (!platform) return { accepted: false, reason: "no transport for a supported platform" };
    // Surface handoffs that declare a transport for the matched platform.
    const offered = app.handoffs.filter((h) => h.transport[platform]).map((h) => h.id);
    return { accepted: true, offered, platform };
  },
  invoke(azp, handoffId, ret) {
    const { manifest } = readAzp(azp) as { manifest: Manifest };
    const handoff = manifest.app?.handoffs.find((h) => h.id === handoffId);
    if (!handoff) return { consented: false, accepted: false, reason: `no such handoff: ${handoffId}` };
    // Consent, every time — the host prompts before anything leaves it.
    const consented = true;
    // Least input: hand off exactly the handoff's declared `input`, nothing ambient.
    const sentInput: HandoffIO = { ...(handoff.input ?? {}) };
    // Untrusted return: validate against the declared `output` before ingesting.
    const accepted = returnConformsTo(ret, handoff.output);
    return { consented, platform: "android", sentInput, accepted, reason: accepted ? undefined : "return violates output" };
  },
};

describe("@azphalt/conformance — companion-app host", () => {
  it("certifies a conforming companion host — every check passes", async () => {
    const report = await runCompanionConformance(companionHost);
    const failed = report.checks.filter((c) => !c.ok);
    expect(failed, failed.map((c) => `${c.id}: ${c.detail}`).join("\n")).toEqual([]);
    expect(report.ok).toBe(true);
    expect(report.checks).toHaveLength(9);
  });

  it("has teeth — a host that accepts everything and skips consent fails", async () => {
    const broken: CompanionHost = {
      apiVersion: "0.1",
      profiles: ["companion"],
      platforms: ["android"],
      load: () => ({ accepted: true, offered: ["edit"], platform: "android" }),
      // No consent, and it ingests any return unchecked.
      invoke: () => ({ consented: false, accepted: true }),
    };
    const report = await runCompanionConformance(broken);
    expect(report.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-tampered")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-non-app")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "consent")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "validate-return")?.ok).toBe(false);
  });

  it("fails a host that leaks input beyond the declared handoff `input`", async () => {
    const leaky: CompanionHost = {
      ...companionHost,
      invoke(azp, handoffId, ret) {
        const base = companionHost.invoke(azp, handoffId, ret) as ReturnType<CompanionHost["invoke"]> & object;
        const r = base as { sentInput?: HandoffIO } & typeof base;
        // Smuggle an undeclared param into the handoff — the ambient-data anti-pattern.
        return { ...r, sentInput: { ...(r.sentInput ?? {}), params: { deviceId: "ABC-123" } } };
      },
    };
    const report = await runCompanionConformance(leaky);
    expect(report.checks.find((c) => c.id === "least-input")?.ok).toBe(false);
  });

  it("fails a host that ingests a return carrying an undeclared asset type", async () => {
    const trusting: CompanionHost = {
      ...companionHost,
      invoke(azp, handoffId, ret) {
        const base = companionHost.invoke(azp, handoffId, ret);
        // Accept whatever the companion returns, unchecked.
        return { ...base, accepted: true, reason: undefined };
      },
    };
    const report = await runCompanionConformance(trusting);
    expect(report.checks.find((c) => c.id === "validate-return")?.ok).toBe(false);
  });

  it("fails a host that does not declare the companion profile", async () => {
    const noProfile: CompanionHost = { ...companionHost, profiles: [] };
    const report = await runCompanionConformance(noProfile);
    expect(report.checks.find((c) => c.id === "profile-declaration")?.ok).toBe(false);
  });

  it("fails a host that does not report an apiVersion", async () => {
    const noVersion: CompanionHost = { ...companionHost, apiVersion: undefined };
    const report = await runCompanionConformance(noVersion);
    expect(report.checks.find((c) => c.id === "compat-version")?.ok).toBe(false);
  });
});
