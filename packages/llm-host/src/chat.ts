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
  fetch?: typeof fetch;
  signal?: AbortSignal;
}

export interface ChatResult {
  text: string;
  inputTokens?: number;
  outputTokens?: number;
}

export async function chatLlm(opts: ChatOptions): Promise<ChatResult> {
  const llm = llmBlock(opts.manifest);
  const { endpoint } = llm;
  if (!endpoint.protocols.includes("openai-chat") || !endpoint.baseUrl) throw new Error(`${opts.manifest.id} does not offer openai-chat`);
  if (endpoint.auth === "required-bearer" && !opts.key) throw new Error(`${opts.manifest.id} needs a key`);
  const model = opts.model || endpoint.defaultModel;
  if (!model) throw new Error("no model named and the package declares no defaultModel");

  const tags = opts.sessionKey ? await sessionTags(opts.sessionKey, opts.turn ?? 0) : [];
  const messages = translate(opts.messages, tags);
  const res = await (opts.fetch ?? fetch)(endpoint.baseUrl.replace(/\/$/, "") + "/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", ...(opts.key ? { authorization: `Bearer ${opts.key}` } : {}) },
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
  const text = body.choices?.[0]?.message?.content ?? "";
  if (containsSessionTag(text, tags)) throw new Error("output contained a session tag; rejected");
  return { text, inputTokens: body.usage?.prompt_tokens, outputTokens: body.usage?.completion_tokens };
}
