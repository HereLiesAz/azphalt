package components

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import models.LlmDto
import models.llmDisclosureLines
import network.openExternal

/** The "Before you install" record for a `kind:"llm"` listing; see [llmDisclosureLines]. */
@Composable
internal fun LlmDisclosure(llm: LlmDto) {
    Text("Before you install", style = eyebrowStyle)
    Spacer(Modifier.height(10.dp))
    RecordTile(modifier = Modifier.fillMaxWidth(), padding = PaddingValues(24.dp)) {
        Column {
            llmDisclosureLines(llm).forEachIndexed { i, (key, value) ->
                if (i > 0) Spacer(Modifier.height(7.dp))
                RecordLine(key, value)
            }
            llm.dataHandling?.terms?.let { terms ->
                Spacer(Modifier.height(4.dp))
                TextButton(onClick = { openExternal(terms) }) { Text("Operator terms") }
            }
            Spacer(Modifier.height(10.dp))
            Text(
                "Setup runs once, off this device, in a private repository used only for azphalt sandboxes.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}
