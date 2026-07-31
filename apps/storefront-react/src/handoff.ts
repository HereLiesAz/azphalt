/**
 * The web→host handoff from `spec/web-handoff.md`.
 *
 * The sibling of the Compose storefront's `models/InstallHandoff.kt` + `network/WasmHandoff.kt`, and
 * deliberately the same decisions in the same order — two storefronts that disagree about what
 * pressing Install does would be two different products wearing one name.
 */
import type { PackageSummary } from "./api";

/** How long to wait before concluding nothing claimed the link. See `attemptHandoff`. */
const HANDOFF_WAIT_MS = 1_400;

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
export function hostsFor(pkg: PackageSummary, catalog: PackageSummary[]): HostOption[] {
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
