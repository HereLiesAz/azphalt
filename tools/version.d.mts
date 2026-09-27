// Types for tools/version.mjs, so TypeScript build configs (apps/storefront-react/vite.config.ts) can
// import it under strict mode.
export interface Version {
  major: number;
  minor: number;
  patch: number;
  build: number;
}
export type BumpKind = "major" | "minor" | "patch";
export declare const repoRoot: string;
export declare const versionFile: string;
export declare function readVersion(file?: string): Version;
export declare function formatVersion(v: Version): string;
export declare function writeVersion(v: Version, file?: string): Version;
export declare function bumpVersion(kind?: BumpKind, file?: string): Version;
