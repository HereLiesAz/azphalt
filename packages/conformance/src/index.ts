/**
 * `@azphalt/conformance` — a runnable conformance suite for azphalt hosts. It turns the checklist in
 * `docs-old/ADOPTION.md` and the normative specs into an executable battery: give it a {@link CodeHost}
 * (any host exposing the bytes-in `runFilter` contract — `@azphalt/runtime-reference`'s sandboxed
 * sibling `@azphalt/runtime-wasm` is the worked example) and it certifies each conformance line.
 *
 * ~~~ts
 * import { runConformance } from "@azphalt/conformance";
 * import { runFilter } from "@azphalt/runtime-wasm";
 *
 * const report = await runConformance({ runFilter, apiVersion: "0.1" });
 * report.ok; // true ⇒ conforming
 * ~~~
 */
import {
  checkRejectTampered,
  checkRejectUnsafePath,
  checkCapabilityGating,
  checkNeverList,
  checkAbiRoundTrip,
  checkParamsRoundTrip,
  checkUiSchema,
  checkCompatGating,
  type CheckResult,
  type CodeHost,
} from "./checks.js";
import {
  checkAssetRejectTampered,
  checkAssetRejectUnsafePath,
  checkRejectKindCode,
  checkAcceptsAsset,
  checkAssetUiSchema,
  checkAssetCompat,
  checkAssetRejectBadPanel,
  type AssetHost,
} from "./asset-checks.js";

export interface ConformanceReport {
  /** True iff every check passed. */
  ok: boolean;
  checks: CheckResult[];
}

/** Run the full **code-host** conformance battery against `host`. Package-level checks need no host. */
export async function runConformance(host: CodeHost): Promise<ConformanceReport> {
  const checks: CheckResult[] = [
    checkRejectTampered(),
    checkRejectUnsafePath(),
    await checkCapabilityGating(host),
    await checkNeverList(host),
    await checkAbiRoundTrip(host),
    await checkParamsRoundTrip(host),
    checkUiSchema(),
    checkCompatGating(host),
  ];
  return { ok: checks.every((c) => c.ok), checks };
}

/**
 * Run the **asset-host** conformance battery against `host` — the lighter profile for an app that
 * consumes `asset` `.azp` but runs no code (`docs-old/ADOPTION_ASSET_HOST.md`).
 */
export async function runAssetConformance(host: AssetHost): Promise<ConformanceReport> {
  const checks: CheckResult[] = [
    await checkAssetRejectTampered(host),
    await checkAssetRejectUnsafePath(host),
    await checkRejectKindCode(host),
    await checkAcceptsAsset(host),
    checkAssetUiSchema(),
    await checkAssetCompat(host),
    await checkAssetRejectBadPanel(host),
  ];
  return { ok: checks.every((c) => c.ok), checks };
}

export { validatePanel, CONTROL_TYPES_0_1 } from "./validate-panel.js";
export { satisfiesCompat } from "./checks.js";
export * as fixtures from "./fixtures.js";
export type {
  CodeHost,
  CheckResult,
  ConformanceBitmap,
  ConformanceWorld,
  ConformanceResult,
} from "./checks.js";
export type { AssetHost, AssetHostReport } from "./asset-checks.js";
