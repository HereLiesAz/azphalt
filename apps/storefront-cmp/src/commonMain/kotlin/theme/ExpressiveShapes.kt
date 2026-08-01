/*
 * The shape language.
 *
 * The palette here was already Expressive — a saturated violet and a hot pink — but every surface in
 * the app was drawn with `RectangleShape`: cards, buttons, chips, dialogs, all hard 90° corners. That
 * combination reads as neither thing. M3 Expressive is not a colour scheme, it is *shape and motion*:
 * large and deliberately varied corner radii, a pill for anything you press, and springs rather than
 * eased curves. Vibrant colour poured into a rigid flat-rectangle skeleton just looks like a bright
 * spreadsheet.
 *
 * Varied is the operative word. A single radius applied everywhere is the other failure — it makes a
 * screen of identical rounded boxes, which is tidy and completely inert. These sizes are meant to be
 * used against each other: a large card next to a pill button next to a small chip.
 */
package theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.foundation.shape.CornerBasedShape
import androidx.compose.ui.unit.dp

object ExpressiveShapes {
    /** Anything you press. A full pill — the single most Expressive-looking primitive there is. */
    val Pill: CornerBasedShape = RoundedCornerShape(percent = 50)

    /** Chips and small status affordances: rounded enough to read as soft, small enough to stay dense. */
    val Small: CornerBasedShape = RoundedCornerShape(12.dp)

    /** The default card. Large by ordinary standards, which is the point. */
    val Card: CornerBasedShape = RoundedCornerShape(24.dp)

    /**
     * The hero card, and the detail's artwork panel.
     *
     * Deliberately asymmetric. A row of identically-rounded rectangles is still a row of rectangles;
     * one corner behaving differently is what stops a carousel reading as a grid, and it costs
     * nothing but four numbers.
     */
    val Hero: CornerBasedShape = RoundedCornerShape(topStart = 36.dp, topEnd = 12.dp, bottomEnd = 36.dp, bottomStart = 12.dp)

    /** Sheets and dialogs — a modal is a big surface and wants the largest radius in the set. */
    val Sheet: CornerBasedShape = RoundedCornerShape(28.dp)
}

/**
 * Wired into MaterialTheme so every un-styled M3 component picks these up too, not only the call
 * sites that were changed by hand. A component nobody remembered to restyle should land on the
 * shape language by default rather than falling back to the framework's.
 */
val AzphaltShapes = Shapes(
    extraSmall = ExpressiveShapes.Small,
    small = ExpressiveShapes.Small,
    medium = ExpressiveShapes.Card,
    large = ExpressiveShapes.Card,
    extraLarge = ExpressiveShapes.Sheet,
)
