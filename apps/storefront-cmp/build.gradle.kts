plugins {
    kotlin("multiplatform") version "2.4.0"
    kotlin("plugin.serialization") version "2.4.0"
    // Kotlin 2.0+ split the Compose compiler into its own plugin, versioned with Kotlin.
    id("org.jetbrains.kotlin.plugin.compose") version "2.4.0"
    id("org.jetbrains.compose") version "1.12.0-beta02"
    id("com.android.application") version "9.3.1"
}

group = "com.azphalt.storefront"
version = "0.1.1"

kotlin {
    jvm("desktop")

    androidTarget {
        compilerOptions { jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17) }
    }

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
        val androidMain by getting {
            dependencies {
                implementation("androidx.activity:activity-compose:1.9.3")
                implementation("androidx.core:core-ktx:1.13.1")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
                // The verifier. The store app checks a package before handing it over, and
                // spec/store-app.md requires the host to check it again — this is the same code both
                // sides run, so "verified" means the same thing on each.
                implementation(project(":azp"))
                // Play Billing: a Play-distributed app selling digital goods cannot send the user to a
                // web checkout for them (spec/store-app.md § Paid packages).
                implementation("com.android.billingclient:billing-ktx:7.1.1")
            }
        }
    }
}

android {
    namespace = "store.azphalt.storefront"
    compileSdk = 37

    defaultConfig {
        applicationId = "store.azphalt.storefront"
        // 26, not 33: Ed25519 comes from Bouncy Castle rather than the platform (which only gained it
        // at 33), so the verifier does not dictate the floor. 26 is where adaptive icons land, which
        // avoids shipping a rasterised legacy icon per density for the sake of pre-Oreo devices.
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }

    sourceSets["main"].apply {
        manifest.srcFile("src/androidMain/AndroidManifest.xml")
        res.srcDirs("src/androidMain/res")
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildTypes {
        release {
            // Left unminified for now: R8 needs keep rules for the kotlinx-serialization models and
            // Bouncy Castle's provider lookup, and shipping a store app whose verifier was stripped by
            // an over-eager shrinker is precisely the failure this project cannot afford.
            isMinifyEnabled = false
        }
    }

    packaging {
        resources.excludes += setOf(
            "META-INF/versions/9/OSGI-INF/MANIFEST.MF",
            "META-INF/{AL2.0,LGPL2.1}",
        )
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
