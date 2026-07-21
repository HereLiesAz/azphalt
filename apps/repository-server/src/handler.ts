/**
 * The framework-agnostic core of the reference Repository API server. It maps a parsed request to a
 * response purely over {@link Registry} + {@link Marketplace} data — no Node `http` types leak in, so
 * it is trivially testable and can be mounted on any transport (the bundled Node adapter is in
 * `server.ts`).
 *
 * It implements every endpoint in `spec/repository-api.md`:
 * - `GET /.well-known/azphalt-repository.json` — the repository index.
 * - `GET /packages` — search/browse (`q`, `types`, `tags`, `app`, `capabilities`, `mediaDomains`,
 *   `sort`, `page`), returning ranking/preview metadata on each summary.
 * - `GET /packages/{id}` — full metadata + version history + the latest manifest.
 * - `GET /packages/{id}/versions/{version}/download` — the binary `.azp`, gated `401`/`402` when paid.
 * - `GET /revocations?since=` — the host-pollable feed of versions pulled post-publish.
 * - `POST /updates` — a batch update check over a POSTed installed-library `{ id, version }[]`.
 *
 * Every non-2xx response is the normative `{ error: { code, message } }` envelope (spec § Error responses).
 *
 * The free/paid split comes from the {@link Marketplace} overlay: a package with an *active* listing
 * is `paid` and its download runs through the {@link DownloadAuthorizer}; everything else is `free`
 * and served unconditionally. That is the same lane separation the rest of the standard keeps — money
 * lives only on listings, never in the open registry.
 */
import { RangeNotSatisfiableError, RegistryError, type ByteRangeSpec, type Marketplace, type PackageSummary as RegistrySummary, type Registry } from "@azphalt/registry";
import type { PackageSearchResponse, PackageSummary, RepositoryErrorCode, RepositoryIndex } from "@azphalt/azdk";
import { denyAllAuthorizer, type DownloadAuthorizer } from "@azphalt/registry";

/** Map the HTTP `sort` vocabulary (`popular`/`recent`/`rating`/`name`) onto registry summaries. */
function applySort(list: RegistrySummary[], sort: string | null): RegistrySummary[] {
  if (!sort) return list;
  const out = [...list];
  if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "recent") out.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
  else if (sort === "rating") out.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1) || b.downloads - a.downloads);
  else if (sort === "popular") out.sort((a, b) => b.downloads - a.downloads);
  return out; // unknown sort ⇒ natural order (relevance for search, downloads for browse)
}

/** A transport-neutral request the {@link RepositoryHandler} understands. */
export interface RepoRequest {
  method: string;
  /** Path only, no query string (e.g. `/packages/com.x.y`). */
  path: string;
  /** Parsed query string. */
  query: URLSearchParams;
  /** Header map with lower-cased names. */
  headers: Record<string, string | undefined>;
  /** Raw request body (e.g. the JSON for `POST /updates`), if any. */
  body?: string;
}

/** A transport-neutral response. `body` is a JSON string or raw `.azp` bytes. */
export interface RepoResponse {
  status: number;
  headers: Record<string, string>;
  body: string | Uint8Array;
}

export interface RepositoryHandlerOptions {
  registry: Registry;
  /** The paid-lane overlay. Without it, every package is `free` and downloads are unconditional. */
  marketplace?: Marketplace;
  /** The `/.well-known/azphalt-repository.json` document. */
  index: RepositoryIndex;
  /** Gates paid downloads. Defaults to {@link denyAllAuthorizer} — paid packages 401 until wired. */
  authorizer?: DownloadAuthorizer;
  /** Page size for `GET /packages`. Default 20. */
  pageSize?: number;
}

/** A ready-to-serve handler: `handle(req)` → response. */
export type RepositoryHandler = (req: RepoRequest) => Promise<RepoResponse>;

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };
const json = (status: number, obj: unknown): RepoResponse => ({ status, headers: { ...JSON_HEADERS }, body: JSON.stringify(obj) });

/** Default error `code` per status, so `fail(status, message)` yields the normative envelope. */
const ERR_CODE: Record<number, RepositoryErrorCode> = {
  400: "bad_request",
  401: "unauthorized",
  402: "payment_required",
  404: "not_found",
  405: "method_not_allowed",
  413: "bad_request",
  429: "rate_limited",
  500: "server_error",
};

/** A non-2xx response as the normative `{ error: { code, message } }` envelope (spec § Error responses). */
const fail = (status: number, message: string, code?: RepositoryErrorCode): RepoResponse =>
  json(status, { error: { code: code ?? ERR_CODE[status] ?? "server_error", message } });

function bearer(header: string | undefined): string | undefined {
  const m = /^Bearer\s+(.+)$/i.exec(header ?? "");
  return m ? m[1].trim() : undefined;
}

/**
 * Parse a single-range `Range: bytes=…` header into a {@link ByteRangeSpec}, or `null` to serve the
 * whole resource (`200`). We deliberately don't support multi-range (`bytes=0-1,4-5`) — a server MAY
 * ignore it and return the full body — so anything but one well-formed `start-end` / `start-` / `-suffix`
 * degrades to a normal full download rather than erroring.
 */
function parseRange(header: string | undefined): ByteRangeSpec | null {
  if (!header) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m) return null;
  const [, s, e] = m;
  if (s === "" && e === "") return null;
  if (s === "") return { suffix: Number(e) };
  if (e === "") return { start: Number(s) };
  const start = Number(s);
  const end = Number(e);
  if (end < start) return null; // an inverted range is malformed → serve the whole thing
  return { start, end };
}

export function createRepositoryHandler(opts: RepositoryHandlerOptions): RepositoryHandler {
  const { registry, marketplace, index } = opts;
  const authorizer = opts.authorizer ?? denyAllAuthorizer;
  const pageSize = opts.pageSize ?? 20;

  const priceStatus = async (id: string): Promise<"free" | "paid"> => {
    if (!marketplace) return "free";
    const listing = await marketplace.getListing(id);
    return listing && listing.status === "active" ? "paid" : "free";
  };

  const toSdkSummary = async (s: RegistrySummary): Promise<PackageSummary> => ({
    id: s.id,
    name: s.name,
    author: s.author,
    version: s.version,
    kind: s.kind,
    types: s.assetTypes,
    priceStatus: await priceStatus(s.id),
    maturity: s.maturity,
    targetApps: s.targetApps,
    downloads: s.downloads,
    rating: s.rating,
    ratingCount: s.ratingCount,
    updatedAt: s.updatedAt,
    byteSize: s.byteSize,
    mediaDomains: s.mediaDomains,
    preview: s.preview,
    nameLocalized: s.nameLocalized,
    descriptionLocalized: s.descriptionLocalized,
    // In a summary the newest installable version is exactly `version`; expose it as `latest` too so a
    // host doesn't have to re-derive precedence when the field is absent on other endpoints.
    latest: s.version,
  });

  async function search(req: RepoRequest): Promise<RepoResponse> {
    const q = (req.query.get("q") ?? "").trim();
    // App scoping: `?app=<id>` returns global packages plus those targeting that app. Absent = all.
    const app = req.query.get("app")?.trim() || undefined;
    let summaries = q ? (await registry.search(q, { app })).map((r) => r.package) : await registry.list({ app });

    const typesParam = req.query.get("types");
    if (typesParam) {
      const want = new Set(typesParam.split(",").map((t) => t.trim()).filter(Boolean));
      summaries = summaries.filter((s) => s.assetTypes.some((t) => want.has(t)));
    }
    // The 0.1 data model has no first-class tags; treat each `tag` as a required substring over the
    // package's searchable text so the parameter is honored rather than silently ignored.
    const tagsParam = req.query.get("tags");
    if (tagsParam) {
      const tags = tagsParam.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
      summaries = summaries.filter((s) => {
        const hay = [s.id, s.name, s.description ?? "", s.author ?? "", ...s.assetTypes].join(" ").toLowerCase();
        return tags.every((t) => hay.includes(t));
      });
    }
    // Media-domain filter: keep packages whose domains intersect what the host can run.
    const mdParam = req.query.get("mediaDomains");
    if (mdParam) {
      const want = new Set(mdParam.split(",").map((d) => d.trim()).filter(Boolean));
      summaries = summaries.filter((s) => s.mediaDomains.some((d) => want.has(d)));
    }
    // Capability filter: the host advertises the capabilities it can grant; keep only packages whose
    // required capabilities are a **subset** — i.e. packages the host could actually run.
    const capParam = req.query.get("capabilities");
    if (capParam) {
      const supported = new Set(capParam.split(",").map((c) => c.trim()).filter(Boolean));
      summaries = summaries.filter((s) => s.capabilities.every((c) => supported.has(c)));
    }
    // Ranking: honor an explicit `sort` (popular / recent / rating / name).
    summaries = applySort(summaries, req.query.get("sort"));

    const total = summaries.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, Number.parseInt(req.query.get("page") ?? "1", 10) || 1), pages);
    const start = (page - 1) * pageSize;
    const packages = await Promise.all(summaries.slice(start, start + pageSize).map(toSdkSummary));
    const body: PackageSearchResponse = { packages, total, page, pages };
    return json(200, body);
  }

  async function detail(id: string): Promise<RepoResponse> {
    const pkg = await registry.getPackage(id);
    if (!pkg) return fail(404, `unknown package: ${id}`);
    const latest = await registry.latest(id);
    return json(200, {
      id: pkg.summary.id,
      name: pkg.summary.name,
      author: pkg.summary.author,
      description: pkg.summary.description,
      nameLocalized: pkg.summary.nameLocalized,
      descriptionLocalized: pkg.summary.descriptionLocalized,
      version: pkg.summary.version,
      // The newest installable version — an explicit "update to this" pointer alongside `versions[]`.
      latest: latest?.version,
      // Mirror the summary's `kind` at the top level so a consumer needn't reach into `manifest` to tell
      // an `asset` / `code` / `app` / `mcp` / `pack` package apart (consistent with `GET /packages`).
      kind: pkg.summary.kind,
      types: pkg.summary.assetTypes,
      targetApps: pkg.summary.targetApps,
      priceStatus: await priceStatus(id),
      manifest: latest?.manifest,
      versions: pkg.versions.map((v) => ({
        version: v.version,
        publishedAt: v.publishedAt,
        size: v.size,
        digest: v.digest,
        yanked: Boolean(v.yanked),
      })),
    });
  }

  async function revocations(req: RepoRequest): Promise<RepoResponse> {
    const since = req.query.get("since")?.trim() || undefined;
    // `since` compares lexically, which is only meaningful for a real ISO-8601 instant — reject junk.
    if (since && Number.isNaN(Date.parse(since))) return fail(400, "invalid 'since' parameter: must be a valid ISO-8601 date string");
    const list = await registry.revocations(since);
    return json(200, { revocations: list });
  }

  async function updates(req: RepoRequest): Promise<RepoResponse> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(req.body ?? "");
    } catch {
      return fail(400, "invalid JSON body: expected an array of { id, version }");
    }
    if (!Array.isArray(parsed)) return fail(400, "body must be a JSON array of { id, version }");
    const refs: Array<{ id: string; version: string }> = [];
    for (const item of parsed) {
      const rec = item as Record<string, unknown> | null;
      if (!rec || typeof rec !== "object" || typeof rec.id !== "string" || typeof rec.version !== "string") {
        return fail(400, "each entry must be an object with string `id` and `version`");
      }
      refs.push({ id: rec.id, version: rec.version });
    }
    return json(200, { updates: await registry.updates(refs) });
  }

  async function download(id: string, version: string, req: RepoRequest): Promise<RepoResponse> {
    const resolved = await registry.getVersion(id, version);
    if (!resolved) return fail(404, `not found: ${id}@${version}`);

    if ((await priceStatus(id)) === "paid") {
      const token = bearer(req.headers.authorization);
      const decision = await authorizer.authorize({ token, packageId: id, version });
      if (!decision.authenticated) return fail(401, "authentication required to download a paid package");
      if (!decision.licensed) return fail(402, "payment required: no license for this package");
    }

    // A `Range` request (resumable/parallel download) is served as `206 Partial Content`. The paid gate
    // above runs first, so a ranged request for paid bytes still needs the entitlement. A ranged read
    // does NOT count a download (the host counts the transfer); a full `200` below does.
    const range = parseRange(req.headers.range);
    if (range) {
      try {
        const { bytes, start, end, totalSize } = await registry.serveRange(id, version, range);
        return {
          status: 206,
          headers: {
            "content-type": "application/x-azphalt",
            "content-length": String(bytes.length),
            "content-range": `bytes ${start}-${end}/${totalSize}`,
            "accept-ranges": "bytes",
          },
          body: bytes,
        };
      } catch (e) {
        if (e instanceof RangeNotSatisfiableError) {
          return {
            status: 416,
            headers: { ...JSON_HEADERS, "content-range": `bytes */${e.totalSize}`, "accept-ranges": "bytes" },
            body: JSON.stringify({ error: { code: "bad_request", message: "requested range not satisfiable" } }),
          };
        }
        throw e;
      }
    }

    const { bytes } = await registry.serve(id, version);
    return {
      status: 200,
      headers: { "content-type": "application/x-azphalt", "content-length": String(bytes.length), "accept-ranges": "bytes" },
      body: bytes,
    };
  }

  return async function handle(req: RepoRequest): Promise<RepoResponse> {
    // The one write-shaped endpoint: a batch update check over a POSTed installed-library body.
    if (req.path === "/updates") {
      return req.method === "POST" ? await updates(req) : fail(405, `method not allowed: ${req.method}`);
    }
    if (req.method !== "GET") return fail(405, `method not allowed: ${req.method}`);
    if (req.path === "/.well-known/azphalt-repository.json") return json(200, index);
    if (req.path === "/revocations") return await revocations(req);

    try {
      // `decodeURIComponent` throws a URIError on a malformed percent-escape — keep it inside the
      // try so a bad path answers 400, not an unhandled 500.
      const segs = req.path.split("/").filter(Boolean).map((s) => decodeURIComponent(s));
      if (segs[0] !== "packages") return fail(404, "not found");

      if (segs.length === 1) return await search(req);
      if (segs.length === 2) return await detail(segs[1]);
      if (segs.length === 5 && segs[2] === "versions" && segs[4] === "download") {
        return await download(segs[1], segs[3], req);
      }
      return fail(404, "not found");
    } catch (e) {
      if (e instanceof URIError) return fail(400, "invalid URI encoding in path");
      if (e instanceof RegistryError) return fail(400, e.message);
      return fail(500, `internal error: ${e instanceof Error ? e.message : String(e)}`);
    }
  };
}
