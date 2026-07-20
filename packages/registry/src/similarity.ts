/**
 * Cross-package similarity for clone / squatting detection (spec/marketplace-integrity.md § 4).
 *
 * Exact copies are the easy case — identical asset digests give them away. **Clones** are the hard
 * case: a package that *reimplements* another (different bytes, a tweaked name, the same shape and
 * pitch) shares no digests, so a digest-only check waves it straight through. This module scores
 * resemblance across several weak signals — fuzzy name (trigram similarity, not just substrings),
 * description overlap, and structural *shape* (same kind + asset-type palette + capability set) — and
 * blends them, so a clone that copied no bytes still surfaces for moderation.
 */
import type { Manifest } from "@azphalt/azdk";

/** Normalized name for comparison: lowercase, alphanumerics only. */
export function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Asset-content digests of a manifest (excludes the LICENSE and the detached signature). */
export function assetDigests(files: Record<string, string> | undefined): Set<string> {
  const out = new Set<string>();
  for (const [path, d] of Object.entries(files ?? {})) {
    if (path !== "LICENSE" && path !== "signature.json") out.add(d);
  }
  return out;
}

/** The legacy substring name test: normalized-equal or one containing the other (both ≥ 4 chars). */
export function nameContains(a: string, b: string): boolean {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  return na.length >= 4 && nb.length >= 4 && (na === nb || na.includes(nb) || nb.includes(na));
}

/** Character trigrams (3-shingles) of a string — the basis for fuzzy name similarity. */
function trigrams(s: string): Set<string> {
  const padded = `  ${s} `;
  const out = new Set<string>();
  for (let i = 0; i < padded.length - 2; i++) out.add(padded.slice(i, i + 3));
  return out;
}

/** Sørensen–Dice coefficient over two sets: 2·|A∩B| / (|A|+|B|), in [0,1]. */
function dice<T>(a: Set<T>, b: Set<T>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let shared = 0;
  for (const x of a) if (b.has(x)) shared++;
  return (2 * shared) / (a.size + b.size);
}

/** Fraction of A present in B: |A∩B| / |A| (0 when A is empty). Asymmetric on purpose. */
function containment<T>(a: Set<T>, b: Set<T>): number {
  if (a.size === 0) return 0;
  let shared = 0;
  for (const x of a) if (b.has(x)) shared++;
  return shared / a.size;
}

const STOP = new Set(["the", "and", "for", "with", "that", "this", "any", "are", "from", "into", "onto", "your", "you"]);

/** Content-word tokens (length ≥ 3, minus stopwords) of free text — for description overlap. */
function contentTokens(s: string | undefined): Set<string> {
  const out = new Set<string>();
  for (const w of (s ?? "").toLowerCase().match(/[a-z0-9]{3,}/g) ?? []) if (!STOP.has(w)) out.add(w);
  return out;
}

/** Weighted resemblance of two packages, with the evidence behind the score. */
export interface SimilarityEvidence {
  /** Overall resemblance in [0,1] — a weighted blend of the signals below. */
  score: number;
  /** Fraction of A's asset digests present in B (the exact-copy signal). */
  assetOverlap: number;
  /** Fuzzy name similarity in [0,1] (trigram Dice) — catches typos/rewordings, not just substrings. */
  nameSimilarity: number;
  /** Description content-word overlap in [0,1] (Dice). */
  descriptionSimilarity: number;
  /** Same kind AND an overlapping asset-type palette / capability set — a reimplemented "shape". */
  structureMatch: boolean;
  /** Human-readable evidence lines for the moderation queue. */
  signals: string[];
}

/**
 * Score how much package [b] resembles package [a] — asymmetric, read as "is b a clone of a?". Blends
 * exact asset overlap, fuzzy name similarity, description overlap, and structural shape. The caller
 * picks thresholds; a `structureMatch` plus a moderate name/description signal is the tell for a
 * byte-different clone that an asset-digest check alone would miss.
 */
export function packageSimilarity(a: Manifest, b: Manifest): SimilarityEvidence {
  const assetOverlap = containment(assetDigests(a.files), assetDigests(b.files));
  const nameSimilarity = dice(trigrams(normalizeName(a.name)), trigrams(normalizeName(b.name)));
  const descriptionSimilarity = dice(contentTokens(a.description), contentTokens(b.description));

  const sameKind = a.kind === b.kind;
  const aTypes = new Set((a.assets ?? []).map((x) => x.type));
  const bTypes = new Set((b.assets ?? []).map((x) => x.type));
  const aCaps = new Set(a.capabilities ?? []);
  const bCaps = new Set(b.capabilities ?? []);
  const typeOverlap = containment(aTypes, bTypes);
  const capOverlap = aCaps.size > 0 || bCaps.size > 0 ? dice(aCaps, bCaps) : 0;
  // A "shape" clone: same kind, and either the asset palette or the capability set substantially lines up.
  const structureMatch = sameKind && (aTypes.size > 0 || aCaps.size > 0) && (typeOverlap >= 0.5 || capOverlap >= 0.6);

  const signals: string[] = [];
  if (assetOverlap >= 0.6) signals.push(`${Math.round(assetOverlap * 100)}% of assets are byte-identical`);
  if (nameSimilarity >= 0.6) signals.push(`name ${Math.round(nameSimilarity * 100)}% similar ("${b.name}" vs "${a.name}")`);
  if (descriptionSimilarity >= 0.5) signals.push(`descriptions ${Math.round(descriptionSimilarity * 100)}% overlap`);
  if (structureMatch) signals.push(`same ${a.kind} shape (asset types / capabilities line up)`);

  // Weighted blend: exact copies dominate, but a structural clone with name/description resemblance and
  // no shared bytes still scores enough to flag.
  const score = Math.min(
    1,
    0.6 * assetOverlap + 0.25 * nameSimilarity + 0.15 * descriptionSimilarity + (structureMatch ? 0.2 : 0),
  );

  return { score, assetOverlap, nameSimilarity, descriptionSimilarity, structureMatch, signals };
}
