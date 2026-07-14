/**
 * Map gl-transition uniforms onto azphalt's host-rendered UI schema (`spec/ui-schema.md`), so a
 * transition's parameters render natively in any adopting host. `sampler2D` uniforms are textures
 * the host binds, not user controls, so they are excluded from the panel.
 */
import type { Control, Panel } from "@azphalt/sdk";
import type { GlUniform } from "./parse-gl-transition.js";

const VEC_SIZE: Record<string, number> = { vec2: 2, vec3: 3, vec4: 4, ivec2: 2, ivec3: 3, ivec4: 4 };

/** A texture uniform the host binds — not a user control. */
export function isHostBound(u: GlUniform): boolean {
  return u.glslType === "sampler2D";
}

/** Convert one uniform to an azphalt control, or `null` if it is host-bound / unmappable. */
export function uniformToControl(u: GlUniform): Control | null {
  const key = u.name;
  const label = u.name;

  if (u.glslType === "bool") {
    return { type: "toggle", key, label, default: u.default === true };
  }
  if (u.glslType === "float" || u.glslType === "int") {
    return { type: "number", key, label, default: typeof u.default === "number" ? u.default : 0 };
  }
  const size = VEC_SIZE[u.glslType];
  if (size) {
    const d = Array.isArray(u.default) ? u.default : [];
    const controls: Control[] = [];
    for (let i = 0; i < size; i++) {
      controls.push({
        type: "number",
        key: `${key}.${i}`,
        label: `${label} ${i}`,
        default: typeof d[i] === "number" ? d[i] : 0,
      });
    }
    return { type: "group", key, label, controls };
  }
  return null; // sampler2D and unknown types
}

/** Build a {@link Panel} from a uniform list, skipping host-bound textures. */
export function uniformsToPanel(uniforms: GlUniform[]): Panel {
  const controls: Control[] = [];
  for (const u of uniforms) {
    if (isHostBound(u)) continue;
    const c = uniformToControl(u);
    if (c) controls.push(c);
  }
  return { controls };
}
