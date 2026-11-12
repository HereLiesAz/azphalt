import { describe, expect, it } from "vitest";
import { buildSections, packageTypeKeys, typeLabel } from "../../storefront-react/src/App";
import type { PackageSummary } from "../../storefront-react/src/api";

const item = (id: string, kind: string, types: string[] = [], mediaDomains: string[] = []): PackageSummary => ({
  id, name: id, kind, version: "1.0.0", types, mediaDomains,
});

describe("storefront type grids", () => {
  it("discovers kinds, declared types and media domains without duplicates", () => {
    expect(packageTypeKeys(item("one", "workflow", ["Image", "3D", "image"], ["video", "IMAGE"])))
      .toEqual(["workflow", "image", "3d", "video"]);
  });

  it("keeps an extension discoverable when it has no media domain", () => {
    expect(packageTypeKeys(item("one", "llm"))).toEqual(["llm"]);
    expect(typeLabel("3d")).toBe("3D");
    expect(typeLabel("llm")).toBe("LLM");
  });

  it("lists every package in its matching type grids, without the hero limit", () => {
    const packages = Array.from({ length: 21 }, (_, i) => item(`workflow-${i}`, "workflow", ["model"]));
    packages.push(item("brush", "asset", ["brush"], ["image"]));
    const sections = buildSections(packages);
    expect(sections[0].title).toBe("Popular");
    expect(sections[0].items).toHaveLength(14);
    expect(sections.find((section) => section.title === "Workflow")?.items).toHaveLength(21);
    expect(sections.find((section) => section.title === "Model")?.items).toHaveLength(21);
    expect(sections.find((section) => section.title === "Asset")?.items.map((p) => p.id)).toEqual(["brush"]);
    expect(sections.find((section) => section.title === "Image")?.items.map((p) => p.id)).toEqual(["brush"]);
    expect(sections.find((section) => section.title === "Brush")?.items.map((p) => p.id)).toEqual(["brush"]);
  });

  it("preserves the provided sorted order within each type grid", () => {
    const sections = buildSections([item("z", "workflow"), item("a", "workflow")]);
    expect(sections.find((section) => section.title === "Workflow")?.items.map((p) => p.id))
      .toEqual(["z", "a"]);
  });
});
