/**
 * Home page: Server Component that fetches the catalog from the registry and passes
 * it to the SpatialStorefront client component for dynamic physics-based rendering.
 */
import type { Money } from "@azphalt/registry";
import { getCatalog } from "../lib/catalog";
import { SpatialStorefront } from "../components/SpatialStorefront";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { registry, market } = await getCatalog();

  const popular = await registry.list({ sort: "downloads" });
  const listings = await market.activeListings();
  const priceById = new Map<string, Money>(listings.map((l) => [l.packageId, l.price]));

  const forSale = popular.filter((p) => priceById.has(p.id));
  const free = popular.filter((p) => !priceById.has(p.id));

  return (
    <SpatialStorefront forSale={forSale} free={free} />
  );
}
