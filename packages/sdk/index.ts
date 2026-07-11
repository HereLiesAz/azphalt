/**
 * `@azphalt/sdk` — the typed surface an azphalt extension is written against.
 *
 * Turns the strings in the spec — capabilities, contributions, params, the UI
 * schema — into a typed API. This package is **types plus thin author helpers
 * only**. The real {@link Host} is provided by a conforming runtime (see
 * `packages/runtime-reference`), which injects it and enforces the capability
 * grants. Nothing here can reach a host engine, camera, sensors, the filesystem,
 * or the network — see the never-list in `spec/capability-model.md`.
 */

/** The package-format / manifest version this SDK targets. */
export const FORMAT_VERSION = "0.1" as const;

/* ───────────────────────────── Manifest ───────────────────────────── */
export type Kind = "asset" | "code" | "mixed";
export type Runtime = "js" | "wasm";

/** Least-privilege surface an extension may request. See `spec/capability-model.md`. */
export type Capability =
  | "canvas"
  | "layers"
  | "bitmap"
  | "selection"
  | "color"
  | "params"
  | "assets"
  | "storage";

export type AssetType = "brush" | "lut" | "pattern" | "stamp";

export interface AssetContribution {
  type: AssetType;
  /** Path into `/assets` inside the `.azp`. */
  path: string;
  /** Normalized, host-neutral parameters (e.g. spacing, angle, roundness). */
  params?: Record<string, unknown>;
}

export interface FilterContribution {
  id: string;
  name: string;
  /** The `entry`-module export the host invokes. */
  entry: string;
  /** Optional UI panel path (see {@link Panel}). */
  ui?: string;
}

export interface ToolContribution {
  id: string;
  name: string;
  entry: string;
  ui?: string;
}

export interface CommandContribution {
  id: string;
  name: string;
  entry: string;
}

export interface Contributes {
  filters?: FilterContribution[];
  tools?: ToolContribution[];
  commands?: CommandContribution[];
}

/** The root `manifest.json` of a `.azp`. See `spec/extension-manifest.md`. */
export interface Manifest {
  /** Format version, e.g. `"0.1"`. */
  azphalt: string;
  /** Reverse-DNS, globally unique — e.g. `com.hereliesaz.halftone`. */
  id: string;
  name: string;
  /** Semver. */
  version: string;
  kind: Kind;
  /** SPDX id. MIT permits closed/sold extensions; author's choice. */
  license: string;
  /** Minimum host API version, e.g. `">=0.1"`. */
  compat: string;

  description?: string;
  author?: string;
  homepage?: string;

  assets?: AssetContribution[];
  entry?: string;
  runtime?: Runtime;
  capabilities?: Capability[];
  contributes?: Contributes;

  /** Payload path → SHA-256 digest (integrity; see `spec/package-format.md`). */
  files: Record<string, string>;
}

/* ───────────────────────────── UI schema ───────────────────────────── */
export interface SliderControl {
  type: "slider";
  key: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  default: number;
}

export interface NumberControl {
  type: "number";
  key: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  default: number;
}

export interface ToggleControl {
  type: "toggle";
  key: string;
  label: string;
  default: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectControl {
  type: "select";
  key: string;
  label: string;
  options: SelectOption[];
  default: string;
}

export interface ColorControl {
  type: "color";
  key: string;
  label: string;
  /** `#RRGGBB`. */
  default: string;
  alpha?: boolean;
}

export interface TextControl {
  type: "text";
  key: string;
  label: string;
  default: string;
  placeholder?: string;
}

export interface ButtonControl {
  type: "button";
  key: string;
  label: string;
  /** Fires this action on the entry export. */
  action: string;
}

export interface GroupControl {
  type: "group";
  key: string;
  label: string;
  controls: Control[];
}

export type Control =
  | SliderControl
  | NumberControl
  | ToggleControl
  | SelectControl
  | ColorControl
  | TextControl
  | ButtonControl
  | GroupControl;

/** A control panel the host renders as native widgets. See `spec/ui-schema.md`. */
export interface Panel {
  controls: Control[];
}

/* ───────────────────────────── Pixels ───────────────────────────── */

/**
 * An image buffer crossing the host boundary. Straight (non-premultiplied) alpha,
 * 8-bit RGBA, row-major, tightly packed (`stride = width * 4`). Mutated in place on
 * the hot path — see the image-buffer ABI in `spec/capability-model.md`.
 */
export interface Bitmap {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

/** Channels 0–255. */
export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

/* ───────────────────────────── Host surface ───────────────────────────── */

/** Opaque handle to an editable layer. */
export interface LayerRef {
  readonly id: string;
}

export interface CanvasApi {
  size(): { width: number; height: number };
  dpi(): number;
  requestRedraw(): void;
}

export interface LayersApi {
  active(): LayerRef;
  list(): LayerRef[];
  create(opts?: { name?: string }): LayerRef;
  opacity(layer: LayerRef): number;
  setOpacity(layer: LayerRef, value: number): void;
  blendMode(layer: LayerRef): string;
  setBlendMode(layer: LayerRef, mode: string): void;
}

export interface BitmapApi {
  read(layer: LayerRef): Bitmap;
  write(layer: LayerRef, bitmap: Bitmap): void;
  alloc(width: number, height: number): Bitmap;
}

export interface SelectionApi {
  /** Current selection mask, or `null` when nothing is selected. */
  mask(): Bitmap | null;
  set(mask: Bitmap): void;
  clear(): void;
}

export interface ColorApi {
  active(): RGBA;
  setActive(color: RGBA): void;
  palette(): RGBA[];
}

export interface ParamsApi {
  /** Read a control value by key. */
  value<T = unknown>(key: string): T;
  number(key: string): number;
  bool(key: string): boolean;
  string(key: string): string;
  color(key: string): RGBA;
}

export interface AssetsApi {
  /** Read a file bundled in this extension's own package. */
  read(path: string): Uint8Array;
}

/**
 * The host functions available to a running extension. **Only the sub-APIs whose
 * capability was declared and granted exist at runtime** — the runtime builds this
 * table from the grant set, so touching an ungranted capability is unreachable, not
 * merely an error.
 */
export interface Host {
  canvas: CanvasApi;
  layers: LayersApi;
  bitmap: BitmapApi;
  selection: SelectionApi;
  color: ColorApi;
  params: ParamsApi;
  assets: AssetsApi;
}

/* ───────────────────── Contribution entry points ───────────────────── */

export interface FilterContext extends Host {
  /** The layer the filter was invoked on. */
  target: LayerRef;
}

export interface ToolContext extends Host {
}

export interface CommandContext extends Host {
}

export type FilterFn = (ctx: FilterContext) => void | Promise<void>;
export type ToolFn = (ctx: ToolContext) => void | Promise<void>;
export type CommandFn = (ctx: CommandContext) => void | Promise<void>;

const KIND: unique symbol = Symbol.for("azphalt.contribution");

export type Contribution<F> = F & {
  readonly [KIND]: "filter" | "tool" | "command";
};

/**
 * Declare a filter. Export the result under the name your manifest's
 * `contributes.filters[].entry` points at:
 *
 * ```ts
 * import { defineFilter } from "@azphalt/sdk";
 * export const applyHalftone = defineFilter((ctx) => {
 * const cell = ctx.params.number("cellSize");
 * const bmp = ctx.bitmap.read(ctx.target);
 * // …mutate bmp.data (RGBA8, straight alpha)…
 * ctx.bitmap.write(ctx.target, bmp);
 * });
 * ```
 */
export function defineFilter(fn: FilterFn): Contribution<FilterFn> {
  return Object.assign(fn, { [KIND]: "filter" as const });
}

export function defineTool(fn: ToolFn): Contribution<ToolFn> {
  return Object.assign(fn, { [KIND]: "tool" as const });
}

export function defineCommand(fn: CommandFn): Contribution<CommandFn> {
  return Object.assign(fn, { [KIND]: "command" as const });
}
