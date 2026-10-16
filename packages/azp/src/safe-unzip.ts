/**
 * Decompression-bomb-bounded ZIP reader. Every `.azp` reaching a verifier, host, importer, worker,
 * or MCP tool comes in through here instead of a bare `unzipSync`, so a few-KB archive that inflates
 * to gigabytes can no longer exhaust memory before any check runs. See `spec/package-format.md`
 * § Limits; these ceilings match the Kotlin verifier's `MAX_ENTRY_BYTES` / `MAX_TOTAL_BYTES`.
 *
 * fflate's `filter` runs against each entry's ZIP header **before** decompression, so a bomb is
 * rejected without being inflated. `originalSize` is the header's declared uncompressed size; a
 * dishonest header that under-declares is still bounded, because fflate inflates into a buffer sized
 * to that declaration and throws if the stream overruns it.
 */
import { unzipSync } from "fflate";

/** Maximum number of entries in one `.azp`. */
export const MAX_ENTRIES = 4096;
/** Maximum uncompressed bytes for any single entry (256 MiB). */
export const MAX_ENTRY_BYTES = 256 * 1024 * 1024;
/** Maximum total uncompressed bytes across all entries (512 MiB). */
export const MAX_TOTAL_BYTES = 512 * 1024 * 1024;

/**
 * Unzip `bytes` with entry-count and uncompressed-size caps. Throws `Error` (with an `azp:` prefix)
 * when a cap is exceeded or the archive is malformed — callers that already wrap `unzipSync` in
 * `try`/`catch` (e.g. {@link verifyAzp}) need no change.
 */
export function safeUnzip(bytes: Uint8Array): Record<string, Uint8Array> {
  let entries = 0;
  let total = 0;
  return unzipSync(bytes, {
    filter(file) {
      if (++entries > MAX_ENTRIES) {
        throw new Error(`azp: too many entries (> ${MAX_ENTRIES})`);
      }
      if (file.originalSize > MAX_ENTRY_BYTES) {
        throw new Error(`azp: entry "${file.name}" exceeds ${MAX_ENTRY_BYTES} uncompressed bytes`);
      }
      total += file.originalSize;
      if (total > MAX_TOTAL_BYTES) {
        throw new Error(`azp: archive exceeds ${MAX_TOTAL_BYTES} total uncompressed bytes`);
      }
      return true;
    },
  });
}
