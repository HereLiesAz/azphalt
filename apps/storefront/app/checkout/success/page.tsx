'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const ACCENT = '#BBA6FF';
const BG = '#0C0C13';
const SURFACE = '#12121B';
const ON = '#E7E1EE';
const MUTED = '#A29CAD';
const OK = '#7DDE92';

type State =
  | { kind: 'loading' }
  | { kind: 'pending' }
  | { kind: 'ready'; token: string }
  | { kind: 'error'; message: string };

/**
 * The buyer's return page after a Stripe checkout. Stripe redirects here with
 * `?session_id={CHECKOUT_SESSION_ID}`; we poll `GET /api/checkout/session/[id]` until the (possibly
 * async) fulfilment webhook has minted the entitlement, then surface the Bearer token the buyer uses
 * to download. Nothing is minted here — the page only reads a token fulfilment already issued.
 */
function CheckoutSuccess() {
  const params = useSearchParams();
  const sessionId = params.get('session_id') ?? '';
  const [state, setState] = useState<State>({ kind: 'loading' });
  const [copied, setCopied] = useState(false);
  const tries = useRef(0);

  useEffect(() => {
    if (!sessionId) {
      setState({ kind: 'error', message: 'No checkout session in the URL.' });
      return;
    }
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    const poll = async () => {
      try {
        const res = await fetch(`/api/checkout/session/${encodeURIComponent(sessionId)}`);
        if (!alive) return;
        if (res.status === 200) {
          const { token } = await res.json();
          setState({ kind: 'ready', token });
          return;
        }
        // 202 (pending) — the webhook hasn't fulfilled yet. Back off and retry for a while.
        tries.current += 1;
        if (tries.current > 20) {
          setState({
            kind: 'error',
            message: 'Payment received, but fulfilment is taking longer than expected. It should appear shortly.',
          });
          return;
        }
        setState({ kind: 'pending' });
        timer = setTimeout(poll, 1500);
      } catch (e) {
        if (alive) setState({ kind: 'error', message: (e as Error).message });
      }
    };
    poll();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [sessionId]);

  const copy = useCallback(async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — the token is visible to select manually */
    }
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: BG, color: ON, display: 'flex', justifyContent: 'center', padding: '48px 20px' }}>
      <div style={{ width: '100%', maxWidth: 640 }}>
        <a href="/" style={{ color: MUTED, textDecoration: 'none', fontSize: 14 }}>← Back to the store</a>
        <h1 style={{ marginTop: 24, fontSize: 28, fontWeight: 700 }}>Thanks for your purchase</h1>

        {(state.kind === 'loading' || state.kind === 'pending') && (
          <p style={{ color: MUTED, marginTop: 16 }}>
            Confirming your payment and issuing your license…
          </p>
        )}

        {state.kind === 'error' && (
          <div style={{ marginTop: 16, padding: 16, background: SURFACE, borderRadius: 12, border: '1px solid #2a2436' }}>
            <p style={{ color: MUTED, margin: 0 }}>{state.message}</p>
          </div>
        )}

        {state.kind === 'ready' && (
          <div style={{ marginTop: 16 }}>
            <p style={{ color: OK, fontWeight: 600 }}>Your license is ready.</p>
            <p style={{ color: MUTED, fontSize: 14 }}>
              Present this token as an <code>Authorization: Bearer &lt;token&gt;</code> header when downloading the
              package. Keep it — it is your proof of purchase.
            </p>
            <textarea
              readOnly
              value={state.token}
              onFocus={(e) => e.currentTarget.select()}
              style={{
                width: '100%',
                minHeight: 120,
                marginTop: 12,
                padding: 12,
                background: SURFACE,
                color: ON,
                border: '1px solid #2a2436',
                borderRadius: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 12,
                resize: 'vertical',
              }}
            />
            <button
              onClick={() => copy(state.token)}
              style={{
                marginTop: 12,
                padding: '10px 16px',
                background: ACCENT,
                color: '#161221',
                border: 'none',
                borderRadius: 10,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copied ? 'Copied ✓' : 'Copy token'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  // useSearchParams requires a Suspense boundary in the app router.
  return (
    <Suspense fallback={<main style={{ minHeight: '100vh', background: BG }} />}>
      <CheckoutSuccess />
    </Suspense>
  );
}
