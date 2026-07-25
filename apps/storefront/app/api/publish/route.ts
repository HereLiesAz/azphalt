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
import { getCatalog, isDeployed, storageIsDurable } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

/**
 * A deployment with no durable store keeps a publish only in the one serverless instance that
 * served it. Answering `201` there is a lie that is very hard to catch: reads keep working (the
 * seed catalog is rebuilt on every cold start), so the package looks published until the instance
 * recycles. Worse, `Registry.publish` rejects a duplicate version permanently — so a caller who
 * "successfully" published and later finds the package gone can re-publish the same version and get
 * `201` a second time, which is only possible because the first write was lost.
 *
 * Refuse instead, and say what is missing. Set `AZPHALT_ALLOW_EPHEMERAL_PUBLISH=1` to opt a
 * throwaway preview back into accepting writes it will drop.
 */
const ephemeralPublishAllowed = process.env.AZPHALT_ALLOW_EPHEMERAL_PUBLISH === "1";

export async function POST(req: Request) {
  if (isDeployed && !storageIsDurable && !ephemeralPublishAllowed) {
    return NextResponse.json(
      {
        error:
          "registry storage is not durable: DATABASE_URL and BLOB_READ_WRITE_TOKEN are unset, so a " +
          "published package would be lost when this instance recycles. Refusing rather than " +
          "reporting a publish that will not survive.",
      },
      { status: 503 },
    );
  }

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
