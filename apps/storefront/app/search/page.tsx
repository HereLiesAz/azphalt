/**
 * Browse & search. With a `?q=` it runs `registry.search` (ranked across id, name, description, author,
 * and asset types); without one it browses the whole catalog via `registry.list`. Either way a `sort`
 * (downloads / rating / updated / name) and a `kind` filter compose over the results, and each hit
 * renders as a package card with its consignment price when listed.
 */
import type { Kind } from "@azphalt/sdk";
import type { Money, PackageSummary } from "@azphalt/registry";
import { getCatalog } from "../../lib/catalog";
import { PackageCard } from "../../components/PackageCard";
import { FilterBar } from "../../components/FilterBar";

export const dynamic = "force-dynamic";

const SORTS = ["downloads", "rating", "updated", "name"] as const;
type Sort = (typeof SORTS)[number];
const KINDS = ["asset", "code", "app", "mixed"] as const;

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] ?? "" : v ?? "").trim();

interface SearchPageProps {
  // Next 15: searchParams is delivered as a Promise.
  searchParams: Promise<{ q?: string | string[]; sort?: string | string[]; kind?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const q = first(sp.q);
  const sort: Sort = (SORTS as readonly string[]).includes(first(sp.sort)) ? (first(sp.sort) as Sort) : "downloads";
  const kindRaw = first(sp.kind);
  const kind = (KINDS as readonly string[]).includes(kindRaw) ? (kindRaw as Kind) : undefined;

  const { registry, market } = await getCatalog();

  // Search is relevance-ranked; browse honors the sort. The kind filter applies to both.
  let results: PackageSummary[];
  if (q) {
    results = (await registry.search(q)).map((r) => r.package);
    if (kind) results = results.filter((p) => p.kind === kind);
  } else {
    results = await registry.list({ sort, kind });
  }

  const listings = await market.activeListings();
  const priceById = new Map<string, Money>(listings.map((l) => [l.packageId, l.price]));

  return (
    <>
      <h1 className="page-title">{q ? "Search" : "Browse the registry"}</h1>
      {q ? (
        <p className="lede">
          {results.length} result{results.length === 1 ? "" : "s"} for <strong>&ldquo;{q}&rdquo;</strong>.
        </p>
      ) : (
        <p className="lede">Every package in the catalog — filter by kind, sort by popularity, rating, or recency.</p>
      )}

      <FilterBar q={q || undefined} sort={sort} kind={kind ?? ""} showSort={!q} />

      {results.length === 0 ? (
        <p className="empty">
          {q
            ? "No packages matched. Try a broader term like “lut” or “brush”, or clear the kind filter."
            : "Nothing here for this filter."}
        </p>
      ) : (
        <div className="card-grid">
          {results.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} price={priceById.get(pkg.id)} />
          ))}
        </div>
      )}
    </>
  );
}
