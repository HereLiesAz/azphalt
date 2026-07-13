import { describe, it, expect } from "vitest";
import { runFilter } from "@azphalt/runtime-wasm";
import { runConformance, validatePanel, fixtures } from "../src/index";
import type { CodeHost } from "../src/index";

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
        runFilter(azp, world, { ...opts, capabilities: ["bitmap", "params", "canvas"] }),
    };
    const report = await runConformance(brokenHost);
    expect(report.ok).toBe(false);
    expect(report.checks.find((c) => c.id === "capability-gating")?.ok).toBe(false);
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
