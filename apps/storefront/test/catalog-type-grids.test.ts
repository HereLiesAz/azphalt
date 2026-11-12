import { describe, expect, it } from "vitest";
import { buildSections, heroKeylines, packageTypeKeys, typeLabel } from "../../storefront-react/src/App";
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
  it("anchors the featured card at a fixed position across focus changes", () => {
    const initial = heroKeylines(4, 0);
    const next = heroKeylines(4, 1);
    expect(initial).toEqual([
      { left: 24, width: 268 },
      { left: 304, width: 186 },
      { left: 502, width: 120 },
      { left: 634, width: 64 },
    ]);
    expect(next).toEqual([
      { left: -108, width: 120 },
      { left: 24, width: 268 },
      { left: 304, width: 186 },
      { left: 502, width: 120 },
    ]);
  });

  it("interpolates both position and width continuously during a drag", () => {
    expect(heroKeylines(4, 0.5)).toEqual([
      { left: -79, width: 194 },
      { left: 127, width: 227 },
      { left: 366, width: 153 },
      { left: 531, width: 92 },
    ]);
    expect(heroKeylines(1, 999)).toEqual([{ left: 24, width: 268 }]);
    expect(heroKeylines(0, 0)).toEqual([]);
  });

});
