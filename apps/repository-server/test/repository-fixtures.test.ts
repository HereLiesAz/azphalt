import { describe, it, expect } from "vitest";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeAzp } from "@azphalt/azp";
import { InMemoryStore, Marketplace, Registry } from "@azphalt/registry";
import type { Manifest, RepositoryIndex } from "@azphalt/sdk";
import { createRepositoryHandler, InMemoryAuthorizer, type RepoRequest } from "../src/index";

/**
 * Canonical **sample Repository-API responses** (azphalt #43): committed JSON a host can vendor into
 * its own registry-client tests, emitted **by the reference server** so they can't drift from the spec.
 * Each fixture is `{ method, path, status, body }`. This test regenerates them from a *deterministic*
 * seed and asserts the live handler still matches the committed files — run with `UPDATE_FIXTURES=1` to
 * refresh after an intentional wire-format change, and CI (no flag) fails on any unintended drift.
 */

const FIX_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "fixtures");
const LICENSE = "MIT License\n";
const lut = new TextEncoder().encode("LUT_3D_SIZE 2\n0 0 0\n1 0 0\n0 1 0\n1 1 0\n0 0 1\n1 0 1\n0 1 1\n1 1 1\n");

function azp(id: string, extra: Partial<Omit<Manifest, "files" | "id">> = {}): Uint8Array {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id,
    name: extra.name ?? id.split(".").pop()!,
    version: extra.version ?? "1.0.0",
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    capabilities: ["assets", "bitmap"],
    assets: [{ type: "lut", path: "assets/x.cube", params: { format: "cube", strength: 1 } }],
    ...extra,
  };
  return writeAzp({ manifest, payload: { "assets/x.cube": lut }, license: LICENSE }).azp;
}

/** The host id the sample companion is scoped to — a paint host browsing its own store. */
const HOST_APP = "com.hereliesaz.graffitixr";

/**
 * A `kind:"app"` **companion** package (`companion-app.md`) — a header (no /code, no /assets) that lets
 * a host launch an external Android app / PWA over a handoff. App-scoped to {@link HOST_APP}, so it
 * surfaces only when the browse request's `app` matches. Demonstrates companion discovery end-to-end.
 */
function companionAzp(): Uint8Array {
  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: "com.demo.companion",
    name: "AR Stencil Capture",
    version: "1.0.0",
    description: "Capture a wall stencil in AR and hand it back",
    author: "Acme AR",
    kind: "app",
    license: "MIT",
    compat: ">=0.1",
    targetApps: [HOST_APP],
    app: {
      platforms: {
        android: {
          packageId: "com.acme.arstencil",
          minSdk: 29,
          install: "https://play.google.com/store/apps/details?id=com.acme.arstencil",
        },
        pwa: {
          manifestUrl: "https://arstencil.acme.com/manifest.webmanifest",
          startUrl: "https://arstencil.acme.com/",
          shareTargetUrl: "https://arstencil.acme.com/handoff",
        },
      },
      handoffs: [
        {
          id: "capture-stencil",
          action: "capture",
          name: "Capture AR Stencil",
          input: { assets: ["image"], params: { wallWidthMm: "number?" } },
          output: { assets: ["vector", "image"], params: { scaleMm: "number?" } },
          transport: {
            android: { intentAction: "com.acme.arstencil.CAPTURE", resultMimeTypes: ["image/svg+xml", "image/png"] },
            pwa: { shareTargetUrl: "https://arstencil.acme.com/handoff/capture", return: { kind: "postMessage" } },
          },
        },
      ],
    },
  };
  return writeAzp({ manifest, payload: {}, license: LICENSE }).azp;
}

const INDEX: RepositoryIndex = {
  name: "Sample azphalt Repository",
  version: "0.1",
  description: "Reference sample responses for a host's registry client.",
  supportedTypes: ["lut", "audio", "transition"],
  profiles: ["image", "video-audio", "companion"],
  signingKeys: [{ publicKey: "MCowBQYDK2VwAyEA…", keyId: "reg-2026", label: "Sample Repository" }],
};

/** A deterministic seeded repo: a free grade, a consigned (paid) pack, and an app-scoped companion. */
async function seed() {
  const store = new InMemoryStore();
  const registry = new Registry(store);
  const marketplace = new Marketplace(registry, store);
  await registry.publish(azp("com.demo.free", { name: "Free Grade", description: "an open-lane LUT", author: "Az" }));
  await registry.publish(azp("com.demo.free", { name: "Free Grade", version: "1.1.0", author: "Az" }));
  await registry.publish(azp("com.demo.paid", { name: "Cinematic Pack", description: "premium grades", author: "SFX Studio" }));
  await registry.publish(companionAzp());
  await marketplace.listForSale("com.demo.paid", "seller_1", { amountCents: 900, currency: "USD" });
  const authorizer = new InMemoryAuthorizer().registerToken("known-but-unlicensed");
  return { registry, marketplace, authorizer };
}

/** Timestamps are the only non-deterministic field (publish stamps `new Date()`); pin them for stable fixtures. */
function normalize<T>(value: T): T {
  if (typeof value === "string") return (/^\d{4}-\d{2}-\d{2}T/.test(value) ? "2026-01-01T00:00:00.000Z" : value) as unknown as T;
  if (Array.isArray(value)) return value.map(normalize) as unknown as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalize(v)])) as T;
  }
  return value;
}

/** Build the canonical `{ name → {method,path,status,body} }` sample-response set from a fresh seeded repo. */
async function buildFixtures(): Promise<Record<string, unknown>> {
  const { registry, marketplace, authorizer } = await seed();
  const handle = createRepositoryHandler({ registry, marketplace, authorizer, index: INDEX });
  const mk = (path: string, opts: { method?: string; headers?: Record<string, string>; body?: string } = {}): RepoRequest => {
    const url = new URL(path, "http://sample");
    // RepoRequest.headers uses lower-cased names (the Node adapter normalizes them); mirror that here.
    const headers = Object.fromEntries(Object.entries(opts.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v]));
    return { method: opts.method ?? "GET", path: url.pathname, query: url.searchParams, headers, body: opts.body };
  };
  const capture = async (name: string, req: RepoRequest) => {
    const res = await handle(req);
    // Only JSON responses are captured as fixtures (the download 200 is binary and excluded).
    const body = typeof res.body === "string" ? JSON.parse(res.body) : "<binary omitted>";
    return [name, { method: req.method, path: req.path + (req.query.toString() ? `?${req.query}` : ""), status: res.status, body: normalize(body) }] as const;
  };

  const dl = "/packages/com.demo.paid/versions/1.0.0/download";
  const entries = await Promise.all([
    capture("well-known", mk("/.well-known/azphalt-repository.json")),
    capture("packages", mk("/packages")),
    // Companion discovery: a paint host browsing its own store (`?app=`) sees the app-scoped companion.
    capture("packages-app-scoped", mk(`/packages?app=${HOST_APP}`)),
    capture("package-detail", mk("/packages/com.demo.free")),
    // A `kind:"app"` detail — the full manifest with the `app` block (platforms + handoffs).
    capture("package-detail-companion", mk("/packages/com.demo.companion")),
    capture("revocations", mk("/revocations")),
    capture("updates", mk("/updates", { method: "POST", body: JSON.stringify([{ id: "com.demo.free", version: "1.0.0" }, { id: "com.demo.paid", version: "1.0.0" }]) })),
    capture("download-401-unauthenticated", mk(dl)),
    capture("download-402-unlicensed", mk(dl, { headers: { authorization: "Bearer known-but-unlicensed" } })),
  ]);
  return Object.fromEntries(entries);
}

describe("Repository API — canonical sample responses (#43)", () => {
  it("the reference server emits fixtures that match the committed samples", async () => {
    const fixtures = await buildFixtures();
    const update = process.env.UPDATE_FIXTURES === "1";
    if (update && !existsSync(FIX_DIR)) mkdirSync(FIX_DIR, { recursive: true });

    for (const [name, value] of Object.entries(fixtures)) {
      const file = join(FIX_DIR, `${name}.json`);
      const json = JSON.stringify(value, null, 2) + "\n";
      if (update) {
        writeFileSync(file, json);
        continue;
      }
      // Without the flag (CI): a missing committed fixture is a failure, not a silent regeneration.
      expect(existsSync(file), `fixture ${name}.json is missing from the repository — run with UPDATE_FIXTURES=1 to create it`).toBe(true);
      expect(readFileSync(file, "utf8"), `fixture ${name}.json drifted — re-run with UPDATE_FIXTURES=1 if intentional`).toBe(json);
    }
  });

  it("the sample responses carry the documented shape (spot-checks)", async () => {
    const f = await buildFixtures();
    const wk = f["well-known"] as { body: RepositoryIndex };
    expect(wk.body.supportedTypes).toContain("lut");
    expect(wk.body.profiles).toContain("companion");
    expect((f["package-detail"] as { body: { latest: string } }).body.latest).toBe("1.1.0");
    // Companion discovery: app-scoped browse surfaces the kind:"app" companion to its target host.
    const scoped = (f["packages-app-scoped"] as { body: { packages: Array<{ id: string; kind: string; targetApps?: string[] }> } }).body;
    const companion = scoped.packages.find((p) => p.id === "com.demo.companion");
    expect(companion?.kind).toBe("app");
    expect(companion?.targetApps).toContain("com.hereliesaz.graffitixr");
    // The companion's detail carries the full app manifest (platforms + handoffs).
    const detail = (f["package-detail-companion"] as { body: { manifest: { kind: string; app: { handoffs: Array<{ action: string }> } } } }).body;
    expect(detail.manifest.kind).toBe("app");
    expect(detail.manifest.app.handoffs[0].action).toBe("capture");
    expect((f["updates"] as { body: { updates: unknown[] } }).body.updates).toEqual([{ id: "com.demo.free", latest: "1.1.0" }]);
    expect((f["download-401-unauthenticated"] as { status: number; body: { error: { code: string } } }).status).toBe(401);
    expect((f["download-402-unlicensed"] as { body: { error: { code: string } } }).body.error.code).toBe("payment_required");
  });
});
