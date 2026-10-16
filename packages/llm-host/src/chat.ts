/**
 * The `openai-chat` protocol (`spec/llm.md` § Protocols): the host calls the endpoint directly and
 * is itself the trusted translator of § Rolling delimiters.
 */
import type { Manifest } from "@azphalt/azdk";
import { llmBlock } from "./consent.js";
import { containsSessionTag, sessionTags, translate, type ChatMessage } from "./delimiters.js";

export interface ChatOptions {
  manifest: Manifest;
  messages: ChatMessage[];
  /** The bearer key from the package's `authInput`, when the user gave one. */
  key?: string;
  sessionKey?: string;
  turn?: number;
  /** Overrides `endpoint.defaultModel`. */
  model?: string;
  maxTokens?: number;
  temperature?: number;
  /** Values for the package's `${input:…}` placeholders (e.g. a user-supplied `baseUrl`). */
  inputs?: Record<string, string>;
  fetch?: typeof fetch;
  signal?: AbortSignal;
}

export interface ChatResult {
  text: string;
  inputTokens?: number;
  outputTokens?: number;
}

/** Resolve a `${input:id}` base URL from [inputs] and require the result to be a credential-free https URL. */
function resolveBaseUrl(baseUrl: string, inputs: Record<string, string> | undefined): string {
  const ref = /^\$\{input:([^}]{1,128})\}$/.exec(baseUrl);
  const resolved = ref ? inputs?.[ref[1]] : baseUrl;
  if (!resolved) throw new Error(`the endpoint URL needs the "${ref?.[1] ?? "?"}" input`);
  let url: URL;
  try {
    url = new URL(resolved);
  } catch {
    throw new Error("the endpoint URL is not a valid URL");
  }
  if (url.protocol !== "https:" || url.username || url.password) throw new Error("the endpoint URL must be https:// with no credentials");
  return resolved;
}

export async function chatLlm(opts: ChatOptions): Promise<ChatResult> {
  const llm = llmBlock(opts.manifest);
  const { endpoint } = llm;
  if (!endpoint.protocols.includes("openai-chat") || !endpoint.baseUrl) throw new Error(`${opts.manifest.id} does not offer openai-chat`);
  if (endpoint.auth === "required-bearer" && !opts.key) throw new Error(`${opts.manifest.id} needs a key`);
  const model = opts.model || endpoint.defaultModel;
  if (!model) throw new Error("no model named and the package declares no defaultModel");

  const baseUrl = resolveBaseUrl(endpoint.baseUrl, opts.inputs);
  const tags = opts.sessionKey ? await sessionTags(opts.sessionKey, opts.turn ?? 0) : [];
  const messages = translate(opts.messages, tags);
  const res = await (opts.fetch ?? fetch)(baseUrl.replace(/\/$/, "") + "/chat/completions", {
    method: "POST",
    // Send the key only to an endpoint that declared it takes one — never leak a bearer to `auth: none`.
    headers: {
      "content-type": "application/json",
      ...(opts.key && endpoint.auth !== "none" ? { authorization: `Bearer ${opts.key}` } : {}),
    },
    body: JSON.stringify({
      model,
      messages,
      ...(opts.maxTokens !== undefined ? { max_tokens: opts.maxTokens } : {}),
      ...(opts.temperature !== undefined ? { temperature: opts.temperature } : {}),
    }),
    signal: opts.signal,
  });
  if (!res.ok) throw new Error(`model endpoint answered HTTP ${res.status}`);
  const body = (await res.json()) as {
    choices?: { message?: { content?: string | null } }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };
  const content = body.choices?.[0]?.message?.content ?? "";
  // Third-party JSON: a non-string `content` (an array would make `text.includes(tag)` an array
  // membership test and slip past the tag check) is a malformed answer, not text.
  if (typeof content !== "string") throw new Error("model endpoint returned non-text content; rejected");
  const text = content;
  if (containsSessionTag(text, tags)) throw new Error("output contained a session tag; rejected");
  return { text, inputTokens: body.usage?.prompt_tokens, outputTokens: body.usage?.completion_tokens };
}
