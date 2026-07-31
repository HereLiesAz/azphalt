/*
 * The web→host handoff from `spec/web-handoff.md`.
 *
 * Everything here is pure: build a link, pick the hosts worth offering. The one impure part — actually
 * navigating, and working out whether anything claimed the link — is `network.attemptHandoff`, behind
 * an expect/actual because "did the user leave for another app" has a different answer on every
 * platform. Keeping the decisions here rather than in the composable is what lets them be tested
 * without a UI, and what stops the two storefronts from drifting to different answers.
 */
package models

/**
 * The link a storefront emits for [id] at [version].
 *
 * Host-agnostic by construction (`web-handoff.md` § Why a custom scheme): no host is named, so any
 * conforming host may claim it and the OS disambiguates when several do. A pack uses this same shape
 * — it is a package with an id, and the host resolves its members (`web-handoff.md` § Packs).
 */
fun installLink(id: String, version: String?, repo: String? = null): String {
    val params = buildList {
        add("id=" + encodeQueryComponent(id))
        // Always sent when known: the storefront is displaying the version, so making the host
        // re-resolve `latest` would be a round-trip to learn what we already had.
        if (!version.isNullOrBlank()) add("version=" + encodeQueryComponent(version))
        if (!repo.isNullOrBlank()) add("repo=" + encodeQueryComponent(repo))
    }
    return "azphalt://install?" + params.joinToString("&")
}

/**
 * The Chrome-on-Android encoding of the same link, carrying [fallbackUrl] for the browser to open
 * when nothing claims the scheme.
 *
 * Not a second contract: this resolves against the identical `azphalt` intent filter, and exists only
 * because it turns "wait and see if we're still here" into a definite answer (`web-handoff.md`
 * § Transport).
 */
fun installIntentUri(id: String, version: String?, fallbackUrl: String, repo: String? = null): String {
    val query = installLink(id, version, repo).substringAfter("azphalt://install?")
    return buildString {
        append("intent://install?").append(query)
        append("#Intent;scheme=azphalt")
        append(";action=android.intent.action.VIEW")
        append(";category=android.intent.category.BROWSABLE")
        append(";S.browser_fallback_url=").append(encodeQueryComponent(fallbackUrl))
        append(";end")
    }
}

/** A host worth offering to someone who has none installed. */
data class HostOption(
    val name: String,
    val hostId: String,
    val installUrl: String,
)

/**
 * The hosts from [catalog] that could run [pkg], for the "get a host" half of the fallback.
 *
 * An app-scoped package (`targetApps` non-empty) offers only the hosts it names — pitching a
 * Guillotine-only pack at a paint app wastes the user's time in the one place they are already stuck.
 * A global package offers every listed host.
 *
 * A listing with no install URL is dropped rather than shown as a dead entry: the entire point of this
 * list is to be somewhere to go.
 */
fun hostsFor(pkg: PackageSummary, catalog: List<PackageSummary>): List<HostOption> {
    val wanted = pkg.targetApps.toSet()
    return catalog.mapNotNull { candidate ->
        val app = candidate.app ?: return@mapNotNull null
        if (!app.isHost) return@mapNotNull null
        val hostId = app.hostId ?: return@mapNotNull null
        // `targetApps` empty ⇒ global ⇒ every host qualifies.
        if (wanted.isNotEmpty() && hostId !in wanted) return@mapNotNull null
        val url = app.installUrl ?: return@mapNotNull null
        HostOption(name = candidate.name, hostId = hostId, installUrl = url)
    }.distinctBy { it.hostId }
}

/**
 * Percent-encode one query component (RFC 3986 unreserved set kept, everything else escaped).
 *
 * Hand-rolled because Kotlin Multiplatform has no common URL encoder — `java.net.URLEncoder` is JVM
 * only, and it is the *wrong* encoder anyway: it produces `application/x-www-form-urlencoded`, which
 * writes a space as `+`. A `+` in a query value is a literal plus to a strict RFC 3986 parser, so a
 * package id or repository URL containing a space would arrive at the host altered.
 */
private fun encodeQueryComponent(value: String): String = buildString {
    for (byte in value.encodeToByteArray()) {
        val c = byte.toInt().toChar()
        val unreserved = c in 'A'..'Z' || c in 'a'..'z' || c in '0'..'9' || c == '-' || c == '.' || c == '_' || c == '~'
        if (unreserved) append(c) else append('%').append(HEX[(byte.toInt() shr 4) and 0xF]).append(HEX[byte.toInt() and 0xF])
    }
}

private const val HEX = "0123456789ABCDEF"
