/**
 * Canonical `.azp` fixtures the conformance suite runs a host through. Each is a real package built
 * with `@azphalt/azp` `writeAzp`, so it verifies like any shipped extension. The filter modules are
 * plain ES modules written against `@azphalt/sdk` — exactly what a `runtime: "js"` host loads.
 */
import { writeAzp, signAzp, countersign, digest, verifyAzp, verifyTrust } from "@azphalt/azp";
import { createPrivateKey, createPublicKey, sign as cryptoSign } from "node:crypto";
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

/* ─────────────── language-neutral conformance fixtures (issue #32) ───────────────
 *
 * A fixed, versioned set of binary `.azp` fixtures + expected verify/trust outcomes, so a host in
 * ANY language (Kotlin, Swift, Rust) can assert byte-for-byte conformance without a JS toolchain.
 * `emit-fixtures.ts` writes these to `conformance/fixtures/` and CI fails on any diff — so the set
 * stays an emitted artifact of this package, never hand-edited.
 *
 * DETERMINISM is mandatory (the CI diff-check depends on it): signing uses FIXED keys derived from
 * constant seeds (never `generateSigningKey`'s random keys), and every archive rides `@azphalt/azp`'s
 * `EPOCH` timestamp (via `writeAzp`/`signAzp`/`countersign`) or the zero-mtime {@link storedZip}, so
 * the emitted bytes are reproducible in every environment.
 */

/** A deterministic Ed25519 test key derived from a constant 32-byte seed. NEVER use for real signing. */
export interface FixtureKey {
  keyId: string;
  /** PKCS8 PEM private key. */
  privateKey: string;
  /** Base64 SPKI public key. */
  publicKey: string;
  /** The constant seed, hex — so any language can re-derive the same key. */
  seedHex: string;
}

// PKCS8 DER prefix for an Ed25519 private key; the 32-byte raw seed follows. Prepending it to a fixed
// seed yields a deterministic key without RNG — the whole point of reproducible fixtures.
const PKCS8_ED25519_PREFIX = Buffer.from("302e020100300506032b657004220420", "hex");

function keyFromSeed(seedByte: number, keyId: string): FixtureKey {
  const seed = Buffer.alloc(32, seedByte);
  const priv = createPrivateKey({ key: Buffer.concat([PKCS8_ED25519_PREFIX, seed]), format: "der", type: "pkcs8" });
  return {
    keyId,
    privateKey: priv.export({ type: "pkcs8", format: "pem" }).toString(),
    publicKey: Buffer.from(createPublicKey(priv).export({ type: "spki", format: "der" })).toString("base64"),
    seedHex: seed.toString("hex"),
  };
}

/** The fixed conformance author key (seed = 32×0x01). */
export const AUTHOR_KEY: FixtureKey = keyFromSeed(0x01, "conformance-author");
/** The fixed conformance registry key (seed = 32×0x02) — the counter-signing authority. */
export const REGISTRY_KEY: FixtureKey = keyFromSeed(0x02, "conformance-registry");

/**
 * The trust store the fixtures are evaluated against: it trusts ONLY the registry key. So `signed-valid`
 * (author-signed) is untrusted — the author key isn't in the store — while `countersigned-1hop` is
 * trusted transitively through the registry's counter-signature. One store exercises both branches.
 */
export const TRUST_STORE = { keys: [{ publicKey: REGISTRY_KEY.publicKey, label: "conformance-registry" }] };

// ── a minimal, deterministic STORED-zip writer ──────────────────────────────────────────────────
// The adversarial fixtures (unlisted payload, digest mismatch, tampered manifest, duplicate entry)
// can't be produced by `writeAzp` — it digests whatever it's given and can't emit a duplicate name.
// This hand-rolls an uncompressed ZIP with zeroed timestamps, so it stays reproducible and needs no
// new dependency (writing raw ZIP is a few dozen bytes of headers).

function crc32(buf: Uint8Array): number {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (~c) >>> 0;
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
  let n = 0;
  for (const p of parts) n += p.length;
  const out = new Uint8Array(n);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

/** Build an uncompressed (STORED) ZIP from ordered `[name, bytes]` entries — duplicate names allowed. */
function storedZip(entries: Array<[string, Uint8Array]>): Uint8Array {
  const te = new TextEncoder();
  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;
  for (const [name, data] of entries) {
    const nb = te.encode(name);
    const crc = crc32(data);
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true); // local file header signature
    lh.setUint16(4, 20, true); // version needed
    lh.setUint16(10, 0, true); // method = stored
    lh.setUint32(14, crc, true);
    lh.setUint32(18, data.length, true); // compressed size
    lh.setUint32(22, data.length, true); // uncompressed size
    lh.setUint16(26, nb.length, true); // name length
    const local = concatBytes([new Uint8Array(lh.buffer), nb, data]);
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true); // central dir header signature
    ch.setUint16(4, 20, true); // version made by
    ch.setUint16(6, 20, true); // version needed
    ch.setUint16(10, 0, true); // method = stored
    ch.setUint32(16, crc, true);
    ch.setUint32(20, data.length, true);
    ch.setUint32(24, data.length, true);
    ch.setUint16(28, nb.length, true);
    ch.setUint32(42, offset, true); // local header offset
    const central = concatBytes([new Uint8Array(ch.buffer), nb]);
    locals.push(local);
    centrals.push(central);
    offset += local.length;
  }
  const localBuf = concatBytes(locals);
  const centralBuf = concatBytes(centrals);
  const eocd = new DataView(new ArrayBuffer(22));
  eocd.setUint32(0, 0x06054b50, true); // end of central dir signature
  eocd.setUint16(8, entries.length, true); // entries on this disk
  eocd.setUint16(10, entries.length, true); // total entries
  eocd.setUint32(12, centralBuf.length, true); // central dir size
  eocd.setUint32(16, localBuf.length, true); // central dir offset
  return concatBytes([localBuf, centralBuf, new Uint8Array(eocd.buffer)]);
}

/** Serialize a manifest/signature object exactly as `@azphalt/azp` does (2-space JSON + trailing NL). */
function canonicalJson(obj: unknown): Uint8Array {
  return enc(JSON.stringify(obj, null, 2) + "\n");
}

/** Sort a name→bytes map into the same entry order `writeAzp` uses (lexicographic), for reproducibility. */
function sortedEntries(rec: Record<string, Uint8Array>): Array<[string, Uint8Array]> {
  return Object.keys(rec)
    .sort()
    .map((k) => [k, rec[k]] as [string, Uint8Array]);
}

const LICENSE_BYTES = enc("MIT License");
const LUT_BYTES = enc('TITLE "Teal"\nLUT_3D_SIZE 2\n');

/** A well-formed asset package, Ed25519-signed by {@link AUTHOR_KEY}. Signature valid; author untrusted. */
export function signedValidAzp(): Uint8Array {
  return signAzp(assetAzp(), { privateKey: AUTHOR_KEY.privateKey, keyId: AUTHOR_KEY.keyId });
}

/** {@link signedValidAzp}, then counter-signed by {@link REGISTRY_KEY} — trusted transitively (1 hop). */
export function countersigned1hopAzp(): Uint8Array {
  return countersign(signedValidAzp(), { registryPrivateKey: REGISTRY_KEY.privateKey, keyId: REGISTRY_KEY.keyId });
}

/**
 * A signed package whose `manifest.json` was altered AFTER signing: the signature is over the original
 * manifest bytes, but a mutated manifest is stored, so the signature no longer verifies. The `files`
 * map is unchanged, so payload integrity still holds — the ONLY failure is the signature.
 */
export function signedTamperedManifestAzp(): Uint8Array {
  const files = { LICENSE: digest(LICENSE_BYTES), "assets/grade.cube": digest(LUT_BYTES) };
  const good = {
    azphalt: "0.1",
    id: "com.azphalt.conformance.tampered",
    name: "Signed",
    version: "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    files,
  };
  const goodBytes = canonicalJson(good);
  const signature = cryptoSign(null, Buffer.from(goodBytes), createPrivateKey(AUTHOR_KEY.privateKey));
  const sigBytes = canonicalJson({
    alg: "ed25519",
    publicKey: AUTHOR_KEY.publicKey,
    keyId: AUTHOR_KEY.keyId,
    signature: Buffer.from(signature).toString("base64"),
  });
  // Mutate a non-`files` field so integrity still holds but the signed bytes no longer match.
  const badBytes = canonicalJson({ ...good, name: "Signed (tampered after signing)" });
  return storedZip(
    sortedEntries({
      LICENSE: LICENSE_BYTES,
      "assets/grade.cube": LUT_BYTES,
      "manifest.json": badBytes,
      "signature.json": sigBytes,
    }),
  );
}

/** A package carrying a payload file with NO digest in `manifest.files` — a host must reject it. */
export function unlistedPayloadAzp(): Uint8Array {
  const files = { LICENSE: digest(LICENSE_BYTES), "assets/grade.cube": digest(LUT_BYTES) };
  const manifest = {
    azphalt: "0.1",
    id: "com.azphalt.conformance.unlisted",
    name: "Unlisted Payload",
    version: "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    files,
  };
  return storedZip(
    sortedEntries({
      LICENSE: LICENSE_BYTES,
      "assets/grade.cube": LUT_BYTES,
      "extra.txt": enc("this file has no digest in manifest.files"),
      "manifest.json": canonicalJson(manifest),
    }),
  );
}

/** A package whose payload bytes don't match their `manifest.files` digest — a host must reject it. */
export function digestMismatchAzp(): Uint8Array {
  // `files` records the digest of the ORIGINAL LUT, but different bytes are stored.
  const files = { LICENSE: digest(LICENSE_BYTES), "assets/grade.cube": digest(LUT_BYTES) };
  const manifest = {
    azphalt: "0.1",
    id: "com.azphalt.conformance.mismatch",
    name: "Digest Mismatch",
    version: "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    files,
  };
  return storedZip(
    sortedEntries({
      LICENSE: LICENSE_BYTES,
      "assets/grade.cube": enc('TITLE "Swapped"\nLUT_3D_SIZE 2\n'),
      "manifest.json": canonicalJson(manifest),
    }),
  );
}

/**
 * Two ZIP entries share a name (`assets/dup.txt`) with different content — a ZIP-confusion vector: one
 * parser verifies the first copy while another runs the second. A hardened host MUST reject the archive
 * rather than silently pick one copy.
 */
export function duplicateEntryAzp(): Uint8Array {
  const first = enc("one");
  const files = { LICENSE: digest(LICENSE_BYTES), "assets/dup.txt": digest(first) };
  const manifest = {
    azphalt: "0.1",
    id: "com.azphalt.conformance.duplicate",
    name: "Duplicate Entry",
    version: "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    files,
  };
  // Deliberately unsorted so the duplicate name appears twice, back to back.
  return storedZip([
    ["LICENSE", LICENSE_BYTES],
    ["assets/dup.txt", first],
    ["assets/dup.txt", enc("two")],
    ["manifest.json", canonicalJson(manifest)],
  ]);
}

/** One entry in the language-neutral fixture set: a stable name, a description, and the `.azp` bytes. */
export interface ConformanceFixture {
  /** File base name (the emitted file is `<name>.azp`). */
  name: string;
  description: string;
  bytes: Uint8Array;
}

/**
 * The canonical, ordered fixture set published to `conformance/fixtures/` (issue #32). Every host must
 * reproduce `expectations.json` from these exact bytes + `trust-keys.json`.
 */
export function conformanceFixtures(): ConformanceFixture[] {
  return [
    { name: "valid-asset", description: "A well-formed asset package (a .cube LUT). Integrity holds; unsigned.", bytes: assetAzp() },
    { name: "valid-code-unsigned", description: "A well-formed code (filter) package. Integrity holds; unsigned.", bytes: validFilterAzp() },
    { name: "signed-valid", description: "The valid asset package, Ed25519-signed by the conformance author key. Signature valid; the author key is not in the trust store.", bytes: signedValidAzp() },
    { name: "signed-tampered-manifest", description: "A signed package whose manifest.json was altered after signing — payload integrity holds, but the signature no longer verifies.", bytes: signedTamperedManifestAzp() },
    { name: "countersigned-1hop", description: "signed-valid, then counter-signed by the registry key (one hop). Trusted transitively via the registry in the trust store.", bytes: countersigned1hopAzp() },
    { name: "unsafe-path", description: "Carries a payload path that escapes the package ('..'). A host must reject the unsafe path.", bytes: unsafePathAzp() },
    { name: "unlisted-payload", description: "Carries a payload file with no digest in manifest.files. A host must reject the unlisted entry.", bytes: unlistedPayloadAzp() },
    { name: "digest-mismatch", description: "A payload file's bytes don't match its manifest.files digest. A host must reject it.", bytes: digestMismatchAzp() },
    { name: "duplicate-entry", description: "Two ZIP entries share a name with different content (ZIP confusion). A hardened host must reject the archive.", bytes: duplicateEntryAzp() },
  ];
}

/** The expected verify + trust outcome for one fixture — the shape written into `expectations.json`. */
export interface FixtureExpectation {
  verify: { ok: boolean; signed: boolean; errors: string[] };
  /** Signed AND no signature-related verify error was raised. */
  signatureValid: boolean;
  trust: { ok: boolean; signed: boolean; trusted: boolean; reason: string; viaRegistryPublicKey?: string };
}

/**
 * Compute a fixture's expected outcome by running the `@azphalt/azp` reference against {@link TRUST_STORE}.
 * Shared by the emitter and the determinism test so `expectations.json` has ONE source of truth.
 */
export function evaluateFixture(bytes: Uint8Array): FixtureExpectation {
  const verify = verifyAzp(bytes);
  const trust = verifyTrust(bytes, TRUST_STORE);
  return {
    verify: { ok: verify.ok, signed: verify.signed, errors: verify.errors },
    signatureValid: verify.signed && !verify.errors.some((e) => /signature/i.test(e)),
    trust: {
      ok: trust.ok,
      signed: trust.signed,
      trusted: trust.trusted,
      reason: trust.reason,
      ...(trust.viaRegistryPublicKey ? { viaRegistryPublicKey: trust.viaRegistryPublicKey } : {}),
    },
  };
}
