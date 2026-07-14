import { describe, it, expect } from "vitest";
import { getCatalog, getPreviewImage } from "../lib/catalog";
import { formatHandoffIO, formatRating, kindLabel, safeHttpUrl } from "../lib/format";

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

  it("only lets http(s) URLs through to hrefs (guards against javascript: XSS)", () => {
    expect(safeHttpUrl("https://play.google.com/store/apps/details?id=com.x")).toBe(
      "https://play.google.com/store/apps/details?id=com.x",
    );
    expect(safeHttpUrl("http://example.com")).toBe("http://example.com");
    expect(safeHttpUrl("javascript:alert(1)")).toBeUndefined();
    expect(safeHttpUrl("data:text/html,<script>")).toBeUndefined();
    expect(safeHttpUrl("/relative")).toBeUndefined();
    expect(safeHttpUrl(undefined)).toBeUndefined();
  });

  it("formats a rating as stars + count, or null when untracked", () => {
    expect(formatRating(4.666, 88)).toBe("★ 4.7 (88)");
    expect(formatRating(5, 1)).toBe("★ 5.0 (1)");
    expect(formatRating(undefined, 0)).toBeNull();
    expect(formatRating(4.5, 0)).toBeNull();
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

  it("seeds ratings so the rating badge and sort have signal", async () => {
    const { registry } = await getCatalog();
    const halftone = await registry.getPackage("com.hereliesaz.halftone");
    expect(halftone?.summary.ratingCount).toBeGreaterThan(0);
    expect(halftone?.summary.rating).toBeGreaterThan(0);
  });

  it("supports the browse sort and kind filter used by the search page", async () => {
    const { registry } = await getCatalog();
    // Kind filter: only app packages.
    const apps = await registry.list({ kind: "app" });
    expect(apps.length).toBeGreaterThan(0);
    expect(apps.every((p) => p.kind === "app")).toBe(true);
    // Sort by rating: descending average (unrated last).
    const byRating = await registry.list({ sort: "rating" });
    const rated = byRating.filter((p) => p.ratingCount > 0).map((p) => p.rating ?? 0);
    for (let i = 1; i < rated.length; i++) expect(rated[i - 1]).toBeGreaterThanOrEqual(rated[i]);
  });

  it("serves the in-package preview image, and nothing for packages without one", async () => {
    const preview = await getPreviewImage("com.studioaz.cinelut");
    expect(preview?.contentType).toBe("image/svg+xml");
    expect(new TextDecoder().decode(preview!.bytes)).toContain("<svg");
    // A code package with no declared preview → null (route answers 404).
    expect(await getPreviewImage("com.hereliesaz.halftone")).toBeNull();
    expect(await getPreviewImage("com.does.not.exist")).toBeNull();
  });

  it("scopes the per-app catalog: a host sees its own companions plus globals", async () => {
    const { registry } = await getCatalog();
    const visible = await registry.list({ app: "com.hereliesaz.graffitixr" });
    const ids = visible.map((p) => p.id);
    expect(ids).toContain("com.acme.ar-stencil-capture"); // app-scoped companion
    expect(ids).toContain("com.foldlab.filmluts"); // a global package, also visible
    // A different app does NOT see the graffitixr-scoped companion.
    const other = await registry.list({ app: "com.someone.else" });
    expect(other.map((p) => p.id)).not.toContain("com.acme.ar-stencil-capture");
  });
});
