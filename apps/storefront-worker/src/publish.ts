/**
 * `POST /packages` — publish by pull request (`spec/repository-api.md` § 9).
 *
 * The store's catalog is git: every package it serves is a reviewable commit, and there is no runtime
 * write path that can put bytes in front of users (docs/ARCHITECTURE.md § Invariants). This endpoint
 * keeps that. It accepts a **signed** `.azp`, checks it, and turns it into a pull request that adds or
 * updates `submissions/<id>/` — the same folder a person would open a PR with (submissions/README.md).
 * CI validates the folder, a maintainer reviews it, and the merge is what publishes. The response is
 * `202` with the PR's address.
 *
 * The signature is the publisher's identity. The first publish of an id pins the signer's key in
 * `apps/storefront/registry/publishers.json` (in the same PR); every later publish of that id must be
 * signed by the same key, or it is refused as a publisher change (`spec/package-format.md` § Signing).
 * An id already in the catalog with no pin is maintained through git by hand, and is refused here.
 *
 * Limits, all from Cloudflare's free plan: 4 MB per package (heavy assets belong behind `remoteUrl`),
 * and at most {@link MAX_BINARY_FILES} binary files, since each is one GitHub API call and a request
 * may make 50. Text files ride inline in the tree and cost nothing.
 */
import { strFromU8, unzipSync } from "fflate";

export const MAX_PUBLISH_BYTES = 4 * 1024 * 1024;
export const MAX_BINARY_FILES = 30;
const MAX_FILES = 500;
const PUBLISHERS_PATH = "apps/storefront/registry/publishers.json";
/** Reverse-DNS: dot-separated labels, no empty label (so no `..`, which a git branch name forbids). */
const REVERSE_DNS = /^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$/;
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

export interface PublishEnv {
  /** Fine-grained token: Contents and Pull requests read/write on {@link PublishEnv.PUBLISH_REPOSITORY}. */
  GITHUB_PUBLISH_TOKEN?: string;
  /** `owner/repo` the pull requests are opened against. */
  PUBLISH_REPOSITORY?: string;
}

export interface PublishContext {
  /** The deployed catalog's version of `id`, if it is in the free catalog. */
  catalogVersion(id: string): Promise<string | undefined>;
  /** Whether `id` is a paid listing (never publishable here — paid bytes are not committed). */
  isListed(id: string): Promise<boolean>;
}

export interface PublishError {
  status: number;
  code: string;
  message: string;
  errors?: string[];
}

export interface PublishAccepted {
  status: "pending-review";
  id: string;
  version: string;
  review: string;
  pullRequest: number;
  publisher: { publicKey: string; pin: "new" | "matches" };
}

interface Inspected {
  manifest: Record<string, unknown> & { id: string; version: string; files: Record<string, string> };
  license: Uint8Array;
  payload: Record<string, Uint8Array>;
  publicKey: string;
}

const enc = new TextEncoder();

function base64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 32768) {
    binary += String.fromCharCode(...bytes.subarray(i, Math.min(bytes.length, i + 32768)));
  }
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes as Uint8Array<ArrayBuffer>));
  return Array.from(digest).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * The container checks `@azphalt/azp`'s `verifyAzp` makes — unsafe paths, digests, unlisted payload,
 * the detached signature — reimplemented over WebCrypto, since the Worker cannot load `node:crypto`.
 * Per-kind manifest validation is left to the PR's submission check, which runs the real library.
 */
export async function inspectAzp(bytes: Uint8Array): Promise<Inspected | PublishError> {
  const bad = (message: string, errors?: string[]): PublishError => ({ status: 400, code: "bad_request", message, errors });

  let files: Record<string, Uint8Array>;
  try {
    files = unzipSync(bytes);
  } catch (error) {
    return bad("not a valid .azp container: " + (error instanceof Error ? error.message : String(error)));
  }
  const paths = Object.keys(files);
  if (paths.length > MAX_FILES) return bad(`too many files (${paths.length}; at most ${MAX_FILES})`);

  const manifestRaw = files["manifest.json"];
  if (!manifestRaw) return bad("manifest.json is missing");
  let manifest: Inspected["manifest"];
  try {
    manifest = JSON.parse(strFromU8(manifestRaw));
  } catch (error) {
    return bad("manifest.json is not valid JSON: " + (error instanceof Error ? error.message : String(error)));
  }
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) return bad("manifest.json is not an object");

  const errors: string[] = [];
  if (typeof manifest.id !== "string" || !REVERSE_DNS.test(manifest.id)) errors.push("manifest.id must be a reverse-DNS id");
  if (typeof manifest.version !== "string" || !SEMVER.test(manifest.version)) errors.push("manifest.version must be semver");
  for (const path of paths) {
    if (path.startsWith("/") || path.split("/").includes("..") || path.includes("\\")) errors.push(`unsafe path: ${path}`);
  }
  if (!manifest.files || typeof manifest.files !== "object") {
    errors.push("manifest.files is missing");
  } else {
    for (const [path, want] of Object.entries(manifest.files)) {
      const data = files[path];
      if (!data || path === "manifest.json" || path === "signature.json") errors.push(`missing payload for ${path}`);
      else if ("sha256-" + (await sha256Hex(data)) !== want) errors.push(`digest mismatch: ${path}`);
    }
    for (const path of paths) {
      if (path !== "manifest.json" && path !== "signature.json" && !Object.hasOwn(manifest.files, path)) {
        errors.push(`unlisted payload (no digest in manifest.files): ${path}`);
      }
    }
  }
  if (!files.LICENSE) errors.push("LICENSE is missing");
  if (errors.length) return bad("the package does not verify", errors);

  const sigRaw = files["signature.json"];
  if (!sigRaw) {
    return {
      status: 401,
      code: "unauthorized",
      message: "unsigned package: publishing requires a .azp signed with your publisher key (signAzp)",
    };
  }
  let sig: { alg?: unknown; publicKey?: unknown; signature?: unknown };
  try {
    sig = JSON.parse(strFromU8(sigRaw));
  } catch {
    return bad("signature.json is not valid JSON");
  }
  if (sig?.alg !== "ed25519" || typeof sig.publicKey !== "string" || typeof sig.signature !== "string") {
    return bad("signature.json is malformed");
  }
  let valid = false;
  try {
    const key = await crypto.subtle.importKey("spki", fromBase64(sig.publicKey), { name: "Ed25519" }, false, ["verify"]);
    valid = await crypto.subtle.verify("Ed25519", key, fromBase64(sig.signature), manifestRaw as Uint8Array<ArrayBuffer>);
  } catch {
    valid = false;
  }
  if (!valid) return { status: 401, code: "unauthorized", message: "signature verification failed" };

  const payload: Record<string, Uint8Array> = {};
  for (const [path, data] of Object.entries(files)) {
    if (path !== "manifest.json" && path !== "signature.json" && path !== "LICENSE") payload[path] = data;
  }
  return { manifest, license: files.LICENSE, payload, publicKey: sig.publicKey };
}

/** Text that survives a round trip through a UTF-8 JSON string, so it can go inline in a git tree. */
function asText(bytes: Uint8Array): string | undefined {
  if (bytes.includes(0)) return undefined;
  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return enc.encode(text).length === bytes.length ? text : undefined;
  } catch {
    return undefined;
  }
}

class GitHub {
  constructor(private readonly token: string, private readonly repo: string) {}

  async call<T>(method: string, path: string, body?: unknown): Promise<{ status: number; data: T }> {
    const res = await fetch("https://api.github.com/repos/" + this.repo + path, {
      method,
      headers: {
        authorization: "Bearer " + this.token,
        accept: "application/vnd.github+json",
        "x-github-api-version": "2022-11-28",
        "user-agent": "azphalt-store",
        ...(body === undefined ? {} : { "content-type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await res.text();
    return { status: res.status, data: (text ? JSON.parse(text) : undefined) as T };
  }

  async ok<T>(method: string, path: string, body?: unknown): Promise<T> {
    const { status, data } = await this.call<T>(method, path, body);
    if (status < 200 || status >= 300) throw new Error(`GitHub ${method} ${path} answered ${status}`);
    return data;
  }

  /** The tree entries under `dir` (recursively) at `treeSha`, walking one level per call. */
  async filesUnder(treeSha: string, dir: string): Promise<string[]> {
    let sha = treeSha;
    for (const part of dir.split("/")) {
      const tree = await this.ok<{ tree: Array<{ path: string; type: string; sha: string }> }>("GET", "/git/trees/" + sha);
      const entry = tree.tree.find((e) => e.path === part && e.type === "tree");
      if (!entry) return [];
      sha = entry.sha;
    }
    const tree = await this.ok<{ tree: Array<{ path: string; type: string }> }>("GET", "/git/trees/" + sha + "?recursive=1");
    return tree.tree.filter((e) => e.type === "blob").map((e) => dir + "/" + e.path);
  }
}

interface Publishers {
  "//"?: string[];
  publishers: Record<string, { publicKey: string; pinnedAt: string }>;
}

export async function publish(bytes: Uint8Array, env: PublishEnv, ctx: PublishContext): Promise<PublishAccepted | PublishError> {
  if (!env.GITHUB_PUBLISH_TOKEN || !env.PUBLISH_REPOSITORY) {
    return { status: 501, code: "not_implemented", message: "publishing is not configured on this repository" };
  }
  if (bytes.byteLength === 0) return { status: 400, code: "bad_request", message: "empty body: POST the signed .azp bytes" };
  if (bytes.byteLength > MAX_PUBLISH_BYTES) {
    return {
      status: 413,
      code: "payload_too_large",
      message: `package exceeds ${MAX_PUBLISH_BYTES} bytes; move heavy assets behind remoteUrl + checksum`,
    };
  }

  const inspected = await inspectAzp(bytes);
  if ("status" in inspected) return inspected;
  const { manifest, license, payload, publicKey } = inspected;
  const { id, version } = manifest;

  if (await ctx.isListed(id)) {
    return { status: 409, code: "conflict", message: `${id} is a paid listing; paid bytes are uploaded to protected storage, not published` };
  }

  const gh = new GitHub(env.GITHUB_PUBLISH_TOKEN, env.PUBLISH_REPOSITORY);
  try {
    const head = await gh.ok<{ object: { sha: string } }>("GET", "/git/ref/heads/main");
    const commit = await gh.ok<{ tree: { sha: string } }>("GET", "/git/commits/" + head.object.sha);

    const current = await gh.call<{ content?: string }>("GET", "/contents/" + PUBLISHERS_PATH + "?ref=" + head.object.sha);
    const publishers: Publishers =
      current.status === 200 && current.data.content
        ? JSON.parse(new TextDecoder().decode(fromBase64(current.data.content.replace(/\s/g, ""))))
        : { publishers: {} };
    const pin = publishers.publishers[id];
    const published = await ctx.catalogVersion(id);

    if (pin && pin.publicKey !== publicKey) {
      return {
        status: 403,
        code: "forbidden",
        message: `${id} is pinned to a different publisher key; a key rotation needs a maintainer`,
      };
    }
    if (!pin && published !== undefined) {
      return {
        status: 409,
        code: "conflict",
        message: `${id} is maintained through git in this repository; update it with a pull request`,
      };
    }
    if (published === version) {
      return { status: 409, code: "conflict", message: `${id} ${version} is already published` };
    }

    // Read the folder on main even for a new id: a hand-made submission merged since the last deploy
    // is not in the catalog yet, and must not be overwritten (or pinned) by a stranger's key.
    const folder = "submissions/" + id;
    const previous = await gh.filesUnder(commit.tree.sha, folder);
    if (!pin && previous.length > 0) {
      return {
        status: 409,
        code: "conflict",
        message: `${id} is maintained through git in this repository; update it with a pull request`,
      };
    }

    const { files: _files, ...header } = manifest;
    const contents: Record<string, Uint8Array> = {
      "manifest.json": enc.encode(JSON.stringify(header, null, 2) + "\n"),
      LICENSE: license,
      ...payload,
    };

    const tree: Array<Record<string, unknown>> = [];
    let binaries = 0;
    for (const [path, data] of Object.entries(contents)) {
      const text = asText(data);
      if (text !== undefined) {
        tree.push({ path: folder + "/" + path, mode: "100644", type: "blob", content: text });
        continue;
      }
      if (++binaries > MAX_BINARY_FILES) {
        return {
          status: 413,
          code: "payload_too_large",
          message: `more than ${MAX_BINARY_FILES} binary files; open a pull request against submissions/ instead`,
        };
      }
      const blob = await gh.ok<{ sha: string }>("POST", "/git/blobs", { content: base64(data), encoding: "base64" });
      tree.push({ path: folder + "/" + path, mode: "100644", type: "blob", sha: blob.sha });
    }
    for (const path of previous) {
      if (!Object.hasOwn(contents, path.slice(folder.length + 1))) {
        tree.push({ path, mode: "100644", type: "blob", sha: null });
      }
    }
    if (!pin) {
      publishers["//"] ??= [
        "Publisher keys pinned by POST /packages (apps/storefront-worker/src/publish.ts): the first publish",
        "of an id pins its signer's SPKI key, and every later publish of that id must be signed by it.",
      ];
      publishers.publishers[id] = { publicKey, pinnedAt: new Date().toISOString() };
      const sorted = Object.fromEntries(Object.entries(publishers.publishers).sort(([a], [b]) => a.localeCompare(b)));
      tree.push({
        path: PUBLISHERS_PATH,
        mode: "100644",
        type: "blob",
        content: JSON.stringify({ ...publishers, publishers: sorted }, null, 2) + "\n",
      });
    }

    const newTree = await gh.ok<{ sha: string }>("POST", "/git/trees", { base_tree: commit.tree.sha, tree });
    const newCommit = await gh.ok<{ sha: string }>("POST", "/git/commits", {
      message: `Publish ${id} ${version}`,
      tree: newTree.sha,
      parents: [head.object.sha],
    });
    const branch = `publish/${id}/${version}`;
    const ref = await gh.call("POST", "/git/refs", { ref: "refs/heads/" + branch, sha: newCommit.sha });
    if (ref.status === 422) {
      return { status: 409, code: "conflict", message: `a publish of ${id} ${version} is already waiting for review` };
    }
    if (ref.status < 200 || ref.status >= 300) throw new Error("GitHub POST /git/refs answered " + ref.status);

    const pr = await gh.ok<{ html_url: string; number: number }>("POST", "/pulls", {
      title: `Publish ${id} ${version}`,
      head: branch,
      base: "main",
      body: [
        `Opened by \`POST /packages\` on the store for **${id}** ${version} (\`${String(manifest.kind ?? "")}\`).`,
        "",
        pin
          ? "The package is signed by the publisher key pinned for this id."
          : "This is the first publish of this id: merging pins the signer's key below in `publishers.json`, and every later publish must be signed by it.",
        "",
        "Signer (SPKI, base64):",
        "",
        "    " + publicKey,
        "",
        `Files under \`${folder}/\`: ${Object.keys(contents).length}` +
          (previous.length ? `, replacing ${previous.length} from the previous version.` : "."),
        "",
        "The submission check validates the folder. Review what ships, then merge to publish.",
      ].join("\n"),
    });

    return {
      status: "pending-review",
      id,
      version,
      review: pr.html_url,
      pullRequest: pr.number,
      publisher: { publicKey, pin: pin ? "matches" : "new" },
    };
  } catch (error) {
    console.error("publish failed", error);
    return {
      status: 502,
      code: "bad_gateway",
      message: "could not open the review pull request: " + (error instanceof Error ? error.message : String(error)),
    };
  }
}
