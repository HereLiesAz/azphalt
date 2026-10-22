/**
 * Structural validation for a `kind: "font"` manifest — a compiled font family (see `spec/font.md`).
 * Returns human-readable errors ([] when valid). {@link verifyAzp} calls this **only** for `kind:"font"`
 * packages, folding the errors into its report; other kinds are unaffected.
 *
 * Rules: a `font` block with a family and ≥1 face. Every face's `path` is under `fonts/`, listed in
 * `manifest.files` (integrity-covered), unique, and ends in its declared `format`. A variable face lists
 * its axes (four-character tags, `min <= default <= max`, unique); a static face lists none. A font
 * package is data: no `entry`/`runtime`, `capabilities`, `assets`, `app`, `mcp`, `pack`, `skill`,
 * `script` or `composable` block. Given the payload, each face's bytes must carry the signature of its
 * declared format, and — for `ttf`/`otf` — the font's own `fvar` table must agree with the declared
 * axes, so a store card cannot advertise axes the file does not have. WOFF2 is Brotli-compressed and is
 * checked by signature only. No `fonts/` file may go undeclared.
 */
import type { FontAxis, FontFaceEntry, FontFormat, Manifest } from "@azphalt/azdk";
import { readSfntInfo } from "./sfnt.js";

const FORMATS: readonly FontFormat[] = ["ttf", "otf", "woff2"];
const TAG_RE = /^[\x20-\x7e]{4}$/;
const SCRIPT_RE = /^[A-Z][a-z]{3}$/;
const LANG_RE = /^[A-Za-z]{2,3}(-[A-Za-z0-9]{2,8})*$/;
const MAX_FACES = 64;
const MAX_AXES = 64;
const MAX_FONT_BYTES = 32 * 1024 * 1024;
const MAX_SAMPLE = 200;

const startsWith = (b: Uint8Array, sig: number[]) => b.length >= sig.length && sig.every((v, i) => b[i] === v);

/** Whether `bytes` carry the file signature of `format` (the container only, not a full parse). */
export function fontSignatureMatches(bytes: Uint8Array, format: FontFormat): boolean {
  if (format === "woff2") return startsWith(bytes, [0x77, 0x4f, 0x46, 0x32]); // wOF2
  // `.ttf` and `.otf` are both SFNT containers; the extension doesn't promise the outline flavour.
  return (
    startsWith(bytes, [0x00, 0x01, 0x00, 0x00]) || // TrueType
    startsWith(bytes, [0x74, 0x72, 0x75, 0x65]) || // 'true'
    startsWith(bytes, [0x4f, 0x54, 0x54, 0x4f]) // 'OTTO'
  );
}

const close = (a: number, b: number) => Math.abs(a - b) < 0.01;

function validateAxes(where: string, axes: FontAxis[], errors: string[]): void {
  if (axes.length > MAX_AXES) errors.push(`font: ${where} declares more than ${MAX_AXES} axes`);
  const seen = new Set<string>();
  axes.forEach((a, i) => {
    const at = `${where}.axes[${i}]`;
    if (!a || typeof a.tag !== "string" || !TAG_RE.test(a.tag)) {
      errors.push(`font: ${at} needs a four-character tag`);
      return;
    }
    if (seen.has(a.tag)) errors.push(`font: ${where} has a duplicate axis "${a.tag}"`);
    seen.add(a.tag);
    for (const k of ["min", "default", "max"] as const) {
      if (typeof a[k] !== "number" || !Number.isFinite(a[k])) errors.push(`font: ${at}.${k} must be a finite number`);
    }
    if (typeof a.min === "number" && typeof a.default === "number" && typeof a.max === "number" && !(a.min <= a.default && a.default <= a.max)) {
      errors.push(`font: ${at} must satisfy min <= default <= max`);
    }
  });
}

export function validateFontManifest(manifest: Manifest, payload?: Record<string, Uint8Array>): string[] {
  const errors: string[] = [];
  const font = manifest.font;
  if (!font) {
    errors.push('font: kind "font" requires a "font" block');
    return errors;
  }

  // Data only — a text engine reads a font; nothing here runs.
  if (manifest.entry || manifest.runtime) errors.push("font: a font package must not declare entry/runtime");
  if (manifest.capabilities && manifest.capabilities.length > 0) errors.push("font: a font package must not declare capabilities");
  if (manifest.assets && manifest.assets.length > 0) errors.push("font: a font package must not declare assets (its files are font.faces)");
  for (const other of ["app", "mcp", "pack", "skill", "script", "composable"] as const) {
    if (manifest[other]) errors.push(`font: a font package must not declare a ${other} block`);
  }

  if (typeof font.family !== "string" || font.family.trim().length === 0) errors.push("font: family is required");
  else if (font.family.length > 128) errors.push("font: family is longer than 128 characters");
  if (font.designer !== undefined && typeof font.designer !== "string") errors.push("font: designer must be a string");
  if (font.sampleText !== undefined && (typeof font.sampleText !== "string" || font.sampleText.length > MAX_SAMPLE)) {
    errors.push(`font: sampleText must be a string of at most ${MAX_SAMPLE} characters`);
  }
  if (font.scripts !== undefined) {
    if (!Array.isArray(font.scripts) || font.scripts.some((s) => typeof s !== "string" || !SCRIPT_RE.test(s))) {
      errors.push('font: scripts must be ISO 15924 codes such as "Latn"');
    }
  }
  if (font.languages !== undefined) {
    if (!Array.isArray(font.languages) || font.languages.some((l) => typeof l !== "string" || !LANG_RE.test(l))) {
      errors.push("font: languages must be BCP 47 tags");
    }
  }

  if (!Array.isArray(font.faces) || font.faces.length === 0) {
    errors.push("font: at least one face is required");
    return errors;
  }
  if (font.faces.length > MAX_FACES) errors.push(`font: more than ${MAX_FACES} faces`);

  const files = manifest.files ?? {};
  const seen = new Set<string>();
  font.faces.forEach((face: FontFaceEntry, i) => {
    const where = `faces[${i}]`;
    if (!face || typeof face.path !== "string" || face.path.length === 0) {
      errors.push(`font: ${where} needs a path`);
      return;
    }
    if (!face.path.startsWith("fonts/") || face.path.length === "fonts/".length) errors.push(`font: ${where}.path "${face.path}" must be under fonts/`);
    if (seen.has(face.path)) errors.push(`font: duplicate face path "${face.path}"`);
    seen.add(face.path);
    if (!Object.hasOwn(files, face.path)) errors.push(`font: "${face.path}" is not in manifest.files`);

    if (!FORMATS.includes(face.format)) {
      errors.push(`font: ${where}.format must be one of ${FORMATS.join(", ")}`);
    } else if (!face.path.toLowerCase().endsWith("." + face.format)) {
      errors.push(`font: ${where}.path "${face.path}" does not end in its format ".${face.format}"`);
    }
    if (face.weight !== undefined && (!Number.isInteger(face.weight) || face.weight < 1 || face.weight > 1000)) {
      errors.push(`font: ${where}.weight must be an integer from 1 to 1000`);
    }

    const axes = face.axes ?? [];
    if (face.variable === true) {
      if (axes.length === 0) errors.push(`font: ${where} is variable but lists no axes`);
    } else if (axes.length > 0) {
      errors.push(`font: ${where} lists axes but is not marked variable`);
    }
    validateAxes(where, axes, errors);

    // The bytes: signature, size, and agreement with what the card will say.
    const data = payload && Object.hasOwn(payload, face.path) ? payload[face.path] : undefined;
    if (!data || !FORMATS.includes(face.format)) return;
    if (data.length > MAX_FONT_BYTES) errors.push(`font: "${face.path}" is larger than ${MAX_FONT_BYTES} bytes`);
    if (!fontSignatureMatches(data, face.format)) {
      errors.push(`font: "${face.path}" is not a ${face.format} font file`);
      return;
    }
    if (face.format === "woff2") return;
    const info = readSfntInfo(data);
    if (!info) {
      errors.push(`font: "${face.path}" is not a readable font`);
      return;
    }
    if ((face.variable === true) !== info.variable) {
      errors.push(`font: ${where} is declared ${face.variable === true ? "variable" : "static"} but the file is ${info.variable ? "variable" : "static"}`);
      return;
    }
    if (info.variable) {
      const declared = new Map(axes.map((a) => [a.tag, a]));
      for (const a of info.axes) {
        const d = declared.get(a.tag);
        if (!d) errors.push(`font: ${where} is missing axis "${a.tag}" that the font file has`);
        else if (!close(d.min, a.min) || !close(d.default, a.default) || !close(d.max, a.max)) {
          errors.push(`font: ${where} axis "${a.tag}" does not match the font file (${a.min}..${a.default}..${a.max})`);
        }
      }
      for (const tag of declared.keys()) {
        if (!info.axes.some((a) => a.tag === tag)) errors.push(`font: ${where} declares axis "${tag}" that the font file does not have`);
      }
    }
  });

  // Nothing under fonts/ may ride along undeclared: the card describes exactly what an install writes.
  for (const path of Object.keys(files)) {
    if (path.startsWith("fonts/") && !seen.has(path)) errors.push(`font: "${path}" is not declared by any face`);
  }

  return errors;
}
