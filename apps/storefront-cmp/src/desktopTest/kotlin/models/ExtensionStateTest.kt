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

/** The status word on a card. (The old `actionLabelFor` vocabulary is gone: see `NotInstalled.kt`.) */
class StatusLabelTest {
    @Test
    fun `no record has no status`() {
        assertNull(statusLabelFor(null))
    }

    @Test
    fun `every state has a status word`() {
        for (state in ExtensionState.entries) {
            assertTrue(statusLabelFor(ExtensionStateEntry(id = "a", state = state)) != null, "$state")
        }
    }
}
