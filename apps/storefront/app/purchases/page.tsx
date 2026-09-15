'use client';

import { useCallback, useEffect, useState } from 'react';
import { PageNav } from '../../components/PageNav';

const ACCENT = '#BBA6FF';
const BG = '#0C0C13';
const SURFACE = '#12121B';
const ON = '#E7E1EE';
const MUTED = '#A29CAD';
const IDLE = '#2a2436';

interface Purchase {
  packageId: string;
  sessionId: string;
  issuedAt: string;
  token: string;
}

type State =
  | { kind: 'loading' }
  | { kind: 'loaded'; purchases: Purchase[] }
  | { kind: 'error'; message: string };

/**
 * The current browser's purchase-recovery view. `/api/purchases` authenticates the browser with the
 * signed, HttpOnly buyer session established by checkout; there is deliberately no buyer-id lookup
 * field because knowing an opaque database id is not proof that the licences belong to you.
 */
export default function PurchasesPage() {
  const [state, setState] = useState<State>({ kind: 'loading' });
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const load = useCallback(async () => {
    setState({ kind: 'loading' });
    try {
      const res = await fetch('/api/purchases', { credentials: 'same-origin' });
      const data = await res.json();
      if (!res.ok) {
        setState({
          kind: 'error',
          message:
            res.status === 401
              ? 'No purchase history is attached to this browser yet.'
              : data.error ?? `Lookup failed (${res.status})`,
        });
        return;
      }
      setState({ kind: 'loaded', purchases: data.purchases ?? [] });
    } catch (e) {
      setState({ kind: 'error', message: (e as Error).message });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const copy = useCallback(async (token: string, sessionId: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(sessionId);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  // A real, authenticated download: a plain <a> click can't attach the Bearer token, so fetch the
  // gated bytes with the token and save the returned blob.
  const download = useCallback(async (packageId: string, token: string) => {
    setDownloading(packageId);
    try {
      const res = await fetch(`/api/download/${encodeURIComponent(packageId)}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        alert(`Download failed (${res.status})`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${packageId}.azp`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setDownloading(null);
    }
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: BG, color: ON, display: 'flex', justifyContent: 'center', padding: '48px 20px' }}>
      <div style={{ width: '100%', maxWidth: 720 }}>
        <PageNav current="purchases" />
        <h1 style={{ marginTop: 16, fontSize: 28, fontWeight: 700 }}>Your purchases</h1>
        <p style={{ color: MUTED, marginTop: 8 }}>
          Licences bought in this browser, plus purchases returned here from Stripe after a desktop checkout.
        </p>

        <div style={{ marginTop: 20 }}>
          {state.kind === 'loading' && <p style={{ color: MUTED }}>Loading…</p>}
          {state.kind === 'error' && (
            <div style={{ padding: 16, background: SURFACE, borderRadius: 12, border: '1px solid #2a2436' }}>
              <p style={{ color: MUTED, margin: 0 }}>{state.message}</p>
              <button
                onClick={() => void load()}
                style={{ marginTop: 12, padding: '8px 14px', background: 'transparent', color: ON, border: `1px solid ${IDLE}`, borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
              >
                Retry
              </button>
            </div>
          )}
          {state.kind === 'loaded' && state.purchases.length === 0 && (
            <p style={{ color: MUTED }}>No purchases yet.</p>
          )}
          {state.kind === 'loaded' &&
            state.purchases.map((p) => (
              <div key={p.sessionId} style={{ marginBottom: 12, padding: 16, background: SURFACE, borderRadius: 12, border: '1px solid #2a2436' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <strong style={{ fontSize: 15 }}>{p.packageId}</strong>
                  <span style={{ color: MUTED, fontSize: 12 }}>{new Date(p.issuedAt).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button
                    onClick={() => download(p.packageId, p.token)}
                    disabled={downloading === p.packageId}
                    style={{ padding: '8px 14px', background: ACCENT, color: '#161221', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13, opacity: downloading === p.packageId ? 0.6 : 1 }}
                  >
                    {downloading === p.packageId ? 'Downloading…' : 'Download .azp'}
                  </button>
                  <button
                    onClick={() => copy(p.token, p.sessionId)}
                    style={{ marginLeft: 'auto', padding: '8px 14px', background: 'transparent', color: ON, border: `1px solid ${IDLE}`, borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
                    title="The Authorization: Bearer token, if you want to download via the API directly"
                  >
                    {copied === p.sessionId ? 'Copied ✓' : 'Copy token'}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
