/**
 * Types for `kind:"llm"` — an off-device language model: a hosted OpenAI-compatible endpoint, or open
 * weights run in a private GitHub Actions sandbox. See `spec/llm.md`.
 *
 * Like `kind:"mcp"`, the package is a signed header plus a bundled setup script. It carries no
 * azphalt `capabilities` and no `/code` sandbox `entry`/`runtime`, and a host MUST NOT run its setup
 * script on the user's device.
 */
import type { McpInput, ModelLicense, ModelRequirements, RemoteModelFileMember } from "./index.js";

/** Where prompts go: a third-party service, or open weights in the private sandbox. */
export type LlmTier = "endpoint" | "sandbox-weights";

/** How a host talks to a set-up model. `sandbox-weights` permits only `github-actions-runner`. */
export type LlmProtocol = "openai-chat" | "github-actions-runner";

/** Bearer-key requirement of the endpoint. A bearer mode names its key via `authInput`. */
export type LlmAuth = "none" | "optional-bearer" | "required-bearer";

/** What the operator does with prompts. */
export type LlmPromptHandling = "not-retained" | "logged" | "may-train" | "unknown";

export interface LlmManifest {
  tier: LlmTier;
  /** Values the host prompts for (provider keys), never stored in the package. */
  inputs?: LlmInput[];
  /** Required for every tier. */
  setup: LlmSetup;
  /** Required for `sandbox-weights`, forbidden for `endpoint`. */
  weights?: LlmWeights;
  endpoint: LlmEndpoint;
  run?: { permissions: LlmRunPermissions };
  /** Required for `endpoint`, advisory for `sandbox-weights`. A host MUST surface it before install. */
  dataHandling?: LlmDataHandling;
  /** Open vocabulary routing hint; `text-generation` is blessed. */
  role?: "text-generation" | (string & {});
}

/** An `mcp` input, plus `optional` for a key the model works without. */
export interface LlmInput extends McpInput {
  optional?: boolean;
}

export interface LlmSetup {
  /** `github-actions` is the only sandbox in 0.1. */
  sandbox: "github-actions" | (string & {});
  /** Path in `manifest.files`, so the signed manifest covers its bytes. */
  script: string;
  requires?: { githubToken?: string[] };
  /** Inputs stored as sandbox secrets; values never enter the package or the repository. */
  secrets?: { name: string; input: string }[];
  /** Every URL the script downloads, pinned by `sha256-<hex>`. */
  fetches?: { url: string; checksum: string }[];
}

export interface LlmWeights {
  /** The inference runtime the setup script installs, e.g. `llama.cpp`. */
  runtime: "llama.cpp" | "onnxruntime-genai" | (string & {});
  /** Every member remote, with `remoteUrl`, `checksum` and `byteSize`. */
  files: (RemoteModelFileMember & { byteSize: number })[];
  requirements?: LlmRunnerRequirements;
  modelLicense?: ModelLicense;
}

/** Model-asset requirements plus what a sandbox runner must provide. */
export interface LlmRunnerRequirements extends Omit<ModelRequirements, "quantization"> {
  quantization?: ModelRequirements["quantization"] | "int4";
  minDiskMB?: number;
  minCpuCores?: number;
  contextTokens?: number;
}

export interface LlmEndpoint {
  protocols: LlmProtocol[];
  /** Required when `protocols` includes `openai-chat`; MUST be `https://`. */
  baseUrl?: string;
  defaultModel?: string;
  auth: LlmAuth;
  /** The `inputs[].id` holding the bearer key. */
  authInput?: string;
}

/** The runner job's permission block; at most `contents: write`, `checks: write`, `actions: read`. */
export interface LlmRunPermissions {
  contents?: "read" | "write";
  checks?: "read" | "write";
  actions?: "read";
}

export interface LlmDataHandling {
  prompts: LlmPromptHandling;
  /** Whether `defaultModel` always names the same weights (a router is `false`). */
  modelPinned?: boolean;
  operator?: string;
  /** URL of the operator's terms or data policy. */
  terms?: string;
}
