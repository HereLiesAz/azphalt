# My Font

An azphalt **font** package (`kind: "font"`) — a compiled font family the store lists and apps install.
Data only: no code, no azphalt capabilities. See the [font spec](../../../../spec/font.md).

## What's here

- **`manifest.json`** — the `font` block: family, optional designer/scripts/languages/sampleText, and one
  `faces[]` entry per file. A variable face sets `"variable": true` and lists its `axes`.
- **`fonts/`** — your compiled `.ttf`, `.otf` or `.woff2`. Every file must be declared by a face.
- **`build.js`** — bundles `fonts/` into a `.azp`. Verification cross-checks declared axes against the
  font's own `fvar` table.

## Build

~~~sh
npm install
npm run build        # → my-font-1.0.0.azp
~~~
