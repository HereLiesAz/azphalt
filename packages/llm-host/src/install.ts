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
import { readAzp, verifyAzp } from "@azphalt/azp";
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
  onProgress?: (seq: number, message: string) => void;
  signal?: AbortSignal;
}

export interface InstallResult {
  install: LlmInstall;
  /** The setup task's result, when [InstallOptions.runSetup] was not false. */
  setup?: LlmResult;
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

async function ensurePrivateRepo(opts: InstallOptions): Promise<string> {
  const { github, owner, repo } = opts;
  try {
    const existing = await gh<{ private: boolean; default_branch: string }>(github, "GET", `/repos/${owner}/${repo}`);
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
  const base = `/repos/${owner}/${repo}/git`;
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

export async function installLlm(opts: InstallOptions): Promise<InstallResult> {
  const verdict = verifyAzp(opts.azp);
  if (!verdict.ok) throw new Error(`package failed verification: ${verdict.errors.join("; ")}`);
  const { manifest, payload } = readAzp(opts.azp);
  const llm = llmBlock(manifest);
  if (llm.setup.sandbox !== "github-actions") throw new Error(`unsupported sandbox ${llm.setup.sandbox}`);

  const inputs = opts.inputs ?? {};
  for (const input of llm.inputs ?? []) {
    if (!input.optional && !inputs[input.id]) throw new Error(`input "${input.id}" is required`);
  }

  const workflowPath = opts.workflowPath ?? "setup/workflow.yml";
  const workflow = payload[workflowPath];
  if (!workflow) throw new Error(`the package has no runner workflow at ${workflowPath}`);

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
      `/repos/${opts.owner}/${opts.repo}/actions/secrets/public-key`,
    );
    const recipient = Uint8Array.from(atob(key), (c) => c.charCodeAt(0));
    for (const s of secrets) {
      const sealed = sealedBox(new TextEncoder().encode(inputs[s.input]), recipient);
      await gh(opts.github, "PUT", `/repos/${opts.owner}/${opts.repo}/actions/secrets/${encodeURIComponent(s.name)}`, {
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
