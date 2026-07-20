'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageNav } from '../../../components/PageNav';

const ACCENT = '#BBA6FF';
const BG = '#0C0C13';
const SURFACE = '#12121B';
const ON = '#E7E1EE';
const MUTED = '#A29CAD';
const OK = '#7DDE92';
const WARN = '#F0B24A';

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'not_onboarded' }
  | { kind: 'onboarded'; chargesEnabled: boolean; payoutsEnabled: boolean; detailsSubmitted: boolean; accountId: string }
  | { kind: 'error'; message: string };

/**
 * Seller-facing Stripe Connect onboarding. A seller enters their marketplace id and is sent to
 * Stripe's hosted Express onboarding (`POST /api/connect/onboard`); on return, this page re-checks
 * their status (`GET /api/connect/status?refresh=1`) and shows whether they can accept charges and
 * receive payouts yet.
 */
function ConnectOnboard() {
  const params = useSearchParams();
  const [sellerId, setSellerId] = useState(params.get('sellerId') ?? '');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [busy, setBusy] = useState(false);

  const check = useCallback(async (id: string) => {
    if (!id) return;
    setStatus({ kind: 'loading' });
    try {
      const res = await fetch(`/api/connect/status?sellerId=${encodeURIComponent(id)}&refresh=1`);
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: 'error', message: data.error ?? `Status check failed (${res.status})` });
        return;
      }
      if (!data.onboarded) {
        setStatus({ kind: 'not_onboarded' });
        return;
      }
      setStatus({
        kind: 'onboarded',
        chargesEnabled: data.chargesEnabled,
        payoutsEnabled: data.payoutsEnabled,
        detailsSubmitted: data.detailsSubmitted,
        accountId: data.accountId,
      });
    } catch (e) {
      setStatus({ kind: 'error', message: (e as Error).message });
    }
  }, []);

  // If we arrived with a sellerId (including the return from Stripe), check status immediately.
  useEffect(() => {
    const id = params.get('sellerId');
    if (id) check(id);
  }, [params, check]);

  const startOnboarding = useCallback(async () => {
    if (!sellerId.trim()) return;
    setBusy(true);
    try {
      const res = await fetch('/api/connect/onboard', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sellerId: sellerId.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url; // hand off to Stripe-hosted onboarding
        return;
      }
      setStatus({ kind: 'error', message: data.error ?? `Could not start onboarding (${res.status})` });
    } catch (e) {
      setStatus({ kind: 'error', message: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }, [sellerId]);

  const pill = (label: string, ok: boolean) => (
    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, fontSize: 13, marginRight: 8, background: ok ? 'rgba(125,222,146,0.14)' : 'rgba(240,178,74,0.14)', color: ok ? OK : WARN }}>
      {ok ? '✓' : '…'} {label}
    </span>
  );

  return (
    <main style={{ minHeight: '100vh', background: BG, color: ON, display: 'flex', justifyContent: 'center', padding: '48px 20px' }}>
      <div style={{ width: '100%', maxWidth: 640 }}>
        <PageNav current="sell" />
        <h1 style={{ marginTop: 16, fontSize: 28, fontWeight: 700 }}>Become a seller</h1>
        <p style={{ color: MUTED, marginTop: 8 }}>
          Onboard with Stripe to sell consigned packages. Stripe hosts the sign-up and verification; your
          payouts route straight to your connected account. We never see your identity documents.
        </p>

        <div style={{ marginTop: 24, padding: 20, background: SURFACE, borderRadius: 14, border: '1px solid #2a2436' }}>
          <label htmlFor="sellerId" style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 8 }}>
            Your seller id
          </label>
          <input
            id="sellerId"
            value={sellerId}
            onChange={(e) => setSellerId(e.target.value)}
            placeholder="seller_yourname"
            style={{ width: '100%', padding: 12, background: BG, color: ON, border: '1px solid #2a2436', borderRadius: 10, fontSize: 15 }}
          />
          <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
            <button
              onClick={startOnboarding}
              disabled={busy || !sellerId.trim()}
              style={{ padding: '10px 16px', background: ACCENT, color: '#161221', border: 'none', borderRadius: 10, fontWeight: 600, cursor: busy || !sellerId.trim() ? 'default' : 'pointer', opacity: busy || !sellerId.trim() ? 0.6 : 1 }}
            >
              {busy ? 'Starting…' : 'Onboard with Stripe'}
            </button>
            <button
              onClick={() => check(sellerId.trim())}
              disabled={!sellerId.trim()}
              style={{ padding: '10px 16px', background: 'transparent', color: ON, border: '1px solid #2a2436', borderRadius: 10, fontWeight: 600, cursor: sellerId.trim() ? 'pointer' : 'default' }}
            >
              Check status
            </button>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          {status.kind === 'loading' && <p style={{ color: MUTED }}>Checking status…</p>}
          {status.kind === 'not_onboarded' && (
            <p style={{ color: MUTED }}>No connected account yet — click <strong>Onboard with Stripe</strong> to begin.</p>
          )}
          {status.kind === 'error' && (
            <div style={{ padding: 16, background: SURFACE, borderRadius: 12, border: '1px solid #2a2436' }}>
              <p style={{ color: WARN, margin: 0 }}>{status.message}</p>
            </div>
          )}
          {status.kind === 'onboarded' && (
            <div style={{ padding: 16, background: SURFACE, borderRadius: 12, border: '1px solid #2a2436' }}>
              <p style={{ margin: '0 0 12px', color: status.chargesEnabled ? OK : WARN, fontWeight: 600 }}>
                {status.chargesEnabled ? 'Ready to sell.' : 'Onboarding in progress — finish the Stripe steps to start selling.'}
              </p>
              <div>
                {pill('Details submitted', status.detailsSubmitted)}
                {pill('Charges enabled', status.chargesEnabled)}
                {pill('Payouts enabled', status.payoutsEnabled)}
              </div>
              {!status.chargesEnabled && (
                <button
                  onClick={startOnboarding}
                  disabled={busy}
                  style={{ marginTop: 14, padding: '10px 16px', background: ACCENT, color: '#161221', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}
                >
                  Continue onboarding
                </button>
              )}
              <p style={{ color: MUTED, fontSize: 12, marginTop: 12, fontFamily: 'ui-monospace, monospace' }}>{status.accountId}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ConnectOnboardPage() {
  return (
    <Suspense fallback={<main style={{ minHeight: '100vh', background: BG }} />}>
      <ConnectOnboard />
    </Suspense>
  );
}
