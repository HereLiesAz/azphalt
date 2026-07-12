import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const DB = {
  packages: [
    {
      id: "com.example.sample-pack",
      name: "Sample Asset Pack",
      author: "Template Author",
      version: "1.0.0",
      types: ["image"],
      priceStatus: "free"
    }
  ]
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

  // Send binary payload
  res.status(404).send("Not implemented in template. Serve the .azp file here!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Repository API server running on port ${port}`);
});
