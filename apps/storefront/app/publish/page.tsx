'use client';

import { useCallback, useRef, useState } from 'react';

type Result =
  | { kind: 'ok'; id: string; version: string }
  | { kind: 'error'; message: string; errors?: string[] };

const ACCENT = '#BBA6FF';
const BG = '#0C0C13';
const SURFACE = '#12121B';
const ON = '#E7E1EE';
const MUTED = '#A29CAD';

/**
 * A self-contained publish page: drop or pick a signed `.azp` (any kind — brush, filter, model,
 * companion app, or MCP server) and POST its raw bytes to `/api/publish`, which verifies and indexes
 * it through the registry. This is the browser front door for the "upload an extension" flow.
 */
export default function PublishPage() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const publish = useCallback(async (file: File) => {
    setBusy(true);
    setResult(null);
    setFileName(file.name);
    try {
      const bytes = await file.arrayBuffer();
      const res = await fetch('/api/publish', { method: 'POST', body: bytes });
      const data = await res.json();
      if (res.ok && data.package) {
        setResult({ kind: 'ok', id: data.package.id, version: data.version?.version ?? data.package.version });
      } else {
        setResult({ kind: 'error', message: data.error ?? `Publish failed (${res.status})`, errors: data.errors });
      }
    } catch (e) {
      setResult({ kind: 'error', message: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) void publish(file);
    },
    [publish],
  );

  return (
    <main
      style={{
        minHeight: '100vh',
        background: BG,
        color: ON,
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        padding: '48px 24px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: 620 }}>
        <a href="/" style={{ color: MUTED, textDecoration: 'none', fontSize: 14 }}>
          ← Back to the storefront
        </a>
        <h1 style={{ fontSize: 40, fontWeight: 850, letterSpacing: -1, margin: '20px 0 8px' }}>
          Publish an extension
        </h1>
        <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.5, marginTop: 0 }}>
          Drop a signed <code>.azp</code> — a brush, filter, model, companion app, or MCP server. It&apos;s
          verified and indexed through the registry; nothing is charged here.
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          style={{
            marginTop: 24,
            border: `2px dashed ${dragging ? ACCENT : '#3A3646'}`,
            borderRadius: 28,
            background: dragging ? 'rgba(187,166,255,0.08)' : SURFACE,
            padding: '56px 24px',
            textAlign: 'center',
            cursor: busy ? 'progress' : 'pointer',
            transition: 'border-color 120ms, background 120ms',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            {busy ? 'Publishing…' : 'Drop a .azp here, or click to choose'}
          </div>
          {fileName && (
            <div style={{ color: MUTED, fontSize: 14, marginTop: 8 }}>{fileName}</div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".azp,application/x-azphalt"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void publish(file);
            }}
          />
        </div>

        {result?.kind === 'ok' && (
          <div style={{ marginTop: 24, background: 'rgba(68,192,136,0.12)', border: '1px solid #2E7D57', borderRadius: 18, padding: 20 }}>
            <div style={{ fontWeight: 800, color: '#7EE0AD' }}>Published ✓</div>
            <div style={{ marginTop: 6, fontSize: 15 }}>
              <code>{result.id}</code> @ <code>{result.version}</code> is now in the registry.
            </div>
          </div>
        )}

        {result?.kind === 'error' && (
          <div style={{ marginTop: 24, background: 'rgba(255,120,110,0.10)', border: '1px solid #7D2E2E', borderRadius: 18, padding: 20 }}>
            <div style={{ fontWeight: 800, color: '#FFB4AB' }}>Rejected</div>
            <div style={{ marginTop: 6, fontSize: 15 }}>{result.message}</div>
            {result.errors && result.errors.length > 0 && (
              <ul style={{ marginTop: 10, color: MUTED, fontSize: 14 }}>
                {result.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6, marginTop: 32 }}>
          No <code>.azp</code> yet? Scaffold one with <code>npm create azphalt</code> (pick the MCP-server
          template for an MCP server), then sign and export it.
        </p>
      </div>
    </main>
  );
}
