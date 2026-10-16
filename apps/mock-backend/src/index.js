import { timingSafeEqual } from "node:crypto";
import { pathToFileURL } from "node:url";
import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { writeAzp, digest } from "@azphalt/azp";

const app = express();

// CORS: a template that answers every origin teaches the wrong default. Allow local development
// origins out of the box, and everything else only if you set CORS_ORIGIN (a comma-separated list).
const allowedOrigins = (process.env.CORS_ORIGIN ?? "").split(",").map((o) => o.trim()).filter(Boolean);
app.use(
  cors({
    origin(origin, callback) {
      const local = !origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      callback(null, local || allowedOrigins.includes(origin));
    },
  }),
);

/** The spec's error envelope (spec/repository-api.md § Errors): `{ error: { code, message } }`. */
const fail = (res, status, code, message) => res.status(status).json({ error: { code, message } });

const utf8 = (s) => new TextEncoder().encode(s);

// Build one real, signed-format-valid sample `.azp` at startup so the download endpoint actually
// serves an installable package (rather than the old "not implemented" 404). This keeps the mock
// backend a working end-to-end demo; a production backend serves stored `.azp` bytes here instead.
const SAMPLE_ID = "com.example.sample-pack";
const SAMPLE_VERSION = "1.0.0";
const SAMPLE_AZP = Buffer.from(
  writeAzp({
    manifest: {
      azphalt: "0.1",
      id: SAMPLE_ID,
      name: "Sample Asset Pack",
      version: SAMPLE_VERSION,
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      author: "Template Author",
      description: "A minimal sample asset pack served by the mock backend.",
      assets: [{ type: "image", path: "assets/swatch.svg" }],
    },
    payload: {
      "assets/swatch.svg": utf8(
        '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="#6c47ff"/></svg>',
      ),
    },
    license: "MIT License\n",
  }).azp,
);

const DB = {
  packages: [
    {
      id: SAMPLE_ID,
      name: "Sample Asset Pack",
      author: "Template Author",
      version: SAMPLE_VERSION,
      types: ["image"],
      priceStatus: "free",
    },
  ],
};

// 1. Repository Index
app.get("/.well-known/azphalt-repository.json", (req, res) => {
  res.json({
    name: "My Custom Azphalt Repository",
    version: "0.1",
    description: "A template repository server.",
    auth: {
      type: "bearer",
      url: "https://auth.example.com"
    }
  });
});

// 2. Search API
app.get("/packages", (req, res) => {
  let results = [...DB.packages];

  if (req.query.types) {
    const types = String(req.query.types).split(",");
    results = results.filter(p => p.types.some(t => types.includes(t)));
  }

  if (req.query.q) {
    const q = String(req.query.q).toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
    );
  }

  res.json({
    packages: results,
    total: results.length,
    page: 1,
    pages: 1
  });
});

// 3. Package detail — what a client needs before it downloads (versions + the container digest).
app.get("/packages/:id", (req, res) => {
  const pkg = DB.packages.find((p) => p.id === req.params.id);
  if (!pkg) return fail(res, 404, "not_found", `unknown package: ${req.params.id}`);
  res.json({
    ...pkg,
    latest: pkg.version,
    kind: "asset",
    versions: [{ version: pkg.version, size: SAMPLE_AZP.length, digest: digest(SAMPLE_AZP), yanked: false }],
  });
});

// 4. Revocations — versions pulled after publish. None here; a real server returns what it yanked.
app.get("/revocations", (_req, res) => res.json({ revocations: [] }));

// 5. Access gate for paid packages. This template FAILS CLOSED: with no MOCK_PAID_TOKEN configured no
// token is accepted, so copying it can never serve paid bytes to anyone by accident. Replace the
// comparison with a lookup in your own accounts/entitlements service (or verify a signed entitlement
// with `verifyEntitlement` from @azphalt/registry).
function authorize(req) {
  const header = req.headers.authorization ?? "";
  if (!header.startsWith("Bearer ")) return { status: 401, message: "authentication required" };
  const configured = process.env.MOCK_PAID_TOKEN;
  if (!configured) return { status: 402, message: "no license for this package" };
  const given = Buffer.from(header.slice("Bearer ".length));
  const want = Buffer.from(configured);
  const ok = given.length === want.length && timingSafeEqual(given, want);
  return ok ? null : { status: 402, message: "no license for this package" };
}

// 6. Download API. Rate-limited per client: the route checks an access token, so it must not be
// open to unbounded guessing. Tune (or move to your gateway) for production.
const downloadLimiter = rateLimit({
  windowMs: 60_000,
  limit: Number(process.env.DOWNLOAD_RATE_LIMIT) || 120,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req, res) => fail(res, 429, "rate_limited", "too many requests"),
});
app.get("/packages/:id/versions/:version/download", downloadLimiter, (req, res) => {
  const pkg = DB.packages.find((p) => p.id === req.params.id);
  if (!pkg) return fail(res, 404, "not_found", `unknown package: ${req.params.id}`);
  // Only the version this server actually holds. (It used to serve v1.0.0 bytes for ANY requested
  // version string, labelled with that string.)
  if (req.params.version !== pkg.version) {
    return fail(res, 404, "not_found", `unknown version: ${pkg.id}@${req.params.version}`);
  }

  if (pkg.priceStatus === "paid") {
    const denied = authorize(req);
    if (denied) return fail(res, denied.status, denied.status === 401 ? "unauthorized" : "payment_required", denied.message);
  }

  // Serve the sample package's real .azp bytes.
  // spec/package-format.md § Media type. `application/x-azphalt` is the deprecated alias a server
  // must no longer send.
  res.setHeader("Content-Type", "application/vnd.azphalt.package");
  // id and version were matched against the stored values above, so this is not caller-controlled.
  res.setHeader("Content-Disposition", `attachment; filename="${pkg.id}-${pkg.version}.azp"`);
  res.send(SAMPLE_AZP);
});

export { app };

// Listen only when run as a command, so tests can import the app without binding a port.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Repository API server running on port ${port}`);
  });
}
