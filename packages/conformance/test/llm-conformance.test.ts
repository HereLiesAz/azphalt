import { createHmac } from "node:crypto";
import { describe, it, expect } from "vitest";
import { readAzp, verifyAzp } from "@azphalt/azp";
import type { Manifest } from "@azphalt/azdk";
import { runLlmConformance, satisfiesCompat, type LlmChatMessage, type LlmHost } from "../src/index";

/**
 * A reference conforming llm host. `load` verifies and discloses, never running setup; `translate`
 * and `acceptsOutput` implement spec/llm.md § Rolling delimiters the way the reference runner does.
 */
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function base32(bytes: Uint8Array): string {
  let out = "", bits = 0, value = 0;
  for (const b of bytes) {
    value = (value << 8) | b;
    bits += 8;
    while (bits >= 5) { out += B32[(value >>> (bits - 5)) & 31]; bits -= 5; }
  }
  return bits ? out + B32[(value << (5 - bits)) & 31] : out;
}
const tags = (key: string, turn: number) =>
  Array.from({ length: turn + 1 }, (_, n) =>
    base32(createHmac("sha256", Buffer.from(key, "base64url")).update(`azphalt-llm-turn:${n}`).digest()).slice(0, 26));
const MARKERS = /<\|[A-Za-z0-9_]{1,40}\|>|\[\/?INST\]|<<\/?SYS>>|<\/?s>|<start_of_turn>|<end_of_turn>/g;
const scrub = (text: string, all: string[]) =>
  all.reduce((t, tag) => t.split(`⟦${tag}⟧`).join("").split(`⟦/${tag}⟧`).join(""), text).replace(MARKERS, "");

const HOST_VERSION = "0.1";
const llmHost: LlmHost = {
  apiVersion: HOST_VERSION,
  profiles: ["llm"],
  load(azp) {
    if (!verifyAzp(azp).ok) return { accepted: false, reason: "verification failed" };
    const { manifest } = readAzp(azp) as { manifest: Manifest };
    if (manifest.kind !== "llm" || !manifest.llm) return { accepted: false, reason: "not kind:llm" };
    if (!satisfiesCompat(HOST_VERSION, manifest.compat)) return { accepted: false, reason: "incompatible compat" };
    return {
      accepted: true,
      runsSetupOnDevice: false,
      disclosure: {
        tier: manifest.llm.tier,
        prompts: manifest.llm.dataHandling?.prompts,
        setupTokenPermissions: manifest.llm.setup.requires?.githubToken,
      },
    };
  },
  translate(messages, key, turn) {
    const all = tags(key, turn);
    const open = `⟦${all[turn]}⟧`, close = `⟦/${all[turn]}⟧`;
    const out: LlmChatMessage[] = [];
    const add = (role: LlmChatMessage["role"], content: string) => { if (content.trim()) out.push({ role, content }); };
    for (const m of messages) {
      let pos = 0;
      for (let s = m.content.indexOf(open); s >= 0; s = m.content.indexOf(open, pos)) {
        const e = m.content.indexOf(close, s + open.length);
        if (e < 0) throw new Error("unterminated");
        add(m.role, m.content.slice(pos, s));
        add("user", scrub(m.content.slice(s + open.length, e), all));
        pos = e + close.length;
      }
      add(m.role, m.content.slice(pos));
    }
    return out;
  },
  acceptsOutput: (text, key, turn) => !tags(key, turn).some((t) => text.includes(t)),
};

describe("@azphalt/conformance — llm host", () => {
  it("certifies a conforming llm host — every check passes", async () => {
    const report = await runLlmConformance(llmHost);
    const failed = report.checks.filter((c) => !c.ok);
    expect(failed, failed.map((c) => `${c.id}: ${c.detail}`).join("\n")).toEqual([]);
    expect(report.checks).toHaveLength(9);
  });

  it("has teeth — a host that accepts everything fails the verification checks", async () => {
    const report = await runLlmConformance({ ...llmHost, load: () => ({ accepted: true, runsSetupOnDevice: false }) });
    for (const id of ["reject-tampered", "reject-unsafe-path", "reject-non-llm", "reject-overbroad-run", "discloses-before-install"]) {
      expect(report.checks.find((c) => c.id === id)?.ok, id).toBe(false);
    }
  });

  it("fails a host that passes tagged material through untranslated", async () => {
    const report = await runLlmConformance({ ...llmHost, translate: (m) => m });
    expect(report.checks.find((c) => c.id === "delimiter-translation")?.ok).toBe(false);
  });

  it("fails a host that checks only the current turn's tag", async () => {
    const report = await runLlmConformance({ ...llmHost, acceptsOutput: (t, k, turn) => !t.includes(tags(k, turn)[turn]) });
    expect(report.checks.find((c) => c.id === "output-check")?.ok).toBe(false);
  });

  it("fails a host that would run setup on the device", async () => {
    const onDevice: LlmHost = { ...llmHost, load: async (azp) => ({ ...(await llmHost.load(azp)), runsSetupOnDevice: true }) };
    expect((await runLlmConformance(onDevice)).checks.find((c) => c.id === "discloses-before-install")?.ok).toBe(false);
  });
});
