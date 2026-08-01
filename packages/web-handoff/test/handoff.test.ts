/**
 * These mirror `apps/storefront-cmp/src/desktopTest/kotlin/models/InstallHandoffTest.kt` case for
 * case, deliberately.
 *
 * The two implementations are the same contract in two languages, and the failure they exist to
 * prevent is silent divergence — two storefronts emitting different links for the same package, or
 * disagreeing about which hosts to offer. Keeping the suites parallel means a change to one that is
 * not made to the other shows up as a missing test rather than as a bug in production.
 *
 * `attemptHandoff` is not covered here: it navigates and listens to the DOM, and this package has no
 * browser environment. Its behaviour is asserted by the storefronts that use it.
 */
import { describe, it, expect } from "vitest";
import {
  downloadUrl,
  hostsFor,
  installLink,
  forgetInstall,
  isHeld,
  loadInventory,
  recordInstalled,
  type HandoffPackage,
} from "../src/index";

const pkg = (over: Partial<HandoffPackage> = {}): HandoffPackage => ({
  id: "com.acme.lut",
  name: "Acme LUT",
  version: "1.0.0",
  ...over,
});

const host = (id: string, name: string, hostId: string) =>
  pkg({
    id,
    name,
    app: { roles: ["host"], hostId, platforms: { android: { install: `https://example.test/${hostId}` } } },
  });

/**
 * A host listing with no install URL.
 *
 * Built explicitly rather than by passing `undefined` to a defaulted parameter of `host` — in
 * TypeScript an explicit `undefined` *triggers* the default, so that version silently tested the
 * opposite of what it claimed. (The parallel Kotlin test can pass `null` safely, which is why the two
 * suites diverge here.)
 */
const hostWithoutInstall = (id: string, name: string, hostId: string) =>
  pkg({ id, name, app: { roles: ["host"], hostId, platforms: { android: {} } } });

describe("installLink", () => {
  it("carries id and version", () => {
    expect(installLink("com.acme.thing", "1.2.3")).toBe("azphalt://install?id=com.acme.thing&version=1.2.3");
  });

  it("omits version when absent or blank rather than sending an empty one", () => {
    expect(installLink("com.acme.thing")).toBe("azphalt://install?id=com.acme.thing");
    expect(installLink("com.acme.thing", "   ")).toBe("azphalt://install?id=com.acme.thing");
  });

  it("carries repo when given", () => {
    expect(installLink("com.acme.thing", "1.0.0", "https://repo.example/base")).toContain(
      "repo=https%3A%2F%2Frepo.example%2Fbase",
    );
  });

  it("percent-encodes rather than form-encodes", () => {
    // A space must become %20, never '+'. A strict RFC 3986 parser reads '+' as a literal plus, so
    // form encoding would silently alter the id the host receives.
    const link = installLink("com.acme.a b", "1.0.0");
    expect(link).toContain("id=com.acme.a%20b");
    expect(link).not.toContain("+");
  });

  it("does not mangle a literal plus into a space", () => {
    // The `+`→`%20` rewrite above is safe only because URLSearchParams has already written a literal
    // '+' as %2B. If that ever stopped being true this rewrite would corrupt the value, so pin it.
    expect(installLink("com.acme.thing", "1.0.0+build.7")).toContain("version=1.0.0%2Bbuild.7");
  });

  it("names no host", () => {
    const link = installLink("com.acme.thing", "1.0.0");
    expect(link.startsWith("azphalt://install?")).toBe(true);
    expect(link).not.toContain("com.hereliesaz");
  });
});

describe("hostsFor", () => {
  const guillotine = host("com.x.guillotine", "Guillotine", "com.hereliesaz.guillotine");
  const graffux = host("com.x.graffux", "Graffux", "com.hereliesaz.graffux");
  const companion = pkg({
    id: "com.acme.ar-stencil",
    name: "AR Stencil",
    app: { roles: ["companion"], platforms: { android: { install: "https://example.test/ar" } } },
  });
  const catalog = [guillotine, graffux, companion, pkg()];

  it("offers every host to a global package", () => {
    expect(hostsFor(pkg(), catalog).map((h) => h.hostId)).toEqual([
      "com.hereliesaz.guillotine",
      "com.hereliesaz.graffux",
    ]);
  });

  it("offers only the hosts an app-scoped package names", () => {
    const scoped = pkg({ targetApps: ["com.hereliesaz.guillotine"] });
    expect(hostsFor(scoped, catalog).map((h) => h.hostId)).toEqual(["com.hereliesaz.guillotine"]);
  });

  it("never offers a companion as somewhere to install an extension", () => {
    expect(hostsFor(pkg(), catalog).some((h) => h.name === "AR Stencil")).toBe(false);
  });

  it("treats an absent roles list as companion, so an older deployment cannot promote one", () => {
    const legacy = pkg({ id: "com.x.old", name: "Old", app: { hostId: "com.x.old", platforms: { android: { install: "https://x" } } } });
    expect(hostsFor(pkg(), [legacy])).toEqual([]);
  });

  it("drops a host with no install url rather than showing a dead entry", () => {
    expect(hostsFor(pkg(), [hostWithoutInstall("com.x.nowhere", "Nowhere", "com.example.nowhere")])).toEqual([]);
  });

  it("offers nothing when a package is scoped to an unlisted host", () => {
    expect(hostsFor(pkg({ targetApps: ["com.nobody.editor"] }), catalog)).toEqual([]);
  });
});

describe("downloadUrl", () => {
  it("is same-origin, so a self-hosted storefront serves its own bytes", () => {
    expect(downloadUrl("com.acme.lut", "1.0.0")).toBe("/packages/com.acme.lut/versions/1.0.0/download");
  });

  it("encodes path components", () => {
    expect(downloadUrl("com.acme/evil", "1.0.0")).toBe("/packages/com.acme%2Fevil/versions/1.0.0/download");
  });
});

/* ─────────────── inventory ─────────────── */

describe("inventory", () => {
  /** A minimal localStorage, so the persistence path is exercised rather than stubbed away. */
  function withStorage<T>(fn: () => T): T {
    const store = new Map<string, string>();
    const g = globalThis as unknown as { window?: unknown };
    const prev = g.window;
    g.window = {
      localStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => void store.set(k, v),
      },
    };
    try {
      return fn();
    } finally {
      g.window = prev;
    }
  }

  it("round-trips a recorded install through storage", () => {
    withStorage(() => {
      const after = recordInstalled({}, "com.acme.lut", "1.0.0");
      expect(after["com.acme.lut"]).toMatchObject({ id: "com.acme.lut", version: "1.0.0", state: "installed" });
      // Reloaded from storage, not from the returned object — this is what a second visit sees.
      expect(loadInventory()["com.acme.lut"]?.state).toBe("installed");
    });
  });

  it("forgets rather than throws when storage holds junk", () => {
    withStorage(() => {
      (globalThis as unknown as { window: { localStorage: Storage } }).window.localStorage.setItem(
        "azphalt.inventory.v1",
        "not json",
      );
      expect(loadInventory()).toEqual({});
    });
  });

  it("returns an empty inventory rather than throwing when storage is unavailable", () => {
    // Safari private browsing and any browser with site data blocked. A visitor who turned storage
    // off has said something about what they want remembered; the store should still browse.
    const g = globalThis as unknown as { window?: unknown };
    const prev = g.window;
    g.window = { get localStorage(): Storage { throw new Error("blocked"); } };
    try {
      expect(loadInventory()).toEqual({});
    } finally {
      g.window = prev;
    }
  });

  it("forgets a record the user says is wrong, and persists the removal", () => {
    withStorage(() => {
      const after = recordInstalled({}, "com.acme.lut", "1.0.0");
      const forgotten = forgetInstall(after, "com.acme.lut");
      expect(forgotten["com.acme.lut"]).toBeUndefined();
      // Reloaded, so the removal survived the visit rather than living only in memory.
      expect(loadInventory()["com.acme.lut"]).toBeUndefined();
    });
  });

  it("treats removed as not held, so a reinstall can still be offered", () => {
    const inv = {
      kept: { id: "kept", version: "1.0.0", state: "installed" as const },
      gone: { id: "gone", version: "1.0.0", state: "removed" as const },
    };
    expect(isHeld(inv, "kept")).toBe(true);
    expect(isHeld(inv, "gone")).toBe(false);
    expect(isHeld(inv, "never-seen")).toBe(false);
  });
});
