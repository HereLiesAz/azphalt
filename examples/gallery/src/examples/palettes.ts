import { example, utf8, type Example } from "../shared.js";

/**
 * A GIMP `.gpl` palette: the `GIMP Palette` header, a `Name:` line, an optional `Columns:` hint,
 * a `#` comment, then `R G B<TAB>name` swatch rows (channels 0–255). This one is a warm dusk ramp.
 */
const SUNSET_GPL = `GIMP Palette
Name: Warm Sunset
Columns: 4
# Warm sunset — a dusk-sky ramp from deep indigo up to a golden horizon
 43  35  84	Deep Indigo
 82  45 107	Twilight Violet
138  58 111	Mulberry
196  78 102	Rose Clay
233 110  78	Coral
246 156  71	Tangerine
250 196  92	Amber
253 230 138	Golden Haze
`;

/** A linear 16-step grayscale ramp (0 → 255 in equal increments of 17), as a GIMP `.gpl`. */
const GRAYSCALE_GPL = `GIMP Palette
Name: Grayscale 16
Columns: 8
# A linear 16-step grayscale ramp from black to white
  0   0   0	Gray 00
 17  17  17	Gray 01
 34  34  34	Gray 02
 51  51  51	Gray 03
 68  68  68	Gray 04
 85  85  85	Gray 05
102 102 102	Gray 06
119 119 119	Gray 07
136 136 136	Gray 08
153 153 153	Gray 09
170 170 170	Gray 10
187 187 187	Gray 11
204 204 204	Gray 12
221 221 221	Gray 13
238 238 238	Gray 14
255 255 255	Gray 15
`;

/** `palette` — a swatch set in GIMP `.gpl` text a host can load into a color picker. */
export const palettes: Example[] = [
  example({
    slug: "palette-sunset",
    summary: "An 8-color warm sunset palette in GIMP `.gpl` format.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.palette-sunset",
      name: "Warm Sunset",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "An 8-swatch dusk-sky palette from deep indigo to golden horizon.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "palette", path: "assets/palette-sunset.gpl", tags: ["warm", "sunset", "gpl"] }],
    },
    payload: { "assets/palette-sunset.gpl": utf8(SUNSET_GPL) },
  }),
  example({
    slug: "palette-grayscale",
    summary: "A linear 16-step grayscale ramp in GIMP `.gpl` format.",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.palette-grayscale",
      name: "Grayscale 16",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A 16-step neutral grayscale ramp from black to white for tonal work.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "palette", path: "assets/palette-grayscale.gpl", tags: ["grayscale", "neutral", "gpl"] }],
    },
    payload: { "assets/palette-grayscale.gpl": utf8(GRAYSCALE_GPL) },
  }),
];
