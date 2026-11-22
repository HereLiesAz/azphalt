package network

import com.sun.net.httpserver.HttpServer
import java.net.InetSocketAddress
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue
import kotlinx.coroutines.runBlocking

/**
 * The real desktop checkout request, against a local server, with a fake page opener.
 *
 * This drives `desktopCheckout` itself (what `startCheckout` calls), so it exercises the HTTP round
 * trip, the JSON decoding, and — the point — that the opener's answer decides the outcome. A call
 * site that opened the page and ignored the result would make the "could not open" test fail.
 */
class DesktopCheckoutTest {
    private fun serve(status: Int, body: String, block: (String) -> Unit) {
        val server = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)
        server.createContext("/api/checkout") { ex ->
            val bytes = body.toByteArray()
            ex.responseHeaders.add("Content-Type", "application/json")
            ex.sendResponseHeaders(status, bytes.size.toLong())
            ex.responseBody.use { it.write(bytes) }
        }
        server.start()
        try {
            block("http://127.0.0.1:${server.address.port}")
        } finally {
            server.stop(0)
        }
    }

    private val started = """{"session":{"id":"cs_1","url":"https://checkout.example/pay/cs_1","status":"pending"}}"""

    @Test
    fun opensTheProcessorPageAndReturnsTheSession() = serve(200, started) { base ->
        val opened = mutableListOf<String>()
        val r = runBlocking { desktopCheckout(base, "com.acme.lut") { opened += it; true } }
        assertEquals(listOf("https://checkout.example/pay/cs_1"), opened)
        assertNull(r.error)
        assertEquals("cs_1", r.session?.id)
    }

    @Test
    fun aPageThatCouldNotBeOpenedIsAFailureNotCheckoutStarted() = serve(200, started) { base ->
        val r = runBlocking { desktopCheckout(base, "com.acme.lut") { false } }
        assertEquals("Couldn't open the checkout page.", r.error)
        assertNull(r.session)
    }

    @Test
    fun alreadyOwnedIsPassedThroughWithItsCodeAndNothingIsOpened() =
        serve(409, """{"error":"you already own this package","code":"already_owned"}""") { base ->
            val r = runBlocking { desktopCheckout(base, "com.acme.lut") { error("must not open") } }
            assertEquals("already_owned", r.code)
            assertTrue(r.error!!.contains("already own"))
        }
}
