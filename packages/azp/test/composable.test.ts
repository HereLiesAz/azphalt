import { describe, it, expect } from "vitest";
import { validateComposableManifest } from "../src/composable";
import type { Manifest } from "@azphalt/azdk";

const base: Manifest = {
  azphalt: "0.1",
  id: "com.acme.azphalt.confirm-record-tile",
  name: "Confirm Record Tile",
  version: "1.0.0",
  kind: "composable",
  license: "MIT",
  compat: ">=0.1",
  files: {},
  composable: {
    library: { group: "com.hereliesaz.conveyance", artifact: "conveyance-m3-expressive", version: "1.4.0" },
    elements: [
      {
        id: "confirm-record",
        templateId: "m3e.tile.record",
        hue: "azure",
        surface: "recordTile",
        scale: "lead",
        act: "create",
        jobs: ["confirms a destructive action"],
      },
    ],
  },
};

// Deep-clone helper so each test mutates an isolated copy.
const clone = (): Manifest => JSON.parse(JSON.stringify(base));

describe("validateComposableManifest", () => {
  it("accepts a well-formed composable manifest", () => {
    expect(validateComposableManifest(base)).toEqual([]);
  });

  it("requires a composable block", () => {
    const m = clone();
    delete (m as { composable?: unknown }).composable;
    expect(validateComposableManifest(m).some((e) => e.includes('requires a "composable" block'))).toBe(true);
  });

  it("requires library.group and library.artifact", () => {
    const m = clone();
    m.composable!.library = { group: "", artifact: "" } as never;
    const errors = validateComposableManifest(m);
    expect(errors.some((e) => e.includes("library.group"))).toBe(true);
    expect(errors.some((e) => e.includes("library.artifact"))).toBe(true);
  });

  it("requires at least one element", () => {
    const m = clone();
    m.composable!.elements = [];
    expect(validateComposableManifest(m).some((e) => e.includes("at least one element"))).toBe(true);
  });

  it("requires templateId, hue, surface, scale, act on every element", () => {
    const m = clone();
    m.composable!.elements[0] = { id: "x", jobs: ["j"] } as never;
    const errors = validateComposableManifest(m);
    for (const field of ["templateId", "hue", "surface", "scale", "act"]) {
      expect(errors.some((e) => e.includes(field))).toBe(true);
    }
  });

  it("requires at least one job", () => {
    const m = clone();
    m.composable!.elements[0].jobs = [];
    expect(validateComposableManifest(m).some((e) => e.includes("needs at least one job"))).toBe(true);
  });

  it("rejects a non-directory-safe id", () => {
    const m = clone();
    m.composable!.elements[0].id = "../escape";
    expect(validateComposableManifest(m).some((e) => e.includes("not a directory-safe name"))).toBe(true);
  });

  it("rejects a duplicate id", () => {
    const m = clone();
    m.composable!.elements.push({ ...m.composable!.elements[0] });
    expect(validateComposableManifest(m).some((e) => e.includes("duplicate id"))).toBe(true);
  });

  it("rejects a composable package that also carries a script block (header-only)", () => {
    const m = clone();
    (m as { script?: unknown }).script = { interpreter: "bash", entry: "script/x.sh" };
    expect(validateComposableManifest(m).some((e) => e.includes("must not declare a script block"))).toBe(true);
  });

  it("rejects editor surface on a composable package (capabilities)", () => {
    const m = clone();
    m.capabilities = ["bitmap"];
    expect(validateComposableManifest(m).some((e) => e.includes("must not declare capabilities"))).toBe(true);
  });

  it("rejects a /code sandbox entry", () => {
    const m = clone();
    m.entry = "code/main.js";
    m.runtime = "js";
    expect(validateComposableManifest(m).some((e) => e.includes("must not declare entry/runtime"))).toBe(true);
  });
});
