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

// --- Version ---------------------------------------------------------------------------------
//
// Every version this module reports comes from `version.properties` at the repository root, and a
// compile bumps it. See RELEASING.md § Versioning for the scheme and who bumps what.

/** The repository root. This build's root is `apps/storefront-cmp`, so the repo is two up. */
val repoRoot: File = rootDir.parentFile.parentFile
val versionFile: File = File(repoRoot, "version.properties")
val versionTool: File = File(repoRoot, "tools/version.mjs")

/**
 * Whether this invocation should bump the version.
 *
 * The requirement is that a compile always bumps — so the test is on the *requested tasks*, not on
 * anything the build discovers later. An IDE sync requests no tasks and `./gradlew tasks` or
 * `clean` request nothing that compiles, so neither moves the number; `assembleDebug`,
 * `wasmJsBrowserDistribution`, `:azp:test` and `packageReleaseDistributionForCurrentOS` all do.
 *
 * `AZPHALT_VERSION_FROZEN=1` is what CI sets. A CI run invokes Gradle several times — the wasm
 * bundle, the APK, the verifier tests — and if each bumped, one commit would produce a store and an
 * app claiming different versions. So CI bumps exactly once, up front, then freezes: every artifact
 * from that run carries the same number, and that number is what gets committed and released.
 */
val shouldBumpVersion: Boolean = run {
    if (System.getenv("AZPHALT_VERSION_FROZEN") == "1") return@run false
    if (gradle.startParameter.isDryRun) return@run false
    val compiles = listOf("assemble", "build", "compile", "test", "check", "package", "distribution", "install", "bundle", "jar", "apk")
    gradle.startParameter.taskNames.any { requested -> compiles.any { requested.contains(it, ignoreCase = true) } }
}

// Bumped at configuration time, on purpose: the numbers are read a few lines below, so the artifact
// this build produces carries the version this build bumped to — rather than the previous one, with
// the new value only landing on the *next* build.
//
// The increment itself is delegated to `tools/version.mjs` instead of being reimplemented here.
// That file is the only writer of version.properties, so its format cannot drift between a Node
// caller and a Gradle one. If node is unavailable this warns and builds at the current version:
// making the app unbuildable without a Node install would be a worse failure than a version that
// did not move.
if (shouldBumpVersion && versionTool.isFile) {
    try {
        val process = ProcessBuilder("node", versionTool.absolutePath, "bump")
            .directory(repoRoot)
            .redirectErrorStream(true)
            .start()
        val output = process.inputStream.bufferedReader().readText().trim()
        if (process.waitFor() == 0) logger.lifecycle("version → $output")
        else logger.warn("WARNING: version bump failed, building at the committed version: $output")
    } catch (error: Exception) {
        logger.warn("WARNING: could not run 'node ${versionTool.name}', building at the committed version: ${error.message}")
    }
}

// Parsed by hand rather than with `java.util.Properties`, which cannot be named here: `java`
// resolves to Gradle's own project extension, so `java.util.Properties()` does not compile in a
// build script. This is the same `key=value` / `#`-comment shape `tools/version.mjs` writes.
val versionParts: List<Int> = run {
    require(versionFile.isFile) { "$versionFile is missing — it is the source of every version in this build" }
    val values = versionFile.readLines()
        .map { it.trim() }
        .filter { it.isNotEmpty() && !it.startsWith("#") && it.contains("=") }
        .associate { it.substringBefore("=").trim() to it.substringAfter("=").trim() }
    listOf("major", "minor", "patch", "build").map { key ->
        values[key]?.toIntOrNull() ?: error("$versionFile: '$key' is missing or not a whole number")
    }
}

/** `a.b.c.d` — what the app, the store and the installers all report. */
val azphaltVersion: String = versionParts.joinToString(".")

/**
 * Android's `versionCode`, which is `d`.
 *
 * `d` is used rather than an encoding of all four numbers because Play requires versionCode to
 * increase monotonically forever and accepts a given value exactly once. `d` never resets and never
 * decreases by construction, which is precisely that contract; anything derived from a.b.c can go
 * backwards the moment a component resets.
 */
val azphaltVersionCode: Int = versionParts[3]

// Applied here rather than in `plugins {}` because that block cannot be conditional. The plugin reads
// `google-services.json` and generates the string resources Firebase initialises itself from at
// startup; with no file it fails the build rather than degrading, hence the gate.
if (firebaseConfigured) {
    apply(plugin = "com.google.gms.google-services")
} else {
    logger.lifecycle("google-services.json not found — building without Firebase.")
}

group = "com.azphalt.storefront"
version = azphaltVersion

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
                // Bundles src/commonMain/composeResources — the Jost typeface the Capsule system specifies.
                implementation(compose.components.resources)
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
        // The one test source set for the shared module. `desktopTest` rather than `commonTest`
        // because a common test source set would demand a runner for every target — including wasm,
        // which needs a browser — and the code under test is pure Kotlin with no platform surface. One
        // JVM run covers it, and `./gradlew desktopTest` is a plain unit-test task.
        val desktopTest by getting {
            dependencies {
                implementation(kotlin("test"))
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
        versionCode = azphaltVersionCode
        versionName = azphaltVersion
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
            // Three components, because that is all jpackage accepts — `d` is not representable in
            // an installer version, so the installer is identified by a.b.c and the app it installs
            // reports the full a.b.c.d.
            packageVersion = "${versionParts[0]}.${versionParts[1]}.${versionParts[2]}"
            macOS {
                // The one platform that rejects a zero major: jpackage requires the first component
                // of a .dmg version to be greater than zero. Floored here rather than everywhere, so
                // the msi and the deb still carry the true major.
                packageVersion = "${maxOf(versionParts[0], 1)}.${versionParts[1]}.${versionParts[2]}"
            }
        }
    }
}
