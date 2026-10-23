package components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import theme.CapsuleShape
import theme.Ground
import theme.Hues

/**
 * The one thing the storefront says differently when another app is waiting on it.
 *
 * A browse request is initiated by another application, and the user should be able to see who they
 * are installing for and be able to leave without installing anything (`spec/store-app.md` § The
 * request). That is two lines and a button — not a reason to show them a different store.
 */
@Composable
internal fun HandoffBanner(callerLabel: String?, onCancel: () -> Unit) {
    // A named thing, so a capsule: ink on the page, no border, no alpha on the capsule itself.
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(CapsuleShape.Full)
            .background(Ground.Ink)
            .padding(start = 28.dp, end = 8.dp, top = 8.dp, bottom = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(Modifier.padding(end = 12.dp)) {
            Text(
                text = "Adding to ${callerLabel ?: "another app"}",
                style = MaterialTheme.typography.labelLarge,
                fontWeight = FontWeight.SemiBold,
                color = Color.White,
            )
            Text(
                text = "Whatever you install goes straight back to it.",
                style = MaterialTheme.typography.labelSmall,
                color = Color.White,
            )
        }
        Capsule(
            label = "Cancel",
            background = Hues.Bg[6],
            cap = Hues.Cap[6],
            height = 40.dp,
            onClick = onCancel,
        )
    }
}
