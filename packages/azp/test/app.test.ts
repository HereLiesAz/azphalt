import { describe, it, expect } from "vitest";
import { validateAppManifest } from "../src/app";
import type { AppRole, Manifest } from "@azphalt/azdk";

/** A companion listing exactly as one was written before `roles` existed — no `roles`, no `hostId`. */
const base: Manifest = {
  azphalt: "0.1",
  id: "com.acme.ar-stencil",
  name: "AR Stencil Capture",
  version: "1.0.0",
  kind: "app",
  license: "MIT",
  compat: ">=0.1",
  files: { LICENSE: "sha256-def" },
  app: {
    platforms: {
      android: { packageId: "com.acme.arstencil", minSdk: 29, install: "https://example.test/get" },
    },
    handoffs: [
      {
        id: "capture",
        action: "capture",
        name: "Capture AR Stencil",
        input: { assets: ["image"] },
        output: { assets: ["image"] },
        transport: { android: { intentAction: "com.acme.arstencil.CAPTURE" } },
      },
    ],
  },
};

const clone = (): Manifest => JSON.parse(JSON.stringify(base));

describe("validateAppManifest", () => {
  it("accepts a well-formed companion listing", () => {
    expect(validateAppManifest(base)).toEqual([]);
  });

  it("treats an absent roles list as companion, so pre-roles listings keep validating", () => {
    const m = clone();
    expect(m.app!.roles).toBeUndefined();
    expect(validateAppManifest(m)).toEqual([]);
  });

  it("requires an app block", () => {
    const m = clone();
    delete (m as { app?: unknown }).app;
    expect(validateAppManifest(m).some((e) => e.includes('requires an "app" block'))).toBe(true);
  });

  it("requires at least one platform", () => {
    const m = clone();
    m.app!.platforms = {} as never;
    expect(validateAppManifest(m).some((e) => e.includes("at least one of android / pwa"))).toBe(true);
  });

  it("requires a packageId on an android platform", () => {
    const m = clone();
    m.app!.platforms.android!.packageId = "";
    expect(validateAppManifest(m).some((e) => e.includes("non-empty string packageId"))).toBe(true);
  });

  it("requires a companion to declare at least one handoff", () => {
    const m = clone();
    m.app!.handoffs = [];
    expect(validateAppManifest(m).some((e) => e.includes("companion requires at least one handoff"))).toBe(true);
  });

  it("rejects an unknown role", () => {
    const m = clone();
    m.app!.roles = ["hsot" as AppRole];
    expect(validateAppManifest(m).some((e) => e.includes('unknown role "hsot"'))).toBe(true);
  });

  it("rejects an empty roles array rather than silently defaulting it", () => {
    const m = clone();
    m.app!.roles = [];
    expect(validateAppManifest(m).some((e) => e.includes("non-empty array"))).toBe(true);
  });

  describe("host role", () => {
    /** A host listing: no handoffs (it offers none), a hostId instead. */
    const host = (): Manifest => {
      const m = clone();
      m.app!.roles = ["host"];
      m.app!.hostId = "com.example.editor";
      delete m.app!.handoffs;
      return m;
    };

    it("accepts a host listing with no handoffs", () => {
      expect(validateAppManifest(host())).toEqual([]);
    });

    it("requires a hostId", () => {
      const m = host();
      delete m.app!.hostId;
      expect(validateAppManifest(m).some((e) => e.includes("host requires a non-empty string hostId"))).toBe(true);
    });

    it("requires the hostId to be reverse-DNS", () => {
      const m = host();
      m.app!.hostId = "editor";
      expect(validateAppManifest(m).some((e) => e.includes("is not reverse-DNS"))).toBe(true);
    });

    it("rejects a hostId on a listing that is not a host", () => {
      const m = clone();
      m.app!.hostId = "com.example.editor";
      expect(validateAppManifest(m).some((e) => e.includes('only meaningful when roles includes "host"'))).toBe(true);
    });

    it("requires handoffs from an app that is both host and companion", () => {
      const m = host();
      m.app!.roles = ["host", "companion"];
      expect(validateAppManifest(m).some((e) => e.includes("companion requires at least one handoff"))).toBe(true);
    });

    it("accepts an app that is both, when it satisfies both", () => {
      const m = host();
      m.app!.roles = ["host", "companion"];
      m.app!.handoffs = base.app!.handoffs;
      expect(validateAppManifest(m)).toEqual([]);
    });
  });

  describe("header-only", () => {
    it.each([
      ["entry", () => ({ entry: "code/main.js" })],
      ["capabilities", () => ({ capabilities: ["canvas" as const] })],
      ["assets", () => ({ assets: [{ type: "lut" as const, path: "assets/a.cube" }] })],
      ["mcp", () => ({ mcp: { remote: { url: "https://example.test/mcp" } } })],
      ["pack", () => ({ pack: { entries: [{ id: "com.other.thing" }] } })],
    ])("rejects an app that declares %s", (field, patch) => {
      const m = Object.assign(clone(), patch()) as Manifest;
      expect(validateAppManifest(m).some((e) => e.includes(field))).toBe(true);
    });
  });
});
