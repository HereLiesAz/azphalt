package models

import kotlin.test.Test
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/** An entitlement must never be sent to a host-chosen repository (BrowseForResultActivity's `repository` extra). */
class EntitlementPolicyTest {
    @Test
    fun `the store origin and the default repository may receive it`() {
        assertTrue(mayReceiveEntitlement(null))
        assertTrue(mayReceiveEntitlement("https://www.azphalt.store"))
        assertTrue(mayReceiveEntitlement("https://www.azphalt.store/"))
        assertTrue(mayReceiveEntitlement("HTTPS://WWW.AZPHALT.STORE:443/api"))
    }

    @Test
    fun `any other host, scheme, port or lookalike may not`() {
        assertFalse(mayReceiveEntitlement("https://evil.example"))
        assertFalse(mayReceiveEntitlement("https://www.azphalt.store.evil.example"))
        assertFalse(mayReceiveEntitlement("https://evil.example/www.azphalt.store"))
        assertFalse(mayReceiveEntitlement("https://www.azphalt.store@evil.example"))
        assertFalse(mayReceiveEntitlement("https://www.azphalt.store:8443"))
        assertFalse(mayReceiveEntitlement("http://www.azphalt.store"))
        assertFalse(mayReceiveEntitlement("ftp://www.azphalt.store"))
        assertFalse(mayReceiveEntitlement(""))
    }
}
