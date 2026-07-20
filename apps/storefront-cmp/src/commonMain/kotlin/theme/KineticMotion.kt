package theme

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.Easing
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.gestures.awaitEachGesture
import androidx.compose.foundation.gestures.awaitFirstDown
import androidx.compose.foundation.gestures.waitForUpOrCancellation
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.graphics.TransformOrigin
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalDensity
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * AzNavRail's kinetic-typography motion, ported so the storefront's entrances read as the same
 * Windows-Phone-7 turnstile the rail plays on its menu words. The constants mirror the library's
 * `azKinetics` defaults verbatim (see com.hereliesaz.aznavrail.model.AzEasing and
 * AzNavRailScope.azKinetics): a snappy fast-out / gentle-settle curve, a 720 ms swing, a 60 ms
 * per-item cascade, and a 90° edge-on start angle.
 *
 * These are *additive*: every existing storefront animation (bento hover/scale/elevation, the
 * procedural preview clock, the detail hero transition) stays; the turnstile just plays on top when
 * an element first enters composition.
 */
object AzKinetics {
    /** WP7's signature fast-out / gentle-settle curve. Snappy. */
    val Wp7Decelerate: Easing = CubicBezierEasing(0.1f, 0.9f, 0.2f, 1f)

    /** Duration (ms) of a single item's turnstile swing. */
    const val EntranceDurationMs = 720

    /** Per-item cascade delay (ms), multiplied by the item's position. */
    const val EntranceStaggerMs = 60

    /** Starting `rotationY` (degrees) for the turnstile sweep — edge-on, then swings to flat. */
    const val EntranceStartAngle = 90f

    /** Maximum 3D tilt (degrees) toward the press point for [azTiltOnPress]. */
    const val MaxTiltDegrees = 10f

    /** Perspective depth for the 3D layers, in dp-equivalent units (scaled by density). */
    const val CameraDistanceDp = 14f
}

/**
 * Plays AzNavRail's WP7 turnstile the first time this element enters composition: it swings in around
 * a docked edge (rotationY from [startAngle] back to flat, no fade), cascaded by [index] so a row or
 * grid arrives one item at a time.
 *
 * The hinge is the left edge by default (matching the rail's default `AzDockingSide.LEFT`); set
 * [hingeLeft] false to hinge on the right. In a `LazyVerticalGrid`/`LazyColumn` each item runs its own
 * entrance as it scrolls into view, which reads as the items pivoting in — the same effect the rail
 * gets on menu open.
 */
fun Modifier.azTurnstileEntrance(
    index: Int,
    hingeLeft: Boolean = true,
    startAngle: Float = AzKinetics.EntranceStartAngle,
    staggerMs: Int = AzKinetics.EntranceStaggerMs,
    durationMs: Int = AzKinetics.EntranceDurationMs,
    easing: Easing = AzKinetics.Wp7Decelerate,
): Modifier = composed {
    val density = LocalDensity.current.density
    val rotY = remember { Animatable(startAngle) }
    LaunchedEffect(Unit) {
        delay(index.coerceAtLeast(0).toLong() * staggerMs)
        rotY.animateTo(0f, tween(durationMillis = durationMs, easing = easing))
    }
    graphicsLayer {
        rotationY = rotY.value
        transformOrigin = TransformOrigin(if (hingeLeft) 0f else 1f, 0.5f)
        cameraDistance = AzKinetics.CameraDistanceDp * density
    }
}

/**
 * AzNavRail's "tilt effect": while pressed, the element tilts in 3D toward the press point, then
 * springs back on release. The gesture only *observes* pointer events (it never consumes them), so an
 * underlying `clickable`/`onClick` still fires — exactly as the rail's items behave.
 */
fun Modifier.azTiltOnPress(
    maxTiltDegrees: Float = AzKinetics.MaxTiltDegrees,
): Modifier = composed {
    val density = LocalDensity.current.density
    var tiltX by remember { mutableStateOf(0f) }
    var tiltY by remember { mutableStateOf(0f) }
    val rotX = remember { Animatable(0f) }
    val rotY = remember { Animatable(0f) }

    LaunchedEffect(tiltX, tiltY) {
        launch { rotX.animateTo(tiltX, if (tiltX == 0f) spring() else tween(110)) }
        launch { rotY.animateTo(tiltY, if (tiltY == 0f) spring() else tween(110)) }
    }

    this
        .graphicsLayer {
            rotationX = rotX.value
            rotationY = rotY.value
            cameraDistance = AzKinetics.CameraDistanceDp * density
        }
        .pointerInput(maxTiltDegrees) {
            awaitEachGesture {
                val down = awaitFirstDown(requireUnconsumed = false)
                val nx = (down.position.x / size.width) * 2f - 1f
                val ny = (down.position.y / size.height) * 2f - 1f
                tiltY = nx * maxTiltDegrees
                tiltX = -ny * maxTiltDegrees
                waitForUpOrCancellation()
                tiltY = 0f
                tiltX = 0f
            }
        }
}
