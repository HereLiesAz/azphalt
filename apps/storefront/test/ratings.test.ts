/** User ratings: POST /api/ratings records a 1–5 star vote and returns the new aggregate. */
import { describe, expect, it } from "vitest";

const { POST: rate } = await import("../app/api/ratings/route");
const { GET: listPackages } = await import("../app/api/packages/route");

/** A seeded package. */
const PKG = "com.hereliesaz.halftone";

function post(body: unknown): Promise<Response> {
  return rate(new Request("http://localhost/api/ratings", { method: "POST", body: JSON.stringify(body) }));
}

describe("ratings", () => {
  it("records a rating and returns the new aggregate", async () => {
    const before = await post({ packageId: PKG, stars: 5 });
    expect(before.status).toBe(201);
    const body = await before.json();
    expect(body.ok).toBe(true);
    expect(body.ratingCount).toBeGreaterThan(0);
    expect(body.rating).toBeGreaterThan(0);
    expect(body.rating).toBeLessThanOrEqual(5);

    // The new aggregate is reflected in the browse payload.
    const list = await (await listPackages()).json();
    const pkg = list.find((p: { id: string }) => p.id === PKG);
    expect(pkg.ratingCount).toBe(body.ratingCount);
  });

  it("rejects out-of-range stars", async () => {
    expect((await post({ packageId: PKG, stars: 6 })).status).toBe(400);
    expect((await post({ packageId: PKG, stars: 0 })).status).toBe(400);
  });

  it("rejects a missing packageId", async () => {
    expect((await post({ stars: 4 })).status).toBe(400);
  });
});
