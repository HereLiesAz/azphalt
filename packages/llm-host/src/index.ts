/**
 * Host side of azphalt `kind:"llm"` packages (`spec/llm.md`): the consent a host must show, install
 * into a private GitHub Actions sandbox, the `github-actions-runner` and `openai-chat` protocols, and
 * rolling delimiters.
 */
export { llmBlock, llmConsent, type LlmConsent } from "./consent.js";
export { installLlm, type InstallOptions, type InstallResult } from "./install.js";
export {
  findRun,
  parseResult,
  runLlm,
  MAX_ARTIFACT_BYTES,
  MAX_RESULT_BYTES,
  type LlmInstall,
  type LlmResult,
  type LlmTask,
  type RunOptions,
} from "./run.js";
export { chatLlm, type ChatOptions, type ChatResult } from "./chat.js";
export {
  containsSessionTag,
  newSessionKey,
  scrub,
  sessionTags,
  translate,
  turnTag,
  wrap,
  type ChatMessage,
} from "./delimiters.js";
export { sealedBox } from "./sealed-box.js";
export { GitHubError, type GitHubClient } from "./github.js";
