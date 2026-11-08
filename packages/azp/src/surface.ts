/**
 * Strict validation for `surface` assets (`spec/package-format.md` § Surface format).
 *
 * A surface is a ready-made 3D shape given as up to three profile curves and nothing else: no depth
 * image, no texture, no paint. It is untrusted input to every host that installs it, so the parser is
 * deliberately narrow: a closed key set, an exact version, bounded sizes and point counts, finite
 * numbers inside the unit box, and a nesting limit checked *before* the JSON parser runs (a hostile
 * file of `[[[[…` must not reach a recursive parser). Hosts implement the same rules; the limits are
 * normative and pinned by the table in the spec.
 */
import type { Manifest } from "@azphalt/azdk";
import { parseJsonNoDuplicateKeys } from "./parse-json.js";

/** The `format` value every surface payload carries. */
export const SURFACE_FORMAT = "azphalt.surface";
/** The only payload version this validator accepts. A new version is a new, separately specified format. */
export const SURFACE_VERSION = 1;
/** Largest payload, in bytes. A real surface is a few hundred bytes to a few KB. */
export const SURFACE_MAX_BYTES = 65_536;
/** Fewest and most points in one view (the most is the app's own profile-vertex cap). */
export const SURFACE_MIN_POINTS = 2;
export const SURFACE_MAX_POINTS = 256;
/** Longest surface name, in UTF-16 code units. */
export const SURFACE_MAX_NAME = 64;
/** A view must have at least this much length in the unit box, or it is a point, not a curve. */
export const SURFACE_MIN_VIEW_LENGTH = 0.01;
/** Deepest array/object nesting a payload may have: object > view array > point pair. */
export const SURFACE_MAX_DEPTH = 4;
/** Most surfaces one package may list (a pack, not a library). */
export const SURFACE_MAX_PER_PACK = 32;

const KEYS = new Set(["format", "version", "name", "front", "side", "top"]);

/** A point in a view, `[a, b]`, each in `[0, 1]`. Front is `(x, y)`, side `(z, y)`, top `(x, z)`. */
export type SurfacePoint = [number, number];

export interface Surface {
  format: typeof SURFACE_FORMAT;
  version: typeof SURFACE_VERSION;
  name: string;
  front: SurfacePoint[];
  side?: SurfacePoint[];
  top?: SurfacePoint[];
}

export type SurfaceParse = { ok: true; surface: Surface } | { ok: false; error: string };

/** Deepest bracket nesting in `text`, ignoring brackets inside strings. Linear, non-recursive. */
function nestingDepth(text: string): number {
  let depth = 0;
  let max = 0;
  let inString = false;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (inString) {
      if (c === 0x5c) i++; // backslash: skip the escaped character
      else if (c === 0x22) inString = false;
    } else if (c === 0x22) {
      inString = true;
    } else if (c === 0x5b || c === 0x7b) {
      if (++depth > max) max = depth;
      if (max > SURFACE_MAX_DEPTH) return max; // no need to scan further
    } else if (c === 0x5d || c === 0x7d) {
      depth--;
    }
  }
  return max;
}

function viewError(label: string, v: unknown): string | null {
  if (!Array.isArray(v)) return `${label} must be an array of [a, b] points`;
  if (v.length < SURFACE_MIN_POINTS) return `${label} needs at least ${SURFACE_MIN_POINTS} points`;
  if (v.length > SURFACE_MAX_POINTS) return `${label} has ${v.length} points (limit ${SURFACE_MAX_POINTS})`;
  let length = 0;
  for (let i = 0; i < v.length; i++) {
    const p: unknown = v[i];
    if (!Array.isArray(p) || p.length !== 2) return `${label}[${i}] must be a pair [a, b]`;
    for (const n of p as unknown[]) {
      if (typeof n !== "number" || !Number.isFinite(n)) return `${label}[${i}] has a non-finite number`;
      if (n < 0 || n > 1) return `${label}[${i}] is outside the unit box [0, 1]`;
    }
    if (i > 0) {
      const q = v[i - 1] as [number, number];
      length += Math.hypot((p as [number, number])[0] - q[0], (p as [number, number])[1] - q[1]);
    }
  }
  if (!(length >= SURFACE_MIN_VIEW_LENGTH)) return `${label} is too short to be a curve`;
  return null;
}

/** Validate and parse one surface payload (UTF-8 JSON bytes or text). Never throws. */
export function parseSurface(input: Uint8Array | string): SurfaceParse {
  const bad = (error: string): SurfaceParse => ({ ok: false, error });
  let text: string;
  if (typeof input === "string") {
    if (input.length > SURFACE_MAX_BYTES) return bad(`surface is larger than ${SURFACE_MAX_BYTES} bytes`);
    text = input;
    if (new TextEncoder().encode(text).length > SURFACE_MAX_BYTES) return bad(`surface is larger than ${SURFACE_MAX_BYTES} bytes`);
  } else {
    if (input.length > SURFACE_MAX_BYTES) return bad(`surface is larger than ${SURFACE_MAX_BYTES} bytes`);
    try {
      text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(input);
    } catch {
      return bad("surface is not valid UTF-8");
    }
  }
  if (nestingDepth(text) > SURFACE_MAX_DEPTH) return bad(`surface is nested deeper than ${SURFACE_MAX_DEPTH}`);

  let raw: unknown;
  try {
    raw = parseJsonNoDuplicateKeys(text);
  } catch (e) {
    return bad(`surface is not valid JSON: ${(e as Error).message}`);
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return bad("surface must be a JSON object");
  const o = raw as Record<string, unknown>;
  for (const k of Object.keys(o)) if (!KEYS.has(k)) return bad(`unknown key ${JSON.stringify(k)}`);
  if (o.format !== SURFACE_FORMAT) return bad(`format must be ${JSON.stringify(SURFACE_FORMAT)}`);
  if (o.version !== SURFACE_VERSION) return bad(`version must be ${SURFACE_VERSION}`);

  const name = o.name;
  if (typeof name !== "string" || name.trim().length === 0) return bad("name must be a non-empty string");
  if (name.length > SURFACE_MAX_NAME) return bad(`name is longer than ${SURFACE_MAX_NAME} characters`);
  if (/[\u0000-\u001f\u007f-\u009f]/.test(name)) return bad("name contains a control character");
  if (/[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/.test(name)) return bad("name is not well-formed Unicode");

  if (!("front" in o)) return bad("front is required");
  for (const view of ["front", "side", "top"] as const) {
    if (!(view in o)) continue;
    const err = viewError(view, o[view]);
    if (err) return bad(err);
  }
  const surface: Surface = {
    format: SURFACE_FORMAT,
    version: SURFACE_VERSION,
    name,
    front: o.front as SurfacePoint[],
  };
  if (o.side !== undefined) surface.side = o.side as SurfacePoint[];
  if (o.top !== undefined) surface.top = o.top as SurfacePoint[];
  return { ok: true, surface };
}

/**
 * Whether a view encloses area (and so carves a solid) rather than being an open curve. The same rule
 * Graffux's hull uses: at least three points and an area of at least 1e-5 of the squared perimeter,
 * the outline closed by joining its last point to its first.
 */
export function isClosedOutline(points: readonly SurfacePoint[]): boolean {
  const pts = points.slice();
  if (pts.length > 1) {
    const a = pts[0];
    const b = pts[pts.length - 1];
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-3) pts.pop();
  }
  if (pts.length < 3) return false;
  let area = 0;
  let perimeter = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % pts.length];
    area += p[0] * q[1] - q[0] * p[1];
    perimeter += Math.hypot(q[0] - p[0], q[1] - p[1]);
  }
  return perimeter > 0 && Math.abs(area) / 2 >= 1e-5 * perimeter * perimeter;
}

/**
 * Structural validation of every `surface` asset in an `asset` or `mixed` package: bundled (never
 * remote), a `.json` file, a valid payload, a unique `params.name` equal to the payload's own name.
 * Path safety and digests are `verifyAzp`'s core checks; this adds the payload rules. Never throws.
 */
export function validateSurfaceAssets(manifest: Manifest, payload: Record<string, Uint8Array>): string[] {
  const errors: string[] = [];
  const assets = Array.isArray(manifest.assets) ? manifest.assets : [];
  const seen = new Set<string>();
  let count = 0;
  assets.forEach((a, idx) => {
    if (!a || typeof a !== "object" || a.type !== "surface") return;
    const at = `assets[${idx}] (surface)`;
    if (++count > SURFACE_MAX_PER_PACK) {
      if (count === SURFACE_MAX_PER_PACK + 1) errors.push(`a package may list at most ${SURFACE_MAX_PER_PACK} surfaces`);
      return;
    }
    const rec = a as unknown as Record<string, unknown>;
    if (rec.remoteUrl !== undefined || rec.files !== undefined) {
      errors.push(`${at}: a surface must be bundled (no remoteUrl or files[])`);
      return;
    }
    if (typeof a.path !== "string" || !a.path.endsWith(".json")) {
      errors.push(`${at}: path must name a .json file`);
      return;
    }
    const bytes = Object.hasOwn(payload, a.path) ? payload[a.path] : undefined;
    if (!bytes) return; // the core checks already report a missing payload
    const parsed = parseSurface(bytes);
    if (!parsed.ok) {
      errors.push(`${at} ${a.path}: ${parsed.error}`);
      return;
    }
    const declared = (a.params as Record<string, unknown> | undefined)?.name;
    if (declared !== parsed.surface.name) {
      errors.push(`${at} ${a.path}: params.name must equal the surface's own name ${JSON.stringify(parsed.surface.name)}`);
    }
    if (seen.has(parsed.surface.name)) errors.push(`${at}: duplicate surface name ${JSON.stringify(parsed.surface.name)}`);
    seen.add(parsed.surface.name);
  });
  return errors;
}
