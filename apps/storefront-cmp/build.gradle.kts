plugins {
    kotlin("multiplatform") version "2.4.0"
    kotlin("plugin.serialization") version "2.4.0"
    // Kotlin 2.0+ split the Compose compiler into its own plugin, versioned with Kotlin.
    id("org.jetbrains.kotlin.plugin.compose") version "2.4.0"
    id("org.jetbrains.compose") version "1.11.0"
}

group = "com.azphalt.storefront"
version = "0.1.1"

kotlin {
    // Compose for Web now targets Kotlin/Wasm (WasmGC), not the legacy js(IR) canvas.
    wasmJs {
        outputModuleName = "storefront-cmp"
        browser {
            commonWebpackConfig {
                outputFileName = "storefront-cmp.js"
            }
            distribution {
                // Next.js static asset folder
                outputDirectory.set(file("../storefront/public"))
            }
        }
        binaries.executable()
    }

    sourceSets {
        val wasmJsMain by getting {
            dependencies {
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.ui)

                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.9.0")
                // compose.ui brings kotlinx-browser (document/window/fetch) and coroutines transitively.
            }
        }
    }
}
