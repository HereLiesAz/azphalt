package network

/**
 * Fire an `azphalt://install` link and report whether anything took it.
 *
 * `true` means a host claimed the link and the user has left for it. `false` means nothing did, and
 * the caller should show the fallback (`spec/web-handoff.md` § When no host is installed) — the
 * `.azp` download and the host directory.
 *
 * The attempt is made on **every** platform. There is deliberately no "is a host likely here" check
 * first: any such check is a list of platforms someone thought hosts existed on, and it fails closed
 * against exactly the hosts it has not heard of yet. The cost of being wrong is an unhandled-scheme
 * message in some browsers, followed by the same fallback the user would have got anyway.
 *
 * Implementations MUST NOT throw. A handoff that cannot be attempted is a `false` — the fallback is a
 * good outcome, and an exception here would replace it with an error.
 */
expect suspend fun attemptHandoff(link: String): Boolean

/**
 * The URI to actually navigate to for `id` at `version`.
 *
 * Always `azphalt://install?…` semantically — this exists only so a platform can choose a better
 * *encoding* of the same request. Chrome on Android gets the `intent://` form, which resolves against
 * the identical intent filter but carries a fallback URL, turning "wait and see if we're still here"
 * into a definite answer (`spec/web-handoff.md` § Transport). Everywhere else this is the plain link.
 */
expect fun handoffUri(id: String, version: String?): String

/** Open [url] in the platform's browser — the "get a host" and "download the .azp" actions. */
expect fun openExternal(url: String)

/**
 * The conforming download URL for [id] at [version] (`spec/repository-api.md` § Download Package) —
 * the `.azp` half of the fallback, which works with no link support at all because a host registered
 * for the media type opens the downloaded file directly.
 *
 * Per-platform because the origin differs: in the browser this is same-origin and relative, so a
 * self-hosted storefront serves its own bytes rather than the flagship registry's; the packaged apps
 * have no page to be relative to and name the registry outright.
 */
expect fun downloadUrl(id: String, version: String): String
