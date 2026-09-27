import { describe, it, expect } from "vitest";
import { strToU8 } from "fflate";
import type { Manifest } from "@azphalt/azdk";
import { validateLlmManifest, verifyAzp, writeAzp } from "../src/index";

const SUM = "sha256-" + "a".repeat(64);
const payload = { "setup/setup.sh": strToU8("#!/usr/bin/env bash\nexit 0\n") };

const endpointManifest: Omit<Manifest, "files"> = {
  azphalt: "0.1",
  id: "com.example.azphalt.llm.kilo",
  name: "Kilo",
  version: "1.0.0",
  kind: "llm",
  license: "Apache-2.0",
  compat: ">=0.1",
  llm: {
    tier: "endpoint",
    inputs: [{ id: "providerKey", type: "promptString", password: true, optional: true }],
    setup: {
      sandbox: "github-actions",
      script: "setup/setup.sh",
      requires: { githubToken: ["contents:write", "actions:write", "secrets:write"] },
      secrets: [{ name: "PROVIDER_KEY", input: "providerKey" }],
      fetches: [],
    },
    endpoint: {
      protocols: ["openai-chat", "github-actions-runner"],
      baseUrl: "https://api.kilo.ai/api/gateway",
      defaultModel: "kilo-auto/free",
      auth: "optional-bearer",
      authInput: "providerKey",
    },
    run: { permissions: { contents: "write", checks: "write" } },
    dataHandling: { prompts: "may-train", modelPinned: false, operator: "Kilo Code" },
    role: "text-generation",
  },
};

const weightsManifest: Omit<Manifest, "files"> = {
  ...endpointManifest,
  id: "com.example.azphalt.llm.qwen",
  llm: {
    tier: "sandbox-weights",
    setup: {
      sandbox: "github-actions",
      script: "setup/setup.sh",
      fetches: [{ url: "https://github.com/ggml-org/llama.cpp/releases/download/b1/llama.tar.gz", checksum: SUM }],
    },
    weights: {
      runtime: "llama.cpp",
      files: [{ name: "model.gguf", remoteUrl: "https://huggingface.co/x/y/resolve/main/m.gguf", checksum: SUM, byteSize: 10 }],
      modelLicense: { spdx: "Apache-2.0", commercialUse: true },
    },
    endpoint: { protocols: ["github-actions-runner"], defaultModel: "model.gguf", auth: "none" },
    run: { permissions: { contents: "write", checks: "write", actions: "read" } },
  },
};

const build = (m: Omit<Manifest, "files">) => writeAzp({ manifest: m, payload, license: "Apache-2.0\n" });
const clone = (m: Manifest): Manifest => JSON.parse(JSON.stringify(m));
const errorsOf = (mutate: (m: Manifest) => void, base = endpointManifest) => {
  const m = clone(build(base).manifest);
  mutate(m);
  return validateLlmManifest(m).join("\n");
};

describe("validateLlmManifest", () => {
  it("accepts both tiers", () => {
    for (const base of [endpointManifest, weightsManifest]) {
      const { manifest, azp } = build(base);
      expect(validateLlmManifest(manifest)).toEqual([]);
      expect(verifyAzp(azp)).toMatchObject({ ok: true });
    }
  });

  it("requires the llm block and forbids sandbox and other-kind surfaces", () => {
    expect(errorsOf((m) => { delete m.llm; })).toMatch(/requires an "llm" block/);
    const errors = errorsOf((m) => {
      m.entry = "code/main.js";
      m.capabilities = ["bitmap"];
      m.mcp = { servers: [] };
    });
    expect(errors).toMatch(/entry\/runtime/);
    expect(errors).toMatch(/capabilities/);
    expect(errors).toMatch(/mcp block/);
  });

  it("ties weights to the sandbox-weights tier", () => {
    expect(errorsOf((m) => { m.llm!.weights = clone(build(weightsManifest).manifest).llm!.weights; })).toMatch(/endpoint must not declare weights/);
    expect(errorsOf((m) => { delete m.llm!.weights; }, weightsManifest)).toMatch(/requires weights/);
    expect(errorsOf((m) => { m.llm!.weights!.files[0].checksum = "md5-x"; }, weightsManifest)).toMatch(/checksum must be sha256/);
    expect(errorsOf((m) => { delete (m.llm!.weights!.files[0] as { byteSize?: number }).byteSize; }, weightsManifest)).toMatch(/byteSize/);
  });

  it("checks setup", () => {
    expect(errorsOf((m) => { m.llm!.setup.sandbox = "docker"; })).toMatch(/sandbox must be github-actions/);
    expect(errorsOf((m) => { m.llm!.setup.script = "setup/missing.sh"; })).toMatch(/not in manifest.files/);
    expect(errorsOf((m) => { m.llm!.setup.fetches = [{ url: "http://x", checksum: "sha256-" }]; })).toMatch(/https:\/\/[\s\S]*sha256/);
    expect(errorsOf((m) => { m.llm!.setup.secrets![0].input = "nope"; })).toMatch(/undeclared input "nope"/);
  });

  it("checks protocols and auth", () => {
    expect(errorsOf((m) => { m.llm!.endpoint.protocols = []; })).toMatch(/non-empty/);
    expect(errorsOf((m) => { m.llm!.endpoint.baseUrl = "http://api.example"; })).toMatch(/https/);
    expect(errorsOf((m) => { m.llm!.endpoint.protocols = ["openai-chat"]; }, weightsManifest)).toMatch(/permits only github-actions-runner/);
    expect(errorsOf((m) => { m.llm!.endpoint.authInput = "other"; })).toMatch(/not a declared input/);
  });

  it("caps run permissions", () => {
    expect(errorsOf((m) => { m.llm!.run = { permissions: { contents: "write", workflows: "write" } as never }; })).toMatch(/must not grant workflows/);
    expect(errorsOf((m) => { m.llm!.run = { permissions: { actions: "write" } as never }; })).toMatch(/actions may be at most read/);
  });

  it("requires dataHandling for endpoints only", () => {
    expect(errorsOf((m) => { delete m.llm!.dataHandling; })).toMatch(/requires dataHandling/);
    expect(errorsOf((m) => { delete m.llm!.dataHandling; }, weightsManifest)).toBe("");
  });

  it("rejects literal secrets and dangling input references", () => {
    expect(errorsOf((m) => { (m.llm as unknown as Record<string, unknown>).apiKey = "sk-live"; })).toMatch(/literal secret/);
    expect(errorsOf((m) => { m.llm!.endpoint.defaultModel = "${input:ghost}"; })).toMatch(/undeclared input "ghost"/);
  });
});
