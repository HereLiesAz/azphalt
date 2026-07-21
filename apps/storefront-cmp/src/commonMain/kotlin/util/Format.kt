package util

import kotlin.math.roundToInt

/**
 * Group an integer with thousands separators, e.g. `8900` → `8,900`. Hand-rolled rather than
 * `java.text.NumberFormat`, which isn't available on Kotlin/Wasm (commonMain).
 */
fun formatCount(n: Int): String {
    val neg = n < 0
    val digits = kotlin.math.abs(n.toLong()).toString()
    val sb = StringBuilder()
    for (i in digits.indices) {
        if (i > 0 && (digits.length - i) % 3 == 0) sb.append(',')
        sb.append(digits[i])
    }
    return if (neg) "-$sb" else sb.toString()
}

/**
 * Render a rating as `★ 4.7 (88)` — the average to one decimal plus the count. Returns `null` when
 * the package has no ratings, so callers can omit the badge. Wasm-safe (no `String.format`).
 */
fun formatRating(rating: Float?, count: Int): String? {
    if (rating == null || count <= 0) return null
    val tenths = (rating * 10f).roundToInt().coerceIn(0, 50)
    return "★ ${tenths / 10}.${tenths % 10} (${formatCount(count)})"
}
