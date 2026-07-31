/*
 * The Android half of `spec/web-handoff.md`.
 *
 * Android is the one platform that can answer the question honestly. The web actual has to *infer*
 * whether a host took the link by watching the page; here `resolveActivity` says so outright, before
 * anything is launched. So this actual never shows the fallback to somebody who has a host, and never
 * launches into nothing.
 */
package network

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri

/**
 * The application context, set once at startup.
 *
 * A global rather than a parameter because the caller is common Compose code shared with the web and
 * desktop storefronts, and threading an Android `Context` through it would push a platform type into
 * the one place that must not have one. Application context specifically — never an Activity — so
 * this cannot outlive and leak a screen.
 */
internal object AndroidAppContext {
    @Volatile
    private var context: Context? = null

    fun install(context: Context) {
        this.context = context.applicationContext
    }

    fun get(): Context? = context
}

actual suspend fun attemptHandoff(link: String): Boolean {
    val context = AndroidAppContext.get() ?: return false
    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(link)).apply {
        // The caller is the application context, not an Activity, so the launch needs its own task.
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    }

    // Ask before launching. `resolveActivity` returning null is exactly the "no host installed" case,
    // and answering it here means the fallback appears instead of an ActivityNotFoundException.
    //
    // Note this app itself claims `azphalt://browse`, not `azphalt://install` — the store is not a
    // host and must not answer an install link. If that ever changes, this resolves to this app and
    // the handoff quietly stops reaching real hosts, so the manifest filter is load-bearing here.
    if (intent.resolveActivity(context.packageManager) == null) return false

    return try {
        context.startActivity(intent)
        true
    } catch (_: ActivityNotFoundException) {
        // Lost between the resolve and the launch (uninstalled mid-flight). Still just "no host".
        false
    } catch (_: SecurityException) {
        false
    }
}

actual fun downloadUrl(id: String, version: String): String =
    "$DEFAULT_REPOSITORY/packages/$id/versions/$version/download"

actual fun openExternal(url: String) {
    val context = AndroidAppContext.get() ?: return
    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    }
    try {
        context.startActivity(intent)
    } catch (_: ActivityNotFoundException) {
        // A device with no browser at all. Nothing useful to do, and nothing worth crashing over.
    }
}
