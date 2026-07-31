/**
 * Structural validation for a `kind: "app"` manifest — an **external OS-level app** *header*, either a
 * **companion** a host launches to do work (`spec/companion-app.md`) or a **host** that runs extensions
 * and is listed so a storefront can point users at it (`spec/web-handoff.md § Host directory`), or
 * both. Returns human-readable errors ([] when valid). {@link verifyAzp} calls this **only** for
 * `kind:"app"` packages, folding the errors into its report.
 *
 * Until this existed, `kind:"app"` was the one header kind with no structural rules at all: `mcp` and
 * `pack` were validated and `app` was not, so a package could claim to be an app while carrying no
 * `app` block, no platform, and nothing installable. That mattered little while the block was only
 * read by a host deciding whether to launch a companion — a host that finds nothing simply doesn't
 * launch. It matters now that a **storefront builds a directory out of these listings** and offers
 * them to users as places to install software: an unvalidated directory is one anyone can put an
 * entry into.
 *
 * Rules: an `app` block with a `platforms` map carrying ≥1 of `android` / `pwa`; `roles`, when
 * present, is a non-empty list of known roles; `handoffs` ≥1 when the app is a companion (the
 * default); `hostId` present when it is a host and absent when it is not. Header-only — an app
 * declares no `/code` (`entry`/`runtime`/`capabilities`), no `assets`, and no `mcp`/`pack` block.
 */
import { hasAppRole, type AppRole, type Manifest } from "@azphalt/azdk";

const KNOWN_ROLES: readonly AppRole[] = ["companion", "host"];

/**
 * A reverse-DNS-shaped id: dot-separated, no whitespace, at least one dot.
 *
 * Deliberately the loose check rather than a strict grammar. `hostId` has to **equal** the string
 * packages put in `targetApps` to be useful at all, and that string is whatever the host actually
 * uses; a validator that rejected a real host's real id would break the directory to enforce a
 * convention. This catches the shapes that are certainly wrong — empty, spaced, unqualified.
 */
const REVERSE_DNS = /^[^\s.]+(\.[^\s.]+)+$/;

export function validateAppManifest(manifest: Manifest): string[] {
  const errors: string[] = [];
  const app = manifest.app;
  if (!app) {
    errors.push('app: kind "app" requires an "app" block');
    return errors;
  }

  // Header-only — an app package describes software the OS installs; it has no sandbox surface here.
  if (manifest.entry || manifest.runtime) errors.push("app: an app must not declare entry/runtime");
  if (manifest.capabilities && manifest.capabilities.length > 0) errors.push("app: an app must not declare capabilities");
  if (manifest.assets && manifest.assets.length > 0) errors.push("app: an app must not declare assets");
  if (manifest.mcp) errors.push("app: an app must not declare an mcp block");
  if (manifest.pack) errors.push("app: an app must not declare a pack block");

  // Platforms: at least one way to install/invoke, or the listing points nowhere.
  const platforms = app.platforms;
  if (!platforms || typeof platforms !== "object") {
    errors.push("app: a platforms map is required");
  } else {
    const android = platforms.android;
    const pwa = platforms.pwa;
    if (!android && !pwa) errors.push("app: platforms needs at least one of android / pwa");
    if (android && (typeof android.packageId !== "string" || android.packageId.length === 0)) {
      errors.push("app: platforms.android needs a non-empty string packageId");
    }
    if (pwa && pwa.startUrl !== undefined && (typeof pwa.startUrl !== "string" || pwa.startUrl.length === 0)) {
      errors.push("app: platforms.pwa startUrl, when present, must be a non-empty string");
    }
  }

  // Roles. Absent is legal and means `["companion"]` — every listing published before the field
  // existed is a companion, and must keep validating as one.
  if (app.roles !== undefined) {
    if (!Array.isArray(app.roles) || app.roles.length === 0) {
      errors.push("app: roles, when present, must be a non-empty array");
    } else {
      for (const role of app.roles) {
        if (!KNOWN_ROLES.includes(role)) {
          errors.push(`app: unknown role "${String(role)}" (expected ${KNOWN_ROLES.join(" / ")})`);
        }
      }
    }
  }

  const isCompanion = hasAppRole(app, "companion");
  const isHost = hasAppRole(app, "host");

  // A companion's whole purpose is the functions it offers; one with none is a listing for an app a
  // host has no way to call.
  if (isCompanion) {
    if (!Array.isArray(app.handoffs) || app.handoffs.length === 0) {
      errors.push("app: a companion requires at least one handoff");
    }
  }

  // A host's id is what joins it to the packages that target it. Without it the listing cannot be
  // matched to anything, and a storefront would have to guess — see AppManifest.hostId.
  if (isHost) {
    if (typeof app.hostId !== "string" || app.hostId.length === 0) {
      errors.push('app: a host requires a non-empty string hostId (the id packages name in targetApps)');
    } else if (!REVERSE_DNS.test(app.hostId)) {
      errors.push(`app: hostId "${app.hostId}" is not reverse-DNS (expected e.g. "com.example.editor")`);
    }
  } else if (app.hostId !== undefined) {
    errors.push('app: hostId is only meaningful when roles includes "host"');
  }

  return errors;
}
