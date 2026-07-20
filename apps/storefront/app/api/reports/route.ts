/**
 * POST /api/reports — file an abuse/quality report against a package (the moderation lane).
 *
 * Body: `{ packageId: string, version?: string, reason: ReportReason, detail?: string }`. The report
 * is stored and, per `spec/marketplace-integrity.md § 2`, enough **trusted** reports auto-quarantine a
 * version. A public web report is **untrusted** — it queues for review but never trips the automatic
 * threshold on its own.
 */
import { NextResponse } from "next/server";
import { RegistryError, type ReportReason } from "@azphalt/registry";
import { getCatalog } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

const REASONS: ReportReason[] = ["malware", "clone", "deceptive", "secret-leak", "broken", "other"];

export async function POST(req: Request) {
  const { registry } = await getCatalog();

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
    const result = await registry.report({ packageId, version, reason, detail, trusted: false });
    return NextResponse.json({ ok: true, quarantined: result.quarantined }, { status: 201 });
  } catch (e) {
    const message = e instanceof RegistryError ? e.message : (e as Error).message;
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
