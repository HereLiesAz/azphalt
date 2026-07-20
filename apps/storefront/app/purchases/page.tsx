'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'loaded'; purchases: Purchase[] }
  | { kind: 'error'; message: string };

/**
 * The buyer's "my purchases" recovery view. Enter a buyer id and list every license issued to it
 * (`GET /api/purchases?subject=…`); each row carries the Bearer token to download again, so a lost
 * `/checkout/success` token isn't a dead end.
 */
function Purchases() {
  const params = useSearchParams();
  const [subject, setSubject] = useState(params.get('subject') ?? '');
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async (id: string) => {
    if (!id) return;
    setState({ kind: 'loading' });
    try {
      const res = await fetch(`/api/purchases?subject=${encodeURIComponent(id)}`);
      const data = await res.json();
      if (!res.ok) {
        setState({ kind: 'error', message: data.error ?? `Lookup failed (${res.status})` });
        return;
      }
      setState({ kind: 'loaded', purchases: data.purchases ?? [] });
    } catch (e) {
      setState({ kind: 'error', message: (e as Error).message });
    }
  }, []);

  useEffect(() => {
    const id = params.get('subject');
    if (id) load(id);
  }, [params, load]);

  const copy = useCallback(async (token: string, sessionId: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(sessionId);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  const [downloading, setDownloading] = useState<string | null>(null);

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
          Look up the licenses issued to your buyer id and recover a download token if you lost the one
          shown at checkout.
        </p>

        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="buyer_yourname"
            onKeyDown={(e) => e.key === 'Enter' && load(subject.trim())}
            style={{ flex: 1, padding: 12, background: SURFACE, color: ON, border: '1px solid #2a2436', borderRadius: 10, fontSize: 15 }}
          />
          <button
            onClick={() => load(subject.trim())}
            disabled={!subject.trim()}
            style={{ padding: '10px 18px', background: subject.trim() ? ACCENT : IDLE, color: subject.trim() ? '#161221' : MUTED, border: 'none', borderRadius: 10, fontWeight: 600, cursor: subject.trim() ? 'pointer' : 'default' }}
          >
            Look up
          </button>
        </div>

        <div style={{ marginTop: 20 }}>
          {state.kind === 'loading' && <p style={{ color: MUTED }}>Loading…</p>}
          {state.kind === 'error' && (
            <div style={{ padding: 16, background: SURFACE, borderRadius: 12, border: '1px solid #2a2436' }}>
              <p style={{ color: MUTED, margin: 0 }}>{state.message}</p>
            </div>
          )}
          {state.kind === 'loaded' && state.purchases.length === 0 && (
            <p style={{ color: MUTED }}>No purchases found for that buyer id.</p>
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

export default function PurchasesPage() {
  return (
    <Suspense fallback={<main style={{ minHeight: '100vh', background: BG }} />}>
      <Purchases />
    </Suspense>
  );
}
