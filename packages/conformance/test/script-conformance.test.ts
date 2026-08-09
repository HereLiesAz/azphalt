import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { runScriptConformance, satisfiesCompat, type ScriptHost } from "../src/index";
import type { Manifest } from "@azphalt/azdk";

/**
 * A reference conforming script host. It runs **no** code: verify → refuse non-`script` → gate on
 * compat → surface the declared command. Resolving dependencies and invoking the script (with real
 * OS/package-manager access, outside the azphalt sandbox) is the host's own concern, beyond this
 * static suite.
 */
const HOST_VERSION = "0.1";

const scriptHost: ScriptHost = {
  apiVersion: HOST_VERSION,
  profiles: ["script"],
  load(azp) {
    if (!verifyAzp(azp).ok) return { accepted: false, reason: "verification failed" };
    const { manifest } = readAzp(azp) as { manifest: Manifest };
    if (manifest.kind !== "script") return { accepted: false, reason: "not kind:script — this host runs no code" };
    if (!satisfiesCompat(HOST_VERSION, manifest.compat)) return { accepted: false, reason: "incompatible compat" };
    const command = manifest.script?.command ?? manifest.script?.entry;
    return { accepted: true, command };
  },
};

describe("@azphalt/conformance — script host", () => {
  it("certifies a conforming script host — every check passes", async () => {
    const report = await runScriptConformance(scriptHost);
    const failed = report.checks.filter((c) => !c.ok);
    expect(failed, failed.map((c) => `${c.id}: ${c.detail}`).join("\n")).toEqual([]);
    expect(report.ok).toBe(true);
    expect(report.checks).toHaveLength(6);
  });

  it("has teeth — a host that accepts everything fails the verify/kind checks", async () => {
    const broken: ScriptHost = {
      apiVersion: "0.1",
      profiles: ["script"],
      load: () => ({ accepted: true, command: "x" }),
    };
    const report = await runScriptConformance(broken);
    expect(report.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-tampered")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-non-script")?.ok).toBe(false);
  });

  it("fails a host that does not surface the declared command", async () => {
    const silent: ScriptHost = { ...scriptHost, load: (azp) => ({ accepted: verifyAzp(azp).ok, command: undefined }) };
    const report = await runScriptConformance(silent);
    expect(report.checks.find((c) => c.id === "surfaces-command")?.ok).toBe(false);
  });

  it("fails a host that does not declare the script profile", async () => {
    const report = await runScriptConformance({ ...scriptHost, profiles: [] });
    expect(report.checks.find((c) => c.id === "profile-declaration")?.ok).toBe(false);
  });

  it("fails a host that does not report an apiVersion", async () => {
    const report = await runScriptConformance({ ...scriptHost, apiVersion: undefined });
    expect(report.checks.find((c) => c.id === "compat-version")?.ok).toBe(false);
  });
});
