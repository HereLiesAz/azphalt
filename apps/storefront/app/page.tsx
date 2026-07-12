/**
 * Home page: the two-lane explainer plus the popular catalog. Popularity is `registry.list` sorted
 * by downloads (the default sort); each card links to its detail page and shows a price when the
 * package is consigned on the paid lane.
 *
 * `force-dynamic` because the catalog lives in the in-memory registry (seeded at module load), not
 * in static data — we want it resolved per request rather than baked at build time.
 */
import type { Money } from "@azphalt/registry";
import { getCatalog } from "../lib/catalog";
import { PackageCard } from "../components/PackageCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { registry, market } = await getCatalog();

  const popular = await registry.list({ sort: "downloads" });
  const listings = await market.activeListings();
  const priceById = new Map<string, Money>(listings.map((l) => [l.packageId, l.price]));

  const forSale = popular.filter((p) => priceById.has(p.id));
  const free = popular.filter((p) => !priceById.has(p.id));

  return (
    <>
      <h1 className="page-title">Portable creative extensions</h1>
      <p className="lede">
        One extension — a brush, a filter, a LUT pack — that runs in any app adopting the open{" "}
        <strong>azphalt</strong> standard. Browse the free registry, or buy a consigned pack from a
        creator who&rsquo;d rather we handle the money.
      </p>

      <section className="block">
        <div className="lanes">
          <div className="lane">
            <span className="tag free">Registry lane</span>
            <h3>Free &amp; open distribution</h3>
            <p>
              The open standard&rsquo;s distribution layer — no payment rails, no fee, self-hostable.
              A creator who just wants reach publishes here for nothing. This is the lane that keeps
              the standard adoptable.
            </p>
          </div>
          <div className="lane">
            <span className="tag paid">Consignment lane</span>
            <h3>Sell without running the store</h3>
            <p>
              The only place a fee exists. A creator consigns a package and we handle checkout and the
              payout split; the money model never leaks into the open registry. Every sale&rsquo;s
              breakdown is shown honestly on the package page.
            </p>
          </div>
        </div>
      </section>

      {forSale.length > 0 ? (
        <section className="block">
          <div className="section-head">
            <h2>For sale on consignment</h2>
          </div>
          <div className="card-grid">
            {forSale.map((p) => (
              <PackageCard key={p.id} pkg={p} price={priceById.get(p.id)} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="block">
        <div className="section-head">
          <h2>Popular in the free registry</h2>
        </div>
        {free.length === 0 ? (
          <p className="empty">Nothing published yet.</p>
        ) : (
          <div className="card-grid">
            {free.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
