package theme

import androidx.compose.animation.core.CubicBezierEasing

object ExpressiveMotion {
    val FastSpatial = CubicBezierEasing(0.42f, 1.67f, 0.21f, 0.90f)
    const val FastSpatialDuration = 350

    val DefaultSpatial = CubicBezierEasing(0.38f, 1.21f, 0.22f, 1.00f)
    const val DefaultSpatialDuration = 500

    val SlowSpatial = CubicBezierEasing(0.39f, 1.29f, 0.35f, 0.98f)
    const val SlowSpatialDuration = 650

    val FastEffects = CubicBezierEasing(0.31f, 0.94f, 0.34f, 1.00f)
    const val FastEffectsDuration = 150

    val DefaultEffects = CubicBezierEasing(0.34f, 0.80f, 0.34f, 1.00f)
    const val DefaultEffectsDuration = 200

    val SlowEffects = CubicBezierEasing(0.34f, 0.88f, 0.34f, 1.00f)
    const val SlowEffectsDuration = 300
    
    val StandardFastSpatial = CubicBezierEasing(0.27f, 1.06f, 0.18f, 1.00f)
    val StandardDefaultSpatial = CubicBezierEasing(0.27f, 1.06f, 0.18f, 1.00f)
    val StandardSlowSpatial = CubicBezierEasing(0.27f, 1.06f, 0.18f, 1.00f)
    
    val StandardFastEffects = CubicBezierEasing(0.31f, 0.94f, 0.34f, 1.00f)
    val StandardDefaultEffects = CubicBezierEasing(0.34f, 0.80f, 0.34f, 1.00f)
    val StandardSlowEffects = CubicBezierEasing(0.34f, 0.88f, 0.34f, 1.00f)
}
