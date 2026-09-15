import { describe, it, expect } from "vitest";
import { strToU8, unzipSync, zipSync } from "fflate";
import type { Manifest } from "@azphalt/azdk";
import { EPOCH, validateWorkflowManifest, verifyAzp, writeAzp } from "../src/index";

const payload = {
  "workflows/release.json": strToU8('{"id":"release"}\n'),
  "agents/builder.json": strToU8('{"id":"builder"}\n'),
  "agents/reviewer.json": strToU8('{"id":"reviewer"}\n'),
  "screens/overview.json": strToU8('{"title":"Overview","sections":[]}\n'),
};

const inputManifest: Omit<Manifest, "files"> = {
  azphalt: "0.1",
  id: "com.example.azphalt.release-workflow",
  name: "Release Workflow",
  version: "1.0.0",
  kind: "workflow",
  license: "MIT",
  compat: ">=0.1",
  targetApps: ["com.hereliesaz.haive"],
  workflow: {
    format: "haive.workflow.v1",
    definitions: [{ id: "release", name: "Release", path: "workflows/release.json" }],
    agents: [
      { id: "builder", name: "Builder", path: "agents/builder.json" },
      { id: "reviewer", name: "Reviewer", path: "agents/reviewer.json" },
    ],
    dependencies: [
      { id: "com.example.azphalt.release-notes", version: ">=1.0.0", required: false, purpose: "skill" },
    ],
    hostPermissions: ["WorkflowRegister", "WorkflowLaunch"],
    screens: [
      { id: "overview", name: "Overview", path: "screens/overview.json", placements: ["addon", "workflow-run"] },
    ],
  },
};

const built = () => writeAzp({ manifest: inputManifest, payload, license: "MIT\n" });
const clone = (manifest: Manifest): Manifest => JSON.parse(JSON.stringify(manifest));

describe("validateWorkflowManifest", () => {
  it("accepts a valid signed-or-unsigned orchestration-data shape", () => {
    const { manifest } = built();
    expect(validateWorkflowManifest(manifest)).toEqual([]);
  });

  it("requires a workflow block and at least one definition", () => {
    const { manifest } = built();
    const noBlock = clone(manifest);
    delete (noBlock as { workflow?: unknown }).workflow;
    expect(validateWorkflowManifest(noBlock).join("\n")).toMatch(/requires a "workflow" block/);

    const empty = clone(manifest);
    empty.workflow!.definitions = [];
    expect(validateWorkflowManifest(empty).join("\n")).toMatch(/definitions must contain at least one/);
  });

  it("forbids sandbox/editor surfaces and mutually exclusive kind blocks", () => {
    const { manifest } = built();
    const m = clone(manifest);
    m.entry = "code/main.js";
    m.runtime = "js";
    m.capabilities = ["bitmap"];
    m.assets = [];
    m.contributes = {};
    (m as Manifest & { skill?: unknown }).skill = { skills: [{ id: "x" }] };
    const errors = validateWorkflowManifest(m).join("\n");
    expect(errors).toMatch(/must not declare entry\/runtime/);
    expect(errors).toMatch(/must not declare capabilities/);
    expect(errors).toMatch(/must not declare assets/);
    expect(errors).toMatch(/must not declare contributes/);
    expect(errors).toMatch(/must not declare a skill block/);
  });

  it("rejects unsafe or missing referenced payload paths", () => {
    const { manifest } = built();
    const unsafe = clone(manifest);
    unsafe.workflow!.definitions[0].path = "../escape.json";
    expect(validateWorkflowManifest(unsafe).join("\n")).toMatch(/safe relative payload path/);

    const missing = clone(manifest);
    missing.workflow!.definitions[0].path = "workflows/missing.json";
    expect(validateWorkflowManifest(missing).join("\n")).toMatch(/not listed in manifest.files/);
  });

  it("rejects duplicate ids, self dependencies, and duplicate dependency id/version pairs", () => {
    const { manifest } = built();
    const duplicateId = clone(manifest);
    duplicateId.workflow!.agents!.push({ ...duplicateId.workflow!.agents![0] });
    expect(validateWorkflowManifest(duplicateId).join("\n")).toMatch(/agents has duplicate id/);

    const self = clone(manifest);
    self.workflow!.dependencies = [{ id: self.id, version: "1.0.0" }];
    expect(validateWorkflowManifest(self).join("\n")).toMatch(/must not reference the package itself/);

    const duplicateDependency = clone(manifest);
    duplicateDependency.workflow!.dependencies = [
      { id: "com.example.dep", version: "1" },
      { id: "com.example.dep", version: "1" },
    ];
    expect(validateWorkflowManifest(duplicateDependency).join("\n")).toMatch(/duplicate id\/version pair/);
  });

  it("treats hostPermissions as unique opaque non-empty strings, not capabilities", () => {
    const { manifest } = built();
    const m = clone(manifest);
    m.workflow!.hostPermissions = ["WorkflowLaunch", "", "WorkflowLaunch", "HostSpecific.FuturePermission"];
    const errors = validateWorkflowManifest(m).join("\n");
    expect(errors).toMatch(/must be a non-empty string/);
    expect(errors).toMatch(/contains duplicate/);
    expect(errors).not.toMatch(/HostSpecific\.FuturePermission/);
  });

  it("allows only declarative JSON/YAML screen payloads", () => {
    const { manifest } = built();
    const m = clone(manifest);
    m.workflow!.screens![0].path = "screens/ui.js";
    m.files["screens/ui.js"] = "sha256-deadbeef";
    expect(validateWorkflowManifest(m).join("\n")).toMatch(/declarative JSON\/YAML/);
  });

  it("rejects executable-looking payload anywhere in a workflow package", () => {
    const { manifest } = built();
    const m = clone(manifest);
    m.files["scripts/install.sh"] = "sha256-deadbeef";
    expect(validateWorkflowManifest(m).join("\n")).toMatch(/must not bundle executable payload/);
  });
});

describe("verifyAzp workflow integration", () => {
  it("accepts a valid workflow package and preserves targetApps/workflow metadata", () => {
    const { azp, manifest } = built();
    expect(verifyAzp(azp)).toMatchObject({ ok: true });
    expect(manifest.kind).toBe("workflow");
    expect(manifest.targetApps).toEqual(["com.hereliesaz.haive"]);
    expect(manifest.workflow?.format).toBe("haive.workflow.v1");
  });

  it("detects a tampered workflow payload", () => {
    const { azp } = built();
    const files = unzipSync(azp);
    files["workflows/release.json"] = strToU8('{"id":"tampered"}\n');
    const tampered = zipSync(files, { mtime: EPOCH });
    const result = verifyAzp(tampered);
    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toMatch(/digest mismatch: workflows\/release\.json/);
  });

  it("rejects an unsafe workflow payload path", () => {
    const manifest: Omit<Manifest, "files"> = {
      ...inputManifest,
      workflow: {
        ...inputManifest.workflow!,
        definitions: [{ id: "escape", path: "workflows/../escape.json" }],
        agents: [],
        screens: [],
      },
    };
    const { azp } = writeAzp({
      manifest,
      payload: { "workflows/../escape.json": strToU8("{}\n") },
      license: "MIT\n",
    });
    const result = verifyAzp(azp);
    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toMatch(/unsafe path/);
  });
});
