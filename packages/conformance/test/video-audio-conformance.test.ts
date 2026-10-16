import { describe, it, expect } from "vitest";
import { runFilter, runTransition } from "@azphalt/runtime-wasm";
import { runVideoAudioConformance, type VideoAudioHost } from "../src/index";
import { readAzp, writeAzp } from "@azphalt/azp";
import type { Capability } from "@azphalt/azdk";

/**
 * Emulate a host that ignores the manifest's declared capabilities: rewrite the package so it
 * *declares* every capability in [widen], then hand it to the real runtime. (`runtime-wasm` itself no
 * longer lets a caller grant beyond what a package declared, so a broken host has to be simulated by
 * lying about the declaration — which is exactly what "granting regardless" amounts to.)
 */
function widenDeclared(azp: Uint8Array, widen: Capability[]): Uint8Array {
  const { manifest, payload } = readAzp(azp);
  const { files: _files, ...rest } = manifest;
  const license = new TextDecoder().decode(payload["LICENSE"] ?? new Uint8Array());
  const { LICENSE: _l, "signature.json": _s, ...others } = payload;
  return writeAzp({ manifest: { ...rest, capabilities: widen }, payload: others, license }).azp;
}


/**
 * The reference conforming **temporal** host: `@azphalt/runtime-wasm` already exposes the
 * `runFilter` / `runTransition` bytes-in contract; the host adds its declared profile + support set.
 * This is the worked example a video host (e.g. Guillotine) mirrors.
 */
const temporalHost: VideoAudioHost = {
  runFilter,
  runTransition,
  apiVersion: "0.1",
  profiles: ["video-audio"],
  supports: { capabilities: ["time", "audio"], contributionKinds: ["filters", "transitions"] },
};

describe("@azphalt/conformance — video/audio host", () => {
  it("certifies a conforming temporal host — every check passes", async () => {
    const report = await runVideoAudioConformance(temporalHost);
    const failed = report.checks.filter((c) => !c.ok);
    expect(failed, failed.map((c) => `${c.id}: ${c.detail}`).join("\n")).toEqual([]);
    expect(report.ok).toBe(true);
    expect(report.profiles).toContain("video-audio");
    expect(report.checks).toHaveLength(8);
  });

  it("has teeth — a host that grants audio regardless fails the gating check", async () => {
    // A broken host that force-grants audio for every filter, ignoring the manifest's declared set.
    const broken: VideoAudioHost = {
      ...temporalHost,
      runFilter: (azp, world, opts) =>
        runFilter(widenDeclared(azp, ["audio", "params", "bitmap"]), world, opts),
    };
    const report = await runVideoAudioConformance(broken);
    expect(report.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "audio-capability-gating")?.ok).toBe(false);
  });

  it("fails a host that declares no profile / support / apiVersion", async () => {
    const bare: VideoAudioHost = { runFilter, runTransition };
    const report = await runVideoAudioConformance(bare);
    expect(report.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "profile-declaration")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "declares-temporal-support")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "compat-version")?.ok).toBe(false);
    expect(report.profiles).toEqual([]);
  });
});
