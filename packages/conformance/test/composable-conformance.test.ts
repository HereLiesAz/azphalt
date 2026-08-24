import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { runComposableConformance, satisfiesCompat, type ComposableHost } from "../src/index";
import type { Manifest } from "@azphalt/azdk";

/**
 * A reference conforming composable host. It runs **no** code: verify → refuse non-`composable` →
 * gate on compat → surface the declared elements. Resolving each `templateId` against the host's own
 * build-linked template library and rendering it is the host's own concern, beyond this static suite.
 */
const HOST_VERSION = "0.1";

const composableHost: ComposableHost = {
  apiVersion: HOST_VERSION,
  profiles: ["composable"],
  load(azp) {
    if (!verifyAzp(azp).ok) return { accepted: false, reason: "verification failed" };
    const { manifest } = readAzp(azp) as { manifest: Manifest };
    if (manifest.kind !== "composable") {
      return { accepted: false, reason: "not kind:composable — this host runs no code" };
    }
    if (!satisfiesCompat(HOST_VERSION, manifest.compat)) return { accepted: false, reason: "incompatible compat" };
    const elements = manifest.composable?.elements?.map((e) => e.id) ?? [];
    return { accepted: true, elements };
  },
};

describe("@azphalt/conformance — composable host", () => {
  it("certifies a conforming composable host — every check passes", async () => {
    const report = await runComposableConformance(composableHost);
    const failed = report.checks.filter((c) => !c.ok);
    expect(failed, failed.map((c) => `${c.id}: ${c.detail}`).join("\n")).toEqual([]);
    expect(report.ok).toBe(true);
    expect(report.checks).toHaveLength(6);
  });

  it("has teeth — a host that accepts everything fails the verify/kind checks", async () => {
    const broken: ComposableHost = {
      apiVersion: "0.1",
      profiles: ["composable"],
      load: () => ({ accepted: true, elements: ["x"] }),
    };
    const report = await runComposableConformance(broken);
    expect(report.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-tampered")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-non-composable")?.ok).toBe(false);
  });

  it("fails a host that does not surface the declared element", async () => {
    const silent: ComposableHost = { ...composableHost, load: (azp) => ({ accepted: verifyAzp(azp).ok, elements: [] }) };
    const report = await runComposableConformance(silent);
    expect(report.checks.find((c) => c.id === "surfaces-element")?.ok).toBe(false);
  });

  it("fails a host that does not declare the composable profile", async () => {
    const report = await runComposableConformance({ ...composableHost, profiles: [] });
    expect(report.checks.find((c) => c.id === "profile-declaration")?.ok).toBe(false);
  });

  it("fails a host that does not report an apiVersion", async () => {
    const report = await runComposableConformance({ ...composableHost, apiVersion: undefined });
    expect(report.checks.find((c) => c.id === "compat-version")?.ok).toBe(false);
  });
});
