# Fonts (`kind: "font"`)

*Status: **Normative**. A **compiled font family**: one or more font files a text engine loads. The SDK
`Kind`/manifest wiring, the `@azphalt/azp` verification rules (`validateFontManifest` folded into
`verifyAzp`), the registry browse summary, the `submit-check` kind list and
`importFontPackage` (`@azphalt/importer-font`) are implemented.*

## Why a kind, when `asset` already has `font`

An `asset` package holds a font as one opaque `assets[]` entry: a store card can say "font" and nothing
else. A font *family* is what people browse, compare and install, and its facts — family name, designer,
scripts, the variable axes and their ranges, a specimen string — belong in the manifest so a card or a
host's picker can show them **without extracting the file**. `kind: "font"` is that header. It is data
only: no `entry`/`runtime`, no `capabilities`, no code; a font reaches none of the editor surface, so the
capability model is untouched.

## The package

~~~jsonc
{
  "azphalt": "0.1",
  "id": "com.acme.azphalt.fancy",
  "name": "Fancy",
  "version": "1.0.0",
  "kind": "font",
  "license": "OFL-1.1",
  "compat": ">=0.1",
  "font": {
    "family": "Fancy",
    "designer": "Acme Type",
    "scripts": ["Latn"],
    "languages": ["en", "fr"],
    "sampleText": "Sphinx of black quartz, judge my vow",
    "faces": [
      {
        "path": "fonts/Fancy.ttf", "format": "ttf", "style": "Regular", "weight": 400,
        "variable": true,
        "axes": [{ "tag": "wght", "name": "Weight", "min": 100, "default": 400, "max": 900 }]
      }
    ]
  }
}
~~~

Layout: `manifest.json`, `LICENSE`, `signature.json`, and one file per face under `fonts/`. Source files
(`.glyphs`, `.ufo`, an editor's project) are **not** part of the package; it is the compiled font only.

## Rules (`validateFontManifest`)

- A `font` block with a non-empty `family` (≤ 128 chars) and 1–64 `faces`.
- Each face `path` is under `fonts/`, unique, listed in `manifest.files` (so it is hash-covered), and ends
  in its `format` (`ttf`, `otf` or `woff2`). Nothing under `fonts/` may be undeclared.
- `variable: true` ⇔ `axes` non-empty. Each axis has a unique four-character `tag` and finite
  `min <= default <= max`.
- `scripts` are ISO 15924 codes; `languages` are BCP 47 tags; `sampleText` ≤ 200 characters.
- No `entry`/`runtime`, `capabilities`, `assets`, or `app`/`mcp`/`pack`/`skill`/`script`/`composable` block.
- **Given the payload**, each face's bytes must carry its format's file signature, be ≤ 32 MiB, and — for
  `ttf`/`otf` — the font's own `fvar` table must agree with the declared variability and axes. The file is
  authoritative; a card cannot advertise axes the font does not have. WOFF2 is Brotli-compressed and is
  checked by signature only.

## Browse summary

`GET /packages` rows for a font carry `font: { family, designer?, variable, axes: string[], faces }`
(`FontSummary`); `?kind=font` filters to them.

## Importer

`importFontPackage(bytes, opts)` in `@azphalt/importer-font` builds a valid font package from a `.ttf`,
`.otf` or `.woff2`, reading the family, style, weight, italic flag and axes from the font itself.
