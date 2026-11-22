/**
 * These mirror `apps/storefront-cmp/src/desktopTest/kotlin/models/NotInstalledTest.kt` case for case,
 * deliberately: the two are the same contract in two languages, and the failure they exist to prevent
 * is silent divergence — one storefront offering a button where the other leaves a dead end.
 *
 * Exhaustive in two senses. Every inventory state (and "no record") is run through
 * `notInstalledStateFor`, and `expectedKinds` is a `switch` over the union with a `never` check — so a
 * new state added without deciding what its button is stops this file type-checking.
 */
import { describe, it, expect } from "vitest";
import {
  NOT_INSTALLED_STRINGS,
  buttonStateFor,
  AcquireDeps,
  acquireRouteFor,
  canStart,
  performAcquire,
  primaryActionFor,
  webStoreUrl,
  runWithPhase,
  showNothingInstalled,
  isHeld,
  isInstalled,
  isSafeInstallUrl,
  notInstalledStateFor,
  requiredActionsFor,
  statusLineFor,
  type AcquireRoute,
  type ActionKind,
  type ActionPhase,
  type HostOption,
  type InventoryState,
  type NotInstalled,
  type RequiredAction,
} from "../src/index";

const hostA: HostOption = { name: "Graffux", hostId: "com.hereliesaz.graffux", installUrl: "https://example.test/graffux" };
const hostB: HostOption = { name: "Guillotine", hostId: "com.hereliesaz.guillotine", installUrl: "https://example.test/guillotine" };

const samples: NotInstalled[] = [
  { type: "absent" },
  { type: "absent", priceLabel: "$4.99" },
  { type: "absent", packItems: 3 },
  { type: "downloaded" },
  { type: "failed", reason: "integrity-mismatch" },
  { type: "failed" },
  { type: "absent", priceLabel: "$4.99", webOnly: true },
  { type: "removed" },
  { type: "host-missing", hosts: [hostA, hostB] },
  { type: "host-missing", hosts: [] },
  { type: "nothing-installed" },
];

/** What the actions of each state must be. No default: a new state must be decided here. */
function expectedKinds(state: NotInstalled): ActionKind[] {
  switch (state.type) {
    case "absent":
      return [state.priceLabel !== undefined ? (state.webOnly ? "buy-on-web" : "purchase-extension") : state.packItems !== undefined ? "install-pack" : "install-extension"];
    case "downloaded":
      return ["install-extension"];
    case "failed":
      return ["retry-install"];
    case "removed":
      return ["reinstall"];
    case "host-missing":
      return [
        "download-package",
        ...state.hosts.map(() => "install-host" as const),
        "retry-handoff",
      ];
    case "nothing-installed":
      return ["browse-catalogue"];
    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

describe("requiredActionsFor", () => {
  it("maps every state to exactly its actions", () => {
    for (const state of samples) {
      expect(requiredActionsFor(state, "Acme LUT").map((a) => a.kind), JSON.stringify(state)).toEqual(expectedKinds(state));
    }
  });

  it("never leaves a state without an action", () => {
    for (const state of samples) expect(requiredActionsFor(state, "Acme LUT").length).toBeGreaterThan(0);
  });

  it("names what each action does and never says OK", () => {
    for (const state of samples) {
      for (const action of requiredActionsFor(state, "Acme LUT")) {
        expect(action.label.trim().length).toBeGreaterThan(0);
        expect(action.label.trim().toUpperCase()).not.toBe("OK");
        expect(action.description.length).toBeGreaterThanOrEqual(8);
        // WCAG 2.5.3: the accessible name starts with the visible text.
        expect(action.description.startsWith(action.label), action.description).toBe(true);
      }
    }
  });

  it("says the package's name in the spoken form where one applies", () => {
    for (const state of samples) {
      if (state.type === "nothing-installed" || state.type === "host-missing") continue;
      if (state.type === "failed" && state.priceLabel === undefined) {
        expect(requiredActionsFor(state, "Acme LUT")[0]!.description).toContain("Acme LUT");
        continue;
      }
      expect(requiredActionsFor(state, "Acme LUT")[0]!.description).toContain("Acme LUT");
    }
  });

  it("never sends a possible owner back through checkout: only an untouched paid package gets Get", () => {
    const price = "$4.99";
    const kind = (state?: InventoryState, webOnly = false) =>
      primaryActionFor(state ? { state } : undefined, "X", { priceLabel: price, webOnly }).kind;
    expect(kind(undefined)).toBe("purchase-extension");
    expect(kind(undefined, true)).toBe("buy-on-web");
    // A host reporting FAILED knows the install failed, not the purchase: retry the install.
    expect(kind("failed")).toBe("retry-install");
    expect(kind("downloaded")).toBe("install-extension");
    expect(kind("removed")).toBe("reinstall");
    expect(kind("installed")).toBe("install-extension"); // "Install again"
    expect(kind("active")).toBe("install-extension");
    // The label matches the action everywhere.
    for (const state of [undefined, "failed", "downloaded", "removed", "installed", "active"] as const) {
      const a = primaryActionFor(state ? { state } : undefined, "X", { priceLabel: price });
      expect(a.label.startsWith("Get"), String(state)).toBe(a.kind === "purchase-extension");
    }
  });

  it("labels free, paid and pack installs by what they will do", () => {
    expect(requiredActionsFor({ type: "absent" }, "Acme")[0]!.label).toBe("Install  ·  Free");
    expect(requiredActionsFor({ type: "absent", priceLabel: "$4.99" }, "Acme")[0]!.label).toBe("Get  ·  $4.99");
    expect(requiredActionsFor({ type: "absent", packItems: 3 }, "Acme")[0]!.label).toBe("Install pack  ·  3 items");
    // A paid pack must be bought before anything is installed.
    expect(requiredActionsFor({ type: "absent", priceLabel: "$4.99", packItems: 3 }, "Acme")[0]!.kind).toBe("purchase-extension");
  });

  it("offers the download first, then every host, then retry", () => {
    const actions = requiredActionsFor({ type: "host-missing", hosts: [hostA, hostB] }, "Acme LUT");
    expect(actions.map((a) => a.label)).toEqual(["Download .azp", "Install Graffux", "Install Guillotine", "Retry install"]);
    expect(actions.map((a) => a.url)).toEqual([undefined, hostA.installUrl, hostB.installUrl, undefined]);
  });

  it("with no listed host offers only what works, and says why", () => {
    const state: NotInstalled = { type: "host-missing", hosts: [] };
    expect(requiredActionsFor(state, "Acme LUT").map((a) => a.kind)).toEqual(["download-package", "retry-handoff"]);
    expect(statusLineFor(state)).toMatch(/^No host app is listed for this extension yet/);
  });

  it("carries a url only for the kinds that open one, and only a safe one", () => {
    const withUrl: ActionKind[] = ["install-host"];
    for (const state of samples) {
      for (const action of requiredActionsFor(state, "Acme LUT")) {
        expect(action.url !== undefined, action.kind).toBe(withUrl.includes(action.kind));
        if (action.kind === "install-host") expect(isSafeInstallUrl(action.url)).toBe(true);
      }
    }
  });
});

describe("notInstalledStateFor", () => {
  const states: (InventoryState | undefined)[] = [undefined, "downloaded", "installed", "active", "failed", "removed"];

  it("accounts for every state: installed ones have nothing missing, the rest do", () => {
    for (const state of states) {
      const entry = state ? { state } : undefined;
      const installed = state === "installed" || state === "active";
      expect(notInstalledStateFor(entry) === null, String(state)).toBe(installed);
      expect(isInstalled(entry), String(state)).toBe(installed);
    }
    expect(isInstalled(undefined)).toBe(false);
    expect(isInstalled(null)).toBe(false);
  });

  it("maps each recorded state to its own verb", () => {
    expect(notInstalledStateFor(undefined)).toEqual({ type: "absent" });
    expect(notInstalledStateFor({ state: "downloaded" })).toEqual({ type: "downloaded" });
    expect(notInstalledStateFor({ state: "failed", reason: "incompatible" })).toEqual({ type: "failed", reason: "incompatible" });
    expect(notInstalledStateFor({ state: "removed" })).toEqual({ type: "removed" });
    expect(notInstalledStateFor(undefined, { priceLabel: "$4.99", packItems: 3 })).toEqual({ type: "absent", priceLabel: "$4.99", packItems: 3 });
  });

  it("keeps `isHeld` in step: downloaded and failed are not held", () => {
    const inv = {
      a: { id: "a", version: "1", state: "installed" as const },
      b: { id: "b", version: "1", state: "downloaded" as const },
      c: { id: "c", version: "1", state: "failed" as const },
      d: { id: "d", version: "1", state: "removed" as const },
      e: { id: "e", version: "1", state: "active" as const },
    };
    expect(["a", "b", "c", "d", "e", "z"].map((id) => isHeld(inv, id))).toEqual([true, false, false, false, true, false]);
  });
});

describe("statusLineFor", () => {
  it("explains every recorded state and stays silent otherwise", () => {
    expect(statusLineFor({ type: "absent" })).toBeNull();
    expect(statusLineFor({ type: "downloaded" })).toBe("Downloaded, but not installed yet.");
    expect(statusLineFor({ type: "failed", reason: "integrity-mismatch" })).toBe("The last install didn't finish (integrity-mismatch).");
    expect(statusLineFor({ type: "failed", reason: " " })).toBe("The last install didn't finish.");
    expect(statusLineFor({ type: "removed" })).toBe("Removed from your host.");
    expect(statusLineFor({ type: "nothing-installed" })).toBe("Nothing installed yet");
    expect(statusLineFor({ type: "host-missing", hosts: [hostA] })).toContain("No app on this device");
  });
});

describe("buttonStateFor", () => {
  const action: RequiredAction = { kind: "install-host", label: "Install Graffux", description: "Install Graffux. Open the install page for Graffux", url: "https://example.test/graffux" };

  it("is pressable and quiet when idle", () => {
    expect(buttonStateFor(action, { kind: "idle" })).toEqual({
      label: "Install Graffux",
      description: "Install Graffux. Open the install page for Graffux",
      disabled: false,
      showProgress: false,
      error: null,
    });
  });

  it("is disabled and shows progress while running", () => {
    const s = buttonStateFor(action, { kind: "running" });
    expect(s.disabled).toBe(true);
    expect(s.showProgress).toBe(true);
    expect(s.error).toBeNull();
    expect(s.description).toBe("Working… Install Graffux");
    expect(s.description).toContain(s.label);
  });

  it("says it failed and stays retryable", () => {
    const s = buttonStateFor(action, { kind: "failed", message: "Couldn't open that page." });
    expect(s.label).toBe("Retry: Install Graffux");
    expect(s.disabled).toBe(false);
    expect(s.error).toBe("Couldn't open that page.");
    expect(s.description.startsWith(s.label)).toBe(true);
  });

  it("handles every phase", () => {
    const phases: ActionPhase[] = [{ kind: "idle" }, { kind: "running" }, { kind: "failed", message: "x" }];
    expect(phases.map((p) => buttonStateFor(action, p).disabled)).toEqual([false, true, false]);
  });
});

describe("runWithPhase (the one producer of phases)", () => {
  const record = () => {
    const seen: ActionPhase[] = [];
    return { seen, set: (p: ActionPhase) => void seen.push(p) };
  };

  it("reports running then idle on success", async () => {
    const r = record();
    await runWithPhase(r.set, async () => null);
    expect(r.seen).toEqual([{ kind: "running" }, { kind: "idle" }]);
  });

  it("reports a returned message as a failure", async () => {
    const r = record();
    await runWithPhase(r.set, async () => "Checkout failed");
    expect(r.seen).toEqual([{ kind: "running" }, { kind: "failed", message: "Checkout failed" }]);
  });

  it("treats a blank returned string as a failure with the default message, not as success", async () => {
    const r = record();
    await runWithPhase(r.set, async () => "");
    expect(r.seen.at(-1)).toEqual({ kind: "failed", message: "Something went wrong." });
    const u = record();
    await runWithPhase(u.set, async () => undefined);
    expect(u.seen.at(-1)).toEqual({ kind: "idle" });
  });

  it("turns a throw into a failure, never leaving it running", async () => {
    const r = record();
    await runWithPhase(r.set, async () => { throw new Error("boom"); });
    expect(r.seen.at(-1)).toEqual({ kind: "failed", message: "boom" });
    const blank = record();
    await runWithPhase(blank.set, async () => { throw new Error(" "); });
    expect(blank.seen.at(-1)).toEqual({ kind: "failed", message: "Something went wrong." });
    const odd = record();
    await runWithPhase(odd.set, async () => { throw "string"; });
    expect(odd.seen.at(-1)).toEqual({ kind: "failed", message: "Something went wrong." });
  });
});

describe("acquireRouteFor (what pressing the main button does)", () => {
  const all: Record<ActionKind, AcquireRoute> = {
    "install-extension": "handoff",
    "install-pack": "handoff",
    "purchase-extension": "checkout",
    "buy-on-web": "web-store",
    "retry-install": "handoff",
    reinstall: "handoff",
    "install-host": "handoff",
    "download-package": "handoff",
    "retry-handoff": "handoff",
    "browse-catalogue": "handoff",
  };
  it("routes every kind, and only Get goes to checkout", () => {
    for (const [kind, route] of Object.entries(all)) expect(acquireRouteFor(kind as ActionKind), kind).toBe(route);
    expect(Object.entries(all).filter(([, r]) => r === "checkout").map(([k]) => k)).toEqual(["purchase-extension"]);
  });

  it("composes with the mapping: a paid package routes to checkout only when untouched and in-app", () => {
    const route = (state?: InventoryState, webOnly = false) =>
      acquireRouteFor(primaryActionFor(state ? { state } : undefined, "X", { priceLabel: "$4.99", webOnly }).kind);
    expect(route(undefined)).toBe("checkout");
    expect(route(undefined, true)).toBe("web-store");
    for (const state of ["failed", "downloaded", "removed", "installed", "active"] as const) expect(route(state), state).toBe("handoff");
    // A free package never goes to checkout.
    for (const state of [undefined, "failed", "downloaded", "removed", "installed"] as const) {
      expect(acquireRouteFor(primaryActionFor(state ? { state } : undefined, "X").kind)).toBe("handoff");
    }
  });
});

describe("performAcquire (the function the screens call)", () => {
  const make = (over: Partial<AcquireDeps> = {}) => {
    const calls: string[] = [];
    const notices: string[] = [];
    const deps: AcquireDeps = {
      checkout: async () => { calls.push("checkout"); return { message: "Checkout started." }; },
      handoff: async () => { calls.push("handoff"); return null; },
      openWebStore: () => { calls.push("web"); return true; },
      notice: (m) => void notices.push(m),
      ...over,
    };
    return { deps, calls, notices };
  };

  it("checkout success posts the notice and does not install", async () => {
    const { deps, calls, notices } = make();
    expect(await performAcquire("checkout", deps)).toBeNull();
    expect(calls).toEqual(["checkout"]);
    expect(notices).toEqual(["Checkout started."]);
  });

  it("already_owned (409) is not a failure: it runs the install handoff", async () => {
    const { deps, calls, notices } = make({
      checkout: async () => ({ error: "you already own this package", code: "already_owned" }),
    });
    expect(await performAcquire("checkout", deps)).toBeNull();
    expect(calls).toEqual(["handoff"]);
    expect(notices).toEqual([]);
  });

  it("already_owned whose handoff fails reports that failure, not the 409 text", async () => {
    const { deps } = make({
      checkout: async () => ({ error: "you already own this package", code: "already_owned" }),
      handoff: async () => "nothing opened",
    });
    expect(await performAcquire("checkout", deps)).toBe("nothing opened");
  });

  it("any other checkout error is a failure message", async () => {
    const { deps, calls } = make({ checkout: async () => ({ error: "seller payout account is not ready", code: "x" }) });
    expect(await performAcquire("checkout", deps)).toBe("seller payout account is not ready");
    expect(calls).toEqual([]);
  });

  it("a thrown checkout becomes a failure through runWithPhase, never stuck running", async () => {
    const { deps } = make({ checkout: async () => { throw new Error("offline"); } });
    const seen: ActionPhase[] = [];
    await runWithPhase((p) => void seen.push(p), () => performAcquire("checkout", deps));
    expect(seen.at(-1)).toEqual({ kind: "failed", message: "offline" });
  });

  it("handoff runs only the handoff", async () => {
    const { deps, calls } = make();
    expect(await performAcquire("handoff", deps)).toBeNull();
    expect(calls).toEqual(["handoff"]);
  });

  it("web-store opens the page, and says so when it cannot", async () => {
    const ok = make();
    expect(await performAcquire("web-store", ok.deps)).toBeNull();
    expect(ok.calls).toEqual(["web"]);
    const bad = make({ openWebStore: () => false });
    expect(await performAcquire("web-store", bad.deps)).toBe("Couldn't open azphalt.store.");
  });
});

describe("canStart (re-entrancy)", () => {
  it("allows a press only when nothing is running", () => {
    expect(canStart({ kind: "idle" })).toBe(true);
    expect(canStart({ kind: "failed", message: "x" })).toBe(true);
    expect(canStart({ kind: "running" })).toBe(false);
  });
});

describe("webStoreUrl", () => {
  it("links to the package, and falls back to the store for an unsafe id", () => {
    expect(webStoreUrl("com.acme.lut")).toBe("https://www.azphalt.store/?package=com.acme.lut");
    expect(webStoreUrl("a b/../x")).toBe("https://www.azphalt.store/");
  });
});

describe("showNothingInstalled", () => {
  const base = { owned: 1, query: "", price: 0, category: null, app: null, resultsEmpty: true };
  it("shows only when the Installed filter is the only filter", () => {
    expect(showNothingInstalled(base)).toBe(true);
    expect(showNothingInstalled({ ...base, query: "  " })).toBe(true);
    expect(showNothingInstalled({ ...base, resultsEmpty: false })).toBe(false);
    expect(showNothingInstalled({ ...base, owned: 0 })).toBe(false);
    expect(showNothingInstalled({ ...base, owned: 2 })).toBe(false);
    // Someone with installs who searches "zzz" is not told they have nothing installed.
    expect(showNothingInstalled({ ...base, query: "zzz" })).toBe(false);
    expect(showNothingInstalled({ ...base, price: 2 })).toBe(false);
    expect(showNothingInstalled({ ...base, category: "image" })).toBe(false);
    expect(showNothingInstalled({ ...base, app: "com.a.b" })).toBe(false);
  });
});

describe("strings", () => {
  it("never produce an OK label", () => {
    const S = NOT_INSTALLED_STRINGS;
    for (const label of [S.installFree(), S.failedLabel(), S.downloadLabel(), S.retryHandoffLabel(), S.browseLabel()]) {
      expect(label.toUpperCase()).not.toBe("OK");
    }
  });
});
