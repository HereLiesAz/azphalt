/**
 * In-package path safety — the single guard every verifier, host, and importer uses before it
 * trusts, lists, or materializes a `.azp` entry name to disk. See `spec/package-format.md` § Paths.
 *
 * A `.azp` is a ZIP, and a ZIP entry name is attacker-controlled. The classic "zip-slip" escape
 * ships an entry like `../../x` (POSIX) or `..\..\x` (Windows) so a naive extractor writes outside
 * its target directory. The checks below reject every shape that enables that across POSIX **and**
 * Windows extractors — not just the `/`-separated `..` form — so a single rule holds for a Kotlin
 * host, a Node host, and the TypeScript verifier alike.
 */

/**
 * Returns a human-readable reason if `path` is an unsafe in-package entry name, else `null`.
 *
 * Rejects: empty names; a NUL byte (truncates a C path mid-string); absolute paths (`/x`, `\x`);
 * backslash separators (a Windows extractor treats `a\b` as nested, so `..\x` escapes); a drive
 * letter (`C:x`); and any `.`, `..`, or empty path segment (covers `a/../b`, `a/./b`, `a//b`, and a
 * trailing `/` directory entry). Entry names are compared only after this returns `null`.
 */
export function unsafePathReason(path: string): string | null {
  if (typeof path !== "string" || path.length === 0) return "empty path";
  if (path.includes("\0")) return "NUL byte in path";
  if (path.startsWith("/") || path.startsWith("\\")) return "absolute path";
  if (path.includes("\\")) return "backslash separator";
  if (/^[A-Za-z]:/.test(path)) return "drive letter";
  for (const seg of path.split("/")) {
    if (seg === "" || seg === "." || seg === "..") return `unsafe path segment "${seg}"`;
  }
  return null;
}

/** Convenience boolean form of {@link unsafePathReason}. */
export function isUnsafePath(path: string): boolean {
  return unsafePathReason(path) !== null;
}
