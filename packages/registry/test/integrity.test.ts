import { describe, it, expect } from "vitest";
import { writeAzp, digest } from "@azphalt/azp";
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
