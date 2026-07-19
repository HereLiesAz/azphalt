package components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun HeroSection(
    total: Int,
    selectedFilter: Int,
    onFilter: (Int) -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 40.dp, bottom = 20.dp),
    ) {
        // Tagline pill — a high-contrast secondary container chip.
        Surface(
            color = MaterialTheme.colorScheme.secondaryContainer,
            contentColor = MaterialTheme.colorScheme.onSecondaryContainer,
            shape = RoundedCornerShape(percent = 50),
        ) {
            Text(
                text = if (total > 0) "$total portable extensions · one open standard" else "Loading the registry…",
                style = MaterialTheme.typography.labelLarge,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
            )
        }

        Spacer(Modifier.height(20.dp))

        // Emphasized display headline — a colored second line for expressive contrast.
        Text(
            text = "The open extension",
            style = MaterialTheme.typography.displayLarge,
            color = MaterialTheme.colorScheme.onBackground,
        )
        Text(
            text = "marketplace.",
            style = MaterialTheme.typography.displayLarge,
            color = MaterialTheme.colorScheme.primary,
        )

        Spacer(Modifier.height(16.dp))

        Text(
            text = "Write an extension once — a brush, a filter, a tool — and run it in any app that speaks Azphalt.",
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.widthIn(max = 640.dp),
        )

        Spacer(Modifier.height(28.dp))

        // Button group — a segmented single-choice filter (All / Free / Paid).
        val options = listOf("All", "Free", "Paid")
        SingleChoiceSegmentedButtonRow {
            options.forEachIndexed { index, label ->
                SegmentedButton(
                    selected = selectedFilter == index,
                    onClick = { onFilter(index) },
                    shape = SegmentedButtonDefaults.itemShape(index = index, count = options.size),
                ) {
                    Text(label, fontWeight = FontWeight.SemiBold)
                }
            }
        }
    }
}
