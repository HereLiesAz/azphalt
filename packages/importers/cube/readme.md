# @azphalt/importer-cube

Normalize a `.cube` LUT (Adobe/IRIDAS, 1D or 3D) into a `.azp` asset package. `.cube` is already the portable color-transform interchange, so the import is 1:1: the LUT is validated and its metadata captured, the original bytes are stored verbatim, and a manifest wraps them.

## CLI

~~~sh
pnpm --filter @azphalt/importer-cube build
azphalt-import-cube teal-fade.cube --id com.hereliesaz.teal-fade -o teal-fade.azp
# real packaging supplies the LUT's own license text:
azphalt-import-cube teal-fade.cube --id com.hereliesaz.teal-fade --license-file LICENSE.txt
~~~

## Library

~~~ts
import { importCube, parseCube } from "@azphalt/importer-cube";

const { azp, manifest, lut } = importCube(cubeText, licenseText, { id: "com.hereliesaz.teal-fade" });
~~~
