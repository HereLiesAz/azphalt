import { describe, it, expect } from "vitest";
import { runFilter } from "@azphalt/runtime-wasm";
import { runConformance, validatePanel, fixtures } from "../src/index";
import type { CodeHost } from "../src/index";
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


/** The reference conformant host: `@azphalt/runtime-wasm` already exposes the `runFilter` contract. */
const wasmHost: CodeHost = { runFilter, apiVersion: "0.1" };

describe("@azphalt/conformance", () => {
  it("certifies @azphalt/runtime-wasm — every check passes", async () => {
    const report = await runConformance(wasmHost);
    const failed = report.checks.filter((c) => !c.ok);
    expect(failed, failed.map((c) => `${c.id}: ${c.detail}`).join("\n")).toEqual([]);
    expect(report.ok).toBe(true);
    // Sanity: all eight checklist items ran.
    expect(report.checks).toHaveLength(8);
  });

  it("has teeth — a host that ignores capabilities fails the suite", async () => {
    // A broken host that grants ALL capabilities regardless of the manifest. The capability-gating
    // check must catch it (the filter reaches bitmap though only params was declared).
    const brokenHost: CodeHost = {
      apiVersion: "0.1",
      runFilter: (azp, world, opts) =>
        runFilter(widenDeclared(azp, ["bitmap", "params", "canvas"]), world, opts),
    };
    const report = await runConformance(brokenHost);
    expect(report.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "capability-gating")?.ok).toBe(false);
  });

  it("has teeth — a host that verifies nothing fails the reject checks", async () => {
    // Runs whatever it is handed (it would run the tampered / '..'-carrying package too).
    const credulous: CodeHost = {
      apiVersion: "0.1",
      runFilter: async (_azp, w) => ({ bitmap: w.bitmap, redraws: 0 }),
    };
    const report = await runConformance(credulous);
    expect(report.checks.find((c) => c.id === "reject-tampered")?.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "reject-unsafe-path")?.ok).toBe(false);
  });

  it("has teeth — a host that refuses everything cannot pass by erroring", async () => {
    const refuseAll: CodeHost = {
      apiVersion: "0.1",
      runFilter: async () => {
        throw new Error("nope");
      },
    };
    const report = await runConformance(refuseAll);
    // Its refusals prove nothing: the control package fails too, so these are failures, not passes.
    for (const id of ["reject-tampered", "reject-unsafe-path", "capability-gating"]) {
      expect(report.checks.find((c) => c.id === id)?.ok, id).toBe(false);
    }
  });

  it("fails a host that does not report an apiVersion", async () => {
    const report = await runConformance({ runFilter });
    expect(report.checks.find((c) => c.id === "compat-version")?.ok).toBe(false);
  });

  it("validatePanel accepts the every-control fixture and rejects a malformed one", () => {
    expect(validatePanel(fixtures.everyControlPanel())).toEqual([]);
    const bad = { controls: [{ type: "color", key: "k", label: "L", default: "not-a-hex" }] };
    // @ts-expect-error deliberately malformed control for the negative case
    expect(validatePanel(bad).length).toBeGreaterThan(0);
  });
});
