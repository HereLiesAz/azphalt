package models

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue
import network.isSafeExternalUrl

/**
 * Every "not installed" state resolves to a button that does the one thing that fixes it.
 *
 * The mapping is a pure function so it can be tested exhaustively and without a UI. Exhaustive in
 * two senses: every [ExtensionState] (and "no record") is run through [notInstalledStateFor], and
 * [expectedKinds] is a `when` over the sealed [NotInstalled] with no `else` — so adding a state
 * without deciding what its button is stops this file compiling, rather than shipping a dead end.
 *
 * The React storefront has a mirror of this suite in `packages/web-handoff/test/not-installed.test.ts`;
 * the two are the same contract in two languages and are meant to be edited together.
 */
class NotInstalledTest {
    private val hostA = HostOption(name = "Graffux", hostId = "com.hereliesaz.graffux", installUrl = "https://example.test/graffux")
    private val hostB = HostOption(name = "Guillotine", hostId = "com.hereliesaz.guillotine", installUrl = "https://example.test/guillotine")

    private fun entry(state: ExtensionState?, reason: String? = null) =
        ExtensionStateEntry(id = "com.acme.lut", version = "1.0.0", state = state, reason = reason)

    private val samples: List<NotInstalled> = listOf(
        NotInstalled.Absent(),
        NotInstalled.Absent(priceLabel = "$4.99"),
        NotInstalled.Absent(packItems = 3),
        NotInstalled.Downloaded,
        NotInstalled.Failed("integrity-mismatch"),
        NotInstalled.Failed(null),
        NotInstalled.Absent(priceLabel = "$4.99", checkoutUnavailable = true),
        NotInstalled.Removed,
        NotInstalled.HostMissing(hosts = listOf(hostA, hostB)),
        NotInstalled.HostMissing(hosts = emptyList()),
        NotInstalled.NothingInstalledYet,
    )

    /** What the FIRST action of each state must be. No `else`: a new state must be decided here. */
    private fun expectedKinds(state: NotInstalled): List<ActionKind> = when (state) {
        is NotInstalled.Absent -> listOf(
            when {
                state.priceLabel != null -> if (state.checkoutUnavailable) ActionKind.PAID_UNAVAILABLE else ActionKind.PURCHASE_EXTENSION
                state.packItems != null -> ActionKind.INSTALL_PACK
                else -> ActionKind.INSTALL_EXTENSION
            },
        )
        NotInstalled.Downloaded -> listOf(ActionKind.INSTALL_EXTENSION)
        is NotInstalled.Failed -> listOf(ActionKind.RETRY_INSTALL)
        NotInstalled.Removed -> listOf(ActionKind.REINSTALL)
        is NotInstalled.HostMissing ->
            listOf(ActionKind.DOWNLOAD_PACKAGE) +
                state.hosts.map { ActionKind.INSTALL_HOST } +
                listOf(ActionKind.RETRY_HANDOFF)
        NotInstalled.NothingInstalledYet -> listOf(ActionKind.BROWSE_CATALOGUE)
    }

    @Test
    fun everyStateMapsToExactlyItsActions() {
        for (state in samples) {
            val actions = requiredActionsFor(state, "Acme LUT")
            assertEquals(expectedKinds(state), actions.map { it.kind }, "actions for $state")
        }
    }

    @Test
    fun noStateIsEverADeadEnd() {
        for (state in samples) {
            assertTrue(requiredActionsFor(state, "Acme LUT").isNotEmpty(), "no action for $state")
        }
    }

    @Test
    fun everyActionNamesWhatItDoesAndNeverSaysOk() {
        for (state in samples) for (action in requiredActionsFor(state, "Acme LUT")) {
            assertTrue(action.label.isNotBlank(), "blank label for $action")
            assertTrue(action.description.isNotBlank(), "blank description for $action")
            assertFalse(action.label.trim().equals("OK", ignoreCase = true), "label is OK for $action")
            // The spoken form says at least as much as the visible one.
            assertTrue(action.description.length >= 8, "description too thin for $action")
            // WCAG 2.5.3: the accessible name starts with the visible text.
            assertTrue(action.description.startsWith(action.label), "name must start with label: $action")
        }
    }

    @Test
    fun everyExtensionStateIsAccountedFor() {
        // null = never acquired; then each host-reported state.
        val states: List<ExtensionState?> = listOf(null) + ExtensionState.entries
        for (state in states) {
            val result = notInstalledStateFor(entry(state))
            val installed = state == ExtensionState.INSTALLED || state == ExtensionState.ACTIVE
            if (installed) assertNull(result, "$state is installed, so nothing is missing") else assertTrue(result != null, "$state is not installed")
            assertEquals(installed, isInstalled(entry(state)), "isInstalled($state)")
        }
        assertFalse(isInstalled(null))
    }

    @Test
    fun recordedStatesMapToTheirOwnVerbs() {
        assertEquals(NotInstalled.Absent(), notInstalledStateFor(null))
        assertEquals(NotInstalled.Downloaded, notInstalledStateFor(entry(ExtensionState.DOWNLOADED)))
        assertEquals(NotInstalled.Failed("incompatible"), notInstalledStateFor(entry(ExtensionState.FAILED, "incompatible")))
        assertEquals(NotInstalled.Removed, notInstalledStateFor(entry(ExtensionState.REMOVED)))
        assertEquals(NotInstalled.Absent(priceLabel = "$4.99", packItems = 3), notInstalledStateFor(null, "$4.99", 3))
    }

    @Test
    fun onlyAnUntouchedPaidPackageGetsGetEverythingElseIsAnInstall() {
        val price = "$4.99"
        fun kind(state: ExtensionState?, checkoutUnavailable: Boolean = false) =
            primaryActionFor(state?.let { entry(it) }, "X", price, null, checkoutUnavailable).kind
        assertEquals(ActionKind.PURCHASE_EXTENSION, kind(null))
        assertEquals(ActionKind.PAID_UNAVAILABLE, kind(null, checkoutUnavailable = true))
        // A host reporting FAILED knows the install failed, not the purchase: retry the install.
        assertEquals(ActionKind.RETRY_INSTALL, kind(ExtensionState.FAILED))
        assertEquals(ActionKind.INSTALL_EXTENSION, kind(ExtensionState.DOWNLOADED))
        assertEquals(ActionKind.REINSTALL, kind(ExtensionState.REMOVED))
        assertEquals(ActionKind.INSTALL_EXTENSION, kind(ExtensionState.INSTALLED))
        assertEquals(ActionKind.INSTALL_EXTENSION, kind(ExtensionState.ACTIVE))
        for (st in listOf<ExtensionState?>(null) + ExtensionState.entries) {
            val a = primaryActionFor(st?.let { entry(it) }, "X", price)
            assertEquals(a.kind == ActionKind.PURCHASE_EXTENSION, a.label.startsWith("Get"), "label/action for $st")
        }
    }

    @Test
    fun acquireRouteSendsOnlyGetToCheckout() {
        val expected = mapOf(
            ActionKind.INSTALL_EXTENSION to AcquireRoute.HANDOFF, ActionKind.INSTALL_PACK to AcquireRoute.HANDOFF,
            ActionKind.PURCHASE_EXTENSION to AcquireRoute.CHECKOUT, ActionKind.PAID_UNAVAILABLE to AcquireRoute.NONE,
            ActionKind.RETRY_INSTALL to AcquireRoute.HANDOFF, ActionKind.REINSTALL to AcquireRoute.HANDOFF,
            ActionKind.INSTALL_HOST to AcquireRoute.HANDOFF, ActionKind.DOWNLOAD_PACKAGE to AcquireRoute.HANDOFF,
            ActionKind.RETRY_HANDOFF to AcquireRoute.HANDOFF, ActionKind.BROWSE_CATALOGUE to AcquireRoute.HANDOFF,
        )
        assertEquals(ActionKind.entries.toSet(), expected.keys)
        for ((k, r) in expected) assertEquals(r, acquireRouteFor(k), "$k")
        assertEquals(listOf(ActionKind.PURCHASE_EXTENSION), expected.filterValues { it == AcquireRoute.CHECKOUT }.keys.toList())
    }

    @Test
    fun theWholeScreenDecisionComposes() {
        // entry + price + client -> action -> route: the same two calls DetailScreen makes.
        fun route(state: ExtensionState?, price: String?, checkoutUnavailable: Boolean = false) =
            acquireRouteFor(primaryActionFor(state?.let { entry(it) }, "X", price, null, checkoutUnavailable).kind)
        assertEquals(AcquireRoute.CHECKOUT, route(null, "$4.99"))
        assertEquals(AcquireRoute.NONE, route(null, "$4.99", checkoutUnavailable = true))
        for (st in ExtensionState.entries) assertEquals(AcquireRoute.HANDOFF, route(st, "$4.99"), "paid $st")
        for (st in listOf<ExtensionState?>(null) + ExtensionState.entries) assertEquals(AcquireRoute.HANDOFF, route(st, null), "free $st")
        // Free packages are unaffected where checkout is unavailable.
        assertEquals(AcquireRoute.HANDOFF, route(null, null, checkoutUnavailable = true))
    }

    // --- performAcquire: the function the screen calls -----------------------------------------

    private class Fake(
        var answer: CheckoutAnswer = CheckoutAnswer(message = "Checkout started."),
        var handoffResult: String? = null,
    ) {
        val calls = mutableListOf<String>()
        val notices = mutableListOf<String>()
        fun deps() = AcquireDeps(
            checkout = { calls += "checkout"; answer },
            handoff = { calls += "handoff"; handoffResult },
            notice = { notices += it },
        )
    }

    private fun acquire(route: AcquireRoute, f: Fake) = kotlinx.coroutines.runBlocking { performAcquire(route, f.deps()) }

    @Test
    fun checkoutSuccessPostsTheNoticeAndDoesNotInstall() {
        val f = Fake()
        assertNull(acquire(AcquireRoute.CHECKOUT, f))
        assertEquals(listOf("checkout"), f.calls)
        assertEquals(listOf("Checkout started."), f.notices)
    }

    @Test
    fun alreadyOwnedIsNotAFailureItRunsTheInstallHandoff() {
        val f = Fake(answer = CheckoutAnswer(error = "you already own this package", code = "already_owned"))
        assertNull(acquire(AcquireRoute.CHECKOUT, f))
        assertEquals(listOf("checkout", "handoff"), f.calls)
        assertTrue(f.notices.isEmpty())
        val failing = Fake(answer = CheckoutAnswer(error = "x", code = "already_owned"), handoffResult = "nothing opened")
        assertEquals("nothing opened", acquire(AcquireRoute.CHECKOUT, failing))
    }

    @Test
    fun otherCheckoutErrorsAreFailures() {
        val f = Fake(answer = CheckoutAnswer(error = "seller payout account is not ready", code = "other"))
        assertEquals("seller payout account is not ready", acquire(AcquireRoute.CHECKOUT, f))
        assertEquals(listOf("checkout"), f.calls)
    }

    @Test
    fun handoffRunsOnlyTheHandoff() {
        val f = Fake()
        assertNull(acquire(AcquireRoute.HANDOFF, f))
        assertEquals(listOf("handoff"), f.calls)
    }

    @Test
    fun theUnavailablePaidRouteDoesNothingAndNeverLoops() {
        val f = Fake()
        assertNull(acquire(AcquireRoute.NONE, f))
        assertTrue(f.calls.isEmpty(), "no checkout, no handoff, no external page")
    }

    @Test
    fun standaloneAndroidPaidIsADisabledExplainedButtonWithNoExternalPaymentLink() {
        val a = primaryActionFor(null, "Acme", "$4.99", null, checkoutUnavailable = true)
        assertEquals("Paid: not available in this app yet", a.label)
        assertEquals(ActionKind.PAID_UNAVAILABLE, a.kind)
        assertFalse(a.enabled)
        assertNull(a.url)
        assertTrue(a.description.startsWith(a.label))
        assertTrue(a.description.contains("cannot be bought here"))
        // Disabled in every phase, and never relabelled "Retry" (no loop).
        for (phase in listOf(ActionPhase.Idle, ActionPhase.Failed("x"))) {
            val st = buttonStateFor(a, phase)
            assertFalse(st.enabled, "$phase")
            assertEquals(a.label, st.label)
            assertNull(st.error)
        }
        // A free package is unaffected, and an owner is still offered the install.
        assertEquals(ActionKind.INSTALL_EXTENSION, primaryActionFor(null, "Acme", null, null, checkoutUnavailable = true).kind)
        assertEquals(ActionKind.INSTALL_EXTENSION, primaryActionFor(entry(ExtensionState.DOWNLOADED), "Acme", "$4.99", null, checkoutUnavailable = true).kind)
    }

    @Test
    fun finishCheckoutOpensOnlyARealSessionAndFailsWhenNothingOpened() {
        val ok = CheckoutResponse(message = "Checkout started.", session = CheckoutSessionDto(url = "https://x"))
        val opened = mutableListOf<String>()
        assertEquals(ok, finishCheckout(ok) { opened += it; true })
        assertEquals(listOf("https://x"), opened)
        assertEquals("Couldn't open the checkout page.", finishCheckout(ok) { false }.error)
        // Nothing to open for stubs, errors (including already_owned) or a missing url: pass through untouched.
        val untouched = listOf(
            CheckoutResponse(stub = true, session = CheckoutSessionDto(url = "https://x")),
            CheckoutResponse(error = "you already own this package", code = "already_owned"),
            CheckoutResponse(message = "m"),
        )
        for (c in untouched) assertEquals(c, finishCheckout(c) { error("must not open") })
    }

    @Test
    fun canStartOnlyWhenNothingIsRunning() {
        assertTrue(canStart(ActionPhase.Idle))
        assertTrue(canStart(ActionPhase.Failed("x")))
        assertFalse(canStart(ActionPhase.Running))
    }

    @Test
    fun aBlankFailureIsAFailureWithTheDefaultMessageNotSuccess() {
        val seen = mutableListOf<ActionPhase>()
        kotlinx.coroutines.runBlocking { runWithPhase({ seen += it }) { "" } }
        assertEquals(ActionPhase.Failed("Something went wrong."), seen.last())
        val ws = mutableListOf<ActionPhase>()
        kotlinx.coroutines.runBlocking { runWithPhase({ ws += it }) { "  " } }
        assertEquals(ActionPhase.Failed("Something went wrong."), ws.last())
    }

    @Test
    fun absentFreePaidAndPackSayWhatTheyWillDo() {
        assertEquals("Install  ·  Free", requiredActionsFor(NotInstalled.Absent(), "Acme").single().label)
        assertEquals("Get  ·  $4.99", requiredActionsFor(NotInstalled.Absent(priceLabel = "$4.99"), "Acme").single().label)
        assertEquals("Install pack  ·  3 items", requiredActionsFor(NotInstalled.Absent(packItems = 3), "Acme").single().label)
        // Paid wins over pack: a paid pack must be bought before anything is installed.
        assertEquals(ActionKind.PURCHASE_EXTENSION, requiredActionsFor(NotInstalled.Absent(priceLabel = "$4.99", packItems = 3), "Acme").single().kind)
    }

    @Test
    fun theSpokenFormNamesThePackage() {
        for (state in samples) {
            val spoken = requiredActionsFor(state, "Acme LUT")
            val needsName = state !is NotInstalled.NothingInstalledYet && state !is NotInstalled.HostMissing
            if (needsName) assertTrue(spoken.single().description.contains("Acme LUT"), "description for $state")
        }
    }

    @Test
    fun hostMissingOffersTheDownloadFirstThenEveryHostThenRetry() {
        val actions = requiredActionsFor(NotInstalled.HostMissing(listOf(hostA, hostB)), "Acme LUT")
        assertEquals(
            listOf("Download .azp", "Install Graffux", "Install Guillotine", "Retry install"),
            actions.map { it.label },
        )
        assertEquals(listOf(null, hostA.installUrl, hostB.installUrl, null), actions.map { it.url })
    }

    @Test
    fun hostMissingWithAnEmptyDirectoryOffersOnlyWhatWorks() {
        // No fake button: only the actions that work. The explanation is honest about why.
        val actions = requiredActionsFor(NotInstalled.HostMissing(emptyList()), "Acme LUT")
        assertEquals(listOf(ActionKind.DOWNLOAD_PACKAGE, ActionKind.RETRY_HANDOFF), actions.map { it.kind })
        assertTrue(statusLineFor(NotInstalled.HostMissing(emptyList()))!!.startsWith("No host app is listed for this extension yet"))
    }

    @Test
    fun everyUrlTheActionsOpenIsSafe() {
        for (state in samples) for (action in requiredActionsFor(state, "Acme LUT")) {
            val url = action.url ?: continue
            assertTrue(isSafeExternalUrl(url), "unsafe url in $action")
        }
    }

    @Test
    fun onlyUrlKindsCarryAUrl() {
        val withUrl = setOf(ActionKind.INSTALL_HOST)
        for (state in samples) for (action in requiredActionsFor(state, "Acme LUT")) {
            assertEquals(action.kind in withUrl, action.url != null, "url presence for ${action.kind}")
        }
    }

    @Test
    fun statusLinesExplainEveryRecordedStateAndStaySilentOtherwise() {
        assertNull(statusLineFor(NotInstalled.Absent()))
        assertEquals("Downloaded, but not installed yet.", statusLineFor(NotInstalled.Downloaded))
        assertEquals("The last install didn't finish (integrity-mismatch).", statusLineFor(NotInstalled.Failed("integrity-mismatch")))
        assertEquals("The last install didn't finish.", statusLineFor(NotInstalled.Failed(" ")))
        assertEquals("Removed from your host.", statusLineFor(NotInstalled.Removed))
        assertEquals("Nothing installed yet", statusLineFor(NotInstalled.NothingInstalledYet))
        assertTrue(statusLineFor(NotInstalled.HostMissing(listOf(hostA)))!!.contains("No app on this device"))
    }

    // --- the button's own states ---------------------------------------------------------------

    private val action = RequiredAction(ActionKind.INSTALL_HOST, "Install Graffux", "Install Graffux. Open the install page for Graffux", "https://example.test/graffux")

    @Test
    fun idleButtonIsPressableAndQuiet() {
        val s = buttonStateFor(action, ActionPhase.Idle)
        assertEquals("Install Graffux", s.label)
        assertTrue(s.enabled)
        assertFalse(s.showProgress)
        assertNull(s.error)
    }

    @Test
    fun runningButtonIsDisabledAndShowsProgress() {
        val s = buttonStateFor(action, ActionPhase.Running)
        assertFalse(s.enabled)
        assertTrue(s.showProgress)
        assertNull(s.error)
        assertEquals("Working… Install Graffux", s.description)
        assertTrue(s.description.contains(s.label))
    }

    @Test
    fun failedButtonSaysSoAndStaysRetryable() {
        val s = buttonStateFor(action, ActionPhase.Failed("Couldn't open that page."))
        assertEquals("Retry: Install Graffux", s.label)
        assertTrue(s.enabled)
        assertFalse(s.showProgress)
        assertEquals("Couldn't open that page.", s.error)
        assertTrue(s.description.startsWith(s.label))
    }

    @Test
    fun everyPhaseIsHandled() {
        val phases: List<ActionPhase> = listOf(ActionPhase.Idle, ActionPhase.Running, ActionPhase.Failed("x"))
        for (phase in phases) {
            // A `when` with no else: a new phase must be decided here.
            val enabled = when (phase) {
                ActionPhase.Idle -> true
                ActionPhase.Running -> false
                is ActionPhase.Failed -> true
            }
            assertEquals(enabled, buttonStateFor(action, phase).enabled)
        }
    }

    @Test
    fun openingAPageEndsIdleOrFailedNeverStuckRunning() {
        assertEquals(ActionPhase.Idle, phaseAfterOpen(action, opened = true))
        val failed = phaseAfterOpen(action, opened = false)
        assertTrue(failed is ActionPhase.Failed)
        assertTrue((failed as ActionPhase.Failed).message.contains("Install Graffux"))
    }

    // --- the phases are really produced -------------------------------------------------------

    @Test
    fun runWithPhaseReportsRunningThenIdleOnSuccess() {
        val seen = mutableListOf<ActionPhase>()
        kotlinx.coroutines.runBlocking { runWithPhase({ seen += it }) { null } }
        assertEquals(listOf(ActionPhase.Running, ActionPhase.Idle), seen)
    }

    @Test
    fun runWithPhaseReportsAFailureMessageAndThenRetryLabel() {
        val seen = mutableListOf<ActionPhase>()
        kotlinx.coroutines.runBlocking { runWithPhase({ seen += it }) { "Checkout failed" } }
        assertEquals(listOf(ActionPhase.Running, ActionPhase.Failed("Checkout failed")), seen)
        assertEquals("Retry: Install Graffux", buttonStateFor(action, seen.last()).label)
    }

    @Test
    fun runWithPhaseTurnsAThrowIntoAFailureNeverStuckRunning() {
        val seen = mutableListOf<ActionPhase>()
        kotlinx.coroutines.runBlocking { runWithPhase({ seen += it }) { throw IllegalStateException("boom") } }
        assertEquals(ActionPhase.Failed("boom"), seen.last())
        val blank = mutableListOf<ActionPhase>()
        kotlinx.coroutines.runBlocking { runWithPhase({ blank += it }) { throw RuntimeException() } }
        assertEquals(ActionPhase.Failed("Something went wrong."), blank.last())
    }

    @Test
    fun runWithPhaseDoesNotTreatCancellationAsAFailure() {
        val seen = mutableListOf<ActionPhase>()
        val result = runCatching {
            kotlinx.coroutines.runBlocking { runWithPhase({ seen += it }) { throw kotlinx.coroutines.CancellationException("c") } }
        }
        assertTrue(result.isFailure)
        assertEquals(ActionPhase.Idle, seen.last())
    }

    // --- the empty "Installed" guard ----------------------------------------------------------

    @Test
    fun nothingInstalledShowsOnlyWhenTheInstalledFilterIsTheOnlyFilter() {
        assertTrue(showNothingInstalled(1, "", 0, null, null, resultsEmpty = true))
        assertFalse(showNothingInstalled(1, "", 0, null, null, resultsEmpty = false))
        assertFalse(showNothingInstalled(0, "", 0, null, null, resultsEmpty = true))
        assertFalse(showNothingInstalled(2, "", 0, null, null, resultsEmpty = true))
        // A user with installs who searches "zzz" is not told they have nothing installed.
        assertFalse(showNothingInstalled(1, "zzz", 0, null, null, resultsEmpty = true))
        assertFalse(showNothingInstalled(1, "  ", 2, null, null, resultsEmpty = true))
        assertFalse(showNothingInstalled(1, "", 0, "image", null, resultsEmpty = true))
        assertFalse(showNothingInstalled(1, "", 0, null, "com.a.b", resultsEmpty = true))
        assertTrue(showNothingInstalled(1, "   ", 0, null, null, resultsEmpty = true))
    }

    // --- wiring guard: the screens must go through the tested functions --------------------------

    private fun source(path: String): String {
        val f = generateSequence(java.io.File("").absoluteFile) { it.parentFile }
            .map { java.io.File(it, path) }.firstOrNull { it.isFile } ?: error("cannot find $path")
        return f.readText()
    }

    @Test
    fun detailScreenRoutesThroughTheTestedFunctionsOnly() {
        val detail = source("apps/storefront-cmp/src/commonMain/kotlin/components/DetailScreen.kt")
        // Behaviour comes from the action the button shows, via the pure router…
        assertTrue(detail.contains("acquireRouteFor(mainAction.kind)"), "route must come from the shown action")
        assertTrue(detail.contains("primaryActionFor("), "the label must come from primaryActionFor")
        // …a press is refused while one is running…
        assertTrue(detail.contains("if (!canStart(installPhase)) return"), "re-entrancy guard")
        // …checkout is reached only through performAcquire, never by a price check…
        assertEquals(1, Regex("startCheckout\\(").findAll(detail).count(), "startCheckout only inside the acquire deps")
        assertFalse(Regex("isPaid\\(pkg\\)\\s*->").containsMatchIn(detail), "no price-based routing")
        // Backstop only. The real enforcement is compile-time: `inAppCheckout` has no default in
        // StorefrontApp / DetailScreen, so dropping it anywhere fails to build.
        assertTrue(detail.contains("checkoutUnavailable = !inAppCheckout"))
        assertTrue(source("apps/storefront-cmp/src/androidMain/kotlin/com/hereliesaz/azphalt/store/MainActivity.kt").contains("inAppCheckout = false"))
    }
}
