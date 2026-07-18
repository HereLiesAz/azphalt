plugins {
    kotlin("multiplatform") version "1.9.24"
    kotlin("plugin.serialization") version "1.9.24"
    id("org.jetbrains.compose") version "1.6.11"
}

group = "com.azphalt.storefront"
version = "0.1.1"

kotlin {
    js(IR) {
        moduleName = "storefront-cmp"
        browser {
            commonWebpackConfig {
                cssSupport {
                    enabled.set(true)
                }
            }
            distribution {
                // Next.js static asset folder
                outputDirectory.set(file("../storefront/public"))
            }
        }
        binaries.executable()
    }

    sourceSets {
        val jsMain by getting {
            dependencies {
                implementation(compose.ui)
                implementation(compose.material3)
                implementation(compose.runtime)
                
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.1")
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
                
                // (No NPM dependencies needed; models are pure Kotlin serialization)
            }
        }
    }
}
