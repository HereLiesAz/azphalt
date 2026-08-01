package components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.unit.dp
import theme.azTurnstileEntrance

/** Sort orders for the catalog. */
enum class SortMode(val label: String) {
    POPULAR("Popular"),
    RATING("Top rated"),
    RECENT("Recent"),
    NAME("A–Z"),
}

/** Search field + sort / price / category / app filter chips. All client-side over the loaded catalog. */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun StorefrontControls(
    query: String,
    onQuery: (String) -> Unit,
    sort: SortMode,
    onSort: (SortMode) -> Unit,
    price: Int,
    onPrice: (Int) -> Unit,
    /** 0 = Any, 1 = Installed, 2 = Not installed — over the merged inventory, not the catalog. */
    owned: Int,
    onOwned: (Int) -> Unit,
    categories: List<String>,
    category: String?,
    onCategory: (String?) -> Unit,
    apps: List<String>,
    app: String?,
    onApp: (String?) -> Unit,
) {
    Column(modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp).azTurnstileEntrance(index = 0)) {
        OutlinedTextField(
            value = query,
            onValueChange = onQuery,
            placeholder = { Text("Search extensions…") },
            singleLine = true,
            shape = RectangleShape,
            modifier = Modifier.fillMaxWidth(),
        )

        Spacer(Modifier.height(14.dp))
        ChipLabel("Sort")
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            SortMode.values().forEach { mode ->
                FilterChip(selected = sort == mode, onClick = { onSort(mode) }, label = { Text(mode.label) })
            }
        }

        Spacer(Modifier.height(12.dp))
        ChipLabel("Filter")
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("All", "Free", "Paid").forEachIndexed { i, label ->
                FilterChip(selected = price == i, onClick = { onPrice(i) }, label = { Text(label) })
            }
        }

        // What you already have. A second row rather than more chips in the price row: "free vs paid"
        // is about the package and "installed vs not" is about the viewer, and one row mixing both
        // reads as a single set of alternatives when they combine.
        Spacer(Modifier.height(8.dp))
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("Any" to 0, "Installed" to 1, "Not installed" to 2).forEach { (label, value) ->
                FilterChip(selected = owned == value, onClick = { onOwned(value) }, label = { Text(label) })
            }
        }

        if (categories.isNotEmpty()) {
            Spacer(Modifier.height(8.dp))
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(selected = category == null, onClick = { onCategory(null) }, label = { Text("All types") })
                categories.forEach { c ->
                    FilterChip(
                        selected = category == c,
                        onClick = { onCategory(c) },
                        label = { Text(c.replaceFirstChar { it.uppercase() }) },
                    )
                }
            }
        }

        if (apps.isNotEmpty()) {
            Spacer(Modifier.height(8.dp))
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(selected = app == null, onClick = { onApp(null) }, label = { Text("All apps") })
                apps.forEach { a ->
                    FilterChip(
                        selected = app == a,
                        onClick = { onApp(a) },
                        label = { Text(a.substringAfterLast('.')) },
                    )
                }
            }
        }
    }
}

@Composable
private fun ChipLabel(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.labelMedium,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        modifier = Modifier.padding(bottom = 6.dp),
    )
}
