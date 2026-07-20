'use client';

import { useCallback, useEffect, useState } from 'react';
import { PageNav } from '../../components/PageNav';

const BG = '#0C0C13';
const SURFACE = '#12121B';
const ON = '#E7E1EE';
const MUTED = '#A29CAD';
const WARN = '#F0B24A';
const IDLE = '#2a2436';

interface Report {
  packageId: string;
  version?: string;
  reason: string;
  detail?: string;
  reportedAt: string;
  trusted?: boolean;
}

type State =
  | { kind: 'loading' }
  | { kind: 'loaded'; reports: Report[] }
  | { kind: 'error'; message: string };

/**
 * The moderation queue — every filed report, newest-first (`GET /api/reports`). Read-only in this
 * reference storefront, and unauthenticated (a production deploy gates it behind a moderator session;
 * the spec's `GET /reports` is authenticated).
 */
export default function ModerationPage() {
  const [state, setState] = useState<State>({ kind: 'loading' });

  const load = useCallback(async () => {
    setState({ kind: 'loading' });
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      if (!res.ok) {
        setState({ kind: 'error', message: data.error ?? `Load failed (${res.status})` });
        return;
      }
      setState({ kind: 'loaded', reports: data.reports ?? [] });
    } catch (e) {
      setState({ kind: 'error', message: (e as Error).message });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <main style={{ minHeight: '100vh', background: BG, color: ON, display: 'flex', justifyContent: 'center', padding: '48px 20px' }}>
      <div style={{ width: '100%', maxWidth: 760 }}>
        <PageNav />
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>Moderation queue</h1>
          <button onClick={load} style={{ padding: '6px 12px', background: 'transparent', color: MUTED, border: `1px solid ${IDLE}`, borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
            Refresh
          </button>
        </div>
        <p style={{ color: MUTED, marginTop: 8 }}>
          Filed reports, newest first. A web report is untrusted — it queues here but never auto-quarantines
          on its own; only trusted reports (a counter-signed host / verified account) trip the threshold.
        </p>

        <div style={{ marginTop: 20 }}>
          {state.kind === 'loading' && <p style={{ color: MUTED }}>Loading…</p>}
          {state.kind === 'error' && (
            <div style={{ padding: 16, background: SURFACE, borderRadius: 12, border: `1px solid ${IDLE}` }}>
              <p style={{ color: WARN, margin: 0 }}>{state.message}</p>
            </div>
          )}
          {state.kind === 'loaded' && state.reports.length === 0 && <p style={{ color: MUTED }}>No reports filed.</p>}
          {state.kind === 'loaded' &&
            state.reports.map((r, i) => (
              <div key={`${r.packageId}-${r.reportedAt}-${i}`} style={{ marginBottom: 12, padding: 16, background: SURFACE, borderRadius: 12, border: `1px solid ${IDLE}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 15 }}>{r.packageId}{r.version ? ` @ ${r.version}` : ''}</strong>
                  <span style={{ color: MUTED, fontSize: 12 }}>{new Date(r.reportedAt).toLocaleString()}</span>
                </div>
                <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 12, background: 'rgba(240,178,74,0.14)', color: WARN }}>{r.reason}</span>
                  <span style={{ fontSize: 12, color: MUTED }}>{r.trusted ? 'trusted' : 'untrusted'}</span>
                </div>
                {r.detail && <p style={{ color: MUTED, fontSize: 13, marginTop: 10, marginBottom: 0, whiteSpace: 'pre-wrap' }}>{r.detail}</p>}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
