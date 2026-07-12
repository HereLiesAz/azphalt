import { writeAzp } from "@azphalt/azp";
import type { Control, Manifest, NumberControl, Panel, SelectOption } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  version: string;
  author: string;
}

interface IsfInput {
  NAME: string;
  TYPE: string;
  DEFAULT?: unknown;
  MIN?: unknown;
  MAX?: unknown;
  LABEL?: string;
  VALUES?: number[];
  LABELS?: string[];
}

interface IsfHeader {
  ISFVSN?: string;
  CREDIT?: string;
  DESCRIPTION?: string;
  CATEGORIES?: string[];
  INPUTS?: IsfInput[];
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

/** Inputs the host binds itself (the clip image, audio) — excluded from the user control panel. */
const HOST_BOUND: ReadonlySet<string> = new Set(["image", "audio", "audioFFT"]);

/** ISF `color` is a vec4 of floats 0–1; azphalt color defaults are `#RRGGBB`. */
function vec4ToHex(v: number[]): string {
  const ch = (x: number) => Math.max(0, Math.min(255, Math.round((x ?? 0) * 255)));
  const hx = (n: number) => ch(n).toString(16).padStart(2, "0");
  return `#${hx(v[0])}${hx(v[1])}${hx(v[2])}`;
}

/** Map one ISF input to an azphalt control, or `null` when it is host-bound. */
function inputToControl(input: IsfInput): Control | null {
  const key = input.NAME;
  const label = input.LABEL || input.NAME;

  switch (input.TYPE) {
    case "float": {
      const def = typeof input.DEFAULT === "number" ? input.DEFAULT : 0;
      const min = typeof input.MIN === "number" ? input.MIN : undefined;
      const max = typeof input.MAX === "number" ? input.MAX : undefined;
      if (min !== undefined && max !== undefined) return { type: "slider", key, label, min, max, default: def };
      const num: NumberControl = { type: "number", key, label, default: def };
      if (min !== undefined) num.min = min;
      if (max !== undefined) num.max = max;
      return num;
    }
    case "bool":
      return { type: "toggle", key, label, default: input.DEFAULT === true };
    case "long": {
      const values = Array.isArray(input.VALUES) ? input.VALUES : [];
      const labels = Array.isArray(input.LABELS) ? input.LABELS : [];
      const options: SelectOption[] = values.map((v, i) => ({ value: String(v), label: labels[i] ?? String(v) }));
      const def = input.DEFAULT != null ? String(input.DEFAULT) : options[0]?.value ?? "0";
      return { type: "select", key, label, options, default: def };
    }
    case "color": {
      const arr = Array.isArray(input.DEFAULT) ? (input.DEFAULT as number[]) : undefined;
      return {
        type: "color",
        key,
        label,
        default: arr && arr.length >= 3 ? vec4ToHex(arr) : "#000000",
        alpha: !!arr && arr.length === 4,
      };
    }
    case "event":
      return { type: "button", key, label, action: input.NAME };
    case "point2D": {
      const d = Array.isArray(input.DEFAULT) ? (input.DEFAULT as number[]) : [0, 0];
      return {
        type: "group",
        key,
        label,
        controls: [
          { type: "number", key: `${key}.x`, label: `${label} X`, default: d[0] ?? 0 },
          { type: "number", key: `${key}.y`, label: `${label} Y`, default: d[1] ?? 0 },
        ],
      };
    }
    default:
      return null; // image / audio / audioFFT — host-bound
  }
}

/**
 * Parse an ISF / GLSL shader, translate its `INPUTS` into the azphalt UI schema, and package it as
 * a `.azp` shader asset. The source is stored verbatim; host-bound inputs (image/audio) are
 * recorded in params but are not user controls. An unknown input `TYPE` or a whitespace `NAME`
 * throws rather than being silently dropped.
 */
export function importIsf(shaderText: string, opts: ImportOptions): Uint8Array {
  // The ISF header is the file's first element: a /* … */ comment whose contents are a JSON object.
  let header: IsfHeader = {};
  let hasHeader = false;
  const m = /^\s*\/\*([\s\S]*?)\*\//.exec(shaderText.replace(/^﻿/, ""));
  if (m && m[1].trim().startsWith("{")) {
    try {
      header = JSON.parse(m[1].trim()) as IsfHeader;
    } catch (e) {
      throw new Error("isf: malformed JSON header: " + (e as Error).message);
    }
    hasHeader = true;
  }

  const inputs = Array.isArray(header.INPUTS) ? header.INPUTS : [];
  inputs.forEach((inp, i) => {
    if (typeof inp?.NAME !== "string" || inp.NAME === "" || /\s/.test(inp.NAME)) {
      throw new Error(`isf: INPUTS[${i}].NAME must be a non-empty, whitespace-free string`);
    }
    if (typeof inp.TYPE !== "string" || !INPUT_TYPES.has(inp.TYPE)) {
      throw new Error(`isf: INPUTS[${i}] (${inp.NAME}) has unknown TYPE ${JSON.stringify(inp.TYPE)}`);
    }
  });

  const controls: Control[] = [];
  for (const input of inputs) {
    if (HOST_BOUND.has(input.TYPE)) continue;
    const control = inputToControl(input);
    if (control) controls.push(control);
  }

  const payload: Record<string, Uint8Array> = {};
  const encoder = new TextEncoder();
  payload["assets/effect.isf"] = encoder.encode(shaderText);
  const hasUi = controls.length > 0;
  if (hasUi) payload["assets/ui.json"] = encoder.encode(JSON.stringify({ controls } as Panel, null, 2));

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: header.DESCRIPTION || "ISF Shader",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: header.CREDIT || opts.author,
    description: header.DESCRIPTION || "Imported ISF/GLSL Shader",
    assets: [
      {
        type: "shader",
        path: "assets/effect.isf",
        ...(hasUi ? { ui: "assets/ui.json" } : {}),
        params: {
          format: hasHeader ? "isf" : "glsl",
          ...(header.ISFVSN ? { isfvsn: header.ISFVSN } : {}),
          ...(Array.isArray(header.CATEGORIES) ? { categories: header.CATEGORIES } : {}),
          inputs: inputs.map((i) => ({ name: i.NAME, type: i.TYPE, hostBound: HOST_BOUND.has(i.TYPE) })),
        },
      },
    ],
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
