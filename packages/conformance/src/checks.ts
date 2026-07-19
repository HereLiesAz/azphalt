/**
 * The conformance checks. Each maps to a line of the `docs/ADOPTION.md` conformance checklist
 * and returns a {@link CheckResult}. Package-level checks (verify, unsafe paths) run against
 * `@azphalt/azp` directly; the rest drive a {@link CodeHost} — any host exposing the bytes-in
 * `runFilter` contract (`@azphalt/runtime-wasm` is the worked example).
 */
import { verifyAzp, readAzp, compatSatisfies } from "@azphalt/azp";
import type { Capability, Panel } from "@azphalt/azdk";
import { validatePanel, CONTROL_TYPES_0_1 } from "./validate-panel.js";
import * as fx from "./fixtures.js";

/** A bitmap crossing the host boundary (RGBA8, `data.length === width*height*4`). */
export interface ConformanceBitmap {
  data: number[];
  width: number;
  height: number;
}

export interface ConformanceWorld {
  params: Record<string, unknown>;
  bitmap: ConformanceBitmap;
  canvas?: { dpi?: number };
  targetLayerId?: string;
}

export interface ConformanceResult {
  bitmap: ConformanceBitmap;
  redraws: number;
}

/**
 * The minimum a code host must expose for the suite to drive it: run a filter from `.azp` bytes
 * against an in-memory world, and report the host API version so `compat` can gate. This is exactly
 * `@azphalt/runtime-wasm`'s `runFilter` shape, so that runtime satisfies it structurally.
 */
export interface CodeHost {
  runFilter(
    azp: Uint8Array,
    world: ConformanceWorld,
    opts?: { filterId?: string; capabilities?: Capability[] },
  ): Promise<ConformanceResult>;
  /** The host API version this host implements, e.g. `"0.1"` — so `compat` can gate. */
  apiVersion?: string;
}

export interface CheckResult {
  id: string;
  title: string;
  ok: boolean;
  detail: string;
}

export const pass = (id: string, title: string, detail = "ok"): CheckResult => ({ id, title, ok: true, detail });
export const fail = (id: string, title: string, detail: string): CheckResult => ({ id, title, ok: false, detail });

/**
 * Compat gate, re-exported under the conformance package's historical name. The implementation moved to
 * `@azphalt/azp` as `compatSatisfies`; this alias keeps the conformance surface (`companion-checks`,
 * `video-audio-checks`, the `index` re-export, and the test hosts) working after that rename.
 *
 * @deprecated Use `compatSatisfies` from `@azphalt/azp`. TODO: migrate the conformance consumers and the
 * `index` re-export to `compatSatisfies`, then drop this alias.
 */
export const satisfiesCompat = compatSatisfies;

/** Run a filter, returning either its result or the thrown error — checks assert on which. */
async function run(
  host: CodeHost,
  azp: Uint8Array,
  world: ConformanceWorld,
  opts?: { capabilities?: Capability[] },
): Promise<{ result?: ConformanceResult; error?: Error }> {
  try {
    return { result: await host.runFilter(azp, world, opts) };
  } catch (e) {
    return { error: e as Error };
  }
}

const world = (bitmap: ConformanceBitmap, params: Record<string, unknown> = {}): ConformanceWorld => ({
  params,
  bitmap,
});



/* ───────────────────────── package-level (host-agnostic) ───────────────────────── */

/** Checklist: "Rejects … any file failing its digest." */
export function checkRejectTampered(): CheckResult {
  const id = "reject-tampered";
  const title = "Refuses a package whose payload fails its digest";
  if (verifyAzp(fx.validFilterAzp()).ok !== true) return fail(id, title, "a valid package failed verification");
  return verifyAzp(fx.tamperedAzp()).ok === false
    ? pass(id, title)
    : fail(id, title, "a tampered package passed verification");
}

/** Checklist: "Rejects unsafe paths." */
export function checkRejectUnsafePath(): CheckResult {
  const id = "reject-unsafe-path";
  const title = "Refuses a package with an unsafe payload path (`..`)";
  return verifyAzp(fx.unsafePathAzp()).ok === false
    ? pass(id, title)
    : fail(id, title, "a package with a '..' path passed verification");
}

/* ───────────────────────── host-driven ───────────────────────── */

/** Checklist: "Grants exactly the declared capabilities; unlisted ones are unreachable." */
export async function checkCapabilityGating(host: CodeHost): Promise<CheckResult> {
  const id = "capability-gating";
  const title = "An ungranted capability is absent, not an erroring stub";
  // Filter touches bitmap; manifest grants only params. Reaching ctx.bitmap must fail.
  const { error } = await run(host, fx.ungrantedCapabilityAzp(), world({ data: [0, 0, 0, 0], width: 1, height: 1 }));
  return error
    ? pass(id, title, "filter failed reaching an ungranted capability")
    : fail(id, title, "filter reached bitmap though only params was granted");
}

/** Checklist: "Exposes no engine, camera, sensor, filesystem, or network path to extensions." */
export async function checkNeverList(host: CodeHost): Promise<CheckResult> {
  const id = "never-list";
  const title = "No ambient authority (process / require / fetch / sockets) in the sandbox";
  const { result, error } = await run(host, fx.neverListAzp(), world({ data: [0, 0, 0, 0], width: 1, height: 1 }));
  if (error) return fail(id, title, `probe reported ambient authority: ${error.message}`);
  return result?.bitmap.data[0] === 1
    ? pass(id, title)
    : fail(id, title, "probe filter did not complete cleanly");
}

/** Checklist: "Matches the RGBA8 straight-alpha buffer ABI." */
export async function checkAbiRoundTrip(host: CodeHost): Promise<CheckResult> {
  const id = "abi-roundtrip";
  const title = "RGBA8 straight-alpha buffer round-trips (read → mutate → write)";
  const input = { data: [10, 20, 30, 255, 200, 100, 50, 128], width: 2, height: 1 };
  const { result, error } = await run(host, fx.validFilterAzp(), world(input, { strength: 1 }));
  if (error) return fail(id, title, `filter threw: ${error.message}`);
  const expected = [245, 235, 225, 255, 55, 155, 205, 128];
  const got = result?.bitmap.data;
  return got && got.length === expected.length && expected.every((v, i) => v === got[i])
    ? pass(id, title)
    : fail(id, title, `expected ${JSON.stringify(expected)} got ${JSON.stringify(got)}`);
}

/** Checklist: "… and round-trips `params`." */
export async function checkParamsRoundTrip(host: CodeHost): Promise<CheckResult> {
  const id = "params-roundtrip";
  const title = "Control values round-trip to the extension through params";
  const { result, error } = await run(host, fx.paramsRoundTripAzp(), world({ data: [0, 0, 0, 0], width: 1, height: 1 }, { v: 123 }));
  if (error) return fail(id, title, `filter threw: ${error.message}`);
  return result?.bitmap.data[0] === 123
    ? pass(id, title)
    : fail(id, title, `param did not arrive: pixel0 = ${result?.bitmap.data[0]}`);
}

/** Checklist: "Renders every `0.1` control type natively." (Schema validity is the checkable part.) */
export function checkUiSchema(): CheckResult {
  const id = "ui-schema";
  const title = "The ui panel is valid and covers every 0.1 control type";
  const { payload } = readAzp(fx.uiPanelAzp());
  const raw = payload["ui/panel.json"];
  if (!raw) return fail(id, title, "ui/panel.json missing from package");
  let panel: Panel;
  try {
    panel = JSON.parse(new TextDecoder().decode(raw)) as Panel;
  } catch (e) {
    return fail(id, title, `ui panel is not valid JSON: ${(e as Error).message}`);
  }
  const errors = validatePanel(panel);
  if (errors.length) return fail(id, title, `panel invalid: ${errors.join("; ")}`);
  const present = new Set(collectTypes(panel));
  const missing = CONTROL_TYPES_0_1.filter((t) => !present.has(t));
  return missing.length ? fail(id, title, `panel omits control types: ${missing.join(", ")}`) : pass(id, title);
}

function collectTypes(panel: Panel): string[] {
  const out: string[] = [];
  const walk = (controls: Panel["controls"]) => {
    for (const c of controls) {
      out.push(c.type);
      if (c.type === "group") walk(c.controls);
    }
  };
  walk(panel.controls);
  return out;
}

/** Checklist: "Reports its host API version so `compat` can gate." */
export function checkCompatGating(host: CodeHost): CheckResult {
  const id = "compat-version";
  const title = "Host reports an API version that satisfies a package's compat";
  if (!host.apiVersion) return fail(id, title, "host does not report an apiVersion");
  return compatSatisfies(host.apiVersion, ">=0.1")
    ? pass(id, title, `apiVersion ${host.apiVersion} satisfies >=0.1`)
    : fail(id, title, `apiVersion ${host.apiVersion} does not satisfy >=0.1`);
}
