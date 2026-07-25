/**
 * Publish every `submissions/<id>/` folder to a live registry over its public `POST /api/publish`
 * endpoint — the same unauthenticated, self-serve route any third-party uploader uses (see
 * `app/api/publish/route.ts`). This is the missing half of what `submissions/README.md` already
 * promises ("on merge it's indexed"): a submission PR being merged didn't previously make the
 * package show up anywhere live.
 *
 * Deliberately goes over HTTP rather than connecting to the store directly (contrast
 * `seed.ts`, which uses `createVercelStores` against `DATABASE_URL`/`BLOB_READ_WRITE_TOKEN`):
 * this script needs no store credentials at all, works against any deployment (preview, prod, or
 * `next dev`) by just changing `--base`, and publishes through the exact same validation path a
 * real external submitter's upload would.
 *
 *   pnpm --filter @azphalt/storefront publish-submissions [--base https://www.azphalt.store] [--dir ../../submissions]
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createPrivateKey } from "node:crypto";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { signAzp, writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * The publisher signing key (PKCS#8 PEM Ed25519), from `AZPHALT_PACKAGE_SIGNING_KEY`.
 *
 * Deliberately *not* `AZPHALT_SIGNING_KEY` — that one is the storefront's **entitlement** issuing
 * key (see `lib/catalog.ts`), a different trust role. Conflating them would make every buyer's
 * license token verifiable against the same key that asserts package authorship.
 *
 * Generate one with: `openssl genpkey -algorithm ed25519`, then store the PEM as a repo secret.
 */
const signingKey = process.env.AZPHALT_PACKAGE_SIGNING_KEY?.trim() || undefined;
const signingKeyId = process.env.AZPHALT_PACKAGE_SIGNING_KEY_ID?.trim() || undefined;

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const baseUrl = arg("base", "https://www.azphalt.store").replace(/\/$/, "");
const submissionsDir = resolve(arg("dir", join(__dirname, "..", "..", "..", "submissions")));

/** All files under `dir`, as `/`-separated paths relative to `dir` (no symlink following). */
function walk(dir: string, prefix = ""): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(join(dir, entry.name), rel));
    else if (entry.isFile()) out.push(rel);
  }
  return out;
}

/**
 * Build a submission folder into `.azp` bytes — mirrors `@azphalt/submit-check`'s packaging step —
 * and sign it when a key is configured.
 *
 * Signing here rather than at publish time on the server is the point: per
 * `spec/package-format.md` § Publisher continuity, a host pins the signer's key on first install
 * and rejects any later same-`id` package signed by a different key (or regressing to unsigned).
 * That pin is what stops a third party from shipping an update over an installed extension, and it
 * can only be established by signing *before* the first release reaches a user.
 */
function buildAzp(dir: string): Uint8Array {
  const manifest = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")) as Manifest;
  const license = readFileSync(join(dir, "LICENSE"), "utf8");
  const payload: Record<string, Uint8Array> = {};
  for (const rel of walk(dir)) {
    if (rel === "manifest.json" || rel === "LICENSE") continue;
    payload[rel] = new Uint8Array(readFileSync(join(dir, rel)));
  }
  const { files: _drop, ...clean } = manifest as Manifest & { files?: unknown };
  const { azp } = writeAzp({ manifest: clean, payload, license });
  if (!signingKey) return azp;
  return signAzp(azp, { privateKey: signingKey, ...(signingKeyId ? { keyId: signingKeyId } : {}) });
}

async function publishOne(dir: string): Promise<"published" | "already-published" | "failed"> {
  const id = basename(dir);
  const azp = buildAzp(dir);
  const res = await fetch(`${baseUrl}/api/publish`, {
    method: "POST",
    headers: { "content-type": "application/octet-stream" },
    // Node's fetch (undici) BodyInit typing doesn't accept a raw Uint8Array<ArrayBufferLike> under
    // this lib config; Buffer.from copies into a real Node Buffer, which it does accept — same
    // bytes on the wire either way.
    body: Buffer.from(azp),
  });
  if (res.status === 201) {
    console.log(`publish-submissions: published ${id}`);
    return "published";
  }
  const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  const message = String(body.error ?? "");
  // Idempotent: re-running after a package is already live isn't a failure.
  if (/already published|duplicate version|version already exists/i.test(message)) {
    console.log(`publish-submissions: ${id} already live (${message}) — skipping`);
    return "already-published";
  }
  console.error(`publish-submissions: FAILED to publish ${id}: ${message}`);
  return "failed";
}

async function main(): Promise<void> {
  if (!existsSync(submissionsDir)) {
    console.error(`publish-submissions: no submissions dir at ${submissionsDir}`);
    process.exit(1);
  }
  // Validate the key once, up front: a bad key must fail before anything is published, not
  // halfway through — registry versions are immutable, so a partial run would strand some ids on
  // an unsigned version that can only be replaced by bumping their semver.
  if (signingKey) {
    let type: string | undefined;
    try {
      type = createPrivateKey(signingKey).asymmetricKeyType;
    } catch (e) {
      console.error(`publish-submissions: AZPHALT_PACKAGE_SIGNING_KEY is not a readable private key — ${(e as Error).message}`);
      process.exit(1);
    }
    if (type !== "ed25519") {
      console.error(`publish-submissions: AZPHALT_PACKAGE_SIGNING_KEY must be an ed25519 key (got ${type}); generate one with: openssl genpkey -algorithm ed25519`);
      process.exit(1);
    }
    console.log(`publish-submissions: signing with the configured ed25519 publisher key${signingKeyId ? ` (keyId ${signingKeyId})` : ""}.`);
  } else {
    console.warn(
      "publish-submissions: AZPHALT_PACKAGE_SIGNING_KEY is not set — publishing UNSIGNED. " +
        "Unsigned packages still verify for integrity, but pin no publisher key on first install, " +
        "so hosts cannot enforce publisher continuity on later updates (spec/package-format.md § Publisher continuity).",
    );
  }

  const ids = readdirSync(submissionsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  console.log(`publish-submissions: publishing ${ids.length} submission(s) to ${baseUrl} …`);
  let failures = 0;
  for (const id of ids) {
    const outcome = await publishOne(join(submissionsDir, id));
    if (outcome === "failed") failures++;
  }
  if (failures > 0) {
    console.error(`publish-submissions: ${failures} of ${ids.length} failed.`);
    process.exit(1);
  }
  console.log("publish-submissions: done.");
}

main().catch((e) => {
  console.error("publish-submissions: fatal —", e);
  process.exit(1);
});
