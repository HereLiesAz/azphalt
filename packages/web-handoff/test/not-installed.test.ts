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
  hostDirectoryUrl,
  isHeld,
  isInstalled,
  isSafeInstallUrl,
  notInstalledStateFor,
  requiredActionsFor,
  statusLineFor,
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
  { type: "removed" },
  { type: "host-missing", hosts: [hostA, hostB], scopedTo: ["com.hereliesaz.graffux"] },
  { type: "host-missing", hosts: [] },
  { type: "host-missing", hosts: [], scopedTo: ["com.hereliesaz.graffux"] },
  { type: "nothing-installed" },
];

/** What the actions of each state must be. No default: a new state must be decided here. */
function expectedKinds(state: NotInstalled): ActionKind[] {
  switch (state.type) {
    case "absent":
      return [state.priceLabel !== undefined ? "purchase-extension" : state.packItems !== undefined ? "install-pack" : "install-extension"];
    case "downloaded":
      return ["install-extension"];
    case "failed":
      return ["retry-install"];
    case "removed":
      return ["reinstall"];
    case "host-missing":
      return [
        "download-package",
        ...(state.hosts.length === 0 ? (["find-host"] as const) : state.hosts.map(() => "install-host" as const)),
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
      }
    }
  });

  it("says the package's name in the spoken form where one applies", () => {
    for (const state of samples) {
      if (state.type === "nothing-installed" || state.type === "host-missing") continue;
      expect(requiredActionsFor(state, "Acme LUT")[0]!.description).toContain("Acme LUT");
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

  it("still has somewhere to go when the directory is empty", () => {
    const actions = requiredActionsFor({ type: "host-missing", hosts: [], scopedTo: ["com.hereliesaz.graffux"] }, "Acme LUT");
    const find = actions.find((a) => a.kind === "find-host");
    expect(find?.url).toBe("/app/com.hereliesaz.graffux");
    expect(actions.some((a) => a.kind === "install-host")).toBe(false);
  });

  it("can point the fallback at an absolute store origin", () => {
    const [, find] = requiredActionsFor({ type: "host-missing", hosts: [] }, "Acme", "https://www.azphalt.store");
    expect(find!.url).toBe("https://www.azphalt.store/");
  });

  it("carries a url only for the kinds that open one, and only a safe one", () => {
    const withUrl: ActionKind[] = ["install-host", "find-host"];
    for (const state of samples) {
      for (const action of requiredActionsFor(state, "Acme LUT")) {
        expect(action.url !== undefined, action.kind).toBe(withUrl.includes(action.kind));
        if (action.kind === "install-host") expect(isSafeInstallUrl(action.url)).toBe(true);
      }
    }
  });
});

describe("hostDirectoryUrl", () => {
  it("only trusts reverse-DNS ids into a path", () => {
    expect(hostDirectoryUrl([])).toBe("/");
    expect(hostDirectoryUrl(["com.a.b"])).toBe("/app/com.a.b");
    expect(hostDirectoryUrl(["../admin", "a b", "x/y", ""])).toBe("/");
    expect(hostDirectoryUrl(["../x", "com.ok.app"])).toBe("/app/com.ok.app");
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
    expect(statusLineFor({ type: "host-missing", hosts: [] })).toContain("No app on this device");
  });
});

describe("buttonStateFor", () => {
  const action: RequiredAction = { kind: "install-host", label: "Install Graffux", description: "Open the install page for Graffux", url: "https://example.test/graffux" };

  it("is pressable and quiet when idle", () => {
    expect(buttonStateFor(action, { kind: "idle" })).toEqual({
      label: "Install Graffux",
      description: "Open the install page for Graffux",
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
    expect(s.description).toContain("Open the install page for Graffux");
  });

  it("says it failed and stays retryable", () => {
    const s = buttonStateFor(action, { kind: "failed", message: "Couldn't open that page." });
    expect(s.label).toBe("Retry: Install Graffux");
    expect(s.disabled).toBe(false);
    expect(s.error).toBe("Couldn't open that page.");
    expect(s.description).toContain("Couldn't open that page.");
  });

  it("handles every phase", () => {
    const phases: ActionPhase[] = [{ kind: "idle" }, { kind: "running" }, { kind: "failed", message: "x" }];
    expect(phases.map((p) => buttonStateFor(action, p).disabled)).toEqual([false, true, false]);
  });
});

describe("strings", () => {
  it("never produce an OK label", () => {
    const S = NOT_INSTALLED_STRINGS;
    for (const label of [S.installFree(), S.failedLabel(), S.downloadLabel(), S.retryHandoffLabel(), S.browseLabel(), S.findHostLabel()]) {
      expect(label.toUpperCase()).not.toBe("OK");
    }
  });
});
