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
    jvm("desktop")
    
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
        val commonMain by getting {
            dependencies {
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.ui)
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.1")
            }
        }
        val wasmJsMain by getting
        val desktopMain by getting {
            dependencies {
                implementation(compose.desktop.currentOs)
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.1")
            }
        }
    }
}

compose.desktop {
    application {
        mainClass = "MainKt"
        nativeDistributions {
            targetFormats(org.jetbrains.compose.desktop.application.dsl.TargetFormat.Dmg, org.jetbrains.compose.desktop.application.dsl.TargetFormat.Msi, org.jetbrains.compose.desktop.application.dsl.TargetFormat.Deb)
            packageName = "AzphaltStorefront"
            packageVersion = "1.0.0"
        }
    }
}
