/**
 * POST /api/publish — publish a `.azp` to the registry (the free, open lane).
 *
 * Reads the raw request body as the `.azp` container bytes, verifies + indexes them through
 * `registry.publish`, and returns the resulting package summary as JSON. On any rejection (bad
 * container, malformed manifest, duplicate version) it responds `400` with the error message and,
 * when available, the per-file verification errors. No fee is charged here — money lives only on the
 * marketplace's consignment listings, never in the registry.
 */
import { NextResponse } from "next/server";
import { RegistryError } from "@azphalt/registry";
import { getCatalog } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { registry } = await getCatalog();

  const raw = new Uint8Array(await req.arrayBuffer());
  if (raw.length === 0) {
    return NextResponse.json({ error: "empty body: POST the raw .azp bytes" }, { status: 400 });
  }

  try {
    const result = await registry.publish(raw);
    return NextResponse.json({ package: result.package, version: result.version }, { status: 201 });
  } catch (e) {
    if (e instanceof RegistryError) {
      return NextResponse.json({ error: e.message, errors: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
