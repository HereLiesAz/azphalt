/**
 * Build the store's catalog from `registry/sources.json` — the git-committed lockfile that says
 * exactly which extensions this store serves and from which commit.
 *
 * For every pinned source this fetches the repo tarball **at its exact commit sha**, packs
 * `code/ ui/ assets/` + `LICENSE` + `manifest.json` into a `.azp` via `writeAzp`, signs it when
 * `AZPHALT_PACKAGE_SIGNING_KEY` is set, and writes the bytes to `registry/packages/`. Those bytes
 * are committed, and the deployment serves them and nothing else.
 *
 * Two folder sources feed the same catalog alongside the pinned ones: `registry/local/` (first-party
 * headers) and `submissions/` (third-party submissions that have been reviewed and merged). Both are
 * built and signed here rather than pushed to a live registry, so there is one publish path and it
 * always leaves a reviewable commit.
 *
 * ## Why this exists rather than a database
 *
 * The registry only ever needed a database because publishing happened at **runtime**, over
 * `POST /api/publish` — one HTTP request, landing in one serverless instance's memory. That is the
 * only reason durable storage was required, and it is why an unbacked deployment silently lost every
 * package it accepted.
 *
 * Publishing at **build time** removes the requirement entirely. The catalog is baked into the
 * deployment artifact, so every instance reconstructs an identical catalog on cold start and there is
 * no write to lose. Durability comes from git, which is a stronger guarantee than a database gives:
 * the store's contents are a reviewable diff, reproducible from source, and impossible to change
 * without a commit.
 *
 * ## Integrity
 *
 * `integrity` in the lockfile is the sha256 of the **unsigned** `.azp` (a signature is a detached
 * addition, so signing does not perturb it). A mismatch fails the build — if the upstream repo's
 * content at a pinned sha ever produces different bytes, that is either a packaging change or
 * tampering, and both should stop a deploy rather than quietly ship. `--update` re-pins deliberately.
 *
 * ## Usage
 *
 *   pnpm --filter @azphalt/storefront build-catalog            # build + verify against the lockfile
 *   pnpm --filter @azphalt/storefront build-catalog --update   # re-pin integrity (and refs, with --latest)
 *   pnpm --filter @azphalt/storefront build-catalog --latest    # move every ref to its default branch head
 *   pnpm --filter @azphalt/storefront build-catalog --only com.hereliesaz.azphalt.timecode
 */
import { createHash, createPrivateKey } from "node:crypto";
import { createGunzip } from "node:zlib";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import tar from "tar-stream";
import { signAzp, writeAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const registryDir = resolve(__dirname, "..", "registry");
const packagesDir = join(registryDir, "packages");
const lockPath = join(registryDir, "sources.json");

/**
 * First-party packages authored in this repo rather than pulled from an extension repo.
 *
 * Packs, companion-app headers and MCP headers are all *header-only* — a manifest, a LICENSE, and no
 * payload — so giving each one its own GitHub repo to be pinned from would be ceremony around a
 * single JSON file. They live here instead, and are built into the same catalog by the same code
 * path, so they get the same verification and land in the same reviewable diff.
 *
 * Each is `local/<package-id>/` containing `manifest.json` + `LICENSE` (+ optional `assets/`) — the
 * same folder shape as a merged submission (see {@link submissionsDir}), and built by the same code.
 */
const localDir = join(registryDir, "local");
/**
 * Merged third-party submissions (`submissions/README.md`).
 *
 * Built into the baked catalog rather than pushed to a live registry over `POST /api/publish`. That
 * runtime path is what `registry-sync.yml` exists to forbid — "no runtime write path that can put a
 * package into the store without a commit" — and in practice it published nothing at all, because a
 * deployment without durable storage correctly refuses a write it cannot keep. Building here means a
 * merged submission reaches the store the same way everything else does: as reviewable bytes in a
 * signed catalog.
 */
const submissionsDir = resolve(__dirname, "..", "..", "..", "submissions");

/**
 * The only directories whose contents become package payload.
 *
 * Deliberately an allowlist, not a denylist. An extension repo is a working repo — it carries
 * `build.js`, `package.json`, a README, tests, `node_modules/`, CI config. Packing "everything
 * except a few known-bad names" would put all of that inside the `.azp` and make the shipped bytes
 * depend on whatever incidental files happened to be checked in. The allowlist is what makes the
 * output a function of the extension's actual content.
 */
const PAYLOAD_DIRS = ["code/", "ui/", "assets/"];

/** A lockfile entry: one extension, pinned to one commit. */
interface Source {
  id: string;
  repo: string;
  ref: string;
  version: string;
  integrity?: string;
  /**
   * Repo-relative subdirectory holding this package's `manifest.json` + `LICENSE` (+ `assets/`),
   * for a repo that ships several brush/asset packages side by side rather than one at its root
   * (e.g. `brushes/fat-cap`). Absent = the package lives at the repo root, as usual.
   */
  path?: string;
}

interface Lock {
  "//"?: string[];
  sources: Source[];
}

const args = process.argv.slice(2);
const has = (flag: string) => args.includes(`--${flag}`);
const opt = (name: string): string | undefined => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const update = has("update");
const latest = has("latest");
const only = opt("only");

/**
 * Verify without writing: rebuild every package and confirm its `integrity` still matches the
 * lockfile, then exit.
 *
 * This is the check a deploy wants, and comparing the built `.azp` **bytes** to the committed ones
 * is not — because signing changes the bytes. Configure the signing key and a byte comparison starts
 * failing against a catalog that was committed unsigned, which reads as "the catalog was tampered
 * with" when nothing is wrong. `integrity` is the digest of the *unsigned* package precisely so it
 * is signature-agnostic, so checking it answers the real question: does this content still come from
 * the commit the lockfile pins?
 */
const check = has("check");

const signingKey = process.env.AZPHALT_PACKAGE_SIGNING_KEY?.trim() || undefined;
const signingKeyId = process.env.AZPHALT_PACKAGE_SIGNING_KEY_ID?.trim() || undefined;

/**
 * A GitHub token lifts the anonymous API rate limit. Unauthenticated works fine for public repos,
 * which is what the lockfile pins, so the token is a nicety rather than a requirement.
 *
 * It is sent **only** to `api.github.com`. Tarballs come from `codeload.github.com` — a different
 * host, which rejects a bearer token with a bare `404` — and a credential should not be handed to a
 * host that has no business seeing it regardless. A token that the API rejects (`401`) is dropped
 * and the run continues anonymously: some environments export a `GITHUB_TOKEN` that is scoped to
 * something else entirely, and that should not be able to fail a build that needs no auth at all.
 */
let githubToken = process.env.GITHUB_TOKEN?.trim() || undefined;
const UA = { "user-agent": "azphalt-build-catalog" } as const;
const apiHeaders = (): Record<string, string> => ({
  ...UA,
  ...(githubToken ? { authorization: `Bearer ${githubToken}` } : {}),
});

function sha256(bytes: Uint8Array): string {
  return `sha256-${createHash("sha256").update(bytes).digest("base64")}`;
}

/**
 * How many times a network-level failure is re-tried before the run gives up, and the delay between
 * attempts. Four attempts at 0.5s / 1s / 2s spans a few seconds of packet loss without turning a
 * genuinely unreachable host into a multi-minute hang.
 */
const RETRIES = 4;
const backoff = (attempt: number) => new Promise((r) => setTimeout(r, 500 * 2 ** attempt));

/**
 * Whether an HTTP status is worth asking again.
 *
 * A `4xx` is the server's *answer* — the repo is private, the ref does not exist, the token was
 * refused — and re-asking gets the same answer more slowly while hiding the real cause behind a
 * timeout. `5xx` and `429` are the server declining to answer right now, which is what retrying is
 * for.
 */
const worthRetrying = (status: number) => status >= 500 || status === 429;

/**
 * A failure that must not be retried, thrown from inside a retry loop.
 *
 * The loop catches everything else on purpose — a dropped socket surfaces as a bare `TypeError`, and
 * enumerating undici's error shapes to recognise it would fail open the day one changes. So the
 * default is "retry", and the cases that must *not* be retried say so by their type. Without a marker
 * the two are indistinguishable once thrown, and a `404` would be swallowed by the same `catch` that
 * exists to absorb network noise, then reported four attempts later as if the host were unreachable.
 */
class Terminal extends Error {}

/** Fetch with a few retries — a deploy should not fail on one transient network blip. */
async function fetchRetry(url: string, init?: RequestInit): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    try {
      const res = await fetch(url, init);
      if (!worthRetrying(res.status)) return res;
      lastError = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastError = e;
    }
    await backoff(attempt);
  }
  throw new Error(`${url}: ${(lastError as Error)?.message ?? "unreachable"}`);
}

/** Call the GitHub API, dropping a token the API rejects rather than failing the whole run. */
async function api(path: string, accept?: string): Promise<Response> {
  const url = `https://api.github.com${path}`;
  const headers = () => ({ ...apiHeaders(), ...(accept ? { accept } : {}) });
  let res = await fetchRetry(url, { headers: headers() });
  if (res.status === 401 && githubToken) {
    console.warn("build-catalog: GITHUB_TOKEN was rejected (401) — continuing unauthenticated.");
    githubToken = undefined;
    res = await fetchRetry(url, { headers: headers() });
  }
  if (!res.ok) throw new Error(`GET ${path} → HTTP ${res.status}`);
  return res;
}

/** The default branch's head sha — the target when re-pinning with `--latest`. */
async function headSha(repo: string): Promise<string> {
  const info = (await api(`/repos/${repo}`)).json() as Promise<{ default_branch?: string }>;
  const branch = (await info).default_branch;
  if (!branch) throw new Error(`${repo}: no default branch`);
  const ref = await api(`/repos/${repo}/commits/${branch}`, "application/vnd.github.sha");
  return (await ref.text()).trim();
}

/**
 * Decompress and unpack one tarball body into `path → bytes`.
 *
 * GitHub wraps the tree in a single `<repo>-<sha>/` directory, so the first path segment is stripped.
 * Only regular files are kept: a symlink entry in a tarball can name any target, and following one
 * would let a repo pull bytes from outside its own tree into a published package.
 *
 * `pipeline` rather than `.pipe()` chains, because `.pipe()` does not forward errors: a socket that
 * drops mid-download makes the *source* emit, and with nothing listening there that surfaced as an
 * unhandled `'error'` event — a fatal that no caller could catch, let alone retry. Routing every
 * stage's failure into one rejection is what makes the retry in [fetchTree] possible at all, and it
 * destroys the half-finished streams instead of leaving them attached to a dead socket.
 */
async function extractTree(body: NonNullable<Response["body"]>): Promise<Map<string, Uint8Array>> {
  const files = new Map<string, Uint8Array>();
  const extract = tar.extract();

  extract.on("entry", (header, stream, next) => {
    if (header.type !== "file") {
      stream.resume();
      stream.on("end", next);
      return;
    }
    const rel = header.name.split("/").slice(1).join("/");
    const chunks: Buffer[] = [];
    stream.on("data", (c: Buffer) => chunks.push(c));
    stream.on("end", () => {
      if (rel) files.set(rel, new Uint8Array(Buffer.concat(chunks)));
      next();
    });
  });

  await pipeline(Readable.fromWeb(body as Parameters<typeof Readable.fromWeb>[0]), createGunzip(), extract);
  return files;
}

/**
 * Every file in a repo tarball at [ref], keyed by repo-relative path.
 *
 * The download is retried as a whole — request *and* body — because the failure this guards against
 * happens after the response headers arrive. `fetch` resolves as soon as the server answers, so a
 * retry wrapped around the call alone (which is all this had) covers the handshake and nothing else;
 * the bytes then stream in over seconds, and an abort during that window escaped the retry entirely.
 * It cost a deploy: `--check` gates `.github/workflows/deploy-storefront.yml`, one of 128 tarballs
 * died with undici's `TypeError: terminated`, and an identical re-run passed. The chunk downloader in
 * `@azphalt/repository-client` reads the body inside its retry for the same reason.
 *
 * Only a broken *transfer* is retried. A `4xx` is an answer — a deleted repo, a ref that no longer
 * exists — and is thrown on the spot, as is every failure the caller derives from these bytes: a
 * missing manifest, a version that moved, an integrity mismatch. Those mean the pinned content is not
 * what the lockfile says it is, and that must fail the deploy immediately rather than be re-asked
 * three times and reported as a network problem.
 */
export async function fetchTree(repo: string, ref: string): Promise<Map<string, Uint8Array>> {
  const url = `https://codeload.github.com/${repo}/tar.gz/${ref}`;
  let lastError: unknown;

  for (let attempt = 0; attempt < RETRIES; attempt++) {
    if (attempt) await backoff(attempt - 1);
    try {
      const res = await fetch(url, { headers: { ...UA } });
      if (!res.ok) {
        // Nothing will read this body; release the socket rather than leaving it to the GC.
        await res.body?.cancel();
        if (!worthRetrying(res.status)) throw new Terminal(`tarball ${repo}@${ref} → HTTP ${res.status}`);
        lastError = new Error(`HTTP ${res.status}`);
        continue;
      }
      if (!res.body) throw new Terminal(`tarball ${repo}@${ref}: empty body`);
      // Inside the try: a mid-stream abort or a truncated gzip member lands here, not above.
      return await extractTree(res.body);
    } catch (e) {
      if (e instanceof Terminal) throw e;
      lastError = e;
    }
  }

  throw new Error(
    `tarball ${repo}@${ref}: ${(lastError as Error)?.message ?? "unreachable"} (after ${RETRIES} attempts)`,
  );
}

interface Built {
  source: Source;
  /** The bytes actually written — signed when a key is configured. */
  bytes: Uint8Array;
  /** sha256 of the unsigned `.azp`, which is what the lockfile pins. */
  integrity: string;
  manifest: Manifest;
  signed: boolean;
  file: string;
}

/**
 * Tarball fetches cached by `repo@ref`, so several sources pinning the same commit — a repo that
 * ships multiple brush/asset packages side by side, one `path` each — download it once rather than
 * once per package.
 */
const treeCache = new Map<string, Promise<Map<string, Uint8Array>>>();
function fetchTreeCached(repo: string, ref: string): Promise<Map<string, Uint8Array>> {
  const key = `${repo}@${ref}`;
  let promise = treeCache.get(key);
  if (!promise) {
    promise = fetchTree(repo, ref);
    treeCache.set(key, promise);
  }
  return promise;
}

/** Fetch one pinned source and pack it into a `.azp`. */
async function build(source: Source): Promise<Built> {
  const tree = await fetchTreeCached(source.repo, source.ref);
  // A repo-relative subdirectory for a repo that ships several packages side by side — see `Source.path`.
  const prefix = source.path ? `${source.path.replace(/\/+$/, "")}/` : "";
  const label = source.path ? `${source.repo}@${source.ref}:${source.path}` : `${source.repo}@${source.ref}`;

  const manifestBytes = tree.get(`${prefix}manifest.json`);
  if (!manifestBytes) throw new Error(`${label}: no manifest.json`);
  const manifest = JSON.parse(Buffer.from(manifestBytes).toString("utf8")) as Manifest;

  // The lockfile is the authority on identity. If the upstream repo renames its package or bumps its
  // version, that must surface as a failed build and a deliberate re-pin — never as the store quietly
  // serving something other than what the committed lockfile says it serves.
  if (manifest.id !== source.id) {
    throw new Error(`${label}: manifest id "${manifest.id}" ≠ lockfile id "${source.id}"`);
  }
  if (manifest.version !== source.version) {
    throw new Error(
      `${label}: manifest version "${manifest.version}" ≠ lockfile version "${source.version}" ` +
        `(re-pin with --update --latest to accept the new version)`,
    );
  }

  const licenseBytes = tree.get(`${prefix}LICENSE`);
  if (!licenseBytes) throw new Error(`${label}: no LICENSE file`);

  const payload: Record<string, Uint8Array> = {};
  for (const [rel, bytes] of tree) {
    if (!rel.startsWith(prefix)) continue;
    const rest = rel.slice(prefix.length);
    if (PAYLOAD_DIRS.some((dir) => rest.startsWith(dir))) payload[rest] = bytes;
  }

  // `writeAzp` computes the real `manifest.files` digests; a submission manifest must not carry its
  // own (spec/package-format.md). Dropping any checked-in `files` map keeps the digests authoritative.
  const { files: _drop, ...clean } = manifest as Manifest & { files?: unknown };
  const { azp } = writeAzp({ manifest: clean, payload, license: Buffer.from(licenseBytes).toString("utf8") });

  const integrity = sha256(azp);
  const bytes = signingKey
    ? signAzp(azp, { privateKey: signingKey, ...(signingKeyId ? { keyId: signingKeyId } : {}) })
    : azp;

  return { source, bytes, integrity, manifest, signed: Boolean(signingKey), file: `${source.id}-${source.version}.azp` };
}

/** Every file under `dir`, as `/`-separated paths relative to it. */
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
 * Pack one `<base>/<id>/` folder — same output shape as a pinned source, so both feed one catalog.
 *
 * `base` is `registry/local/` for first-party headers and `submissions/` for merged third-party
 * submissions. `label` only names the folder in error messages; the packing is identical, which is
 * the point — a submission that has been reviewed and merged gets built and signed exactly like
 * anything else this repo ships, rather than over a separate runtime code path.
 */
function buildFolder(base: string, id: string, label: string): Built {
  const dir = join(base, id);
  const manifest = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")) as Manifest;
  if (manifest.id !== id) {
    throw new Error(`${label}${id}: manifest id "${manifest.id}" ≠ folder name — the folder must be the package id`);
  }
  const licensePath = join(dir, "LICENSE");
  if (!existsSync(licensePath)) throw new Error(`${label}${id}: no LICENSE file`);

  const payload: Record<string, Uint8Array> = {};
  for (const rel of walk(dir)) {
    if (rel === "manifest.json" || rel === "LICENSE") continue;
    payload[rel] = new Uint8Array(readFileSync(join(dir, rel)));
  }

  const { files: _drop, ...clean } = manifest as Manifest & { files?: unknown };
  // Line endings normalised to LF before packing.
  //
  // A package's `integrity` is a digest of its bytes, so anything that changes the bytes changes the
  // identity — and `core.autocrlf` changes them at *checkout*. On Windows this LICENSE arrives as
  // CRLF, gets read here as text, and packs a different `.azp` than the same commit does on Linux.
  // The result is a catalog that fails `--check` on one developer's machine and passes on another's,
  // reporting "the committed catalog is stale" when nothing is stale.
  //
  // The write path is the worse half: building on Windows and committing would bake CRLF licences
  // into every first-party package and move all 24 digests, which reads as a real content change in
  // review. Remote-pinned packages never had this problem — their LICENSE comes out of a tarball,
  // which git does not touch — so it only ever showed up here.
  //
  // Normalising is safe rather than a re-pin: LF is what CI already produces, so this makes Windows
  // agree with the committed catalog instead of changing it.
  const license = readFileSync(licensePath, "utf8").replace(/\r\n/g, "\n");
  const { azp } = writeAzp({ manifest: clean, payload, license });

  const integrity = sha256(azp);
  const bytes = signingKey
    ? signAzp(azp, { privateKey: signingKey, ...(signingKeyId ? { keyId: signingKeyId } : {}) })
    : azp;

  return {
    source: { id, repo: "(local)", ref: "(local)", version: manifest.version, integrity },
    bytes,
    integrity,
    manifest,
    signed: Boolean(signingKey),
    file: `${id}-${manifest.version}.azp`,
  };
}

/** Run [jobs] with at most [limit] in flight, preserving input order in the results. */
async function pooled<T, R>(items: T[], limit: number, job: (item: T) => Promise<R>): Promise<PromiseSettledResult<R>[]> {
  const results = new Array<PromiseSettledResult<R>>(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    for (;;) {
      const index = cursor++;
      if (index >= items.length) return;
      try {
        results[index] = { status: "fulfilled", value: await job(items[index]) };
      } catch (reason) {
        results[index] = { status: "rejected", reason };
      }
    }
  });
  await Promise.all(workers);
  return results;
}

async function main(): Promise<void> {
  const lock = JSON.parse(readFileSync(lockPath, "utf8")) as Lock;

  // Validate the signing key once, up front. Failing partway would leave the catalog half-signed,
  // and a package's *first* signature is the one that pins its publisher key on every host that
  // installs it (spec/package-format.md § Publisher continuity) — not something to get half-right.
  if (signingKey) {
    let type: string | undefined;
    try {
      type = createPrivateKey(signingKey).asymmetricKeyType;
    } catch (e) {
      console.error(`build-catalog: AZPHALT_PACKAGE_SIGNING_KEY is not a readable private key — ${(e as Error).message}`);
      process.exit(1);
    }
    if (type !== "ed25519") {
      console.error(
        `build-catalog: AZPHALT_PACKAGE_SIGNING_KEY must be an ed25519 key (got ${type}); ` +
          `generate one with: openssl genpkey -algorithm ed25519`,
      );
      process.exit(1);
    }
    console.log(`build-catalog: signing with the configured ed25519 publisher key${signingKeyId ? ` (keyId ${signingKeyId})` : ""}.`);
  } else {
    console.warn(
      "build-catalog: AZPHALT_PACKAGE_SIGNING_KEY is not set — building UNSIGNED. Packages still verify " +
        "for integrity, but pin no publisher key, so a host cannot enforce publisher continuity on updates.",
    );
  }

  const selected = only ? lock.sources.filter((s) => s.id === only) : lock.sources;
  if (!selected.length) {
    console.error(only ? `build-catalog: no source with id ${only}` : "build-catalog: lockfile has no sources");
    process.exit(1);
  }

  if (latest) {
    if (!update) {
      console.error("build-catalog: --latest re-pins the lockfile, so it requires --update");
      process.exit(1);
    }
    console.log(`build-catalog: resolving ${selected.length} default-branch head(s) …`);
    const heads = await pooled(selected, 8, async (s) => ({ s, sha: await headSha(s.repo) }));
    for (const result of heads) {
      if (result.status === "rejected") {
        console.error(`build-catalog: ${(result.reason as Error).message}`);
        process.exit(1);
      }
      const { s, sha } = result.value;
      if (s.ref !== sha) {
        console.log(`build-catalog: ${s.id} ${s.ref.slice(0, 8)} → ${sha.slice(0, 8)}`);
        s.ref = sha;
        // The old digest describes the old commit; keep it and the integrity check below would
        // reject the very bump we just asked for.
        delete s.integrity;
      }
    }
  }

  console.log(`build-catalog: building ${selected.length} package(s) …`);
  const results = await pooled(selected, 8, build);

  const built: Built[] = [];
  const failures: string[] = [];
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "rejected") {
      failures.push(`${selected[i].id}: ${(result.reason as Error).message}`);
      continue;
    }
    const b = result.value;
    const pinned = b.source.integrity;
    if (pinned && pinned !== b.integrity) {
      if (update) {
        console.log(`build-catalog: ${b.source.id} integrity re-pinned (${pinned.slice(7, 19)}… → ${b.integrity.slice(7, 19)}…)`);
      } else {
        failures.push(
          `${b.source.id}: integrity mismatch — lockfile pins ${pinned}, built ${b.integrity}. ` +
            `The bytes for this commit changed. Re-pin with --update only if you know why.`,
        );
        continue;
      }
    }
    b.source.integrity = b.integrity;
    built.push(b);
  }

  // Folder-sourced packages: first-party headers authored here, and third-party submissions that have
  // been merged. Both are built the same way, because after review they *are* the same thing — a
  // manifest in this repo, on main, that a maintainer approved. The directories stay separate so the
  // review can tell whose work it is reading, not because the build treats them differently.
  for (const { dir, label } of [
    { dir: localDir, label: "registry/local/" },
    { dir: submissionsDir, label: "submissions/" },
  ]) {
    if (!existsSync(dir)) continue;
    const ids = readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      // `submissions/` holds a README beside the package folders, and a folder without a manifest is
      // not a package. Filtering here rather than failing keeps unrelated files from breaking a build.
      .filter((d) => existsSync(join(dir, d.name, "manifest.json")))
      .map((d) => d.name)
      .filter((id) => !only || id === only)
      .sort();
    for (const id of ids) {
      try {
        built.push(buildFolder(dir, id, label));
      } catch (e) {
        failures.push(`${label}${id}: ${(e as Error).message}`);
      }
    }
    if (ids.length) console.log(`build-catalog: + ${ids.length} package(s) from ${label}`);
  }

  // An id must resolve to exactly one package, whatever it was built from.
  const seen = new Map<string, string>();
  for (const b of built) {
    const where = b.source.repo === "(local)" ? `local/${b.source.id}` : b.source.repo;
    const prev = seen.get(b.source.id);
    if (prev) failures.push(`${b.source.id}: defined twice — ${prev} and ${where}`);
    seen.set(b.source.id, where);
  }

  if (failures.length) {
    console.error(`build-catalog: ${failures.length} failed:`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }

  if (check) {
    // Re-deriving from the lockfile proves the *pins* are intact. It says nothing about the packages
    // actually committed under `registry/packages/`, and those are what a deployment serves.
    //
    // Those two drifted apart in exactly the way this now catches: two manifests were repinned to a
    // fixed commit and the catalog was never rebuilt, so the store shipped the old bytes — with the
    // wrong capabilities — while this check reported green on the corrected sources.
    //
    // The comparison is against `catalog.json` rather than the `.azp` bytes on purpose. Signing
    // changes bytes, so a byte comparison starts failing the moment a key is configured against a
    // catalog committed unsigned, which reads as tampering when nothing is wrong. `integrity` is the
    // digest of the *unsigned* package precisely so it survives that, and the generated index is
    // where it is recorded.
    const catalogPath = join(registryDir, "catalog.json");
    const drift: string[] = [];
    if (!existsSync(catalogPath)) {
      drift.push("registry/catalog.json is missing — the catalog has never been built");
    } else {
      const committed = JSON.parse(readFileSync(catalogPath, "utf8")) as {
        packages: { id: string; version: string; integrity: string; file: string }[];
      };
      const byId = new Map(committed.packages.map((p) => [p.id, p]));
      for (const b of built) {
        const c = byId.get(b.source.id);
        if (!c) {
          drift.push(`${b.source.id}: pinned but absent from the committed catalog`);
        } else if (c.integrity !== b.integrity) {
          drift.push(`${b.source.id}: committed catalog has ${c.integrity}, pinned source re-derives ${b.integrity}`);
        } else if (!existsSync(join(packagesDir, c.file))) {
          drift.push(`${b.source.id}: catalog lists ${c.file} but it is missing from registry/packages/`);
        }
        byId.delete(b.source.id);
      }
      for (const id of byId.keys()) drift.push(`${id}: committed but no longer pinned in sources.json`);
    }

    if (drift.length) {
      console.error(
        `build-catalog: the committed catalog is stale — ${drift.length} package(s) differ from their pinned sources:`,
      );
      for (const d of drift) console.error(`  - ${d}`);
      console.error("build-catalog: rebuild and commit — pnpm --filter @azphalt/storefront build-catalog");
      process.exit(1);
    }

    const total = built.reduce((sum, b) => sum + b.bytes.length, 0);
    console.log(
      `build-catalog: OK — ${built.length} package(s) re-derived from their pinned commits, ` +
        `${(total / 1024).toFixed(0)} KiB, integrity verified against the committed catalog. Nothing written.`,
    );
    return;
  }

  // Rewrite the whole packages dir on a full build so a package dropped from the lockfile stops being
  // served. A `--only` run is a partial build and must leave its siblings in place.
  mkdirSync(packagesDir, { recursive: true });
  if (!only) {
    for (const name of readdirSync(packagesDir)) {
      if (name.endsWith(".azp")) rmSync(join(packagesDir, name));
    }
  }

  for (const b of built) {
    // `id` and `version` come from a committed lockfile, but they still land in a filesystem path —
    // reject anything that isn't a plain name rather than trusting the review that let it in.
    if (!/^[A-Za-z0-9._@-]+$/.test(b.file.replace(/\.azp$/, ""))) {
      console.error(`build-catalog: refusing unsafe output filename for ${b.source.id}`);
      process.exit(1);
    }
    writeFileSync(join(packagesDir, b.file), b.bytes);
  }

  const catalog = {
    "//": "Generated by scripts/build-catalog.ts from registry/sources.json. Do not edit by hand.",
    signed: Boolean(signingKey),
    packages: built
      .map((b) => ({
        id: b.source.id,
        version: b.source.version,
        name: b.manifest.name,
        kind: b.manifest.kind,
        repo: b.source.repo,
        ref: b.source.ref,
        integrity: b.integrity,
        file: b.file,
        bytes: b.bytes.length,
      }))
      .sort((a, b) => (a.id < b.id ? -1 : 1)),
  };

  if (!only) writeFileSync(join(registryDir, "catalog.json"), JSON.stringify(catalog, null, 2) + "\n");
  if (update) writeFileSync(lockPath, JSON.stringify(lock, null, 2) + "\n");

  const total = built.reduce((sum, b) => sum + b.bytes.length, 0);
  console.log(
    `build-catalog: ${built.length} package(s), ${(total / 1024).toFixed(0)} KiB, ` +
      `${signingKey ? "signed" : "UNSIGNED"}${only ? ` (partial build: --only ${only})` : ""}.`,
  );
}

// Only build when run as a command. The retry behaviour above is worth a test, and a test has to
// `import` this file to reach it — which without this guard would kick off a full 128-tarball catalog
// build as an import side effect.
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((e) => {
    console.error("build-catalog: fatal —", e);
    process.exit(1);
  });
}
