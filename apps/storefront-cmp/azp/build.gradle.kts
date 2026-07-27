// No versions here: the root project already puts the Kotlin plugins on the build classpath, and
// restating a version in a subproject makes Gradle refuse the request ("already on the classpath with
// an unknown version"). The version lives in ../build.gradle.kts.
plugins {
    kotlin("jvm")
    kotlin("plugin.serialization")
}

group = "store.azphalt"
version = "0.1.0"

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.1")

    // Ed25519. The JDK has had it natively since 15, but Android only from API 33 — Bouncy Castle is
    // pure Java and behaves identically on both, so the verifier does not change shape with the
    // platform it happens to be running on. Version matches the resolution pin in settings.gradle.kts.
    implementation("org.bouncycastle:bcprov-jdk18on:1.78.1")

    testImplementation(kotlin("test"))
}

kotlin {
    jvmToolchain(17)
}

tasks.test {
    useJUnitPlatform()
    // The cross-implementation signature vector is owned by @azphalt/azp; this reads the same file
    // rather than keeping a copy, so the two implementations cannot silently drift apart.
    systemProperty("azphalt.vector", rootProject.file("../../packages/azp/test/vectors/signature-vector.json").absolutePath)
    testLogging { showStandardStreams = true }
}
