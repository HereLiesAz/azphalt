/**
 * Search results page. Reads `?q=` and runs `registry.search`, which ranks across id, name,
 * description, author, and asset types. Each hit renders as a package card with its consignment
 * price when listed.
 */
import type { Money } from "@azphalt/registry";
import { getCatalog } from "../../lib/catalog";
import { PackageCard } from "../../components/PackageCard";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  // Next 15: searchParams is delivered as a Promise.
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();

  const { registry, market } = await getCatalog();
  const results = q ? await registry.search(q) : [];

  const listings = await market.activeListings();
  const priceById = new Map<string, Money>(listings.map((l) => [l.packageId, l.price]));

  return (
    <>
      <h1 className="page-title">Search</h1>
      {q ? (
        <p className="lede">
          {results.length} result{results.length === 1 ? "" : "s"} for{" "}
          <strong>&ldquo;{q}&rdquo;</strong>.
        </p>
      ) : (
        <p className="lede">Type a query above to search the catalog.</p>
      )}

      {q && results.length === 0 ? (
        <p className="empty">No packages matched. Try a broader term like &ldquo;lut&rdquo; or &ldquo;brush&rdquo;.</p>
      ) : (
        <div className="card-grid">
          {results.map(({ package: pkg }) => (
            <PackageCard key={pkg.id} pkg={pkg} price={priceById.get(pkg.id)} />
          ))}
        </div>
      )}
    </>
  );
}
