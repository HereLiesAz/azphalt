import { NextResponse } from 'next/server';
import { getCatalog } from '../../../lib/catalog';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { registry, market } = await getCatalog();
  const visible = await registry.list({});
  const listings = await market.activeListings();
  const priceById = new Map(listings.map((l) => [l.packageId, l.price]));

  const responseData = await Promise.all(visible.map(async p => {
    const base = {
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
      maturity: p.maturity,
      price: priceById.get(p.id) || null,
      // The store card's artwork. The registry summary has carried this all along and this route
      // simply never copied it, so every card in the Compose UI drew a procedural placeholder while
      // the generated previews sat unreferenced — the same omission #138 fixed for `description` on
      // the Repository API. `/packages` surfaces it; this endpoint is what the UI actually fetches.
      preview: p.preview,
    };
    // A pack (kind:"pack") carries its member references in the manifest, not the summary — surface them
    // so the detail view can show "what's inside" (each still installed/gated individually). Only packs
    // pay the extra manifest read.
    if (p.kind === "pack") {
      const entries = (await registry.latest(p.id))?.manifest.pack?.entries;
      if (entries?.length) return { ...base, pack: { entries } };
    }
    return base;
  }));

  return NextResponse.json(responseData);
}
