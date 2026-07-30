package models

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

/**
 * The host-inventory parser (`spec/state-reporting.md` § 1 and § 3.1).
 *
 * This parses a JSON document handed over by another application through an intent extra. It is
 * unauthenticated input whose only privilege is to change a button label, so every test here is about
 * the same property: bad input degrades to "the host told us nothing" and never to a broken store.
 */
class ExtensionStateTest {

    @Test
    fun `parses the documented entry shape`() {
        val states = parseHostInventory(
            """
            {"entries":[
              {"id":"com.a.one","version":"1.2.0","state":"active","at":"2026-07-30T02:14:00Z"},
              {"id":"com.a.two","version":"0.9.0","state":"downloaded"},
              {"id":"com.a.three","version":"1.0.0","state":"failed","reason":"integrity-mismatch"}
            ]}
            """,
        )

        assertEquals(3, states.size)
        assertEquals(ExtensionState.ACTIVE, states["com.a.one"]?.state)
        assertEquals("1.2.0", states["com.a.one"]?.version)
        assertEquals(ExtensionState.DOWNLOADED, states["com.a.two"]?.state)
        assertEquals("integrity-mismatch", states["com.a.three"]?.reason)
    }

    @Test
    fun `drops an unrecognised state without losing the rest`() {
        // The spec requires a consumer to ignore an unknown state rather than reject the whole report,
        // so the vocabulary can grow without a newer host breaking an older store.
        val states = parseHostInventory(
            """{"entries":[{"id":"com.a.new","version":"1.0.0","state":"quarantined"},
                          {"id":"com.a.old","version":"1.0.0","state":"active"}]}""",
        )

        assertEquals(1, states.size)
        assertEquals(ExtensionState.ACTIVE, states["com.a.old"]?.state)
        assertNull(states["com.a.new"])
    }

    @Test
    fun `tolerates unknown fields`() {
        val states = parseHostInventory(
            """{"entries":[{"id":"com.a.one","version":"1.0.0","state":"active","futureField":42}],"extra":true}""",
        )
        assertEquals(ExtensionState.ACTIVE, states["com.a.one"]?.state)
    }

    @Test
    fun `returns empty for anything unparseable, rather than throwing`() {
        // A host that sends junk gets the plain Get behaviour. Throwing here would let another
        // application crash the store by passing one malformed extra.
        for (input in listOf(null, "", "   ", "not json", "[]", "{}", """{"entries":"nope"}""", """{"entries":[null]}""")) {
            assertTrue(parseHostInventory(input).isEmpty(), "expected empty for: $input")
        }
    }

    @Test
    fun `drops entries with no id`() {
        val states = parseHostInventory("""{"entries":[{"id":"","version":"1.0.0","state":"active"}]}""")
        assertTrue(states.isEmpty())
    }

    @Test
    fun `later duplicate wins`() {
        val states = parseHostInventory(
            """{"entries":[{"id":"com.a.one","version":"1.0.0","state":"downloaded"},
                          {"id":"com.a.one","version":"1.0.0","state":"active"}]}""",
        )
        assertEquals(ExtensionState.ACTIVE, states["com.a.one"]?.state)
    }
}

/** The label logic — what a card actually shows. */
class ActionLabelTest {

    private fun entry(state: ExtensionState, version: String = "1.0.0") =
        ExtensionStateEntry(id = "com.a.one", version = version, state = state)

    @Test
    fun `an unknown package is Get`() {
        assertEquals("Get", actionLabelFor(null, "1.0.0"))
        assertNull(statusLabelFor(null))
    }

    @Test
    fun `states map to their labels`() {
        assertEquals("Install", actionLabelFor(entry(ExtensionState.DOWNLOADED), "1.0.0"))
        assertEquals("Retry", actionLabelFor(entry(ExtensionState.FAILED), "1.0.0"))
        assertEquals("Reinstall", actionLabelFor(entry(ExtensionState.REMOVED), "1.0.0"))
        assertEquals("Open", actionLabelFor(entry(ExtensionState.ACTIVE), "1.0.0"))
        assertEquals("Enable", actionLabelFor(entry(ExtensionState.INSTALLED), "1.0.0"))
    }

    @Test
    fun `Update is derived from the catalogue, not from the host`() {
        // Whether something newer exists is the repository's knowledge — a host cannot know it offline,
        // which is why it is not a reportable state.
        assertEquals("Update", actionLabelFor(entry(ExtensionState.ACTIVE, "1.0.0"), "1.1.0"))
        assertEquals("Update", actionLabelFor(entry(ExtensionState.INSTALLED, "1.0.0"), "1.1.0"))
        // Update outranks Open: a stale copy is the more useful thing to say.
        assertEquals("Open", actionLabelFor(entry(ExtensionState.ACTIVE, "1.1.0"), "1.1.0"))
    }

    @Test
    fun `an unknown latest version never claims an update`() {
        // A store that could not reach its catalogue must not tell the user to update to nothing.
        assertEquals("Open", actionLabelFor(entry(ExtensionState.ACTIVE), null))
        assertEquals("Open", actionLabelFor(entry(ExtensionState.ACTIVE), ""))
        // Nor when the host reported no version to compare against.
        assertEquals("Open", actionLabelFor(entry(ExtensionState.ACTIVE, ""), "1.1.0"))
    }
}
