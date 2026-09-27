import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { strToU8, zipSync } from "fflate";
import nacl from "tweetnacl";
import blake from "blakejs";
import { readAzp } from "@azphalt/azp";
import { chatLlm, installLlm, llmConsent, parseResult, runLlm, sessionTags, wrap, type LlmInstall } from "../src/index.js";
import { fakeGitHub, type Handler } from "./fake-github.js";

const registry = fileURLToPath(new URL("../../../apps/storefront/registry/packages/", import.meta.url));
const kiloAzp = new Uint8Array(readFileSync(registry + "com.hereliesaz.azphalt.llm.kilo-1.0.0.azp"));
const qwenAzp = new Uint8Array(readFileSync(registry + "com.hereliesaz.azphalt.llm.qwen2-5-1-5b-1.0.0.azp"));
const KEY = btoa(String.fromCharCode(...Array.from({ length: 32 }, (_, i) => i))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const install: LlmInstall = {
  owner: "me", repo: "sandbox", branch: "main",
  packageId: "com.hereliesaz.azphalt.llm.kilo", version: "1.0.0",
  workflowFile: "azphalt-llm-com.hereliesaz.azphalt.llm.kilo.yml",
};
const WF = `/repos/me/sandbox/actions/workflows/${install.workflowFile}`;

/** A run that is found on the second poll and completes on the third, leaving [result]. */
function runRoutes(result: unknown, progress = "1\tstarting\n2\tasking model"): Record<string, Handler> {
  let polls = 0;
  let task: { correlationId: string } | undefined;
  return {
    [`POST ${WF}/dispatches`]: (body) => {
      task = JSON.parse((body as { inputs: { task: string } }).inputs.task);
      return { status: 204 };
    },
    [`GET ${WF}/runs`]: () => {
      polls++;
      if (polls < 2 || !task) return { body: { workflow_runs: [] } };
      return { body: { workflow_runs: [{ id: 9, display_title: task.correlationId, head_sha: "abc", status: polls >= 3 ? "completed" : "in_progress", conclusion: polls >= 3 ? "success" : null }] } };
    },
    ["GET /repos/me/sandbox/commits/abc/check-runs"]: () => ({ body: { check_runs: [{ output: { text: polls >= 3 ? progress + "\n3\tcompleted" : progress } }] } }),
    ["GET /repos/me/sandbox/actions/runs/9/artifacts"]: () => ({ body: { artifacts: [{ id: 5, name: "azphalt-llm-result", size_in_bytes: 200, expired: false }] } }),
    ["GET /repos/me/sandbox/actions/artifacts/5/zip"]: () => ({ bytes: zipSync({ "result.json": strToU8(JSON.stringify(result)) }) }),
  };
}

describe("llmConsent", () => {
  it("discloses an endpoint package's operator, token and secret inputs", () => {
    const c = llmConsent(readAzp(kiloAzp).manifest);
    expect(c.runs).toBe("third-party");
    expect(c.endpointHost).toBe("api.kilo.ai");
    expect(c.dataHandling?.prompts).toBe("may-train");
    expect(c.setupTokenPermissions).toContain("secrets:write");
    expect(c.inputs).toEqual([expect.objectContaining({ id: "providerKey", optional: true, secretName: "PROVIDER_KEY" })]);
  });

  it("discloses a sandbox package's weights, licence and fetches", () => {
    const c = llmConsent(readAzp(qwenAzp).manifest);
    expect(c.runs).toBe("sandbox");
    expect(c.weightsBytes).toBe(1117320736);
    expect(c.modelLicense?.spdx).toBe("Apache-2.0");
    expect(c.fetches).toHaveLength(2);
    expect(c.runPermissions).toEqual({ contents: "read", checks: "write" });
  });
});

describe("runLlm", () => {
  it("dispatches, reports each progress line once, and returns the result", async () => {
    const gh = fakeGitHub(runRoutes({ status: "completed", message: "done", text: "hello", outputTokens: 3 }));
    const seen: string[] = [];
    const result = await runLlm({
      github: { token: "t", fetch: gh.fetch }, install, pollMs: 1,
      task: { messages: [{ role: "user", content: "hi" }] },
      onProgress: (seq, m) => seen.push(`${seq}:${m}`),
    });
    expect(result).toEqual({ status: "completed", message: "done", text: "hello", outputTokens: 3 });
    expect(seen).toEqual(["1:starting", "2:asking model", "3:completed"]);
    const dispatch = gh.calls.find((c) => c.method === "POST")!;
    expect((dispatch.body as { ref: string }).ref).toBe("main");
  });

  it("rejects output carrying a session tag", async () => {
    const tags = await sessionTags(KEY, 0);
    const gh = fakeGitHub(runRoutes({ status: "completed", message: "done", text: `leak ${tags[0]}` }));
    const result = await runLlm({
      github: { token: "t", fetch: gh.fetch }, install, pollMs: 1,
      task: { sessionKey: KEY, turn: 0, messages: [{ role: "user", content: wrap("x", tags) }] },
    });
    expect(result).toEqual({ status: "failed", message: "output contained a session tag; rejected" });
  });

  it("reports a run that left no artifact as failed", async () => {
    const routes = runRoutes({});
    routes["GET /repos/me/sandbox/actions/runs/9/artifacts"] = () => ({ body: { artifacts: [] } });
    const gh = fakeGitHub(routes);
    const result = await runLlm({ github: { token: "t", fetch: gh.fetch }, install, pollMs: 1, task: {} });
    expect(result.status).toBe("failed");
  });
});

describe("parseResult", () => {
  it("drops unknown fields and fails wrong types", () => {
    expect(parseResult(strToU8('{"status":"completed","message":"m","text":"t","evil":1}'))).toEqual({ status: "completed", message: "m", text: "t" });
    expect(parseResult(strToU8('{"status":"completed","message":"m","text":5}')).status).toBe("failed");
    expect(parseResult(strToU8('{"status":"owned","message":"m"}')).status).toBe("failed");
    expect(parseResult(new Uint8Array(2 * 1024 * 1024 + 1)).message).toMatch(/2 MB/);
  });
});

describe("installLlm", () => {
  function installRoutes(opts: { isPrivate?: boolean } = {}) {
    const recipient = nacl.box.keyPair();
    const secrets: Record<string, string> = {};
    let tree: { path: string; mode: string }[] = [];
    const routes: Record<string, Handler> = {
      ["GET /repos/me/sandbox"]: () => ({ body: { private: opts.isPrivate ?? true, default_branch: "main" } }),
      ["GET /repos/me/sandbox/git/ref/heads/main"]: () => ({ body: { object: { sha: "p1" } } }),
      ["GET /repos/me/sandbox/git/commits/p1"]: () => ({ body: { tree: { sha: "t1" } } }),
      ["POST /repos/me/sandbox/git/blobs"]: () => ({ body: { sha: "b" } }),
      ["POST /repos/me/sandbox/git/trees"]: (body) => {
        tree = (body as { tree: typeof tree }).tree;
        return { body: { sha: "t2" } };
      },
      ["POST /repos/me/sandbox/git/commits"]: () => ({ body: { sha: "c2" } }),
      ["PATCH /repos/me/sandbox/git/refs/heads/main"]: () => ({ body: {} }),
      ["GET /repos/me/sandbox/actions/secrets/public-key"]: () => ({
        body: { key: btoa(String.fromCharCode(...recipient.publicKey)), key_id: "k1" },
      }),
      ["PUT /repos/me/sandbox/actions/secrets/*"]: (body, url) => {
        const sealed = Uint8Array.from(atob((body as { encrypted_value: string }).encrypted_value), (c) => c.charCodeAt(0));
        const epk = sealed.subarray(0, 32);
        const nonce = blake.blake2b(new Uint8Array([...epk, ...recipient.publicKey]), undefined, 24);
        secrets[url.pathname.split("/").pop()!] = new TextDecoder().decode(nacl.box.open(sealed.subarray(32), nonce, epk, recipient.secretKey)!);
        return { status: 204 };
      },
    };
    return { routes, secrets, tree: () => tree };
  }

  it("commits payload and workflow in one commit and seals the key", async () => {
    const f = installRoutes();
    const gh = fakeGitHub(f.routes);
    const { install: done, setup } = await installLlm({
      github: { token: "setup-token", fetch: gh.fetch }, owner: "me", repo: "sandbox",
      azp: kiloAzp, inputs: { providerKey: "sk-123" }, runSetup: false,
    });
    expect(setup).toBeUndefined();
    expect(done.workflowFile).toBe("azphalt-llm-com.hereliesaz.azphalt.llm.kilo.yml");
    const paths = f.tree().map((e) => e.path);
    expect(paths).toContain(".github/workflows/azphalt-llm-com.hereliesaz.azphalt.llm.kilo.yml");
    expect(paths).toContain("llm/com.hereliesaz.azphalt.llm.kilo/setup/run.py");
    expect(f.tree().find((e) => e.path.endsWith("setup.sh"))?.mode).toBe("100755");
    expect(f.secrets).toEqual({ PROVIDER_KEY: "sk-123" });
    expect(gh.calls.filter((c) => c.method === "POST" && c.path.endsWith("/git/commits"))).toHaveLength(1);
  });

  it("refuses a public sandbox", async () => {
    const gh = fakeGitHub(installRoutes({ isPrivate: false }).routes);
    await expect(installLlm({ github: { token: "t", fetch: gh.fetch }, owner: "me", repo: "sandbox", azp: kiloAzp, runSetup: false }))
      .rejects.toThrow(/private/);
  });

  it("refuses a tampered package", async () => {
    const bad = kiloAzp.slice();
    bad[bad.length - 40] ^= 0xff;
    await expect(installLlm({ github: { token: "t" }, owner: "me", repo: "sandbox", azp: bad })).rejects.toThrow();
  });

  it("requires required inputs", async () => {
    const azp = new Uint8Array(readFileSync(registry + "com.hereliesaz.azphalt.llm.groq-1.0.0.azp"));
    await expect(installLlm({ github: { token: "t" }, owner: "me", repo: "sandbox", azp })).rejects.toThrow(/providerKey/);
  });
});

describe("chatLlm", () => {
  it("translates tagged material, sends the key, and returns the text", async () => {
    const tags = await sessionTags(KEY, 0);
    let sent: { model: string; messages: unknown[] } | undefined;
    let auth: string | null = null;
    const fetchImpl = (async (_: unknown, init?: RequestInit) => {
      sent = JSON.parse(String(init?.body));
      auth = new Headers(init?.headers).get("authorization");
      return new Response(JSON.stringify({ choices: [{ message: { content: "short" } }], usage: { prompt_tokens: 4, completion_tokens: 1 } }));
    }) as typeof fetch;
    const out = await chatLlm({
      manifest: readAzp(kiloAzp).manifest, key: "sk", sessionKey: KEY, fetch: fetchImpl,
      messages: [{ role: "user", content: `Summarize ${wrap("text", tags)}` }],
    });
    expect(out).toEqual({ text: "short", inputTokens: 4, outputTokens: 1 });
    expect(auth).toBe("Bearer sk");
    expect(sent?.model).toBe("kilo-auto/free");
    expect(sent?.messages).toEqual([{ role: "user", content: "Summarize " }, { role: "user", content: "text" }]);
  });

  it("refuses a sandbox-only package", async () => {
    await expect(chatLlm({ manifest: readAzp(qwenAzp).manifest, messages: [] })).rejects.toThrow(/openai-chat/);
  });
});
