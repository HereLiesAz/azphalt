package store.azphalt.storefront

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import main.StorefrontApp
import network.AndroidAppContext

/**
 * The store as a person opens it — the same Compose UI the desktop and web storefronts run, with no
 * calling app and nothing to hand back.
 *
 * Acquisition on behalf of another app is [BrowseForResultActivity]; keeping the two apart means the
 * browsing surface never has to reason about whether it owes somebody a result.
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Before `setContent`: the shared UI can fire a web handoff on its first frame, and an
        // uninstalled context would make that a silent no-op (network/AndroidHandoff.kt).
        AndroidAppContext.install(this)
        enableEdgeToEdge()
        setContent { StorefrontApp() }
    }
}
