import { writeAzp, type AzpInput } from "@azphalt/azp";
import { type Listing, type PackageVersion, type Report, type RevocationEntry, type RegistryStore, InMemoryStore } from "@azphalt/registry";

// Known packages since NPM search takes hours to index new packages.
// In a full production proxy, this would hit /v1/search dynamically.
const KNOWN_PACKAGES = [
  "@azphalt/3d-word-flip"
];

const NPM_REGISTRY = "https://registry.npmjs.org";

// SSRF guard: `id` / `version` reach these methods from request params, and they are interpolated into
// the npm registry URL. Allow only real npm-package-name / semver-ish shapes — no protocol, host,
// `..`, slashes beyond a single scope separator, or control chars — so an attacker can't retarget the
// fetch. Linear regexes (single quantifiers), no ReDoS. A value that fails the guard is treated as
// "no such package" rather than fetched.
const SAFE_PKG_ID = /^@?[a-z0-9][a-z0-9._-]*(\/[a-z0-9][a-z0-9._-]*)?$/i;
const SAFE_VERSION = /^[a-z0-9][a-z0-9.+-]*$/i;

import tar from "tar-stream";
import zlib from "zlib";
import { promisify } from "util";

/**
 * Registry proxy backing store that reads dynamically from public NPM.
 */
export class NpmStore implements RegistryStore {
  // Local caching to avoid hitting NPM on every request
  private versionCache = new Map<string, PackageVersion>();
  private listings = new Map<string, Listing>();
  private versionsCache = new Map<string, PackageVersion[]>();
  private downloads = new Map<string, number>();
  
  // Local overlay for mock packages during tests
  private local = new InMemoryStore();

  // Ids served purely from the local overlay (seeded example packages). For these, the npm proxy is
  // bypassed entirely — including `registry.publish`'s pre-publish duplicate check, which would
  // otherwise fire one npm lookup per seed for ids that were never on npm (seeding N packages ⇒ N
  // network round-trips). Reserving up front, before the first publish, keeps seeding offline and fast.
  private readonly localIds = new Set<string>();

  /** Mark an id as local-only, so every read short-circuits the npm proxy. */
  reserveLocal(id: string): void {
    this.localIds.add(id);
  }

  async allPackageIds(): Promise<string[]> {
    const remote = KNOWN_PACKAGES;
    const localIds = await this.local.allPackageIds();
    return Array.from(new Set([...remote, ...localIds]));
  }

  async getVersions(id: string): Promise<PackageVersion[]> {
    const localVersions = await this.local.getVersions(id);
    if (localVersions.length > 0) return localVersions;

    // A reserved local id is never on npm — don't probe for it.
    if (this.localIds.has(id)) return [];

    if (this.versionsCache.has(id)) {
      return this.versionsCache.get(id)!;
    }

    // SSRF guard — never fetch an id that isn't a well-formed npm package name.
    if (!SAFE_PKG_ID.test(id)) return [];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    
    try {
      const res = await fetch(`${NPM_REGISTRY}/${id}`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error("NPM Error: " + res.status);
      const data = await res.json();
      
      const out: PackageVersion[] = [];
      const versions = data.versions || {};

      for (const [ver, raw] of Object.entries(versions)) {
        const npm = raw as any;
        // An npm `package.json` is NOT an azphalt manifest — it has no `id`/`kind`/`compat`. Normalize
        // it into a minimal, valid azphalt manifest so Registry.getSummary derives a real `id` (it
        // reads `manifest.id`); without this the summary's id is undefined and the storefront PWA's
        // strict `models.PackageSummary` deserializer throws "Field 'id' is required".
        const author = typeof npm.author === "string" ? npm.author : npm.author?.name;
        const pv: PackageVersion = {
          id: data.name,
          version: ver,
          manifest: {
            azphalt: "0.1",
            id: data.name,
            version: ver,
            name: npm.name || data.name,
            kind: "code",
            license: typeof npm.license === "string" ? npm.license : "MIT",
            compat: ">=0.1",
            author,
            description: npm.description || "",
          } as any,
          size: npm.dist?.unpackedSize || 0,
          digest: npm.dist?.shasum || "",
          publishedAt: data.time?.[ver] || new Date().toISOString()
        };
        out.push(pv);
        this.versionCache.set(`${id}@${ver}`, pv);
      }
      this.versionsCache.set(id, out);
      return out;
    } catch (e) {
      clearTimeout(timeout);
      // Do NOT fabricate a package. The previous fallback returned a made-up version with a fake
      // "mock-sha" digest, which then flowed into the UI as if it were real registry data — a trust
      // hazard. An unreachable/failed npm lookup means "no such package here": return empty, and don't
      // cache it, so a transient failure can recover on the next request.
      console.warn(`Failed to fetch versions for ${id} from npm (${(e as Error).message}); treating as unknown.`);
      return [];
    }
  }

  async getVersion(id: string, version: string): Promise<PackageVersion | undefined> {
    // Local overlay first (as getVersions does): a locally-published package must resolve without a
    // network hop. This is also what keeps `registry.publish`'s duplicate-check off the network —
    // otherwise seeding N local packages fires N npm lookups for ids that aren't on npm.
    const localVersion = await this.local.getVersion(id, version);
    if (localVersion) return localVersion;

    // A reserved local id is never on npm — don't probe for it (this is the path publish's
    // duplicate-check takes for a not-yet-stored seed).
    if (this.localIds.has(id)) return undefined;

    const cached = this.versionCache.get(`${id}@${version}`);
    if (cached) return cached;

    // SSRF guard — reject anything that isn't a well-formed npm id + version before fetching.
    if (!SAFE_PKG_ID.test(id) || !SAFE_VERSION.test(version)) return undefined;

    try {
      const res = await fetch(`${NPM_REGISTRY}/${id}/${version}`);
      if (!res.ok) return undefined;
      const data = await res.json();
      
      const pv: PackageVersion = {
        id: data.name,
        version: data.version,
        manifest: data,
        size: data.dist?.unpackedSize || 0,
        digest: data.dist?.shasum || "",
        publishedAt: new Date().toISOString()
      };
      this.versionCache.set(`${id}@${version}`, pv);
      return pv;
    } catch (e) {
      return undefined;
    }
  }

  async getBytes(id: string, version: string): Promise<Uint8Array | undefined> {
    const localBytes = await this.local.getBytes(id, version);
    if (localBytes) return localBytes;

    // A reserved local id is served only from the overlay — never fetch a tarball for it.
    if (this.localIds.has(id)) return undefined;

    // SSRF guard — the id/version are interpolated into the tarball URL below.
    if (!SAFE_PKG_ID.test(id) || !SAFE_VERSION.test(version)) return undefined;

    const meta = await this.getVersion(id, version);
    if (!meta) return undefined;

    // Fetch the tarball
    const nameWithoutScope = id.includes('/') ? id.split('/')[1] : id;
    const tarballUrl = `${NPM_REGISTRY}/${id}/-/${nameWithoutScope}-${version}.tgz`;
    
    try {
      const res = await fetch(tarballUrl);
      if (!res.ok) return undefined;
      const arrayBuffer = await res.arrayBuffer();
      const tgzBuffer = Buffer.from(arrayBuffer);

      // Decompress and parse tar
      const unzipped = await promisify(zlib.gunzip)(tgzBuffer);
      
      return new Promise((resolve) => {
        const extract = tar.extract();
        const payload: Record<string, Uint8Array> = {};
        let licenseText = "MIT License\n";

        extract.on('entry', (header, stream, next) => {
          const chunks: Buffer[] = [];
          stream.on('data', (c) => chunks.push(c));
          stream.on('end', () => {
            const fileData = Buffer.concat(chunks);
            // NPM puts everything in a 'package/' root directory
            const path = header.name.replace(/^package\//, '');
            
            if (path.toUpperCase() === 'LICENSE' || path.toUpperCase() === 'LICENSE.MD') {
              licenseText = fileData.toString('utf8');
            } else if (path !== 'package.json') {
              payload[path] = new Uint8Array(fileData);
            }
            next();
          });
          stream.resume();
        });

        extract.on('finish', () => {
          // Convert NPM files to .azp zip
          const azpParams: AzpInput = {
            manifest: meta.manifest,
            payload,
            license: licenseText
          };
          
          try {
            const { azp } = writeAzp(azpParams);
            resolve(azp);
          } catch (e) {
            console.error('Failed to build AZP:', e);
            resolve(undefined);
          }
        });

        extract.end(unzipped);
      });
    } catch (e) {
      console.error(`Failed to fetch/convert tarball for ${id}@${version}:`, e);
      return undefined;
    }
  }

  async putVersion(pkg: PackageVersion, bytes: Uint8Array): Promise<void> {
    // A locally-published package is local-only henceforth — reads must never fall through to npm.
    this.localIds.add(pkg.id);
    await this.local.putVersion(pkg, bytes);
  }

  async incrementDownloads(id: string, version: string, by = 1): Promise<void> {
    const localVersions = await this.local.getVersions(id);
    if (localVersions.length > 0) {
      await this.local.incrementDownloads(id, version, by);
    }
    const key = `${id}@${version}`;
    this.downloads.set(key, (this.downloads.get(key) || 0) + by);
  }

  async getDownloads(id: string): Promise<number> {
    const localVersions = await this.local.getVersions(id);
    if (localVersions.length > 0) return this.local.getDownloads(id);
    let total = 0;
    for (const [k, n] of this.downloads) {
      if (k.startsWith(`${id}@`)) total += n;
    }
    return total;
  }

  async getRating(id: string): Promise<{ rating?: number; ratingCount: number }> {
    const localVersions = await this.local.getVersions(id);
    if (localVersions.length > 0) return this.local.getRating(id);
    return { ratingCount: 0 };
  }

  async addRating(id: string, stars: number): Promise<void> {
    const localVersions = await this.local.getVersions(id);
    if (localVersions.length > 0) await this.local.addRating(id, stars);
  }

  async putRevocation(): Promise<void> {}
  async getRevocations(): Promise<RevocationEntry[]> { return []; }

  // Reports live in the local overlay (an InMemoryStore), which implements them.
  async putReport(report: Report): Promise<void> { await this.local.putReport!(report); }
  async getReports(packageId: string, version?: string): Promise<Report[]> {
    return this.local.getReports!(packageId, version);
  }

  async putListing(listing: Listing): Promise<void> {
    this.listings.set(listing.packageId, listing);
  }

  async getListing(packageId: string): Promise<Listing | undefined> {
    return this.listings.get(packageId);
  }

  async allListings(): Promise<Listing[]> {
    return [...this.listings.values()];
  }
}
