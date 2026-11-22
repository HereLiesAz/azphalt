import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import main.StorefrontApp
import models.Platform
import models.platformInAppCheckout

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "Azphalt Storefront",
    ) {
        StorefrontApp(inAppCheckout = platformInAppCheckout(Platform.DESKTOP))
    }
}
