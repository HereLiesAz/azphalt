/**
 * The buttons that resolve a "not installed" state.
 *
 * What each says, what it opens and whether it can be pressed comes from `@azphalt/web-handoff`'s
 * `requiredActionsFor` / `buttonStateFor` (pure and tested); this file only draws them. It imports
 * nothing from `App.tsx`, so it can be rendered on its own — the tests do exactly that.
 */
import type { ReactNode } from "react";
import {
  buttonStateFor,
  downloadUrl,
  requiredActionsFor,
  statusLineFor,
  type ActionPhase,
  type HostOption,
  type NotInstalled,
  type RequiredAction,
} from "@azphalt/web-handoff";

/** A spinner that stops spinning for people who asked for less motion (see `.spinner` in theme.css). */
export function Spinner() {
  return <span className="spinner" aria-hidden="true" />;
}

/** The error under a button, announced when it appears rather than waiting to be found. */
export function ActionError({ message }: { message: string }) {
  return (
    <div role="alert" className="action-error">
      {message}
    </div>
  );
}

/**
 * One action as a control.
 *
 * Actions that open a page are real links (so middle-click, copy-link and screen-reader link lists
 * work, and a popup blocker cannot eat them); the rest are buttons. Both are at least 48px tall, carry
 * the spoken description as their accessible name, and show progress and failure the same way.
 */
export function ActionControl({
  action,
  phase = { kind: "idle" },
  primary = false,
  href,
  onPress,
}: {
  action: RequiredAction;
  phase?: ActionPhase;
  primary?: boolean;
  /** Overrides the action's own url — used for the package download, whose url is per package. */
  href?: string;
  onPress?: () => void;
}) {
  const state = buttonStateFor(action, phase);
  const target = href ?? action.url;
  const style = primary
    ? { background: "var(--primary)", color: "var(--on-primary)" }
    : { background: "var(--surface-highest)", color: "var(--on-surface)" };
  const body: ReactNode = (
    <>
      {state.showProgress && <Spinner />}
      {state.label}
    </>
  );
  return (
    <>
      {target !== undefined ? (
        <a
          href={target}
          className="action"
          aria-label={state.description}
          aria-busy={state.showProgress || undefined}
          style={style}
          {...(action.kind === "download-package" ? { download: true } : {})}
          {...(action.kind === "install-host" || action.kind === "find-host"
            ? // Listings are third-party URLs from the registry — deny them window.opener.
              { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {body}
        </a>
      ) : (
        <button
          type="button"
          className="action"
          aria-label={state.description}
          aria-busy={state.showProgress || undefined}
          disabled={state.disabled}
          style={style}
          onClick={onPress}
        >
          {body}
        </button>
      )}
      {state.error && <ActionError message={state.error} />}
    </>
  );
}

/** Just enough of a package for the sheet. */
export interface SheetPackage {
  id: string;
  name: string;
  version: string;
  targetApps?: string[];
}

/**
 * What the user sees when pressing Install found no host — `spec/web-handoff.md` § When no host is
 * installed. The body of a dialog; the dialog itself (focus trap, Escape) is the caller's.
 *
 * Every row is an action that does one thing, and it is never empty: a package whose directory entry
 * is missing still gets "Find an app that runs extensions". Deliberately not phrased as an error —
 * downloading the package *is* a successful outcome on a device with no host.
 */
export function NoHostSheetBody({
  pkg,
  hosts,
  onRetry,
  onDismiss,
}: {
  pkg: SheetPackage;
  hosts: HostOption[];
  onRetry: () => void;
  onDismiss: () => void;
}) {
  const state: NotInstalled = { type: "host-missing", hosts, scopedTo: pkg.targetApps ?? [] };
  const actions = requiredActionsFor(state, pkg.name);
  const retry = actions.find((a) => a.kind === "retry-handoff");
  const rows = actions.filter((a) => a.kind !== "retry-handoff");
  return (
    <>
      <p style={{ color: "var(--on-surface-variant)", marginTop: 8 }}>{statusLineFor(state)}</p>
      {rows.map((action, i) => (
        <ActionControl
          key={`${action.kind}:${action.url ?? i}`}
          action={action}
          primary={i === 0}
          href={action.kind === "download-package" ? downloadUrl(pkg.id, pkg.version) : undefined}
        />
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        {retry && (
          <button type="button" className="chip" aria-label={retry.description} onClick={onRetry}>
            {retry.label}
          </button>
        )}
        <button type="button" className="chip" onClick={onDismiss}>Close</button>
      </div>
    </>
  );
}

/**
 * What to do when the "Installed" filter matches nothing: nothing is installed yet, and the one thing
 * that changes that is to go and install something.
 */
export function NothingInstalled({ onBrowse }: { onBrowse: () => void }) {
  const state: NotInstalled = { type: "nothing-installed" };
  const [action] = requiredActionsFor(state, "");
  return (
    <div style={{ textAlign: "center", padding: 60, color: "var(--on-surface-variant)" }}>
      <p style={{ margin: "0 0 16px" }}>{statusLineFor(state)}</p>
      <button
        type="button"
        className="chip"
        aria-label={action!.description}
        onClick={onBrowse}
        style={{ background: "var(--primary)", color: "var(--on-primary)", minHeight: 48 }}
      >
        {action!.label}
      </button>
    </div>
  );
}
