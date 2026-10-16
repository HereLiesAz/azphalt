/**
 * Install a `kind:"llm"` package into a GitHub Actions sandbox (`spec/llm.md` § Setup, § Sandbox).
 *
 * The package is verified first. The sandbox must be a private repository (created private when
 * missing and [InstallOptions.createIfMissing] is set). The payload goes to `llm/<package id>/` and
 * the runner workflow to `.github/workflows/azphalt-llm-<package id>.yml` in one commit, so several
 * packages can share one sandbox. Each `setup.secrets` input the user supplied is stored as an Actions
 * secret, sealed to the repository's key; the value never enters the repository or a workflow input.
 * Finally setup runs once as an `op: "setup"` task, which downloads, verifies and smoke-tests.
 *
 * The token needs what `llm.setup.requires.githubToken` declares, and nothing here keeps it: the
 * host uses it for this call and drops it.
 */
import { readAzp, verifyAzp, unsafePathReason } from "@azphalt/azp";
import { gh, GitHubError, type GitHubClient } from "./github.js";
import { llmBlock } from "./consent.js";
import { sealedBox } from "./sealed-box.js";
import { runLlm, type LlmInstall, type LlmResult } from "./run.js";

export interface InstallOptions {
  github: GitHubClient;
  owner: string;
  repo: string;
  /** The package bytes, as downloaded. Verified here; an invalid package is refused. */
  azp: Uint8Array;
  /** Values for `llm.inputs`, by id. Required inputs must be present. */
  inputs?: Record<string, string>;
  /** Create the sandbox repository, private, when it does not exist. */
  createIfMissing?: boolean;
  /** Payload path of the runner workflow. First-party packages ship `setup/workflow.yml`. */
  workflowPath?: string;
  /** Run the one-time setup task after committing (default true). */
  runSetup?: boolean;
  /**
   * The user has been shown {@link llmConsent} for this package and agreed. Required: installing
   * commits a workflow into the user's repository and hands it their provider key, so it must never
   * happen on a code path that skipped the consent screen.
   */
  consented: boolean;
  /**
   * Base64 SPKI publisher keys the user trusts. When given, the package's signer must be one of them;
   * a signature by itself only proves the bytes weren't altered, not who made them.
   */
  trustedKeys?: string[];
  /** Install an unsigned package. Off by default — an unsigned workflow gets the user's secrets. */
  allowUnsigned?: boolean;
  onProgress?: (seq: number, message: string) => void;
  signal?: AbortSignal;
}

export interface InstallResult {
  install: LlmInstall;
  /** The setup task's result, when [InstallOptions.runSetup] was not false. */
  setup?: LlmResult;
}

/** The base64 SPKI key in `signature.json`, or undefined. (Validity was already checked by verifyAzp.) */
function signerKey(payload: Record<string, Uint8Array>): string | undefined {
  try {
    const raw = Object.hasOwn(payload, "signature.json") ? payload["signature.json"] : undefined;
    if (!raw) return undefined;
    const sig = JSON.parse(new TextDecoder().decode(raw)) as { publicKey?: unknown };
    return typeof sig.publicKey === "string" ? sig.publicKey : undefined;
  } catch {
    return undefined;
  }
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

async function ensurePrivateRepo(opts: InstallOptions): Promise<string> {
  const { github, owner, repo } = opts;
  try {
    const existing = await gh<{ private: boolean; default_branch: string }>(github, "GET", `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
    if (!existing.private) throw new Error(`${owner}/${repo} is public; an llm sandbox must be a private repository`);
    return existing.default_branch;
  } catch (e) {
    if (!(e instanceof GitHubError) || e.status !== 404 || !opts.createIfMissing) throw e;
  }
  const me = await gh<{ login: string }>(github, "GET", "/user");
  const path = me.login.toLowerCase() === owner.toLowerCase() ? "/user/repos" : `/orgs/${owner}/repos`;
  const created = await gh<{ default_branch: string }>(github, "POST", path, {
    name: repo,
    private: true,
    auto_init: true,
    description: "azphalt llm sandbox. Holds nothing but llm packages and their runs.",
  });
  return created.default_branch || "main";
}

async function commitFiles(opts: InstallOptions, branch: string, files: Record<string, Uint8Array>, message: string): Promise<void> {
  const { github, owner, repo } = opts;
  const base = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git`;
  const ref = await gh<{ object: { sha: string } }>(github, "GET", `${base}/ref/heads/${encodeURIComponent(branch)}`);
  const parent = await gh<{ tree: { sha: string } }>(github, "GET", `${base}/commits/${ref.object.sha}`);
  const tree = [];
  for (const [path, bytes] of Object.entries(files)) {
    const blob = await gh<{ sha: string }>(github, "POST", `${base}/blobs`, { content: toBase64(bytes), encoding: "base64" });
    tree.push({ path, mode: path.endsWith(".sh") ? "100755" : "100644", type: "blob", sha: blob.sha });
  }
  const newTree = await gh<{ sha: string }>(github, "POST", `${base}/trees`, { base_tree: parent.tree.sha, tree });
  const commit = await gh<{ sha: string }>(github, "POST", `${base}/commits`, { message, tree: newTree.sha, parents: [ref.object.sha] });
  await gh(github, "PATCH", `${base}/refs/heads/${encodeURIComponent(branch)}`, { sha: commit.sha });
}

/** Highest level the run-time token may hold for each scope (`spec/llm.md`); anything else is `none`. */
const WRITE_ALLOWED = new Set(["contents", "checks"]);

/**
 * Defense-in-depth check of a runner workflow before it is committed next to the user's secrets.
 * It is textual (no YAML parser here), so it is a tripwire for the obvious abuses, not a proof:
 * the workflow may reference only the secrets the manifest declared, never run on
 * `pull_request_target`, and never ask for write on a scope beyond the manifest's ceiling.
 */
export function auditWorkflow(workflow: string, declaredSecrets: string[]): string[] {
  const problems: string[] = [];
  const allowed = new Set([...declaredSecrets, "GITHUB_TOKEN"]);
  for (const m of workflow.matchAll(/secrets\.([A-Za-z_][A-Za-z0-9_]*)/g)) {
    if (!allowed.has(m[1])) problems.push(`references undeclared secret ${m[1]}`);
  }
  if (/\bsecrets\s*\[|toJSON\s*\(\s*secrets\s*\)|\bsecrets:\s*inherit\b/.test(workflow)) {
    problems.push("enumerates or forwards all secrets");
  }
  if (/pull_request_target/.test(workflow)) problems.push("uses the pull_request_target trigger");
  if (/permissions:\s*write-all/.test(workflow)) problems.push("requests write-all permissions");
  for (const m of workflow.matchAll(/^[ \t]+([a-z-]+):[ \t]*write[ \t]*$/gm)) {
    if (!WRITE_ALLOWED.has(m[1])) problems.push(`requests write on "${m[1]}"`);
  }
  return problems;
}

const PACKAGE_ID = /^[a-z0-9]+(\.[a-z0-9-]+)+$/;
const SEGMENT = /^[A-Za-z0-9._-]+$/;

export async function installLlm(opts: InstallOptions): Promise<InstallResult> {
  if (opts.consented !== true) throw new Error("installing requires the user's consent (show llmConsent(manifest) first)");
  if (!SEGMENT.test(opts.owner) || !SEGMENT.test(opts.repo)) throw new Error("invalid owner or repo name");

  const verdict = verifyAzp(opts.azp);
  if (!verdict.ok) throw new Error(`package failed verification: ${verdict.errors.join("; ")}`);
  if (!verdict.signed && !opts.allowUnsigned) throw new Error("package is unsigned; refusing to install a workflow that will hold your secrets");
  const { manifest, payload } = readAzp(opts.azp);
  if (opts.trustedKeys) {
    const signer = signerKey(payload);
    if (!signer || !opts.trustedKeys.includes(signer)) throw new Error("package is not signed by a trusted publisher key");
  }
  if (!PACKAGE_ID.test(manifest.id)) throw new Error(`invalid package id for an install path: ${JSON.stringify(manifest.id)}`);
  const llm = llmBlock(manifest);
  if (llm.setup.sandbox !== "github-actions") throw new Error(`unsupported sandbox ${llm.setup.sandbox}`);

  const inputs = opts.inputs ?? {};
  for (const input of llm.inputs ?? []) {
    if (!input.optional && !inputs[input.id]) throw new Error(`input "${input.id}" is required`);
  }

  const workflowPath = opts.workflowPath ?? "setup/workflow.yml";
  if (unsafePathReason(workflowPath)) throw new Error(`unsafe workflowPath: ${workflowPath}`);
  const workflow = Object.hasOwn(payload, workflowPath) ? payload[workflowPath] : undefined;
  if (!workflow) throw new Error(`the package has no runner workflow at ${workflowPath}`);
  const problems = auditWorkflow(new TextDecoder().decode(workflow), (llm.setup.secrets ?? []).map((x) => x.name));
  if (problems.length) throw new Error(`the runner workflow was refused: ${problems.join("; ")}`);

  const branch = await ensurePrivateRepo(opts);
  const dir = `llm/${manifest.id}`;
  const workflowFile = `azphalt-llm-${manifest.id}.yml`;
  const files: Record<string, Uint8Array> = { [`${dir}/manifest.json`]: new TextEncoder().encode(JSON.stringify(manifest, null, 2) + "\n") };
  for (const [path, bytes] of Object.entries(payload)) files[`${dir}/${path}`] = bytes;
  files[`.github/workflows/${workflowFile}`] = workflow;
  await commitFiles(opts, branch, files, `Install ${manifest.id} ${manifest.version}`);

  const secrets = (llm.setup.secrets ?? []).filter((s) => inputs[s.input]);
  if (secrets.length) {
    const { key, key_id } = await gh<{ key: string; key_id: string }>(
      opts.github,
      "GET",
      `/repos/${encodeURIComponent(opts.owner)}/${encodeURIComponent(opts.repo)}/actions/secrets/public-key`,
    );
    const recipient = Uint8Array.from(atob(key), (c) => c.charCodeAt(0));
    for (const s of secrets) {
      const sealed = sealedBox(new TextEncoder().encode(inputs[s.input]), recipient);
      await gh(opts.github, "PUT", `/repos/${encodeURIComponent(opts.owner)}/${encodeURIComponent(opts.repo)}/actions/secrets/${encodeURIComponent(s.name)}`, {
        encrypted_value: toBase64(sealed),
        key_id,
      });
    }
  }

  const install: LlmInstall = {
    owner: opts.owner,
    repo: opts.repo,
    branch,
    packageId: manifest.id,
    version: manifest.version,
    workflowFile,
  };
  if (opts.runSetup === false) return { install };
  const setup = await runLlm({ github: opts.github, install, task: { op: "setup" }, onProgress: opts.onProgress, signal: opts.signal });
  return { install, setup };
}
