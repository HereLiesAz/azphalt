/**
 * What the marketplace shows when pressing Install found no host — `spec/web-handoff.md` § When no
 * host is installed.
 *
 * It used to say "Download the package and open it in a host" with a download button and nothing
 * else: no way to get a host, and no retry for the user who then installed one. The rows, their
 * labels and their order now come from `requiredActionsFor` in `@azphalt/web-handoff` — the same
 * decision the storefronts make — and this only draws them.
 *
 * Deliberately not phrased as an error: downloading the package is a successful outcome on a device
 * with no host.
 */
import {
  downloadUrl,
  requiredActionsFor,
  statusLineFor,
  type HostOption,
  type NotInstalled,
} from '@azphalt/web-handoff';

export type HostDirectory =
  | { status: 'loading' }
  | { status: 'ready'; hosts: HostOption[] }
  /** The directory could not be read. The fallback row still gives the user somewhere to go. */
  | { status: 'error' };

/** The store whose page lists apps that can run extensions — this app is not served from it. */
export const STORE_ORIGIN = 'https://www.azphalt.store';

export interface NoHostPackage {
  id: string;
  name: string;
  version: string;
  targetApps?: string[];
}

export function NoHostPanel({
  pkg,
  directory,
  onRetry,
  onDismiss,
}: {
  pkg: NoHostPackage;
  directory: HostDirectory;
  onRetry: () => void;
  onDismiss: () => void;
}) {
  const hosts = directory.status === 'ready' ? directory.hosts : [];
  const state: NotInstalled = { type: 'host-missing', hosts, scopedTo: pkg.targetApps ?? [] };
  const actions = requiredActionsFor(state, pkg.name, STORE_ORIGIN);
  const retry = actions.find((a) => a.kind === 'retry-handoff');
  // While the directory loads, the rows that depend on it are held back rather than shown as a
  // "find an app" that is about to be replaced by the real list.
  const rows = actions.filter(
    (a) => a.kind !== 'retry-handoff' && !(directory.status === 'loading' && a.kind === 'find-host'),
  );
  return (
    <div
      className="empty-state not-installed-panel"
      role="group"
      aria-label={`Install ${pkg.name}`}
      style={{ marginTop: 16, padding: 16, border: '1px solid var(--md-sys-color-outline)' }}
    >
      <p style={{ margin: 0 }}>{statusLineFor(state)}</p>
      {directory.status === 'loading' && (
        <p role="status" style={{ margin: '8px 0 0' }}>Looking for apps that can run this…</p>
      )}
      {directory.status === 'error' && (
        <p role="alert" style={{ margin: '8px 0 0' }}>Couldn’t load the list of apps.</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
        {rows.map((action, i) => (
          <a
            key={`${action.kind}:${action.url ?? i}`}
            className={`btn ${i === 0 ? 'btn-primary' : 'btn-surface'}`}
            aria-label={action.description}
            href={action.kind === 'download-package' ? downloadUrl(pkg.id, pkg.version) : action.url}
            {...(action.kind === 'download-package'
              ? { download: true }
              : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {action.label}
          </a>
        ))}
        <div style={{ display: 'flex', gap: 12 }}>
          {retry && (
            <button type="button" className="btn btn-surface" aria-label={retry.description} onClick={onRetry}>
              {retry.label}
            </button>
          )}
          <button type="button" className="btn btn-surface" onClick={onDismiss}>Close</button>
        </div>
      </div>
    </div>
  );
}
