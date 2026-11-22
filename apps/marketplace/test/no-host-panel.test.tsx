/**
 * UI state tests for the marketplace's "no host installed" panel, rendered to markup.
 *
 * The decisions behind it (which action, which words, which order) are tested exhaustively in
 * `packages/web-handoff/test/not-installed.test.ts`; these check what this panel does with them: one
 * accessible control per action, the host directory's three states (loading, ready, failed), and
 * that it is never a dead end.
 */
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { HostOption } from '@azphalt/web-handoff';
import { NoHostPanel, type HostDirectory } from '../src/NoHostPanel';

const pkg = { id: 'com.acme.lut', name: 'Acme LUT', version: '1.2.0', targetApps: [] as string[] };
const hostA: HostOption = { name: 'Graffux', hostId: 'com.hereliesaz.graffux', installUrl: 'https://example.test/graffux' };
const noop = () => undefined;

const render = (directory: HostDirectory, over: Partial<typeof pkg> = {}) =>
  renderToStaticMarkup(<NoHostPanel pkg={{ ...pkg, ...over }} directory={directory} onRetry={noop} onDismiss={noop} />);
const labels = (html: string) => [...html.matchAll(/>([^<>]+)<\/(?:a|button)>/g)].map((m) => m[1]);

describe('NoHostPanel', () => {
  it('offers the download, an install per host, and retry', () => {
    const html = render({ status: 'ready', hosts: [hostA] });
    expect(labels(html)).toEqual(['Download .azp', 'Install Graffux', 'Retry install', 'Close']);
    expect(html).toContain('href="/packages/com.acme.lut/versions/1.2.0/download"');
    expect(html).toContain(`href="${hostA.installUrl}"`);
  });

  it('opens host pages without handing over window.opener', () => {
    const tag = render({ status: 'ready', hosts: [hostA] }).match(/<a[^>]*example\.test[^>]*>/)![0];
    expect(tag).toContain('target="_blank"');
    expect(tag).toContain('rel="noopener noreferrer"');
  });

  it('says what is wrong in plain words, not as an error', () => {
    const html = render({ status: 'ready', hosts: [hostA] });
    expect(html).toContain('No app on this device can open this extension yet.');
    expect(html).not.toContain('role="alert"');
  });

  it('with no listed host says so and offers only what works: no fake button', () => {
    const html = render({ status: 'ready', hosts: [] }, { targetApps: ['com.hereliesaz.graffux'] });
    expect(html).toContain('No host app is listed for this extension yet');
    expect(labels(html)).toEqual(['Download .azp', 'Retry install', 'Close']);
    expect(html).not.toContain('Find an app');
  });

  it('while the directory loads, says so and does not flash a find-an-app row that is about to change', () => {
    const html = render({ status: 'loading' });
    expect(html).toContain('role="status"');
    expect(html).toContain('Looking for apps that can run this…');
    // Not yet claiming "no host is listed" while the directory is still loading.
    expect(html).not.toContain('No host app is listed');
    expect(labels(html)).toEqual(['Download .azp', 'Retry install', 'Close']);
  });

  it('when the directory fails, says so and still offers the fallback', () => {
    const html = render({ status: 'error' });
    expect(html).toContain('role="alert"');
    expect(html).toContain('Couldn’t load the list of apps.');
    expect(labels(html)).toEqual(['Download .azp', 'Retry install', 'Close']);
  });

  it('gives every link and button an accessible name that says what it does', () => {
    const html = render({ status: 'ready', hosts: [hostA] });
    const tags = html.match(/<(a|button)\b[^>]*>/g)!;
    expect(tags.filter((t) => t.includes('class="btn')).length).toBe(4);
    // Everything but the plain Close button carries a spoken description.
    for (const tag of tags.slice(0, 3)) expect(tag, tag).toMatch(/aria-label="[^"]{8,}"/);
    expect(html).toContain('aria-label="Install Graffux. Open the install page for Graffux, an app that can run Acme LUT"');
  });

  it('never labels anything OK', () => {
    expect(render({ status: 'ready', hosts: [hostA] })).not.toMatch(/>OK</);
  });
});
