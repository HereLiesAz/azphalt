package components

import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import theme.Ground
import theme.Hues
import theme.azTurnstileEntrance

@Composable
fun HeroSection(total: Int) {
    val cs = MaterialTheme.colorScheme
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 40.dp, bottom = 20.dp),
    ) {
        // Tagline tag — a named thing, so a capsule: ink, no border, the end-cap carrying the count.
        Capsule(
            label = if (total > 0) "portable extensions · one open standard" else "Loading the registry…",
            background = Ground.Ink,
            cap = if (total > 0) Hues.Bg[0] else null,
            capText = if (total > 0) "$total" else "",
            labelSize = 13,
            height = 36.dp,
            modifier = Modifier.azTurnstileEntrance(index = 0),
        )

        Spacer(Modifier.height(20.dp))

        // The big title swings in as a WP7 turnstile, one line after the other.
        Text(
            text = "The open extension",
            style = MaterialTheme.typography.displayLarge,
            color = cs.onBackground,
            modifier = Modifier.azTurnstileEntrance(index = 1),
        )
        Text(
            text = "marketplace.",
            style = MaterialTheme.typography.displayLarge,
            color = cs.primary,
            modifier = Modifier.azTurnstileEntrance(index = 2),
        )

        Spacer(Modifier.height(16.dp))

        Text(
            text = "Write an extension once — a brush, a filter, a tool — and run it in any app that speaks Azphalt.",
            style = MaterialTheme.typography.bodyLarge,
            color = cs.onSurfaceVariant,
            modifier = Modifier.widthIn(max = 640.dp).azTurnstileEntrance(index = 3),
        )
    }
}
