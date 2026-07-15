plugins {
    kotlin("multiplatform") version "1.9.24"
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
                
                // NPM dependencies from local workspace
                implementation(npm("@azphalt/azdk", "file:../../packages/sdk"))
                implementation(npm("@azphalt/registry", "file:../../packages/registry"))
            }
        }
    }
}
