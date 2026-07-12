# @azphalt/importer-isf

Normalize an **ISF** (Interactive Shader Format) or raw **GLSL** fragment shader into a `.azp`
asset package. The shader source is stored verbatim; its ISF `INPUTS` become an azphalt UI panel
(`spec/ui-schema.md`) plus manifest params, so any adopting host renders the controls natively and
applies the shader with its own engine — a paint app, or [Guillotine](https://github.com/HereLiesAz/Guillotine)
the local-first video editor, whose shader/LUT ecosystem this feeds.

## INPUTS → controls

| ISF `TYPE` | azphalt control |
|---|---|
| `float` (with MIN/MAX) | `slider` |
| `float` (no range) | `number` |
| `bool` | `toggle` |
| `long` | `select` (`VALUES`/`LABELS`) |
| `color` | `color` (vec4 → `#RRGGBB`) |
| `event` | `button` |
| `point2D` | `group` of two `number`s |
| `image` / `audio` / `audioFFT` | *host-bound* — recorded in params, not a user control |

## CLI

~~~sh
pnpm --filter @azphalt/importer-isf build
azphalt-import-isf teal-grade.fs --id com.hereliesaz.teal-grade -o teal-grade.azp
# real packaging supplies the shader's own license text:
azphalt-import-isf teal-grade.fs --id com.hereliesaz.teal-grade --license-file LICENSE.txt
~~~

## Library

~~~ts
import { importIsf, parseIsf } from "@azphalt/importer-isf";

const { azp, manifest, panel } = importIsf(shaderSource, licenseText, { id: "com.hereliesaz.teal-grade" });
~~~
