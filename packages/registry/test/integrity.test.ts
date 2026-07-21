import { describe, it, expect } from "vitest";
import { writeAzp, digest, generateSigningKey, signAzp } from "@azphalt/azp";
import { Registry, InMemoryStore, RegistryError, scanPackage } from "../src/index";

const license = "MIT License\n";
const base = { azphalt: "0.1", version: "1.0.0", license: "MIT", compat: ">=0.1" };
const enc = (s: string) => new TextEncoder().encode(s);

function assetAzp(id = "com.acme.brush") {
  return writeAzp({
    manifest: { ...base, id, name: "Brush", kind: "asset" as const, assets: [{ type: "brush", path: "assets/b.brush" }] },
    payload: { "assets/b.brush": enc("brush") },
    license,
  }).azp;
}

describe("security sweep", () => {
  it("passes a clean package", () => {
    expect(scanPackage(assetAzp()).verdict).toBe("pass");
  });

  it("blocks a manifest carrying a credential-shaped literal", () => {
    const bytes = writeAzp({
      manifest: { ...base, id: "com.acme.leak", name: "Leak", kind: "asset", assets: [{ type: "brush", path: "assets/b" }], apiKey: "sk-live-abcdef123" } as never,
      payload: { "assets/b": enc("x") },
      license,
    }).azp;
    const r = scanPackage(bytes);
    expect(r.verdict).toBe("block");
    expect(r.checks.find((c) => c.id === "secret-scan")?.verdict).toBe("block");
  });

  it("flags a code package that declares capabilities but contributes nothing", () => {
    const bytes = writeAzp({
      manifest: { ...base, id: "com.acme.idle", name: "Idle", kind: "code", entry: "code/main.js", runtime: "js", capabilities: ["bitmap", "params"], contributes: {} },
      payload: { "code/main.js": enc("export const x = 1;") },
      license,
    }).azp;
    const r = scanPackage(bytes);
    expect(r.verdict).toBe("flag");
    expect(r.checks.find((c) => c.id === "capability-audit")?.verdict).toBe("flag");
  });

  it("blocks a denylisted container digest", () => {
    const bytes = assetAzp();
    expect(scanPackage(bytes, { denylistDigests: [digest(bytes)] }).verdict).toBe("block");
  });

  it("does not false-block a normal `author` field (the 'auth' substring trap)", () => {
    const bytes = writeAzp({
      manifest: { ...base, id: "com.acme.authored", name: "Authored", kind: "asset", author: "SFX Studio", assets: [{ type: "brush", path: "assets/b" }] },
      payload: { "assets/b": enc("x") },
      license,
    }).azp;
    expect(scanPackage(bytes).verdict).toBe("pass");
  });

  it("does not false-block a file path containing a credential substring (assets/tokens.txt)", () => {
    const bytes = writeAzp({
      manifest: { ...base, id: "com.acme.asr", name: "ASR", kind: "asset", assets: [{ type: "model", path: "assets/tokens.txt" }] },
      payload: { "assets/tokens.txt": enc("hello world") },
      license,
    }).azp;
    expect(scanPackage(bytes).verdict).toBe("pass");
  });

  it("blocks a manifest declaring an off-contract / never-list capability", () => {
    const bytes = writeAzp({
      manifest: {
        ...base,
        id: "com.acme.spy",
        name: "Spy",
        kind: "code",
        entry: "code/main.js",
        runtime: "js",
        capabilities: ["bitmap", "network"],
        contributes: { filters: [{ id: "f", name: "F", entry: "apply" }] },
      } as never,
      payload: { "code/main.js": enc("export const apply = () => {};") },
      license,
    }).azp;
    const r = scanPackage(bytes);
    expect(r.checks.find((c) => c.id === "capability-scope")?.verdict).toBe("block");
    expect(r.verdict).toBe("block");
  });
});

describe("publish + reporting", () => {
  it("attaches a scan report on publish and blocks a swept package", async () => {
    const reg = new Registry(new InMemoryStore());
    const { version } = await reg.publish(assetAzp());
    expect(version.scan?.verdict).toBe("pass");

    const leak = writeAzp({
      manifest: { ...base, id: "com.acme.leak2", name: "L", kind: "asset", assets: [{ type: "brush", path: "assets/b" }], token: "ghp_abcdefghij123" } as never,
      payload: { "assets/b": enc("x") },
      license,
    }).azp;
    await expect(reg.publish(leak)).rejects.toBeInstanceOf(RegistryError);
  });

  it("auto-quarantines a version after enough trusted reports, appending to the revocation feed", async () => {
    const reg = new Registry(new InMemoryStore(), { quarantineThreshold: 3 });
    await reg.publish(assetAzp("com.acme.rep"));

    await reg.report({ packageId: "com.acme.rep", version: "1.0.0", reason: "malware", trusted: true });
    await reg.report({ packageId: "com.acme.rep", version: "1.0.0", reason: "malware", trusted: true });
    const third = await reg.report({ packageId: "com.acme.rep", version: "1.0.0", reason: "malware", trusted: true });

    expect(third.quarantined).toBe(true);
    expect((await reg.getVersion("com.acme.rep", "1.0.0"))?.yanked).toBe(true);
    const revs = await reg.revocations();
    expect(revs.some((r) => r.id === "com.acme.rep" && r.reason?.includes("malware"))).toBe(true);
  });

  it("does not quarantine on untrusted reports, but still records them", async () => {
    const reg = new Registry(new InMemoryStore(), { quarantineThreshold: 3 });
    await reg.publish(assetAzp("com.acme.rep2"));
    for (let i = 0; i < 5; i++) {
      await reg.report({ packageId: "com.acme.rep2", version: "1.0.0", reason: "broken" });
    }
    expect((await reg.getVersion("com.acme.rep2", "1.0.0"))?.yanked).toBeFalsy();
    expect((await reg.reports("com.acme.rep2")).length).toBe(5);
  });
});

describe("visibility (private / unlisted hosting)", () => {
  function visAzp(id: string, visibility: "public" | "unlisted" | "private") {
    return writeAzp({
      manifest: { ...base, id, name: id, kind: "asset" as const, visibility, assets: [{ type: "brush", path: "assets/b" }] },
      payload: { "assets/b": enc("x") },
      license,
    }).azp;
  }

  it("hides unlisted and private packages from browse but keeps them resolvable by id", async () => {
    const reg = new Registry(new InMemoryStore());
    await reg.publish(visAzp("com.acme.pub", "public"));
    await reg.publish(visAzp("com.acme.unl", "unlisted"));
    await reg.publish(visAzp("com.acme.prv", "private"));

    const browse = (await reg.list()).map((s) => s.id);
    expect(browse).toContain("com.acme.pub");
    expect(browse).not.toContain("com.acme.unl");
    expect(browse).not.toContain("com.acme.prv");

    // Unlisted stays resolvable by exact id.
    expect((await reg.getSummary("com.acme.unl"))?.visibility).toBe("unlisted");

    // An owner/moderation view can widen to everything.
    const all = (await reg.list({ visibility: "all" })).map((s) => s.id);
    expect(all).toEqual(expect.arrayContaining(["com.acme.pub", "com.acme.unl", "com.acme.prv"]));
  });
});

describe("clone / provenance", () => {
  function brushAzp(id: string, name: string, bytes: Uint8Array) {
    return writeAzp({
      manifest: { ...base, id, name, kind: "asset" as const, assets: [{ type: "brush", path: "assets/b" }] },
      payload: { "assets/b": bytes },
      license,
    }).azp;
  }

  it("flags a package whose assets clone another publisher's, and records the publisher key", async () => {
    const reg = new Registry(new InMemoryStore());
    const orig = generateSigningKey();
    const thief = generateSigningKey();
    const shared = enc("identical-brush-bytes");

    await reg.publish(signAzp(brushAzp("com.orig.brush", "Original Brush", shared), { privateKey: orig.privateKey }));
    const { version } = await reg.publish(signAzp(brushAzp("com.thief.brush", "Copied Brush", shared), { privateKey: thief.privateKey }));

    expect(version.scan?.checks.find((c) => c.id === "clone-assets")?.verdict).toBe("flag");
    expect(version.scan?.verdict).toBe("flag");
    expect(version.publisherKey).toBe(thief.publicKey);
  });

  it("does not flag the same publisher reusing their own assets", async () => {
    const reg = new Registry(new InMemoryStore());
    const key = generateSigningKey();
    const shared = enc("my-own-brush-bytes");

    await reg.publish(signAzp(brushAzp("com.me.one", "Brush One", shared), { privateKey: key.privateKey }));
    const { version } = await reg.publish(signAzp(brushAzp("com.me.two", "Brush Two", shared), { privateKey: key.privateKey }));

    expect(version.scan?.checks.find((c) => c.id === "clone-assets")).toBeUndefined();
  });

  it("flags a reimplemented clone that copied NO bytes (clone-shape), not just exact copies", async () => {
    const reg = new Registry(new InMemoryStore());
    const orig = generateSigningKey();
    const cloner = generateSigningKey();

    // Same shape (asset/brush) and a near-identical pitch, but different names and different bytes.
    function shapeAzp(id: string, name: string, desc: string, bytes: Uint8Array) {
      return writeAzp({
        manifest: {
          ...base,
          id,
          name,
          kind: "asset" as const,
          description: desc,
          assets: [{ type: "brush", path: "assets/b" }],
        },
        payload: { "assets/b": bytes },
        license,
      }).azp;
    }
    const pitch = "halftone dot screen brush pack for comic shading and manga inking";
    await reg.publish(signAzp(shapeAzp("com.orig.tone", "Comic Screentone", pitch, enc("original-bytes")), { privateKey: orig.privateKey }));
    const { version } = await reg.publish(
      signAzp(shapeAzp("com.clone.tone", "Manga Dot Shader", `${pitch} effects`, enc("totally-different-bytes")), { privateKey: cloner.privateKey }),
    );

    const checks = version.scan?.checks ?? [];
    expect(checks.find((c) => c.id === "clone-shape")?.verdict).toBe("flag");
    expect(checks.find((c) => c.id === "clone-assets")).toBeUndefined(); // no bytes were copied
    expect(version.scan?.verdict).toBe("flag");
  });
});
