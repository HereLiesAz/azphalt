/**
 * The client's resumable + concurrent download: it fetches a file in ranged chunks, retries a chunk
 * that fails (resume), reassembles the bytes in order, and falls back to a single response when the
 * server ignores `Range`.
 */
import { describe, it, expect, afterEach } from "vitest";
import { RepositoryClient } from "../src/index.js";

const DL = "/packages/com.x.pack/versions/1.0.0/download";
const realFetch = global.fetch;
afterEach(() => {
  global.fetch = realFetch;
});

/** Minimal `Headers`-like with a case-insensitive `get`. */
const hdr = (map: Record<string, string>) => ({ get: (k: string) => map[k.toLowerCase()] ?? null });

/**
 * A fake range server over `buf`. `failOnce` makes the first request for a given `start-end` window
 * reject once (a simulated connection drop) so we can prove the retry resumes it. `ignoreRange` makes
 * the server answer `200` with the whole body, to prove the no-range fallback.
 */
function rangeServer(buf: Uint8Array, opts: { failOnce?: string; ignoreRange?: boolean; count?: { n: number } } = {}) {
  const failed = new Set<string>();
  return (url: string, options?: { headers?: Record<string, string> }) => {
    if (opts.count) opts.count.n++;
    const range = options?.headers?.Range;
    const m = range ? /^bytes=(\d+)-(\d+)$/.exec(range) : null;
    if (opts.ignoreRange || !m) {
      return Promise.resolve({ status: 200, headers: hdr({}), arrayBuffer: () => Promise.resolve(buf.slice().buffer) });
    }
    const start = Number(m[1]);
    const end = Math.min(Number(m[2]), buf.length - 1);
    const key = `${start}-${end}`;
    if (opts.failOnce === key && !failed.has(key)) {
      failed.add(key);
      return Promise.reject(new Error("simulated connection drop"));
    }
    const slice = buf.slice(start, end + 1);
    return Promise.resolve({
      status: 206,
      headers: hdr({ "content-range": `bytes ${start}-${end}/${buf.length}` }),
      arrayBuffer: () => Promise.resolve(slice.slice().buffer),
    });
  };
}

const bytes = (n: number) => Uint8Array.from({ length: n }, (_, i) => i % 256);

describe("RepositoryClient.download — resumable & concurrent", () => {
  it("reassembles a file from parallel ranged chunks", async () => {
    const buf = bytes(25);
    const count = { n: 0 };
    global.fetch = rangeServer(buf, { count }) as unknown as typeof fetch;
    const out = await new RepositoryClient({ url: "https://r.example" }).download("com.x.pack", "1.0.0", { chunkSize: 4 });
    expect([...out]).toEqual([...buf]);
    // 25 bytes / 4 = 7 windows → 7 requests (probe counts as the first window).
    expect(count.n).toBe(7);
  });

  it("resumes a chunk that fails mid-transfer (retry re-requests the same range)", async () => {
    const buf = bytes(20);
    // Fail the window starting at 8 once; the retry must recover it.
    global.fetch = rangeServer(buf, { failOnce: "8-11" }) as unknown as typeof fetch;
    const out = await new RepositoryClient({ url: "https://r.example" }).download("com.x.pack", "1.0.0", {
      chunkSize: 4,
      concurrency: 2,
    });
    expect([...out]).toEqual([...buf]);
  });

  it("reports progress up to the total", async () => {
    const buf = bytes(10);
    global.fetch = rangeServer(buf, {}) as unknown as typeof fetch;
    let last = 0;
    const out = await new RepositoryClient({ url: "https://r.example" }).download("com.x.pack", "1.0.0", {
      chunkSize: 3,
      onProgress: (received, total) => {
        expect(total).toBe(10);
        last = received;
      },
    });
    expect(out.length).toBe(10);
    expect(last).toBe(10);
  });

  it("falls back to a single response when the server ignores Range", async () => {
    const buf = bytes(30);
    const count = { n: 0 };
    global.fetch = rangeServer(buf, { ignoreRange: true, count }) as unknown as typeof fetch;
    const out = await new RepositoryClient({ url: "https://r.example" }).download("com.x.pack", "1.0.0", { chunkSize: 4 });
    expect([...out]).toEqual([...buf]);
    expect(count.n).toBe(1); // one request; no parallelism possible without range support
  });

  it("still throws 401/402 on a paid package", async () => {
    global.fetch = ((_url: string) => Promise.resolve({ status: 402, headers: hdr({}), arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)) })) as unknown as typeof fetch;
    await expect(new RepositoryClient({ url: "https://r.example" }).download("com.x.pack", "1.0.0")).rejects.toThrowError(/402/);
  });
});

describe("RepositoryClient.download — integrity and hostile servers", () => {
  const sha = async (b: Uint8Array) =>
    "sha256-" + Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", b as Uint8Array<ArrayBuffer>))).map((x) => x.toString(16).padStart(2, "0")).join("");

  it("accepts bytes that match expectedDigest and rejects ones that don't", async () => {
    const buf = bytes(300);
    global.fetch = rangeServer(buf) as unknown as typeof fetch;
    const client = new RepositoryClient({ url: "https://r.example" });
    await expect(client.download("com.x.pack", "1.0.0", { chunkSize: 100, expectedDigest: await sha(buf) })).resolves.toHaveLength(300);
    await expect(client.download("com.x.pack", "1.0.0", { chunkSize: 100, expectedDigest: "sha256-" + "0".repeat(64) })).rejects.toThrow(/integrity/);
  });

  it("refuses a server-declared total above maxBytes instead of allocating it", async () => {
    global.fetch = (() =>
      Promise.resolve({
        status: 206,
        headers: hdr({ "content-range": "bytes 0-99/99999999999" }),
        arrayBuffer: () => Promise.resolve(new Uint8Array(100).buffer),
      })) as unknown as typeof fetch;
    const client = new RepositoryClient({ url: "https://r.example" });
    await expect(client.download("com.x.pack", "1.0.0", { chunkSize: 100 })).rejects.toThrow(/limit/);
  });

  it("rejects a short chunk rather than leaving a zero-filled hole", async () => {
    const buf = bytes(300);
    const honest = rangeServer(buf);
    global.fetch = ((url: string, options?: { headers?: Record<string, string> }) => {
      const range = options?.headers?.Range ?? "";
      if (range.startsWith("bytes=100-")) {
        return Promise.resolve({
          status: 206,
          headers: hdr({ "content-range": "bytes 100-199/300" }),
          arrayBuffer: () => Promise.resolve(new Uint8Array(10).buffer), // 10 bytes, not 100
        });
      }
      return honest(url, options);
    }) as unknown as typeof fetch;
    const client = new RepositoryClient({ url: "https://r.example" });
    await expect(client.download("com.x.pack", "1.0.0", { chunkSize: 100, retries: 0 })).rejects.toThrow(/unexpected body/);
  });

  it("URL-encodes id and version so a hostile pack member cannot redirect the request", async () => {
    const seen: string[] = [];
    global.fetch = ((url: string) => {
      seen.push(url);
      return Promise.resolve({ status: 200, headers: hdr({}), arrayBuffer: () => Promise.resolve(new Uint8Array(1).buffer) });
    }) as unknown as typeof fetch;
    const client = new RepositoryClient({ url: "https://r.example" });
    await client.download("../../admin", "1.0.0?x=1", {});
    expect(seen[0]).toBe("https://r.example/packages/..%2F..%2Fadmin/versions/1.0.0%3Fx%3D1/download");
  });
});
