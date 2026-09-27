package models

/**
 * What `spec/llm.md` § Discovery requires a store to show before a `kind:"llm"` install: where
 * prompts go, the operator's data handling, the weights' own licence, and the permissions the one-time
 * setup token needs. Plain key/value lines so the web store and this one say the same thing, and so
 * the wording is testable without a UI.
 */
fun llmDisclosureLines(llm: LlmDto): List<Pair<String, String>> = buildList {
    val host = llm.endpoint?.baseUrl?.substringAfter("://")?.substringBefore('/')
    add(
        "Runs" to if (llm.isSandbox) {
            "Open weights in your own private GitHub Actions sandbox. Prompts stay there."
        } else {
            "A third-party service" + (host?.let { " at $it" } ?: "") + ". Prompts leave your sandbox."
        },
    )
    llm.dataHandling?.let { dh ->
        add(
            "Prompts" to buildString {
                append(dh.promptsText)
                dh.operator?.let { append(" Operator: $it.") }
                if (dh.modelPinned == false) append(" The model behind it can change without notice.")
            },
        )
    }
    llm.endpoint?.defaultModel?.let { add("Model" to it) }
    llm.weights?.modelLicense?.let { lic ->
        add("Model licence" to (lic.spdx ?: "unspecified") + if (lic.commercialUse == false) " · non-commercial" else "")
    }
    if (llm.weightsBytes > 0) add("Download" to "${formatBytes(llm.weightsBytes)} of weights, cached in the sandbox")
    llm.weights?.requirements?.let { r ->
        listOfNotNull(
            r.accelerator,
            r.minRamMB?.let { "${(it + 512) / 1024} GB RAM" },
            r.minDiskMB?.let { "${(it + 512) / 1024} GB disk" },
            r.contextTokens?.let { "$it tokens context" },
        ).takeIf { it.isNotEmpty() }?.let { add("Runner needs" to it.joinToString(" · ")) }
    }
    val token = llm.setup?.requires?.githubToken.orEmpty()
    add("Setup token" to token.joinToString(", ").ifEmpty { "A GitHub token for the sandbox repository" })
}

private fun formatBytes(bytes: Long): String =
    if (bytes >= 1_000_000_000L) "${(bytes / 100_000_000L) / 10.0} GB" else "${(bytes + 500_000L) / 1_000_000L} MB"
