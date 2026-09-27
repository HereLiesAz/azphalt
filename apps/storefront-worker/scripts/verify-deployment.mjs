/**
 * Post-deploy check: is the Worker version just deployed actually serving the store, the docs and the
 * catalog? Run by the deploy workflow against Wrangler's deployment URL (the workers.dev address), so it
 * checks the new version itself whether or not the public domains point at it yet.
 *
 *   node apps/storefront-worker/scripts/verify-deployment.mjs https://azphalt.<account>.workers.dev
 *
 * The catalog checks retry for up to five minutes: a new version takes a moment to reach every edge.
 * Deployment freshness is part of correctness (docs/OPERATIONS.md), so a miss fails the deploy.
 */
const base = (process.argv[2] || "").replace(/\/+$/, "");
if (!/^https?:\/\//.test(base)) {
  console.error("verify-deployment: pass the deployment URL (https://…, or http:// for wrangler dev), got " + JSON.stringify(process.argv[2]));
  process.exit(2);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function eventually(label, check, attempts = 30) {
  let last = "";
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      if (await check()) {
        console.log("ok   " + label);
        return;
      }
      last = "check returned false";
    } catch (error) {
      last = error instanceof Error ? error.message : String(error);
    }
    if (attempt < attempts) await sleep(10_000);
  }
  throw new Error(label + " — " + last);
}

async function status(path, want = 200) {
  const res = await fetch(base + path, { headers: { accept: "text/html" }, redirect: "manual" });
  if (res.status !== want) throw new Error(path + " answered " + res.status);
  return res;
}

async function packageVisible(query, id, kind) {
  const res = await fetch(`${base}/packages?app=com.hereliesaz.aive&kind=${kind}&q=${query}&page=1&sort=name`);
  if (!res.ok) throw new Error("/packages answered " + res.status);
  const body = await res.json();
  return (body.total ?? 0) > 0 && (body.packages ?? []).some((p) => p.id === id && p.kind === kind);
}

await eventually("health", async () => (await (await status("/api/health")).json()).ok === true);
await eventually("storefront shell", async () => (await (await status("/")).text()).includes('id="root"'));
await eventually("privacy policy", async () => (await (await status("/privacy")).text()).includes("Privacy Policy"));
await eventually("docs bundle", async () => (await (await status("/_docs/")).text()).includes("azphalt"));
await eventually("Aive workflow in the app-scoped catalog", () =>
  packageVisible("feature-delivery", "com.hereliesaz.haive.feature-delivery", "workflow"));
await eventually("Aive role in the app-scoped catalog", () =>
  packageVisible("ux-researcher", "com.hereliesaz.haive.role.ux-researcher", "role"));
console.log("verify-deployment: " + base + " is serving this build");
