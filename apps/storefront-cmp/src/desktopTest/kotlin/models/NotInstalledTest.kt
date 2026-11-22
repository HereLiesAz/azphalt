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
        NotInstalled.Removed,
        NotInstalled.HostMissing(hosts = listOf(hostA, hostB), scopedTo = listOf("com.hereliesaz.graffux")),
        NotInstalled.HostMissing(hosts = emptyList(), scopedTo = emptyList()),
        NotInstalled.HostMissing(hosts = emptyList(), scopedTo = listOf("com.hereliesaz.graffux")),
        NotInstalled.NothingInstalledYet,
    )

    /** What the FIRST action of each state must be. No `else`: a new state must be decided here. */
    private fun expectedKinds(state: NotInstalled): List<ActionKind> = when (state) {
        is NotInstalled.Absent -> listOf(
            when {
                state.priceLabel != null -> ActionKind.PURCHASE_EXTENSION
                state.packItems != null -> ActionKind.INSTALL_PACK
                else -> ActionKind.INSTALL_EXTENSION
            },
        )
        NotInstalled.Downloaded -> listOf(ActionKind.INSTALL_EXTENSION)
        is NotInstalled.Failed -> listOf(ActionKind.RETRY_INSTALL)
        NotInstalled.Removed -> listOf(ActionKind.REINSTALL)
        is NotInstalled.HostMissing ->
            listOf(ActionKind.DOWNLOAD_PACKAGE) +
                (if (state.hosts.isEmpty()) listOf(ActionKind.FIND_HOST) else state.hosts.map { ActionKind.INSTALL_HOST }) +
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
    fun theLabelsAgreeWithTheExistingCardWords() {
        // `actionLabelFor` is the older, shorter vocabulary for the same states; the two must not
        // disagree about which verb a state gets.
        fun verbOf(state: ExtensionState) =
            requiredActionsFor(notInstalledStateFor(entry(state))!!, "X").first().label
        assertTrue(verbOf(ExtensionState.DOWNLOADED).startsWith(actionLabelFor(entry(ExtensionState.DOWNLOADED), null)))
        assertTrue(verbOf(ExtensionState.FAILED).startsWith(actionLabelFor(entry(ExtensionState.FAILED), null)))
        assertTrue(verbOf(ExtensionState.REMOVED).startsWith(actionLabelFor(entry(ExtensionState.REMOVED), null)))
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
    fun hostMissingWithAnEmptyDirectoryStillHasSomewhereToGo() {
        val actions = requiredActionsFor(NotInstalled.HostMissing(emptyList(), scopedTo = listOf("com.hereliesaz.graffux")), "Acme LUT")
        val find = actions.single { it.kind == ActionKind.FIND_HOST }
        assertEquals("$STORE_ORIGIN/app/com.hereliesaz.graffux", find.url)
        assertTrue(isSafeExternalUrl(find.url!!))
        assertTrue(actions.none { it.kind == ActionKind.INSTALL_HOST })
    }

    @Test
    fun hostDirectoryUrlOnlyTrustsReverseDnsIds() {
        assertEquals(STORE_ORIGIN, hostDirectoryUrl(emptyList()))
        assertEquals("$STORE_ORIGIN/app/com.a.b", hostDirectoryUrl(listOf("com.a.b")))
        // A hostile or malformed id must not become part of a path.
        assertEquals(STORE_ORIGIN, hostDirectoryUrl(listOf("../admin", "a b", "x/y", "")))
        // …but a later, valid id is still used.
        assertEquals("$STORE_ORIGIN/app/com.ok.app", hostDirectoryUrl(listOf("../x", "com.ok.app")))
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
        val withUrl = setOf(ActionKind.INSTALL_HOST, ActionKind.FIND_HOST)
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
        assertTrue(statusLineFor(NotInstalled.HostMissing(emptyList()))!!.contains("No app on this device"))
    }

    // --- the button's own states ---------------------------------------------------------------

    private val action = RequiredAction(ActionKind.INSTALL_HOST, "Install Graffux", "Open the install page for Graffux", "https://example.test/graffux")

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
        assertTrue(s.description.contains("Open the install page for Graffux"))
    }

    @Test
    fun failedButtonSaysSoAndStaysRetryable() {
        val s = buttonStateFor(action, ActionPhase.Failed("Couldn't open that page."))
        assertEquals("Retry: Install Graffux", s.label)
        assertTrue(s.enabled)
        assertFalse(s.showProgress)
        assertEquals("Couldn't open that page.", s.error)
        assertTrue(s.description.contains("Couldn't open that page."))
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
}
