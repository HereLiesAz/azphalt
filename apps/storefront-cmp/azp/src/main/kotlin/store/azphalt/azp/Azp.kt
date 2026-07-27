/*
 * A Kotlin reader and verifier for the `.azp` container (spec/package-format.md).
 *
 * ## Why this exists
 *
 * Everything else in this repository that can open a package is TypeScript. An Android host that
 * wants to consume extensions therefore had to write ZIP parsing, digest checking and Ed25519
 * verification itself — several hundred lines of security-sensitive code, per host, with no shared
 * test surface. That burden is the single largest reason a developer would decide extensions are not
 * worth supporting.
 *
 * This is the other half of `spec/store-app.md`: the store app can hand a host verified bytes, but the
 * host is still required to re-verify them (a store app is a convenience, not a trust anchor), and it
 * needs *something* to verify them with.
 *
 * ## Faithfulness to the reference implementation
 *
 * The checks below mirror `@azphalt/azp`'s `verifyAzp` deliberately and in order — same unsafe-path
 * rule, same digest encoding, same completeness rule, same signature handling. Where the two could
 * drift, they are pinned together by the shared vector at
 * `packages/azp/test/vectors/signature-vector.json`, which both implementations verify against.
 *
 * A divergence here would not be a cosmetic bug: a host that accepts a package the reference
 * implementation rejects is a host with a weaker security boundary than the spec promises.
 */
package store.azphalt.azp

import java.io.ByteArrayInputStream
import java.security.KeyFactory
import java.security.MessageDigest
import java.security.Signature
import java.security.spec.X509EncodedKeySpec
import java.util.Base64
import java.util.zip.ZipInputStream
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.bouncycastle.jce.provider.BouncyCastleProvider

/** An opened `.azp`: the parsed manifest, its exact stored bytes, and every other entry. */
public class AzpPackage internal constructor(
    /** The parsed `manifest.json`. */
    public val manifest: JsonObject,
    /**
     * The **exact** bytes `manifest.json` was stored as.
     *
     * Kept verbatim because the signature is over these bytes with no re-canonicalization
     * (`spec/package-format.md` § Signing) — re-serializing the parsed object would change whitespace
     * and key order and break every signature.
     */
    public val manifestBytes: ByteArray,
    /** Every entry except `manifest.json`, keyed by its archive path. */
    public val payload: Map<String, ByteArray>,
) {
    public val id: String? get() = manifest["id"]?.jsonPrimitive?.contentOrNullSafe()
    public val version: String? get() = manifest["version"]?.jsonPrimitive?.contentOrNullSafe()
    public val kind: String? get() = manifest["kind"]?.jsonPrimitive?.contentOrNullSafe()
}

/** The outcome of [verifyAzp]. `ok` is the only thing a host should branch on to decide acceptance. */
public data class VerifyResult(
    /** True when there were no errors at all — integrity **and**, if present, the signature. */
    public val ok: Boolean,
    /** Every problem found, not just the first, so a publisher can fix them in one pass. */
    public val errors: List<String>,
    /** Whether the package carried a `signature.json`. Its validity is folded into [ok]. */
    public val signed: Boolean,
    /**
     * Base64 SPKI of the signer's public key when the package is signed and the signature verified.
     *
     * This is what a host pins for publisher continuity (`spec/package-format.md` § Publisher
     * continuity). It is deliberately null unless the signature actually verified — handing back a key
     * from a signature that failed would invite pinning an attacker's.
     */
    public val signerPublicKey: String? = null,
)

/** Thrown when the container cannot be read at all — malformed ZIP, missing manifest, absurd size. */
public class AzpFormatException(message: String) : Exception(message)

private val json = Json { ignoreUnknownKeys = true; isLenient = false }

private fun kotlinx.serialization.json.JsonPrimitive.contentOrNullSafe(): String? =
    if (this is kotlinx.serialization.json.JsonNull) null else content

/**
 * Decompression limits.
 *
 * A `.azp` arrives from a network or another app, so it is untrusted input, and an unbounded
 * `ZipInputStream` read is a zip bomb waiting to happen: a few kilobytes can expand to gigabytes and
 * take the host process down. These caps are far above any legitimate package (the largest in the
 * azphalt registry is a few hundred KiB) and far below anything that hurts.
 */
private const val MAX_ENTRIES = 10_000
private const val MAX_TOTAL_BYTES = 256L * 1024 * 1024
private const val MAX_ENTRY_BYTES = 64L * 1024 * 1024

/**
 * Read a `.azp` into memory.
 *
 * This only parses; it does **not** establish that the package is sound. Call [verifyAzp] — or
 * [openAzp], which does both — before trusting anything inside.
 */
@Throws(AzpFormatException::class)
public fun readAzp(bytes: ByteArray): AzpPackage {
    val entries = LinkedHashMap<String, ByteArray>()
    var total = 0L

    ZipInputStream(ByteArrayInputStream(bytes)).use { zip ->
        while (true) {
            val entry = zip.nextEntry ?: break
            if (entry.isDirectory) { zip.closeEntry(); continue }
            if (entries.size >= MAX_ENTRIES) throw AzpFormatException("too many entries (limit $MAX_ENTRIES)")

            val out = java.io.ByteArrayOutputStream()
            val buf = ByteArray(16 * 1024)
            var entryBytes = 0L
            while (true) {
                val n = zip.read(buf)
                if (n <= 0) break
                entryBytes += n
                total += n
                if (entryBytes > MAX_ENTRY_BYTES) throw AzpFormatException("entry too large: ${entry.name}")
                if (total > MAX_TOTAL_BYTES) throw AzpFormatException("archive expands beyond $MAX_TOTAL_BYTES bytes")
                out.write(buf, 0, n)
            }
            // A duplicate path would let a crafted archive show one file to the digest check and
            // another to whoever reads it later. Reject rather than pick a winner.
            if (entries.put(entry.name, out.toByteArray()) != null) {
                throw AzpFormatException("duplicate entry: ${entry.name}")
            }
            zip.closeEntry()
        }
    }

    val manifestBytes = entries["manifest.json"] ?: throw AzpFormatException("manifest.json is missing")
    val manifest = try {
        json.parseToJsonElement(manifestBytes.decodeToString()).jsonObject
    } catch (e: Exception) {
        throw AzpFormatException("manifest.json is not valid JSON: ${e.message}")
    }

    return AzpPackage(
        manifest = manifest,
        manifestBytes = manifestBytes,
        payload = entries.filterKeys { it != "manifest.json" },
    )
}

/** `sha256-<lowercase hex>` — the encoding `manifest.files` uses. */
public fun digest(bytes: ByteArray): String {
    val md = MessageDigest.getInstance("SHA-256")
    return "sha256-" + md.digest(bytes).joinToString("") { "%02x".format(it) }
}

/**
 * Verify a package's integrity and, when present, its signature.
 *
 * Mirrors `@azphalt/azp`'s `verifyAzp`: unsafe paths, then every digest in `manifest.files`, then
 * completeness (no payload entry without a digest), then the detached Ed25519 signature over the
 * stored manifest bytes.
 *
 * Note what this deliberately does **not** decide: *who* signed it. A valid signature is
 * tamper-evidence, not identity (`spec/package-format.md` § Trust model). Deciding whether the signer
 * is anyone you want to install from is the host's job, via a trust store or a pinned publisher key.
 */
public fun verifyAzp(pkg: AzpPackage): VerifyResult {
    val errors = mutableListOf<String>()
    var signed = false
    var signerKey: String? = null

    for (path in pkg.payload.keys) {
        // Mirrors the reference implementation exactly: a leading slash, or `..` as a whole segment.
        // Backslashes are also rejected here — the spec requires forward-slash paths, and on a host
        // that resolves `\` as a separator a name like `a\..\..\b` would escape the extraction root.
        if (path.startsWith("/") || path.split("/").contains("..") || path.contains('\\')) {
            errors.add("unsafe path: $path")
        }
    }

    val files = pkg.manifest["files"]?.let { runCatching { it.jsonObject }.getOrNull() }
    if (files == null) {
        errors.add("manifest.files is missing")
        return VerifyResult(ok = false, errors = errors, signed = signed)
    }

    for ((path, wantElement) in files) {
        val want = wantElement.jsonPrimitive.contentOrNullSafe()
        val data = pkg.payload[path]
        if (data == null) {
            errors.add("missing payload for $path")
            continue
        }
        if (digest(data) != want) errors.add("digest mismatch: $path")
    }

    // Completeness: anything shipped but undigested is content nobody signed for. `signature.json`
    // is the detached signature, not a signed payload file, so it is exempt.
    for (path in pkg.payload.keys) {
        if (path != "signature.json" && !files.containsKey(path)) {
            errors.add("unlisted payload (no digest in manifest.files): $path")
        }
    }

    val sigRaw = pkg.payload["signature.json"]
    if (sigRaw != null) {
        signed = true
        try {
            val sig = json.parseToJsonElement(sigRaw.decodeToString()).jsonObject
            val alg = sig["alg"]?.jsonPrimitive?.contentOrNullSafe()
            val publicKey = sig["publicKey"]?.jsonPrimitive?.contentOrNullSafe()
            val signature = sig["signature"]?.jsonPrimitive?.contentOrNullSafe()

            if (alg != "ed25519" || publicKey == null || signature == null) {
                errors.add("signature.json is malformed")
            } else if (!verifyEd25519(publicKey, signature, pkg.manifestBytes)) {
                errors.add("signature verification failed")
            } else {
                signerKey = publicKey
            }
        } catch (e: Exception) {
            errors.add("signature error: ${e.message}")
        }
    }

    return VerifyResult(
        ok = errors.isEmpty(),
        errors = errors,
        signed = signed,
        signerPublicKey = if (errors.isEmpty()) signerKey else null,
    )
}

/** Read and verify in one step, returning the package only when it is sound. */
@Throws(AzpFormatException::class)
public fun openAzp(bytes: ByteArray): Pair<AzpPackage, VerifyResult> {
    val pkg = readAzp(bytes)
    return pkg to verifyAzp(pkg)
}

private val bouncyCastle by lazy { BouncyCastleProvider() }

/**
 * Ed25519 verification over `message`, with `publicKeySpkiBase64` in the same base64 SPKI encoding
 * `signature.json` carries.
 *
 * Returns false rather than throwing on a malformed key or signature: a corrupt signature is an
 * ordinary verification failure, not an exceptional condition, and the caller records it as an error
 * either way.
 */
internal fun verifyEd25519(publicKeySpkiBase64: String, signatureBase64: String, message: ByteArray): Boolean =
    try {
        val decoder = Base64.getDecoder()
        val keySpec = X509EncodedKeySpec(decoder.decode(publicKeySpkiBase64))
        val key = KeyFactory.getInstance("Ed25519", bouncyCastle).generatePublic(keySpec)
        Signature.getInstance("Ed25519", bouncyCastle).run {
            initVerify(key)
            update(message)
            verify(decoder.decode(signatureBase64))
        }
    } catch (_: Exception) {
        false
    }
