/**
 * The web→host install handoff from `spec/web-handoff.md`, for any web storefront.
 *
 * The spec requires the same ladder of every conforming storefront — build the link, attempt it,
 * detect that nothing claimed it, fall back to the `.azp` download and the host directory — and the
 * middle step is a **heuristic**, because no browser API answers "is this scheme registered". A
 * heuristic reimplemented per storefront is a heuristic that behaves differently per storefront, so
 * it lives here once instead.
 *
 * The Compose storefront's `models/InstallHandoff.kt` + `network/WasmHandoff.kt` are the Kotlin
 * counterpart, deliberately making the same decisions in the same order. Two storefronts that
 * disagree about what pressing Install does would be two products wearing one name.
 */
/**
 * The minimum a package must look like for this module to act on it.
 *
 * Structural rather than an import of `@azphalt/azdk`'s `PackageSummary` on purpose: a storefront may
 * carry its own catalogue type (the React storefront does), and forcing every consumer onto one
 * nominal type would make this package harder to adopt than reimplementing it — which is the outcome
 * it exists to prevent. Anything with these fields satisfies it.
 */
export interface HandoffPackage {
  id: string;
  name: string;
  version: string;
  /** Reverse-DNS host ids this package is scoped to. Empty/absent = global. */
  targetApps?: string[];
  /** The reduced `app` block from a `kind:"app"` summary (`spec/repository-api.md` § The `app` summary). */
  app?: {
    roles?: string[];
    hostId?: string;
    platforms?: {
      android?: { install?: string };
      pwa?: { startUrl?: string };
    };
  };
}

/** How long to wait before concluding nothing claimed the link. See `attemptHandoff`. */
const HANDOFF_WAIT_MS = 1_400;

/* ─────────────── the store's own inventory ─────────────── */

/**
 * What a host has done with a package — the `spec/state-reporting.md` § 1 vocabulary, as far as a
 * storefront needs it.
 */
export type InventoryState = "downloaded" | "installed" | "active" | "failed" | "removed";

export interface InventoryEntry {
  id: string;
  version: string;
  state: InventoryState;
  /** ISO-8601 instant this was recorded. */
  at?: string;
}

/**
 * Versioned and per-origin. A self-hosted storefront keeps its own record rather than inheriting the
 * flagship's, and neither can read the other's.
 */
const INVENTORY_KEY = "azphalt.inventory.v1";

/**
 * The store's record of what it has handed to a host.
 *
 * A host telling the store what it holds is the better answer, and the Android store app gets one
 * (`spec/state-reporting.md` § 3). A web page has no host to ask: it fires `azphalt://install` and
 * learns nothing. Without keeping its own books every card says *Get*, including the ones the user
 * just installed, and there is no way to filter what you already have.
 *
 * Never throws. Storage can be disabled or full, and neither is worth failing a browse over — what is
 * lost is nicer labels.
 */
export function loadInventory(): Record<string, InventoryEntry> {
  try {
    const raw = window.localStorage.getItem(INVENTORY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { entries?: InventoryEntry[] };
    const out: Record<string, InventoryEntry> = {};
    for (const e of parsed.entries ?? []) if (e?.id) out[e.id] = e;
    return out;
  } catch {
    // Corrupt storage, or storage switched off. Forgetting is the correct failure here.
    return {};
  }
}

/** Persist `entries`, replacing what was there. Silent no-op where there is nowhere to put it. */
export function saveInventory(entries: Record<string, InventoryEntry>): void {
  try {
    window.localStorage.setItem(INVENTORY_KEY, JSON.stringify({ entries: Object.values(entries) }));
  } catch {
    /* quota, or storage disabled */
  }
}

/**
 * Record a successful handoff.
 *
 * Recorded as `installed` rather than `downloaded`, and the distinction is worth stating: the store
 * did **not** observe an install. It observed that the user pressed Install and that a host claimed
 * the link, which is the last thing a web page can observe. `downloaded` means "wanted and not yet
 * had", which describes that moment worse than `installed` does — the user's next question is "did
 * that work", and "not yet had" answers it wrongly in the common case.
 */
export function recordInstalled(
  inventory: Record<string, InventoryEntry>,
  id: string,
  version: string,
  at?: string,
): Record<string, InventoryEntry> {
  const next = { ...inventory, [id]: { id, version, state: "installed" as const, ...(at ? { at } : {}) } };
  saveInventory(next);
  return next;
}

/**
 * Forget a locally-recorded install.
 *
 * The store's record is a guess (see `recordInstalled`), and a guess with no way to correct it is
 * just a wrong answer that persists. A handoff can succeed — a host claimed the link — and the
 * install still not happen, and on a web visit nothing will ever contradict that. This is how the
 * user says so.
 *
 * Deletes the entry rather than marking it `removed`: `removed` is a *host's* statement that a
 * package was uninstalled, which is a different claim from the store admitting it never knew.
 */
export function forgetInstall(
  inventory: Record<string, InventoryEntry>,
  id: string,
): Record<string, InventoryEntry> {
  const next = { ...inventory };
  delete next[id];
  saveInventory(next);
  return next;
}

/**
 * Whether the viewer has this package.
 *
 * `removed` is kept rather than deleted so a reinstall can be offered, so "has it" is a question
 * about the state and not about the key being present.
 */
export function isHeld(inventory: Record<string, InventoryEntry>, id: string): boolean {
  const s = inventory[id]?.state;
  return s !== undefined && s !== "removed";
}

/**
 * The link a storefront emits for a package.
 *
 * Host-agnostic by construction (`web-handoff.md` § Why a custom scheme): no host is named, so any
 * conforming host may claim it and the OS disambiguates when several do. A pack uses this same shape —
 * it is a package with an id, and the host resolves its members.
 */
export function installLink(id: string, version?: string, repo?: string): string {
  const params = new URLSearchParams();
  params.set("id", id);
  // Always sent when known: the storefront is displaying the version, so making the host re-resolve
  // `latest` would be a round-trip to learn what we already had.
  if (version?.trim()) params.set("version", version);
  if (repo?.trim()) params.set("repo", repo);
  // URLSearchParams form-encodes, which writes a space as '+'. A strict RFC 3986 parser reads '+' as
  // a literal plus, so the id would arrive at the host altered.
  return `azphalt://install?${params.toString().replace(/\+/g, "%20")}`;
}

/** A host worth offering to someone who has none installed. */
export interface HostOption {
  name: string;
  hostId: string;
  installUrl: string;
}

/**
 * The hosts from `catalog` that could run `pkg`, for the "get a host" half of the fallback.
 *
 * An app-scoped package (`targetApps` non-empty) offers only the hosts it names — pitching a
 * Guillotine-only pack at a paint app wastes the user's time in the one place they are already stuck.
 * A listing with no install URL is dropped rather than shown as a dead entry.
 */
export function hostsFor(pkg: HandoffPackage, catalog: HandoffPackage[]): HostOption[] {
  const wanted = new Set(pkg.targetApps ?? []);
  const out: HostOption[] = [];
  const seen = new Set<string>();
  for (const candidate of catalog) {
    const app = candidate.app;
    if (!app) continue;
    // Absent `roles` means `["companion"]`; the API resolves that before serving, but a storefront
    // pointed at an older deployment should not start offering companions as hosts.
    if (!(app.roles ?? ["companion"]).includes("host")) continue;
    if (!app.hostId) continue;
    if (wanted.size > 0 && !wanted.has(app.hostId)) continue;
    const installUrl = app.platforms?.android?.install ?? app.platforms?.pwa?.startUrl;
    if (!installUrl) continue;
    if (seen.has(app.hostId)) continue;
    seen.add(app.hostId);
    out.push({ name: candidate.name, hostId: app.hostId, installUrl });
  }
  return out;
}

/**
 * The conforming download URL — the `.azp` half of the fallback, which works with no link support at
 * all because a host registered for the media type opens the downloaded file directly.
 *
 * Relative on purpose: a conforming storefront serving this bundle from its own domain should hand
 * out its own bytes, not the flagship registry's.
 */
export function downloadUrl(id: string, version: string): string {
  return `/packages/${encodeURIComponent(id)}/versions/${encodeURIComponent(version)}/download`;
}

/**
 * Fire the link and report whether anything took it.
 *
 * `true` means a host claimed it and the user has left. `false` means nothing did, and the caller
 * should show the fallback (`web-handoff.md` § When no host is installed).
 *
 * The attempt is made unconditionally — there is no "is a host likely on this platform" check first,
 * because any such check is a list of platforms someone thought hosts existed on, and it fails closed
 * against exactly the hosts it has not heard of yet.
 *
 * Departure is recorded by listeners rather than sampled at the end: a user can leave for a host and
 * return well inside the wait window, and by then `visibilityState` is "visible" again. Sampling
 * would read that as "nothing claimed it" and show the fallback to somebody who just installed.
 */
export function attemptHandoff(link: string): Promise<boolean> {
  return new Promise((resolve) => {
    let left = false;
    const mark = () => {
      left = true;
    };
    const onVisibility = () => {
      if (document.visibilityState !== "visible") left = true;
    };

    window.addEventListener("pagehide", mark);
    window.addEventListener("blur", mark);
    document.addEventListener("visibilitychange", onVisibility);

    const cleanup = () => {
      window.removeEventListener("pagehide", mark);
      window.removeEventListener("blur", mark);
      document.removeEventListener("visibilitychange", onVisibility);
    };

    try {
      // `location.href` rather than an iframe: modern browsers treat a top-level navigation to an
      // unhandled scheme as a no-op, which is the behaviour this whole dance is built around. An
      // iframe would be blocked outright in several of them.
      window.location.href = link;
    } catch {
      // A navigation the browser refuses is "no host", not an error to surface.
      cleanup();
      resolve(false);
      return;
    }

    window.setTimeout(() => {
      cleanup();
      resolve(left);
    }, HANDOFF_WAIT_MS);
  });
}
