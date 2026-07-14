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

/** 
 * Least-privilege surface an extension may request. See `spec/capability-model.md`.
 * Note: no `StorageApi` ships in 0.1.
 */
export type Capability =
  | "canvas"
  | "layers"
  | "bitmap"
  | "selection"
  | "color"
  | "params"
  | "assets"
  | "time"
  | "audio"
  | "storage";

export type AssetType = 
  | "brush" | "lut" | "pattern" | "stamp" | "shader" | "transition"
  | "mesh" | "material" | "hdri" | "motion" | "palette"
  | "image" | "video" | "font" | "audio" | "vector"
  | "tflite" | "litert" | "onnx" | "sherpa-bundle";

export interface AssetContribution {
  type: AssetType;
  /** Path into `/assets` inside the `.azp`, or empty if remoteUrl is provided. */
  path: string;
  /**
   * A specific role for generic types (e.g. `type: "tflite", role: "depth"`), routing a model graph
   * to the correct host engine. Open vocabulary — any string is valid — but prefer a blessed
   * {@link ModelRole} where one fits, so routing is consistent across hosts.
   */
  role?: ModelRole;
  /** Normalized, host-neutral parameters (e.g. spacing, angle, roundness). */
  params?: Record<string, unknown>;
  /** Optional UI panel path (e.g. assets/ui.json) generated for configurable assets. */
  ui?: string;
  /** Optional tags for filtering in the marketplace (e.g., ["sfx", "impact"]). */
  tags?: string[];
  /** The URL where this asset can be directly downloaded by the host (VSCode header pattern). */
  remoteUrl?: string;
  /** Checksum of the remote file (usually SHA-256) for verification. */
  checksum?: string;
  /** Pre-declared byte size for download progress / headroom checks. */
  byteSize?: number;
  /**
   * Optional self-describing IO / preprocessing descriptor for a model asset (`onnx` | `tflite` |
   * `litert` | `sherpa-bundle`), letting a host preprocess, run the model in its own runtime, and
   * interpret its outputs with no per-model code. See {@link ModelIO}.
   */
  io?: ModelIO;
}

/**
 * Canonical task roles for model assets. `role` stays an **open** vocabulary — any string is
 * assignable — but these are the blessed core, so a model tagged e.g. `role: "depth"` routes to the
 * same engine on every conforming host. The trailing `string & {}` keeps arbitrary roles valid while
 * surfacing the blessed set in editor autocomplete.
 */
export type ModelRole =
  | "image-labeling"
  | "object-detection"
  | "face-detection"
  | "subject-segmentation"
  | "matting"
  | "image-embedding"
  | "depth"
  | "super-resolution"
  | "speech-to-text"
  | "audio-event"
  | "highlight-detection"
  // Open-union idiom: `string & {}` keeps `role` assignable from ANY string while the literals above
  // still surface as autocomplete for the blessed core.
  | (string & {});

/** Numeric element type of a model tensor. */
export type TensorDType =
  | "float32" | "float16" | "int8" | "uint8" | "int32" | "int64" | "bool";

/** Memory layout of an image tensor. */
export type TensorLayout = "NCHW" | "NHWC";

/** Channel order for image inputs. */
export type ColorOrder = "RGB" | "BGR";

/**
 * Per-channel input normalization, expressed as **either** mean/std (`(x/255 - mean) / std`) **or**
 * scale/bias (`x * scale + bias`). Each value is a scalar (applied to every channel) or a per-channel
 * array; a host applies whichever pair is present.
 */
export interface Normalization {
  mean?: number | number[];
  std?: number | number[];
  scale?: number | number[];
  bias?: number | number[];
}

/** Audio framing for a model with an audio input. */
export interface AudioInputSpec {
  /** Required input sample rate in Hz (e.g. 16000). */
  sampleRate: number;
  /** Analysis window length, in samples. */
  window?: number;
  /** Hop / stride between successive windows, in samples. */
  hop?: number;
  /** Channel layout the model expects. */
  channels?: "mono" | "stereo";
}

/** One model input tensor and how to prepare data for it. */
export interface ModelInput {
  /** Tensor name as the runtime graph exposes it. */
  name?: string;
  /** Shape; use `-1` or `null` for a dynamic/batch dimension (e.g. `[-1, 3, 256, 256]`). */
  shape?: (number | null)[];
  dtype?: TensorDType;
  /** Image layout, when the input is an image tensor. */
  layout?: TensorLayout;
  /** Channel order, when the input is an image tensor. */
  color?: ColorOrder;
  /** Pixel-value normalization to apply before inference. */
  normalization?: Normalization;
  /** Audio framing, when the input is an audio tensor. */
  audio?: AudioInputSpec;
}

/** How an output tensor should be interpreted, so a host reads it without model-specific code. */
export type OutputSemantics = "logits" | "boxes" | "scores" | "mask" | "embedding";

/** One model output tensor and how to decode it. */
export interface ModelOutput {
  /** Tensor name as the runtime graph exposes it. */
  name?: string;
  /** A small semantics tag telling the host how to read this tensor. */
  semantics?: OutputSemantics;
  shape?: (number | null)[];
  dtype?: TensorDType;
  /** Decode parameters the semantics needs (e.g. detector anchors/variances, or `{ decoded: true }`). */
  decode?: Record<string, unknown>;
}

/** Quantization of the delivered weights, so a host can pick a compatible runtime path. */
export interface Quantization {
  /** e.g. `"none"` | `"int8"` | `"float16"` | `"dynamic"`. */
  type?: string;
  /** Optional per-tensor scale / zero-point, when a host needs them to dequantize outputs. */
  scale?: number;
  zeroPoint?: number;
}

/**
 * An **optional**, self-describing IO / preprocessing descriptor for a model asset (`onnx` | `tflite`
 * | `litert` | `sherpa-bundle`). With it, a host can preprocess, run the model in its own on-device
 * runtime, and interpret the outputs for a whole class of models with **no per-model code**.
 * Everything here is optional: a host uses what it understands and MAY ignore the rest. Paired with
 * `role`, `checksum`, and `byteSize`, a host can decide whether it can run a model *before* downloading
 * it.
 */
export interface ModelIO {
  /** Input tensors and their preprocessing. */
  inputs?: ModelInput[];
  /** Output tensors and their semantics/decoding. */
  outputs?: ModelOutput[];
  /** Path to a labels file bundled in the package (or a `remoteUrl`). */
  labels?: string;
  /** Quantization of the delivered weights. */
  quantization?: Quantization;
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

/** A transition: a code contribution that blends **two** input frames by a `progress` (0→1). */
export interface TransitionContribution {
  id: string;
  name: string;
  entry: string;
  ui?: string;
}

export interface Contributes {
  filters?: FilterContribution[];
  tools?: ToolContribution[];
  commands?: CommandContribution[];
  transitions?: TransitionContribution[];
}

/**
 * A static store-card preview a host can render **without downloading or executing** the package —
 * a LUT swatch, a brush stroke, a shader still. See `spec/repository-api.md` § Static previews.
 */
export interface PreviewRef {
  /** A still image — an in-package path (e.g. `preview/card.png`) or an `https:` URL. */
  image?: string;
  /** An optional short clip for time-based packages (`transition` / `motion` / `video`) — path or `https:` URL. */
  clip?: string;
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

  /**
   * Reverse-DNS ids of the host apps this extension targets (e.g. `["com.hereliesaz.graffitixr"]`).
   * A repository shows an app-scoped package only to a matching app; **absent or empty means the
   * package is global** (available to every app). Scoping is a discovery filter, not access control.
   * See `spec/repository-api.md` § App scoping.
   */
  targetApps?: string[];

  /** A static preview for the store card (see {@link PreviewRef}), surfaced in search responses. */
  preview?: PreviewRef;

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

/** Bits per channel of a {@link Bitmap}. `8` (the default) or `16`. */
export type BitDepth = 8 | 16;

/**
 * An image buffer crossing the host boundary. Straight (non-premultiplied) alpha, RGBA, row-major,
 * tightly packed. Mutated in place on the hot path — see the image-buffer ABI in
 * `spec/capability-model.md`.
 *
 * **Depth is opt-in and defaults to 8.** Regardless of depth the buffer holds 4 channels per pixel,
 * so the element count is always `width * height * 4`; what changes is the element type:
 * - `depth` absent or `8` ⇒ `data` is a `Uint8ClampedArray`, channels `0–255`.
 * - `depth === 16` ⇒ `data` is a `Uint16Array`, channels `0–65535`.
 *
 * The *byte* stride therefore depends on depth (`width * 4 * bytesPerChannel(depth)`), but the
 * element-length invariant is depth-independent. Use {@link maxChannelValue} to scale between depths.
 */
export interface Bitmap {
  data: Uint8ClampedArray | Uint16Array;
  width: number;
  height: number;
  /** Bits per channel; absent ⇒ 8. */
  depth?: BitDepth;
}

/** The effective bit depth of a bitmap (absent ⇒ 8). */
export function bitDepth(bitmap: Pick<Bitmap, "depth">): BitDepth {
  return bitmap.depth ?? 8;
}

/** Bytes per channel for a depth: 1 at 8-bit, 2 at 16-bit. */
export function bytesPerChannel(depth: BitDepth): number {
  return depth === 16 ? 2 : 1;
}

/** The maximum channel value for a depth: 255 at 8-bit, 65535 at 16-bit. */
export function maxChannelValue(depth: BitDepth): number {
  return depth === 16 ? 65535 : 255;
}

/** Channels 0–255 (8-bit reference range). */
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
  /** Allocate a zeroed RGBA bitmap. `depth` defaults to 8 (a `Uint8ClampedArray`). */
  alloc(width: number, height: number, depth?: BitDepth): Bitmap;
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
 * The host's playback clock — read-only. Granted by the `time` capability, present on a **temporal**
 * host (video / motion). It lets an extension animate: the same filter yields different output at
 * different points on the timeline. See `spec/capability-model.md` § Temporal.
 */
export interface TimeApi {
  /** The current playhead position, in milliseconds from the clip/composition start. */
  currentMs(): number;
  /** Total duration of the clip/composition, in milliseconds. */
  durationMs(): number;
  /** Frames per second of the host timeline. */
  fps(): number;
  /** The current frame index (`round(currentMs / 1000 * fps)`), for frame-exact effects. */
  frameIndex(): number;
}

/**
 * A block of PCM audio crossing the boundary. Samples are **32-bit float in `[-1, 1]`**, **interleaved**
 * by channel (`L R L R …` for stereo), so `samples.length === frames * channels`. See the
 * audio-buffer ABI in `spec/capability-model.md`.
 */
export interface AudioBuffer {
  samples: Float32Array;
  /** Samples per second per channel, e.g. 48000. */
  sampleRate: number;
  /** Channel count (1 = mono, 2 = stereo, …). */
  channels: number;
}

/** Read and write the current audio block. Granted by the `audio` capability. */
export interface AudioApi {
  read(): AudioBuffer;
  write(buffer: AudioBuffer): void;
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
  /** The playback clock — present only with the `time` capability (temporal hosts). */
  time: TimeApi;
  /** The audio block — present only with the `audio` capability. */
  audio: AudioApi;
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

/**
 * A transition runs over **two** input frames and writes a blended result. `from` and `to` are the
 * outgoing/incoming frames; `progress` sweeps `0 → 1`; the result is written to `target` (via
 * `bitmap.write`). A temporal host also grants `time` so a transition can read the clock.
 */
export interface TransitionContext extends Host {
  /** The outgoing frame (progress 0). */
  from: Bitmap;
  /** The incoming frame (progress 1). */
  to: Bitmap;
  /** Blend position, `0 → 1`. */
  progress: number;
  /** The layer the blended result is written to. */
  target: LayerRef;
}

export type FilterFn = (ctx: FilterContext) => void | Promise<void>;
export type ToolFn = (ctx: ToolContext) => void | Promise<void>;
export type CommandFn = (ctx: CommandContext) => void | Promise<void>;
export type TransitionFn = (ctx: TransitionContext) => void | Promise<void>;

const KIND: unique symbol = Symbol.for("azphalt.contribution");

export type Contribution<F> = F & {
  readonly [KIND]: "filter" | "tool" | "command" | "transition";
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

/** Declare a transition (two input frames → one blended output). Branded `"transition"`. */
export function defineTransition(fn: TransitionFn): Contribution<TransitionFn> {
  return Object.assign(fn, { [KIND]: "transition" as const });
}

/* ───────────────────── Repository API ───────────────────── */

export interface RepositoryIndex {
  name: string;
  version: string;
  description?: string;
  auth?: {
    type: string;
    url: string;
  };
}

/**
 * A coarse media domain a package operates in, so a host filters browse/search to what it can run
 * (a video/audio host hides paint-only extensions). Derived from a package's asset types +
 * capabilities — see `spec/repository-api.md` § Media domains.
 */
export type MediaDomain = "image" | "video" | "audio" | "3d" | "model" | "font";

export interface PackageSummary {
  id: string;
  name: string;
  author?: string;
  version: string;
  types: string[];
  priceStatus?: "free" | "paid";
  /**
   * Host apps this package is scoped to (reverse-DNS ids). Empty/absent = global (shown to every
   * app). A repository filters browse/search by the requesting app's id — see `spec/repository-api.md`
   * § App scoping.
   */
  targetApps?: string[];

  /* Discovery / ranking metadata — a gallery ranks and previews on these without a download. */
  /** Total served downloads across all versions. */
  downloads?: number;
  /** Average user rating 0–5, if the repository tracks ratings (absent when untracked). */
  rating?: number;
  /** Number of ratings behind `rating` (0 when none / untracked). */
  ratingCount?: number;
  /** Latest-publish instant (ISO-8601), for a `recent` sort. */
  updatedAt?: string;
  /** Size of the latest version's `.azp` container, in bytes. */
  byteSize?: number;
  /** Coarse media domains this package touches (image / video / audio / 3d / model / font). */
  mediaDomains?: MediaDomain[];
  /** A static preview for the store card (no download / execute needed). */
  preview?: PreviewRef;
}

export interface PackageSearchResponse {
  packages: PackageSummary[];
  total: number;
  page: number;
  pages: number;
}
