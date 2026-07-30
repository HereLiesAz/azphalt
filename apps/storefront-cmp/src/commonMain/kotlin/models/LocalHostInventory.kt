package models

import androidx.compose.runtime.staticCompositionLocalOf

/**
 * Host-reported extension states for the current browse trip, by package id
 * (`spec/state-reporting.md` § 3).
 *
 * A composition local rather than a parameter threaded through the tree. The state is ambient by
 * nature — every card in every carousel and every list wants it, and it never changes for the life of
 * a browse request — so passing it explicitly would add the same argument to four signatures that have
 * nothing else to do with it.
 *
 * `static` because it is set once per browse trip and never reassigned: a static local skips the
 * read-tracking a regular one maintains, and re-composes its whole subtree on the rare change instead
 * of tracking every reader.
 *
 * The default is empty, which is the honest answer for the two cases that dominate — the web store,
 * where no host exists, and the standalone app, where no host called us. Both must render exactly as
 * they did before this existed.
 */
public val LocalHostInventory: androidx.compose.runtime.ProvidableCompositionLocal<Map<String, ExtensionStateEntry>> =
    staticCompositionLocalOf { emptyMap() }
