import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import { runSkillConformance, satisfiesCompat, type SkillHost } from "../src/index";
import type { Manifest } from "@azphalt/azdk";

/**
 * A reference conforming skill host. It runs **no** code: verify → refuse non-`skill` → gate on compat
 * → surface the declared skills. Parsing `SKILL.md` and exposing it to the agent is the host's own
 * concern, beyond this static suite.
 */
const HOST_VERSION = "0.1";

const skillHost: SkillHost = {
  apiVersion: HOST_VERSION,
  profiles: ["skill"],
  load(azp) {
    if (!verifyAzp(azp).ok) return { accepted: false, reason: "verification failed" };
    const { manifest } = readAzp(azp) as { manifest: Manifest };
    if (manifest.kind !== "skill") return { accepted: false, reason: "not kind:skill — this host runs no code" };
    if (!satisfiesCompat(HOST_VERSION, manifest.compat)) return { accepted: false, reason: "incompatible compat" };
    const skills = manifest.skill?.skills?.map((s) => s.id) ?? [];
    return { accepted: true, skills };
  },
};

describe("@azphalt/conformance — skill host", () => {
  it("certifies a conforming skill host — every check passes", async () => {
    const report = await runSkillConformance(skillHost);
    const failed = report.checks.filter((c) => !c.ok);
    expect(failed, failed.map((c) => `${c.id}: ${c.detail}`).join("\n")).toEqual([]);
    expect(report.ok).toBe(true);
    expect(report.checks).toHaveLength(6);
  });

  it("has teeth — a host that accepts everything fails the verify/kind checks", async () => {
    const broken: SkillHost = {
      apiVersion: "0.1",
      profiles: ["skill"],
      load: () => ({ accepted: true, skills: ["x"] }),
    };
    const report = await runSkillConformance(broken);
    expect(report.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-tampered")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-non-skill")?.ok).toBe(false);
  });

  it("fails a host that does not surface the declared skill", async () => {
    const silent: SkillHost = { ...skillHost, load: (azp) => ({ accepted: verifyAzp(azp).ok, skills: [] }) };
    const report = await runSkillConformance(silent);
    expect(report.checks.find((c) => c.id === "surfaces-skill")?.ok).toBe(false);
  });

  it("fails a host that does not declare the skill profile", async () => {
    const report = await runSkillConformance({ ...skillHost, profiles: [] });
    expect(report.checks.find((c) => c.id === "profile-declaration")?.ok).toBe(false);
  });

  it("fails a host that does not report an apiVersion", async () => {
    const report = await runSkillConformance({ ...skillHost, apiVersion: undefined });
    expect(report.checks.find((c) => c.id === "compat-version")?.ok).toBe(false);
  });
});
