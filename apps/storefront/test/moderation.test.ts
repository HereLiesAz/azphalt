/**
 * The moderation lane: a filed report is stored (untrusted) and shows up in the aggregated queue.
 */
import { describe, expect, it } from "vitest";

const { POST: fileReport, GET: listReports } = await import("../app/api/reports/route");
const { listAllReports } = await import("../lib/catalog");

/** A seeded package. */
const PKG = "com.hereliesaz.halftone";

function post(body: unknown): Promise<Response> {
  return fileReport(new Request("http://localhost/api/reports", { method: "POST", body: JSON.stringify(body) }));
}

describe("moderation reports", () => {
  it("files an untrusted report and surfaces it in the queue", async () => {
    const res = await post({ packageId: PKG, reason: "malware", detail: "looks suspicious" });
    expect(res.status).toBe(201);
    expect((await res.json()).quarantined).toBe(false); // an untrusted web report never auto-quarantines

    const listed = await listAllReports();
    const mine = listed.find((r) => r.packageId === PKG && r.detail === "looks suspicious");
    expect(mine?.reason).toBe("malware");
    expect(mine?.trusted).toBe(false);
  });

  it("GET /api/reports returns the queue newest-first", async () => {
    await post({ packageId: PKG, reason: "broken" });
    const res = await listReports();
    const { reports } = await res.json();
    expect(res.status).toBe(200);
    expect(reports.length).toBeGreaterThan(0);
    // Sorted newest-first.
    for (let i = 1; i < reports.length; i++) {
      expect(reports[i - 1].reportedAt >= reports[i].reportedAt).toBe(true);
    }
  });

  it("rejects a report without a valid reason", async () => {
    const res = await post({ packageId: PKG, reason: "nonsense" });
    expect(res.status).toBe(400);
  });
});
