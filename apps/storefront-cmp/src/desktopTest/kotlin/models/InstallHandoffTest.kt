package models

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/** A minimal summary — only the fields the handoff logic reads. */
private fun pkg(
    id: String,
    name: String = id,
    version: String = "1.0.0",
    targetApps: List<String> = emptyList(),
    kind: String = "code",
    app: AppDto? = null,
) = PackageSummary(id = id, name = name, kind = kind, version = version, targetApps = targetApps, app = app)

private fun host(id: String, name: String, hostId: String, install: String? = "https://example.test/$hostId") =
    pkg(
        id = id,
        name = name,
        kind = "app",
        app = AppDto(
            roles = listOf("host"),
            hostId = hostId,
            platforms = PlatformsDto(android = AndroidPlatformDto(packageId = hostId, install = install)),
        ),
    )

class InstallLinkTest {
    @Test
    fun `carries id and version`() {
        assertEquals(
            "azphalt://install?id=com.acme.thing&version=1.2.3",
            installLink("com.acme.thing", "1.2.3"),
        )
    }

    @Test
    fun `omits version when absent or blank rather than sending an empty one`() {
        assertEquals("azphalt://install?id=com.acme.thing", installLink("com.acme.thing", null))
        assertEquals("azphalt://install?id=com.acme.thing", installLink("com.acme.thing", "   "))
    }

    @Test
    fun `carries repo when given`() {
        val link = installLink("com.acme.thing", "1.0.0", repo = "https://repo.example/base")
        assertTrue(link.contains("repo=https%3A%2F%2Frepo.example%2Fbase"), link)
    }

    @Test
    fun `percent-encodes rather than form-encodes`() {
        // A space must become %20, never '+' — a strict RFC 3986 parser reads '+' as a literal plus,
        // so form encoding would silently alter the id the host receives.
        val link = installLink("com.acme.a b", "1.0.0")
        assertTrue(link.contains("id=com.acme.a%20b"), link)
        assertTrue(!link.contains("+"), link)
    }

    @Test
    fun `names no host`() {
        val link = installLink("com.acme.thing", "1.0.0")
        assertTrue(!link.contains("com.hereliesaz"), link)
        assertTrue(link.startsWith("azphalt://install?"), link)
    }

    @Test
    fun `intent uri resolves to the same scheme and carries a fallback`() {
        val uri = installIntentUri("com.acme.thing", "1.0.0", "https://azphalt.store/p/com.acme.thing")
        assertTrue(uri.startsWith("intent://install?id=com.acme.thing&version=1.0.0#Intent;"), uri)
        assertTrue(uri.contains(";scheme=azphalt;"), uri)
        assertTrue(uri.contains("S.browser_fallback_url=https%3A%2F%2Fazphalt.store%2Fp%2Fcom.acme.thing"), uri)
        assertTrue(uri.endsWith(";end"), uri)
    }
}

class HostDirectoryTest {
    private val guillotine = host("com.x.guillotine", "Guillotine", "com.hereliesaz.guillotine")
    private val graffux = host("com.x.graffux", "Graffux", "com.hereliesaz.graffux")
    private val companion = pkg(
        id = "com.acme.ar-stencil",
        kind = "app",
        app = AppDto(roles = listOf("companion"), platforms = PlatformsDto(AndroidPlatformDto("com.acme.ar", "https://x"))),
    )
    private val catalog = listOf(guillotine, graffux, companion, pkg("com.acme.lut"))

    @Test
    fun `a global package offers every host`() {
        val hosts = hostsFor(pkg("com.acme.lut"), catalog)
        assertEquals(listOf("com.hereliesaz.guillotine", "com.hereliesaz.graffux"), hosts.map { it.hostId })
    }

    @Test
    fun `an app-scoped package offers only the hosts it names`() {
        val scoped = pkg("com.acme.pack", targetApps = listOf("com.hereliesaz.guillotine"))
        assertEquals(listOf("com.hereliesaz.guillotine"), hostsFor(scoped, catalog).map { it.hostId })
    }

    @Test
    fun `a companion is never offered as somewhere to install an extension`() {
        val hosts = hostsFor(pkg("com.acme.lut"), catalog)
        assertTrue(hosts.none { it.name == companion.name }, hosts.toString())
    }

    @Test
    fun `a host with no install url is dropped rather than shown as a dead entry`() {
        val unreachable = host("com.x.nowhere", "Nowhere", "com.example.nowhere", install = null)
        val hosts = hostsFor(pkg("com.acme.lut"), listOf(unreachable))
        assertTrue(hosts.isEmpty(), hosts.toString())
    }

    @Test
    fun `a package scoped to an unlisted host offers nothing rather than everything`() {
        val scoped = pkg("com.acme.pack", targetApps = listOf("com.nobody.editor"))
        assertTrue(hostsFor(scoped, catalog).isEmpty())
    }
}
