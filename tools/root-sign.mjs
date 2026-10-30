#!/usr/bin/env node
// Offline root signing (spec/repository-api.md § Root endorsements). Plain Node, no dependencies, so
// it runs from a bare checkout on Windows (PowerShell) as well as anywhere else.
//
//   node tools/root-sign.mjs --key <azphalt-root.enc.pem> --purpose entitlement|package-catalog \
//        --public-key <base64 SPKI> [--not-before <ISO>] [--not-after <ISO>]
//
// It decrypts the encrypted root PEM in memory only (createPrivateKey with the passphrase it prompts
// for), signs the canonical endorsement statement, checks the result against the pinned root public
// key, and prints the endorsement as one JSON line on stdout. Prompts and the summary go to stderr, so
// stdout can be piped straight into `wrangler secret put`. Nothing is ever written to disk.

import { createPrivateKey, createPublicKey, sign, verify } from "node:crypto";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

/** The owner's root public key (Ed25519, base64 SPKI DER), pinned in every host that enforces endorsements. */
export const ROOT_PUBLIC_KEY_SPKI_B64 = "MCowBQYDK2VwAyEAjVS5e0Si26c3lzFyqnuW7VwMUmnwRF5AmBUBzYwrh6M=";
export const ENDORSEMENT_TYPE = "azphalt-root-endorsement";
export const PURPOSES = ["entitlement", "package-catalog"];

const ISO_SECONDS = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

/** Second-precision UTC ISO-8601 (`2026-10-30T00:00:00Z`), the only time format an endorsement uses. */
export function isoSeconds(date) {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function spkiEd25519(b64) {
  if (typeof b64 !== "string" || !/^[A-Za-z0-9+/]+=*$/.test(b64)) throw new Error("public key must be base64 SPKI DER");
  const key = createPublicKey({ key: Buffer.from(b64, "base64"), format: "der", type: "spki" });
  if (key.asymmetricKeyType !== "ed25519") throw new Error("public key must be an Ed25519 key");
  return key;
}

/**
 * The exact bytes the root signs: compact JSON with these fields in this order, `notAfter` omitted
 * when absent. Every implementation (the Graffux host's RootEndorsements.canonical) builds the same.
 */
export function canonicalEndorsement(s) {
  const o = { type: ENDORSEMENT_TYPE, v: 1, purpose: s.purpose, publicKey: s.publicKey, notBefore: s.notBefore };
  if (s.notAfter !== undefined && s.notAfter !== null) o.notAfter = s.notAfter;
  return JSON.stringify(o);
}

function checkStatement(s) {
  if (!PURPOSES.includes(s.purpose)) throw new Error(`purpose must be one of ${PURPOSES.join(", ")}`);
  spkiEd25519(s.publicKey);
  if (!ISO_SECONDS.test(s.notBefore ?? "")) throw new Error("notBefore must look like 2026-10-30T00:00:00Z");
  if (s.notAfter != null) {
    if (!ISO_SECONDS.test(s.notAfter)) throw new Error("notAfter must look like 2028-10-30T00:00:00Z");
    if (Date.parse(s.notAfter) <= Date.parse(s.notBefore)) throw new Error("notAfter must be after notBefore");
  }
}

/** Sign a statement with a decrypted root KeyObject. Returns the endorsement object. */
export function signEndorsement(statement, rootPrivateKey) {
  checkStatement(statement);
  if (rootPrivateKey.asymmetricKeyType !== "ed25519") throw new Error("the root key must be an Ed25519 key");
  const signature = sign(null, Buffer.from(canonicalEndorsement(statement), "utf8"), rootPrivateKey).toString("base64");
  const out = { type: ENDORSEMENT_TYPE, v: 1, purpose: statement.purpose, publicKey: statement.publicKey, notBefore: statement.notBefore };
  if (statement.notAfter != null) out.notAfter = statement.notAfter;
  out.signature = signature;
  return out;
}

/**
 * Does [endorsement] vouch for [publicKey] for [purpose] at [now], signed by [rootPublicKeyB64]?
 * Returns `{ ok: true }` or `{ ok: false, reason }`. Mirrors the host-side check.
 */
export function verifyEndorsement(endorsement, { publicKey, purpose, now = new Date(), rootPublicKeyB64 = ROOT_PUBLIC_KEY_SPKI_B64 }) {
  try {
    const e = typeof endorsement === "string" ? JSON.parse(endorsement) : endorsement;
    if (!e || e.type !== ENDORSEMENT_TYPE || e.v !== 1) return { ok: false, reason: "not a v1 root endorsement" };
    if (e.publicKey !== publicKey) return { ok: false, reason: "endorsement is for another key" };
    if (e.purpose !== purpose) return { ok: false, reason: `endorsed for ${e.purpose}, not ${purpose}` };
    if (typeof e.signature !== "string") return { ok: false, reason: "endorsement has no signature" };
    const valid = verify(null, Buffer.from(canonicalEndorsement(e), "utf8"), spkiEd25519(rootPublicKeyB64), Buffer.from(e.signature, "base64"));
    if (!valid) return { ok: false, reason: "root signature does not verify" };
    const t = now.getTime();
    if (!(t >= Date.parse(e.notBefore))) return { ok: false, reason: "endorsement is not valid yet" };
    if (e.notAfter != null && !(t < Date.parse(e.notAfter))) return { ok: false, reason: "endorsement has expired" };
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: `malformed endorsement: ${err.message}` };
  }
}

/** Read a passphrase without echoing it (raw mode on a console, including Windows), or a line from piped stdin. */
function readPassphrase(prompt) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    process.stderr.write(prompt);
    if (!stdin.isTTY) {
      let buf = "";
      stdin.setEncoding("utf8");
      stdin.on("data", (d) => (buf += d));
      stdin.on("end", () => resolve(buf.replace(/\r?\n[\s\S]*$/, "")));
      stdin.on("error", reject);
      return;
    }
    let value = "";
    stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    stdin.resume();
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.off("data", onData);
          process.stderr.write("\n");
          resolve(value);
          return;
        }
        if (ch === "\u0003") {
          stdin.setRawMode(false);
          process.stderr.write("\n");
          reject(new Error("cancelled"));
          return;
        }
        if (ch === "\u0008" || ch === "\u007f") value = value.slice(0, -1);
        else value += ch;
      }
    };
    stdin.on("data", onData);
  });
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) throw new Error(`unexpected argument: ${a}`);
    const name = a.slice(2);
    if (name === "help") { args.help = true; continue; }
    const value = argv[++i];
    if (value === undefined) throw new Error(`--${name} needs a value`);
    args[name] = value;
  }
  return args;
}

const USAGE = `Usage: node tools/root-sign.mjs --key <azphalt-root.enc.pem> --purpose entitlement|package-catalog
                              --public-key <base64 SPKI> [--not-before <ISO>] [--not-after <ISO>]
Prints the endorsement JSON on stdout; prompts for the root passphrase on the console.`;

async function main(argv) {
  const args = parseArgs(argv);
  if (args.help) { process.stderr.write(USAGE + "\n"); return 0; }
  const known = new Set(["key", "purpose", "public-key", "not-before", "not-after", "root-public-key"]);
  for (const k of Object.keys(args)) if (!known.has(k)) throw new Error(`unknown option --${k}\n${USAGE}`);
  if (!args.key || !args.purpose || !args["public-key"]) throw new Error(USAGE);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const statement = {
    purpose: args.purpose,
    publicKey: args["public-key"].trim(),
    notBefore: args["not-before"] ?? isoSeconds(today),
    ...(args["not-after"] ? { notAfter: args["not-after"] } : {}),
  };
  checkStatement(statement); // fail before asking for the passphrase

  const rootPublicKeyB64 = args["root-public-key"] ?? ROOT_PUBLIC_KEY_SPKI_B64;
  const pem = readFileSync(args.key, "utf8");
  const passphrase = process.env.AZPHALT_ROOT_PASSPHRASE ?? (await readPassphrase("Root key passphrase: "));
  let root;
  try {
    root = createPrivateKey({ key: pem, format: "pem", passphrase });
  } catch {
    throw new Error("could not decrypt the root key (wrong passphrase, or not an encrypted PEM)");
  }
  const derived = createPublicKey(root).export({ type: "spki", format: "der" }).toString("base64");
  if (derived !== rootPublicKeyB64) {
    throw new Error(`this is not the pinned root key: it is ${derived}, hosts pin ${rootPublicKeyB64}`);
  }

  const endorsement = signEndorsement(statement, root);
  const check = verifyEndorsement(endorsement, { publicKey: statement.publicKey, purpose: statement.purpose, now: new Date(Date.parse(statement.notBefore)), rootPublicKeyB64 });
  if (!check.ok) throw new Error(`self-check failed: ${check.reason}`);

  process.stderr.write(
    `Endorsed ${statement.publicKey} for ${statement.purpose}, valid from ${statement.notBefore}` +
      (statement.notAfter ? ` until ${statement.notAfter}` : " with no expiry") + ".\n",
  );
  process.stdout.write(JSON.stringify(endorsement) + "\n");
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (err) => { process.stderr.write(`root-sign: ${err.message}\n`); process.exit(1); },
  );
}
