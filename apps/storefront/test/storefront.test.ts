import { describe, it, expect } from "vitest";
import { getCatalog } from "../lib/catalog";
import { formatHandoffIO, kindLabel } from "../lib/format";

describe("format helpers", () => {
  it("labels every package kind, companion apps included", () => {
    expect(kindLabel("app")).toBe("Companion app");
    expect(kindLabel("code")).toBe("Code extension");
    expect(kindLabel("asset")).toBe("Asset pack");
    expect(kindLabel("mixed")).toBe("Code + assets");
  });

  it("summarizes a handoff IO, marking optional params", () => {
    expect(formatHandoffIO({ assets: ["image"], params: { wallWidthMm: "number?" } })).toBe(
      "image, wallWidthMm?",
    );
    expect(formatHandoffIO({ params: { widthMm: "number", heightMm: "number" } })).toBe(
      "widthMm, heightMm",
    );
    expect(formatHandoffIO(undefined)).toBe("—");
    expect(formatHandoffIO({})).toBe("—");
  });
});

describe("catalog", () => {
  it("seeds a kind:\"app\" companion with its app manifest, app-scoped to a host", async () => {
    const { registry } = await getCatalog();
    const pkg = await registry.getPackage("com.acme.ar-stencil-capture");
    expect(pkg?.summary.kind).toBe("app");
    expect(pkg?.summary.targetApps).toContain("com.hereliesaz.graffitixr");

    const latest = await registry.latest("com.acme.ar-stencil-capture");
    const app = latest?.manifest.app;
    expect(app?.platforms.android?.packageId).toBe("com.acme.arstencil");
    expect(app?.platforms.android?.minVersionCode).toBe(120);
    expect(app?.platforms.pwa?.version).toBe("2026-06-01T00:00:00Z");
    // Two handoffs; the second raises the app-version floor for its newer capability.
    expect(app?.handoffs.map((h) => h.action)).toEqual(["capture", "measure"]);
    expect(app?.handoffs[1].minAppVersion?.android).toBe(130);
  });

  it("still seeds the code and asset packages alongside the companion", async () => {
    const { registry } = await getCatalog();
    expect((await registry.getPackage("com.hereliesaz.halftone"))?.summary.kind).toBe("code");
    expect((await registry.getPackage("com.studioaz.cinelut"))?.summary.kind).toBe("asset");
  });
});
