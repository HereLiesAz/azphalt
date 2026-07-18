pluginManagement {
    repositories {
        google()
        gradlePluginPortal()
        mavenCentral()
        maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
    }
}

buildscript {
    configurations.classpath {
        resolutionStrategy.eachDependency {
            val g = requested.group
            val n = requested.name
            when {
                g == "io.netty" && !n.startsWith("netty-tcnative") -> {
                    useVersion("4.1.119.Final")
                    because("Dependabot: Security fixes for Netty")
                }
                g == "org.bouncycastle" && n.endsWith("-jdk18on") -> {
                    useVersion("1.78.1")
                    because("Dependabot: Security fixes for BouncyCastle")
                }
                g == "com.google.protobuf" && n.startsWith("protobuf-java") -> {
                    useVersion("3.25.5")
                    because("Dependabot: Security fixes for Protobuf")
                }
                g == "org.apache.commons" && n == "commons-lang3" -> {
                    useVersion("3.18.0")
                    because("Dependabot: Security fixes for Commons Lang")
                }
                g == "org.apache.httpcomponents" && n == "httpclient" -> {
                    useVersion("4.5.14")
                    because("Dependabot: Security fix for HttpClient")
                }
                g == "org.jdom" && n == "jdom2" -> {
                    useVersion("2.0.6.1")
                    because("Dependabot: Security fix for JDOM")
                }
                g == "org.bitbucket.b_c" && n == "jose4j" -> {
                    useVersion("0.9.6")
                    because("Dependabot: Security fix for jose4j")
                }
            }
        }
    }
}


dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
    }
}

rootProject.name = "storefront-cmp"
