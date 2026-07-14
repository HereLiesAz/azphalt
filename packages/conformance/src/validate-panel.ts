/**
 * Validate a UI {@link Panel} against `spec/ui-schema.md` — the schema a conforming host must be
 * able to render natively. Returns a list of problems (empty ⇒ valid). Used by the conformance
 * suite's UI check, but exported for hosts and importers to validate panels they emit/consume.
 */
import type { Control, Panel } from "@azphalt/sdk";

/** Every control `type` in `0.1`. A host claiming conformance must render all of them. */
export const CONTROL_TYPES_0_1 = [
  "slider",
  "number",
  "toggle",
  "select",
  "color",
  "text",
  "button",
  "group",
] as const;

const HEX_COLOR = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function validateControl(c: Control, path: string, seenKeys: Set<string>, errors: string[]): void {
  if (!c || typeof c !== "object") {
    errors.push(`${path}: control is not an object`);
    return;
  }
  if (typeof c.type !== "string") errors.push(`${path}: missing 'type'`);
  if (typeof c.key !== "string" || !c.key) errors.push(`${path}: missing 'key'`);
  if (typeof c.label !== "string") errors.push(`${path}: missing 'label'`);

  if (typeof c.key === "string" && c.key) {
    if (seenKeys.has(c.key)) errors.push(`${path}: duplicate key '${c.key}'`);
    seenKeys.add(c.key);
  }

  switch (c.type) {
    case "slider":
      if (typeof c.min !== "number") errors.push(`${path}: slider needs numeric 'min'`);
      if (typeof c.max !== "number") errors.push(`${path}: slider needs numeric 'max'`);
      if (typeof c.default !== "number") errors.push(`${path}: slider needs numeric 'default'`);
      break;
    case "number":
      if (typeof c.default !== "number") errors.push(`${path}: number needs numeric 'default'`);
      break;
    case "toggle":
      if (typeof c.default !== "boolean") errors.push(`${path}: toggle needs boolean 'default'`);
      break;
    case "select":
      if (!Array.isArray(c.options) || c.options.length === 0) {
        errors.push(`${path}: select needs a non-empty 'options' array`);
      } else {
        c.options.forEach((o, i) => {
          if (typeof o?.value !== "string" || typeof o?.label !== "string") {
            errors.push(`${path}.options[${i}]: needs string 'value' and 'label'`);
          }
        });
      }
      if (typeof c.default !== "string") errors.push(`${path}: select needs string 'default'`);
      break;
    case "color":
      if (typeof c.default !== "string" || !HEX_COLOR.test(c.default)) {
        errors.push(`${path}: color 'default' must be #RRGGBB or #RRGGBBAA`);
      }
      break;
    case "text":
      if (typeof c.default !== "string") errors.push(`${path}: text needs string 'default'`);
      break;
    case "button":
      if (typeof c.action !== "string" || !c.action) errors.push(`${path}: button needs an 'action'`);
      break;
    case "group":
      if (!Array.isArray(c.controls)) {
        errors.push(`${path}: group needs a 'controls' array`);
      } else {
        // Nested keys share the panel's key namespace, so pass the same `seenKeys`.
        c.controls.forEach((child, i) => validateControl(child, `${path}.controls[${i}]`, seenKeys, errors));
      }
      break;
    default:
      errors.push(`${path}: unknown control type '${(c as { type?: unknown }).type}'`);
  }
}

/** Validate a panel; returns the list of schema violations (empty ⇒ conforming). */
export function validatePanel(panel: Panel): string[] {
  const errors: string[] = [];
  if (!panel || typeof panel !== "object" || !Array.isArray(panel.controls)) {
    return ["panel: missing 'controls' array"];
  }
  const seenKeys = new Set<string>();
  panel.controls.forEach((c, i) => validateControl(c, `controls[${i}]`, seenKeys, errors));
  return errors;
}
