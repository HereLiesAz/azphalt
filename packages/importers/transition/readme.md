# @azphalt/importer-transition

Normalize a **GL Transition** ([gl-transitions.com](https://gl-transitions.com)) into a `.azp`
transition asset. A gl-transition is a GLSL fragment defining `vec4 transition(vec2 uv)` with
metadata in `//` comments and tunable `uniform` parameters (`uniform float intensity; // = 1.0`).
The source is stored verbatim; its uniforms become an azphalt UI panel plus manifest params, so an
adopting host — e.g. [Guillotine](https://github.com/HereLiesAz/Guillotine), whose clip-to-clip
transitions this feeds — renders the controls natively and runs the transition with its own engine.

This completes Guillotine's format trio alongside `@azphalt/importer-cube` (LUTs) and
`@azphalt/importer-isf` (shaders).

## uniforms → controls

| GLSL uniform | azphalt control |
|---|---|
| `float` / `int` | `number` |
| `bool` | `toggle` |
| `vec2..4` / `ivec2..4` | `group` of `number`s |
| `sampler2D`, and `from`/`to`/`progress`/`ratio` | *host-provided* — bound by the host, not user controls |

## CLI

~~~sh
pnpm --filter @azphalt/importer-transition build
azphalt-import-transition crosswarp.glsl --id com.hereliesaz.crosswarp -o crosswarp.azp
~~~

## Library

~~~ts
import { importGlTransition, parseGlTransition } from "@azphalt/importer-transition";

const { azp, manifest, panel } = importGlTransition(glslSource, licenseText, { id: "com.hereliesaz.crosswarp" });
~~~
