package models

/** The store's own origin: the only place a purchase entitlement may be sent. */
const val STORE_ORIGIN: String = "https://www.azphalt.store"

/** `scheme://host:port` of a URL, lower-cased with the default port filled in; null when it is not http(s). */
internal fun originOf(url: String): String? {
    val trimmed = url.trim()
    val scheme = trimmed.substringBefore("://", "").lowercase()
    if (scheme != "https" && scheme != "http") return null
    val authority = trimmed.substringAfter("://").substringBefore('/').substringBefore('?').substringBefore('#')
    // Userinfo ("evil@host") is how a lookalike URL smuggles a different host; refuse it outright.
    if (authority.contains('@') || authority.isEmpty()) return null
    val host = authority.substringBeforeLast(':', authority).lowercase()
    val port = authority.substringAfterLast(':', "").toIntOrNull() ?: if (scheme == "https") 443 else 80
    if (host.isEmpty()) return null
    return "$scheme://$host:$port"
}

/**
 * An entitlement token is a bearer credential for the paid package. Sending it to a repository the
 * calling app chose (an Intent extra any installed app can set) would hand it to that app's server, which
 * could then replay it against the store. It goes only to the store's own origin.
 */
fun mayReceiveEntitlement(repository: String?): Boolean =
    repository == null || originOf(repository) == originOf(STORE_ORIGIN)
