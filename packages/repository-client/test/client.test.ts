import { describe, it, expect } from "vitest";
import { RepositoryClient } from "../src/index.js";

// A simple mock for fetch to simulate API responses
const mockFetch = (url: string, options?: any) => {
  const urlObj = new URL(url, "http://localhost");
  const headers = options?.headers || {};
  
  if (urlObj.pathname === "/.well-known/azphalt-repository.json") {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        name: "Test Repo",
        version: "0.1",
        auth: { type: "bearer", url: "https://auth.example.com" }
      })
    });
  }
  
  if (urlObj.pathname === "/packages") {
    const types = urlObj.searchParams.get("types");
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        packages: [
          { id: "com.test.pack", name: "Pack", types: types ? types.split(",") : [] }
        ],
        total: 1, page: 1, pages: 1
      })
    });
  }
  
  if (urlObj.pathname === "/packages/com.test.paid/versions/1.0.0/download") {
    if (headers["Authorization"] !== "Bearer valid_token") {
      return Promise.resolve({
        ok: false,
        status: 401
      });
    }
    return Promise.resolve({
      ok: true,
      status: 200,
      arrayBuffer: () => Promise.resolve(new Uint8Array([0x01, 0x02, 0x03]).buffer)
    });
  }
  
  return Promise.resolve({ ok: false, status: 404 });
};

// @ts-ignore - overriding global fetch for tests
global.fetch = mockFetch;

describe("RepositoryClient", () => {
  it("fetches the repository index", async () => {
    const client = new RepositoryClient({ url: "https://api.example.com" });
    const index = await client.getIndex();
    expect(index.name).toBe("Test Repo");
    expect(index.auth?.url).toBe("https://auth.example.com");
  });

  it("filters search by types", async () => {
    const client = new RepositoryClient({ url: "https://api.example.com" });
    const results = await client.search({ types: ["brush", "image"] });
    expect(results.packages[0].types).toEqual(["brush", "image"]);
  });

  it("fails to download paid asset without token", async () => {
    const client = new RepositoryClient({ url: "https://api.example.com" });
    await expect(client.download("com.test.paid", "1.0.0")).rejects.toThrowError(/401 Unauthorized/);
  });

  it("downloads paid asset with valid token", async () => {
    const client = new RepositoryClient({ url: "https://api.example.com", token: "valid_token" });
    const bytes = await client.download("com.test.paid", "1.0.0");
    expect(bytes).toBeDefined();
    expect(bytes.length).toBe(3);
  });

  it("sends the app id as ?app= when scoped", async () => {
    const seen: string[] = [];
    // @ts-ignore capture the requested URL
    global.fetch = (url: string) => {
      seen.push(url);
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ packages: [], total: 0, page: 1, pages: 1 }) });
    };
    // Client-level app applies to every search.
    await new RepositoryClient({ url: "https://api.example.com", app: "com.app.x" }).search({ q: "lut" });
    // Per-call app overrides the client default.
    await new RepositoryClient({ url: "https://api.example.com", app: "com.app.x" }).search({ app: "com.app.y" });
    // No app configured → no app param.
    await new RepositoryClient({ url: "https://api.example.com" }).search({ q: "lut" });

    expect(seen[0]).toContain("app=com.app.x");
    expect(seen[1]).toContain("app=com.app.y");
    expect(seen[2]).not.toContain("app=");
  });
});
