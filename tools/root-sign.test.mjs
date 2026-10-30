// Tests for tools/root-sign.mjs, with a throwaway root generated per run (never the owner's).
import { test } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalEndorsement, signEndorsement, verifyEndorsement } from "./root-sign.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const spki = (k) => k.export({ type: "spki", format: "der" }).toString("base64");
const root = generateKeyPairSync("ed25519");
const rootPub = spki(root.publicKey);
const leaf = spki(generateKeyPairSync("ed25519").publicKey);
const statement = { purpose: "entitlement", publicKey: leaf, notBefore: "2026-01-01T00:00:00Z", notAfter: "2030-01-01T00:00:00Z" };
const at = new Date("2027-01-01T00:00:00Z");

test("canonical statement has a fixed field order and omits an absent notAfter", () => {
  assert.equal(
    canonicalEndorsement({ purpose: "package-catalog", publicKey: "K", notBefore: "2026-01-01T00:00:00Z" }),
    '{"type":"azphalt-root-endorsement","v":1,"purpose":"package-catalog","publicKey":"K","notBefore":"2026-01-01T00:00:00Z"}',
  );
});

test("a valid endorsement verifies; wrong purpose, other key, forgery and expiry do not", () => {
  const e = signEndorsement(statement, root.privateKey);
  const opts = { publicKey: leaf, purpose: "entitlement", now: at, rootPublicKeyB64: rootPub };
  assert.deepEqual(verifyEndorsement(e, opts), { ok: true });
  assert.equal(verifyEndorsement(JSON.stringify(e), opts).ok, true);
  assert.equal(verifyEndorsement(e, { ...opts, purpose: "package-catalog" }).ok, false);
  assert.equal(verifyEndorsement(e, { ...opts, publicKey: spki(generateKeyPairSync("ed25519").publicKey) }).ok, false);
  assert.equal(verifyEndorsement({ ...e, purpose: "package-catalog" }, { ...opts, purpose: "package-catalog" }).ok, false);
  const forged = signEndorsement(statement, generateKeyPairSync("ed25519").privateKey);
  assert.equal(verifyEndorsement(forged, opts).reason, "root signature does not verify");
  assert.equal(verifyEndorsement(e, { ...opts, now: new Date("2031-01-01T00:00:00Z") }).reason, "endorsement has expired");
  assert.equal(verifyEndorsement(e, { ...opts, now: new Date("2025-01-01T00:00:00Z") }).reason, "endorsement is not valid yet");
});

test("the CLI decrypts an encrypted PEM in memory, prints the endorsement, and writes nothing", () => {
  const dir = mkdtempSync(join(tmpdir(), "root-sign-"));
  try {
    const pem = root.privateKey.export({ type: "pkcs8", format: "pem", cipher: "aes-256-cbc", passphrase: "correct horse" });
    const keyPath = join(dir, "azphalt-root.enc.pem");
    writeFileSync(keyPath, pem);
    const run = (pass, extra = []) => spawnSync(process.execPath, [join(here, "root-sign.mjs"), "--key", keyPath, "--purpose", "package-catalog", "--public-key", leaf, "--root-public-key", rootPub, ...extra], { input: pass + "\n", encoding: "utf8" });

    const ok = run("correct horse", ["--not-before", "2026-01-01T00:00:00Z"]);
    assert.equal(ok.status, 0, ok.stderr);
    const e = JSON.parse(ok.stdout);
    assert.equal(verifyEndorsement(e, { publicKey: leaf, purpose: "package-catalog", now: at, rootPublicKeyB64: rootPub }).ok, true);
    assert.equal(e.notAfter, undefined);
    assert.deepEqual(readdirSync(dir), ["azphalt-root.enc.pem"]);

    const wrong = run("nope");
    assert.equal(wrong.status, 1);
    assert.match(wrong.stderr, /could not decrypt/);
    assert.equal(wrong.stdout, "");

    // The default pin is the owner's root, so a throwaway root is refused without the override.
    const notPinned = spawnSync(process.execPath, [join(here, "root-sign.mjs"), "--key", keyPath, "--purpose", "entitlement", "--public-key", leaf], { input: "correct horse\n", encoding: "utf8" });
    assert.equal(notPinned.status, 1);
    assert.match(notPinned.stderr, /not the pinned root key/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
