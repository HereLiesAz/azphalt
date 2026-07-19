package components

import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import models.PackageSummary
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

/**
 * A live, procedural preview that animates the way a package *behaves* — halftone dots pulse, dither
 * cells shift, a LUT sweeps hues, a brush stroke draws itself, patterns tile, a model's nodes fire.
 * The style is chosen from the package's kind / name / capabilities. Pure Compose Canvas, no assets.
 */
private enum class ArtStyle { HALFTONE, DITHER, COLORGRADE, BRUSH, PATTERN, NEURAL, WAVE }

private fun styleFor(pkg: PackageSummary): ArtStyle {
    val n = (pkg.name + " " + pkg.id).lowercase()
    return when {
        "halftone" in n -> ArtStyle.HALFTONE
        "dither" in n -> ArtStyle.DITHER
        "lut" in n || "grade" in n || "cine" in n || "film" in n || "color" in n -> ArtStyle.COLORGRADE
        "brush" in n || "ink" in n || "sumi" in n -> ArtStyle.BRUSH
        "pattern" in n || "geo" in n || "tile" in n -> ArtStyle.PATTERN
        pkg.kind == "asset" && listOf("model", "net", "onnx", "depth", "vosk", "whisper", "gemma",
            "yamnet", "spleeter", "segmentation", "face", "vlm", "effect", "embed", "rfb").any { it in n } ->
            ArtStyle.NEURAL
        else -> ArtStyle.WAVE
    }
}

@Composable
fun PreviewArt(pkg: PackageSummary, tint: Color, modifier: Modifier = Modifier) {
    val transition = rememberInfiniteTransition(label = "art")
    val phase by transition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(durationMillis = 5200, easing = LinearEasing), RepeatMode.Restart),
        label = "phase",
    )
    val pulse by transition.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(durationMillis = 2400, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "pulse",
    )
    val style = styleFor(pkg)
    Canvas(modifier = modifier) {
        when (style) {
            ArtStyle.HALFTONE -> drawHalftone(phase, tint)
            ArtStyle.DITHER -> drawDither(phase, tint)
            ArtStyle.COLORGRADE -> drawColorGrade(phase)
            ArtStyle.BRUSH -> drawBrush(phase, tint)
            ArtStyle.PATTERN -> drawPattern(phase, tint)
            ArtStyle.NEURAL -> drawNeural(phase, pulse, tint)
            ArtStyle.WAVE -> drawWave(phase, tint)
        }
    }
}

private val TAU = (2.0 * PI).toFloat()

private fun DrawScope.drawHalftone(phase: Float, tint: Color) {
    val cols = 8
    val rows = 4
    val cw = size.width / cols
    val ch = size.height / rows
    val maxR = minOf(cw, ch) / 2f
    for (r in 0 until rows) for (c in 0 until cols) {
        val wave = sin((c + r) * 0.7f + phase * TAU)
        val radius = maxR * (0.2f + 0.7f * ((wave + 1f) / 2f))
        drawCircle(tint.copy(alpha = 0.85f), radius, Offset(cw * (c + 0.5f), ch * (r + 0.5f)))
    }
}

private fun DrawScope.drawDither(phase: Float, tint: Color) {
    val n = 10
    val cw = size.width / n
    val ch = size.height / n
    val shift = (phase * n).toInt()
    for (y in 0 until n) for (x in 0 until n) {
        val v = ((x * 3 + y * 7 + shift) % 6) / 6f
        if (v > 0.35f) {
            drawRect(tint.copy(alpha = v * 0.85f), Offset(x * cw, y * ch), Size(cw * 0.9f, ch * 0.9f))
        }
    }
}

private fun DrawScope.drawColorGrade(phase: Float) {
    val bands = 7
    val bw = size.width / bands
    for (i in 0 until bands) {
        val hue = (((i / bands.toFloat()) + phase) % 1f) * 360f
        drawRect(Color.hsv(hue, 0.68f, 0.96f), Offset(i * bw, 0f), Size(bw + 1f, size.height))
    }
}

private fun DrawScope.drawBrush(phase: Float, tint: Color) {
    val steps = 44
    val drawn = (phase * (steps + 12)).toInt().coerceIn(0, steps)
    val path = Path()
    for (i in 0..drawn) {
        val t = i / steps.toFloat()
        val x = size.width * (0.08f + 0.84f * t)
        val y = size.height * (0.5f + 0.34f * sin(t * 3f * PI.toFloat()))
        if (i == 0) path.moveTo(x, y) else path.lineTo(x, y)
    }
    drawPath(path, tint.copy(alpha = 0.9f), style = Stroke(width = size.height * 0.11f, cap = StrokeCap.Round))
}

private fun DrawScope.drawPattern(phase: Float, tint: Color) {
    val n = 5
    val cell = size.width / n
    val off = phase * cell
    var row = 0
    var y = -cell
    while (y < size.height + cell) {
        var x = -cell + (if (row % 2 == 0) off else -off)
        while (x < size.width + cell) {
            val p = Path()
            p.moveTo(x + cell / 2, y)
            p.lineTo(x + cell, y + cell / 2)
            p.lineTo(x + cell / 2, y + cell)
            p.lineTo(x, y + cell / 2)
            p.close()
            drawPath(p, tint.copy(alpha = 0.14f + 0.14f * (((row + (x / cell).toInt()) % 2))))
            x += cell
        }
        y += cell
        row++
    }
}

private fun DrawScope.drawNeural(phase: Float, pulse: Float, tint: Color) {
    val center = Offset(size.width / 2f, size.height / 2f)
    val nodes = 6
    val rr = size.minDimension * 0.34f
    val pts = (0 until nodes).map {
        val a = (it / nodes.toFloat()) * TAU + phase * TAU
        Offset(center.x + rr * cos(a), center.y + rr * sin(a))
    }
    for (i in pts.indices) for (j in i + 1 until pts.size) {
        drawLine(tint.copy(alpha = 0.16f), pts[i], pts[j], strokeWidth = 1.5f)
    }
    drawCircle(tint.copy(alpha = 0.22f), size.minDimension * 0.11f * (0.8f + 0.5f * pulse), center)
    pts.forEach { drawCircle(tint.copy(alpha = 0.92f), size.minDimension * 0.03f, it) }
}

private fun DrawScope.drawWave(phase: Float, tint: Color) {
    val lines = 3
    val steps = 40
    for (l in 0 until lines) {
        val amp = size.height * 0.12f
        val yBase = size.height * (0.32f + 0.18f * l)
        val path = Path()
        var i = 0
        while (i <= steps) {
            val t = i / steps.toFloat()
            val x = t * size.width
            val y = yBase + amp * sin(t * 4f * PI.toFloat() + phase * TAU + l)
            if (i == 0) path.moveTo(x, y) else path.lineTo(x, y)
            i++
        }
        drawPath(path, tint.copy(alpha = 0.5f - l * 0.12f), style = Stroke(width = 3f, cap = StrokeCap.Round))
    }
}
