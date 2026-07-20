package network

import kotlinx.serialization.json.Json
import models.CheckoutResponse
import models.PackageSummary

val json = Json { ignoreUnknownKeys = true }

expect suspend fun fetchRegistryList(): List<PackageSummary>

/** Begin a consignment purchase for [packageId] (the paid lane). Stubbed server-side in the demo. */
expect suspend fun startCheckout(packageId: String): CheckoutResponse
