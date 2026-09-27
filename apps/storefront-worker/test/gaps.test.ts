import { afterEach, describe, expect, it, vi } from "vitest";
import worker from "../src/index";
import { assets, baseVars, durableState } from "./harness";

const catalog = [
  { id: "com.example.free", version: "1.0.0", name: "Free", kind: "asset", file: "f.azp", integrity: "sha256-x" },
  { id: "com.example.other", version: "2.0.0", name: "Other", kind: "asset", file: "o.azp", integrity: "sha256-o" },
];
const listings = [
  {
    packageId: "com.example.paid",
    sellerId: "seller_1",
    amountCents: 500,
    currency: "USD",
    package: { version: "1.0.0", name: "Paid", kind: "code", integrity: "sha256-y" },
  },
  {
    packageId: "com.example.sub",
    sellerId: "seller_1",
    amountCents: 300,
    currency: "USD",
    interval: "month",
    package: { version: "1.0.0", name: "Sub", kind: "code", integrity: "sha256-z" },
  },
];
const PACKAGE_BYTES = new Uint8Array([80, 75, 3, 4, 1, 2, 3, 4, 5, 6]);
const ADMIN = { authorization: "Bearer admin-secret" };

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

function req(method: string, path: string, body?: unknown, headers: Record<string, string> = {}) {
  return new Request("https://azphalt.store" + path, {
    method,
    headers: body === undefined ? headers : { "content-type": "application/json", ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

/** Stands in for raw.githubusercontent.com (and, per test, Google), passing everything else through. */
function stubUpstream(extra: (url: string, init?: RequestInit) => Response | undefined = () => undefined) {
  const calls: string[] = [];
  vi.stubGlobal("fetch", vi.fn(async (input: string | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.url;
    calls.push(url);
    const handled = extra(url, init);
    if (handled) return handled;
    if (url.startsWith(baseVars.GITHUB_RAW_BASE + "/packages/")) {
      const range = new Headers(init?.headers).get("range")?.match(/^bytes=(\d+)-(\d+)$/);
      if (range) {
        const [start, end] = [Number(range[1]), Number(range[2])];
        return new Response(PACKAGE_BYTES.slice(start, end + 1), {
          status: 206,
          headers: { "content-range": `bytes ${start}-${end}/${PACKAGE_BYTES.length}` },
        });
      }
      return new Response(PACKAGE_BYTES, { status: 200, headers: { "content-length": String(PACKAGE_BYTES.length) } });
    }
    return new Response("unexpected upstream " + url, { status: 599 });
  }));
  return calls;
}

afterEach(() => vi.unstubAllGlobals());

describe("revocations and moderation", () => {
  it("yanks a version into the feed, the detail, the catalog and the download", async () => {
    const env = makeEnv();
    stubUpstream();
    expect(await (await worker.fetch(req("GET", "/revocations"), env)).json()).toEqual({ revocations: [] });

    expect((await worker.fetch(req("POST", "/api/admin/revocations", { packageId: "com.example.free" }), env)).status).toBe(401);
    const yanked = await worker.fetch(
      req("POST", "/api/admin/revocations", { packageId: "com.example.free", reason: "malware" }, ADMIN),
      env,
    );
    expect(yanked.status).toBe(201);
    const { revocation } = await yanked.json() as { revocation: { id: string; version: string; revokedAt: string } };
    expect(revocation).toMatchObject({ id: "com.example.free", version: "1.0.0", reason: "malware" });

    const feed = await (await worker.fetch(req("GET", "/revocations"), env)).json() as { revocations: unknown[] };
    expect(feed.revocations).toEqual([revocation]);
    const later = await worker.fetch(req("GET", "/revocations?since=" + encodeURIComponent(revocation.revokedAt)), env);
    expect(await later.json()).toEqual({ revocations: [] });
    expect((await worker.fetch(req("GET", "/revocations?since=yesterday"), env)).status).toBe(400);

    const detail = await (await worker.fetch(req("GET", "/packages/com.example.free"), env)).json() as {
      versions: { yanked: boolean }[];
    };
    expect(detail.versions[0].yanked).toBe(true);
    const listed = await (await worker.fetch(req("GET", "/packages"), env)).json() as { packages: { id: string }[] };
    expect(listed.packages.map((p) => p.id)).not.toContain("com.example.free");
    const download = await worker.fetch(req("GET", "/packages/com.example.free/versions/1.0.0/download"), env);
    expect(download.status).toBe(404);
    expect(await download.json()).toMatchObject({ error: { code: "not_found", message: expect.stringContaining("malware") } });

    // Undo.
    expect((await worker.fetch(req("DELETE", "/api/admin/revocations/com.example.free/1.0.0", undefined, ADMIN), env)).status).toBe(204);
    expect(await (await worker.fetch(req("GET", "/revocations"), env)).json()).toEqual({ revocations: [] });
    expect((await worker.fetch(req("DELETE", "/api/admin/revocations/com.example.free/1.0.0", undefined, ADMIN), env)).status).toBe(404);
  });

  it("resolves reports: dismiss records the decision, yank revokes the served version", async () => {
    const env = makeEnv();
    const file = async (body: unknown) =>
      (await (await worker.fetch(req("POST", "/reports", body), env)).json() as { report: { id: number } }).report.id;
    const first = await file({ packageId: "com.example.free", reason: "broken" });
    const second = await file({ packageId: "com.example.other", reason: "malware" });

    expect((await worker.fetch(req("POST", `/api/reports/${first}/resolve`, { action: "dismiss" }), env)).status).toBe(401);
    expect((await worker.fetch(req("POST", `/api/reports/${first}/resolve`, { action: "nuke" }, ADMIN), env)).status).toBe(400);
    expect((await worker.fetch(req("POST", "/api/reports/999/resolve", { action: "dismiss" }, ADMIN), env)).status).toBe(404);

    const dismissed = await worker.fetch(req("POST", `/api/reports/${first}/resolve`, { action: "dismiss" }, ADMIN), env);
    expect(await dismissed.json()).toMatchObject({ report: { resolution: "dismissed" } });

    const yanked = await worker.fetch(req("POST", `/reports/${second}/resolve`, { action: "yank" }, ADMIN), env);
    expect(await yanked.json()).toMatchObject({
      report: { resolution: "yanked" },
      revocation: { id: "com.example.other", version: "2.0.0", reason: "malware" },
    });

    const queue = await (await worker.fetch(req("GET", "/reports", undefined, ADMIN), env)).json() as {
      reports: { id: number; resolution?: string; resolvedAt?: string }[];
    };
    expect(queue.reports.find((r) => r.id === first)).toMatchObject({ resolution: "dismissed", resolvedAt: expect.any(String) });
    expect(queue.reports.find((r) => r.id === second)).toMatchObject({ resolution: "yanked" });
  });
});

describe("install reporting", () => {
  it("mints a token per full download and counts installs and uninstalls against it", async () => {
    const env = makeEnv();
    stubUpstream();
    const download = await worker.fetch(req("GET", "/packages/com.example.free/versions/1.0.0/download"), env);
    expect(download.status).toBe(200);
    expect(new Uint8Array(await download.arrayBuffer())).toEqual(PACKAGE_BYTES);
    expect(download.headers.get("content-type")).toBe("application/vnd.azphalt.package");
    expect(download.headers.get("accept-ranges")).toBe("bytes");
    const token = download.headers.get("azphalt-report-token");
    expect(token).toMatch(/^[A-Za-z0-9_-]{40,}$/);

    // A ranged request is a chunk of a transfer, not a transfer: no token.
    const ranged = await worker.fetch(
      req("GET", "/packages/com.example.free/versions/1.0.0/download", undefined, { range: "bytes=0-3" }),
      env,
    );
    expect(ranged.status).toBe(206);
    expect(ranged.headers.get("content-range")).toBe("bytes 0-3/10");
    expect(ranged.headers.get("azphalt-report-token")).toBeNull();

    // A token minted for one package cannot count an install of another.
    const other = (await worker.fetch(req("GET", "/packages/com.example.other/versions/2.0.0/download"), env))
      .headers.get("azphalt-report-token");
    const installed = await worker.fetch(req("POST", "/installs", {
      events: [
        { id: "com.example.free", version: "1.0.0", event: "installed", token },
        { id: "com.example.free", version: "1.0.0", event: "installed", token: other },
        { id: "com.example.free", version: "1.0.0", event: "activated" },
        { id: "com.example.free", version: "1.0.0", event: "exploded" },
      ],
    }), env);
    expect(installed.status).toBe(200);
    const result = await installed.json() as { accepted: number; rejected: number; receipts: { id: string; receipt: string }[] };
    expect(result).toMatchObject({ accepted: 2, rejected: 2 });
    expect(result.receipts).toEqual([{ id: "com.example.free", receipt: expect.any(String) }]);

    // Spent tokens and receipts are spent.
    const replay = await worker.fetch(req("POST", "/installs", {
      events: [
        { id: "com.example.free", version: "1.0.0", event: "installed", token },
        { id: "com.example.free", version: "1.0.0", event: "uninstalled", receipt: result.receipts[0].receipt },
        { id: "com.example.free", version: "1.0.0", event: "uninstalled", receipt: result.receipts[0].receipt },
        { id: "com.example.free", version: "1.0.0", event: "uninstalled", receipt: "made-up" },
      ],
    }), env);
    expect(await replay.json()).toEqual({ accepted: 1, rejected: 3, receipts: [] });

    const listed = await (await worker.fetch(req("GET", "/packages"), env)).json() as {
      packages: { id: string; installs: number; uninstalls: number }[];
    };
    expect(listed.packages.find((p) => p.id === "com.example.free")).toMatchObject({ installs: 1, uninstalls: 1 });
    expect(listed.packages.find((p) => p.id === "com.example.other")).toMatchObject({ installs: 0, uninstalls: 0 });
  });

  it("refuses malformed bodies", async () => {
    const env = makeEnv();
    const post = (body: unknown) => worker.fetch(req("POST", "/installs", body), env);
    expect((await post({})).status).toBe(400);
    expect((await post({ events: [{ id: "x", event: "installed" }] })).status).toBe(400);
    expect((await post({ events: Array.from({ length: 201 }, () => ({ id: "x", version: "1", event: "activated" })) })).status).toBe(400);
  });
});

describe("Play purchase exchange", () => {
  async function serviceAccount(email: string) {
    const pair = await crypto.subtle.generateKey(
      { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
      true,
      ["sign", "verify"],
    ) as CryptoKeyPair;
    const pkcs8 = Buffer.from(await crypto.subtle.exportKey("pkcs8", pair.privateKey)).toString("base64");
    const pem = "-----BEGIN PRIVATE KEY-----\n" + pkcs8.replace(/(.{64})/g, "$1\n") + "\n-----END PRIVATE KEY-----\n";
    return { json: JSON.stringify({ client_email: email, private_key: pem }), publicKey: pair.publicKey };
  }

  const exchange = (env: never, body: unknown) => worker.fetch(req("POST", "/entitlements/play", body), env);
  const valid = { packageId: "com.example.paid", productId: "com.example.paid", purchaseToken: "tok-1" };

  it("answers 501 until configured", async () => {
    expect((await exchange(makeEnv(), valid)).status).toBe(501);
    expect((await exchange(makeEnv({ PLAY_PACKAGE_NAME: "com.hereliesaz.azphalt.store" }), valid)).status).toBe(501);
  });

  it("verifies with Google using a signed service-account JWT and issues a store-signed entitlement", async () => {
    const account = await serviceAccount("ok@example.iam.gserviceaccount.com");
    const env = makeEnv({ PLAY_PACKAGE_NAME: "com.hereliesaz.azphalt.store", PLAY_SERVICE_ACCOUNT_JSON: account.json });
    let acknowledged = false;
    let assertion = "";
    const calls = stubUpstream((url, init) => {
      if (url === "https://oauth2.googleapis.com/token") {
        assertion = new URLSearchParams(String(init?.body)).get("assertion")!;
        return new Response(JSON.stringify({ access_token: "ya29.test", expires_in: 3600 }));
      }
      if (url.endsWith("/purchases/products/com.example.paid/tokens/tok-1")) {
        expect(new Headers(init?.headers).get("authorization")).toBe("Bearer ya29.test");
        return new Response(JSON.stringify({ purchaseState: 0, acknowledgementState: 0, orderId: "GPA.1234" }));
      }
      if (url.endsWith("/tokens/tok-1:acknowledge")) {
        acknowledged = true;
        return new Response("{}");
      }
      return undefined;
    });

    const res = await exchange(env, valid);
    expect(res.status).toBe(200);
    const { entitlement } = await res.json() as { entitlement: string };
    const token = JSON.parse(Buffer.from(entitlement, "base64").toString()) as {
      claims: { packageId: string; subject: string; kind: string };
      signature: string;
      publicKey: string;
    };
    expect(token.claims).toMatchObject({ packageId: "com.example.paid", subject: "play-order:GPA.1234", kind: "perpetual" });
    expect(calls.some((u) => u.includes("androidpublisher/v3/applications/com.hereliesaz.azphalt.store/"))).toBe(true);
    expect(acknowledged).toBe(true);

    // The JWT Google received is RS256-signed by the service account's key.
    const [header, claims, signature] = assertion.split(".");
    expect(JSON.parse(Buffer.from(claims, "base64url").toString())).toMatchObject({
      iss: "ok@example.iam.gserviceaccount.com",
      scope: "https://www.googleapis.com/auth/androidpublisher",
      aud: "https://oauth2.googleapis.com/token",
    });
    expect(await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      account.publicKey,
      Buffer.from(signature, "base64url"),
      new TextEncoder().encode(header + "." + claims),
    )).toBe(true);

    // Signed by the store's published key.
    const wellKnown = await (await worker.fetch(req("GET", "/.well-known/azphalt.json"), env)).json() as {
      signingKeys: { publicKey: string }[];
    };
    expect(token.publicKey).toBe(wellKnown.signingKeys[0].publicKey);
  });

  it("maps refusals to 402, Google failures to 502, and bad requests to 400/404/501", async () => {
    const account = await serviceAccount("refusals@example.iam.gserviceaccount.com");
    const env = makeEnv({ PLAY_PACKAGE_NAME: "com.hereliesaz.azphalt.store", PLAY_SERVICE_ACCOUNT_JSON: account.json });
    stubUpstream((url) => {
      if (url.includes("oauth2")) return new Response(JSON.stringify({ access_token: "ya29.r" }));
      if (url.endsWith("/tokens/cancelled")) return new Response(JSON.stringify({ purchaseState: 1, orderId: "GPA.1" }));
      if (url.endsWith("/tokens/unknown")) return new Response("{}", { status: 404 });
      if (url.endsWith("/tokens/down")) return new Response("{}", { status: 503 });
      return undefined;
    });
    const status = async (body: unknown) => (await exchange(env, body)).status;
    expect(await status({ ...valid, purchaseToken: "cancelled" })).toBe(402);
    expect(await status({ ...valid, purchaseToken: "unknown" })).toBe(402);
    expect(await status({ ...valid, purchaseToken: "down" })).toBe(502);
    expect(await status({ ...valid, productId: "com.example.cheap" })).toBe(402);
    expect(await status({ ...valid, packageId: "com.example.nope", productId: "com.example.nope" })).toBe(404);
    expect(await status({ packageId: "com.example.sub", productId: "com.example.sub", purchaseToken: "t" })).toBe(501);
    expect(await status({ ...valid, purchaseToken: "x".repeat(5000) })).toBe(400);
    expect(await status({ packageId: "com.example.paid" })).toBe(400);
  });
});
