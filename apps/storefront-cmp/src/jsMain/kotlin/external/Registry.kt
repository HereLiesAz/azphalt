@file:JsModule("@azphalt/registry")
@file:JsNonModule

package external

@JsName("RegistryAPI")
external class RegistryAPI {
    fun fetchPackages(): dynamic
}
