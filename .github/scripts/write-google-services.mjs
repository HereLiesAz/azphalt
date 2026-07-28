/**
 * Write `apps/storefront-cmp/google-services.json` from the `GOOGLE_SERVICES` secret.
 *
 * Firebase config is a secret, so it cannot be committed. The Gradle build gates the
 * google-services plugin and the Firebase dependencies on this file existing (see
 * `firebaseConfigured` in apps/storefront-cmp/build.gradle.kts), which is what keeps the Android app
 * buildable for anyone without the secret — a fork, a contributor, a local checkout.
 *
 * The interesting part is the package-name check. `google-services.json` describes one Firebase
 * project and the apps registered in it; the plugin fails the build outright when none of them
 * matches the module's `applicationId`. That is a Firebase Console problem, not a repository one, and
 * nothing anyone can do to this tree will fix it — so failing every Android CI run until someone
 * notices is the wrong response. This checks first, and on a mismatch removes the file and warns,
 * leaving a build that still compiles, still runs its tests, and says plainly what is wrong.
 *
 * The `applicationId` is read out of the Gradle file rather than repeated here, so a rename cannot
 * leave this check silently comparing against a package name that no longer exists.
 */
import { readFileSync, writeFileSync, rmSync } from "node:fs";

const CONFIG = "apps/storefront-cmp/google-services.json";
const GRADLE = "apps/storefront-cmp/build.gradle.kts";

const secret = process.env.GOOGLE_SERVICES;
if (!secret) {
  // Not an error: pull requests from forks cannot read secrets, and neither can a fork's own CI.
  console.log("GOOGLE_SERVICES is not set — building without Firebase.");
  process.exit(0);
}

writeFileSync(CONFIG, secret);

let config;
try {
  config = JSON.parse(readFileSync(CONFIG, "utf8"));
} catch (error) {
  // A malformed secret *is* worth failing on: it means whoever set it made a mistake, and the value
  // is one paste away from being correct.
  console.log(`::error::GOOGLE_SERVICES is not valid JSON: ${error.message}`);
  process.exit(1);
}

const gradle = readFileSync(GRADLE, "utf8");
const applicationId = gradle.match(/applicationId\s*=\s*"([^"]+)"/)?.[1];
if (!applicationId) {
  console.log(`::error::could not read applicationId from ${GRADLE}`);
  process.exit(1);
}

const registered = (config.client ?? [])
  .map((client) => client?.client_info?.android_client_info?.package_name)
  .filter(Boolean);

if (registered.includes(applicationId)) {
  console.log(`Firebase configured for ${applicationId}.`);
  process.exit(0);
}

rmSync(CONFIG);
console.log(
  `::warning::GOOGLE_SERVICES has no Android app registered for '${applicationId}' ` +
    `(it has: ${registered.join(", ") || "none"}). Building without Firebase. ` +
    `Add an Android app with that package name in the Firebase console, download the new ` +
    `google-services.json, and replace the GOOGLE_SERVICES secret with its contents.`,
);
