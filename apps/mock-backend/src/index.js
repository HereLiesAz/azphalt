import express from "express";
import cors from "cors";
import { writeAzp } from "@azphalt/azp";

const app = express();
app.use(cors());

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

  res.json({
    packages: results,
    total: results.length,
    page: 1,
    pages: 1
  });
});

// 3. Download API
app.get("/packages/:id/versions/:version/download", (req, res) => {
  const pkg = DB.packages.find(p => p.id === req.params.id);
  if (!pkg) return res.status(404).send("Not found");

  if (pkg.priceStatus === "paid") {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized");
    }
    // Verify token here...
  }

  // Serve the sample package's real .azp bytes.
  res.setHeader("Content-Type", "application/x-azphalt");
  res.setHeader("Content-Disposition", `attachment; filename="${pkg.id}-${req.params.version}.azp"`);
  res.send(SAMPLE_AZP);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Repository API server running on port ${port}`);
});
