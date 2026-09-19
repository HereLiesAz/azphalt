import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [fileArg, sellerId, centsArg, currencyArg = "USD", intervalArg] = process.argv.slice(2);
if (!fileArg || !sellerId || !centsArg) {
  console.error(
    "usage: node apps/storefront-worker/scripts/prepare-paid-listing.mjs <package.azp> <sellerId> <amountCents> [currency] [month|year]"
  );
  process.exit(2);
}

const amountCents = Number(centsArg);
if (!Number.isInteger(amountCents) || amountCents <= 0) {
  throw new Error("amountCents must be a positive integer");
}
if (intervalArg && intervalArg !== "month" && intervalArg !== "year") {
  throw new Error("interval must be month or year");
}

const azpModule = pathToFileURL(resolve("packages/azp/dist/index.js")).href;
const { digest, readAzp, verifyAzp } = await import(azpModule);
const bytes = new Uint8Array(await readFile(resolve(fileArg)));
const verification = verifyAzp(bytes);
if (!verification.ok) {
  throw new Error("package verification failed:\n- " + verification.errors.join("\n- "));
}

const { manifest } = readAzp(bytes);
const listing = {
  packageId: manifest.id,
  sellerId,
  amountCents,
  currency: currencyArg.toUpperCase(),
  ...(intervalArg ? { interval: intervalArg } : {}),
  status: "paused",
  package: {
    version: manifest.version,
    name: manifest.name,
    kind: manifest.kind,
    ...(manifest.description ? { description: manifest.description } : {}),
    ...(manifest.author ? { author: manifest.author } : {}),
    ...(manifest.capabilities?.length ? { capabilities: manifest.capabilities } : {}),
    ...(manifest.targetApps?.length ? { targetApps: manifest.targetApps } : {}),
    ...(manifest.mediaDomains?.length ? { mediaDomains: manifest.mediaDomains } : {}),
    ...(manifest.types?.length ? { types: manifest.types } : {}),
    ...(manifest.maturity ? { maturity: manifest.maturity } : {}),
    ...(manifest.app ? { app: manifest.app } : {}),
    ...(manifest.pack ? { pack: manifest.pack } : {}),
    manifest,
    bytes: bytes.byteLength,
    integrity: digest(bytes),
    updatedAt: new Date().toISOString(),
  },
};

process.stdout.write(JSON.stringify(listing, null, 2) + "\n");
