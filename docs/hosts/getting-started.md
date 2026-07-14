# Getting Started for Host Apps

Integrating `azphalt` into your host application (whether it's a digital art canvas, a video editor, or a 3D modeling suite) provides your users with access to an open ecosystem of assets.

## Reading `.azp` Packages

To securely open and read an `.azp` file (which is a standard ZIP archive), you can use `@azphalt/azp`:

```bash
npm install @azphalt/azp @azphalt/sdk
```

```typescript
import { readAzp } from "@azphalt/azp";
import { readFileSync } from "fs";

// Read the binary file
const buffer = readFileSync("explosion-pack.azp");

// Parse the payload
const { manifest, payload } = readAzp(buffer);

console.log("Package Name:", manifest.name);
console.log("Assets:", manifest.assets);
```

## Connecting to Repositories

To natively query remote asset repositories (e.g., HDRI hubs, SFX libraries) from within your application's UI, use our lightweight Client SDK:

```bash
npm install @azphalt/repository-client
```

```typescript
import { RepositoryClient } from "@azphalt/repository-client";

const client = new RepositoryClient({ url: "https://hub.example.com" });

// If your app only supports brushes and palettes, just filter for them!
const results = await client.search({ types: ["brush", "palette"] });

console.log(`Found ${results.total} matching packs.`);
```

### Authentication
If the repository offers paid assets, simply prompt the user to log in to the repository in a browser window, retrieve their OAuth token, and inject it into the client:

```typescript
client.setToken("user-bearer-token");
const binaryAzp = await client.download("com.example.paid", "1.0.0");
```
