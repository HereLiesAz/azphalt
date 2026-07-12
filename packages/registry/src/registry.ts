/**
 * The registry: the free, open distribution lane. It verifies and indexes published `.azp` packages,
 * resolves versions, serves bytes, and answers browse/search. No money model lives here — that is the
 * {@link Marketplace} overlay (see `consignment.ts`), kept deliberately separate so the open lane
 * stays neutral (see `docs/ARCHITECTURE.md § The marketplace — consignment model`).
 */
import { digest, readAzp, verifyAzp } from "@azphalt/azp";
import type { AssetType, Capability, Manifest } from "@azphalt/sdk";
import { InMemoryStore, type RegistryStore } from "./store.js";
import type {
  ListQuery,
  PackageSummary,
  PackageVersion,
  PublishResult,
  RegistryPackage,
  SearchResult,
} from "./types.js";

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
const SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/;

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
    const nx = /^\d+$/.test(x);
    const ny = /^\d+$/.test(y);
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

    return {
      id: m.id,
      name: m.name,
      version: latest.version,
      kind: m.kind,
      license: m.license,
      description: m.description,
      author: m.author,
      homepage: m.homepage,
      assetTypes,
      capabilities,
      contributes,
      publishedAt: times[0],
      updatedAt: times[times.length - 1],
      downloads: await this.store.getDownloads(id),
    };
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

  /** Hide a version from `latest`/search while keeping it resolvable by exact version. */
  async yank(id: string, version: string, yanked = true): Promise<void> {
    const v = await this.store.getVersion(id, version);
    if (!v) throw new RegistryError(`not found: ${id}@${version}`);
    const bytes = await this.store.getBytes(id, version);
    await this.store.putVersion({ ...v, yanked }, bytes ?? new Uint8Array());
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
    if (query.author) out = out.filter((s) => s.author === query.author);

    const sort = query.sort ?? "downloads";
    out.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "updated") return a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0;
      return b.downloads - a.downloads;
    });

    const offset = query.offset ?? 0;
    return query.limit != null ? out.slice(offset, offset + query.limit) : out.slice(offset);
  }

  /**
   * Full-text-ish search across id, name, description, author, and asset types. Ranks by weighted
   * field matches; ties break on downloads. Returns non-matching packages omitted, best first.
   */
  async search(query: string, opts: { limit?: number } = {}): Promise<SearchResult[]> {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    const summaries = await this.list({ limit: undefined });

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
