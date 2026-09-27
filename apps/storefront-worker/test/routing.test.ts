import { describe, expect, it } from "vitest";
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
