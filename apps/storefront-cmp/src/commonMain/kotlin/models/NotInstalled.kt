/*
 * "Not installed" is never a dead end.
 *
 * Wherever the store says, shows or implies that something is not installed, the screen has to offer
 * the one thing that resolves it. Which thing depends on *what* is missing, and that decision is
 * made here, once, as a pure function — not re-derived in each composable, where the Android, desktop
 * and wasm screens (and the React storefront, which has a mirror of this file in
 * `@azphalt/web-handoff`) would drift apart.
 *
 * Two different things can be "not installed":
 *
 *  - **the extension** — the viewer has never had it, or has bytes without an install, or an install
 *    failed, or it was removed. The action is to install (or buy, then install) that extension.
 *  - **the host** — the app that runs extensions. The viewer pressed Install, nothing on the device
 *    claimed the link, and the extension cannot be installed until a host exists. The action is to
 *    install a host, or to fetch the `.azp` for a host to open later (`spec/web-handoff.md` § When no
 *    host is installed).
 *
 * The strings live in [NotInstalledStrings] rather than at their call sites so the Android, desktop
 * and wasm builds say exactly the same thing and a translation has one file to start from.
 */
package models

/** Every distinct way the UI can find that something is not installed. */
sealed interface NotInstalled {
    /**
     * The viewer has never acquired this package: no host report, no local record.
     *
     * [priceLabel] is set for a paid package (the next step is to buy it, not to install it);
     * [packItems] is set for a pack, so the button can say how much it is about to bring in.
     */
    data class Absent(val priceLabel: String? = null, val packItems: Int? = null) : NotInstalled

    /** Bytes held and verified by a host, no install (`ExtensionState.DOWNLOADED`). */
    data object Downloaded : NotInstalled

    /** Acquisition or installation did not complete (`ExtensionState.FAILED`). */
    data class Failed(val reason: String?) : NotInstalled

    /** Had it, does not now (`ExtensionState.REMOVED`). */
    data object Removed : NotInstalled

    /**
     * The install link was attempted and nothing on this device claimed it: there is no host.
     *
     * [hosts] is the directory already filtered to hosts that can run this package (`hostsFor`);
     * empty when the directory has nothing for it, which must still resolve to somewhere to go.
     * [scopedTo] is the package's `targetApps`, used to point the "find a host" fallback at the right
     * app's page.
     */
    data class HostMissing(
        val hosts: List<HostOption>,
        val scopedTo: List<String> = emptyList(),
    ) : NotInstalled

    /** The "Installed" filter matched nothing: the viewer has no extensions installed (yet). */
    data object NothingInstalledYet : NotInstalled
}

/** What a [RequiredAction] does when pressed. The screen owns *how*; this says *what*. */
enum class ActionKind {
    /** Run the install handoff for a free extension. */
    INSTALL_EXTENSION,

    /** Run the install handoff for a pack — its members install on the host. */
    INSTALL_PACK,

    /** Start checkout for a paid extension; installing follows once it is owned. */
    PURCHASE_EXTENSION,

    /** An install that failed, run again. */
    RETRY_INSTALL,

    /** An extension that was removed, installed again. */
    REINSTALL,

    /** Open a host app's install page ([RequiredAction.url]). */
    INSTALL_HOST,

    /** No directory entry: open the store page that lists apps able to run extensions. */
    FIND_HOST,

    /** Download the `.azp` — the part of the fallback that needs no link support at all. */
    DOWNLOAD_PACKAGE,

    /** Attempt the install link again, for a user who installed a host and came back. */
    RETRY_HANDOFF,

    /** Leave the empty "Installed" view for the catalogue, where there is something to install. */
    BROWSE_CATALOGUE,
}

/**
 * One thing the user can press to resolve a not-installed state.
 *
 * [label] is the visible text and always names the action (`Install Foo`, never `OK`). [description]
 * is the longer spoken form for TalkBack and desktop screen readers; it says what will happen,
 * including where it happens when that is somewhere else. [url] is set only for the kinds that open
 * one.
 */
data class RequiredAction(
    val kind: ActionKind,
    val label: String,
    val description: String,
    val url: String? = null,
)

/** All user-facing text for the not-installed states. One place, so every platform says the same. */
object NotInstalledStrings {
    fun installFree(): String = "Install  ·  Free"
    fun installPack(items: Int): String = "Install pack  ·  $items items"
    fun purchase(price: String): String = "Get  ·  $price"
    fun installDescription(name: String): String = "Install $name"
    fun purchaseDescription(name: String, price: String): String = "Buy $name for $price, then install it"
    fun installPackDescription(name: String, items: Int): String = "Install the pack $name with $items items"

    fun downloadedLabel(name: String): String = "Install “$name”"
    fun downloadedDescription(name: String): String = "Install $name. It has been downloaded but is not installed yet"
    fun failedLabel(): String = "Retry install"
    fun failedDescription(name: String): String = "Try installing $name again"
    fun removedLabel(name: String): String = "Reinstall “$name”"
    fun removedDescription(name: String): String = "Install $name again. It was removed"

    /** The line that explains the button, shown above it so the state is never silent. */
    fun downloadedStatus(): String = "Downloaded, but not installed yet."
    fun failedStatus(reason: String?): String =
        if (reason.isNullOrBlank()) "The last install didn't finish." else "The last install didn't finish ($reason)."
    fun removedStatus(): String = "Removed from your host."

    fun installHostLabel(hostName: String): String = "Install $hostName"
    fun installHostDescription(hostName: String, pkgName: String): String =
        "Open the install page for $hostName, an app that can run $pkgName"
    fun findHostLabel(): String = "Find an app that runs extensions"
    fun findHostDescription(): String = "Open the Azphalt Store page listing apps that can run extensions"
    fun downloadLabel(): String = "Download .azp"
    fun downloadDescription(pkgName: String): String = "Download the package file for $pkgName to open in an app later"
    fun retryHandoffLabel(): String = "Retry install"
    fun retryHandoffDescription(pkgName: String): String = "Try installing $pkgName again, after installing an app"
    fun browseLabel(): String = "Browse extensions to install"
    fun browseDescription(): String = "Show every extension so you can install one"

    fun hostMissingBody(): String =
        "No app on this device can open this extension yet. Install an app that runs extensions, or " +
            "download the package and open it later."
    fun nothingInstalledTitle(): String = "Nothing installed yet"

    // Phase text for [ActionPhase].
    fun working(): String = "Working…"
    fun openingPage(): String = "Opening…"
    fun couldNotOpen(label: String): String = "Couldn't open that page. Select “$label” to try again."
    fun retryPrefix(label: String): String = "Retry: $label"
    fun sheetTitle(name: String): String = "Install “$name”"
}

/** True when a host (or the store's own record) says the viewer has this installed and usable. */
fun isInstalled(entry: ExtensionStateEntry?): Boolean =
    entry?.state == ExtensionState.INSTALLED || entry?.state == ExtensionState.ACTIVE

/**
 * What is not installed about a package, given what is recorded for it; null when it *is* installed.
 *
 * `DOWNLOADED` and `FAILED` are deliberately **not** installed. They used to count as "held", which
 * is how a card could say *Have* about bytes that were never installed, and a detail screen could say
 * *Install again* about something that had not been installed once.
 */
fun notInstalledStateFor(
    entry: ExtensionStateEntry?,
    priceLabel: String? = null,
    packItems: Int? = null,
): NotInstalled? = when (entry?.state) {
    null -> NotInstalled.Absent(priceLabel = priceLabel, packItems = packItems)
    ExtensionState.DOWNLOADED -> NotInstalled.Downloaded
    ExtensionState.FAILED -> NotInstalled.Failed(entry.reason)
    ExtensionState.REMOVED -> NotInstalled.Removed
    ExtensionState.INSTALLED, ExtensionState.ACTIVE -> null
}

/**
 * The page that lists apps able to run extensions, for when the directory had nothing to offer.
 *
 * A package scoped to one app points at that app's page (`/app/<id>`, which the web store serves);
 * anything else points at the store itself, whose catalogue includes the `kind:"app"` listings.
 * Ids are reverse-DNS, so anything outside that alphabet is not trusted into a path.
 */
fun hostDirectoryUrl(scopedTo: List<String>): String {
    val id = scopedTo.firstOrNull { candidate -> candidate.isNotEmpty() && candidate.all { it.isLetterOrDigit() || it == '.' || it == '-' || it == '_' } }
    return if (id == null) STORE_ORIGIN else "$STORE_ORIGIN/app/$id"
}

/**
 * The actions that resolve [state], most important first. Never empty: a not-installed state with
 * nothing to press is the bug this file exists to prevent.
 *
 * For [NotInstalled.HostMissing] the order follows `spec/web-handoff.md` § When no host is installed —
 * download, then get a host, then retry — because downloading the package is a *successful* outcome
 * of pressing Install on a device with no host, not an error to be steered away from.
 */
fun requiredActionsFor(state: NotInstalled, packageName: String): List<RequiredAction> = when (state) {
    is NotInstalled.Absent -> listOf(
        when {
            state.priceLabel != null -> RequiredAction(
                ActionKind.PURCHASE_EXTENSION,
                NotInstalledStrings.purchase(state.priceLabel),
                NotInstalledStrings.purchaseDescription(packageName, state.priceLabel),
            )
            state.packItems != null -> RequiredAction(
                ActionKind.INSTALL_PACK,
                NotInstalledStrings.installPack(state.packItems),
                NotInstalledStrings.installPackDescription(packageName, state.packItems),
            )
            else -> RequiredAction(
                ActionKind.INSTALL_EXTENSION,
                NotInstalledStrings.installFree(),
                NotInstalledStrings.installDescription(packageName),
            )
        },
    )
    NotInstalled.Downloaded -> listOf(
        RequiredAction(
            ActionKind.INSTALL_EXTENSION,
            NotInstalledStrings.downloadedLabel(packageName),
            NotInstalledStrings.downloadedDescription(packageName),
        ),
    )
    is NotInstalled.Failed -> listOf(
        RequiredAction(
            ActionKind.RETRY_INSTALL,
            NotInstalledStrings.failedLabel(),
            NotInstalledStrings.failedDescription(packageName),
        ),
    )
    NotInstalled.Removed -> listOf(
        RequiredAction(
            ActionKind.REINSTALL,
            NotInstalledStrings.removedLabel(packageName),
            NotInstalledStrings.removedDescription(packageName),
        ),
    )
    is NotInstalled.HostMissing -> buildList {
        add(
            RequiredAction(
                ActionKind.DOWNLOAD_PACKAGE,
                NotInstalledStrings.downloadLabel(),
                NotInstalledStrings.downloadDescription(packageName),
            ),
        )
        if (state.hosts.isEmpty()) {
            add(
                RequiredAction(
                    ActionKind.FIND_HOST,
                    NotInstalledStrings.findHostLabel(),
                    NotInstalledStrings.findHostDescription(),
                    url = hostDirectoryUrl(state.scopedTo),
                ),
            )
        } else {
            state.hosts.forEach { host ->
                add(
                    RequiredAction(
                        ActionKind.INSTALL_HOST,
                        NotInstalledStrings.installHostLabel(host.name),
                        NotInstalledStrings.installHostDescription(host.name, packageName),
                        url = host.installUrl,
                    ),
                )
            }
        }
        add(
            RequiredAction(
                ActionKind.RETRY_HANDOFF,
                NotInstalledStrings.retryHandoffLabel(),
                NotInstalledStrings.retryHandoffDescription(packageName),
            ),
        )
    }
    NotInstalled.NothingInstalledYet -> listOf(
        RequiredAction(
            ActionKind.BROWSE_CATALOGUE,
            NotInstalledStrings.browseLabel(),
            NotInstalledStrings.browseDescription(),
        ),
    )
}

/** The line shown with the button for a recorded-but-not-installed state; null when none is needed. */
fun statusLineFor(state: NotInstalled): String? = when (state) {
    NotInstalled.Downloaded -> NotInstalledStrings.downloadedStatus()
    is NotInstalled.Failed -> NotInstalledStrings.failedStatus(state.reason)
    NotInstalled.Removed -> NotInstalledStrings.removedStatus()
    is NotInstalled.HostMissing -> NotInstalledStrings.hostMissingBody()
    NotInstalled.NothingInstalledYet -> NotInstalledStrings.nothingInstalledTitle()
    is NotInstalled.Absent -> null
}

/** Where a button's action is: idle, running, or failed with something to say and a way to retry. */
sealed interface ActionPhase {
    data object Idle : ActionPhase
    data object Running : ActionPhase
    data class Failed(val message: String) : ActionPhase
}

/** What an [ActionButton] shows for an action in a phase. Pure so it can be tested without a UI. */
data class ActionButtonState(
    val label: String,
    val description: String,
    val enabled: Boolean,
    val showProgress: Boolean,
    /** Spoken and shown below the button when the last attempt failed; null otherwise. */
    val error: String?,
)

fun buttonStateFor(action: RequiredAction, phase: ActionPhase): ActionButtonState = when (phase) {
    ActionPhase.Idle -> ActionButtonState(action.label, action.description, enabled = true, showProgress = false, error = null)
    ActionPhase.Running -> ActionButtonState(
        label = NotInstalledStrings.working(),
        description = action.description + ". " + NotInstalledStrings.working(),
        enabled = false,
        showProgress = true,
        error = null,
    )
    // Still pressable, and relabelled: a failure that leaves the same word on the button gives no
    // sign that pressing it again is a retry rather than a repeat of what just failed.
    is ActionPhase.Failed -> ActionButtonState(
        label = NotInstalledStrings.retryPrefix(action.label),
        description = action.description + ". " + phase.message,
        enabled = true,
        showProgress = false,
        error = phase.message,
    )
}

/** The phase after an attempt to open a page: it opened, or it did not and the user is told. */
fun phaseAfterOpen(action: RequiredAction, opened: Boolean): ActionPhase =
    if (opened) ActionPhase.Idle else ActionPhase.Failed(NotInstalledStrings.couldNotOpen(action.label))
