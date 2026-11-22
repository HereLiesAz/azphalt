package components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.LocalContentColor
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import models.ActionKind
import models.ActionPhase
import models.NotInstalled
import models.NotInstalledStrings
import models.RequiredAction
import models.buttonStateFor
import models.phaseAfterOpen
import models.requiredActionsFor
import models.statusLineFor
import models.PackageSummary
import network.downloadUrl
import network.openExternal
import theme.CapsuleShape

/** The smallest target a button here may have. Material's default is 40dp, which is not enough. */
private val MinTarget = 48.dp

/**
 * The button that resolves a not-installed state.
 *
 * What it shows in each [ActionPhase] is decided by [buttonStateFor], which is tested; this only
 * draws it: a spinner and a disabled button while the action runs, the relabelled *Retry* with the
 * reason underneath when it failed. The description is what a screen reader announces, and the error
 * is a live region so a failure is spoken when it appears instead of waiting to be found.
 */
@Composable
internal fun ActionButton(
    action: RequiredAction,
    phase: ActionPhase,
    modifier: Modifier = Modifier,
    primary: Boolean = true,
    focusRequester: FocusRequester? = null,
    containerColor: androidx.compose.ui.graphics.Color? = null,
    onClick: () -> Unit,
) {
    val state = buttonStateFor(action, phase)
    val cs = MaterialTheme.colorScheme
    val buttonModifier = modifier
        .fillMaxWidth()
        .heightIn(min = MinTarget)
        .let { if (focusRequester != null) it.focusRequester(focusRequester) else it }
        .semantics {
            contentDescription = state.description
            role = Role.Button
        }
    val content: @Composable () -> Unit = {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.Center) {
            if (state.showProgress) {
                CircularProgressIndicator(modifier = Modifier.size(18.dp), strokeWidth = 2.dp, color = LocalContentColor.current)
                Spacer(Modifier.width(10.dp))
            }
            Text(state.label, fontWeight = FontWeight.Bold)
        }
    }
    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        if (primary) {
            Button(
                onClick = onClick,
                enabled = state.enabled,
                shape = CapsuleShape.Full,
                modifier = buttonModifier,
                colors = ButtonDefaults.buttonColors(containerColor = containerColor ?: cs.primary, contentColor = cs.onPrimary),
            ) { content() }
        } else {
            OutlinedButton(
                onClick = onClick,
                enabled = state.enabled,
                shape = CapsuleShape.Full,
                modifier = buttonModifier,
            ) { content() }
        }
        state.error?.let { message ->
            Text(
                text = message,
                style = MaterialTheme.typography.bodySmall,
                color = cs.error,
                modifier = Modifier.semantics { liveRegion = LiveRegionMode.Polite },
            )
        }
    }
}

/**
 * What the user sees when pressing Install found no host — `spec/web-handoff.md` § When no host is
 * installed.
 *
 * Every row is a button that does one thing, and it is never empty: a package whose directory entry
 * is missing still gets *Find an app that runs extensions*. Which rows there are, and what they say,
 * comes from [requiredActionsFor]; this wires each to the platform.
 *
 * Deliberately not phrased as an error. Downloading the package *is* a successful outcome on a
 * device with no host — a host registered for the `.azp` media type opens the file directly.
 */
@Composable
internal fun NoHostSheet(
    pkg: PackageSummary,
    state: NotInstalled.HostMissing,
    onRetry: () -> Unit,
    onDismiss: () -> Unit,
) {
    val cs = MaterialTheme.colorScheme
    val actions = remember(state, pkg.name) { requiredActionsFor(state, pkg.name) }
    // One phase per action, keyed by its position: a failed page open is retried in place.
    var phases by remember(actions) { mutableStateOf<Map<Int, ActionPhase>>(emptyMap()) }
    // Keyboard and switch users land on the first action rather than on the scrim behind the sheet.
    val firstFocus = remember { FocusRequester() }
    LaunchedEffect(Unit) { runCatching { firstFocus.requestFocus() } }

    AlertDialog(
        shape = CapsuleShape.Panel,
        onDismissRequest = onDismiss,
        title = { Text(NotInstalledStrings.sheetTitle(pkg.name)) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text(
                    text = statusLineFor(state) ?: "",
                    style = MaterialTheme.typography.bodyMedium,
                    color = cs.onSurfaceVariant,
                )
                actions.forEachIndexed { index, action ->
                    // The retry is the sheet's confirm button, not a row, so it is not drawn twice.
                    if (action.kind == ActionKind.RETRY_HANDOFF) return@forEachIndexed
                    ActionButton(
                        action = action,
                        phase = phases[index] ?: ActionPhase.Idle,
                        primary = index == 0,
                        focusRequester = if (index == 0) firstFocus else null,
                        onClick = {
                            val url = action.url ?: if (action.kind == ActionKind.DOWNLOAD_PACKAGE) downloadUrl(pkg.id, pkg.version) else null
                            if (url != null) {
                                phases = phases + (index to phaseAfterOpen(action, openExternal(url)))
                            }
                        },
                    )
                }
            }
        },
        confirmButton = {
            val retry = actions.first { it.kind == ActionKind.RETRY_HANDOFF }
            TextButton(
                onClick = onRetry,
                shape = CapsuleShape.Full,
                modifier = Modifier.heightIn(min = MinTarget).semantics { contentDescription = retry.description },
            ) { Text(retry.label) }
        },
        dismissButton = {
            TextButton(onClick = onDismiss, shape = CapsuleShape.Full, modifier = Modifier.heightIn(min = MinTarget)) { Text("Close") }
        },
    )
}
