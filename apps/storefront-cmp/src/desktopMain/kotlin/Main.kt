import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import main.StorefrontApp

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "Azphalt Storefront",
    ) {
        StorefrontApp()
    }
}
