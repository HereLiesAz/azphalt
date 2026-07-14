/**
 * The registry: the free, open distribution lane. It verifies and indexes published `.azp` packages,
 * resolves versions, serves bytes, and answers browse/search. No money model lives here — that is the
 * {@link Marketplace} overlay (see `consignment.ts`), kept deliberately separate so the open lane
 * stays neutral (see `docs/ARCHITECTURE.md § The marketplace — consignment model`).
 */
import { digest, readAzp, verifyAzp } from "@azphalt/azp";
import type { AssetType, Capability, Manifest, MediaDomain } from "@azphalt/azdk";
import { InMemoryStore, type RegistryStore } from "./store.js";
import type {
  ListQuery,
  PackageSummary,
  PackageVersion,
  PublishResult,
  RegistryPackage,
  RevocationEntry,
  SearchResult,
} from "./types.js";

/**
 * Which media domain(s) each asset type belongs to. A type can span domains — a LUT and a shader
 * apply to both stills and video frames — so a video host still surfaces them.
 */
const ASSET_DOMAINS: Record<AssetType, MediaDomain[]> = {
  brush: ["image"], lut: ["image", "video"], pattern: ["image"], stamp: ["image"],
  shader: ["image", "video"], transition: ["video"], mesh: ["3d"], material: ["3d"],
  hdri: ["3d"], motion: ["video"], palette: ["image"], image: ["image"], video: ["video"],
  font: ["font"], audio: ["audio"], vector: ["image"],
  template: ["image", "video"], overlay: ["image", "video"],
  tflite: ["model"], litert: ["model"], onnx: ["model"], "sherpa-bundle": ["model"],
};

/**
 * Compute the coarse media domains a package touches, from its asset types + capabilities +
 * contributions. Raster editor capabilities imply `image`; `time`/`transitions` imply `video`;
 * `audio` implies `audio`. Used for host-capability discovery filtering.
 */
export function mediaDomainsForManifest(m: Manifest): MediaDomain[] {
  const set = new Set<MediaDomain>();
  for (const a of m.assets ?? []) for (const d of ASSET_DOMAINS[a.type] ?? []) set.add(d);
  for (const c of m.capabilities ?? []) {
    if (c === "canvas" || c === "layers" || c === "bitmap" || c === "selection" || c === "color") set.add("image");
    else if (c === "time") set.add("video");
    else if (c === "audio") set.add("audio");
  }
  if ((m.contributes?.transitions?.length ?? 0) > 0) set.add("video");
  return [...set];
}

/** Thrown when a publish is rejected (bad container, bad manifest, or a version conflict). */
export class RegistryError extends Error {
  constructor(
    message: string,
    /** Per-file verification errors, when the failure came from {@link verifyAzp}. */
    readonly errors: string[] = [],
  ) {
    super(message);
    this.name = "RegistryError";
  }
}

const ID_RE = /^[a-z0-9]+(\.[a-z0-9-]+)+$/i; // reverse-DNS, at least two dot-separated labels
// Official SemVer 2.0.0 grammar (https://semver.org): no leading zeroes in numeric identifiers, no
// empty prerelease/build identifiers. Capture groups: 1=major, 2=minor, 3=patch, 4=prerelease, 5=build.
const SEMVER_RE =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

/**
 * Compare two semvers. Returns >0 if [a] is newer, <0 if older, 0 if equal precedence. A release
 * outranks a prerelease of the same `x.y.z` (`1.0.0` > `1.0.0-rc.1`); prereleases compare
 * lexically by dot-separated identifiers. Build metadata is ignored. Non-semver strings sort oldest.
 */
export function compareSemver(a: string, b: string): number {
  const pa = SEMVER_RE.exec(a);
  const pb = SEMVER_RE.exec(b);
  if (!pa && !pb) return a === b ? 0 : a < b ? -1 : 1;
  if (!pa) return -1;
  if (!pb) return 1;
  for (let i = 1; i <= 3; i++) {
    const d = Number(pa[i]) - Number(pb[i]);
    if (d !== 0) return d < 0 ? -1 : 1;
  }
  const preA = pa[4];
  const preB = pb[4];
  if (!preA && !preB) return 0;
  if (!preA) return 1; // release > prerelease
  if (!preB) return -1;
  const idsA = preA.split(".");
  const idsB = preB.split(".");
  for (let i = 0; i < Math.max(idsA.length, idsB.length); i++) {
    const x = idsA[i];
    const y = idsB[i];
    if (x === undefined) return -1; // shorter prerelease is lower
    if (y === undefined) return 1;
    if (x === y) continue;
    // SemVer 2.0.0: numeric identifiers have no leading zeroes; a leading-zero token like "01" is
    // therefore alphanumeric (and outranks numeric identifiers).
    const nx = /^(0|[1-9]\d*)$/.test(x);
    const ny = /^(0|[1-9]\d*)$/.test(y);
    if (nx && ny) return Number(x) - Number(y) < 0 ? -1 : 1;
    if (nx) return -1; // numeric identifiers are lower than alphanumeric
    if (ny) return 1;
    return x < y ? -1 : 1;
  }
  return 0;
}

export class Registry {
  constructor(private readonly store: RegistryStore = new InMemoryStore()) {}

  /**
   * Verify and index a `.azp`. Rejects a tampered/invalid container, a malformed id/version, or a
   * re-publish of an existing version (versions are immutable). Returns the updated package summary
   * and the newly stored version.
   */
  async publish(azpBytes: Uint8Array): Promise<PublishResult> {
    const verified = verifyAzp(azpBytes);
    if (!verified.ok) throw new RegistryError("invalid .azp package", verified.errors);

    const manifest: Manifest = readAzp(azpBytes).manifest;
    if (!manifest.id || !ID_RE.test(manifest.id)) {
      throw new RegistryError(`invalid package id: ${JSON.stringify(manifest.id)}`);
    }
    if (!manifest.version || !SEMVER_RE.test(manifest.version)) {
      throw new RegistryError(`invalid version (want semver): ${JSON.stringify(manifest.version)}`);
    }

    const existing = await this.store.getVersion(manifest.id, manifest.version);
    if (existing) {
      throw new RegistryError(`version already published: ${manifest.id}@${manifest.version}`);
    }

    const version: PackageVersion = {
      id: manifest.id,
      version: manifest.version,
      manifest,
      size: azpBytes.length,
      digest: digest(azpBytes),
      publishedAt: new Date().toISOString(),
    };
    await this.store.putVersion(version, azpBytes);

    const summary = await this.getSummary(manifest.id);
    if (!summary) throw new RegistryError("internal: summary missing after publish");
    return { package: summary, version };
  }

  /** Every stored version of [id], newest-first. */
  async versions(id: string): Promise<PackageVersion[]> {
    const all = await this.store.getVersions(id);
    return all.sort((a, b) => compareSemver(b.version, a.version));
  }

  /** An exact version, or `undefined`. */
  async getVersion(id: string, version: string): Promise<PackageVersion | undefined> {
    return this.store.getVersion(id, version);
  }

  /** The newest non-yanked version (falling back to the newest yanked one if all are yanked). */
  async latest(id: string): Promise<PackageVersion | undefined> {
    const vs = await this.versions(id);
    if (vs.length === 0) return undefined;
    return vs.find((v) => !v.yanked) ?? vs[0];
  }

  /** The aggregate summary for [id], or `undefined` if unknown. */
  async getSummary(id: string): Promise<PackageSummary | undefined> {
    const vs = await this.versions(id);
    if (vs.length === 0) return undefined;
    const latest = vs.find((v) => !v.yanked) ?? vs[0];
    const m = latest.manifest;

    const assetTypes = [...new Set((m.assets ?? []).map((a) => a.type))] as AssetType[];
    const capabilities = [...new Set(m.capabilities ?? [])] as Capability[];
    const contributes = {
      filters: m.contributes?.filters?.length ?? 0,
      tools: m.contributes?.tools?.length ?? 0,
      commands: m.contributes?.commands?.length ?? 0,
    };
    const times = vs.map((v) => v.publishedAt).sort();
    const { rating, ratingCount } = await this.store.getRating(id);

    return {
      id: m.id,
      name: m.name,
      version: latest.version,
      kind: m.kind,
      license: m.license,
      description: m.description,
      nameLocalized: m.nameLocalized,
      descriptionLocalized: m.descriptionLocalized,
      author: m.author,
      homepage: m.homepage,
      assetTypes,
      capabilities,
      targetApps: [...new Set(m.targetApps ?? [])],
      contributes,
      publishedAt: times[0],
      updatedAt: times[times.length - 1],
      downloads: await this.store.getDownloads(id),
      byteSize: latest.size,
      mediaDomains: mediaDomainsForManifest(m),
      preview: m.preview,
      rating,
      ratingCount,
    };
  }

  /**
   * Batch update check: for each installed `{ id, version }`, resolve the newest installable
   * (non-yanked) version and return only the ids that have something **strictly newer**. Lets a host
   * refresh a whole installed library in one round-trip instead of one `GET /packages/{id}` each.
   * Unknown ids (and ids already current or ahead) are simply omitted.
   */
  async updates(installed: Array<{ id: string; version: string }>): Promise<Array<{ id: string; latest: string }>> {
    // Resolve every package's latest in parallel — a DB-backed store makes each `latest` a round-trip,
    // so a sequential loop would be O(n) latency for a large library. Order is preserved.
    const resolved = await Promise.all(
      installed.map(async ({ id, version }) => {
        const newest = await this.latest(id);
        return newest && compareSemver(newest.version, version) > 0 ? { id, latest: newest.version } : null;
      }),
    );
    return resolved.filter((x): x is { id: string; latest: string } => x !== null);
  }

  /** The full package (summary + newest-first versions), or `undefined`. */
  async getPackage(id: string): Promise<RegistryPackage | undefined> {
    const summary = await this.getSummary(id);
    if (!summary) return undefined;
    return { summary, versions: await this.versions(id) };
  }

  /**
   * Serve the `.azp` bytes for [id] at [version] (default: {@link latest}), counting a download.
   * Throws {@link RegistryError} when the package or version is unknown.
   */
  async serve(id: string, version?: string): Promise<{ version: PackageVersion; bytes: Uint8Array }> {
    const resolved = version ? await this.getVersion(id, version) : await this.latest(id);
    if (!resolved) {
      throw new RegistryError(`not found: ${id}${version ? `@${version}` : ""}`);
    }
    const bytes = await this.store.getBytes(resolved.id, resolved.version);
    if (!bytes) throw new RegistryError(`bytes missing: ${resolved.id}@${resolved.version}`);
    await this.store.incrementDownloads(resolved.id, resolved.version);
    return { version: resolved, bytes };
  }

  /**
   * Hide a version from `latest`/search while keeping it resolvable by exact version. Yanking (the
   * default) appends a {@link RevocationEntry} to the host-pollable feed with an optional [reason]
   * **only on the `false → true` transition**, so re-yanking an already-yanked version doesn't bloat
   * the feed; un-yanking (`yanked = false`) clears the flag without touching the feed.
   */
  async yank(id: string, version: string, yanked = true, reason?: string): Promise<void> {
    const v = await this.store.getVersion(id, version);
    if (!v) throw new RegistryError(`not found: ${id}@${version}`);
    const bytes = await this.store.getBytes(id, version);
    // Never re-put with empty bytes: on a storage inconsistency that would silently overwrite (and
    // corrupt) the stored payload. Fail loudly instead.
    if (!bytes) throw new RegistryError(`bytes missing: ${id}@${version}`);
    const wasYanked = Boolean(v.yanked);
    await this.store.putVersion({ ...v, yanked }, bytes);
    if (yanked && !wasYanked) {
      await this.store.putRevocation({ id, version, reason, revokedAt: new Date().toISOString() });
    }
  }

  /**
   * The host-pollable revocation feed: versions pulled post-publish, newest-first. A host that has
   * already installed a package polls this (optionally `since` its last check) to learn a version it
   * trusted was later revoked, and can warn or disable it.
   */
  async revocations(since?: string): Promise<RevocationEntry[]> {
    return this.store.getRevocations(since);
  }

  /** Browse the catalog with optional filters and sorting. One summary per package. */
  async list(query: ListQuery = {}): Promise<PackageSummary[]> {
    const ids = await this.store.allPackageIds();
    let out: PackageSummary[] = [];
    for (const id of ids) {
      const s = await this.getSummary(id);
      if (s) out.push(s);
    }
    if (query.kind) out = out.filter((s) => s.kind === query.kind);
    if (query.assetType) out = out.filter((s) => s.assetTypes.includes(query.assetType!));
    if (query.capability) out = out.filter((s) => s.capabilities.includes(query.capability!));
    // Media-domain filter: keep a package whose domains intersect the host's runnable domains.
    if (query.mediaDomains && query.mediaDomains.length > 0) {
      const want = new Set(query.mediaDomains);
      out = out.filter((s) => s.mediaDomains.some((d) => want.has(d)));
    }
    if (query.author) out = out.filter((s) => s.author === query.author);
    // App scoping: a global package (no targetApps) shows everywhere; an app-scoped one shows only to
    // an app it targets. With no `app` set, everything is returned (no filter).
    if (query.app) out = out.filter((s) => s.targetApps.length === 0 || s.targetApps.includes(query.app!));

    const sort = query.sort ?? "downloads";
    out.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "updated") return a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0;
      // Rating: higher first; unrated (rating undefined) sorts last, ties break on downloads.
      if (sort === "rating") {
        const ra = a.rating ?? -1;
        const rb = b.rating ?? -1;
        if (ra !== rb) return rb - ra;
        return b.downloads - a.downloads;
      }
      return b.downloads - a.downloads;
    });

    const offset = query.offset ?? 0;
    return query.limit != null ? out.slice(offset, offset + query.limit) : out.slice(offset);
  }

  /**
   * Full-text-ish search across id, name, description, author, and asset types. Ranks by weighted
   * field matches; ties break on downloads. Returns non-matching packages omitted, best first.
   */
  async search(query: string, opts: { limit?: number; app?: string } = {}): Promise<SearchResult[]> {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    const summaries = await this.list({ limit: undefined, app: opts.app });

    const results: SearchResult[] = [];
    for (const pkg of summaries) {
      const haystacks: Array<[string, number]> = [
        [pkg.name.toLowerCase(), 5],
        [pkg.id.toLowerCase(), 4],
        [(pkg.description ?? "").toLowerCase(), 2],
        [(pkg.author ?? "").toLowerCase(), 2],
        [pkg.assetTypes.join(" "), 3],
      ];
      let score = 0;
      for (const term of terms) {
        for (const [text, weight] of haystacks) {
          if (text.includes(term)) score += weight;
        }
      }
      if (score > 0) results.push({ package: pkg, score });
    }
    results.sort((a, b) => b.score - a.score || b.package.downloads - a.package.downloads);
    return opts.limit != null ? results.slice(0, opts.limit) : results;
  }
}
