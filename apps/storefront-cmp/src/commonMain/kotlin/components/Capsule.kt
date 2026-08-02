/*
 * The capsule — the one component.
 *
 * Navigation, filters, entries, badges and buttons are this object at different sizes. The style
 * guide's rule is that if a thing can be pressed or names something, it is a capsule, which is why
 * this file is short and everything else is a caller.
 */
package components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawWithContent
import androidx.compose.ui.graphics.drawscope.clipRect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.material3.Text
import theme.CapsuleMotion
import theme.CapsuleShape
import theme.Ground
import theme.LocalJost

/**
 * Capsule label type: 800 uppercase with positive tracking, so short words fill their capsule.
 *
 * Always white on a hue — never ink. The guide is explicit about this and it is the thing that goes
 * wrong first when someone adds a pale hue.
 */
@Composable
fun capsuleLabelStyle(size: Int) = TextStyle(
    fontFamily = LocalJost.current,
    fontSize = size.sp,
    lineHeight = size.sp,
    fontWeight = FontWeight.ExtraBold,
    letterSpacing = (size * 0.09f).sp,
    color = Color.White,
)

/**
 * One capsule.
 *
 * `padding` is asymmetric by rule — the left is roughly twice the right, because the end-cap needs
 * less room than the word does and a symmetric capsule looks like the label has drifted.
 *
 * `capText` empty draws a plain circular end-cap; non-empty draws a wider one holding a count or a
 * kind. A null [cap] omits it entirely, which is what an unselected small filter looks like.
 */
@Composable
fun Capsule(
    label: String,
    background: Color,
    modifier: Modifier = Modifier,
    cap: Color? = null,
    capText: String = "",
    labelSize: Int = 15,
    height: Dp = 46.dp,
    onClick: (() -> Unit)? = null,
) {
    val interaction = remember { MutableInteractionSource() }
    val shape = CapsuleShape.Full

    Row(
        modifier = modifier
            .height(height)
            .clip(shape)
            .background(background)
            .then(
                if (onClick != null) {
                    Modifier.clickable(interactionSource = interaction, indication = null) { onClick() }
                } else {
                    Modifier
                }
            )
            // Left ≈ 2× right. No border, no shadow: contrast comes from the hue against the yellow.
            .padding(start = (height.value * 0.52f).dp, end = (height.value * 0.22f).dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        Text(
            text = label.uppercase(),
            style = capsuleLabelStyle(labelSize),
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            modifier = Modifier.weight(1f, fill = false),
        )
        cap?.let { capColor ->
            val capH = (height.value * 0.52f).dp
            Box(
                modifier = Modifier
                    .height(capH)
                    .defaultMinSize(minWidth = capH)
                    .clip(CapsuleShape.Full)
                    .background(capColor)
                    .padding(horizontal = if (capText.isEmpty()) 0.dp else 10.dp),
                contentAlignment = Alignment.Center,
            ) {
                if (capText.isNotEmpty()) {
                    Text(text = capText.uppercase(), style = capsuleLabelStyle(10))
                }
            }
        }
    }
}

/**
 * A capsule in a cascade: it unfolds left to right on arrival.
 *
 * A clip reveal rather than a width animation, because a width animation stretches the label as it
 * grows and the guide's whole point is that text never distorts. [index] drives the stagger so a
 * stack opens as a cascade rather than all at once; past `MaxStaggeredRows` the delay stops growing,
 * or a long catalogue would take most of a minute to finish arriving.
 */
@Composable
fun UnfoldingCapsule(
    label: String,
    background: Color,
    index: Int,
    modifier: Modifier = Modifier,
    cap: Color? = null,
    capText: String = "",
    labelSize: Int = 15,
    height: Dp = 46.dp,
    onClick: (() -> Unit)? = null,
) {
    val progress by animateFloatAsState(
        targetValue = 1f,
        animationSpec = tween(
            durationMillis = CapsuleMotion.DurationMs,
            delayMillis = (index.coerceAtMost(CapsuleMotion.MaxStaggeredRows)) * CapsuleMotion.StaggerMs,
            easing = CapsuleMotion.Curve,
        ),
        label = "unfold",
    )
    Box(modifier = Modifier.fillMaxWidth()) {
        Capsule(
            label = label,
            background = background,
            modifier = modifier.then(Modifier.clipReveal(progress)),
            cap = cap,
            capText = capText,
            labelSize = labelSize,
            height = height,
            onClick = onClick,
        )
    }
}

/** Reveal from the left: `clip-path: inset(0 (1-p)*100% 0 0)`. */
private fun Modifier.clipReveal(progress: Float): Modifier = this.then(
    Modifier.drawWithContentReveal(progress)
)

private fun Modifier.drawWithContentReveal(progress: Float): Modifier =
    drawWithContent {
        clipRect(right = size.width * progress.coerceIn(0f, 1f)) {
            this@drawWithContent.drawContent()
        }
    }

/**
 * A record tile: facts, at 9% ink, with the system's only non-full radius.
 *
 * Not a card. It has no border and no shadow — it is a slightly darker patch of the same page.
 */
@Composable
fun RecordTile(
    modifier: Modifier = Modifier,
    padding: PaddingValues = PaddingValues(horizontal = 20.dp, vertical = 16.dp),
    content: @Composable () -> Unit,
) {
    Box(
        modifier = modifier
            .clip(CapsuleShape.Record)
            .background(Ground.inkAt(0.09f))
            .padding(padding),
    ) { content() }
}

/**
 * A fact: a key and a value in one capsule, at 10% ink.
 *
 * The guide's shape for the small hard facts — version, kind, size, count. Ink rather than a hue
 * because these are not pressable and not named things competing for attention; they are the record.
 */
@Composable
fun FactCapsule(key: String, value: String, modifier: Modifier = Modifier) {
    Row(
        modifier = modifier
            .height(34.dp)
            .clip(CapsuleShape.Full)
            .background(Ground.inkAt(0.10f))
            .padding(horizontal = 15.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(9.dp),
    ) {
        Text(
            text = key.uppercase(),
            style = TextStyle(
                fontFamily = LocalJost.current,
                fontSize = 9.sp,
                fontWeight = FontWeight.ExtraBold,
                letterSpacing = 1.6.sp,
                color = Ground.inkAt(0.55f),
            ),
        )
        Text(
            text = value.uppercase(),
            style = TextStyle(
                fontFamily = LocalJost.current,
                fontSize = 13.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Ground.Ink,
            ),
        )
    }
}

/**
 * One line of the record: a fixed-width key and a value that wraps.
 *
 * Ids, digests and signer keys go here rather than in a [FactCapsule] — they are long, and a capsule
 * that wraps is not a capsule.
 */
@Composable
fun RecordLine(key: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(14.dp),
    ) {
        Text(
            text = key.uppercase(),
            modifier = Modifier.width(132.dp),
            style = TextStyle(
                fontFamily = LocalJost.current,
                fontSize = 9.sp,
                lineHeight = 13.sp,
                fontWeight = FontWeight.ExtraBold,
                letterSpacing = 1.6.sp,
                color = Ground.inkAt(0.5f),
            ),
        )
        Text(
            text = value,
            style = TextStyle(
                fontFamily = LocalJost.current,
                fontSize = 13.sp,
                lineHeight = 18.sp,
                fontWeight = FontWeight.Bold,
                color = Ground.Ink,
            ),
        )
    }
}

/**
 * The surface switch — `azphalt.store` and `azphalt.org` beside the wordmark.
 *
 * The guide treats the store and the docs as two pages of one publication rather than two products,
 * and this is the only thing that says so. Ink when active, hue when not; the inactive one navigates
 * away, which is why it is the single place in the store that leaves the page.
 */
@Composable
fun SurfaceSwitch(active: String, onNavigate: (String) -> Unit) {
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        listOf("Store" to "https://azphalt.store", "Docs" to "https://azphalt.org").forEach { (label, url) ->
            val isActive = label.equals(active, ignoreCase = true)
            Capsule(
                label = label,
                background = if (isActive) Ground.Ink else Ground.inkAt(0.14f),
                cap = if (isActive) Color(0xFFF0D42A) else null,
                labelSize = 11,
                height = 34.dp,
                onClick = if (isActive) null else ({ onNavigate(url) }),
            )
        }
    }
}

/**
 * The receipt: what the store can actually say about the bytes, after acquiring.
 *
 * Teal because "done" is one of the few roles that means something. It exists because the trust
 * chain — integrity verified, signature checked, publisher pinned — was previously something the
 * code did carefully and the interface never mentioned, so a user had no way to tell a verified
 * install from an unverified one.
 *
 * Each line is only shown when it is actually known. A receipt that lists a signature for an unsigned
 * package would be worse than no receipt at all.
 */
@Composable
fun Receipt(lines: List<Pair<String, String>>, modifier: Modifier = Modifier) {
    if (lines.isEmpty()) return
    Column(modifier = modifier, verticalArrangement = Arrangement.spacedBy(7.dp)) {
        lines.forEachIndexed { i, (label, detail) ->
            UnfoldingCapsule(
                label = label,
                background = Ground.Ink,
                index = i,
                cap = Color(0xFF1F9E86),
                capText = detail,
                labelSize = 11,
                height = 34.dp,
                modifier = Modifier.fillMaxWidth(0.52f + (i % 3) * 0.12f),
            )
        }
    }
}
