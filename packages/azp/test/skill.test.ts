import { describe, it, expect } from "vitest";
import { validateSkillManifest } from "../src/skill";
import type { Manifest } from "@azphalt/azdk";

const base: Manifest = {
  azphalt: "0.1",
  id: "com.acme.azphalt.release-notes-skill",
  name: "Release Notes",
  version: "1.0.0",
  kind: "skill",
  license: "MIT",
  compat: ">=0.1",
  files: { "skills/release-notes/SKILL.md": "sha256-abc", LICENSE: "sha256-def" },
  skill: {
    skills: [{ id: "release-notes", name: "Release Notes", description: "Draft release notes." }],
  },
};

// Deep-clone helper so each test mutates an isolated copy.
const clone = (): Manifest => JSON.parse(JSON.stringify(base));

describe("validateSkillManifest", () => {
  it("accepts a well-formed skill manifest", () => {
    expect(validateSkillManifest(base)).toEqual([]);
  });

  it("requires a skill block", () => {
    const m = clone();
    delete (m as { skill?: unknown }).skill;
    expect(validateSkillManifest(m).some((e) => e.includes('requires a "skill" block'))).toBe(true);
  });

  it("requires at least one skill", () => {
    const m = clone();
    m.skill!.skills = [];
    expect(validateSkillManifest(m).some((e) => e.includes("at least one skill"))).toBe(true);
  });

  it("rejects a skill package that also carries a pack block (header-only)", () => {
    const m = clone();
    (m as { pack?: unknown }).pack = { entries: [{ id: "com.other.thing" }] };
    expect(validateSkillManifest(m).some((e) => e.includes("must not declare a pack block"))).toBe(true);
  });

  it("rejects an mcp block on a skill package", () => {
    const m = clone();
    (m as { mcp?: unknown }).mcp = { servers: [{ id: "x", remote: { type: "http", url: "https://x" } }] };
    expect(validateSkillManifest(m).some((e) => e.includes("must not declare an mcp block"))).toBe(true);
  });

  it("rejects editor surface on a skill package (capabilities)", () => {
    const m = clone();
    m.capabilities = ["bitmap"];
    expect(validateSkillManifest(m).some((e) => e.includes("must not declare capabilities"))).toBe(true);
  });

  it("rejects a non-directory-safe id", () => {
    const m = clone();
    m.skill!.skills[0].id = "../escape";
    expect(validateSkillManifest(m).some((e) => e.includes("not a directory-safe name"))).toBe(true);
  });

  it("rejects a duplicate id", () => {
    const m = clone();
    m.skill!.skills.push({ id: "release-notes" });
    m.files["skills/release-notes/SKILL.md"] = "sha256-abc";
    expect(validateSkillManifest(m).some((e) => e.includes("duplicate id"))).toBe(true);
  });

  it("requires the skill's SKILL.md to be in manifest.files", () => {
    const m = clone();
    delete m.files["skills/release-notes/SKILL.md"];
    expect(validateSkillManifest(m).some((e) => e.includes("not in manifest.files"))).toBe(true);
  });
});
