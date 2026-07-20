import { NextResponse } from "next/server";
import { completeStubSession, fulfil, stubSessionInput } from "../../../../lib/catalog";

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

  // Resolve what the session was for from stored state (the stub provider recorded the input at
  // checkout) — never from this request body, so a caller can't fulfil a package it never bought.
  const input = await stubSessionInput(sessionId);
  if (!input) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  // Complete the simulated session, then mint (idempotently) and persist the entitlement.
  await completeStubSession(sessionId);
  const token = await fulfil(sessionId, input.packageId, input.buyerId);
  if (!token) {
    return NextResponse.json(
      { error: "Storefront is not configured to issue entitlements (AZPHALT_SIGNING_KEY is missing)" },
      { status: 500 },
    );
  }

  return NextResponse.json({ token }, { status: 200 });
}
