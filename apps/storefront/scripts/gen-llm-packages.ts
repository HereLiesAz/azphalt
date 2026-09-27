/**
 * Generates the first-party `kind:"llm"` packages under `registry/local/` (spec/llm.md).
 *
 *   pnpm --filter @azphalt/storefront gen-llm-packages
 *
 * Twelve packages share one setup script, one runner and one workflow shape; writing them by hand
 * would let them drift. The table below is the only per-package input. Each package gets:
 *
 * - `manifest.json` — the signed `llm` block;
 * - `LICENSE` — the repository's Apache-2.0 text (the package's own licence, not the weights');
 * - `setup/setup.sh`, `setup/run.py` — copied verbatim from `scripts/llm-sandbox/`;
 * - `setup/package.env`, `setup/fetches.txt` — what those two read;
 * - `setup/workflow.yml` — the runner workflow. The host commits the payload to `llm/<id>/` in the
 *   sandbox repository and this file to `.github/workflows/azphalt-llm-<id>.yml` (spec/llm.md
 *   § github-actions-runner); its `permissions:` equals `llm.run.permissions`.
 *
 * Run it after changing the table or `scripts/llm-sandbox/`, then rebuild each package with
 * `build-catalog --only <id>`.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const here = dirname(fileURLToPath(import.meta.url));
const localDir = resolve(here, "..", "registry", "local");
const sandboxDir = join(here, "llm-sandbox");
const license = readFileSync(resolve(here, "..", "..", "..", "LICENSE"), "utf8");

// Actions the runner uses, pinned by commit: the sandbox holds provider keys.
const CHECKOUT = "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1";
const CACHE_RESTORE = "actions/cache/restore@55cc8345863c7cc4c66a329aec7e433d2d1c52a9 # v6.1.0";
const CACHE_SAVE = "actions/cache/save@55cc8345863c7cc4c66a329aec7e433d2d1c52a9 # v6.1.0";
const UPLOAD = "actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7.0.1";

/** Runner job permissions: read the checkout, write the progress check run. Nothing else. */
const RUN_PERMISSIONS = { contents: "read", checks: "write" } as const;

// llama.cpp CPU build for the standard ubuntu-latest runner. Never "latest".
const LLAMA_CPP = {
  url: "https://github.com/ggml-org/llama.cpp/releases/download/b11218/llama-b11218-bin-ubuntu-x64.tar.gz",
  sha256: "9ed52d78e24bfdadad0637a6481fb79a4bb26ddd61cf40ae3d4c56f6bbead793",
};

type Prompts = "not-retained" | "logged" | "may-train" | "unknown";

interface Endpoint {
  tier: "endpoint";
  slug: string;
  name: string;
  description: string;
  operator: string;
  baseUrl: string;
  model: string;
  /** Keyless endpoints take an optional key: runner IPs are shared, so the anonymous quota may be spent. */
  key: "optional" | "required";
  keyLabel: string;
  prompts: Prompts;
  modelPinned: boolean;
  terms?: string;
}

interface Weights {
  tier: "sandbox-weights";
  slug: string;
  name: string;
  description: string;
  repo: string;
  file: string;
  byteSize: number;
  sha256: string;
  spdx: string;
  minRamMB: number;
  minDiskMB: number;
  contextTokens: number;
}

const PACKAGES: (Endpoint | Weights)[] = [
  {
    tier: "endpoint", slug: "kilo", name: "Kilo Auto (free)",
    description: "Kilo's free router, no key needed. It picks the model, and the free route may log and train on prompts.",
    operator: "Kilo Code", baseUrl: "https://api.kilo.ai/api/gateway", model: "kilo-auto/free",
    key: "optional", keyLabel: "Kilo account key (optional; raises the anonymous limit of 200 requests an hour per IP)",
    prompts: "may-train", modelPinned: false, terms: "https://kilo.ai/terms",
  },
  {
    tier: "endpoint", slug: "llm7", name: "LLM7 GLM-5.3 Flash",
    description: "GLM-5.3 Flash through LLM7, no key needed. A free token from token.llm7.io raises the limit.",
    operator: "LLM7", baseUrl: "https://api.llm7.io/v1", model: "GLM-5.3-Flash",
    key: "optional", keyLabel: "LLM7 token (optional; from https://token.llm7.io/)",
    prompts: "unknown", modelPinned: true,
  },
  {
    tier: "endpoint", slug: "ovhcloud", name: "OVHcloud Qwen3 Coder 30B",
    description: "Qwen3-Coder-30B-A3B on OVHcloud AI Endpoints, no key needed. Anonymous use is two requests a minute per IP.",
    operator: "OVHcloud", baseUrl: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1", model: "Qwen3-Coder-30B-A3B-Instruct",
    key: "optional", keyLabel: "OVHcloud AI Endpoints key (optional; lifts the anonymous limit)",
    prompts: "unknown", modelPinned: true, terms: "https://www.ovhcloud.com/en/terms-and-conditions/",
  },
  {
    tier: "endpoint", slug: "openrouter-free", name: "OpenRouter Free Router",
    description: "OpenRouter's router across its free models. Free-model providers may log and train on prompts, and the model changes under you.",
    operator: "OpenRouter", baseUrl: "https://openrouter.ai/api/v1", model: "openrouter/free",
    key: "required", keyLabel: "OpenRouter API key",
    prompts: "may-train", modelPinned: false, terms: "https://openrouter.ai/terms",
  },
  {
    tier: "endpoint", slug: "groq", name: "Groq gpt-oss-20b",
    description: "OpenAI's open-weight gpt-oss-20b on Groq's free tier. Fast; needs a free Groq key.",
    operator: "Groq", baseUrl: "https://api.groq.com/openai/v1", model: "openai/gpt-oss-20b",
    key: "required", keyLabel: "Groq API key",
    prompts: "unknown", modelPinned: true, terms: "https://groq.com/terms-of-use",
  },
  {
    tier: "endpoint", slug: "cerebras", name: "Cerebras gpt-oss-120b",
    description: "OpenAI's open-weight gpt-oss-120b on Cerebras's free tier. Needs a free Cerebras key.",
    operator: "Cerebras", baseUrl: "https://api.cerebras.ai/v1", model: "gpt-oss-120b",
    key: "required", keyLabel: "Cerebras API key",
    prompts: "unknown", modelPinned: true, terms: "https://www.cerebras.ai/terms-of-service",
  },
  {
    tier: "endpoint", slug: "zai", name: "Z.ai GLM-4.7 Flash",
    description: "GLM-4.7 Flash from Z.ai, free with a key, one request at a time.",
    operator: "Z.ai", baseUrl: "https://api.z.ai/api/paas/v4", model: "glm-4.7-flash",
    key: "required", keyLabel: "Z.ai API key",
    prompts: "unknown", modelPinned: true, terms: "https://docs.z.ai/legal-agreement/privacy-policy",
  },
  {
    tier: "endpoint", slug: "mistral", name: "Mistral Small",
    description: "Mistral Small on Mistral's free Experiment plan, which may train on prompts. The alias tracks the latest release.",
    operator: "Mistral AI", baseUrl: "https://api.mistral.ai/v1", model: "mistral-small-latest",
    key: "required", keyLabel: "Mistral API key",
    prompts: "may-train", modelPinned: false, terms: "https://legal.mistral.ai/terms",
  },
  {
    tier: "sandbox-weights", slug: "qwen2-5-1-5b", name: "Qwen2.5 1.5B Instruct (private sandbox)",
    description: "Qwen2.5 1.5B Instruct, 4-bit, run by llama.cpp in your own private GitHub Actions sandbox. No key; prompts go nowhere else.",
    repo: "Qwen/Qwen2.5-1.5B-Instruct-GGUF", file: "qwen2.5-1.5b-instruct-q4_k_m.gguf", byteSize: 1117320736,
    sha256: "6a1a2eb6d15622bf3c96857206351ba97e1af16c30d7a74ee38970e434e9407e", spdx: "Apache-2.0",
    minRamMB: 3072, minDiskMB: 2048, contextTokens: 4096,
  },
  {
    tier: "sandbox-weights", slug: "qwen2-5-coder-1-5b", name: "Qwen2.5 Coder 1.5B Instruct (private sandbox)",
    description: "Qwen2.5 Coder 1.5B Instruct, 4-bit, run by llama.cpp in your own private GitHub Actions sandbox. Small, code-minded, keyless.",
    repo: "Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF", file: "qwen2.5-coder-1.5b-instruct-q4_k_m.gguf", byteSize: 1117320768,
    sha256: "cc324af070c2ecbfd324a30884d2f951a7ff756aba85cb811a6ec436933bb046", spdx: "Apache-2.0",
    minRamMB: 3072, minDiskMB: 2048, contextTokens: 4096,
  },
  {
    tier: "sandbox-weights", slug: "smollm2-1-7b", name: "SmolLM2 1.7B Instruct (private sandbox)",
    description: "Hugging Face's SmolLM2 1.7B Instruct, 4-bit, run by llama.cpp in your own private GitHub Actions sandbox. Keyless.",
    repo: "HuggingFaceTB/SmolLM2-1.7B-Instruct-GGUF", file: "smollm2-1.7b-instruct-q4_k_m.gguf", byteSize: 1055609536,
    sha256: "decd2598bc2c8ed08c19adc3c8fdd461ee19ed5708679d1c54ef54a5a30d4f33", spdx: "Apache-2.0",
    minRamMB: 3072, minDiskMB: 2048, contextTokens: 4096,
  },
  {
    tier: "sandbox-weights", slug: "phi-3-5-mini", name: "Phi-3.5 Mini Instruct (private sandbox)",
    description: "Microsoft's Phi-3.5 Mini Instruct, 4-bit, run by llama.cpp in your own private GitHub Actions sandbox. The largest here; keyless.",
    repo: "bartowski/Phi-3.5-mini-instruct-GGUF", file: "Phi-3.5-mini-instruct-Q4_K_M.gguf", byteSize: 2393232672,
    sha256: "e4165e3a71af97f1b4820da61079826d8752a2088e313af0c7d346796c38eff5", spdx: "MIT",
    minRamMB: 5120, minDiskMB: 4096, contextTokens: 4096,
  },
];

const idOf = (slug: string) => `com.hereliesaz.azphalt.llm.${slug}`;

function workflow(id: string, withKey: boolean, cacheKey?: string): string {
  const dir = `llm/${id}/setup`;
  const cachePath = "~/.azphalt-llm/fetch";
  const lines = [
    `# Runner for ${id} (azphalt kind:"llm", spec/llm.md § github-actions-runner).`,
    "# Committed by the host to the private sandbox repository; permissions equal llm.run.permissions.",
    "# Generated by apps/storefront/scripts/gen-llm-packages.ts.",
    `name: azphalt-llm ${id}`,
    "run-name: ${{ fromJSON(inputs.task).correlationId }}",
    "on:",
    "  workflow_dispatch:",
    "    inputs:",
    "      task:",
    "        description: Task JSON (spec/llm.md § github-actions-runner)",
    "        required: true",
    "        type: string",
    "permissions:",
    ...Object.entries(RUN_PERMISSIONS).map(([k, v]) => `  ${k}: ${v}`),
    "jobs:",
    "  run:",
    "    runs-on: ubuntu-latest",
    "    timeout-minutes: 30",
    "    steps:",
    `      - uses: ${CHECKOUT}`,
    "        with:",
    "          persist-credentials: false",
  ];
  if (cacheKey) {
    lines.push(
      "      - id: cache",
      `        uses: ${CACHE_RESTORE}`,
      "        with:",
      `          path: ${cachePath}`,
      `          key: ${cacheKey}`,
    );
  }
  lines.push(
    "      - id: setup",
    `        run: bash ${dir}/setup.sh`,
  );
  if (cacheKey) {
    lines.push(
      "      - if: steps.setup.outcome == 'success' && steps.cache.outputs.cache-hit != 'true'",
      `        uses: ${CACHE_SAVE}`,
      "        with:",
      `          path: ${cachePath}`,
      `          key: ${cacheKey}`,
    );
  }
  lines.push(
    "      - if: always()",
    `        run: python3 ${dir}/run.py`,
    "        env:",
    "          TASK: ${{ inputs.task }}",
    "          SETUP_OUTCOME: ${{ steps.setup.outcome }}",
    "          GITHUB_TOKEN: ${{ github.token }}",
    ...(withKey ? ["          PROVIDER_KEY: ${{ secrets.PROVIDER_KEY }}"] : []),
    "      - if: always()",
    `        uses: ${UPLOAD}`,
    "        with:",
    "          name: azphalt-llm-result",
    "          path: result.json",
    "          if-no-files-found: error",
    "          retention-days: 1",
  );
  return lines.join("\n") + "\n";
}

for (const pkg of PACKAGES) {
  const id = idOf(pkg.slug);
  const dir = join(localDir, id);
  mkdirSync(join(dir, "setup"), { recursive: true });
  writeFileSync(join(dir, "LICENSE"), license);
  for (const f of ["setup.sh", "run.py"]) copyFileSync(join(sandboxDir, f), join(dir, "setup", f));

  const githubToken = ["contents:write", "actions:write", "checks:write", "workflows:write"];
  let llm: Record<string, unknown>;
  let env: string[];
  let fetches: string[] = [];
  let cacheKey: string | undefined;

  if (pkg.tier === "endpoint") {
    llm = {
      tier: "endpoint",
      inputs: [{
        id: "providerKey", type: "promptString", password: true,
        ...(pkg.key === "optional" ? { optional: true } : {}), description: pkg.keyLabel,
      }],
      setup: {
        sandbox: "github-actions", script: "setup/setup.sh",
        requires: { githubToken: [...githubToken, "secrets:write"] },
        secrets: [{ name: "PROVIDER_KEY", input: "providerKey" }],
        fetches: [],
      },
      endpoint: {
        protocols: ["openai-chat", "github-actions-runner"], baseUrl: pkg.baseUrl, defaultModel: pkg.model,
        auth: pkg.key === "optional" ? "optional-bearer" : "required-bearer", authInput: "providerKey",
      },
      run: { permissions: RUN_PERMISSIONS },
      dataHandling: {
        prompts: pkg.prompts, modelPinned: pkg.modelPinned, operator: pkg.operator, ...(pkg.terms ? { terms: pkg.terms } : {}),
      },
      role: "text-generation",
    };
    env = [`AZPHALT_LLM_TIER=endpoint`, `AZPHALT_LLM_BASE_URL=${pkg.baseUrl}`, `AZPHALT_LLM_MODEL=${pkg.model}`];
  } else {
    const modelUrl = `https://huggingface.co/${pkg.repo}/resolve/main/${pkg.file}`;
    fetches = [`${LLAMA_CPP.sha256} runtime.tar.gz ${LLAMA_CPP.url}`, `${pkg.sha256} model.gguf ${modelUrl}`];
    // § Weight caching: keyed by the SHA-256 of the sorted member checksums.
    cacheKey = "azphalt-llm-weights-" +
      createHash("sha256").update([LLAMA_CPP.sha256, pkg.sha256].map((s) => "sha256-" + s).sort().join("\n")).digest("hex");
    llm = {
      tier: "sandbox-weights",
      setup: {
        sandbox: "github-actions", script: "setup/setup.sh",
        requires: { githubToken },
        fetches: [{ url: LLAMA_CPP.url, checksum: "sha256-" + LLAMA_CPP.sha256 }],
      },
      weights: {
        runtime: "llama.cpp",
        files: [{ name: "model.gguf", remoteUrl: modelUrl, checksum: "sha256-" + pkg.sha256, byteSize: pkg.byteSize, supportsRange: true }],
        modelLicense: { spdx: pkg.spdx, commercialUse: true, sourceUrl: `https://huggingface.co/${pkg.repo}` },
        requirements: {
          accelerator: "cpu", quantization: "int4", minRamMB: pkg.minRamMB, minDiskMB: pkg.minDiskMB,
          minCpuCores: 2, contextTokens: pkg.contextTokens,
        },
      },
      endpoint: { protocols: ["github-actions-runner"], defaultModel: "model.gguf", auth: "none" },
      run: { permissions: RUN_PERMISSIONS },
      dataHandling: { prompts: "not-retained", modelPinned: true, operator: "GitHub (your private sandbox runner only)" },
      role: "text-generation",
    };
    env = [`AZPHALT_LLM_TIER=sandbox-weights`, `AZPHALT_LLM_CONTEXT=${pkg.contextTokens}`];
  }

  const manifest = {
    azphalt: "0.1",
    id,
    name: pkg.name,
    version: "1.0.0",
    kind: "llm",
    license: "Apache-2.0",
    compat: ">=0.1",
    description: pkg.description,
    author: "HereLiesAz",
    llm,
  };
  writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  writeFileSync(join(dir, "setup", "package.env"), "# Generated by gen-llm-packages.ts; read by setup/run.py.\n" + env.join("\n") + "\n");
  writeFileSync(join(dir, "setup", "fetches.txt"),
    "# <sha256> <name> <url>, verified by setup/setup.sh. Generated by gen-llm-packages.ts.\n" + fetches.map((f) => f + "\n").join(""));
  writeFileSync(join(dir, "setup", "workflow.yml"), workflow(id, pkg.tier === "endpoint", cacheKey));
  console.log("gen-llm-packages: " + id);
}
