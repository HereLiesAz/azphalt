/**
 * The `compat` grammar (spec/extension-manifest.md § compat). A package's `compat` declares the host
 * azphalt-API version it needs, as a **single semver comparator** the host evaluates against its own
 * API version. The `0.1` subset is deliberately small so validation is identical across hosts:
 *
 * - one comparator — `>=` `>` `<=` `<` `=` (optional; **defaults to `>=`**, "minimum host version");
 * - followed by `MAJOR[.MINOR[.PATCH]]` (omitted parts are `0`, so `0.1` ≡ `0.1.0`).
 *
 * No ranges, unions (`||`), hyphen ranges, `^`/`~`, or prerelease tags in `0.1`. `>=0.1` is the
 * conventional value.
 */
export type Comparator = ">=" | ">" | "<=" | "<" | "=";

export interface Compat {
  op: Comparator;
  version: [number, number, number];
}

const COMPAT_RE = /^\s*(>=|<=|>|<|=)?\s*(\d+)(?:\.(\d+))?(?:\.(\d+))?\s*$/;

/** Parse a `compat` (or a bare host version) into its comparator + version, or `null` if malformed. */
export function parseCompat(compat: string): Compat | null {
  if (typeof compat !== "string") return null;
  const m = COMPAT_RE.exec(compat);
  if (!m) return null;
  return { op: (m[1] as Comparator) ?? ">=", version: [Number(m[2]), Number(m[3] ?? 0), Number(m[4] ?? 0)] };
}

function cmp(a: [number, number, number], b: [number, number, number]): number {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  return 0;
}

/**
 * Does a host advertising azphalt API version `hostVersion` satisfy a package's `compat`? The host
 * version is a bare `MAJOR[.MINOR[.PATCH]]`. Returns `false` if either input is unparseable.
 */
export function compatSatisfies(hostVersion: string, compat: string): boolean {
  const c = parseCompat(compat);
  const h = parseCompat(hostVersion);
  if (!c || !h) return false;
  const d = cmp(h.version, c.version);
  switch (c.op) {
    case ">=":
      return d >= 0;
    case ">":
      return d > 0;
    case "<=":
      return d <= 0;
    case "<":
      return d < 0;
    case "=":
      return d === 0;
  }
}
