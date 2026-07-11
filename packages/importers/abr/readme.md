# @azphalt/importer-abr

Normalize a Photoshop `.abr` brush into a `.azp` asset package. Unlike `.cube` (stored verbatim),
`.abr` is **transcoded**: the sampled brush tip is decoded to a grayscale PNG and its mappable
dynamics are lifted into the manifest — `spec/package-format.md` requires "an imported `.abr`
[to become] `assets/*.png` plus manifest params, not a repackaged `.abr`". You import the portable
half — shape, grain, mappable parameters — not the stroke engine, so it is a faithful-shape
import, not a pixel-match (RATIONALE § 1.3).

## Coverage

- **v1 / v2** sampled brushes — bounds, spacing, raw or PackBits (RLE) bitmap.
- **v6+** `8BIM` sections — `samp` sampled bitmaps + `desc` dynamics (diameter, spacing, angle,
  roundness, hardness) from the action descriptor.
- Computed (procedural) brushes carry no bitmap and are skipped. Any unrecognized version or
  structure throws `UnsupportedAbrError` — the importer never emits a guess.

**Validation status:** the decoders are covered by tests built from the documented layout with an
independent byte writer (so a passing test cross-checks reader against writer, not the parser
against itself), plus the canonical PackBits vector and a PNG decode round-trip. Validating
against a corpus of real Photoshop `.abr` files is the next step before claiming full Photoshop
compatibility.

## CLI

~~~sh
pnpm --filter @azphalt/importer-abr build
azphalt-import-abr dry-ink.abr --id com.hereliesaz.dry-ink -o dry-ink.azp
# real packaging supplies the brush's own license text:
azphalt-import-abr dry-ink.abr --id com.hereliesaz.dry-ink --license-file LICENSE.txt
~~~

## Library

~~~ts
import { importAbr, parseAbr } from "@azphalt/importer-abr";

const { azp, manifest, brush } = importAbr(abrBytes, licenseText, { id: "com.hereliesaz.dry-ink" });
~~~
