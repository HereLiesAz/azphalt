/**
 * The storefront browse API surfaces a pack's member references (from its manifest) on the summary, so
 * the detail view can show "what's inside". Non-pack packages carry no `pack` field.
 */
import { describe, expect, it } from "vitest";
import { GET } from "../app/api/packages/route";

const PACK = "com.hereliesaz.paint-starter"; // the seeded demo pack

describe("GET /api/packages — pack contents", () => {
  it("includes a pack's member entries, and omits `pack` for non-packs", async () => {
    const res = await GET();
    const rows = (await res.json()) as Array<{ id: string; kind: string; pack?: { entries: Array<{ id: string; required?: boolean }> } }>;

    const pack = rows.find((r) => r.id === PACK);
    expect(pack?.kind).toBe("pack");
    expect(pack?.pack?.entries.map((e) => e.id)).toContain("com.foldlab.filmluts"); // a member by another author
    expect(pack?.pack?.entries.some((e) => e.required)).toBe(true); // base-set member

    const free = rows.find((r) => r.id === "com.foldlab.filmluts");
    expect(free?.pack).toBeUndefined();
  });
});
