/**
 * Map ISF `INPUTS` onto azphalt's host-rendered UI schema (`spec/ui-schema.md`). This is what lets
 * a shader's controls render natively in any adopting host — a paint app in Compose, Guillotine in
 * its timeline. Inputs the host binds itself (the clip image, audio) are excluded from the panel.
 */
import type { Control, NumberControl, Panel, SelectOption } from "@azphalt/sdk";
import type { IsfInput } from "./parse-isf.js";

const HOST_BOUND: ReadonlySet<string> = new Set(["image", "audio", "audioFFT"]);

/** True for inputs the host supplies (the clip/media), not the user — excluded from the panel. */
export function isHostBound(input: IsfInput): boolean {
  return HOST_BOUND.has(input.TYPE);
}

/** ISF `color` is a vec4 of floats 0–1; azphalt color defaults are `#RRGGBB` (alpha carried separately). */
export function vec4ToHex(v: number[] | undefined): string {
  const c = v ?? [0, 0, 0, 1];
  const ch = (x: unknown) => {
    const val = typeof x === "number" && !Number.isNaN(x) ? x : 0;
    return Math.max(0, Math.min(255, Math.round(val * 255)));
  };
  const hx = (n: unknown) => ch(n).toString(16).padStart(2, "0");
  return `#${hx(c[0])}${hx(c[1])}${hx(c[2])}`;
}

/** Convert one ISF input to an azphalt control, or `null` if it is host-bound (no user control). */
export function inputToControl(input: IsfInput): Control | null {
  const key = input.NAME;
  const label = input.LABEL ?? input.NAME;

  switch (input.TYPE) {
    case "float": {
      const def = typeof input.DEFAULT === "number" ? input.DEFAULT : 0;
      const min = typeof input.MIN === "number" ? input.MIN : undefined;
      const max = typeof input.MAX === "number" ? input.MAX : undefined;
      if (min !== undefined && max !== undefined) {
        return { type: "slider", key, label, min, max, default: def };
      }
      const num: NumberControl = { type: "number", key, label, default: def };
      if (min !== undefined) num.min = min;
      if (max !== undefined) num.max = max;
      return num;
    }
    case "bool":
      return { type: "toggle", key, label, default: input.DEFAULT === true };
    case "long": {
      const values = input.VALUES ?? [];
      const labels = input.LABELS ?? [];
      const options: SelectOption[] = values.map((v, i) => ({
        value: String(v),
        label: labels[i] !== undefined ? String(labels[i]) : String(v),
      }));
      const def = input.DEFAULT != null ? String(input.DEFAULT) : options[0]?.value ?? "0";
      return { type: "select", key, label, options, default: def };
    }
    case "color":
      return {
        type: "color",
        key,
        label,
        default: vec4ToHex(Array.isArray(input.DEFAULT) ? input.DEFAULT : undefined),
        alpha: true,
      };
    case "event":
      return { type: "button", key, label, action: input.NAME };
    case "point2D": {
      const d = Array.isArray(input.DEFAULT) ? input.DEFAULT : [0, 0];
      return {
        type: "group",
        key,
        label,
        controls: [
          { type: "number", key: `${key}.x`, label: `${label} X`, default: typeof d[0] === "number" ? d[0] : 0 },
          { type: "number", key: `${key}.y`, label: `${label} Y`, default: typeof d[1] === "number" ? d[1] : 0 },
        ],
      };
    }
    default:
      return null; // image / audio / audioFFT — host-bound
  }
}

/** Build a {@link Panel} from an ISF input list, skipping host-bound inputs. */
export function inputsToPanel(inputs: IsfInput[]): Panel {
  const controls: Control[] = [];
  for (const input of inputs) {
    if (isHostBound(input)) continue;
    const control = inputToControl(input);
    if (control) controls.push(control);
  }
  return { controls };
}
