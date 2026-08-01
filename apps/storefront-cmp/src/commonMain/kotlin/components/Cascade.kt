/*
 * The catalogue as a cascade of capsules.
 *
 * This replaces the card grid and the hero carousel. Both were the same mistake in two shapes: a
 * bordered surface with artwork inside it, laid out in a tidy column of equal boxes. The Capsule
 * system has no cards and no surfaces — a catalogue is a stack of capsules of varying length,
 * stepping sideways, unfolding down the page.
 *
 * Pressing an index capsule extends it to full width, turns it ink, and unfolds its entries beneath —
 * indented, each in turn. Nothing navigates away.
 */
package components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.material3.Text
import models.ExtensionState
import models.LocalHostInventory
import models.PackageSummary
import theme.Cascade
import theme.CapsuleMotion
import theme.Ground
import theme.Hues
import theme.Roles

/** Display type: 900 with negative tracking, uppercase. The only place type gets large. */
fun displayStyle(size: Int) = TextStyle(
    fontSize = size.sp,
    lineHeight = (size * 0.92f).sp,
    fontWeight = FontWeight.Black,
    letterSpacing = (-size * 0.025f).sp,
    color = Ground.Ink,
)

/** Eyebrow: 800, tiny, very wide tracking. Section numbers and quiet counts. */
val eyebrowStyle = TextStyle(
    fontSize = 11.sp,
    lineHeight = 11.sp,
    fontWeight = FontWeight.ExtraBold,
    letterSpacing = 3.1.sp,
    color = Ground.inkAt(0.55f),
)

/** Body: the only lowercase in the system, set heavy so it holds against the yellow. */
val bodyStyle = TextStyle(
    fontSize = 17.sp,
    lineHeight = 25.sp,
    fontWeight = FontWeight.SemiBold,
    color = Ground.inkAt(0.78f),
)

/**
 * One category and the entries under it.
 *
 * Reuses [CatalogSection] so the existing section-building logic is untouched — what changes is that
 * a section is now a capsule you press rather than a heading over a carousel.
 */
@Composable
private fun CategoryCapsule(
    section: CatalogSection,
    index: Int,
    open: Boolean,
    onToggle: () -> Unit,
    onOpen: (PackageSummary) -> Unit,
) {
    val hue = Hues.bgFor(section.title)
    val cap = Hues.capFor(section.title)

    Column(modifier = Modifier.fillMaxWidth()) {
        UnfoldingCapsule(
            // Open categories go ink with a yellow cap — the guide's "selected" role. Colour means
            // nothing on a closed one and everything on this.
            label = section.title,
            background = if (open) Roles.Selected.first else hue,
            index = index,
            cap = if (open) Roles.Selected.second else cap,
            capText = section.items.size.toString(),
            labelSize = 15,
            height = 46.dp,
            onClick = onToggle,
            // Extending to full width on press is the whole interaction. A closed capsule takes its
            // width from the cascade so the stack never reads as a column.
            modifier = if (open) {
                Modifier.fillMaxWidth()
            } else {
                Modifier.fillMaxWidth(Cascade.widthFraction(index))
            }.padding(start = if (open) 0.dp else Cascade.indent(index)),
        )

        AnimatedVisibility(
            visible = open,
            enter = expandVertically(tween(CapsuleMotion.DurationMs, easing = CapsuleMotion.Curve)) +
                fadeIn(tween(CapsuleMotion.DurationMs)),
            exit = shrinkVertically(tween(CapsuleMotion.DurationMs, easing = CapsuleMotion.Curve)) +
                fadeOut(tween(CapsuleMotion.DurationMs / 2)),
        ) {
            Column(
                // Children indent one level. Two levels, then the record — the guide's depth rule.
                modifier = Modifier.fillMaxWidth().padding(start = 36.dp, top = 9.dp),
                verticalArrangement = Arrangement.spacedBy(9.dp),
            ) {
                section.items.forEachIndexed { i, pkg ->
                    EntryCapsule(pkg = pkg, index = i, onOpen = onOpen)
                }
            }
        }
    }
}

/**
 * One package.
 *
 * The end-cap carries the thing worth knowing at a glance, and what that is depends on the viewer:
 * if they already have it, that; otherwise the price or the kind. A card had room to say all three
 * and said none of them clearly.
 */
@Composable
private fun EntryCapsule(pkg: PackageSummary, index: Int, onOpen: (PackageSummary) -> Unit) {
    val held = LocalHostInventory.current[pkg.id]?.state
        .let { it != null && it != ExtensionState.REMOVED }
    val paid = isPaid(pkg)

    UnfoldingCapsule(
        label = pkg.name,
        background = if (held) Roles.Acquired.first else Hues.bgFor(pkg.id),
        index = index,
        cap = when {
            held -> Roles.Acquired.second
            paid -> Roles.Acquire.second
            else -> Hues.capFor(pkg.id)
        },
        capText = when {
            held -> "Have"
            paid -> priceLabel(pkg)
            else -> pkg.kind
        },
        labelSize = 14,
        height = 42.dp,
        onClick = { onOpen(pkg) },
        modifier = Modifier
            .fillMaxWidth(Cascade.widthFraction(index + 2))
            .padding(start = Cascade.indent(index)),
    )
}

/**
 * The whole catalogue: an index of categories, each unfolding its entries.
 *
 * A [LazyColumn] so a long catalogue does not compose every row, and [listState] is hoisted so the
 * scroll position survives opening a package and coming back.
 */
@Composable
fun CascadeCatalog(
    sections: List<CatalogSection>,
    onOpen: (PackageSummary) -> Unit,
    modifier: Modifier = Modifier,
    listState: LazyListState = rememberLazyListState(),
    header: @Composable () -> Unit = {},
) {
    // Which category is open. One at a time: the point of extending a capsule to full width is that
    // it is *the* one being read, and two open at once makes the cascade a list of lists.
    var openTitle by remember { mutableStateOf<String?>(null) }

    LazyColumn(
        modifier = modifier.fillMaxWidth(),
        state = listState,
        contentPadding = PaddingValues(bottom = 140.dp),
        verticalArrangement = Arrangement.spacedBy(9.dp),
    ) {
        item { header() }
        item { Spacer(Modifier.height(8.dp)) }

        sections.forEachIndexed { i, section ->
            item(key = section.title) {
                CategoryCapsule(
                    section = section,
                    index = i,
                    open = openTitle == section.title,
                    onToggle = { openTitle = if (openTitle == section.title) null else section.title },
                    onOpen = onOpen,
                )
            }
        }
    }
}

/**
 * A flat cascade with no index — what a search or filter produces.
 *
 * Results are not a category, so wrapping them in one would be a lie about why they are together.
 */
@Composable
fun CascadeResults(
    packages: List<PackageSummary>,
    onOpen: (PackageSummary) -> Unit,
    modifier: Modifier = Modifier,
    listState: LazyListState = rememberLazyListState(),
    header: @Composable () -> Unit = {},
) {
    LazyColumn(
        modifier = modifier.fillMaxWidth(),
        state = listState,
        contentPadding = PaddingValues(bottom = 140.dp),
        verticalArrangement = Arrangement.spacedBy(9.dp),
    ) {
        item { header() }
        item { Spacer(Modifier.height(8.dp)) }

        if (packages.isEmpty()) {
            item {
                // The guide's empty state: one red capsule reading NOTHING, the query beneath it.
                Capsule(
                    label = "Nothing",
                    background = Roles.Acquire.first,
                    cap = Roles.Acquire.second,
                    modifier = Modifier.fillMaxWidth(0.42f),
                )
            }
        }

        packages.forEachIndexed { i, pkg ->
            item(key = pkg.id) { EntryCapsule(pkg = pkg, index = i, onOpen = onOpen) }
        }
    }
}
