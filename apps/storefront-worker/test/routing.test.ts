import { describe, expect, it, vi } from "vitest";
import worker from "../src/index";
import { assets, baseVars, durableState } from "./harness";

const files = {
  "/index.html": "<!doctype html><title>store</title>",
  "/catalog.json": "[]",
  "/listings.json": "[]",
  "/_docs/index.html": "<title>docs home</title>",
  "/_docs/404.html": "<title>docs 404</title>",
  "/_docs/ARCHITECTURE.html": "<title>architecture</title>",
  "/_docs/specs/llm.html": "<title>llm</title>",
  "/_docs/docs-assets/app.js": "console.log('docs')",
};

function env() {
  return { ...baseVars, ASSETS: assets(files), STATE: durableState() } as never;
}

async function get(url: string, headers: HeadersInit = {}) {
  return worker.fetch(new Request(url, { headers }), env());
}

describe("azphalt.org serves the docs", () => {
  it("maps the root and clean paths onto /_docs", async () => {
    for (const [url, title] of [
      ["https://azphalt.org/", "docs home"],
      ["https://www.azphalt.org/ARCHITECTURE", "architecture"],
      ["https://azphalt.org/specs/llm", "llm"],
      ["https://azphalt.org/docs-assets/app.js", "console.log('docs')"],
    ]) {
      const res = await get(url);
      expect(res.status, url).toBe(200);
      expect(await res.text(), url).toContain(title);
    }
  });

  it("keeps the /_docs prefix out of redirects for old .html links", async () => {
    const res = await get("https://azphalt.org/ARCHITECTURE.html");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("/ARCHITECTURE");
  });

  it("answers a miss with the docs 404 page, not the storefront shell", async () => {
    const res = await get("https://azphalt.org/nope", { accept: "text/html" });
    expect(res.status).toBe(404);
    expect(await res.text()).toContain("docs 404");
  });

  it("does not expose the Repository API on the docs host", async () => {
    const res = await get("https://azphalt.org/packages");
    expect(res.status).toBe(404);
  });

  it("refuses writes", async () => {
    const res = await worker.fetch(new Request("https://azphalt.org/", { method: "POST" }), env());
    expect(res.status).toBe(405);
  });
});

describe("azphalt.store serves the storefront", () => {
  it("serves the SPA shell for a page navigation with no file", async () => {
    const res = await get("https://azphalt.store/purchases", { accept: "text/html" });
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("store");
  });

  it("leaves a missing non-page asset as a 404", async () => {
    const res = await get("https://azphalt.store/missing.js", { accept: "*/*" });
    expect(res.status).toBe(404);
  });

  it("still routes the Repository API", async () => {
    const res = await get("https://azphalt.store/packages");
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ packages: [], total: 0 });
  });
});

describe("cross-origin reads", () => {
  it("lets another origin read the public Repository API", async () => {
    const res = await get("https://azphalt.store/packages?kind=font", { Origin: "https://morphont.example" });
    expect(res.status).toBe(200);
    expect(res.headers.get("access-control-allow-origin")).toBe("*");
  });

  it("answers a preflight for a public read", async () => {
    const res = await worker.fetch(new Request("https://azphalt.store/packages/a.b/versions/1.0.0/download", { method: "OPTIONS" }), env());
    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-methods")).toContain("GET");
  });

  it("keeps writes and the storefront same-origin", async () => {
    const page = await get("https://azphalt.store/", { Origin: "https://morphont.example" });
    expect(page.headers.get("access-control-allow-origin")).toBeNull();
    const publish = await worker.fetch(new Request("https://azphalt.store/packages", { method: "POST", body: "x" }), env());
    expect(publish.headers.get("access-control-allow-origin")).toBeNull();
  });
});

describe("SearchA2A external directory", () => {
  it("reads the public GitHub mirror and exposes only non-installable cards", async () => {
    const valid = {
      id: "external.a2a.0123456789abcdefabcd", name: "Weather Agent", kind: "a2a-agent",
      source_url: "https://agents.example/.well-known/agent-card.json",
      verification: "card_read_only", installable: false, skills: [{ name: "forecast" }],
    };
    const invalid = { ...valid, id: "external.a2a.abcdef0123456789abcd", name: "Unsafe install", installable: true };
    const network = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({
      schema: 1, source: "searcha2a", listings: [valid, invalid],
    }), { status: 200, headers: { "content-type": "application/json" } }));
    try {
      const res = await get("https://azphalt.store/api/a2a/agents");
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ schema: 1, source: "searcha2a", count: 1, listings: [valid] });
      expect(network).toHaveBeenCalledOnce();
      expect(network.mock.calls[0][0]).toBe(
        "https://raw.githubusercontent.com/HereLiesAz/searcha2a/agent-feed/site/api/v1/azphalt-listings.json",
      );
    } finally {
      network.mockRestore();
    }
  });

  it("returns 502 instead of inventing results when the mirrored feed is unavailable", async () => {
    const network = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("not found", { status: 404 }));
    try {
      const res = await get("https://azphalt.store/api/a2a/agents");
      expect(res.status).toBe(502);
      expect((await res.json()).error).toBe("SearchA2A directory temporarily unavailable");
    } finally {
      network.mockRestore();
    }
  });
});
