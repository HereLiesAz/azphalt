# @azphalt/llm-host

The host side of azphalt [`kind: "llm"`](../../spec/llm.md) packages: what to show before install, installing into a private GitHub Actions sandbox, talking to the model over either protocol, and rolling delimiters.

Nothing here runs a package's setup on the device. Setup and the runner run in the sandbox; this library only calls the GitHub REST API and, for `openai-chat`, the model endpoint.

## Install a package

~~~ts
import { llmConsent, installLlm } from "@azphalt/llm-host";
import { readAzp } from "@azphalt/azp";

const consent = llmConsent(readAzp(azpBytes).manifest);
// Show consent.runs / endpointHost / dataHandling / modelLicense / setupTokenPermissions /
// inputs / fetches, and collect the inputs, before going further.

const { install, setup } = await installLlm({
  github: { token: setupToken },      // used once for this call; drop it afterwards
  owner: "me", repo: "azphalt-llm",   // a private repository used only for llm sandboxes
  createIfMissing: true,
  azp: azpBytes,
  inputs: { providerKey: "…" },       // stored as sealed Actions secrets, never committed
  onProgress: (seq, message) => console.log(seq, message),
});
// Persist `install`. `setup.status` is "completed" once the sandbox answered a smoke test.
~~~

The package is verified before anything is written. The sandbox must be private. The payload lands in `llm/<package id>/`, the runner workflow in `.github/workflows/azphalt-llm-<package id>.yml`, in one commit, so several packages can share one sandbox.

## Run a task

~~~ts
import { runLlm, newSessionKey, sessionTags, wrap } from "@azphalt/llm-host";

const sessionKey = newSessionKey();               // one per conversation
const tags = await sessionTags(sessionKey, turn);  // every tag up to this turn
const result = await runLlm({
  github: { token }, install,
  task: {
    sessionKey, turn,
    messages: [{ role: "user", content: `Summarize this issue: ${wrap(untrustedIssueText, tags)}` }],
  },
  onProgress: (seq, message) => …,
});
~~~

Untrusted material goes only inside `wrap()`. The runner turns each wrapped segment into its own `user` message, so the model never sees a tag, and a result whose text contains any session tag comes back as `failed`. `result.json` is read from the `azphalt-llm-result` artifact with the spec's reference bounds (4 MB zipped, 2 MB JSON); every field is untrusted model output.

After a restart, pass `resume: true` with the same `task.correlationId` to follow the run you already dispatched instead of starting another.

## Call an endpoint directly

For packages that declare `openai-chat`, `chatLlm({ manifest, key, messages, sessionKey, turn })` calls `{baseUrl}/chat/completions` itself, doing the same delimiter translation and output check on the host.

## API

- `llmConsent(manifest)`: the disclosure a host must show before install.
- `installLlm(options)`: verify, commit, seal secrets, and run setup.
- `runLlm(options)`, `findRun(github, install, correlationId)`, `parseResult(bytes)`: the `github-actions-runner` protocol.
- `chatLlm(options)`: the `openai-chat` protocol.
- `newSessionKey()`, `turnTag()`, `sessionTags()`, `wrap()`, `scrub()`, `translate()`, `containsSessionTag()`: rolling delimiters, byte-compatible with the reference runner.
- `sealedBox(message, publicKey)`: libsodium `crypto_box_seal`, as GitHub requires for secrets.
