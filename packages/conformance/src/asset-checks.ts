/**
 * Conformance checks for an **asset host** — an app that consumes `asset`-kind `.azp` (LUTs,
 * shaders, transitions, brushes) but runs no code (see `docs-old/ADOPTION_ASSET_HOST.md`). It needs
 * none of the code-host machinery, so this profile drives a much smaller {@link AssetHost} contract:
 * one `load` method that verifies, refuses `kind:"code"`, gates on `compat`, validates any ui panel,
 * and applies the supported asset types with the host's own engine.
 */
import { readAzp } from "@azphalt/azp";
import type { Panel } from "@azphalt/sdk";
import { validatePanel } from "./validate-panel.js";
import { pass, fail, type CheckResult } from "./checks.js";
import * as fx from "./fixtures.js";

/** What an asset host reports after attempting to load a package. */
export interface AssetHostReport {
  /** Whether the host accepted the package for use. */
  accepted: boolean;
  /** Why it was refused (when `accepted` is false). */
  reason?: string;
  /** The asset `type`s the host applied (when accepted). */
  appliedTypes?: string[];
}

/**
 * The minimum an asset host exposes for the suite to drive it: load a `.azp` (verify, refuse
 * `kind:"code"`, gate on `compat`, validate ui panels, apply supported asset types) — running **no**
 * code — and report the outcome, plus its host API version so `compat` can gate.
 */
export interface AssetHost {
  load(azp: Uint8Array): AssetHostReport | Promise<AssetHostReport>;
  /** The host API version, e.g. `"0.1"`. */
  apiVersion?: string;
}

async function load(host: AssetHost, azp: Uint8Array): Promise<AssetHostReport> {
  try {
    return await host.load(azp);
  } catch (e) {
    // A throw is a refusal too — capture it rather than letting the suite crash.
    return { accepted: false, reason: `threw: ${(e as Error).message}` };
  }
}

/** Checklist: refuses a package that fails integrity/signature verification. */
export async function checkAssetRejectTampered(host: AssetHost): Promise<CheckResult> {
  const id = "reject-tampered";
  const title = "Refuses a package whose payload fails its digest";
  const r = await load(host, fx.tamperedAzp());
  return r.accepted ? fail(id, title, "host accepted a tampered package") : pass(id, title);
}

/** Checklist: refuses an unsafe payload path. */
export async function checkAssetRejectUnsafePath(host: AssetHost): Promise<CheckResult> {
  const id = "reject-unsafe-path";
  const title = "Refuses a package with an unsafe payload path (`..`)";
  const r = await load(host, fx.unsafePathAzp());
  return r.accepted ? fail(id, title, "host accepted an unsafe-path package") : pass(id, title);
}

/** Checklist: runs no code — rejects `kind:"code"` packages entirely. */
export async function checkRejectKindCode(host: AssetHost): Promise<CheckResult> {
  const id = "reject-kind-code";
  const title = "Rejects a kind:\"code\" package (runs no code)";
  const r = await load(host, fx.codeKindAzp());
  return r.accepted ? fail(id, title, "host accepted a kind:code package") : pass(id, title);
}

/** Checklist: reads `manifest.assets` and applies each supported type with its own engine. */
export async function checkAcceptsAsset(host: AssetHost): Promise<CheckResult> {
  const id = "accepts-asset";
  const title = "Accepts a valid asset package and applies its asset types";
  const r = await load(host, fx.assetAzp());
  if (!r.accepted) return fail(id, title, `host refused a valid asset package: ${r.reason ?? ""}`);
  return r.appliedTypes?.includes("lut")
    ? pass(id, title)
    : fail(id, title, `host did not report applying the 'lut' asset (appliedTypes=${JSON.stringify(r.appliedTypes)})`);
}

/** Checklist: renders an asset's ui panel from the schema — the checkable part is schema validity. */
export function checkAssetUiSchema(): CheckResult {
  const id = "ui-schema";
  const title = "An asset's ui panel is valid per the UI schema";
  const { manifest, payload } = readAzp(fx.assetAzp());
  const uiPath = manifest.assets?.[0]?.ui;
  if (!uiPath) return fail(id, title, "fixture asset has no ui panel");
  const raw = payload[uiPath];
  if (!raw) return fail(id, title, `ui panel missing from package: ${uiPath}`);
  let panel: Panel;
  try {
    panel = JSON.parse(new TextDecoder().decode(raw)) as Panel;
  } catch (e) {
    return fail(id, title, `ui panel is not valid JSON: ${(e as Error).message}`);
  }
  const errors = validatePanel(panel);
  return errors.length ? fail(id, title, `panel invalid: ${errors.join("; ")}`) : pass(id, title);
}

/** Checklist: validates `compat` against the host's supported spec version. */
export async function checkAssetCompat(host: AssetHost): Promise<CheckResult> {
  const id = "compat-version";
  const title = "Reports an apiVersion and refuses an incompatible package";
  if (!host.apiVersion) return fail(id, title, "host does not report an apiVersion");
  const r = await load(host, fx.incompatibleAssetAzp());
  return r.accepted
    ? fail(id, title, "host accepted a package whose compat it cannot satisfy")
    : pass(id, title, `apiVersion ${host.apiVersion}; refused an incompatible package`);
}
