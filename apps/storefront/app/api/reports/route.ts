/**
 * The moderation lane (`spec/marketplace-integrity.md § 2`).
 *
 * - `POST /api/reports` — file an abuse/quality report `{ packageId, version?, reason, detail? }`. A
 *   public web report is **untrusted**: it queues for review but never trips the auto-quarantine
 *   threshold on its own.
 * - `GET /api/reports` — the moderation queue: every report, newest-first. Like the rest of this
 *   reference storefront it has **no moderator authentication**; a production deploy gates it behind a
 *   moderator session (the spec's `GET /reports` is authenticated).
 */
import { NextResponse } from "next/server";
import { RegistryError, type ReportReason } from "@azphalt/registry";
import { fileReport, listAllReports } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

const REASONS: ReportReason[] = ["malware", "clone", "deceptive", "secret-leak", "broken", "other"];

export async function POST(req: Request) {
  let body: { packageId?: unknown; version?: unknown; reason?: unknown; detail?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const packageId = typeof body.packageId === "string" ? body.packageId : "";
  const version = typeof body.version === "string" ? body.version : undefined;
  const reason = REASONS.includes(body.reason as ReportReason) ? (body.reason as ReportReason) : undefined;
  const detail = typeof body.detail === "string" ? body.detail.slice(0, 2000) : undefined;

  if (!packageId || !reason) {
    return NextResponse.json({ error: "packageId and a valid reason are required", reasons: REASONS }, { status: 400 });
  }

  try {
    const { quarantined } = await fileReport({ packageId, version, reason, detail });
    return NextResponse.json({ ok: true, quarantined }, { status: 201 });
  } catch (e) {
    const message = e instanceof RegistryError ? e.message : (e as Error).message;
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const reports = await listAllReports();
    return NextResponse.json({ reports }, { status: 200 });
  } catch (e) {
    console.error("Failed to list reports:", e);
    return NextResponse.json({ error: "internal error listing reports" }, { status: 500 });
  }
}
