/**
 * Developer / rights-holder IP claims (marketplace-integrity § 4). Two lanes:
 * - unsigned → untrusted (queues for human review), and
 * - signed by the original package's publisher key → trusted.
 * The claim also carries clone-similarity evidence so moderation sees why it's a clone.
 */
import { describe, expect, it } from "vitest";
import { writeAzp, signAzp, generateSigningKey } from "@azphalt/azp";
import { sign as cryptoSign, createPrivateKey } from "node:crypto";

const { POST: fileReport } = await import("../app/api/reports/route");
const { listAllReports, getCatalog, fileIpClaim, ipClaimMessage } = await import("../lib/catalog");

/** A seeded package standing in for the alleged clone. */
const TARGET = "com.hereliesaz.halftone";

function post(body: unknown): Promise<Response> {
  return fileReport(new Request("http://localhost/api/reports", { method: "POST", body: JSON.stringify(body) }));
}

describe("developer IP claims", () => {
  it("files an unsigned ip-claim as untrusted and records the original package", async () => {
    const res = await post({
      packageId: TARGET,
      reason: "ip-claim",
      originalPackageId: "com.studioaz.cinelut",
      detail: "this reimplements my pack",
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.trusted).toBe(false); // no signature ⇒ untrusted, queues for review

    const listed = await listAllReports();
    const mine = listed.find((r) => r.packageId === TARGET && r.reason === "ip-claim");
    expect(mine?.originalPackageId).toBe("com.studioaz.cinelut");
    expect(mine?.trusted).toBe(false);
  });

  it("rejects an ip-claim without an originalPackageId", async () => {
    expect((await post({ packageId: TARGET, reason: "ip-claim" })).status).toBe(400);
  });

  it("marks a claim SIGNED by the original's publisher key as trusted", async () => {
    const { registry } = await getCatalog();

    // Publish an original package the claimant signs with their own key.
    const key = generateSigningKey();
    const signed = signAzp(
      writeAzp({
        manifest: {
          azphalt: "0.1",
          id: "com.mine.original",
          name: "My Original",
          version: "1.0.0",
          kind: "asset",
          license: "MIT",
          compat: ">=0.1",
          assets: [{ type: "brush", path: "assets/b" }],
        },
        payload: { "assets/b": new TextEncoder().encode("mine") },
        license: "MIT License\n",
      }).azp,
      { privateKey: key.privateKey },
    );
    await registry.publish(signed);

    // Sign the canonical claim message with the SAME private key that signed the original.
    const message = ipClaimMessage(TARGET, "com.mine.original");
    const signature = cryptoSign(null, Buffer.from(message), createPrivateKey(key.privateKey)).toString("base64");

    const trusted = await fileIpClaim({ packageId: TARGET, originalPackageId: "com.mine.original", signature, claimant: "me" });
    expect(trusted.trusted).toBe(true);

    // A bogus signature does NOT get trusted.
    const bad = await fileIpClaim({ packageId: TARGET, originalPackageId: "com.mine.original", signature: "AAAA", claimant: "me" });
    expect(bad.trusted).toBe(false);
  });
});
