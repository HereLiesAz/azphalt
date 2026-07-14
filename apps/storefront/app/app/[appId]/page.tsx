/**
 * Per-app catalog: the packages a given host app (by reverse-DNS id) can see — its own **companions**
 * and app-scoped packages, plus every global one. Uses `registry.list({ app })`, the app-scoping filter
 * from `repository-api.md § App scoping`. Reached from the "Available in" chips on a package page.
 */
import Link from "next/link";
import type { Money } from "@azphalt/registry";
import { getCatalog } from "../../../lib/catalog";
import { PackageCard } from "../../../components/PackageCard";

export const dynamic = "force-dynamic";

interface AppCatalogPageProps {
  params: Promise<{ appId: string }>;
}

export default async function AppCatalogPage({ params }: AppCatalogPageProps) {
  const appId = decodeURIComponent((await params).appId);
  const { registry, market } = await getCatalog();

  const visible = await registry.list({ app: appId });
  const listings = await market.activeListings();
  const priceById = new Map<string, Money>(listings.map((l) => [l.packageId, l.price]));

  // Split: packages scoped specifically to this app vs the global ones it also sees.
  const scoped = visible.filter((p) => p.targetApps?.includes(appId));
  const global = visible.filter((p) => !p.targetApps?.includes(appId));

  return (
    <>
      <p className="detail-sub">
        <Link href="/">← Browse</Link>
      </p>
      <h1 className="page-title">Store for {appId}</h1>
      <p className="lede">
        Packages available to <span className="id">{appId}</span> — its own app-scoped companions plus
        every global package on the registry.
      </p>

      {scoped.length > 0 ? (
        <section className="block">
          <div className="section-head">
            <h2>Made for this app</h2>
          </div>
          <div className="card-grid">
            {scoped.map((p) => (
              <PackageCard key={p.id} pkg={p} price={priceById.get(p.id)} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="block">
        <div className="section-head">
          <h2>Also available</h2>
        </div>
        {global.length === 0 ? (
          <p className="empty">No global packages.</p>
        ) : (
          <div className="card-grid">
            {global.map((p) => (
              <PackageCard key={p.id} pkg={p} price={priceById.get(p.id)} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
