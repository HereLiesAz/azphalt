package models

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class LocalInventoryRoundTripTest {
    @Test
    fun `survives encode then decode`() {
        val entries = listOf(
            installedEntry("com.acme.lut", "1.0.0", at = "2026-08-01T00:00:00Z"),
            installedEntry("com.acme.brush", "2.1.0"),
        )
        val back = decodeLocalInventory(encodeLocalInventory(entries))
        assertEquals(setOf("com.acme.lut", "com.acme.brush"), back.keys)
        assertEquals(ExtensionState.INSTALLED, back["com.acme.lut"]?.state)
        assertEquals("1.0.0", back["com.acme.lut"]?.version)
        assertEquals("2026-08-01T00:00:00Z", back["com.acme.lut"]?.at)
    }

    @Test
    fun `forgets rather than throws on junk`() {
        // Corrupt storage costs the user their local history and nothing else — a store that threw
        // here would refuse to browse because of a half-written value.
        assertEquals(emptyMap(), decodeLocalInventory("not json at all"))
        assertEquals(emptyMap(), decodeLocalInventory("{\"entries\":[{\"no-id\":true}]}"))
        assertEquals(emptyMap(), decodeLocalInventory(null))
        assertEquals(emptyMap(), decodeLocalInventory("   "))
    }

    @Test
    fun `drops entries with no id rather than keying on empty string`() {
        val back = decodeLocalInventory("""{"entries":[{"id":"","version":"1.0.0"},{"id":"com.ok","version":"1.0.0"}]}""")
        assertEquals(setOf("com.ok"), back.keys)
    }

    @Test
    fun `records a handoff as installed`() {
        val e = installedEntry("com.acme.lut", "1.0.0")
        assertEquals(ExtensionState.INSTALLED, e.state)
        assertEquals("Installed", statusLabelFor(e))
    }
}

class MergeInventoriesTest {
    private val local = mapOf(
        "com.a" to installedEntry("com.a", "1.0.0"),
        "com.b" to installedEntry("com.b", "1.0.0"),
    )

    @Test
    fun `local stands alone when no host reported anything`() {
        assertEquals(local, mergeInventories(local, emptyMap()))
    }

    @Test
    fun `a host report wins over the store's own guess`() {
        // The load-bearing rule. The host knows what is on the device; the store recorded that a link
        // was claimed. Getting this backwards would have the store argue with the device about what
        // is installed on it — and win.
        val host = mapOf("com.a" to ExtensionStateEntry(id = "com.a", version = "1.0.0", state = ExtensionState.REMOVED))
        val merged = mergeInventories(local, host)
        assertEquals(ExtensionState.REMOVED, merged["com.a"]?.state)
        // Untouched by the host, so the store's own record still stands.
        assertEquals(ExtensionState.INSTALLED, merged["com.b"]?.state)
    }

    @Test
    fun `a host report adds packages the store never recorded`() {
        val host = mapOf("com.c" to ExtensionStateEntry(id = "com.c", version = "3.0.0", state = ExtensionState.ACTIVE))
        val merged = mergeInventories(local, host)
        assertEquals(3, merged.size)
        assertEquals(ExtensionState.ACTIVE, merged["com.c"]?.state)
    }

    @Test
    fun `an empty local record is not a problem`() {
        val host = mapOf("com.c" to ExtensionStateEntry(id = "com.c", version = "3.0.0", state = ExtensionState.ACTIVE))
        assertEquals(host, mergeInventories(emptyMap(), host))
        assertTrue(mergeInventories(emptyMap(), emptyMap()).isEmpty())
    }
}

class ForgetInstallTest {
    @Test
    fun `drops the entry rather than marking it removed`() {
        // REMOVED is a *host's* statement that a package was uninstalled. The store admitting it never
        // knew is a different claim, and recording it as REMOVED would put words in a host's mouth.
        val before = mapOf("com.a" to installedEntry("com.a", "1.0.0"))
        val after = forgetInstall(before, "com.a")
        assertTrue(after.isEmpty())
    }

    @Test
    fun `leaves everything else alone, and forgetting the unknown is a no-op`() {
        val before = mapOf(
            "com.a" to installedEntry("com.a", "1.0.0"),
            "com.b" to installedEntry("com.b", "1.0.0"),
        )
        assertEquals(setOf("com.b"), forgetInstall(before, "com.a").keys)
        assertEquals(before, forgetInstall(before, "com.never-seen"))
    }
}
