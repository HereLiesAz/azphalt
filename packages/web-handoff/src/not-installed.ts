/**
 * "Not installed" is never a dead end.
 *
 * Wherever a storefront says, shows or implies that something is not installed, the screen has to
 * offer the one thing that resolves it. Which thing depends on *what* is missing, and that decision
 * is made here, once, as a pure function — not re-derived in each component, where two storefronts
 * would drift apart.
 *
 * Two different things can be "not installed":
 *
 * - **the extension** — never had it, bytes without an install, an install that failed, or it was
 *   removed. The action is to install (or buy, then install) that extension.
 * - **the host** — the app that runs extensions. Install was pressed, nothing on the device claimed
 *   the link, and nothing can be installed until a host exists. The action is to install a host, or
 *   to fetch the `.azp` for a host to open later (`spec/web-handoff.md` § When no host is installed).
 *
 * The Compose storefront's `models/NotInstalled.kt` is the Kotlin counterpart and makes the same
 * decisions in the same order; `test/not-installed.test.ts` mirrors `NotInstalledTest.kt` case for
 * case. All user-facing text is in {@link NOT_INSTALLED_STRINGS}, so the two say the same words.
 */
import type { HostOption, InventoryEntry } from "./index.js";

/** Every distinct way a screen can find that something is not installed. */
export type NotInstalled =
  /** Never acquired. `priceLabel` set ⇒ buy it first; `packItems` set ⇒ a pack. */
  | { type: "absent"; priceLabel?: string; packItems?: number }
  /** Bytes held and verified by a host, not installed. */
  | { type: "downloaded" }
  /** Acquisition or installation did not complete. */
  | { type: "failed"; reason?: string }
  /** Had it, does not now. */
  | { type: "removed" }
  /**
   * The install link was attempted and nothing claimed it. `hosts` is the directory already
   * filtered to hosts that can run the package; empty means the directory had nothing, which must
   * still resolve to somewhere to go. `scopedTo` is the package's `targetApps`.
   */
  | { type: "host-missing"; hosts: HostOption[]; scopedTo?: string[] }
  /** The "Installed" filter matched nothing. */
  | { type: "nothing-installed" };

export type NotInstalledType = NotInstalled["type"];

export type ActionKind =
  | "install-extension"
  | "install-pack"
  | "purchase-extension"
  | "retry-install"
  | "reinstall"
  | "install-host"
  | "find-host"
  | "download-package"
  | "retry-handoff"
  | "browse-catalogue";

/**
 * One thing the user can press. `label` is the visible text and always names the action (never
 * "OK"); `description` is the longer spoken form for assistive technology; `url` is set only for the
 * kinds that open one.
 */
export interface RequiredAction {
  kind: ActionKind;
  label: string;
  description: string;
  url?: string;
}

/** All user-facing text for the not-installed states. One place; mirrors `NotInstalledStrings`. */
export const NOT_INSTALLED_STRINGS = {
  installFree: () => "Install  ·  Free",
  installPack: (items: number) => `Install pack  ·  ${items} items`,
  purchase: (price: string) => `Get  ·  ${price}`,
  installDescription: (name: string) => `Install ${name}`,
  purchaseDescription: (name: string, price: string) => `Buy ${name} for ${price}, then install it`,
  installPackDescription: (name: string, items: number) => `Install the pack ${name} with ${items} items`,

  downloadedLabel: (name: string) => `Install “${name}”`,
  downloadedDescription: (name: string) => `Install ${name}. It has been downloaded but is not installed yet`,
  failedLabel: () => "Retry install",
  failedDescription: (name: string) => `Try installing ${name} again`,
  removedLabel: (name: string) => `Reinstall “${name}”`,
  removedDescription: (name: string) => `Install ${name} again. It was removed`,

  downloadedStatus: () => "Downloaded, but not installed yet.",
  failedStatus: (reason?: string) =>
    reason?.trim() ? `The last install didn't finish (${reason}).` : "The last install didn't finish.",
  removedStatus: () => "Removed from your host.",

  installHostLabel: (hostName: string) => `Install ${hostName}`,
  installHostDescription: (hostName: string, pkgName: string) =>
    `Open the install page for ${hostName}, an app that can run ${pkgName}`,
  findHostLabel: () => "Find an app that runs extensions",
  findHostDescription: () => "Open the Azphalt Store page listing apps that can run extensions",
  downloadLabel: () => "Download .azp",
  downloadDescription: (pkgName: string) => `Download the package file for ${pkgName} to open in an app later`,
  retryHandoffLabel: () => "Retry install",
  retryHandoffDescription: (pkgName: string) => `Try installing ${pkgName} again, after installing an app`,
  browseLabel: () => "Browse extensions to install",
  browseDescription: () => "Show every extension so you can install one",

  hostMissingBody: () =>
    "No app on this device can open this extension yet. Install an app that runs extensions, or download the package and open it later.",
  nothingInstalledTitle: () => "Nothing installed yet",
  sheetTitle: (name: string) => `Install “${name}”`,

  working: () => "Working…",
  retryPrefix: (label: string) => `Retry: ${label}`,
} as const;

/** True when the record says the viewer has this installed and usable. */
export function isInstalled(entry: Pick<InventoryEntry, "state"> | undefined | null): boolean {
  return entry?.state === "installed" || entry?.state === "active";
}

/**
 * What is not installed about a package, given what is recorded for it; `null` when it *is*
 * installed.
 *
 * `downloaded` and `failed` are deliberately **not** installed: counting them as held is how a card
 * could say it was installed about bytes that never were.
 */
export function notInstalledStateFor(
  entry: Pick<InventoryEntry, "state"> & { reason?: string } | undefined | null,
  opts: { priceLabel?: string; packItems?: number } = {},
): NotInstalled | null {
  switch (entry?.state) {
    case undefined:
      return {
        type: "absent",
        ...(opts.priceLabel !== undefined ? { priceLabel: opts.priceLabel } : {}),
        ...(opts.packItems !== undefined ? { packItems: opts.packItems } : {}),
      };
    case "downloaded":
      return { type: "downloaded" };
    case "failed":
      return { type: "failed", ...(entry.reason !== undefined ? { reason: entry.reason } : {}) };
    case "removed":
      return { type: "removed" };
    case "installed":
    case "active":
      return null;
  }
}

/**
 * The page listing apps able to run extensions, for when the directory had nothing to offer. A
 * package scoped to one app points at that app's page; anything else at the store itself. `origin` is
 * empty for a storefront linking to itself, and set for a client that is not served from the store.
 * Ids are reverse-DNS, so anything outside that alphabet is not trusted into a path.
 */
export function hostDirectoryUrl(scopedTo: readonly string[] = [], origin = ""): string {
  const id = scopedTo.find((candidate) => /^[A-Za-z0-9._-]+$/.test(candidate));
  return id === undefined ? `${origin}/` : `${origin}/app/${id}`;
}

/**
 * The actions that resolve `state`, most important first. Never empty: a not-installed state with
 * nothing to press is the bug this file exists to prevent.
 *
 * For `host-missing` the order follows `spec/web-handoff.md` § When no host is installed — download,
 * then get a host, then retry — because downloading the package is a *successful* outcome of pressing
 * Install on a device with no host.
 */
export function requiredActionsFor(state: NotInstalled, packageName: string, origin = ""): RequiredAction[] {
  const S = NOT_INSTALLED_STRINGS;
  switch (state.type) {
    case "absent":
      if (state.priceLabel !== undefined) {
        return [{
          kind: "purchase-extension",
          label: S.purchase(state.priceLabel),
          description: S.purchaseDescription(packageName, state.priceLabel),
        }];
      }
      if (state.packItems !== undefined) {
        return [{
          kind: "install-pack",
          label: S.installPack(state.packItems),
          description: S.installPackDescription(packageName, state.packItems),
        }];
      }
      return [{ kind: "install-extension", label: S.installFree(), description: S.installDescription(packageName) }];
    case "downloaded":
      return [{
        kind: "install-extension",
        label: S.downloadedLabel(packageName),
        description: S.downloadedDescription(packageName),
      }];
    case "failed":
      return [{ kind: "retry-install", label: S.failedLabel(), description: S.failedDescription(packageName) }];
    case "removed":
      return [{ kind: "reinstall", label: S.removedLabel(packageName), description: S.removedDescription(packageName) }];
    case "host-missing": {
      const actions: RequiredAction[] = [
        { kind: "download-package", label: S.downloadLabel(), description: S.downloadDescription(packageName) },
      ];
      if (state.hosts.length === 0) {
        actions.push({
          kind: "find-host",
          label: S.findHostLabel(),
          description: S.findHostDescription(),
          url: hostDirectoryUrl(state.scopedTo ?? [], origin),
        });
      } else {
        for (const host of state.hosts) {
          actions.push({
            kind: "install-host",
            label: S.installHostLabel(host.name),
            description: S.installHostDescription(host.name, packageName),
            url: host.installUrl,
          });
        }
      }
      actions.push({
        kind: "retry-handoff",
        label: S.retryHandoffLabel(),
        description: S.retryHandoffDescription(packageName),
      });
      return actions;
    }
    case "nothing-installed":
      return [{ kind: "browse-catalogue", label: S.browseLabel(), description: S.browseDescription() }];
  }
}

/** The line shown with the button for a not-installed state; `null` when none is needed. */
export function statusLineFor(state: NotInstalled): string | null {
  const S = NOT_INSTALLED_STRINGS;
  switch (state.type) {
    case "absent":
      return null;
    case "downloaded":
      return S.downloadedStatus();
    case "failed":
      return S.failedStatus(state.reason);
    case "removed":
      return S.removedStatus();
    case "host-missing":
      return S.hostMissingBody();
    case "nothing-installed":
      return S.nothingInstalledTitle();
  }
}

/** Where a button's action is: idle, running, or failed with something to say and a way to retry. */
export type ActionPhase = { kind: "idle" } | { kind: "running" } | { kind: "failed"; message: string };

/** What a button shows for an action in a phase. Pure so it can be tested without a DOM. */
export interface ActionButtonState {
  label: string;
  description: string;
  disabled: boolean;
  showProgress: boolean;
  /** Spoken and shown below the button when the last attempt failed; `null` otherwise. */
  error: string | null;
}

export function buttonStateFor(action: RequiredAction, phase: ActionPhase): ActionButtonState {
  const S = NOT_INSTALLED_STRINGS;
  switch (phase.kind) {
    case "idle":
      return { label: action.label, description: action.description, disabled: false, showProgress: false, error: null };
    case "running":
      return {
        label: S.working(),
        description: `${action.description}. ${S.working()}`,
        disabled: true,
        showProgress: true,
        error: null,
      };
    // Still pressable, and relabelled: a failure that leaves the same word on the button gives no
    // sign that pressing it again is a retry.
    case "failed":
      return {
        label: S.retryPrefix(action.label),
        description: `${action.description}. ${phase.message}`,
        disabled: false,
        showProgress: false,
        error: phase.message,
      };
  }
}
