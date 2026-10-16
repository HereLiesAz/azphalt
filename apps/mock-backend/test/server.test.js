import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { app } from "../src/index.js";

let server;
let base;
before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

test("serves the sample package only at the version it holds", async () => {
  const ok = await fetch(`${base}/packages/com.example.sample-pack/versions/1.0.0/download`);
  assert.equal(ok.status, 200);
  assert.equal(ok.headers.get("content-type"), "application/vnd.azphalt.package");
  const other = await fetch(`${base}/packages/com.example.sample-pack/versions/9.9.9/download`);
  assert.equal(other.status, 404);
  assert.deepEqual(Object.keys((await other.json()).error).sort(), ["code", "message"]);
});

test("unknown package answers the spec error envelope, not plain text", async () => {
  const res = await fetch(`${base}/packages/com.nope.nope/versions/1.0.0/download`);
  assert.equal(res.status, 404);
  assert.equal((await res.json()).error.code, "not_found");
});

test("detail and revocations exist, so getPackage and resolvePack work against the template", async () => {
  const detail = await (await fetch(`${base}/packages/com.example.sample-pack`)).json();
  assert.equal(detail.latest, "1.0.0");
  assert.match(detail.versions[0].digest, /^sha256-[0-9a-f]{64}$/);
  const rev = await (await fetch(`${base}/revocations`)).json();
  assert.deepEqual(rev, { revocations: [] });
});

test("does not send CORS headers to an arbitrary origin", async () => {
  const res = await fetch(`${base}/packages`, { headers: { origin: "https://evil.example" } });
  assert.equal(res.headers.get("access-control-allow-origin"), null);
  const local = await fetch(`${base}/packages`, { headers: { origin: "http://localhost:5173" } });
  assert.equal(local.headers.get("access-control-allow-origin"), "http://localhost:5173");
});
