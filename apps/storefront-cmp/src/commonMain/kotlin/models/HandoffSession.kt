package models

/**
 * What the store is doing on somebody else's behalf, for as long as it is doing it.
 *
 * Non-null only when another app launched the store with a browse request (`spec/store-app.md` § The
 * request). It exists so that request can be answered by **the storefront** — the same search, sort,
 * filters, carousels, artwork and detail pages a person gets when they open the app on their own —
 * instead of by a second, plainer list built for the occasion.
 *
 * There was such a list. It rendered a name, sometimes a description, and the word "Free", and a user
 * arriving from a host saw a different, worse store than the one they would have seen a tap earlier.
 * A browse request changes who the store is acting for and where the bytes end up. It does not change
 * what a store is.
 */
public class HandoffSession(
    /**
     * The requesting app's name, shown so the user can see who they are installing for — the spec
     * SHOULD (`spec/store-app.md` § The request). Null when the caller could not be identified.
     */
    public val callerLabel: String?,
    /**
     * The scoped catalogue read: `app`, `kinds` and `mediaDomains` narrowed to what the host can
     * actually run, rather than the unscoped browse the standalone app does.
     */
    public val load: suspend () -> List<PackageSummary>,
    /**
     * Take this package and hand it back to the caller — purchase if it is paid, download, verify,
     * return. Replaces the `azphalt://install` link the standalone store fires, because a host that
     * launched the store for a result is waiting on that result, not on a scheme.
     */
    public val acquire: (PackageSummary) -> Unit,
    /** The user wants nothing after all. Ends the session with no result. */
    public val cancel: () -> Unit,
)
