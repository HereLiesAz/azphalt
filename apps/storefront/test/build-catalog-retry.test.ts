/**
 * The tarball download's retry behaviour.
 *
 * This exists because a deploy failed on it. `build-catalog --check` gates
 * `.github/workflows/deploy-storefront.yml`, it pulls 128 tarballs, and one of them died mid-download
 * with undici's `TypeError: terminated` — an aborted socket, nothing to do with the catalog. An
 * identical re-run passed. The retry that was already there wrapped only the `fetch` call, which
 * resolves when the *headers* arrive, so it covered the handshake and left the several seconds of
 * body streaming — where the abort actually happens — unprotected.
 *
 * The two halves are equally load-bearing, so both are asserted here: a broken transfer is retried,
 * and a real answer (`404`) or bad content is not. Retrying a `404` would turn "this repo was
 * deleted" into a slow, misleading network error, and retrying an integrity mismatch would paper over
 * exactly the tampering the digest exists to catch.
 */
import { gzipSync } from "node:zlib";
import { afterEach, describe, expect, it, vi } from "vitest";
import tar from "tar-stream";

const { fetchTree } = await import("../scripts/build-catalog");

/** A gzipped tarball shaped like GitHub's: every path under one `<repo>-<sha>/` wrapper directory. */
async function tarball(files: Record<string, string>): Promise<Uint8Array> {
  const pack = tar.pack();
  for (const [name, body] of Object.entries(files)) pack.entry({ name: `repo-abc123/${name}` }, body);
  pack.finalize();
  const chunks: Buffer[] = [];
  for await (const c of pack) chunks.push(c as Buffer);
  return new Uint8Array(gzipSync(Buffer.concat(chunks)));
}

/** A 200 whose body dies partway through, the way a dropped socket presents to `fetch`. */
function abortsMidStream(bytes: Uint8Array): Response {
  const body = new ReadableStream({
    start(controller) {
      // Enough real bytes for the read to be genuinely in flight, then the abort undici throws.
      controller.enqueue(bytes.slice(0, Math.floor(bytes.length / 2)));
      controller.error(new TypeError("terminated"));
    },
  });
  return new Response(body, { status: 200 });
}

const ok = (bytes: Uint8Array) => new Response(bytes, { status: 200 });

afterEach(() => vi.unstubAllGlobals());

describe("fetchTree", () => {
  it("retries a mid-stream abort and returns the tree from a later attempt", async () => {
    const bytes = await tarball({ "manifest.json": '{"id":"x"}', LICENSE: "MIT" });
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(abortsMidStream(bytes))
      .mockResolvedValueOnce(ok(bytes));
    vi.stubGlobal("fetch", fetchMock);

    const tree = await fetchTree("owner/repo", "abc123");

    // The payoff: the run survives the abort that used to fail the deploy.
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(Buffer.from(tree.get("manifest.json")!).toString()).toBe('{"id":"x"}');
    // Re-requested, not resumed — the half-tree from the failed attempt must not leak into this one.
    expect([...tree.keys()].sort()).toEqual(["LICENSE", "manifest.json"]);
  });

  it("retries an abort that lands while a file entry is open", async () => {
    // The tiny-tarball case above breaks before `tar` has parsed a header, so no entry stream exists
    // when the socket dies. This one breaks deep inside a 400 KiB member, with an entry stream open
    // and mid-read — the case that used to need its own `'error'` listener to avoid an unhandled
    // event, and the reason dropping that listener has to be proven rather than assumed.
    const bytes = await tarball({ "big.bin": "x".repeat(400_000), "manifest.json": "{}" });
    const truncated = new ReadableStream({
      start(controller) {
        controller.enqueue(bytes.slice(0, bytes.length - 50));
        controller.error(new TypeError("terminated"));
      },
    });
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(truncated, { status: 200 }))
      .mockResolvedValueOnce(ok(bytes));
    vi.stubGlobal("fetch", fetchMock);

    const tree = await fetchTree("owner/repo", "abc123");
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(tree.get("big.bin")).toHaveLength(400_000);
  });

  it("retries a 5xx", async () => {
    const bytes = await tarball({ "manifest.json": "{}" });
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("upstream sad", { status: 503 }))
      .mockResolvedValueOnce(ok(bytes));
    vi.stubGlobal("fetch", fetchMock);

    expect((await fetchTree("owner/repo", "abc123")).has("manifest.json")).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("fails a 404 immediately without retrying", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("nope", { status: 404 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchTree("owner/gone", "abc123")).rejects.toThrow(/HTTP 404/);
    // The whole point: a deleted repo or a bad ref is an answer, so it is asked exactly once.
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("gives up after a bounded number of attempts rather than hanging", async () => {
    const bytes = await tarball({ "manifest.json": "{}" });
    const fetchMock = vi.fn().mockImplementation(async () => abortsMidStream(bytes));
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchTree("owner/repo", "abc123")).rejects.toThrow(/after 4 attempts/);
    expect(fetchMock).toHaveBeenCalledTimes(4);
  }, 20_000);
});
