import { NextResponse } from "next/server";
import { issueEntitlement } from "@azphalt/registry";
import { sessionRecords } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

interface CompleteBody {
  sessionId?: unknown;
}

export async function POST(req: Request) {
  // Dev-only fulfilment. This route mints signed, offline-verifiable entitlements for checkout
  // sessions that no real payment ever settled — a worse hole than serving free bytes if left
  // reachable on a public deploy. It exists ONLY behind an explicit opt-in; without it, the route
  // 404s as if it were not there. See
  // docs/superpowers/specs/2026-07-14-storefront-paid-download-gate-design.md § 4.
  if (process.env.AZPHALT_ALLOW_STUB_FULFILMENT !== "1") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: CompleteBody;
  try {
    body = (await req.json()) as CompleteBody;
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  const record = sessionRecords.get(sessionId);
  if (!record) {
    return NextResponse.json({ error: "Session not found or already fulfilled" }, { status: 404 });
  }

  const signingKey = process.env.AZPHALT_SIGNING_KEY;
  if (!signingKey) {
    return NextResponse.json({ error: "Storefront is not configured to issue entitlements (AZPHALT_SIGNING_KEY is missing)" }, { status: 500 });
  }

  try {
    const entitlement = issueEntitlement(signingKey, {
      kind: "perpetual",
      packageId: record.packageId,
      subject: record.buyerId,
      issuedAt: new Date().toISOString()
    });
    // The download gate's authorizer decodes the Bearer credential as base64-encoded JSON
    // (EntitlementAuthorizer.authorize: base64 → JSON.parse). Return that wire form, not the raw
    // object — the object would arrive as "[object Object]" and fail authentication.
    const token = Buffer.from(JSON.stringify(entitlement), "utf8").toString("base64");

    // Remove the session so it can't be fulfilled again
    sessionRecords.delete(sessionId);

    return NextResponse.json({ token }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
