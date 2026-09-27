import { describe, expect, it } from "vitest";
import worker from "../src/index";
import { assets, baseVars, durableState } from "./harness";

const catalog = [
  { id: "com.example.free", version: "1.0.0", name: "Free", kind: "asset", file: "f.azp", integrity: "sha256-x" },
];
const listings = [
  {
    packageId: "com.example.paid",
    sellerId: "seller_1",
    amountCents: 500,
    currency: "USD",
    package: { version: "1.0.0", name: "Paid", kind: "code", integrity: "sha256-y" },
  },
];

function makeEnv(extra: Record<string, unknown> = {}) {
  return {
    ...baseVars,
    ASSETS: assets({
      "/index.html": "<title>store</title>",
      "/catalog.json": JSON.stringify(catalog),
      "/listings.json": JSON.stringify(listings),
    }),
    STATE: durableState(),
    ADMIN_TOKEN: "admin-secret",
    ...extra,
  } as never;
}

function post(path: string, body: unknown, headers: HeadersInit = {}) {
  return new Request("https://azphalt.store" + path, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

function cookieFrom(res: Response): string {
  return (res.headers.get("set-cookie") || "").split(";")[0];
}

describe("ratings", () => {
  it("rates a free package, keeps one rating per browser, and shows it in the catalog", async () => {
    const env = makeEnv();
    const first = await worker.fetch(post("/api/ratings", { packageId: "com.example.free", stars: 5 }), env);
    expect(first.status).toBe(200);
    expect(await first.json()).toEqual({ rating: 5, ratingCount: 1 });
    const cookie = cookieFrom(first);
    expect(cookie).toMatch(/^azphalt_buyer_session=/);

    // Same browser changes its mind: replaced, not added.
    const again = await worker.fetch(post("/api/ratings", { packageId: "com.example.free", stars: 3 }, { cookie }), env);
    expect(await again.json()).toEqual({ rating: 3, ratingCount: 1 });

    // A different browser adds a second rating.
    const other = await worker.fetch(post("/api/ratings", { packageId: "com.example.free", stars: 4 }), env);
    expect(await other.json()).toEqual({ rating: 3.5, ratingCount: 2 });

    const listed = await worker.fetch(new Request("https://azphalt.store/packages?sort=rating"), env);
    const body = await listed.json() as { packages: Array<{ id: string; rating?: number; ratingCount: number }> };
    expect(body.packages[0]).toMatchObject({ id: "com.example.free", rating: 3.5, ratingCount: 2 });

    const detail = await worker.fetch(new Request("https://azphalt.store/packages/com.example.free"), env);
    expect(await detail.json()).toMatchObject({ rating: 3.5, ratingCount: 2 });
  });

  it("refuses a paid package to anyone without an entitlement", async () => {
    const res = await worker.fetch(post("/api/ratings", { packageId: "com.example.paid", stars: 1 }), makeEnv());
    expect(res.status).toBe(403);
  });

  it("validates input", async () => {
    const env = makeEnv();
    for (const body of [{ packageId: "com.example.free", stars: 6 }, { packageId: "com.example.free", stars: 2.5 }, { stars: 3 }]) {
      expect((await worker.fetch(post("/api/ratings", body), env)).status).toBe(400);
    }
    expect((await worker.fetch(post("/api/ratings", { packageId: "com.example.none", stars: 3 }), env)).status).toBe(404);
  });

  it("rate-limits by client IP through the limiter binding", async () => {
    const keys: string[] = [];
    const env = makeEnv({
      WRITE_LIMITER: { limit: async ({ key }: { key: string }) => (keys.push(key), { success: false }) },
    });
    const res = await worker.fetch(
      post("/api/ratings", { packageId: "com.example.free", stars: 5 }, { "cf-connecting-ip": "203.0.113.9" }),
      env,
    );
    expect(res.status).toBe(429);
    expect(keys).toEqual(["203.0.113.9"]);
  });
});

describe("reports and moderation", () => {
  it("files an untrusted report and lists it only for the moderator", async () => {
    const env = makeEnv();
    const filed = await worker.fetch(
      post("/reports", { packageId: "com.example.free", reason: "broken", detail: "crashes on load" }),
      env,
    );
    expect(filed.status).toBe(201);
    expect(await filed.json()).toMatchObject({ quarantined: false, report: { trusted: false, reason: "broken" } });

    await worker.fetch(
      post("/api/reports", {
        packageId: "com.example.paid",
        reason: "ip-claim",
        originalPackageId: "com.example.free",
        claimant: "someone",
      }),
      env,
    );

    const anonymous = await worker.fetch(new Request("https://azphalt.store/reports"), env);
    expect(anonymous.status).toBe(401);

    const queue = await worker.fetch(
      new Request("https://azphalt.store/api/reports", { headers: { authorization: "Bearer admin-secret" } }),
      env,
    );
    expect(queue.status).toBe(200);
    const { reports } = await queue.json() as { reports: Array<Record<string, unknown>> };
    expect(reports.map((r) => r.packageId)).toEqual(["com.example.paid", "com.example.free"]);
    expect(reports[0]).toMatchObject({ reason: "ip-claim", originalPackageId: "com.example.free", claimant: "someone" });
    expect(reports[1]).not.toHaveProperty("claimant");
  });

  it("validates reports", async () => {
    const env = makeEnv();
    const bad = [
      { packageId: "com.example.free", reason: "because" },
      { packageId: "com.example.free", reason: "ip-claim" },
      { packageId: "com.example.free", reason: "other", detail: "x".repeat(4001) },
    ];
    for (const body of bad) expect((await worker.fetch(post("/reports", body), env)).status).toBe(400);
    expect((await worker.fetch(post("/reports", { packageId: "com.example.none", reason: "other" }), env)).status).toBe(404);
  });
});
