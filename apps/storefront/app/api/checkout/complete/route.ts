/**
 * POST /api/checkout/complete — DEV ONLY. Complete a stubbed checkout and issue its entitlement.
 *
 * Body: `{ sessionId: string }`. Stands in for the webhook a real payment provider would send on a
 * confirmed charge: it marks the stub session completed and returns a registry-signed **buy-once
 * entitlement** for whatever that session was opened for. Present the returned `token` as
 * `Authorization: Bearer <token>` to `GET /api/download/[id]` to fetch a paid package's bytes.
 *
 * NO MONEY MOVES HERE. This mints a real, signed, offline-verifiable license for a payment that
 * never happened, so it is `404` unless `AZPHALT_ALLOW_STUB_FULFILMENT=1` says otherwise — with it
 * on, anyone who can reach this route can license anything. It demonstrates the mechanism (see
 * `spec/repository-api.md` § Buy-once entitlements); it is not commercial enforcement, and a
 * deployment that enables it is a demo, not a store.
 */
import { NextResponse } from "next/server";
import { RegistryError } from "@azphalt/registry";
import { fulfilStubCheckout, stubFulfilmentEnabled } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

interface CompleteBody {
  sessionId?: unknown;
}

export async function POST(req: Request) {
  // 404 rather than 403: an endpoint that is off should not advertise that it exists.
  if (!stubFulfilmentEnabled) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  let body: CompleteBody;
  try {
    body = (await req.json()) as CompleteBody;
  } catch {
    return NextResponse.json({ stub: true, error: "invalid JSON body" }, { status: 400 });
  }
  if (typeof body.sessionId !== "string" || body.sessionId === "") {
    return NextResponse.json({ stub: true, error: "sessionId (string) is required" }, { status: 400 });
  }

  try {
    const entitlement = await fulfilStubCheckout(body.sessionId);
    return NextResponse.json(
      {
        stub: true,
        message:
          "Stubbed fulfilment — no payment was taken and no money moved. This entitlement is a real " +
          "signed token only to demonstrate the buy-once model.",
        // Base64 of the token JSON: the exact form `Authorization: Bearer <token>` expects.
        token: Buffer.from(JSON.stringify(entitlement), "utf8").toString("base64"),
        entitlement,
      },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof RegistryError) {
      return NextResponse.json({ stub: true, error: e.message }, { status: 400 });
    }
    return NextResponse.json({ stub: true, error: (e as Error).message }, { status: 400 });
  }
}
