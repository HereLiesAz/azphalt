/**
 * Rolling delimiters (`spec/llm.md` § Rolling delimiters).
 *
 * The host wraps each untrusted segment of turn `n` in `⟦tag_n⟧ … ⟦/tag_n⟧`, where
 * `tag_n = base32(HMAC-SHA256(sessionKey, "azphalt-llm-turn:" || n))[0:26]`. Material cannot forge a
 * tag it cannot compute, so it cannot pose as instructions. A trusted translator — this module for
 * `openai-chat`, the sandbox runner for `github-actions-runner` — turns tagged segments into separate
 * `user` messages, so tags never reach the model; output containing any session tag is rejected.
 *
 * Must stay byte-for-byte compatible with the reference runner (`scripts/llm-sandbox/run.py`).
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
// Chat-template control tokens and role markers of the common open-weight families (as run.py).
const NATIVE_MARKERS = /<\|[A-Za-z0-9_]{1,40}\|>|\[\/?INST\]|<<\/?SYS>>|<\/?s>|<start_of_turn>|<end_of_turn>/g;

function base32(bytes: Uint8Array): string {
  let out = "";
  let bits = 0;
  let value = 0;
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += B32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31];
  return out;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array<ArrayBuffer> {
  const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (text.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

/** A fresh session key: 32 random bytes, unpadded base64url. One per conversation. */
export function newSessionKey(): string {
  return toBase64Url(crypto.getRandomValues(new Uint8Array(32)));
}

/** `tag_n` for [sessionKey] (unpadded base64url, at least 16 bytes). */
export async function turnTag(sessionKey: string, n: number): Promise<string> {
  const raw = fromBase64Url(sessionKey);
  if (raw.length < 16) throw new Error("sessionKey must decode to at least 16 bytes");
  if (!Number.isInteger(n) || n < 0) throw new Error("turn must be a non-negative integer");
  const key = await crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`azphalt-llm-turn:${n}`)));
  return base32(mac).slice(0, 26);
}

/** Every tag of the session up to and including [turn], oldest first. */
export async function sessionTags(sessionKey: string, turn: number): Promise<string[]> {
  return Promise.all(Array.from({ length: turn + 1 }, (_, n) => turnTag(sessionKey, n)));
}

/** Remove every session tag and native control marker from untrusted text. */
export function scrub(text: string, tags: string[]): string {
  let out = text;
  for (const tag of tags) out = out.split(`⟦${tag}⟧`).join("").split(`⟦/${tag}⟧`).join("");
  return out.replace(NATIVE_MARKERS, "");
}

/** Wrap untrusted [material] for the current turn (the last of [tags]), scrubbing it first. */
export function wrap(material: string, tags: string[]): string {
  const tag = tags[tags.length - 1];
  if (!tag) throw new Error("wrap needs the session's tags");
  return `⟦${tag}⟧${scrub(material, tags)}⟦/${tag}⟧`;
}

/** True when [text] carries any tag of the session: model output that does is rejected. */
export function containsSessionTag(text: string, tags: string[]): boolean {
  return tags.some((tag) => text.includes(tag));
}

/**
 * The translator: tagged segments of the current turn become their own `user` messages, scrubbed;
 * text outside tags keeps its role. Throws on an unterminated segment or a tag that survives.
 */
export function translate(messages: ChatMessage[], tags: string[]): ChatMessage[] {
  const out: ChatMessage[] = [];
  const add = (role: ChatMessage["role"], content: string) => {
    if (content.trim()) out.push({ role, content });
  };
  for (const m of messages) {
    if (!tags.length) {
      add(m.role, m.content);
      continue;
    }
    const tag = tags[tags.length - 1];
    const opening = `⟦${tag}⟧`;
    const closing = `⟦/${tag}⟧`;
    let pos = 0;
    for (let start = m.content.indexOf(opening, pos); start >= 0; start = m.content.indexOf(opening, pos)) {
      const end = m.content.indexOf(closing, start + opening.length);
      if (end < 0) throw new Error("unterminated tagged segment");
      add(m.role, m.content.slice(pos, start));
      add("user", scrub(m.content.slice(start + opening.length, end), tags));
      pos = end + closing.length;
    }
    add(m.role, m.content.slice(pos));
  }
  if (out.some((m) => containsSessionTag(m.content, tags))) throw new Error("a session tag survived translation");
  return out;
}
