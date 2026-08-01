package components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import theme.ExpressiveShapes

/**
 * The one thing the storefront says differently when another app is waiting on it.
 *
 * A browse request is initiated by another application, and the user should be able to see who they
 * are installing for and be able to leave without installing anything (`spec/store-app.md` § The
 * request). That is two lines and a button — not a reason to show them a different store.
 */
@Composable
internal fun HandoffBanner(callerLabel: String?, onCancel: () -> Unit) {
    val cs = MaterialTheme.colorScheme
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(cs.secondaryContainer)
            .border(1.dp, cs.onSecondaryContainer.copy(alpha = 0.55f), ExpressiveShapes.Card)
            .padding(horizontal = 16.dp, vertical = 10.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(Modifier.padding(end = 12.dp)) {
            Text(
                text = "Adding to ${callerLabel ?: "another app"}",
                style = MaterialTheme.typography.labelLarge,
                fontWeight = FontWeight.SemiBold,
                color = cs.onSecondaryContainer,
            )
            Text(
                text = "Whatever you install goes straight back to it.",
                style = MaterialTheme.typography.labelSmall,
                color = cs.onSecondaryContainer.copy(alpha = 0.8f),
            )
        }
        TextButton(onClick = onCancel, shape = ExpressiveShapes.Pill) {
            Text("Cancel", color = cs.onSecondaryContainer, fontWeight = FontWeight.SemiBold)
        }
    }
}
