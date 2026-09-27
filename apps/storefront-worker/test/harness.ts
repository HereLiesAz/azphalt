/**
 * Test doubles for the Worker's two bindings, faithful enough to exercise real routing and storage:
 *
 * - `assets(files)` mimics Cloudflare static assets with `html_handling: "auto-trailing-slash"` and
 *   `not_found_handling: "none"` — `/x` serves `x.html`, `/dir/` serves `dir/index.html`, `/x.html`
 *   redirects to `/x`, and a miss is a bare 404.
 * - `durableState()` runs the real `AzphaltState` class over `node:sqlite`, the same SQLite the
 *   Durable Object storage API wraps, so every SQL statement the Worker issues is executed for real.
 */
import { DatabaseSync } from "node:sqlite";
import { AzphaltState } from "../src/index";

type Files = Record<string, string>;

function contentType(path: string): string {
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".js")) return "text/javascript";
  return "application/octet-stream";
}

export function assets(files: Files) {
  const fetched: string[] = [];
  return {
    fetched,
    async fetch(req: Request): Promise<Response> {
      const url = new URL(req.url);
      const path = url.pathname;
      fetched.push(path);
      const serve = (file: string) =>
        new Response(files[file], { status: 200, headers: { "content-type": contentType(file) } });
      const redirect = (to: string) => new Response(null, { status: 307, headers: { location: to } });

      if (path.endsWith("/index.html") && files[path]) return redirect(path.slice(0, -"index.html".length));
      if (path.endsWith(".html") && files[path]) return redirect(path.slice(0, -".html".length));
      if (path.endsWith("/") && files[path + "index.html"]) return serve(path + "index.html");
      if (files[path + ".html"]) return serve(path + ".html");
      if (!path.endsWith(".html") && files[path]) return serve(path);
      if (files[path + "/index.html"]) return redirect(path + "/");
      return new Response("not found", { status: 404 });
    },
  };
}

class SqlStorage {
  constructor(private readonly db: DatabaseSync) {}
  exec(query: string, ...bindings: unknown[]): Iterable<Record<string, unknown>> {
    const stmt = this.db.prepare(query);
    const params = bindings.map((b) => (b === undefined ? null : b)) as never[];
    return stmt.all(...params) as Record<string, unknown>[];
  }
}

export function durableState() {
  const db = new DatabaseSync(":memory:");
  const ctx = {
    storage: { sql: new SqlStorage(db) },
    blockConcurrencyWhile: async <T>(fn: () => Promise<T>) => fn(),
  };
  const instance = new AzphaltState(ctx);
  return {
    db,
    idFromName: (name: string) => name,
    get: () => ({ fetch: (req: Request) => instance.fetch(req) }),
  };
}

export const baseVars = {
  PUBLIC_ORIGIN: "https://azphalt.store",
  GITHUB_RAW_BASE: "https://raw.githubusercontent.com/HereLiesAz/azphalt/main/apps/storefront/registry",
};
