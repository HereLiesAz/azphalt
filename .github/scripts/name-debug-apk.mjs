#!/usr/bin/env node
/**
 * Copy the freshly-built debug APK to a version-named file, after checking it really carries that
 * version.
 *
 * Two things this does that a `cp` in the workflow cannot:
 *
 * 1. **Discovers the file name.** AGP derives it from the Gradle project name, so it is
 *    `storefront-cmp-debug.apk` here rather than the `app-debug.apk` most snippets hardcode — and a
 *    project rename would silently break a literal path. `output-metadata.json`, which AGP writes
 *    beside the APK, is the authority.
 * 2. **Asserts the version.** The artifact must carry the version this CI run bumped to. If it does
 *    not, something read a stale value — a freeze flag in the wrong place, a cached configuration —
 *    and attaching the wrong number to a published release would make `version.properties` a liar
 *    about what shipped. Failing here is cheap; a wrong release tag is forever.
 *
 * Usage: node .github/scripts/name-debug-apk.mjs <expected-version> <destination.apk>
 * Prints the destination path on success.
 */
import { copyFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const APK_DIR = "apps/storefront-cmp/build/outputs/apk/debug";

const [expectedVersion, destination] = process.argv.slice(2);
if (!expectedVersion || !destination) {
  console.error("usage: name-debug-apk.mjs <expected-version> <destination.apk>");
  process.exit(2);
}

const metadataPath = join(APK_DIR, "output-metadata.json");
let element;
try {
  const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
  element = metadata.elements?.[0];
} catch (error) {
  console.error(`::error::could not read ${metadataPath}: ${error.message}`);
  process.exit(1);
}

if (!element?.outputFile) {
  console.error(`::error::${metadataPath} names no output file`);
  process.exit(1);
}

const expectedCode = Number(expectedVersion.split(".")[3]);
const problems = [];
if (element.versionName !== expectedVersion) {
  problems.push(`versionName is '${element.versionName}', expected '${expectedVersion}'`);
}
if (element.versionCode !== expectedCode) {
  problems.push(`versionCode is ${element.versionCode}, expected ${expectedCode}`);
}
if (problems.length) {
  console.error(`::error::the built APK does not match the bumped version — ${problems.join("; ")}`);
  process.exit(1);
}

copyFileSync(join(APK_DIR, element.outputFile), destination);
console.log(`${element.outputFile} → ${destination} (versionName ${element.versionName}, versionCode ${element.versionCode})`);
