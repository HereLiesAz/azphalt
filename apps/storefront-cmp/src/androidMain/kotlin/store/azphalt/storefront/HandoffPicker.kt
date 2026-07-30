package store.azphalt.storefront

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import models.ExtensionState
import models.ExtensionStateEntry
import models.PackageSummary
import models.statusLabelFor

/**
 * The list a user picks from when another app asked for an extension.
 *
 * Deliberately plainer than the full storefront. This surface is a modal interruption inside someone
 * else's task — they were doing something in their editor and are here to answer one question — so it
 * shows what is installable and gets out of the way, rather than presenting carousels and hero art.
 */
@Composable
internal fun HandoffPicker(
    packages: List<PackageSummary>,
    callerLabel: String?,
    onCancel: () -> Unit,
    onPick: (PackageSummary) -> Unit,
    /**
     * What the calling host says it already has (`spec/state-reporting.md` § 3.1).
     *
     * This is the surface where it matters most. A host sends the user here to add an extension, and
     * without this the list shows no difference between something they have had installed for months
     * and something they have never seen.
     */
    inventory: Map<String, ExtensionStateEntry> = emptyMap(),
) {
    val cs = MaterialTheme.colorScheme

    Column(Modifier.fillMaxSize().padding(horizontal = 16.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Column {
                Text("Add an extension", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
                // Naming the requester is the spec's ask: a browse request is initiated by another
                // application, and the user should be able to see who they are installing for.
                Text(
                    callerLabel?.let { "for $it" } ?: "for another app",
                    style = MaterialTheme.typography.bodySmall,
                    color = cs.onSurfaceVariant,
                )
            }
            TextButton(onClick = onCancel) { Text("Cancel") }
        }

        if (packages.isEmpty()) {
            Column(Modifier.fillMaxSize().padding(top = 48.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Text("Nothing here yet", style = MaterialTheme.typography.titleMedium)
                Text(
                    "No extensions match what this app can use.",
                    style = MaterialTheme.typography.bodySmall,
                    color = cs.onSurfaceVariant,
                )
            }
            return@Column
        }

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(packages, key = { it.id }) { pkg ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(cs.surfaceVariant.copy(alpha = 0.35f))
                        .clickable { onPick(pkg) }
                        .padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Column(Modifier.weight(1f)) {
                        Text(pkg.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Medium)
                        pkg.description?.takeIf { it.isNotBlank() }?.let {
                            Text(it, style = MaterialTheme.typography.bodySmall, color = cs.onSurfaceVariant)
                        }
                    }
                    // The host's state wins the trailing slot over the price when there is one: a user
                    // looking at a list of things they might add cares more that one is already active
                    // than that it was free.
                    val state = inventory[pkg.id]
                    val status = statusLabelFor(state)
                    if (status != null) {
                        Text(
                            status,
                            style = MaterialTheme.typography.labelMedium,
                            color = if (state?.state == ExtensionState.FAILED) cs.error else cs.tertiary,
                        )
                    } else {
                        Text(
                            if (pkg.priceStatus == "paid") "Paid" else "Free",
                            style = MaterialTheme.typography.labelMedium,
                            color = if (pkg.priceStatus == "paid") cs.primary else cs.onSurfaceVariant,
                        )
                    }
                }
            }

            // Reachable from inside the app, not only from the Play listing. A user deciding whether
            // to buy something should be able to read the terms at that moment, and Play expects the
            // policy to be linked in-app as well as in the console.
            item { LegalLinks() }
        }
    }
}

/** Privacy / Terms, opened in the browser. */
@Composable
private fun LegalLinks() {
    val uriHandler = LocalUriHandler.current
    val cs = MaterialTheme.colorScheme
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 20.dp),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            "Privacy",
            style = MaterialTheme.typography.labelSmall,
            color = cs.onSurfaceVariant,
            modifier = Modifier.clickable { uriHandler.openUri("https://www.azphalt.store/privacy") },
        )
        Text("  ·  ", style = MaterialTheme.typography.labelSmall, color = cs.onSurfaceVariant)
        Text(
            "Terms",
            style = MaterialTheme.typography.labelSmall,
            color = cs.onSurfaceVariant,
            modifier = Modifier.clickable { uriHandler.openUri("https://www.azphalt.store/terms") },
        )
    }
}
