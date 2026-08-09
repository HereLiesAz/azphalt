import { describe, it, expect } from "vitest";
import { validateScriptManifest } from "../src/script";
import type { Manifest } from "@azphalt/azdk";

const base: Manifest = {
  azphalt: "0.1",
  id: "com.acme.azphalt.hello-script",
  name: "Hello Script",
  version: "1.0.0",
  kind: "script",
  license: "MIT",
  compat: ">=0.1",
  files: { "script/main.sh": "sha256-abc", LICENSE: "sha256-def" },
  script: {
    interpreter: "bash",
    entry: "script/main.sh",
    command: "hello-script",
    dependencies: { apt: ["jq"] },
  },
};

// Deep-clone helper so each test mutates an isolated copy.
const clone = (): Manifest => JSON.parse(JSON.stringify(base));

describe("validateScriptManifest", () => {
  it("accepts a well-formed script manifest", () => {
    expect(validateScriptManifest(base)).toEqual([]);
  });

  it("accepts a script with no dependencies at all", () => {
    const m = clone();
    delete m.script!.dependencies;
    expect(validateScriptManifest(m)).toEqual([]);
  });

  it("requires a script block", () => {
    const m = clone();
    delete (m as { script?: unknown }).script;
    expect(validateScriptManifest(m).some((e) => e.includes('requires a "script" block'))).toBe(true);
  });

  it("requires a non-empty interpreter", () => {
    const m = clone();
    m.script!.interpreter = "";
    expect(validateScriptManifest(m).some((e) => e.includes("interpreter is required"))).toBe(true);
  });

  it("requires entry to be in manifest.files", () => {
    const m = clone();
    delete m.files["script/main.sh"];
    expect(validateScriptManifest(m).some((e) => e.includes("not in manifest.files"))).toBe(true);
  });

  it("rejects a script package that also carries a pack block (header-only)", () => {
    const m = clone();
    (m as { pack?: unknown }).pack = { entries: [{ id: "com.other.thing" }] };
    expect(validateScriptManifest(m).some((e) => e.includes("must not declare a pack block"))).toBe(true);
  });

  it("rejects a skill block on a script package", () => {
    const m = clone();
    (m as { skill?: unknown }).skill = { skills: [{ id: "x" }] };
    expect(validateScriptManifest(m).some((e) => e.includes("must not declare a skill block"))).toBe(true);
  });

  it("rejects editor surface on a script package (capabilities)", () => {
    const m = clone();
    m.capabilities = ["bitmap"];
    expect(validateScriptManifest(m).some((e) => e.includes("must not declare capabilities"))).toBe(true);
  });

  it("rejects an empty dependencies array for a declared namespace", () => {
    const m = clone();
    m.script!.dependencies = { apt: [] };
    expect(validateScriptManifest(m).some((e) => e.includes("dependencies.apt must be a non-empty array"))).toBe(true);
  });

  it("rejects a blank package name inside dependencies", () => {
    const m = clone();
    m.script!.dependencies = { apt: ["jq", "  "] };
    expect(validateScriptManifest(m).some((e) => e.includes("dependencies.apt must contain only non-empty strings"))).toBe(true);
  });

  it("accepts dependencies naming the interpreter's own package", () => {
    const m = clone();
    m.script!.interpreter = "python3";
    m.script!.dependencies = { apt: ["python3"] };
    expect(validateScriptManifest(m)).toEqual([]);
  });
});
