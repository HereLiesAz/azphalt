/*
 * The acquisition handoff from `spec/store-app.md`: another app asks the store to fetch an extension,
 * and gets back bytes this app has already verified.
 *
 * The contract's whole point is that a host does not have to implement browsing, downloading or
 * verification. What it must still do — and what this app cannot do for it — is check the bytes again
 * and decide whether the signer is anyone it wants to install from. A store app is a convenience, not
 * a trust anchor; see the spec's "What this is not".
 */
package store.azphalt.storefront

import android.content.ClipData
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.core.content.FileProvider
import java.io.File
import models.ExtensionStateEntry
import models.parseHostInventory
import store.azphalt.azp.VerifyResult
import store.azphalt.azp.openAzp

/** The action a host launches, and the extras it may set. Mirrors `spec/store-app.md` § The request. */
public object Handoff {
    public const val ACTION_BROWSE: String = "store.azphalt.action.BROWSE"

    public const val EXTRA_APP: String = "app"
    public const val EXTRA_MEDIA_DOMAINS: String = "mediaDomains"
    public const val EXTRA_KINDS: String = "kinds"
    public const val EXTRA_COMPAT: String = "compat"
    public const val EXTRA_REPOSITORY: String = "repository"
    public const val EXTRA_ID: String = "id"
    public const val EXTRA_MULTIPLE: String = "multiple"

    /**
     * What the host already holds — `spec/state-reporting.md` § 3.1.
     *
     * Namespaced like the result extras rather than bare like the filters above, because it is not a
     * filter: the filters shape *what is shown*, this shapes *how it is labelled*.
     */
    public const val EXTRA_INVENTORY: String = "azphalt.extra.INVENTORY"

    /** The host's read-only state provider authority (`spec/state-reporting.md` § 3.2). */
    public const val EXTRA_STATE_AUTHORITY: String = "azphalt.extra.STATE_AUTHORITY"

    public const val RESULT_ID: String = "azphalt.extra.ID"
    public const val RESULT_VERSION: String = "azphalt.extra.VERSION"
    public const val RESULT_INTEGRITY: String = "azphalt.extra.INTEGRITY"
    public const val RESULT_SIGNED: String = "azphalt.extra.SIGNED"
    public const val RESULT_SIGNER_KEY: String = "azphalt.extra.SIGNER_KEY"
    public const val RESULT_ENTITLEMENT: String = "azphalt.extra.ENTITLEMENT"

    /**
     * The report token from the download that produced these bytes
     * (`spec/state-reporting.md` § 4.2).
     *
     * Handed on rather than spent here: this app downloaded, but only the host knows whether it went
     * on to install, verified the bytes and declined, or crashed. Reporting an install we cannot
     * observe would put a number in the registry that is not true.
     */
    public const val RESULT_REPORT_TOKEN: String = "azphalt.extra.REPORT_TOKEN"

    public const val MIME: String = "application/vnd.azphalt.package"
}

/**
 * What the host asked for.
 *
 * `app` is the only required field, and the store must not return something the other filters
 * exclude — handing back a package the host has already said it cannot run wastes the user's time
 * twice: once choosing it, once being told it does not work.
 */
public data class BrowseRequest(
    public val app: String,
    public val mediaDomains: List<String> = emptyList(),
    public val kinds: List<String> = emptyList(),
    public val compat: String? = null,
    public val repository: String? = null,
    public val id: String? = null,
    public val multiple: Boolean = false,
    /** Host-reported extension states, by package id. Empty when the host sent none, or sent junk. */
    public val inventory: Map<String, ExtensionStateEntry> = emptyMap(),
    /** The host's state provider authority, when it offered one. */
    public val stateAuthority: String? = null,
) {
    public companion object {
        /** Read a request off the launching intent, or null when `app` is absent (a malformed call). */
        public fun from(intent: Intent?): BrowseRequest? {
            val source = intent ?: return null

            val app = source.getStringExtra(Handoff.EXTRA_APP)?.takeIf { it.isNotBlank() }
                // The link form carries the same fields as query parameters.
                ?: source.data?.getQueryParameter(Handoff.EXTRA_APP)?.takeIf { it.isNotBlank() }
                ?: return null

            fun list(key: String): List<String> =
                source.getStringArrayExtra(key)?.toList()
                    ?: source.data?.getQueryParameter(key)?.split(",")?.map { it.trim() }?.filter { it.isNotEmpty() }
                    ?: emptyList()

            return BrowseRequest(
                app = app,
                mediaDomains = list(Handoff.EXTRA_MEDIA_DOMAINS),
                kinds = list(Handoff.EXTRA_KINDS),
                compat = source.getStringExtra(Handoff.EXTRA_COMPAT),
                repository = source.getStringExtra(Handoff.EXTRA_REPOSITORY),
                id = source.getStringExtra(Handoff.EXTRA_ID) ?: source.data?.getQueryParameter(Handoff.EXTRA_ID),
                multiple = source.getBooleanExtra(Handoff.EXTRA_MULTIPLE, false),
                // Never from the link form: `azphalt://browse?...` returns nothing, so a URL long
                // enough to carry an inventory would buy the user nothing and log a huge intent.
                inventory = parseHostInventory(source.getStringExtra(Handoff.EXTRA_INVENTORY)),
                stateAuthority = source.getStringExtra(Handoff.EXTRA_STATE_AUTHORITY)?.takeIf { it.isNotBlank() },
            )
        }
    }

    /**
     * Whether a package satisfies this request.
     *
     * Applied to the result as well as the browse list. Filtering the grid is a courtesy; refusing to
     * *return* something excluded is the obligation, because the host trusted the filters enough not
     * to re-check them.
     */
    public fun accepts(kind: String, packageMediaDomains: List<String>, targetApps: List<String>): Boolean {
        if (kinds.isNotEmpty() && kind !in kinds) return false
        // Intersection, not containment: a LUT spanning image+video is usable by a video host.
        if (mediaDomains.isNotEmpty() && packageMediaDomains.isNotEmpty() &&
            packageMediaDomains.none { it in mediaDomains }
        ) return false
        // An app-scoped package belongs to its host's store, not everyone's.
        if (targetApps.isNotEmpty() && app !in targetApps) return false
        return true
    }
}

/** A package the store fetched and checked, staged for handover. */
public data class AcquiredPackage(
    public val id: String,
    public val version: String,
    public val integrity: String?,
    public val entitlement: String?,
    public val verify: VerifyResult,
    public val file: File,
    /**
     * The `azphalt-report-token` from the download, when the repository issued one.
     *
     * Passed to the host rather than spent here (`spec/state-reporting.md` § 4.2): this app knows a
     * download happened, the host knows whether an install did, and only the second is worth counting.
     */
    public val reportToken: String? = null,
)

/**
 * Verify [bytes] and stage them for handover, or throw if they do not check out.
 *
 * Verifying here is not a substitute for the host's own check — it is what stops the store from being
 * a laundering step. If this app forwarded bytes it had not validated, a host following the spec would
 * catch it, but a host in a hurry would not, and the store would have made the ecosystem's weakest
 * link its default path.
 */
public fun stageForHandoff(
    context: Context,
    bytes: ByteArray,
    integrity: String?,
    entitlement: String?,
    reportToken: String? = null,
): AcquiredPackage {
    val (pkg, result) = openAzp(bytes)
    if (!result.ok) {
        throw IllegalStateException("package failed verification: ${result.errors.joinToString("; ")}")
    }
    val id = pkg.id ?: throw IllegalStateException("manifest has no id")
    val version = pkg.version ?: throw IllegalStateException("manifest has no version")

    val dir = File(context.cacheDir, "handoff").apply { mkdirs() }
    // The filename lands in a path shared with another app, so it is built from a sanitised id rather
    // than trusted verbatim — a manifest is attacker-controlled data until proven otherwise, and one
    // containing `../` should not be able to steer where these bytes get written.
    val safe = (id + "-" + version).replace(Regex("[^A-Za-z0-9._@-]"), "_")
    val file = File(dir, "$safe.azp")
    file.writeBytes(bytes)

    return AcquiredPackage(id, version, integrity, entitlement, result, file, reportToken)
}

/**
 * Build the `RESULT_OK` intent for [packages].
 *
 * The read grant is the part that is easy to get wrong: without `FLAG_GRANT_READ_URI_PERMISSION` the
 * host hits a `SecurityException` the moment it opens the URI, and the handoff fails in a way that
 * looks like a corrupt download rather than a missing flag.
 */
public fun handoffResult(context: Context, packages: List<AcquiredPackage>): Intent {
    require(packages.isNotEmpty()) { "a RESULT_OK handoff must carry at least one package" }

    val authority = "${context.packageName}.packages"
    val uris = packages.map { FileProvider.getUriForFile(context, authority, it.file) }

    val intent = Intent().apply {
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        setDataAndType(uris.first(), Handoff.MIME)
    }

    if (uris.size > 1) {
        // ClipData is how multiple URIs travel with a grant attached to each; putting them in an
        // extra would hand over URIs the host has no permission to read.
        val clip = ClipData.newUri(context.contentResolver, "azphalt packages", uris.first())
        uris.drop(1).forEach { clip.addItem(ClipData.Item(it)) }
        intent.clipData = clip
    }

    val first = packages.first()
    intent.putExtra(Handoff.RESULT_ID, first.id)
    intent.putExtra(Handoff.RESULT_VERSION, first.version)
    first.integrity?.let { intent.putExtra(Handoff.RESULT_INTEGRITY, it) }
    intent.putExtra(Handoff.RESULT_SIGNED, first.verify.signed)
    // Only ever the key from a signature that actually verified — the verifier nulls it otherwise.
    // A host pins this key for publisher continuity, so a key from a failed signature would pin an
    // attacker as the legitimate publisher of that id.
    first.verify.signerPublicKey?.let { intent.putExtra(Handoff.RESULT_SIGNER_KEY, it) }
    first.entitlement?.let { intent.putExtra(Handoff.RESULT_ENTITLEMENT, it) }
    first.reportToken?.let { intent.putExtra(Handoff.RESULT_REPORT_TOKEN, it) }

    return intent
}

/** Explicitly grant [callingPackage] read access, for callers that resolved the activity indirectly. */
public fun grantTo(context: Context, callingPackage: String?, uri: Uri) {
    if (callingPackage.isNullOrBlank()) return
    context.grantUriPermission(callingPackage, uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)
}
