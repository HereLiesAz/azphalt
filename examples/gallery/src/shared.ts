/**
 * Shared helpers for the example gallery. Every example is an {@link Example}: a manifest (minus the
 * computed `files`), its payload bytes, and — for code examples — a small runnable check. The build
 * script turns each into a real `.azp` via `writeAzp`; the test verifies each and runs the code ones.
 */
import type { Manifest } from "@azphalt/azdk";
import type { SandboxResult, SandboxWorld } from "@azphalt/runtime-wasm";

export const utf8 = (s: string): Uint8Array => new TextEncoder().encode(s);

/** The MIT license text stamped into every example's required `LICENSE` entry. */
export const MIT_LICENSE =
  "MIT License\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of " +
  "this software and associated documentation files (the \"Software\"), to deal in the Software " +
  "without restriction. THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND.\n";

/**
 * A real, minimal 1×1 transparent PNG — a stand-in pixel for raster examples (brush tips, patterns,
 * stamps, small images). The manifest shape is what these examples teach; the bytes are a placeholder.
 */
export const TINY_PNG = new Uint8Array(
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGNgAAIAAAUAAen63NgAAAAASUVORK5CYII=",
    "base64",
  ),
);

/**
 * Build a remote-asset checksum placeholder. Real packaging computes the SHA-256 of the actual file;
 * these examples demonstrate the *header* pattern (a small `.azp` pointing at a remote file), so the
 * digest is illustrative. Vary it by seed so distinct examples don't collide.
 */
export const remoteChecksum = (seed: string): string =>
  "sha256-" + [...seed].reduce((h, c) => (h * 33 + c.charCodeAt(0)) >>> 0, 5381).toString(16).padStart(8, "0").repeat(8).slice(0, 64);

export interface Example {
  /** Output slug → `out/<slug>.azp`, and the example's key in the catalog. */
  slug: string;
  /** One-line description for the readme and test names. */
  summary: string;
  /** The manifest, minus the `files` digest map (computed by `writeAzp`). */
  manifest: Omit<Manifest, "files">;
  /** In-package payload, keyed by the path the manifest references. Empty for all-remote assets. */
  payload?: Record<string, Uint8Array>;
  /** License text (defaults to MIT). */
  license?: string;
  /** For code examples: a world to run against and an assertion over the result. */
  run?: { world: SandboxWorld; assert: (result: SandboxResult) => void };
}

/** Identity helper for type-checked example literals. */
export const example = (e: Example): Example => e;
