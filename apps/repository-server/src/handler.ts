/**
 * The framework-agnostic core of the reference Repository API server. It maps a parsed request to a
 * response purely over {@link Registry} + {@link Marketplace} data — no Node `http` types leak in, so
 * it is trivially testable and can be mounted on any transport (the bundled Node adapter is in
 * `server.ts`).
 *
 * It implements every endpoint in `spec/repository-api.md`:
 * - `GET /.well-known/azphalt-repository.json` — the repository index.
 * - `GET /packages` — search/browse (`q`, `types`, `tags`, `page`).
 * - `GET /packages/{id}` — full metadata + version history + the latest manifest.
 * - `GET /packages/{id}/versions/{version}/download` — the binary `.azp`, gated `401`/`402` when paid.
 *
 * The free/paid split comes from the {@link Marketplace} overlay: a package with an *active* listing
 * is `paid` and its download runs through the {@link DownloadAuthorizer}; everything else is `free`
 * and served unconditionally. That is the same lane separation the rest of the standard keeps — money
 * lives only on listings, never in the open registry.
 */
import { RegistryError, type Marketplace, type Registry } from "@azphalt/registry";
import type { PackageSearchResponse, PackageSummary, RepositoryIndex } from "@azphalt/sdk";
import { denyAllAuthorizer, type DownloadAuthorizer } from "./authorize.js";

/** A transport-neutral request the {@link RepositoryHandler} understands. */
export interface RepoRequest {
  method: string;
  /** Path only, no query string (e.g. `/packages/com.x.y`). */
  path: string;
  /** Parsed query string. */
  query: URLSearchParams;
  /** Header map with lower-cased names. */
  headers: Record<string, string | undefined>;
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
const fail = (status: number, message: string): RepoResponse => json(status, { error: message });

function bearer(header: string | undefined): string | undefined {
  const m = /^Bearer\s+(.+)$/i.exec(header ?? "");
  return m ? m[1].trim() : undefined;
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

  const toSdkSummary = async (s: { id: string; name: string; author?: string; version: string; assetTypes: string[] }): Promise<PackageSummary> => ({
    id: s.id,
    name: s.name,
    author: s.author,
    version: s.version,
    types: s.assetTypes,
    priceStatus: await priceStatus(s.id),
  });

  async function search(req: RepoRequest): Promise<RepoResponse> {
    const q = (req.query.get("q") ?? "").trim();
    let summaries = q ? (await registry.search(q)).map((r) => r.package) : await registry.list({});

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
      version: pkg.summary.version,
      types: pkg.summary.assetTypes,
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

  async function download(id: string, version: string, req: RepoRequest): Promise<RepoResponse> {
    const resolved = await registry.getVersion(id, version);
    if (!resolved) return fail(404, `not found: ${id}@${version}`);

    if ((await priceStatus(id)) === "paid") {
      const token = bearer(req.headers.authorization);
      const decision = await authorizer.authorize({ token, packageId: id, version });
      if (!decision.authenticated) return fail(401, "authentication required to download a paid package");
      if (!decision.licensed) return fail(402, "payment required: no license for this package");
    }

    const { bytes } = await registry.serve(id, version);
    return {
      status: 200,
      headers: { "content-type": "application/x-azphalt", "content-length": String(bytes.length) },
      body: bytes,
    };
  }

  return async function handle(req: RepoRequest): Promise<RepoResponse> {
    if (req.method !== "GET") return fail(405, `method not allowed: ${req.method}`);
    if (req.path === "/.well-known/azphalt-repository.json") return json(200, index);

    const segs = req.path.split("/").filter(Boolean).map((s) => decodeURIComponent(s));
    if (segs[0] !== "packages") return fail(404, "not found");

    try {
      if (segs.length === 1) return await search(req);
      if (segs.length === 2) return await detail(segs[1]);
      if (segs.length === 5 && segs[2] === "versions" && segs[4] === "download") {
        return await download(segs[1], segs[3], req);
      }
      return fail(404, "not found");
    } catch (e) {
      if (e instanceof RegistryError) return fail(400, e.message);
      return fail(500, `internal error: ${e instanceof Error ? e.message : String(e)}`);
    }
  };
}
