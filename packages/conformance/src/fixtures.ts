/**
 * Canonical `.azp` fixtures the conformance suite runs a host through. Each is a real package built
 * with `@azphalt/azp` `writeAzp`, so it verifies like any shipped extension. The filter modules are
 * plain ES modules written against `@azphalt/sdk` — exactly what a `runtime: "js"` host loads.
 */
import { writeAzp } from "@azphalt/azp";
import type { AssetContribution, Manifest, Panel } from "@azphalt/sdk";

const enc = (s: string) => new TextEncoder().encode(s);

interface BuildOpts {
  capabilities?: Manifest["capabilities"];
  extraPayload?: Record<string, Uint8Array>;
  ui?: string;
}

/** Build a `code`-kind `.azp` around `moduleSource` exposing an `invert`-id filter. */
function buildCodeAzp(moduleSource: string, opts: BuildOpts = {}): Uint8Array {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: "com.azphalt.conformance",
    name: "Conformance Fixture",
    version: "1.0.0",
    kind: "code",
    license: "MIT",
    compat: ">=0.1",
    entry: "code/main.js",
    runtime: "js",
    capabilities: opts.capabilities ?? ["bitmap", "params", "canvas"],
    contributes: { filters: [{ id: "invert", name: "Invert", entry: "invert", ui: opts.ui }] },
  };
  return writeAzp({
    manifest,
    payload: { "code/main.js": enc(moduleSource), ...opts.extraPayload },
    license: "MIT License",
  }).azp;
}

/** The invert filter, written against `@azphalt/sdk` exactly as a real extension is. */
const INVERT_MODULE = `
  import { defineFilter } from "@azphalt/sdk";
  export const invert = defineFilter((ctx) => {
    const s = Math.max(0, Math.min(1, ctx.params.number("strength")));
    const bmp = ctx.bitmap.read(ctx.target);
    const d = bmp.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = d[i] + (255 - 2 * d[i]) * s;
      d[i + 1] = d[i + 1] + (255 - 2 * d[i + 1]) * s;
      d[i + 2] = d[i + 2] + (255 - 2 * d[i + 2]) * s;
    }
    ctx.bitmap.write(ctx.target, bmp);
    ctx.canvas.requestRedraw();
  });
`;

/** A well-formed filter package that must load, run, and pass verification. */
export function validFilterAzp(): Uint8Array {
  return buildCodeAzp(INVERT_MODULE);
}

/** A valid package with its payload corrupted — a host MUST refuse it (digest mismatch). */
export function tamperedAzp(): Uint8Array {
  const azp = validFilterAzp();
  // Corrupt a block of payload data (past local headers, before the EOCD) so a digest fails.
  for (let i = 50; i < 130; i++) azp[i] ^= 0xff;
  return azp;
}

/**
 * A package carrying a payload path that escapes the package (`..`). Built by hand because
 * `writeAzp` digests whatever paths it is given; a host MUST reject the unsafe path on load.
 */
export function unsafePathAzp(): Uint8Array {
  return writeAzp({
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.conformance.unsafe",
      name: "Unsafe",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
    },
    payload: { "../escape.txt": enc("nope") },
    license: "MIT License",
  }).azp;
}

/**
 * A filter that touches `bitmap`, but the manifest grants only `params`. A conforming host leaves
 * `ctx.bitmap` **absent**, so the filter throws — the capability is unreachable, not a stub.
 */
export function ungrantedCapabilityAzp(): Uint8Array {
  return buildCodeAzp(INVERT_MODULE, { capabilities: ["params"] });
}

/**
 * A filter that probes for ambient authority. If any of `process`/`require`/`fetch`/`globalThis.fs`
 * is reachable, it throws — so on a conforming host it completes cleanly (writing a sentinel pixel).
 */
export function neverListAzp(): Uint8Array {
  const mod = `
    import { defineFilter } from "@azphalt/sdk";
    export const invert = defineFilter((ctx) => {
      const forbidden = ["process", "require", "fetch", "XMLHttpRequest", "WebSocket"];
      for (const name of forbidden) {
        if (typeof globalThis[name] !== "undefined") throw new Error("ambient authority present: " + name);
      }
      const bmp = ctx.bitmap.read(ctx.target);
      bmp.data[0] = 1;
      ctx.bitmap.write(ctx.target, bmp);
    });
  `;
  return buildCodeAzp(mod);
}

/** A filter that writes `ctx.params.number("v")` into pixel 0 — proves params round-trip to the guest. */
export function paramsRoundTripAzp(): Uint8Array {
  const mod = `
    import { defineFilter } from "@azphalt/sdk";
    export const invert = defineFilter((ctx) => {
      const v = ctx.params.number("v");
      const bmp = ctx.bitmap.read(ctx.target);
      bmp.data[0] = v;
      ctx.bitmap.write(ctx.target, bmp);
    });
  `;
  return buildCodeAzp(mod);
}

/** A panel exercising every `0.1` control type — the schema a conforming host renders natively. */
export function everyControlPanel(): Panel {
  return {
    controls: [
      { type: "slider", key: "strength", label: "Strength", min: 0, max: 1, step: 0.01, default: 1 },
      { type: "number", key: "count", label: "Count", default: 3 },
      { type: "toggle", key: "invertAlpha", label: "Invert alpha", default: false },
      {
        type: "select",
        key: "mode",
        label: "Mode",
        options: [
          { value: "rgb", label: "RGB" },
          { value: "luma", label: "Luma" },
        ],
        default: "rgb",
      },
      { type: "color", key: "tint", label: "Tint", default: "#00ffcc", alpha: true },
      { type: "text", key: "note", label: "Note", default: "", placeholder: "optional" },
      { type: "button", key: "apply", label: "Apply", action: "invert" },
      {
        type: "group",
        key: "advanced",
        label: "Advanced",
        controls: [{ type: "toggle", key: "clamp", label: "Clamp", default: true }],
      },
    ],
  };
}

/** A filter package that carries a UI panel with every control type at `ui/panel.json`. */
export function uiPanelAzp(): Uint8Array {
  const panel = everyControlPanel();
  return buildCodeAzp(INVERT_MODULE, {
    ui: "ui/panel.json",
    extraPayload: { "ui/panel.json": enc(JSON.stringify(panel)) },
  });
}

/* ─────────────── asset-host fixtures ─────────────── */

interface AssetBuildOpts {
  compat?: string;
  /** Override the asset contribution's `type` (default `"lut"`). */
  type?: string;
  /** Panel JSON to store at `ui/grade.json` and reference from the asset (default a valid panel). */
  panel?: unknown;
}

/** Build an `asset`-kind `.azp` with one asset (a `.cube` LUT by default) + a ui panel. */
function buildAssetAzp(opts: AssetBuildOpts = {}): Uint8Array {
  const panel = opts.panel ?? everyControlPanel();
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: "com.azphalt.conformance.asset",
    name: "Asset Fixture",
    version: "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: opts.compat ?? ">=0.1",
    assets: [
      {
        type: (opts.type ?? "lut") as AssetContribution["type"],
        path: "assets/grade.cube",
        ui: "ui/grade.json",
        params: { format: "cube" },
      },
    ],
  };
  return writeAzp({
    manifest,
    payload: {
      "assets/grade.cube": enc('TITLE "Teal"\nLUT_3D_SIZE 2\n'),
      "ui/grade.json": enc(JSON.stringify(panel)),
    },
    license: "MIT License",
  }).azp;
}

/** A conforming asset package: a `lut` asset with a valid ui panel — an asset host must accept it. */
export function assetAzp(): Uint8Array {
  return buildAssetAzp();
}

/** A `code`-kind package — an asset host MUST refuse it (it runs no code). */
export function codeKindAzp(): Uint8Array {
  return validFilterAzp();
}

/** A valid asset package whose `compat` no `0.1` host satisfies — must be refused on compat. */
export function incompatibleAssetAzp(): Uint8Array {
  return buildAssetAzp({ compat: ">=99.0" });
}

/** An asset package whose ui panel is malformed — a host validating the schema must refuse it. */
export function assetBadPanelAzp(): Uint8Array {
  return buildAssetAzp({ panel: { controls: [{ type: "color", key: "k", label: "L", default: "not-a-hex" }] } });
}
