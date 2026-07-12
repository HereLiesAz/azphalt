/**
 * Parser for the GL Transitions format (gl-transitions.com) — a GLSL fragment defining
 * `vec4 transition(vec2 uv)`, with metadata in `//` comments and tunable `uniform` parameters
 * annotated with a default (`uniform float intensity; // = 1.0`). The host supplies `from`/`to`
 * (the two clips), `progress`, and `ratio`; those are not user parameters. We validate + describe
 * — the original source is stored verbatim in the package.
 */

export interface GlUniform {
  name: string;
  /** GLSL type: `float` | `int` | `bool` | `vec2..4` | `ivec2..4` | `sampler2D` | … */
  glslType: string;
  /** Parsed default from the `// = …` annotation, if any. */
  default?: number | boolean | number[];
}

export interface ParsedGlTransition {
  name?: string;
  author?: string;
  license?: string;
  /** User-tunable uniforms (excludes the host-provided `from`/`to`/`progress`/`ratio`). */
  uniforms: GlUniform[];
  source: string;
}

/** Uniforms the gl-transitions runtime provides — never user controls. */
export const HOST_PROVIDED: ReadonlySet<string> = new Set(["from", "to", "progress", "ratio"]);

const VEC_SIZE: Record<string, number> = { vec2: 2, vec3: 3, vec4: 4, ivec2: 2, ivec3: 3, ivec4: 4 };

function numbersIn(expr: string): number[] {
  return (expr.match(/-?\d*\.?\d+(?:[eE][+-]?\d+)?/g) ?? []).map(Number);
}

function parseDefault(glslType: string, expr: string | undefined): GlUniform["default"] {
  if (expr === undefined) return undefined;
  const e = expr.trim();
  if (glslType === "bool") return e === "true" || e === "1";
  if (glslType === "float" || glslType === "int") {
    const n = Number(numbersIn(e)[0]);
    return Number.isFinite(n) ? n : undefined;
  }
  const size = VEC_SIZE[glslType];
  if (size) {
    // Read only inside the constructor's parens, so the type's own digit (vec"4") isn't captured.
    const inner = /\(([^)]*)\)/.exec(e)?.[1] ?? e;
    let nums = numbersIn(inner);
    if (nums.length === 1) nums = Array(size).fill(nums[0]); // GLSL vecN(x) fills all components
    return nums.slice(0, size);
  }
  return undefined;
}

function scanMeta(source: string, key: string): string | undefined {
  const m = new RegExp(`//\\s*${key}\\s*:\\s*(.+)`, "i").exec(source);
  return m ? m[1].trim() : undefined;
}

/** Parse gl-transition GLSL into a {@link ParsedGlTransition}. */
export function parseGlTransition(source: string): ParsedGlTransition {
  if (!/\btransition\s*\(/.test(source)) {
    throw new Error("gl-transition: source does not define a transition(...) function");
  }

  const uniforms: GlUniform[] = [];
  const seen = new Set<string>();
  const re = /uniform\s+(\w+)\s+(\w+)\s*;[ \t]*(?:\/\/\s*=\s*([^\n\r]*))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    const [, glslType, name, defExpr] = m;
    if (HOST_PROVIDED.has(name)) continue; // host binds these
    if (seen.has(name)) throw new Error(`gl-transition: duplicate uniform '${name}'`);
    seen.add(name);
    uniforms.push({ name, glslType, default: parseDefault(glslType, defExpr) });
  }

  return {
    name: scanMeta(source, "name"),
    author: scanMeta(source, "author"),
    license: scanMeta(source, "license"),
    uniforms,
    source,
  };
}
