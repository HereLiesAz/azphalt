package theme

import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.animation.core.AnimationSpec

/**
 * Google Material 3 Expressive Motion.
 * Based on: https://m3.material.io/styles/motion/overview/how-it-works
 * 
 * Expressive motion feels more physical, bouncy, and responsive.
 */
object ExpressiveMotion {
    
    // Spring Specifications for Spatial Movement
    
    /** Expressive fast spatial: 0.42, 1.67, 0.21, 0.90. Duration = 350ms */
    val FastSpatialEasing = CubicBezierEasing(0.42f, 1.67f, 0.21f, 0.90f)
    val FastSpatial: AnimationSpec<Float> = tween(durationMillis = 350, easing = FastSpatialEasing)
    
    /** Expressive default spatial: 0.38, 1.21, 0.22, 1.00. Duration = 500ms */
    val DefaultSpatialEasing = CubicBezierEasing(0.38f, 1.21f, 0.22f, 1.00f)
    val DefaultSpatial: AnimationSpec<Float> = tween(durationMillis = 500, easing = DefaultSpatialEasing)
    
    /** Expressive slow spatial: 0.39, 1.29, 0.35, 0.98. Duration = 650ms */
    val SlowSpatialEasing = CubicBezierEasing(0.39f, 1.29f, 0.35f, 0.98f)
    val SlowSpatial: AnimationSpec<Float> = tween(durationMillis = 650, easing = SlowSpatialEasing)

    // Spring Specifications for Effects Movement (Opacity, Color, Scale)

    /** Expressive fast effects: 0.31, 0.94, 0.34, 1.00. Duration = 150ms */
    val FastEffectsEasing = CubicBezierEasing(0.31f, 0.94f, 0.34f, 1.00f)
    val FastEffects: AnimationSpec<Float> = tween(durationMillis = 150, easing = FastEffectsEasing)

    /** Expressive default effects: 0.34, 0.80, 0.34, 1.00. Duration = 200ms */
    val DefaultEffectsEasing = CubicBezierEasing(0.34f, 0.80f, 0.34f, 1.00f)
    val DefaultEffects: AnimationSpec<Float> = tween(durationMillis = 200, easing = DefaultEffectsEasing)

    /** Expressive slow effects: 0.34, 0.88, 0.34, 1.00. Duration = 300ms */
    val SlowEffectsEasing = CubicBezierEasing(0.34f, 0.88f, 0.34f, 1.00f)
    val SlowEffects: AnimationSpec<Float> = tween(durationMillis = 300, easing = SlowEffectsEasing)
    
    // Physics-driven Springs
    val BouncySpring = spring<Float>(
        dampingRatio = 0.55f, // More bounce than typical standard
        stiffness = 500f // Higher stiffness for faster return
    )
    
    val HeavySpring = spring<Float>(
        dampingRatio = 0.75f, 
        stiffness = 300f 
    )
}
