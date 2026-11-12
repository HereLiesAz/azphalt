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
      expect(network.mock.calls[0][1]).toMatchObject({ redirect: "manual" });
    } finally {
      network.mockRestore();
    }
  });

  it("preserves unverified ANS names but strips remote registry credentials and unknown fields", async () => {
    const external = {
      id: "external.a2a.0123456789abcdefabcd", name: "Weather", kind: "a2a-agent",
      source_url: "https://agent.example.com/card",
      verification: "card_read_only", installable: false,
      headers: { Authorization: "Bearer not-for-the-public" },
      ans_claim: {
        name: "ans://release-2026.11.agent.example.com", agent_host: "agent.example.com",
        verification: "unverified", headers: { Authorization: "secret" },
      },
      skills: [{ name: "Forecast", headers: { Authorization: "nested" } }],
    };
    const badClaim = { ...external, id: "external.a2a.ffffffffffffffffffff",
      ans_claim: { ...external.ans_claim, agent_host: "attacker.example.com" } };
    const network = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({
      schema: 1, source: "searcha2a", listings: [external, badClaim],
    }), { status: 200 }));
    try {
      const res = await get("https://azphalt.store/api/a2a/agents");
      expect(res.status).toBe(200);
      const raw = await res.text();
      expect(raw).not.toContain("Authorization");
      expect(raw).not.toContain("not-for-the-public");
      expect(raw).not.toContain("nested");
      const data = JSON.parse(raw);
      expect(data.count).toBe(2);
      expect(data.listings[0].ans_claim).toEqual({
        name: "ans://release-2026.11.agent.example.com", agent_host: "agent.example.com",
        verification: "unverified",
      });
      expect(data.listings[0].skills).toEqual([{ name: "Forecast" }]);
      expect(data.listings[1].ans_claim).toBeUndefined();
    } finally {
      network.mockRestore();
    }
  });

  it("excludes private and credential-bearing URL fields from public registry feeds", async () => {
    const good = {
      id: "external.a2a.0123456789abcdefabcd", name: "Safe", kind: "a2a-agent",
      source_url: "https://agent.example.com/card", verification: "card_read_only",
      installable: false, endpoint: "https://agent.example.com/api?token=secret-token",
      discovery_url: "https://localhost/metadata",
    };
    const bad = [
      { ...good, id: "external.a2a.aaaaaaaaaaaaaaaaaaaa",
        source_url: "https://user:secret@agent.example.com/card" },
      { ...good, id: "external.a2a.bbbbbbbbbbbbbbbbbbbb",
        source_url: "https://agent.example.com/card?auth=secret" },
      { ...good, id: "external.a2a.cccccccccccccccccccc",
        source_url: "https://127.0.0.1/card" },
    ];
    const network = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({
      schema: 1, source: "searcha2a", listings: [...bad, good],
    }), { status: 200 }));
    try {
      const response = await get("https://azphalt.store/api/a2a/agents");
      expect(response.status).toBe(200);
      const body = await response.text();
      expect(body).not.toContain("secret");
      expect(body).not.toContain("localhost");
      const feed = JSON.parse(body);
      expect(feed.count).toBe(1);
      expect(feed.listings[0].source_url).toBe("https://agent.example.com/card");
      expect(feed.listings[0].endpoint).toBeUndefined();
      expect(feed.listings[0].discovery_url).toBeUndefined();
    } finally { network.mockRestore(); }
  });

  it("rejects redirects instead of fetching an unexpected upstream URL", async () => {
    const network = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, {
      status: 302, headers: { location: "https://unexpected.example/agent-feed.json" },
    }));
    try {
      const res = await get("https://azphalt.store/api/a2a/agents");
      expect(res.status).toBe(502);
      expect((await res.json()).error).toBe("SearchA2A directory temporarily unavailable");
      expect(network).toHaveBeenCalledOnce();
      expect(network.mock.calls[0][1]).toMatchObject({ redirect: "manual" });
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

describe("vendor-neutral MCP Registry v0.1 discovery", () => {
  it("projects external metadata without leaking credentials, package instructions or tokenized URLs", async () => {
    const upstream = {
      servers: [{
        server: {
          name: "default/weather", title: "Weather", description: "Forecasts",
          version: "nightly.2026-Q4",
          headers: { Authorization: "Bearer secret-registry-token" },
          packages: [{ identifier: "internal-private-package", env: { API_KEY: "secret" } }],
          remotes: [
            { type: "streamable-http", url: "https://mcp.example.com/mcp",
              headers: { Authorization: "Bearer secret-remote-token" } },
            { type: "sse", url: "http://localhost:8080/sse" },
            { type: "streamable-http", url: "https://mcp.example.com/mcp?token=secret" },
          ],
        },
        _meta: { "io.modelcontextprotocol.registry/official": { status: "active" } },
      }],
      metadata: { nextCursor: "eyJvZmZzZXQiOjMwfQ" },
    };
    const fetcher = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(upstream), { status: 200 }));
    try {
      const response = await get("https://azphalt.store/api/mcp/servers?search=weath%65r");
      expect(response.status).toBe(200);
      const output = await response.text();
      for (const secret of ["secret", "Authorization", "API_KEY", "internal-private-package", "localhost"]) {
        expect(output).not.toContain(secret);
      }
      const doc = JSON.parse(output);
      expect(doc).toEqual({
        schema: 1, source: "mcp-registry-v0.1", count: 1,
        nextCursor: "eyJvZmZzZXQiOjMwfQ",
        servers: [{
          kind: "mcp-server", name: "default/weather", title: "Weather",
          description: "Forecasts", version: "nightly.2026-Q4",
          verification: "registry_metadata_only", installable: false,
          remotes: [{ type: "streamable-http", url: "https://mcp.example.com/mcp" }],
        }],
      });
      const target = new URL(String(fetcher.mock.calls[0][0]));
      expect(target.origin).toBe("https://registry.modelcontextprotocol.io");
      expect(target.pathname).toBe("/v0.1/servers");
      expect(target.searchParams.get("search")).toBe("weather");
      expect(target.searchParams.get("limit")).toBe("30");
    } finally { fetcher.mockRestore(); }
  });

  it("supports a fixed compatible registry base and opaque cursor, not user-specified hosts", async () => {
    const fetcher = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(
      JSON.stringify({ servers: [], metadata: {} }), { status: 200 }));
    try {
      const response = await worker.fetch(new Request(
        "https://azphalt.store/api/mcp/servers?cursor=cGFnZTI="), {
          ...env(), MCP_REGISTRY_BASE_URL: "https://catalog.example.org/registry",
        } as never);
      expect(response.status).toBe(200);
      const target = new URL(String(fetcher.mock.calls[0][0]));
      expect(target.origin).toBe("https://catalog.example.org");
      expect(target.pathname).toBe("/registry/v0.1/servers");
      expect(target.searchParams.get("cursor")).toBe("cGFnZTI=");
      expect(target.searchParams.get("limit")).toBe("30");
      expect(target.searchParams.has("search")).toBe(false);
    } finally { fetcher.mockRestore(); }
  });

  it("rejects malformed searches and registry URLs before external traffic", async () => {
    const fetcher = vi.spyOn(globalThis, "fetch");
    try {
      expect((await get("https://azphalt.store/api/mcp/servers?search=ab")).status).toBe(400);
      expect((await get("https://azphalt.store/api/mcp/servers?cursor=%0A")).status).toBe(400);
      const result = await worker.fetch(new Request("https://azphalt.store/api/mcp/servers"), {
        ...env(), MCP_REGISTRY_BASE_URL: "http://127.0.0.1:8080",
      } as never);
      expect(result.status).toBe(503);
      expect(fetcher).not.toHaveBeenCalled();
    } finally { fetcher.mockRestore(); }
  });

  it("rejects redirects, oversized payloads and deleted server versions", async () => {
    const fetcher = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(null, { status: 302,
        headers: { Location: "https://unexpected.example/mcp" } }))
      .mockResolvedValueOnce(new Response("{}", { status: 200,
        headers: { "Content-Length": "1000001" } }))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        servers: [
          { server: { name: "hidden/server", version: "custom" },
            _meta: { "io.modelcontextprotocol.registry/official": { status: "deleted" } } },
          { server: { name: "visible/server", version: "1.0",
            remotes: [{ type: "sse", url: "https://tools.example.net/sse" }] } },
        ],
      }), { status: 200 }));
    try {
      expect((await get("https://azphalt.store/api/mcp/servers")).status).toBe(502);
      expect((await get("https://azphalt.store/api/mcp/servers")).status).toBe(502);
      const response = await get("https://azphalt.store/api/mcp/servers");
      expect(response.status).toBe(200);
      const page = await response.json() as { count: number; servers: { name: string }[] };
      expect(page.count).toBe(1);
      expect(page.servers[0].name).toBe("visible/server");
    } finally { fetcher.mockRestore(); }
  });
});
