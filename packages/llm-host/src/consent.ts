/**
 * What a host MUST show before installing a `kind:"llm"` package (`spec/llm.md` § Discovery and
 * § Setup): where prompts go and what the operator does with them, the weights' licence, the setup
 * token's permissions, which inputs become sandbox secrets, and every URL setup downloads.
 */
import type { LlmDataHandling, LlmManifest, Manifest } from "@azphalt/azdk";

export interface LlmConsent {
  packageId: string;
  name: string;
  tier: LlmManifest["tier"];
  /** `sandbox`: prompts stay in the user's private runner. `third-party`: they go to [endpointHost]. */
  runs: "sandbox" | "third-party";
  endpointHost?: string;
  defaultModel?: string;
  dataHandling?: LlmDataHandling;
  modelLicense?: { spdx?: string; commercialUse?: boolean; url?: string };
  /** Total bytes of weights the sandbox downloads and caches. */
  weightsBytes: number;
  /** Permissions the one-time setup token needs. */
  setupTokenPermissions: string[];
  /** Inputs the host prompts for, and whether each becomes a sandbox secret. */
  inputs: { id: string; description?: string; optional: boolean; secretName?: string }[];
  /** Every URL setup downloads, weights included. */
  fetches: string[];
  /** The runner job's permission block. */
  runPermissions: Record<string, string>;
}

/** Throws unless [manifest] is a `kind:"llm"` package. */
export function llmBlock(manifest: Manifest): LlmManifest {
  if (manifest.kind !== "llm" || !manifest.llm) throw new Error(`${manifest.id} is not a kind:"llm" package`);
  return manifest.llm;
}

function hostOf(baseUrl: string): string {
  const ref = /^\$\{input:([^}]{1,128})\}$/.exec(baseUrl);
  if (ref) return `(supplied by you: ${ref[1]})`;
  return new URL(baseUrl).host;
}

export function llmConsent(manifest: Manifest): LlmConsent {
  const llm = llmBlock(manifest);
  const secretFor = new Map((llm.setup.secrets ?? []).map((s) => [s.input, s.name]));
  return {
    packageId: manifest.id,
    name: manifest.name,
    tier: llm.tier,
    runs: llm.tier === "sandbox-weights" ? "sandbox" : "third-party",
    // A `${input:…}` base URL is not a URL until the user supplies it, and `new URL` would throw on it
    // — which crashed the mandatory consent screen for exactly the packages that need it most. The
    // user is shown the placeholder instead; the real host is shown once the input is resolved.
    endpointHost: llm.endpoint.baseUrl ? hostOf(llm.endpoint.baseUrl) : undefined,
    defaultModel: llm.endpoint.defaultModel,
    dataHandling: llm.dataHandling,
    modelLicense: llm.weights?.modelLicense,
    weightsBytes: (llm.weights?.files ?? []).reduce((n, f) => n + (f.byteSize ?? 0), 0),
    setupTokenPermissions: llm.setup.requires?.githubToken ?? [],
    inputs: (llm.inputs ?? []).map((i) => ({
      id: i.id,
      description: i.description,
      optional: i.optional === true,
      secretName: secretFor.get(i.id),
    })),
    fetches: [...(llm.setup.fetches ?? []).map((f) => f.url), ...(llm.weights?.files ?? []).map((f) => f.remoteUrl)],
    runPermissions: { ...(llm.run?.permissions ?? {}) },
  };
}
