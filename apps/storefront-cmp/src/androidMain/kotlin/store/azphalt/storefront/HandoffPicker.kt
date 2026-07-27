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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import models.PackageSummary

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
                    Text(
                        if (pkg.priceStatus == "paid") "Paid" else "Free",
                        style = MaterialTheme.typography.labelMedium,
                        color = if (pkg.priceStatus == "paid") cs.primary else cs.onSurfaceVariant,
                    )
                }
            }
        }
    }
}
