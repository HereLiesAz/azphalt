import type {
  RepositoryIndex,
  PackageSearchResponse,
  Manifest,
  AssetType,
  PackManifest,
  PackEntry,
} from "@azphalt/azdk";

/** A `GET /packages/{id}` detail body — the fields this client reads (a superset of the manifest). */
interface PackageDetail extends Manifest {
  /** Newest installable version, when the repository reports one (alongside `version`). */
  latest?: string;
  /** Free/paid status of the package. */
  priceStatus?: "free" | "paid";
  /** The latest version's full manifest (where a pack's `pack` block lives). */
  manifest?: Manifest;
}

/** A {@link PackEntry} with its version resolved and a little display metadata, ready to `download`. */
export interface ResolvedPackEntry extends PackEntry {
  /** The concrete version to install (the pinned `version`, or the member's latest). */
  version: string;
  /** The member's display name, if the repository returned it. */
  name?: string;
  /** The member's free/paid status — a `paid` member still needs its own entitlement to download. */
  priceStatus?: "free" | "paid";
}

export interface ClientOptions {
  url: string;
  token?: string;
  /**
   * This host app's reverse-DNS id. When set, browse/search results are scoped to this app: global
   * packages plus those whose `targetApps` include it. Per-call `SearchOptions.app` overrides it.
   */
  app?: string;
}

export interface SearchOptions {
  q?: string;
  types?: AssetType[];
  tags?: string[];
  page?: number;
  /** Override the client's `app` for this search (see {@link ClientOptions.app}). */
  app?: string;
}

/** Tuning for a resumable, optionally parallel {@link RepositoryClient.download}. */
export interface DownloadOptions {
  /**
   * How many byte-range chunks to fetch in parallel. Default `4`; `1` is sequential. Only used when the
   * repository advertises range support (`Accept-Ranges` / answers `206`); otherwise the whole file
   * comes back in one response and this is ignored.
   */
  concurrency?: number;
  /** Bytes per chunk (default 8 MiB). Larger = fewer requests; smaller = finer resume granularity. */
  chunkSize?: number;
  /** Per-chunk retry attempts on a network / 5xx failure — this is what makes a download resumable. Default `3`. */
  retries?: number;
  /** Abort the whole download. */
  signal?: AbortSignal;
  /** Progress callback, invoked as bytes arrive: `(received, total)`. */
  onProgress?: (received: number, total: number) => void;
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Parse the total size out of a `Content-Range: bytes start-end/total` header, or `undefined`. */
function totalFromContentRange(header: string | null): number | undefined {
  const m = header ? /\/(\d+)\s*$/.exec(header) : null;
  return m ? Number(m[1]) : undefined;
}

export class RepositoryClient {
  private baseUrl: string;
  private token?: string;
  private app?: string;

  constructor(opts: ClientOptions) {
    this.baseUrl = opts.url.replace(/\/$/, "");
    this.token = opts.token;
    this.app = opts.app;
  }

  public setToken(token: string) {
    this.token = token;
  }

  private get headers(): Record<string, string> {
    const h: Record<string, string> = {
      "Accept": "application/json"
    };
    if (this.token) {
      h["Authorization"] = `Bearer ${this.token}`;
    }
    return h;
  }

  public async getIndex(): Promise<RepositoryIndex> {
    const res = await fetch(`${this.baseUrl}/.well-known/azphalt-repository.json`);
    if (!res.ok) throw new Error(`Failed to fetch index: ${res.status}`);
    return res.json();
  }

  public async search(opts: SearchOptions = {}): Promise<PackageSearchResponse> {
    const params = new URLSearchParams();
    if (opts.q) params.set("q", opts.q);
    if (opts.types && opts.types.length > 0) params.set("types", opts.types.join(","));
    if (opts.tags && opts.tags.length > 0) params.set("tags", opts.tags.join(","));
    if (opts.page) params.set("page", opts.page.toString());
    const app = opts.app ?? this.app;
    if (app) params.set("app", app);

    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`${this.baseUrl}/packages${query}`, { headers: this.headers });
    if (!res.ok) throw new Error(`Search failed: ${res.status}`);
    return res.json();
  }

  public async getPackage(id: string): Promise<Manifest> {
    const res = await fetch(`${this.baseUrl}/packages/${id}`, { headers: this.headers });
    if (!res.ok) throw new Error(`Get package failed: ${res.status}`);
    return res.json();
  }

  /**
   * The member list of a `kind: "pack"` **extension pack** (its latest {@link PackManifest}). Throws if
   * `id` isn't a pack. See {@link resolvePack} for a ready-to-install form with versions filled in.
   */
  public async getPack(id: string): Promise<PackManifest> {
    const res = await fetch(`${this.baseUrl}/packages/${id}`, { headers: this.headers });
    if (!res.ok) throw new Error(`Get pack failed: ${res.status}`);
    const detail = (await res.json()) as PackageDetail;
    // The Repository API's detail carries `kind`/`pack` on the nested `manifest` (the spec's
    // `GET /packages/{id}` → `manifest`), not at the top level — so read from there, falling back to a
    // flat body for a repository that inlines the manifest fields.
    const manifest = detail.manifest ?? detail;
    if (manifest.kind !== "pack" || !manifest.pack) throw new Error(`${id} is not an extension pack`);
    return manifest.pack;
  }

  /**
   * Resolve a pack into a ready-to-install list: each member with a concrete `version` (its pinned one,
   * or the member's latest looked up from the repository) plus its name and free/paid status. A host
   * installs `required` members by default and offers the rest, calling {@link download} per member —
   * each still gated on its own license. Members are resolved concurrently.
   */
  public async resolvePack(id: string): Promise<{ entries: ResolvedPackEntry[] }> {
    const pack = await this.getPack(id);
    const entries = await Promise.all(
      pack.entries.map(async (e): Promise<ResolvedPackEntry> => {
        if (e.version) return { ...e, version: e.version };
        const res = await fetch(`${this.baseUrl}/packages/${e.id}`, { headers: this.headers });
        if (!res.ok) throw new Error(`Resolve pack member ${e.id} failed: ${res.status}`);
        const d = (await res.json()) as PackageDetail;
        const version = d.latest ?? d.version;
        if (!version) throw new Error(`Pack member ${e.id} has no resolvable version`);
        return { ...e, version, name: d.name, priceStatus: d.priceStatus };
      }),
    );
    return { entries };
  }

  /**
   * Download a package's `.azp` bytes — **resumable and, when the repository supports byte ranges,
   * parallel**. It fetches the file in `chunkSize` windows using HTTP `Range`, retrying any chunk that
   * fails (network drop or `5xx`) so a flaky connection resumes the exact bytes it lost instead of
   * restarting. Chunks run up to `concurrency` at a time and are reassembled in order.
   *
   * If the repository ignores `Range` (answers `200`, no `Accept-Ranges`), the whole file comes back in
   * that first response and is returned as-is — correct, just without resume/parallelism.
   *
   * `401` (no token) and `402` (unlicensed) on a paid package throw, as before.
   */
  public async download(id: string, version: string, opts: DownloadOptions = {}): Promise<Uint8Array> {
    const url = `${this.baseUrl}/packages/${id}/versions/${version}/download`;
    const chunkSize = Math.max(1, opts.chunkSize ?? 8 * 1024 * 1024);
    const concurrency = Math.max(1, opts.concurrency ?? 4);
    const retries = Math.max(0, opts.retries ?? 3);

    // Probe with the first window: it tells us the total size and whether ranges are supported.
    const first = await this.getChunk(url, 0, chunkSize - 1, retries, opts.signal);
    if (first.status === 401) throw new Error("401 Unauthorized: A valid token is required for this paid asset.");
    if (first.status === 402) throw new Error("402 Payment Required: You do not have a license for this paid asset.");
    if (first.status !== 200 && first.status !== 206) throw new Error(`Download failed: ${first.status}`);
    const firstBytes = first.bytes!;

    // `200` ⇒ the server ignored Range and sent everything; nothing left to parallelize.
    const total = first.status === 206 ? totalFromContentRange(first.headers.get("content-range")) : firstBytes.length;
    if (first.status === 200 || total === undefined || total <= firstBytes.length) {
      opts.onProgress?.(firstBytes.length, total ?? firstBytes.length);
      return firstBytes;
    }

    const out = new Uint8Array(total);
    out.set(firstBytes, 0);
    let received = firstBytes.length;
    opts.onProgress?.(received, total);

    // The remaining windows after the probe chunk.
    const windows: Array<{ start: number; end: number }> = [];
    for (let start = firstBytes.length; start < total; start += chunkSize) {
      windows.push({ start, end: Math.min(start + chunkSize, total) - 1 });
    }

    // A fixed-size worker pool pulling from a shared cursor.
    let cursor = 0;
    const worker = async (): Promise<void> => {
      for (;;) {
        const i = cursor++;
        if (i >= windows.length) return;
        const { start, end } = windows[i];
        const chunk = await this.getChunk(url, start, end, retries, opts.signal);
        if (chunk.status !== 200 && chunk.status !== 206) throw new Error(`Download chunk failed: ${chunk.status}`);
        out.set(chunk.bytes!, start);
        received += chunk.bytes!.length;
        opts.onProgress?.(received, total);
      }
    };
    await Promise.all(Array.from({ length: Math.min(concurrency, windows.length) }, () => worker()));
    return out;
  }

  /**
   * Fetch one byte range with retry. Returns the response's status and (for `200`/`206`) its bytes.
   * A network error or `5xx` is retried with exponential backoff up to `retries` times — re-requesting
   * the *same* range, which is what makes the overall download resumable. `401`/`402` and other `4xx`
   * are terminal (returned, not retried). An abort propagates immediately.
   */
  private async getChunk(
    url: string,
    start: number,
    end: number,
    retries: number,
    signal?: AbortSignal,
  ): Promise<{ status: number; headers: Headers; bytes: Uint8Array | null }> {
    let lastErr: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url, { headers: { ...this.headers, Range: `bytes=${start}-${end}` }, signal });
        if (res.status !== 200 && res.status !== 206) {
          if (res.status >= 500 && attempt < retries) {
            lastErr = new Error(`server ${res.status}`);
            await sleep(2 ** attempt * 100);
            continue;
          }
          return { status: res.status, headers: res.headers, bytes: null };
        }
        // Reading the body can also fail on a dropped connection — inside the retry so it re-requests.
        const bytes = new Uint8Array(await res.arrayBuffer());
        return { status: res.status, headers: res.headers, bytes };
      } catch (e) {
        if (signal?.aborted) throw e;
        lastErr = e;
        if (attempt < retries) {
          await sleep(2 ** attempt * 100);
          continue;
        }
        throw e;
      }
    }
    throw lastErr;
  }
}
