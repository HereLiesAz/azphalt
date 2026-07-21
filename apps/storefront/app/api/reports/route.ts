/**
 * The moderation lane (`spec/marketplace-integrity.md § 2`).
 *
 * - `POST /api/reports` — file an abuse/quality report `{ packageId, version?, reason, detail? }`. A
 *   public web report is **untrusted**: it queues for review but never trips the auto-quarantine
 *   threshold on its own. When `reason` is `"ip-claim"` this is instead a **developer / rights-holder
 *   IP claim** `{ packageId, reason:"ip-claim", originalPackageId, claimant?, signature?, detail? }` —
 *   a signature by the original package's publisher key makes it *trusted* (see `fileIpClaim`).
 * - `GET /api/reports` — the moderation queue: every report, newest-first. Like the rest of this
 *   reference storefront it has **no moderator authentication**; a production deploy gates it behind a
 *   moderator session (the spec's `GET /reports` is authenticated).
 */
import { NextResponse } from "next/server";
import { RegistryError, type ReportReason } from "@azphalt/registry";
import { fileIpClaim, fileReport, listAllReports } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

const REASONS: ReportReason[] = ["malware", "clone", "deceptive", "secret-leak", "broken", "ip-claim", "other"];

export async function POST(req: Request) {
  let body: {
    packageId?: unknown;
    version?: unknown;
    reason?: unknown;
    detail?: unknown;
    originalPackageId?: unknown;
    claimant?: unknown;
    signature?: unknown;
  };
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
    // Developer / rights-holder IP claim: needs the claimant's own package as the provenance anchor; a
    // signature over that package's publisher key makes it trusted (fileIpClaim verifies it).
    if (reason === "ip-claim") {
      const originalPackageId = typeof body.originalPackageId === "string" ? body.originalPackageId : "";
      const claimant = typeof body.claimant === "string" ? body.claimant.slice(0, 200) : undefined;
      const signature = typeof body.signature === "string" ? body.signature : undefined;
      if (!originalPackageId) {
        return NextResponse.json({ error: "originalPackageId is required for an ip-claim" }, { status: 400 });
      }
      const { trusted, quarantined } = await fileIpClaim({ packageId, originalPackageId, detail, claimant, signature });
      return NextResponse.json({ ok: true, trusted, quarantined }, { status: 201 });
    }

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
