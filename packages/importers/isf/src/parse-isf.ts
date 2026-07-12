/**
 * Parser for ISF (Interactive Shader Format) and raw GLSL fragment shaders. An ISF file is GLSL
 * whose first element is a `/* … *\/` block comment holding a JSON header; its `INPUTS` are typed
 * controls. See the ISF spec (vidvox). We validate + describe — the original source is stored
 * verbatim in the package, so parsing is validation, not re-serialization.
 */

/** ISF input types (vidvox ISF spec). */
export type IsfInputType =
  | "event"
  | "bool"
  | "long"
  | "float"
  | "point2D"
  | "color"
  | "image"
  | "audio"
  | "audioFFT";

export interface IsfInput {
  /** Uniform name — required, no whitespace. */
  NAME: string;
  TYPE: IsfInputType;
  LABEL?: string;
  DEFAULT?: number | boolean | number[];
  MIN?: number | number[];
  MAX?: number | number[];
  IDENTITY?: number | number[];
  /** `long` only: the integer value for each menu entry. */
  VALUES?: number[];
  /** `long` only: the display label for each menu entry. */
  LABELS?: string[];
}

export interface IsfHeader {
  ISFVSN?: string;
  VSN?: string;
  DESCRIPTION?: string;
  CREDIT?: string;
  CATEGORIES?: string[];
  INPUTS?: IsfInput[];
  PASSES?: unknown[];
  IMPORTED?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ParsedIsf {
  /** True when a JSON ISF header was found; false for raw GLSL. */
  hasIsfHeader: boolean;
  header: IsfHeader;
  inputs: IsfInput[];
  /** GLSL after the header (the whole source for raw GLSL). */
  body: string;
  /** The source verbatim — exactly what gets stored in the package. */
  source: string;
}

const INPUT_TYPES: ReadonlySet<string> = new Set([
  "event",
  "bool",
  "long",
  "float",
  "point2D",
  "color",
  "image",
  "audio",
  "audioFFT",
]);

function validateInputs(x: unknown): IsfInput[] {
  if (x == null) return [];
  if (!Array.isArray(x)) throw new Error("isf: INPUTS must be an array");
  return x.map((raw, i) => {
    if (!raw || typeof raw !== "object") throw new Error(`isf: INPUTS[${i}] is not an object`);
    const inp = raw as IsfInput;
    if (typeof inp.NAME !== "string" || inp.NAME === "" || /\s/.test(inp.NAME)) {
      throw new Error(`isf: INPUTS[${i}].NAME must be a non-empty, whitespace-free string`);
    }
    if (typeof inp.TYPE !== "string" || !INPUT_TYPES.has(inp.TYPE)) {
      throw new Error(`isf: INPUTS[${i}] (${inp.NAME}) has unknown TYPE ${JSON.stringify(inp.TYPE)}`);
    }
    return inp;
  });
}

/**
 * Parse `source` into a {@link ParsedIsf}. If it opens with a `/* … *\/` comment whose contents are
 * a JSON object, that is the ISF header. A `{`-leading header that fails to parse throws; any other
 * leading comment (e.g. a license banner) is treated as plain GLSL.
 */
export function parseIsf(source: string): ParsedIsf {
  const text = source.replace(/^﻿/, ""); // strip a BOM if present
  const m = /^\s*\/\*([\s\S]*?)\*\//.exec(text);
  if (m) {
    const inner = m[1].trim();
    if (inner.startsWith("{")) {
      let header: IsfHeader;
      try {
        header = JSON.parse(inner) as IsfHeader;
      } catch (e) {
        throw new Error(`isf: malformed JSON header: ${(e as Error).message}`);
      }
      if (typeof header !== "object" || header === null || Array.isArray(header)) {
        throw new Error("isf: header JSON must be an object");
      }
      const inputs = validateInputs(header.INPUTS);
      const body = text.slice(m[0].length);
      return { hasIsfHeader: true, header, inputs, body, source };
    }
  }
  return { hasIsfHeader: false, header: {}, inputs: [], body: source, source };
}
