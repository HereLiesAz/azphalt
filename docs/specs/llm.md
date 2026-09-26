# Off-device language models (`kind: "llm"`)

*Status: **Proposed**. Extends the package model with a kind for a **language model a host reaches off
the device**: a hosted OpenAI-compatible endpoint, or open weights the host runs in a private
GitHub Actions sandbox. Modeled on `kind: "mcp"` (mcp-server.md): the package is a signed header plus
a bundled setup script, and the host runs everything **outside the user's device** under consent. No
SDK wiring, verifier, or conformance profile exists yet.*

## Why this exists — and why it doesn't break the moat

A model asset (`extension-manifest.md § assets`) is weights a host runs **on-device**, fetched once
through the checksum-gated `remoteUrl` pattern and then run with no network. A hosted language model
is the opposite: it *is* a network endpoint, and self-containment (`package-format.md`) forbids an
asset from making a host reach the network. So an off-device model **cannot be a model asset**, and
this spec does not try to make it one.

It reuses the header pattern proven by `app` and `mcp`: the `.azp` declares **how to set up and
reach** the model; the host runs the setup in an off-device sandbox and talks to the model there. The
moat holds because:

- The package grants **no editor capability** and ships **no** `/code` sandbox payload. The
  never-list is unaffected: nothing here gives a sandboxed extension network, camera, sensors, or
  filesystem.
- **Nothing runs on the user's device.** The setup script runs in a sandbox the host provisions
  (`github-actions` in `0.1`); a host MUST NOT execute it locally. Off-device execution has no path to
  the device's camera, sensors, files, editor surface, or host engine — those are *absent*, not gated.
- What the sandbox *can* reach is bounded by the rules below: a dedicated private repository,
  short-lived tokens, a declared permission set, and results the user approves before they touch
  anything else.

### Scope: parity, not a cure for prompt injection

Prompt injection is unsolved for **every** model, on-device models included. This kind is held to the
same bar as an on-device model — it must not be *more* exposed — not to a bar no model meets. Its
defenses therefore constrain what a model's output can **do** (sandbox, scoped tokens, approval
before results leave the sandbox) and make authority boundaries unforgeable (§ Rolling delimiters);
they do not claim to stop a model from being persuaded by text it was asked to process.

## Tiers

An `llm` package declares one **tier**, which fixes where prompts go:

- **`endpoint`** — a third-party service runs the model. Prompts leave the user's control and reach
  the operator; `dataHandling` (below) MUST say what the operator does with them.
- **`sandbox-weights`** — the setup script installs checksum-pinned open weights in the private
  sandbox, and the model runs there. No third-party model operator sees a prompt; only the sandbox
  provider's infrastructure is involved. Slower and smaller (CPU runners), but it restores the
  self-containment and integrity guarantees of an on-device model.

## The package (`kind: "llm"`)

A normal signed `.azp` whose `kind` is `"llm"`. Its manifest adds one block, `llm`; its payload
carries the setup script (integrity-covered by `manifest.files`).

~~~jsonc
{
  "azphalt": "0.1",
  "id": "com.example.azphalt.kilo-gateway",
  "name": "Kilo Gateway (free)",
  "version": "1.0.0",
  "kind": "llm",
  "license": "MIT",
  "compat": ">=0.1",
  "llm": {
    "tier": "endpoint",
    // Secrets are NEVER in the package; the host prompts (same rules as mcp-server.md § Inputs).
    "inputs": [
      { "id": "providerKey", "type": "promptString", "password": true, "optional": true,
        "description": "Kilo account key (optional; raises the anonymous rate limit)" }
    ],
    "setup": {
      "sandbox": "github-actions",
      "script": "setup/setup.sh",
      "requires": { "githubToken": ["contents:write", "actions:write", "checks:write", "workflows:write", "secrets:write"] },
      "secrets": [ { "name": "PROVIDER_KEY", "input": "providerKey" } ],
      "fetches": []
    },
    "endpoint": {
      "protocols": ["openai-chat", "github-actions-runner"],
      "baseUrl": "https://api.kilo.ai/api/gateway",
      "defaultModel": "kilo-auto/free",
      "auth": "optional-bearer",
      "authInput": "providerKey"
    },
    "run": { "permissions": { "contents": "write", "checks": "write" } },
    "dataHandling": { "prompts": "may-train", "modelPinned": false, "operator": "Kilo Code" },
    "role": "text-generation"
  },
  "files": { "setup/setup.sh": "sha256-…" /* + manifest + LICENSE + preview */ }
}
~~~

A `sandbox-weights` package runs open weights in the sandbox with llama.cpp. It is keyless, so it
declares no inputs or secrets:

~~~jsonc
{
  "azphalt": "0.1",
  "id": "com.example.azphalt.qwen2-5-1-5b-sandbox",
  "name": "Qwen2.5 1.5B Instruct (private sandbox)",
  "version": "1.0.0",
  "kind": "llm",
  "license": "MIT",
  "compat": ">=0.1",
  "llm": {
    "tier": "sandbox-weights",
    "setup": {
      "sandbox": "github-actions",
      "script": "setup/setup.sh",
      "requires": { "githubToken": ["contents:write", "actions:write", "checks:write", "workflows:write"] },
      "fetches": [
        // A pinned llama.cpp release build; never "latest".
        { "url": "https://github.com/ggml-org/llama.cpp/releases/download/bNNNN/llama-bNNNN-bin-ubuntu-x64.zip",
          "checksum": "sha256-…" }
      ]
    },
    "weights": {
      "runtime": "llama.cpp",
      "files": [
        { "name": "model.gguf",
          "remoteUrl": "https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/qwen2.5-1.5b-instruct-q4_k_m.gguf",
          "checksum": "sha256-…", "byteSize": 1120000000, "supportsRange": true }
      ],
      "modelLicense": { "spdx": "Apache-2.0", "commercialUse": true },
      "requirements": { "accelerator": "cpu", "quantization": "int4", "minRamMB": 3072,
                        "minDiskMB": 2048, "minCpuCores": 2, "contextTokens": 4096 }
    },
    "endpoint": { "protocols": ["github-actions-runner"], "defaultModel": "model.gguf", "auth": "none" },
    "run": { "permissions": { "contents": "write", "checks": "write" } },
    "dataHandling": { "prompts": "not-retained", "modelPinned": true, "operator": "GitHub (sandbox runner only)" },
    "role": "text-generation"
  },
  "files": { "setup/setup.sh": "sha256-…" }
}
~~~

The weights are cached between runs (§ Sandbox); the Actions cache needs no entry in `permissions`.

### `llm` block fields

- **`tier`** — `endpoint` | `sandbox-weights` (§ Tiers). Required.
- **`inputs[]`** — values the host prompts for (provider keys and the like), never stored in the
  package. Same shape and `${input:<id>}` substitution as `mcp-server.md § Inputs & secrets`, plus
  `optional: true` for a key the model works without.
- **`setup`** — required, for every tier (§ Setup).
- **`weights`** — required for `sandbox-weights`, forbidden for `endpoint`.
  `{ runtime, files[], requirements?, modelLicense? }`:
  - `runtime` names the inference runtime the setup script installs (open vocabulary, e.g.
    `llama.cpp`, `onnxruntime-genai`).
  - `files[]` uses the multi-file member shape of `extension-manifest.md § Multi-file model bundles`,
    with every member remote: `remoteUrl`, `checksum`, and `byteSize` (required here, since the host
    budgets disk and cache with it).
  - `requirements` is what the sandbox runner must provide (§ Runner requirements).
  - `modelLicense` carries the weights' own terms, in the shape of
    `extension-manifest.md § Model license`; a host MUST surface it before install.
- **`endpoint`** — how the host talks to the model once set up (§ Protocols). Required.
  - `protocols` — a non-empty subset of `openai-chat`, `github-actions-runner`. `sandbox-weights`
    permits only `github-actions-runner`.
  - `baseUrl` — required when `protocols` includes `openai-chat`; MUST be `https://`.
  - `defaultModel` — the model id to request; the host MAY let the user override it.
  - `auth` — `none` | `optional-bearer` | `required-bearer`. A bearer mode names its key via
    `authInput` (an `inputs[].id`).
- **`run.permissions`** — the permission block of the sandbox job that runs the model (§ Sandbox).
- **`dataHandling`** — required for `endpoint`, advisory for `sandbox-weights`. `prompts`:
  `not-retained` | `logged` | `may-train` | `unknown`; `modelPinned`: whether `defaultModel` always
  names the same weights (a router such as `kilo-auto/free` is `false`); optional `operator`, `terms`
  (URL). A host MUST surface it before install, like `modelLicense`.
- **`role`** — open vocabulary routing hint, as for model assets; `text-generation` is blessed.

## Setup

Every `llm` package carries a setup script, even when all it has to do is confirm that a GitHub token
with the needed permissions exists. Setup is **off-device only**.

- **`sandbox`** — where setup and the model run. `0.1` defines only `github-actions`. A host that
  cannot provide the named sandbox MUST NOT install the package. A host MUST NOT run `script` on the
  user's device under any circumstances.
- **`script`** — a path present in `manifest.files`, so the signed manifest covers its bytes.
- **`requires.githubToken`** — the permissions the **one-time setup token** needs. The host checks the
  token has them before offering the install, shows them in the consent prompt, and uses that token
  only to provision the sandbox and run setup.
- **`secrets[]`** — maps `inputs` to sandbox secrets (`{ name, input }`). The host stores each as an
  Actions secret in the sandbox repository; the value never enters the package, the repository
  contents, or a workflow input.
- **`fetches[]`** — every URL the script downloads (`{ url, checksum }`), each pinned by `sha256-`
  checksum. The script MUST verify each fetch against its checksum and fail closed on mismatch;
  `weights.files[]` members count as declared fetches. Package managers MUST install exact, pinned
  versions. This is the remote-asset integrity rule carried into the sandbox; a verifier can check
  the declaration, and a conforming script honors it.

### Sandbox (`github-actions`)

- **A dedicated private repository.** The host provisions (or reuses) a private repository used only
  for azphalt `llm` sandboxes, never one of the user's project repositories. Setup commits the
  package's runner workflow and script there. Privacy keeps outsiders from planting issues, comments,
  or pull requests the model would read.
- **Short-lived tokens, split by phase.** The setup token is used once, with consent, and SHOULD be a
  fine-grained token or GitHub App installation token scoped to the sandbox repository alone. At run
  time the model job uses only the job's own `GITHUB_TOKEN`, which expires with the job and cannot
  modify workflow files, so a hijacked run cannot make itself persistent. A host MAY broker tokens
  through a service it operates (for example, a Cloudflare Worker minting one-hour installation
  tokens) so the device never holds a long-lived token.
- **Declared run permissions.** The runner workflow's `permissions:` block MUST equal
  `run.permissions`, which a verifier rejects if it exceeds `contents: write`, `checks: write`, and
  `actions: read`. No `workflows`, no `id-token`, no `pull-requests`, no secrets beyond `setup.secrets`.
- **Results stay in the sandbox.** Model output returns as a check-run log and a result artifact
  (§ Protocols). A host applies anything to the user's own repositories or data only after the user
  approves it.
- **Egress.** A runner SHOULD restrict outbound network to the declared `endpoint.baseUrl` and
  `setup.fetches` (for example with an egress-allowlist step). GitHub-hosted runners provide no native
  restriction, so this is SHOULD, not MUST.
- **Weight caching.** A `sandbox-weights` runner SHOULD cache the weights with the Actions cache, keyed
  by the weights' checksums (for example `azphalt-llm-weights-` followed by the SHA-256 of the sorted
  member checksums), so a run does not download multi-gigabyte files again. A restored cache is
  untrusted storage: the runner MUST re-verify every member against its `checksum` before loading it,
  and discard the cache on mismatch. The Actions cache is bounded per repository (10 GB) and evicts
  entries unused for 7 days; when the weights' total `byteSize` exceeds the bound, the host SHOULD
  tell the user that each run downloads them afresh.
- **Shared IP pools.** Keyless tiers rate-limit by IP address, and hosted runners share addresses with
  every other Actions user, so an anonymous quota may already be spent. A package whose model is
  keyless SHOULD offer an optional key via `inputs` and `setup.secrets` for runner use.

### Runner requirements

`weights.requirements` extends the model-asset `requirements` block
(`extension-manifest.md § Model requirements`) with what a sandbox runner must supply. All fields are
optional; a host uses what it understands.

~~~jsonc
"requirements": {
  "accelerator": "cpu",     // "cpu" | "gpu"; "gpu" needs a runner that has one
  "quantization": "int4",   // as for model assets, plus "int4" for 4-bit formats such as GGUF Q4
  "minRamMB": 4096,         // resident memory for weights + context
  "minDiskMB": 3072,        // weights + runtime + scratch
  "minCpuCores": 2,
  "contextTokens": 8192     // the context length the RAM figure assumes
}
~~~

A host compares these with the runner it will use (the standard hosted runner for a private repository
unless the user chose a larger one) and MUST NOT offer the install when the runner cannot meet them.
A registry MAY filter on them. As with model assets, they gate the install and never change how the
model runs.

## Protocols

A host talks to a set-up model through one of the declared protocols. When both are declared, the
host (or the user) chooses; `openai-chat` is faster, `github-actions-runner` keeps calls inside the
sandbox.

### `openai-chat`

The host sends `POST {baseUrl}/chat/completions` directly, with roles as separate `messages` entries
and the bearer key from `authInput` when present. Untrusted material goes only in `user`-role content,
under § Rolling delimiters.

### `github-actions-runner`

The host dispatches the sandbox's runner workflow and follows it:

1. **Dispatch.** `workflow_dispatch` with a single `task` input (JSON). The workflow's `run-name`
   carries a host-chosen correlation id, so the host can find the run again after a restart without
   dispatching a second time.
2. **Progress.** The run writes steps to a check run whose name is the correlation id; `output.text`
   holds one `<seq>\t<message>` line per step, append-only. The host reads it incrementally and
   de-duplicates by `seq`.
3. **Result.** The run uploads an artifact named `azphalt-llm-result` containing `result.json`:
   `{ "status": "completed" | "failed", "message", "text"?, "patch"?, "branch"?, "inputTokens"?,
   "outputTokens"? }`. A host MUST bound the artifact (reference: 4 MB zipped, 2 MB JSON) and treat
   every field as untrusted model output.

## Rolling delimiters

Hosts and runners keep **authority** (instructions, setup context) and **material** (the text the
model is asked to process) apart with a delimiter the material cannot forge.

- **Setup context never reaches the model.** Setup is a script; nothing it reads or writes is placed
  in a model's context.
- **Per-turn tags.** For turn `n` the host derives
  `tag_n = base32(HMAC-SHA256(sessionKey, "azphalt-llm-turn:" || n))[0:26]`, with a fresh random
  `sessionKey` per session. Each untrusted segment is wrapped `⟦tag_n⟧ … ⟦/tag_n⟧`.
- **Escaping.** Before wrapping, the host removes or escapes, inside untrusted text, every occurrence
  of any tag of the session and of the target model's native control tokens and role markers.
- **Translation.** A trusted translator — the host for `openai-chat`, the runner for
  `github-actions-runner` (before the model call, never inside the model) — maps tagged segments to
  the model's native structure: separate `user`-role messages, or the runtime's chat template. **Tags
  never reach the model**; it sees only its standard delimiters.
- **Output check.** Output that contains any tag of the session is rejected.
- For `github-actions-runner`, `sessionKey` travels in the dispatch `task` input. The sandbox is
  private, so the key is hidden from the authors of untrusted material, which is all the scheme
  requires.

What this buys: material cannot pose as instructions or setup context, because it cannot guess the
current tag and native markers are escaped. What it does not buy: immunity from persuasion — see
§ Scope.

## Verification

`verifyAzp` would apply these rules to a `kind: "llm"` manifest, in addition to container integrity
and signature checks:

- The manifest has an `llm` block and no `entry` / `runtime`, `capabilities`, `assets`, `app`, or
  `mcp` block.
- `llm.tier` is `endpoint` or `sandbox-weights`; `weights` is present exactly when the tier is
  `sandbox-weights`, and every `weights.files[]` member has `remoteUrl`, a `sha256-` `checksum`, and
  `byteSize`.
- `llm.setup` is present; `setup.sandbox` is a known value; `setup.script` names a path in
  `manifest.files`; every `setup.fetches[]` entry has `url` and a `sha256-` `checksum`.
- `llm.endpoint.protocols` is non-empty and allowed for the tier; `openai-chat` requires an `https://`
  `baseUrl`; a bearer `auth` names an `authInput` that is a declared input.
- `llm.run.permissions` stays within the allowed set (§ Sandbox).
- `llm.dataHandling` is present for the `endpoint` tier.
- Every `${input:…}` reference and every `setup.secrets[].input` resolves to a declared input; no
  literal secret appears (the credential-keyed rule of mcp-server.md).

Signing, publisher pinning, registry counter-signing, and revocations apply unchanged.

## Discovery & registry

- `kind: "llm"` flows through the browse/search summary and package detail like any other kind.
- A registry carrying these packages advertises an `"llm"` profile, so only hosts that implement a
  sandbox and a protocol browse for them.
- The store card shows the tier, `dataHandling`, and the setup token permissions before install.

## Open questions

- **Other sandboxes.** GitLab CI, self-hosted runners, or confidential-computing enclaves as further
  `setup.sandbox` values.
- **Conformance.** An `"llm"` host-conformance profile: header-only rules, refusal to run setup
  on-device, consent display, rolling-delimiter translation, bounded result parsing.
- **Sandbox repository sharing.** One sandbox repository per host install or one per package.
