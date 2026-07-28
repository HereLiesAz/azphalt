plugins {
    kotlin("multiplatform") version "2.4.0"
    kotlin("plugin.serialization") version "2.4.0"
    // Kotlin 2.0+ split the Compose compiler into its own plugin, versioned with Kotlin.
    id("org.jetbrains.kotlin.plugin.compose") version "2.4.0"
    id("org.jetbrains.compose") version "1.12.0-beta02"
    id("com.android.application") version "9.3.1"
    // Applied conditionally below — it hard-fails when google-services.json is absent, and that file
    // is a secret this repository does not carry. See `firebaseConfigured`.
    id("com.google.gms.google-services") version "4.5.0" apply false
}

/**
 * Whether this build has Firebase configuration available.
 *
 * `google-services.json` is written from the `GOOGLE_SERVICES` secret in CI and is deliberately not
 * committed — it identifies the Firebase project. The plugin aborts the build outright when the file
 * is missing, which would mean nobody could build the Android app without that secret: not a fork,
 * not a contributor, not a local checkout. Gating on the file's presence keeps the app buildable
 * everywhere and simply leaves Firebase out where it cannot be configured.
 */
val firebaseConfigured = file("google-services.json").exists()

// Applied here rather than in `plugins {}` because that block cannot be conditional. The plugin reads
// `google-services.json` and generates the string resources Firebase initialises itself from at
// startup; with no file it fails the build rather than degrading, hence the gate.
if (firebaseConfigured) {
    apply(plugin = "com.google.gms.google-services")
} else {
    logger.lifecycle("google-services.json not found — building without Firebase.")
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

                // Firebase, only when it can actually be configured. The BoM pins one compatible set
                // of versions, so the individual artifacts below carry none of their own.
                //
                // Shipping firebase-analytics without google-services.json would be worse than
                // omitting it: the SDK would be in the APK, fail to initialise at runtime for want of
                // a project id, and log errors on every launch while collecting nothing.
                if (firebaseConfigured) {
                    // `project.dependencies.platform(...)`, not a bare `platform(...)`: a multiplatform
                    // source set's dependency block is a KotlinDependencyHandler, which has no
                    // platform() of its own, so the BOM has to be built through the project's handler.
                    implementation(project.dependencies.platform("com.google.firebase:firebase-bom:34.16.0"))
                    implementation("com.google.firebase:firebase-analytics")
                }
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
