/**
 * The **baked catalog** — the `.azp` packages committed under `registry/packages/`, built from the
 * pinned sources in `registry/sources.json` by `scripts/build-catalog.ts`.
 *
 * ## Why the registry needs no database
 *
 * Publishing used to happen at runtime: `POST /api/publish` verified a package and wrote it into
 * whichever serverless instance answered that one request. That is the *only* thing durable storage
 * was ever needed for, and it is why an unbacked deployment silently dropped everything it accepted —
 * reads kept working off the re-seeded catalog, so the loss was invisible until the instance recycled.
 *
 * Baking the catalog into the deployment removes the requirement rather than satisfying it. Every
 * instance reads the same committed bytes at module load and reconstructs an identical catalog, so
 * there is no write that can be lost and nothing for instances to disagree about. Durability comes
 * from git — which is a stronger property than a database offers, because the store's contents are a
 * reviewable diff, reproducible from source, and cannot change without a commit.
 *
 * Runtime-mutable state is the deliberate exception: download tallies, user ratings, and abuse
 * reports still live in process memory and still reset on redeploy. Those are counters, not catalog,
 * and giving them a database is a separate decision from making the store's *contents* durable.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

/** One entry of the generated `registry/catalog.json`. */
export interface BakedPackage {
  id: string;
  version: string;
  name: string;
  kind: string;
  repo: string;
  ref: string;
  integrity: string;
  file: string;
  bytes: number;
}

interface BakedCatalog {
  signed: boolean;
  packages: BakedPackage[];
}

/**
 * Locate `registry/` across the three layouts this runs under, rather than assuming one.
 *
 * `next dev` and vitest run with the cwd at `apps/storefront`; a `next build` from the workspace root
 * runs with it at the repo root; and the `output: "standalone"` server chdirs to its own bundle root,
 * which mirrors the monorepo tree under `outputFileTracingRoot`. Probing beats hard-coding one and
 * having the catalog silently vanish in whichever layout was not the one tested.
 */
function findRegistryDir(): string | undefined {
  const candidates = [
    join(process.cwd(), "registry"),
    join(process.cwd(), "apps", "storefront", "registry"),
    resolve(process.cwd(), "..", "..", "apps", "storefront", "registry"),
  ];
  return candidates.find((dir) => existsSync(join(dir, "catalog.json")));
}

/** The generated catalog index plus the raw `.azp` bytes for each entry, or `undefined` if unbuilt. */
export interface Baked {
  signed: boolean;
  packages: { meta: BakedPackage; bytes: Uint8Array }[];
}

let cached: Baked | undefined | null = null;

/**
 * The baked catalog, read once per process.
 *
 * Returns `undefined` when the catalog has not been built — a fresh clone that has not run
 * `build-catalog` yet, which is the normal state for a unit test. Callers fall back to whatever
 * seeding they would otherwise do rather than failing, so an unbuilt tree is inconvenient, not broken.
 *
 * A `.azp` listed in `catalog.json` but missing from disk *is* an error: it means the deployment is
 * serving a catalog it cannot back with bytes, and reporting that as "no catalog" would hide it.
 */
export function loadBaked(): Baked | undefined {
  if (cached !== null) return cached;

  const dir = findRegistryDir();
  if (!dir) {
    cached = undefined;
    return undefined;
  }

  const index = JSON.parse(readFileSync(join(dir, "catalog.json"), "utf8")) as BakedCatalog;
  const packagesDir = join(dir, "packages");
  const packages = index.packages.map((meta) => {
    const path = join(packagesDir, meta.file);
    if (!existsSync(path)) {
      throw new Error(
        `baked catalog lists ${meta.id}@${meta.version} but ${meta.file} is missing from registry/packages/ — ` +
          `re-run: pnpm --filter @azphalt/storefront build-catalog`,
      );
    }
    return { meta, bytes: new Uint8Array(readFileSync(path)) };
  });

  // A stray `.azp` that no catalog entry claims would be served by nothing but still sits in the
  // deployment. Surface it rather than letting the two drift apart unnoticed.
  const claimed = new Set(index.packages.map((p) => p.file));
  const stray = existsSync(packagesDir)
    ? readdirSync(packagesDir).filter((f) => f.endsWith(".azp") && !claimed.has(f))
    : [];
  if (stray.length) {
    console.warn(`baked catalog: ${stray.length} unlisted .azp file(s) in registry/packages/: ${stray.join(", ")}`);
  }

  cached = { signed: index.signed, packages };
  return cached;
}
