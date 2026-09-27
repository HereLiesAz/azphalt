/**
 * `POST /packages` (`repository-api.md` § 9) is optional. This facade serves a registry that is filled
 * some other way, so it must answer the normative `501 not_implemented` — which a client takes as final —
 * rather than `405`, which would read as "wrong verb, try another".
 */
import { describe, it, expect } from "vitest";
import { InMemoryStore, Marketplace, Registry } from "@azphalt/registry";
import { createRepositoryHandler } from "../src/index";

describe("POST /packages", () => {
  it("answers 501 not_implemented, and other verbs on /packages stay 405", async () => {
    const store = new InMemoryStore();
    const registry = new Registry(store);
    const handle = createRepositoryHandler({
      registry,
      marketplace: new Marketplace(registry, store),
      index: { name: "R", version: "0.1" },
    });
    const req = (method: string) => ({ method, path: "/packages", query: new URLSearchParams(), headers: {}, body: "x" });

    const res = await handle(req("POST"));
    expect(res.status).toBe(501);
    expect(JSON.parse(res.body as string)).toEqual({
      error: { code: "not_implemented", message: "this repository does not accept publishes" },
    });
    expect((await handle(req("DELETE"))).status).toBe(405);
  });
});
