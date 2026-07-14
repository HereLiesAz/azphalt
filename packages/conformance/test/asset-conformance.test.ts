import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { runAssetConformance, validatePanel, satisfiesCompat, type AssetHost } from "../src/index";
import type { Panel } from "@azphalt/azdk";

/**
 * A reference conforming asset host — the worked example a real video host (e.g. Guillotine) mirrors.
 * It runs no code: verify → refuse kind:code → gate on compat → validate ui panels → apply supported
 * asset types. `HOST_VERSION` / `SUPPORTED` stand in for the host's own engine capabilities.
 */
const HOST_VERSION = "0.1";
const SUPPORTED = new Set(["lut", "shader", "transition", "brush", "pattern", "stamp"]);

const assetHost: AssetHost = {
  apiVersion: HOST_VERSION,
  load(azp) {
    if (!verifyAzp(azp).ok) return { accepted: false, reason: "verification failed" };
    const { manifest, payload } = readAzp(azp);
    if (manifest.kind === "code") return { accepted: false, reason: "kind:code — this host runs no code" };
    if (!satisfiesCompat(HOST_VERSION, manifest.compat)) return { accepted: false, reason: "incompatible compat" };
    const assets = manifest.assets ?? [];
    const applied: string[] = [];
    for (const a of assets) {
      if (a.ui) {
        const raw = payload[a.ui];
        if (!raw) return { accepted: false, reason: `ui panel missing: ${a.ui}` };
        if (validatePanel(JSON.parse(new TextDecoder().decode(raw)) as Panel).length) {
          return { accepted: false, reason: `invalid ui panel: ${a.ui}` };
        }
      }
      // Parse-and-skip: a type this host's engine doesn't handle is ignored, not a package
      // rejection (docs/ADOPTION_ASSET_HOST.md). Only report the types actually applied.
      if (SUPPORTED.has(a.type)) applied.push(a.type);
    }
    return { accepted: true, appliedTypes: applied };
  },
};

describe("@azphalt/conformance — asset host", () => {
  it("certifies a conforming asset host — every check passes", async () => {
    const report = await runAssetConformance(assetHost);
    const failed = report.checks.filter((c) => !c.ok);
    expect(failed, failed.map((c) => `${c.id}: ${c.detail}`).join("\n")).toEqual([]);
    expect(report.ok).toBe(true);
    expect(report.checks).toHaveLength(8);
  });

  it("has teeth — a host that accepts everything fails", async () => {
    const broken: AssetHost = { apiVersion: "0.1", load: () => ({ accepted: true, appliedTypes: ["lut"] }) };
    const report = await runAssetConformance(broken);
    expect(report.ok).toBe(false);
    // It accepts tampered / unsafe / kind:code / incompatible packages, so those checks fail.
    expect(report.checks.find((c) => c.id === "reject-kind-code")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-tampered")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "compat-version")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-bad-panel")?.ok).toBe(false);
  });

  it("fails a host that rejects a package for containing an unknown asset type", async () => {
    // A host that refuses the whole package on an unrecognized type (instead of skipping it).
    const rejectsUnknown: AssetHost = {
      apiVersion: "0.1",
      load(azp) {
        const base = assetHost.load(azp);
        // Re-derive: if any asset type is unsupported, refuse — the anti-pattern #39 warns against.
        if (!verifyAzp(azp).ok) return base;
        const { manifest } = readAzp(azp);
        if (manifest.kind === "code" || !satisfiesCompat("0.1", manifest.compat)) return base;
        for (const a of manifest.assets ?? []) {
          if (!SUPPORTED.has(a.type)) return { accepted: false, reason: `unsupported asset type: ${a.type}` };
        }
        return base;
      },
    };
    const report = await runAssetConformance(rejectsUnknown);
    expect(report.checks.find((c) => c.id === "unknown-type-skip")?.ok).toBe(false);
  });

  it("fails a host that does not report an apiVersion", async () => {
    const noVersion: AssetHost = { load: assetHost.load };
    const report = await runAssetConformance(noVersion);
    expect(report.checks.find((c) => c.id === "compat-version")?.ok).toBe(false);
  });
});
