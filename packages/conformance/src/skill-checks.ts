/**
 * Conformance checks for a **skill host** — an AI-agent app whose skill loader consumes `kind:"skill"`
 * packages (`spec/skill.md`). Like the mcp profile it runs **none** of the bundled `SKILL.md` as code:
 * `load` verifies the header (refusing tampered / unsafe / non-skill / incompatible packages) and
 * reports the skills it will surface. Parsing `SKILL.md` against the external Agent Skills format and
 * exposing it to the agent/model is the host's own concern, beyond what this static suite drives.
 */
import { writeAzp } from "@azphalt/azp";
import type { Manifest, SkillManifest } from "@azphalt/azdk";
import { pass, fail, satisfiesCompat, type CheckResult } from "./checks.js";
import type { HostProfile } from "./video-audio-checks.js";
import * as fx from "./fixtures.js";

/** What a skill host reports after loading (verifying) a `kind:"skill"` package. */
export interface SkillLoadReport {
  /** Whether the host accepted the package for use. */
  accepted: boolean;
  /** Why it was refused (when `accepted` is false). */
  reason?: string;
  /** The ids of the skills the host will surface. */
  skills?: string[];
}

/**
 * The minimum a skill host exposes for the suite to drive it. It **runs no code**: `load` verifies a
 * `kind:"skill"` header and reports the skills it will surface; parsing `SKILL.md` and exposing it to
 * the agent is the host's own concern.
 */
export interface SkillHost {
  load(azp: Uint8Array): SkillLoadReport | Promise<SkillLoadReport>;
  /** The host API version, e.g. `"0.1"` — so `compat` can gate. */
  apiVersion?: string;
  /** The conformance profile(s) this host supports (e.g. `["skill"]`). */
  profiles?: HostProfile[];
}

const enc = (s: string) => new TextEncoder().encode(s);

const SKILL_MD = enc(
  "---\nname: fixture\ndescription: A fixture skill for the conformance suite.\n---\n\nDo the fixture thing.\n",
);

const SKILL_MANIFEST: Omit<Manifest, "files"> & { skill: SkillManifest } = {
  azphalt: "0.1",
  id: "com.example.azphalt.fixture-skill",
  name: "Fixture Skill",
  version: "1.0.0",
  kind: "skill",
  license: "MIT",
  compat: ">=0.1",
  skill: {
    skills: [{ id: "fixture", name: "Fixture", description: "A fixture skill for the conformance suite." }],
  },
};

/** A valid `kind:"skill"` fixture with one skill, `fixture`. */
function skillAzp(): Uint8Array {
  return writeAzp({
    manifest: SKILL_MANIFEST,
    payload: { "skills/fixture/SKILL.md": SKILL_MD },
    license: "MIT",
  }).azp;
}

/** A valid skill header whose `compat` no `0.1` host can satisfy. */
function skillIncompatibleAzp(): Uint8Array {
  return writeAzp({
    manifest: { ...SKILL_MANIFEST, compat: ">=99.0" },
    payload: { "skills/fixture/SKILL.md": SKILL_MD },
    license: "MIT",
  }).azp;
}

async function tryLoad(host: SkillHost, azp: Uint8Array): Promise<SkillLoadReport> {
  try {
    return await host.load(azp);
  } catch (e) {
    return { accepted: false, reason: `threw: ${e instanceof Error ? e.message : String(e)}` };
  }
}

/** Checklist: refuses a skill package whose payload fails verification. */
export async function checkSkillRejectTampered(host: SkillHost): Promise<CheckResult> {
  const id = "reject-tampered";
  const title = "Refuses a package that fails verification";
  const r = await tryLoad(host, fx.tamperedAzp());
  return r.accepted ? fail(id, title, "host accepted a tampered package") : pass(id, title);
}

/** Checklist: refuses an unsafe payload path (`..`). */
export async function checkSkillRejectUnsafePath(host: SkillHost): Promise<CheckResult> {
  const id = "reject-unsafe-path";
  const title = "Refuses a package with an unsafe payload path (`..`)";
  const r = await tryLoad(host, fx.unsafePathAzp());
  return r.accepted ? fail(id, title, "host accepted an unsafe-path package") : pass(id, title);
}

/** Checklist: runs no code — refuses any non-`kind:"skill"` package (e.g. `kind:"code"`). */
export async function checkSkillRejectNonSkill(host: SkillHost): Promise<CheckResult> {
  const id = "reject-non-skill";
  const title = "Refuses a non-`kind:\"skill\"` package (runs no code, parses no SKILL.md as an extension)";
  const r = await tryLoad(host, fx.codeKindAzp());
  return r.accepted ? fail(id, title, "host accepted a kind:code package as a skill bundle") : pass(id, title);
}

/** Checklist: accepts a valid skill package and surfaces its declared skill. */
export async function checkSkillSurfacesSkill(host: SkillHost): Promise<CheckResult> {
  const id = "surfaces-skill";
  const title = "Accepts a valid skill package and surfaces its skill";
  const r = await tryLoad(host, skillAzp());
  if (!r.accepted) return fail(id, title, `host refused a valid skill package: ${r.reason ?? ""}`);
  if (!r.skills?.includes("fixture")) {
    return fail(id, title, `host did not surface the 'fixture' skill (skills=${JSON.stringify(r.skills)})`);
  }
  return pass(id, title, `surfaced ${r.skills.join(", ")}`);
}

/** Checklist: reports an apiVersion and refuses a skill package whose `compat` it cannot satisfy. */
export async function checkSkillCompat(host: SkillHost): Promise<CheckResult> {
  const id = "compat-version";
  const title = "Reports an apiVersion and refuses an incompatible package";
  if (!host.apiVersion) return fail(id, title, "host does not report an apiVersion");
  if (!satisfiesCompat(host.apiVersion, ">=0.1")) {
    return fail(id, title, `apiVersion ${host.apiVersion} does not satisfy >=0.1`);
  }
  const r = await tryLoad(host, skillIncompatibleAzp());
  return r.accepted
    ? fail(id, title, "host accepted a skill package whose compat it cannot satisfy")
    : pass(id, title, `apiVersion ${host.apiVersion}; refused an incompatible package`);
}

/** Checklist: declares a `skill` conformance profile a registry can match on. */
export function checkSkillProfileDeclaration(host: SkillHost): CheckResult {
  const id = "profile-declaration";
  const title = "Declares a `skill` conformance profile";
  const profiles = host.profiles ?? [];
  return profiles.includes("skill")
    ? pass(id, title, `profiles: ${profiles.join(", ")}`)
    : fail(id, title, `host does not declare the 'skill' profile (profiles=${JSON.stringify(profiles)})`);
}
