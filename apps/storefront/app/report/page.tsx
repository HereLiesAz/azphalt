'use client';

import { Suspense, useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageNav } from '../../components/PageNav';

const ACCENT = '#BBA6FF';
const BG = '#0C0C13';
const SURFACE = '#12121B';
const ON = '#E7E1EE';
const MUTED = '#A29CAD';
const OK = '#7DDE92';
const IDLE = '#2a2436';

const REASONS = ['malware', 'clone', 'deceptive', 'secret-leak', 'broken', 'other'] as const;

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

/**
 * File an abuse/quality report against a package (`POST /api/reports`). A web report is untrusted —
 * it queues for moderation review but never auto-quarantines on its own (marketplace-integrity § 2).
 */
function ReportForm() {
  const params = useSearchParams();
  const [packageId, setPackageId] = useState(params.get('packageId') ?? '');
  const [reason, setReason] = useState<(typeof REASONS)[number]>('malware');
  const [detail, setDetail] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });

  const submit = useCallback(async () => {
    if (!packageId.trim()) return;
    setState({ kind: 'sending' });
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ packageId: packageId.trim(), reason, detail: detail.trim() || undefined }),
      });
      const data = await res.json();
      if (res.status === 201) setState({ kind: 'sent' });
      else setState({ kind: 'error', message: data.error ?? `Report failed (${res.status})` });
    } catch (e) {
      setState({ kind: 'error', message: (e as Error).message });
    }
  }, [packageId, reason, detail]);

  const field: React.CSSProperties = {
    width: '100%', padding: 12, background: SURFACE, color: ON, border: `1px solid ${IDLE}`, borderRadius: 10, fontSize: 15,
  };

  return (
    <main style={{ minHeight: '100vh', background: BG, color: ON, display: 'flex', justifyContent: 'center', padding: '48px 20px' }}>
      <div style={{ width: '100%', maxWidth: 640 }}>
        <PageNav />
        <h1 style={{ marginTop: 16, fontSize: 28, fontWeight: 700 }}>Report a package</h1>
        <p style={{ color: MUTED, marginTop: 8 }}>
          Flag a package for malware, deception, a clone, a leaked secret, or breakage. Reports queue for
          moderation review.
        </p>

        {state.kind === 'sent' ? (
          <div style={{ marginTop: 24, padding: 16, background: SURFACE, borderRadius: 12, border: `1px solid ${IDLE}` }}>
            <p style={{ color: OK, fontWeight: 600, margin: 0 }}>Report filed. Thank you — it&apos;s queued for review.</p>
          </div>
        ) : (
          <div style={{ marginTop: 24, display: 'grid', gap: 14 }}>
            <div>
              <label htmlFor="pkg" style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6 }}>Package id</label>
              <input id="pkg" value={packageId} onChange={(e) => setPackageId(e.target.value)} placeholder="com.acme.thing" style={field} />
            </div>
            <div>
              <label htmlFor="reason" style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6 }}>Reason</label>
              <select id="reason" value={reason} onChange={(e) => setReason(e.target.value as (typeof REASONS)[number])} style={field}>
                {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="detail" style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6 }}>Detail (optional)</label>
              <textarea id="detail" value={detail} onChange={(e) => setDetail(e.target.value)} maxLength={2000} rows={4} style={{ ...field, resize: 'vertical' }} />
            </div>
            {state.kind === 'error' && <p style={{ color: '#F0B24A', margin: 0 }}>{state.message}</p>}
            <button
              onClick={submit}
              disabled={!packageId.trim() || state.kind === 'sending'}
              style={{ justifySelf: 'start', padding: '10px 18px', background: packageId.trim() ? ACCENT : IDLE, color: packageId.trim() ? '#161221' : MUTED, border: 'none', borderRadius: 10, fontWeight: 600, cursor: packageId.trim() ? 'pointer' : 'default' }}
            >
              {state.kind === 'sending' ? 'Filing…' : 'File report'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<main style={{ minHeight: '100vh', background: BG }} />}>
      <ReportForm />
    </Suspense>
  );
}
