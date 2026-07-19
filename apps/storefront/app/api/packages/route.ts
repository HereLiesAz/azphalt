import { NextResponse } from 'next/server';
import { getCatalog } from '../../../lib/catalog';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { registry, market } = await getCatalog();
  const visible = await registry.list({});
  const listings = await market.activeListings();
  const priceById = new Map(listings.map((l) => [l.packageId, l.price]));

  const responseData = visible.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    author: p.author,
    version: p.version,
    kind: p.kind,
    capabilities: p.capabilities,
    downloads: p.downloads,
    rating: p.rating,
    ratingCount: p.ratingCount,
    updatedAt: p.updatedAt,
    targetApps: p.targetApps,
    mediaDomains: p.mediaDomains,
    types: p.assetTypes,
    price: priceById.get(p.id) || null
  }));

  return NextResponse.json(responseData);
}
