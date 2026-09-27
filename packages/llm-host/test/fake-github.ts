/** A routing fake of the GitHub REST endpoints the sandbox uses. Records every call. */
export type Handler = (body: unknown, url: URL) => { status?: number; body?: unknown; bytes?: Uint8Array } | undefined;

export function fakeGitHub(routes: Record<string, Handler>) {
  const calls: { method: string; path: string; body: unknown; auth: string | null }[] = [];
  const fetchImpl = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = new URL(String(input));
    const method = init?.method ?? "GET";
    const body = typeof init?.body === "string" ? JSON.parse(init.body) : undefined;
    const auth = new Headers(init?.headers).get("authorization");
    calls.push({ method, path: url.pathname + url.search, body, auth });
    const key = `${method} ${url.pathname}`;
    const handler = routes[key] ?? Object.entries(routes).find(([k]) => k.endsWith("*") && key.startsWith(k.slice(0, -1)))?.[1];
    const out = handler?.(body, url);
    if (!out) return new Response(JSON.stringify({ message: "Not Found" }), { status: 404 });
    if (out.bytes) return new Response(out.bytes, { status: out.status ?? 200 });
    if (out.status === 204) return new Response(null, { status: 204 });
    return new Response(out.body === undefined ? "" : JSON.stringify(out.body), { status: out.status ?? 200 });
  }) as typeof fetch;
  return { fetch: fetchImpl, calls };
}
