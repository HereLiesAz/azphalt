package components

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.carousel.HorizontalMultiBrowseCarousel
import androidx.compose.material3.carousel.rememberCarouselState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import models.PackageSummary
import theme.azTurnstileEntrance

/** The still frame non-active card previews hold, so one card animates at a time within a carousel. */
internal const val STILL_FRAME = 0.32f

private const val CARD_WIDTH = 340
private const val CARD_HEIGHT = 300

/** One titled row of the catalog — a VSCode-style section rendered as a hero carousel. */
data class CatalogSection(
    val title: String,
    val subtitle: String?,
    val items: List<PackageSummary>,
)

/**
 * Divide the whole catalog into VSCode-style browse sections: a few curated rows (Popular, Top rated,
 * Fresh) followed by one row per media-domain category, then an "everything else" row so nothing is
 * hidden. Items may repeat across rows — the same way a marketplace surfaces a popular pack under both
 * "Popular" and its category — and each row is capped so a carousel stays a carousel.
 */
fun buildSections(packages: List<PackageSummary>): List<CatalogSection> {
    if (packages.isEmpty()) return emptyList()
    val sections = mutableListOf<CatalogSection>()
    fun add(title: String, subtitle: String?, items: List<PackageSummary>, limit: Int = 14) {
        if (items.isNotEmpty()) sections += CatalogSection(title, subtitle, items.take(limit))
    }

    add("Popular", "Most installed across every host", packages.sortedByDescending { it.downloads })
    add(
        "Top rated",
        "Highest rated by the community",
        packages.filter { it.rating != null && it.ratingCount > 0 }.sortedByDescending { it.rating },
    )
    add(
        "Fresh",
        "Recently published and updated",
        packages.filter { it.updatedAt != null }.sortedByDescending { it.updatedAt },
    )

    // One section per media-domain category (VSCode-style browse-by-category).
    val categories = packages.flatMap { it.mediaDomains }.distinct().sorted()
    for (c in categories) {
        add(
            c.replaceFirstChar { it.uppercase() },
            null,
            packages.filter { c in it.mediaDomains }.sortedByDescending { it.downloads },
        )
    }

    // Anything with no category still gets a home.
    add("More extensions", null, packages.filter { it.mediaDomains.isEmpty() }.sortedByDescending { it.downloads })

    return sections
}

/**
 * A titled section rendered as a **Material 3 Expressive hero carousel** — a
 * [HorizontalMultiBrowseCarousel] that keeps one large focused card with smaller items peeking beside
 * it and masks/resizes them as they scroll. The header swings in as an AzNavRail turnstile, and — as in
 * the old grid — exactly one card animates its live preview at a time, cycling across the row on a
 * shared [clock]. Mature cards stay behind the [ageConfirmed] gate. Off-screen rows aren't composed, so
 * the animation cost stays bounded.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HeroCarousel(
    section: CatalogSection,
    clock: Float,
    ageConfirmed: Boolean,
    onConfirmAge: () -> Unit,
    onOpen: (PackageSummary) -> Unit,
) {
    var activeIndex by remember(section.title) { mutableStateOf(0) }
    LaunchedEffect(section.title, section.items.size) {
        if (section.items.isEmpty()) return@LaunchedEffect
        while (true) {
            delay(2600)
            activeIndex = (activeIndex + 1) % section.items.size
        }
    }
    val active = if (section.items.isEmpty()) -1 else activeIndex % section.items.size

    Column(modifier = Modifier.fillMaxWidth()) {
        Column(
            modifier = Modifier
                .padding(start = 24.dp, end = 24.dp, bottom = 14.dp)
                .azTurnstileEntrance(index = 0),
        ) {
            Text(
                text = section.title,
                style = MaterialTheme.typography.headlineSmall,
                color = MaterialTheme.colorScheme.onBackground,
            )
            section.subtitle?.let {
                Text(
                    text = it,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        val carouselState = rememberCarouselState(itemCount = { section.items.size })
        HorizontalMultiBrowseCarousel(
            state = carouselState,
            modifier = Modifier.fillMaxWidth().height(CARD_HEIGHT.dp),
            preferredItemWidth = CARD_WIDTH.dp,
            itemSpacing = 20.dp,
            contentPadding = PaddingValues(horizontal = 24.dp),
        ) { index ->
            val pkg = section.items[index]
            PackageCard(
                pkg = pkg,
                phase = if (index == active) clock else STILL_FRAME,
                index = index,
                onOpen = onOpen,
                // Sharp Metro mask so the carousel clips/resizes items as they scroll (the hero effect).
                modifier = Modifier.width(CARD_WIDTH.dp).height(CARD_HEIGHT.dp).maskClip(RectangleShape),
                ageConfirmed = ageConfirmed,
                onConfirmAge = onConfirmAge,
            )
        }
    }
}
