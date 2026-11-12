import { describe, expect, it } from "vitest";
import { buildSections, heroKeylines, packageTypeKeys, typeLabel } from "../../storefront-react/src/App";
import type { PackageSummary } from "../../storefront-react/src/api";
import { availableStoreCategories, storeCategoryKeys, STORE_TAXONOMY_VERSION } from "../../storefront-react/src/taxonomy";

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

  it("groups every matching package without truncation", () => {
    const packages = Array.from({ length: 21 }, (_, i) => item(`workflow-${i}`, "workflow", ["model"]));
    packages.push(item("com.hereliesaz.azphalt.brush-acrylic-flat", "asset", [], ["image"]));
    const sections = buildSections(packages);
    expect(sections[0].title).toBe("Popular");
    expect(sections[0].items).toHaveLength(14);
    expect(sections.find((section) => section.title === "Workflows")?.items).toHaveLength(21);
    expect(sections.find((section) => section.title === "Brushes")?.items.map((p) => p.name))
      .toEqual(["com.hereliesaz.azphalt.brush-acrylic-flat"]);
    expect(sections.find((section) => section.title === "Brushes / Acrylic")?.items).toHaveLength(1);
  });

  it("uses a versioned taxonomy shared with Compose without adding backend fields", () => {
    expect(STORE_TAXONOMY_VERSION).toBe(1);
    const brush = item("com.hereliesaz.azphalt.brush-watercolor-wet-on-wet", "asset", [], ["image"]);
    expect(storeCategoryKeys(brush)).toContain("brushes");
    expect(storeCategoryKeys(brush)).toContain("brushes/watercolor");
    expect(availableStoreCategories([brush]).map((category) => category.id))
      .toContain("brushes/watercolor");
  });

  it("keeps unmatched future formats discoverable", () => {
    expect(storeCategoryKeys(item("com.example.unknown", "new-thing")))
      .toEqual(["kind/new-thing"]);
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
