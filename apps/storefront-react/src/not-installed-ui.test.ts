/**
 * UI state tests for the not-installed actions: what each state renders, as markup.
 *
 * Rendered with `react-dom/server` rather than a browser, so these assert what a screen reader and a
 * keyboard user are given — the accessible name, the target, the disabled/busy attributes, the live
 * error — and not how it looks. The decisions behind them (which action, which words) are covered
 * exhaustively in `packages/web-handoff/test/not-installed.test.ts`.
 */
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { isHeld, runWithPhase, type ActionPhase, type HostOption, type InventoryEntry, type RequiredAction } from "@azphalt/web-handoff";
import { sortPackages } from "./sort";
import { ActionControl, NoHostSheetBody, NothingInstalled } from "./NotInstalled";

const pkg = { id: "com.acme.lut", name: "Acme LUT", version: "1.2.0", targetApps: [] as string[] };
const hostA: HostOption = { name: "Graffux", hostId: "com.hereliesaz.graffux", installUrl: "https://example.test/graffux" };
const hostB: HostOption = { name: "Guillotine", hostId: "com.hereliesaz.guillotine", installUrl: "https://example.test/guillotine" };
const noop = () => undefined;

const render = (node: ReactElement) => renderToStaticMarkup(node);

/** Every `<a>` and `<button>` tag in the markup. */
const controls = (html: string) => html.match(/<(a|button)\b[^>]*>/g) ?? [];

describe("NoHostSheetBody", () => {
  it("offers the download, one install per host, and retry — in the spec's order", () => {
    const html = render(createElement(NoHostSheetBody, { pkg: pkg, hosts: [hostA, hostB], onRetry: noop, onDismiss: noop }));
    const labels = [...html.matchAll(/>([^<>]+)<\/(?:a|button)>/g)].map((m) => m[1]);
    expect(labels).toEqual(["Download .azp", "Install Graffux", "Install Guillotine", "Retry install", "Close"]);
  });

  it("downloads the package from this store's own origin", () => {
    const html = render(createElement(NoHostSheetBody, { pkg: pkg, hosts: [hostA], onRetry: noop, onDismiss: noop }));
    expect(html).toContain('href="/packages/com.acme.lut/versions/1.2.0/download"');
    expect(html).toMatch(/<a[^>]*\bdownload(?:=""|\s|>)/);
  });

  it("opens each host's install page in a new tab without handing over window.opener", () => {
    const html = render(createElement(NoHostSheetBody, { pkg: pkg, hosts: [hostA], onRetry: noop, onDismiss: noop }));
    const link = controls(html).find((tag) => tag.includes(hostA.installUrl))!;
    expect(link).toContain('target="_blank"');
    expect(link).toContain('rel="noopener noreferrer"');
  });

  it("with no listed host says so and offers only what works: no fake button", () => {
    const html = render(createElement(NoHostSheetBody, { pkg: { ...pkg, targetApps: ["com.hereliesaz.graffux"] }, hosts: [], onRetry: noop, onDismiss: noop }));
    expect(html).toContain("No host app is listed for this extension yet");
    const labels = [...html.matchAll(/>([^<>]+)<\/(?:a|button)>/g)].map((m) => m[1]);
    expect(labels).toEqual(["Download .azp", "Retry install", "Close"]);
    expect(html).not.toContain("Find an app");
    expect(html).not.toContain('href="/"');
  });

  it("says plainly what is wrong, and what the options are", () => {
    const html = render(createElement(NoHostSheetBody, { pkg: pkg, hosts: [hostA], onRetry: noop, onDismiss: noop }));
    expect(html).toContain("No app on this device can open this extension yet.");
  });

  it("gives every control an accessible name that says what it does", () => {
    const html = render(createElement(NoHostSheetBody, { pkg: pkg, hosts: [hostA, hostB], onRetry: noop, onDismiss: noop }));
    const actionTags = controls(html).filter((tag) => tag.includes('class="action"') || tag.includes("aria-label"));
    expect(actionTags.length).toBeGreaterThanOrEqual(4);
    for (const tag of actionTags) expect(tag, tag).toMatch(/aria-label="[^"]{8,}"/);
    expect(html).toContain('aria-label="Install Graffux. Open the install page for Graffux, an app that can run Acme LUT"');
  });

  it("never labels anything OK", () => {
    const html = render(createElement(NoHostSheetBody, { pkg: pkg, hosts: [hostA], onRetry: noop, onDismiss: noop }));
    expect(html).not.toMatch(/>OK</);
  });
});

describe("ActionControl", () => {
  const install: RequiredAction = { kind: "retry-install", label: "Retry install", description: "Retry install. Try installing Acme LUT again" };

  it("is an enabled button when idle, with no progress and no error", () => {
    const html = render(createElement(ActionControl, { action: install, onPress: noop }));
    expect(html).toContain("<button");
    expect(html).not.toContain("disabled");
    expect(html).not.toContain("spinner");
    expect(html).not.toContain('role="alert"');
    expect(html).toContain('aria-label="Retry install. Try installing Acme LUT again"');
  });

  it("is disabled, busy and shows progress while running", () => {
    const html = render(createElement(ActionControl, { action: install, phase: { kind: "running" }, onPress: noop }));
    // aria-disabled, never `disabled`: a disabled button drops keyboard focus mid-install.
    expect(html).toMatch(/<button[^>]*aria-disabled="true"/);
    expect(html).not.toMatch(/<button[^>]*\sdisabled/);
    expect(html).toContain('aria-label="Working… Retry install"');
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('class="spinner"');
    expect(html).toContain("Working…");
  });

  it("says it failed in a live alert, and stays pressable as a retry", () => {
    const html = render(
      createElement(ActionControl, { action: install, phase: { kind: "failed", message: "Couldn't open that page." }, onPress: noop }),
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain("Couldn&#x27;t open that page.");
    expect(html).toContain("Retry: Retry install");
    expect(html).toContain('aria-label="Retry: Retry install. Couldn&#x27;t open that page."');
    expect(html).not.toMatch(/<button[^>]*aria-disabled/);
  });

  it("renders an action with a url as a link, not a button", () => {
    const html = render(
      createElement(ActionControl, {
        action: { kind: "install-host", label: "Install Graffux", description: "Install Graffux. Open the install page for Graffux", url: hostA.installUrl },
      }),
    );
    expect(html).toContain("<a ");
    expect(html).not.toContain("<button");
  });
});

describe("NothingInstalled", () => {
  it("names the state and offers the way out", () => {
    const html = render(createElement(NothingInstalled, { onBrowse: noop }));
    expect(html).toContain("Nothing installed yet");
    expect(html).toContain("Browse extensions to install");
    expect(html).toContain('aria-label="Browse extensions to install. Show every extension so you can install one"');
    expect(html).toContain("min-height:48px");
  });
});

describe("styles", () => {
  const css = readFileSync(new URL("./theme.css", import.meta.url), "utf8");

  it("styles the aria-disabled (not :disabled) state", () => {
    expect(css).toContain('.action[aria-disabled="true"]');
  });

  it("makes every not-installed action at least 48px tall", () => {
    const rule = css.match(/\.dialog \.action,\s*\.action\s*\{[^}]*\}/)?.[0] ?? "";
    expect(rule).toContain("min-height: 48px");
  });

  it("stops the spinner turning for people who asked for less motion", () => {
    expect(css).toMatch(/prefers-reduced-motion: reduce\)\s*\{[^}]*\.spinner\s*\{\s*animation:\s*none/);
  });

  it("keeps the focus ring for everything focusable", () => {
    expect(css).toContain(":focus-visible");
  });
});

describe("the real wiring: the phases the button is given come from runWithPhase", () => {
  // The Detail screens call exactly `runWithPhase(setPhase, …)` and hand the phase to `ActionControl`.
  // Driving that pair with a real async action shows the markup at each step the user would see.
  const action: RequiredAction = { kind: "purchase-extension", label: "Get  ·  $4.99", description: "Get  ·  $4.99. Buy Acme LUT for $4.99, then install it" };

  it("renders running while checkout is in flight, then the retry state with the message", async () => {
    const frames: string[] = [];
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const set = (phase: ActionPhase) => frames.push(render(createElement(ActionControl, { action, phase, primary: true, onPress: noop })));
    const done = runWithPhase(set, async () => {
      await gate;
      return "Checkout failed";
    });
    expect(frames).toHaveLength(1);
    expect(frames[0]).toContain('aria-busy="true"');
    expect(frames[0]).toContain("Working…");
    release();
    await done;
    expect(frames).toHaveLength(2);
    expect(frames[1]).toContain("Retry: Get  ·  $4.99");
    expect(frames[1]).toContain('role="alert"');
    expect(frames[1]).toContain("Checkout failed");
  });

  it("returns to the plain button when the action succeeds", async () => {
    let last = "";
    await runWithPhase((phase) => (last = render(createElement(ActionControl, { action, phase, onPress: noop }))), async () => null);
    expect(last).toContain("Get  ·  $4.99");
    expect(last).not.toContain("aria-busy");
    expect(last).not.toContain('role="alert"');
  });
});

describe("sort: Downloaded and Failed are not held", () => {
  const entry = (id: string, state: InventoryEntry["state"]): InventoryEntry => ({ id, version: "1", state });
  it("Installed first ranks only installed/active ahead", () => {
    const inv = { i: entry("i", "installed"), d: entry("d", "downloaded"), f: entry("f", "failed"), r: entry("r", "removed"), a: entry("a", "active") };
    const items = ["d", "f", "r", "i", "a"].map((id) => ({ id, name: id.toUpperCase() }));
    const order = sortPackages(items, "installed", (id) => isHeld(inv, id)).map((p) => p.id);
    expect(order.slice(0, 2).sort()).toEqual(["a", "i"]);
    const notFirst = sortPackages(items, "not-installed", (id) => isHeld(inv, id)).map((p) => p.id);
    expect(notFirst.slice(-2).sort()).toEqual(["a", "i"]);
  });
});
