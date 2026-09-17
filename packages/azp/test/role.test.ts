import { describe, it, expect } from "vitest";
import { strToU8 } from "fflate";
import type { Manifest } from "@azphalt/azdk";
import { validateRoleManifest, verifyAzp, writeAzp } from "../src/index";

const payload = {
  "roles/researcher.json": strToU8('{"id":{"value":"researcher"},"name":"Researcher"}\n'),
};

const inputManifest: Omit<Manifest, "files"> = {
  azphalt: "0.1",
  id: "com.example.azphalt.researcher-role",
  name: "Researcher Role",
  version: "1.0.0",
  kind: "role",
  license: "MIT",
  compat: ">=0.1",
  targetApps: ["com.hereliesaz.haive"],
  role: {
    format: "haive.role.v1",
    roles: [{ id: "researcher", name: "Researcher", path: "roles/researcher.json" }],
  },
};

const built = () => writeAzp({ manifest: inputManifest, payload, license: "MIT\n" });
const clone = (manifest: Manifest): Manifest => JSON.parse(JSON.stringify(manifest));

describe("validateRoleManifest", () => {
  it("accepts a declarative role package", () => {
    const { manifest } = built();
    expect(validateRoleManifest(manifest)).toEqual([]);
    expect(verifyAzp(built().azp)).toMatchObject({ ok: true });
  });

  it("requires at least one role", () => {
    const { manifest } = built();
    const m = clone(manifest);
    m.role!.roles = [];
    expect(validateRoleManifest(m).join("\n")).toMatch(/at least one/);
  });

  it("rejects executable and mutually-exclusive package surfaces", () => {
    const { manifest } = built();
    const m = clone(manifest);
    m.entry = "code/main.js";
    m.runtime = "js";
    m.capabilities = ["bitmap"];
    m.workflow = { format: "haive.workflow.v1", definitions: [] };
    m.files["scripts/install.sh"] = "sha256-deadbeef";
    const errors = validateRoleManifest(m).join("\n");
    expect(errors).toMatch(/must not declare entry\/runtime/);
    expect(errors).toMatch(/must not declare capabilities/);
    expect(errors).toMatch(/must not declare a workflow block/);
    expect(errors).toMatch(/must not bundle executable payload/);
  });

  it("rejects duplicate ids and unsafe paths", () => {
    const { manifest } = built();
    const m = clone(manifest);
    m.role!.roles.push({ ...m.role!.roles[0] });
    m.role!.roles[0].path = "../escape.json";
    const errors = validateRoleManifest(m).join("\n");
    expect(errors).toMatch(/duplicate id/);
    expect(errors).toMatch(/safe relative payload path/);
  });
});
