/**
 * Renders a companion app's (`kind: "app"`) install affordances and handoff contract from its
 * `manifest.app` block (see `companion-app.md`). A companion carries no `/code` and no assets — it is a
 * header that tells a host how to install an external Android app / PWA and invoke it over a handoff.
 * The store surfaces that: how to get the app on each platform (Play Store link, PWA start URL), the
 * version floors, and each function the app offers (action, input → output, transports).
 */
import type { AppManifest, Handoff } from "@azphalt/sdk";
import { formatHandoffIO, safeHttpUrl } from "../lib/format";

/** One handoff row: the function's name/action, its input → output, transports, and any version floor. */
function HandoffRow({ handoff }: { handoff: Handoff }) {
  const platforms = Object.keys(handoff.transport);
  const floor = handoff.minAppVersion;
  return (
    <li className="handoff">
      <div className="handoff-head">
        <span className="handoff-name">{handoff.name ?? handoff.id}</span>
        <span className="chip">{handoff.action}</span>
      </div>
      <dl className="handoff-io">
        <dt>Sends</dt>
        <dd>{formatHandoffIO(handoff.input)}</dd>
        <dt>Returns</dt>
        <dd>{handoff.output ? formatHandoffIO(handoff.output) : "fire-and-forget"}</dd>
        <dt>Via</dt>
        <dd>{platforms.join(" · ")}</dd>
        {floor ? (
          <>
            <dt>Needs app</dt>
            <dd>
              {[
                floor.android != null ? `Android versionCode ≥ ${floor.android}` : null,
                floor.pwa ? `PWA deployed ≥ ${floor.pwa.slice(0, 10)}` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </dd>
          </>
        ) : null}
      </dl>
    </li>
  );
}

export function CompanionPanel({ app }: { app: AppManifest }) {
  const { android, pwa } = app.platforms;
  return (
    <div className="panel companion">
      <h3>Companion app</h3>
      <p className="detail-sub" style={{ marginBottom: 14 }}>
        Runs as a separate app in the OS&apos;s own sandbox with its own permissions. azphalt standardizes
        only the <strong>handoff</strong> — the host launches it, it hands a validated result back.
      </p>

      <div className="companion-platforms">
        {android ? (
          <div className="companion-platform">
            <div className="companion-platform-head">
              <span className="platform-tag android">Android</span>
              {android.minSdk != null ? <span className="muted">min SDK {android.minSdk}</span> : null}
            </div>
            <div className="id">{android.packageId}</div>
            {android.minVersionCode != null ? (
              <div className="muted">requires versionCode ≥ {android.minVersionCode}</div>
            ) : null}
            {safeHttpUrl(android.install) ? (
              <a className="btn primary" href={safeHttpUrl(android.install)} rel="noreferrer noopener">
                Get it on Google Play
              </a>
            ) : null}
          </div>
        ) : null}

        {pwa ? (
          <div className="companion-platform">
            <div className="companion-platform-head">
              <span className="platform-tag pwa">PWA</span>
              {pwa.version ? <span className="muted">deployed ≥ {pwa.version.slice(0, 10)}</span> : null}
            </div>
            {pwa.startUrl ? <div className="id">{pwa.startUrl}</div> : null}
            <div className="companion-links">
              {safeHttpUrl(pwa.startUrl) ? (
                <a className="btn primary" href={safeHttpUrl(pwa.startUrl)} rel="noreferrer noopener">
                  Open web app
                </a>
              ) : null}
              {safeHttpUrl(pwa.manifestUrl) ? (
                <a className="btn" href={safeHttpUrl(pwa.manifestUrl)} rel="noreferrer noopener">
                  Install
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <h4 className="companion-subhead">Handoffs</h4>
      <ul className="handoffs">
        {app.handoffs.map((h) => (
          <HandoffRow key={h.id} handoff={h} />
        ))}
      </ul>
    </div>
  );
}
