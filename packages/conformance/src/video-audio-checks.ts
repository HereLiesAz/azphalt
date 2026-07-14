/**
 * Conformance checks for a **video / audio (temporal) host** — the profile a video editor like
 * Guillotine implements on top of the code-host contract (azphalt #27 item 7). It certifies that a
 * host declares the `time` and `audio` capabilities and the `transitions` contribution kind, honors
 * the float32-interleaved audio-buffer ABI and the two-input transition dispatch, and gates `audio`
 * like any other capability. Mirrors the shape of `asset-checks.ts` / `checks.ts`.
 */
import type { Capability } from "@azphalt/sdk";
import {
  pass,
  fail,
  satisfiesCompat,
  type CheckResult,
  type ConformanceBitmap,
  type ConformanceWorld,
} from "./checks.js";
import * as fx from "./fixtures.js";

/**
 * A declared conformance **profile**. A host advertises which profile(s) it supports so a registry
 * can mark package↔host compatibility instead of leaving it to trial-and-error. Open vocabulary; the
 * blessed core is `image` (paint / asset host), `video-audio` (temporal host), and `companion`
 * (companion-app host — launches an external Android app or PWA over a handoff).
 */
export type HostProfile = "image" | "video-audio" | "companion" | (string & {});

/** A PCM audio block — 32-bit float in `[-1, 1]`, **interleaved** (`samples[f * channels + c]`). */
export interface ConformanceAudio {
  samples: number[];
  sampleRate: number;
  channels: number;
}

/** A {@link ConformanceWorld} plus the temporal surface (`time` clock, current `audio` block). */
export interface TemporalWorld extends ConformanceWorld {
  time?: { currentMs?: number; durationMs?: number; fps?: number };
  audio?: ConformanceAudio | null;
}

/** A {@link TemporalWorld} plus the two-input transition state (frame `from`/`to` + `progress`). */
export interface TransitionWorld extends TemporalWorld {
  from: ConformanceBitmap;
  to: ConformanceBitmap;
  progress: number;
}

/** What a temporal host returns after running a contribution — bitmap, the final audio block, redraws. */
export interface VideoAudioResult {
  bitmap: ConformanceBitmap;
  audio: ConformanceAudio | null;
  redraws: number;
}

/** What capabilities / contribution kinds a host declares support for. */
export interface HostSupport {
  capabilities?: Capability[];
  contributionKinds?: Array<"filters" | "tools" | "commands" | "transitions">;
}

/**
 * The minimum a temporal host exposes for the suite to drive it: run a filter and a transition from
 * `.azp` bytes (the same bytes-in contract as `@azphalt/runtime-wasm`'s `runFilter` / `runTransition`,
 * so that runtime satisfies this structurally), report its API version, and **declare** the profile(s)
 * and capabilities/contribution kinds it supports.
 */
export interface VideoAudioHost {
  runFilter(azp: Uint8Array, world: TemporalWorld, opts?: { id?: string; capabilities?: Capability[] }): Promise<VideoAudioResult>;
  runTransition(azp: Uint8Array, world: TransitionWorld, opts?: { id?: string; capabilities?: Capability[] }): Promise<VideoAudioResult>;
  /** The host API version this host implements, e.g. `"0.1"` — so `compat` can gate. */
  apiVersion?: string;
  /** The conformance profile(s) this host supports (e.g. `["video-audio"]`). */
  profiles?: HostProfile[];
  /** The capabilities and contribution kinds this host declares it can honor. */
  supports?: HostSupport;
}

async function tryRun<T>(fn: () => Promise<T>): Promise<{ result?: T; error?: Error }> {
  try {
    return { result: await fn() };
  } catch (e) {
    return { error: e as Error };
  }
}

const oneByOne: ConformanceBitmap = { data: [0, 0, 0, 0], width: 1, height: 1 };

/** Checklist: the host declares the `time` + `audio` capabilities and the `transitions` contribution. */
export function checkDeclaresTemporalSupport(host: VideoAudioHost): CheckResult {
  const id = "declares-temporal-support";
  const title = "Declares the `time` + `audio` capabilities and the `transitions` contribution kind";
  const caps = new Set(host.supports?.capabilities ?? []);
  const kinds = new Set(host.supports?.contributionKinds ?? []);
  const missing: string[] = [];
  if (!caps.has("time")) missing.push("capability:time");
  if (!caps.has("audio")) missing.push("capability:audio");
  if (!kinds.has("transitions")) missing.push("contribution:transitions");
  return missing.length ? fail(id, title, `host does not declare: ${missing.join(", ")}`) : pass(id, title);
}

/** Checklist: dispatches a transition with the two-input A/B/progress contract and blends correctly. */
export async function checkTransitionDispatch(host: VideoAudioHost): Promise<CheckResult> {
  const id = "transition-dispatch";
  const title = "Dispatches a `transitions` contribution over from/to/progress";
  const from: ConformanceBitmap = { data: [0, 0, 0, 255, 0, 0, 0, 255], width: 2, height: 1 };
  const to: ConformanceBitmap = { data: [200, 100, 50, 255, 40, 80, 120, 255], width: 2, height: 1 };
  const target: ConformanceBitmap = { data: [0, 0, 0, 0, 0, 0, 0, 0], width: 2, height: 1 };
  const { result, error } = await tryRun(() =>
    host.runTransition(fx.transitionAzp(), { params: {}, bitmap: target, from, to, progress: 0.5 }),
  );
  if (error) return fail(id, title, `runTransition threw: ${error.message}`);
  // Linear crossfade at progress 0.5: round(a + (b - a) * 0.5).
  const expected = [100, 50, 25, 255, 20, 40, 60, 255];
  const got = result?.bitmap.data;
  return got && got.length === expected.length && expected.every((v, i) => v === got[i])
    ? pass(id, title)
    : fail(id, title, `expected ${JSON.stringify(expected)} got ${JSON.stringify(got)}`);
}

/** Checklist: honors the float32-interleaved audio-buffer ABI (read → mutate → write round-trips). */
export async function checkAudioAbi(host: VideoAudioHost): Promise<CheckResult> {
  const id = "audio-abi";
  const title = "Honors the float32 interleaved audio-buffer ABI";
  const audio: ConformanceAudio = { samples: [0.1, 0.2, 0.3, 0.4], sampleRate: 48000, channels: 2 };
  const { result, error } = await tryRun(() =>
    host.runFilter(fx.audioAzp(), { params: {}, bitmap: oneByOne, audio }),
  );
  if (error) return fail(id, title, `audio filter threw: ${error.message}`);
  const out = result?.audio;
  if (!out) return fail(id, title, "host returned no audio block");
  if (out.channels !== 2 || out.sampleRate !== 48000) {
    return fail(id, title, `geometry changed: channels=${out.channels} sampleRate=${out.sampleRate}`);
  }
  if (out.samples.length !== 4) return fail(id, title, `frame count changed: ${out.samples.length} samples`);
  // The fixture zeroes channel 1 of each frame: interleaved [L0 R0 L1 R1] → [0.1 0 0.3 0].
  const expected = [0.1, 0, 0.3, 0];
  return expected.every((v, i) => Math.abs(v - out.samples[i]) < 1e-6)
    ? pass(id, title)
    : fail(id, title, `expected ~${JSON.stringify(expected)} got ${JSON.stringify(out.samples)}`);
}

/** Checklist: gates `audio` like any capability — ungranted, `ctx.audio` is absent, not a stub. */
export async function checkAudioCapabilityGating(host: VideoAudioHost): Promise<CheckResult> {
  const id = "audio-capability-gating";
  const title = "An ungranted `audio` capability is absent, not an erroring stub";
  const audio: ConformanceAudio = { samples: [0.1, 0.2], sampleRate: 48000, channels: 2 };
  const { error } = await tryRun(() =>
    host.runFilter(fx.audioUngrantedAzp(), { params: {}, bitmap: oneByOne, audio }),
  );
  return error
    ? pass(id, title, "audio filter failed reaching ungranted `audio`")
    : fail(id, title, "audio filter reached ctx.audio though only params was granted");
}

/** Checklist: declares a `video-audio` profile a registry can match package↔host compatibility on. */
export function checkProfileDeclaration(host: VideoAudioHost): CheckResult {
  const id = "profile-declaration";
  const title = "Declares a `video-audio` conformance profile";
  const profiles = host.profiles ?? [];
  return profiles.includes("video-audio")
    ? pass(id, title, `profiles: ${profiles.join(", ")}`)
    : fail(id, title, `host does not declare the 'video-audio' profile (profiles=${JSON.stringify(profiles)})`);
}

/** Checklist: reports a host API version that satisfies `compat`. */
export function checkTemporalCompat(host: VideoAudioHost): CheckResult {
  const id = "compat-version";
  const title = "Reports a host API version so `compat` can gate";
  if (!host.apiVersion) return fail(id, title, "host does not report an apiVersion");
  return satisfiesCompat(host.apiVersion, ">=0.1")
    ? pass(id, title, `apiVersion ${host.apiVersion} satisfies >=0.1`)
    : fail(id, title, `apiVersion ${host.apiVersion} does not satisfy >=0.1`);
}
