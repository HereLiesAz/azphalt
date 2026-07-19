package network

import kotlinx.serialization.json.Json
import models.PackageSummary

val json = Json { ignoreUnknownKeys = true }

expect suspend fun fetchRegistryList(): List<PackageSummary>
