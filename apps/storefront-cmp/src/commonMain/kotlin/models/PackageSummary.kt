package models

import kotlinx.serialization.Serializable

@Serializable
data class PriceDto(val amountCents: Int, val currency: String)

/** One member of a pack (kind:"pack") — a reference to another package, not a copy of its bytes. */
@Serializable
data class PackEntryDto(
    val id: String,
    val version: String? = null,
    val required: Boolean = false,
    val note: String? = null,
)

/** A pack's member references, surfaced from its manifest by the browse API for the detail view. */
@Serializable
data class PackDto(val entries: List<PackEntryDto> = emptyList())

/**
 * Generated store-card artwork (`spec/extension-manifest.md` § preview).
 *
 * `image` is a still — for a filter, the actual output of running it; for a motion preset, a
 * filmstrip sampled from its keyframes. It may be an in-package path or an absolute URL; the store
 * serves its own from `/previews/<id>.png`.
 */
@Serializable
data class PreviewDto(val image: String? = null, val clip: String? = null)

/** Android install target for a `kind:"app"` listing (`spec/extension-manifest.md` § app). */
@Serializable
data class AndroidPlatformDto(val packageId: String? = null, val install: String? = null)

/** PWA install target for a `kind:"app"` listing. */
@Serializable
data class PwaPlatformDto(val startUrl: String? = null, val manifestUrl: String? = null)

@Serializable
data class PlatformsDto(val android: AndroidPlatformDto? = null, val pwa: PwaPlatformDto? = null)

/**
 * The `app` block of a `kind:"app"` package, as `/api/packages` surfaces it.
 *
 * `handoffs` is deliberately absent: the storefront never invokes a companion, and the list can be
 * large. What it does need is [roles] and [hostId] — the two fields that turn a listing into a **host
 * directory** entry (`spec/web-handoff.md` § Host directory).
 *
 * [roles] is non-null here because the API resolves the `["companion"]` default before serving, so
 * this side never has to know the default exists.
 */
@Serializable
data class AppDto(
    val roles: List<String> = listOf("companion"),
    val hostId: String? = null,
    val platforms: PlatformsDto? = null,
) {
    /** True when this listing is an app that *runs* extensions — i.e. somewhere to install one. */
    val isHost: Boolean get() = "host" in roles

    /** Where to get this app, preferring the native target over the web one. */
    val installUrl: String? get() = platforms?.android?.install ?: platforms?.pwa?.startUrl
}

@Serializable
data class PackageSummary(
    val id: String,
    val name: String,
    val kind: String = "code",
    val description: String? = null,
    val author: String? = null,
    val version: String,
    val price: PriceDto? = null,
    val priceStatus: String = "free",
    val capabilities: List<String> = emptyList(),
    val downloads: Int = 0,
    val rating: Float? = null,
    val ratingCount: Int = 0,
    val updatedAt: String? = null,
    val targetApps: List<String> = emptyList(),
    val mediaDomains: List<String> = emptyList(),
    val types: List<String> = emptyList(),
    /** Developer content-maturity self-attestation: "general" (default) or "mature" (18+, age-gated). */
    val maturity: String = "general",
    val pack: PackDto? = null,
    /** Present only on a `kind:"app"` listing — the host directory is built from these. */
    val app: AppDto? = null,
    /**
     * The real artwork, when the package has any.
     *
     * Without this the UI could only ever draw the procedural stand-in in `PreviewArt` — which is
     * what it did, even after the repository started serving generated previews, because nothing on
     * this side knew the field existed.
     */
    val preview: PreviewDto? = null
) {
    /** True when the developer flagged this as 18+ content the store should put behind an age gate. */
    val isMature: Boolean get() = maturity == "mature"
}
