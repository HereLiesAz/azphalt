import { afterEach, describe, expect, it, vi } from "vitest";
import { PublishError, RepositoryClient } from "../src/index.js";

const bytes = new Uint8Array([1, 2, 3]);

function respond(status: number, body: unknown) {
  const fetchMock = vi.fn(async () => new Response(JSON.stringify(body), { status }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => vi.unstubAllGlobals());

describe("publish", () => {
  it("posts the raw .azp and returns a pending review on 202", async () => {
    const pending = {
      status: "pending-review",
      id: "com.acme.filter",
      version: "1.3.0",
      review: "https://github.com/acme/registry/pull/42",
      publisher: { publicKey: "AAAA", pin: "new" },
    };
    const fetchMock = respond(202, pending);
    const result = await new RepositoryClient({ url: "https://repo.example/" }).publish(bytes);
    expect(result).toEqual(pending);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://repo.example/packages");
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/vnd.azphalt.package");
    expect(init.body).toBe(bytes);
  });

  it("wraps a 201 detail as published", async () => {
    respond(201, { id: "com.acme.filter", version: "1.3.0" });
    await expect(new RepositoryClient({ url: "https://repo.example" }).publish(bytes)).resolves.toEqual({
      status: "published",
      package: { id: "com.acme.filter", version: "1.3.0" },
    });
  });

  it("throws the envelope's code and details on refusal", async () => {
    respond(400, { error: { code: "bad_request", message: "not verifiable", details: ["digest mismatch: a.cube"] } });
    const err = await new RepositoryClient({ url: "https://repo.example" }).publish(bytes).catch((e) => e);
    expect(err).toBeInstanceOf(PublishError);
    expect(err).toMatchObject({ status: 400, code: "bad_request", message: "not verifiable", details: ["digest mismatch: a.cube"] });
  });

  it("throws on a body that is not an envelope", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("nope", { status: 502 })));
    const err = await new RepositoryClient({ url: "https://repo.example" }).publish(bytes).catch((e) => e);
    expect(err).toMatchObject({ status: 502, code: undefined, message: "Publish failed: 502" });
  });
});
