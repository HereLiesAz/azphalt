/*
 * The point of these tests is cross-implementation agreement, not coverage for its own sake.
 *
 * Two independent implementations of the same security check are only as good as the evidence that
 * they agree. `packages/azp/test/vectors/signature-vector.json` is the shared vector the TypeScript
 * implementation is pinned to; reading that same file here is what makes "the Kotlin verifier matches
 * the reference" a fact rather than an intention.
 */
package store.azphalt.azp

import java.io.ByteArrayOutputStream
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

private val vector: Map<String, String> by lazy {
    val path = System.getProperty("azphalt.vector")
        ?: error("azphalt.vector system property not set — see azp/build.gradle.kts")
    val text = java.io.File(path).readText()
    Json.parseToJsonElement(text).jsonObject.mapValues { it.value.jsonPrimitive.content }
}

/** Build a `.azp` from an explicit entry map, so a test can construct malformed packages too. */
private fun zipOf(entries: Map<String, ByteArray>): ByteArray {
    val out = ByteArrayOutputStream()
    ZipOutputStream(out).use { zip ->
        for ((name, data) in entries) {
            zip.putNextEntry(ZipEntry(name))
            zip.write(data)
            zip.closeEntry()
        }
    }
    return out.toByteArray()
}

class SignatureVectorTest {

    @Test
    fun `sha256 digest encoding matches the reference`() {
        // The vector's own manifest bytes, digested. `manifest.files` uses sha256-<hex> — distinct
        // from the registry's `integrity`, which is sha256-<base64>. Conflating them silently breaks
        // every integrity comparison, so pin the encoding explicitly.
        val manifestBytes = vector.getValue("manifestJsonUtf8").toByteArray()
        assertEquals("sha256-" + vector.getValue("manifestSha256Hex"), digest(manifestBytes))
    }

    @Test
    fun `verifies the reference Ed25519 signature`() {
        val ok = verifyEd25519(
            publicKeySpkiBase64 = vector.getValue("publicKeySpkiBase64"),
            signatureBase64 = vector.getValue("signatureBase64"),
            message = vector.getValue("manifestJsonUtf8").toByteArray(),
        )
        assertTrue(ok, "the shared vector's signature must verify — Kotlin and TypeScript have diverged")
    }

    @Test
    fun `rejects a signature over tampered manifest bytes`() {
        // One byte changed. Verbatim signing means this must fail; if it passes, the implementation is
        // canonicalizing somewhere it must not.
        val tampered = vector.getValue("manifestJsonUtf8").replace("\"1.0.0\"", "\"1.0.1\"").toByteArray()
        assertFalse(
            verifyEd25519(vector.getValue("publicKeySpkiBase64"), vector.getValue("signatureBase64"), tampered),
        )
    }

    @Test
    fun `rejects a signature from a different key`() {
        // A valid signature checked against the wrong public key. Catches an implementation that
        // returns true on any well-formed input.
        val otherKey = "MCowBQYDK2VwAyEA" + "A".repeat(43) + "="
        assertFalse(
            verifyEd25519(otherKey, vector.getValue("signatureBase64"), vector.getValue("manifestJsonUtf8").toByteArray()),
        )
    }
}

class VerifyAzpTest {

    private val licenseBytes = "MIT\n".toByteArray()
    private val assetBytes = "hello\n".toByteArray()

    private fun manifestJson(files: Map<String, String>): String {
        val entries = files.entries.joinToString(",\n") { "    \"${it.key}\": \"${it.value}\"" }
        return """
            {
              "azphalt": "0.1",
              "id": "com.azphalt.example.kotlin",
              "name": "Kotlin Test",
              "version": "1.0.0",
              "kind": "asset",
              "license": "MIT",
              "compat": ">=0.1",
              "files": {
            $entries
              }
            }
        """.trimIndent()
    }

    private fun soundPackage(): ByteArray {
        val manifest = manifestJson(
            mapOf("LICENSE" to digest(licenseBytes), "assets/a.txt" to digest(assetBytes)),
        )
        return zipOf(
            mapOf(
                "manifest.json" to manifest.toByteArray(),
                "LICENSE" to licenseBytes,
                "assets/a.txt" to assetBytes,
            ),
        )
    }

    @Test
    fun `accepts a sound unsigned package`() {
        val (pkg, result) = openAzp(soundPackage())
        assertTrue(result.ok, "expected ok, got ${result.errors}")
        assertFalse(result.signed)
        assertNull(result.signerPublicKey)
        assertEquals("com.azphalt.example.kotlin", pkg.id)
        assertEquals("asset", pkg.kind)
    }

    @Test
    fun `rejects a tampered payload`() {
        val manifest = manifestJson(
            mapOf("LICENSE" to digest(licenseBytes), "assets/a.txt" to digest(assetBytes)),
        )
        val tampered = zipOf(
            mapOf(
                "manifest.json" to manifest.toByteArray(),
                "LICENSE" to licenseBytes,
                "assets/a.txt" to "goodbye\n".toByteArray(),
            ),
        )
        val (_, result) = openAzp(tampered)
        assertFalse(result.ok)
        assertContains(result.errors.joinToString(), "digest mismatch: assets/a.txt")
    }

    @Test
    fun `rejects payload with no digest in the manifest`() {
        // The completeness rule. Without it, a package could ship arbitrary extra files that no
        // signature covers — the manifest would still verify and the smuggled content would ride along.
        val manifest = manifestJson(mapOf("LICENSE" to digest(licenseBytes)))
        val smuggled = zipOf(
            mapOf(
                "manifest.json" to manifest.toByteArray(),
                "LICENSE" to licenseBytes,
                "code/evil.js" to "// unsigned\n".toByteArray(),
            ),
        )
        val (_, result) = openAzp(smuggled)
        assertFalse(result.ok)
        assertContains(result.errors.joinToString(), "unlisted payload")
    }

    @Test
    fun `rejects unsafe paths`() {
        val payload = "x".toByteArray()
        val manifest = manifestJson(mapOf("LICENSE" to digest(licenseBytes), "../escape.txt" to digest(payload)))
        val traversal = zipOf(
            mapOf(
                "manifest.json" to manifest.toByteArray(),
                "LICENSE" to licenseBytes,
                "../escape.txt" to payload,
            ),
        )
        val (_, result) = openAzp(traversal)
        assertFalse(result.ok)
        assertContains(result.errors.joinToString(), "unsafe path")
    }

    @Test
    fun `reports missing payload named by the manifest`() {
        val manifest = manifestJson(
            mapOf("LICENSE" to digest(licenseBytes), "assets/missing.txt" to digest(assetBytes)),
        )
        val incomplete = zipOf(mapOf("manifest.json" to manifest.toByteArray(), "LICENSE" to licenseBytes))
        val (_, result) = openAzp(incomplete)
        assertFalse(result.ok)
        assertContains(result.errors.joinToString(), "missing payload for assets/missing.txt")
    }

    @Test
    fun `a failed signature yields no signer key`() {
        // Whatever else goes wrong, the caller must never be handed a key to pin from a signature that
        // did not verify — that is how an attacker would get themselves pinned as the publisher.
        val manifest = manifestJson(mapOf("LICENSE" to digest(licenseBytes)))
        val badSig = """{"alg":"ed25519","publicKey":"${vector.getValue("publicKeySpkiBase64")}","signature":"${vector.getValue("signatureBase64")}"}"""
        val pkg = zipOf(
            mapOf(
                "manifest.json" to manifest.toByteArray(),
                "LICENSE" to licenseBytes,
                "signature.json" to badSig.toByteArray(),
            ),
        )
        val (_, result) = openAzp(pkg)
        assertTrue(result.signed)
        assertFalse(result.ok)
        assertNull(result.signerPublicKey)
    }

    @Test
    fun `rejects a package with no manifest`() {
        val e = runCatching { readAzp(zipOf(mapOf("LICENSE" to licenseBytes))) }.exceptionOrNull()
        assertTrue(e is AzpFormatException, "expected AzpFormatException, got $e")
    }

    @Test
    fun `rejects a zip bomb`() {
        // A 64 MiB entry compresses to a few KiB of zeroes. Unbounded reading of untrusted input is
        // how a package takes the host process down without ever failing a digest check.
        val bomb = zipOf(mapOf("manifest.json" to "{}".toByteArray(), "big.bin" to ByteArray(65 * 1024 * 1024)))
        val e = runCatching { readAzp(bomb) }.exceptionOrNull()
        assertTrue(e is AzpFormatException, "expected AzpFormatException, got $e")
        assertContains(e.message ?: "", "too large")
    }
}
