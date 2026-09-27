/**
 * The `github-actions-runner` protocol (`spec/llm.md` § Protocols): dispatch the sandbox's runner
 * with one `task` input, follow its check run's `<seq>\t<message>` lines, and read `result.json` from
 * the `azphalt-llm-result` artifact — bounded, and treated as untrusted model output throughout.
 */
import { unzipSync, strFromU8 } from "fflate";
import { gh, ghBytes, GitHubError, sleep, type GitHubClient } from "./github.js";
import { containsSessionTag, sessionTags, type ChatMessage } from "./delimiters.js";

/** Where an installed package lives; returned by `installLlm`, persisted by the host. */
export interface LlmInstall {
  owner: string;
  repo: string;
  branch: string;
  packageId: string;
  version: string;
  /** The runner workflow's file name under `.github/workflows/`. */
  workflowFile: string;
}

export interface LlmTask {
  /** Names the run (its `run-name`) and its check run, so a host can find both after a restart. */
  correlationId: string;
  op?: "generate" | "setup";
  messages?: ChatMessage[];
  sessionKey?: string;
  turn?: number;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface LlmResult {
  status: "completed" | "failed";
  message: string;
  text?: string;
  patch?: string;
  branch?: string;
  inputTokens?: number;
  outputTokens?: number;
}

export interface RunOptions {
  github: GitHubClient;
  install: LlmInstall;
  task: Omit<LlmTask, "correlationId"> & { correlationId?: string };
  /** Called once per new progress line, in `seq` order. */
  onProgress?: (seq: number, message: string) => void;
  /** Skip the dispatch and follow the run already named by `task.correlationId`. */
  resume?: boolean;
  pollMs?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
}

/** Reference bounds from § github-actions-runner. */
export const MAX_ARTIFACT_BYTES = 4 * 1024 * 1024;
export const MAX_RESULT_BYTES = 2 * 1024 * 1024;

interface WorkflowRun {
  id: number;
  display_title: string;
  head_sha: string;
  status: string;
  conclusion: string | null;
}

function randomId(): string {
  return "azphalt-llm-" + Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => b.toString(16).padStart(2, "0")).join("");
}

const repoPath = (i: LlmInstall) => `/repos/${encodeURIComponent(i.owner)}/${encodeURIComponent(i.repo)}`;

/** The run whose `run-name` is [correlationId], if it has started. */
export async function findRun(github: GitHubClient, install: LlmInstall, correlationId: string): Promise<WorkflowRun | undefined> {
  const runs = await gh<{ workflow_runs: WorkflowRun[] }>(
    github,
    "GET",
    `${repoPath(install)}/actions/workflows/${encodeURIComponent(install.workflowFile)}/runs?event=workflow_dispatch&per_page=30`,
  );
  return runs.workflow_runs.find((r) => r.display_title === correlationId);
}

async function dispatch(opts: RunOptions, task: LlmTask): Promise<void> {
  const { github, install } = opts;
  // A just-committed workflow takes a few seconds to register; until then dispatch answers 404/422.
  for (let attempt = 0; ; attempt++) {
    try {
      await gh(github, "POST", `${repoPath(install)}/actions/workflows/${encodeURIComponent(install.workflowFile)}/dispatches`, {
        ref: install.branch,
        inputs: { task: JSON.stringify(task) },
      });
      return;
    } catch (e) {
      if (!(e instanceof GitHubError) || (e.status !== 404 && e.status !== 422) || attempt >= 5) throw e;
      await sleep(3000 * (attempt + 1), opts.signal);
    }
  }
}

function parseProgress(text: string | null | undefined): [number, string][] {
  const out: [number, string][] = [];
  for (const line of (text ?? "").split("\n")) {
    const m = /^(\d+)\t(.*)$/.exec(line);
    if (m) out.push([Number(m[1]), m[2]]);
  }
  return out;
}

/** Validate an untrusted `result.json`. Unknown fields are dropped; wrong types fail the result. */
export function parseResult(raw: Uint8Array): LlmResult {
  if (raw.length > MAX_RESULT_BYTES) return { status: "failed", message: "result.json exceeds 2 MB" };
  let value: unknown;
  try {
    value = JSON.parse(strFromU8(raw));
  } catch {
    return { status: "failed", message: "result.json is not JSON" };
  }
  const r = value as Record<string, unknown>;
  if (!r || typeof r !== "object" || (r.status !== "completed" && r.status !== "failed") || typeof r.message !== "string") {
    return { status: "failed", message: "result.json is malformed" };
  }
  const result: LlmResult = { status: r.status, message: r.message };
  for (const k of ["text", "patch", "branch"] as const) {
    if (r[k] === undefined) continue;
    if (typeof r[k] !== "string") return { status: "failed", message: `result.json ${k} is not a string` };
    result[k] = r[k] as string;
  }
  for (const k of ["inputTokens", "outputTokens"] as const) {
    if (r[k] === undefined) continue;
    if (!Number.isInteger(r[k])) return { status: "failed", message: `result.json ${k} is not an integer` };
    result[k] = r[k] as number;
  }
  return result;
}

async function readResult(github: GitHubClient, install: LlmInstall, run: WorkflowRun): Promise<LlmResult> {
  const { artifacts } = await gh<{ artifacts: { id: number; name: string; size_in_bytes: number; expired: boolean }[] }>(
    github,
    "GET",
    `${repoPath(install)}/actions/runs/${run.id}/artifacts`,
  );
  const artifact = artifacts.find((a) => a.name === "azphalt-llm-result" && !a.expired);
  if (!artifact) return { status: "failed", message: `the run ended ${run.conclusion ?? "without a conclusion"} and left no result` };
  if (artifact.size_in_bytes > MAX_ARTIFACT_BYTES) return { status: "failed", message: "result artifact exceeds 4 MB" };
  const zip = await ghBytes(github, `${repoPath(install)}/actions/artifacts/${artifact.id}/zip`, MAX_ARTIFACT_BYTES);
  let files: Record<string, Uint8Array>;
  try {
    // Refuse to inflate anything but result.json, and nothing over the bound.
    files = unzipSync(zip, { filter: (f) => f.name === "result.json" && f.originalSize <= MAX_RESULT_BYTES });
  } catch {
    return { status: "failed", message: "result artifact is not a readable zip" };
  }
  const raw = files["result.json"];
  return raw ? parseResult(raw) : { status: "failed", message: "result artifact holds no result.json (or one over 2 MB)" };
}

/** Dispatch (unless resuming), follow, and return the run's result. */
export async function runLlm(opts: RunOptions): Promise<LlmResult> {
  const { github, install, signal } = opts;
  const pollMs = opts.pollMs ?? 5000;
  const deadline = Date.now() + (opts.timeoutMs ?? 45 * 60 * 1000);
  const task: LlmTask = { ...opts.task, correlationId: opts.task.correlationId ?? randomId() };
  if (opts.resume && !opts.task.correlationId) throw new Error("resume needs the task's correlationId");
  const tags = task.sessionKey ? await sessionTags(task.sessionKey, task.turn ?? 0) : [];

  if (!opts.resume) await dispatch(opts, task);

  let run: WorkflowRun | undefined;
  let lastSeq = 0;
  for (;;) {
    if (Date.now() > deadline) throw new Error(`run ${task.correlationId} did not finish in time`);
    run = await findRun(github, install, task.correlationId);
    if (run) {
      const checks = await gh<{ check_runs: { output?: { text?: string | null } }[] }>(
        github,
        "GET",
        `${repoPath(install)}/commits/${run.head_sha}/check-runs?check_name=${encodeURIComponent(task.correlationId)}`,
      );
      for (const [seq, message] of parseProgress(checks.check_runs[0]?.output?.text)) {
        if (seq > lastSeq) {
          lastSeq = seq;
          opts.onProgress?.(seq, message);
        }
      }
      if (run.status === "completed") break;
    }
    await sleep(pollMs, signal);
  }

  const result = await readResult(github, install, run);
  // § Output check: model output carrying any session tag is rejected, whoever translated.
  if (tags.length && [result.text, result.patch].some((t) => t !== undefined && containsSessionTag(t, tags))) {
    return { status: "failed", message: "output contained a session tag; rejected" };
  }
  return result;
}
