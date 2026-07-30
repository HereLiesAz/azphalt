#!/usr/bin/env node
/**
 * Read and bump `version.properties` — the single source of truth for the azphalt version.
 *
 * The format is `a.b.c.d`:
 *
 *   a  major   The owner's to increment. Nothing here does it without being asked explicitly.
 *   b  minor   A feature or function was added. Resets `c` to 0.
 *   c  patch   Bumped on every compile.
 *   d  build   Bumped on every compile, and never reset — so it is a strictly increasing count
 *              of builds over the life of the project. This is what Android's `versionCode`
 *              uses, which Play requires to increase monotonically and forever.
 *
 * This is the **only** writer of that file. The Gradle build shells out to it rather than
 * reimplementing the increment, so the file's format can never drift between the two: there is
 * one place that decides what a bumped version looks like.
 *
 * Usage:
 *   node tools/version.mjs print            → 0.1.2.7
 *   node tools/version.mjs print --code      → 7          (Android versionCode)
 *   node tools/version.mjs bump              → bump patch + build   (every compile)
 *   node tools/version.mjs bump --minor      → bump minor, reset patch, bump build
 *   node tools/version.mjs bump --major      → bump major, reset minor + patch, bump build
 *   node tools/version.mjs check             → validate, exit non-zero if malformed
 *
 * `bump` prints the new version on stdout and nothing else, so callers can capture it.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** The repository root, resolved from this file rather than from the caller's cwd. */
export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Path to the version file. */
export const versionFile = join(repoRoot, "version.properties");

const FIELDS = ["major", "minor", "patch", "build"];

/**
 * The file's own header, rewritten on every save.
 *
 * The file is regenerated rather than patched in place so that a bump is always a four-line diff
 * and never reformats or drops the explanation above the numbers.
 */
const HEADER = `# The single source of truth for the azphalt version. Format: a.b.c.d
#
#   a  major   Only the project owner increments this. Nothing automated ever touches it.
#   b  minor   Incremented when a feature or a function is added. Resets c to 0.
#   c  patch   Incremented automatically on every compile.
#   d  build   Incremented automatically on every compile. Never resets, ever.
#
# Everything that has a version reads it from here: the Android app's versionName and
# versionCode, the Gradle project version, the desktop installers, and the version the web
# store reports. Nothing hardcodes a version anywhere else.
#
# This file is written by \`tools/version.mjs\` and by nothing else. Do not hand-edit it —
# use the commands in RELEASING.md § Versioning so the four numbers stay consistent.
`;

/** Parse `version.properties` into `{major, minor, patch, build}`. Throws if malformed. */
export function readVersion(file = versionFile) {
  const text = readFileSync(file, "utf8");
  const parsed = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) throw new Error(`${file}: not a key=value line: ${raw}`);
    parsed[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  const version = {};
  for (const field of FIELDS) {
    const value = parsed[field];
    if (value === undefined) throw new Error(`${file}: missing '${field}'`);
    // Deliberately strict. A silently-coerced NaN here would ship an app whose versionCode is
    // garbage, and Play accepts a versionCode exactly once — there is no taking it back.
    if (!/^\d+$/.test(value)) throw new Error(`${file}: '${field}' must be a non-negative integer, got '${value}'`);
    version[field] = Number(value);
  }
  return version;
}

/** `{0,1,2,7}` → `"0.1.2.7"`. */
export function formatVersion(v) {
  return FIELDS.map((f) => v[f]).join(".");
}

/** Write the four numbers back, regenerating the header. */
export function writeVersion(v, file = versionFile) {
  const body = FIELDS.map((f) => `${f}=${v[f]}`).join("\n");
  writeFileSync(file, `${HEADER}${body}\n`);
  return v;
}

/**
 * Bump and save.
 *
 * `build` increments for every kind, including major and minor — it counts compiles, and a
 * feature release is still a compile. It is the one number that never goes backwards or resets.
 */
export function bumpVersion(kind = "patch", file = versionFile) {
  const v = readVersion(file);
  if (kind === "major") {
    v.major += 1;
    v.minor = 0;
    v.patch = 0;
  } else if (kind === "minor") {
    v.minor += 1;
    v.patch = 0;
  } else if (kind === "patch") {
    v.patch += 1;
  } else {
    throw new Error(`unknown bump kind '${kind}' (expected major, minor or patch)`);
  }
  v.build += 1;
  return writeVersion(v, file);
}

// --- CLI ------------------------------------------------------------------------------------
//
// Only when run directly. Importing this module (next.config.mjs does) must not bump anything.

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const [command = "print", ...flags] = process.argv.slice(2);
  try {
    if (command === "print") {
      const v = readVersion();
      console.log(flags.includes("--code") ? String(v.build) : formatVersion(v));
    } else if (command === "bump") {
      const kind = flags.includes("--major") ? "major" : flags.includes("--minor") ? "minor" : "patch";
      console.log(formatVersion(bumpVersion(kind)));
    } else if (command === "check") {
      console.log(`${formatVersion(readVersion())} ok`);
    } else {
      console.error(`unknown command '${command}' (expected print, bump or check)`);
      process.exit(2);
    }
  } catch (error) {
    console.error(String(error.message ?? error));
    process.exit(1);
  }
}
