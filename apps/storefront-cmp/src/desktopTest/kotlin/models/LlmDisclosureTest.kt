package models

import network.json
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/** The pre-install disclosure `spec/llm.md` § Discovery requires, parsed from `/api/packages`. */
class LlmDisclosureTest {

    private fun decode(llm: String): PackageSummary =
        json.decodeFromString("""{"id":"x","name":"X","version":"1.0.0","kind":"llm","llm":$llm}""")

    @Test
    fun `hosted endpoint discloses operator, handling and token`() {
        val pkg = decode(
            """{"tier":"endpoint","setup":{"sandbox":"github-actions","requires":{"githubToken":["contents:write","secrets:write"]}},
               "endpoint":{"protocols":["openai-chat"],"baseUrl":"https://api.kilo.ai/api/gateway","defaultModel":"kilo-auto/free","auth":"optional-bearer"},
               "dataHandling":{"prompts":"may-train","modelPinned":false,"operator":"Kilo Code","terms":"https://kilo.ai/terms"}}""",
        )
        val llm = pkg.llm!!
        assertEquals("hosted llm", llm.tierLabel)
        val lines = llmDisclosureLines(llm).toMap()
        assertTrue(lines.getValue("Runs").contains("api.kilo.ai"))
        assertTrue(lines.getValue("Prompts").contains("may be used to train"))
        assertTrue(lines.getValue("Prompts").contains("Kilo Code"))
        assertTrue(lines.getValue("Prompts").contains("can change"))
        assertEquals("contents:write, secrets:write", lines["Setup token"])
    }

    @Test
    fun `sandbox weights disclose licence, size and runner needs`() {
        val llm = decode(
            """{"tier":"sandbox-weights","setup":{"requires":{"githubToken":["contents:write"]}},
               "weights":{"runtime":"llama.cpp","files":[{"name":"model.gguf","byteSize":1117320736}],
                          "modelLicense":{"spdx":"Apache-2.0","commercialUse":true},
                          "requirements":{"accelerator":"cpu","minRamMB":3072,"minDiskMB":2048,"contextTokens":4096}},
               "endpoint":{"protocols":["github-actions-runner"],"defaultModel":"model.gguf","auth":"none"}}""",
        ).llm!!
        assertEquals("sandbox llm", llm.tierLabel)
        val lines = llmDisclosureLines(llm).toMap()
        assertTrue(lines.getValue("Runs").contains("private GitHub Actions sandbox"))
        assertEquals("Apache-2.0", lines["Model licence"])
        assertEquals("1.1 GB of weights, cached in the sandbox", lines["Download"])
        assertEquals("cpu · 3 GB RAM · 2 GB disk · 4096 tokens context", lines["Runner needs"])
    }

    @Test
    fun `an unknown prompts value never reads as safe`() {
        assertEquals(
            "The operator does not say what happens to prompts.",
            LlmDataHandlingDto(prompts = "trust-us").promptsText,
        )
    }

    @Test
    fun `non-llm listings carry no llm block`() {
        val pkg: PackageSummary = json.decodeFromString("""{"id":"x","name":"X","version":"1.0.0","kind":"asset"}""")
        assertEquals(null, pkg.llm)
    }
}
