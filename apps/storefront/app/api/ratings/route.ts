/**
 * User ratings.
 *
 * - `POST /api/ratings` — record one 1–5 star rating `{ packageId, stars }`, returning the package's
 *   new aggregate `{ rating, ratingCount }`. Like the rest of this reference storefront the endpoint is
 *   **unauthenticated** and does no per-user dedupe: a production deploy would tie a rating to an
 *   identity (an entitlement/account) so a package can't be brigaded. The aggregate is a running
 *   sum+count, so a rating is fire-and-forget.
 */
import { NextResponse } from "next/server";
import { RegistryError } from "@azphalt/registry";
import { ratePackage } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { packageId?: unknown; stars?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const packageId = typeof body.packageId === "string" ? body.packageId : "";
  const stars = typeof body.stars === "number" ? body.stars : NaN;

  if (!packageId) {
    return NextResponse.json({ error: "packageId is required" }, { status: 400 });
  }

  try {
    const { rating, ratingCount } = await ratePackage(packageId, stars);
    return NextResponse.json({ ok: true, rating, ratingCount }, { status: 201 });
  } catch (e) {
    const message = e instanceof RegistryError ? e.message : (e as Error).message;
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
