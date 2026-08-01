/*
 * The desktop store's inventory record, in the user's home directory.
 *
 * Same reason as the web: a desktop storefront fires `azphalt://install` and learns nothing about
 * what happened next, so without keeping its own books it cannot tell the user what they already
 * have.
 */
package network

import java.io.File
import models.ExtensionStateEntry
import models.decodeLocalInventory
import models.encodeLocalInventory

private val file: File
    get() = File(File(System.getProperty("user.home"), ".azphalt"), "inventory.json")

actual fun loadStoredInventory(): Map<String, ExtensionStateEntry> = try {
    if (file.isFile) decodeLocalInventory(file.readText()) else emptyMap()
} catch (_: Throwable) {
    emptyMap()
}

actual fun saveStoredInventory(entries: Collection<ExtensionStateEntry>) {
    try {
        file.parentFile?.mkdirs()
        // Write-then-move: a crash mid-write leaves the previous inventory intact rather than a
        // truncated document the parser would throw away entirely.
        //
        // `Files.move` with REPLACE_EXISTING rather than `File.renameTo`. `renameTo` fails when the
        // destination exists on Windows, so from the second save onward it would have fallen back to
        // a truncating in-place write — precisely the non-atomic case this is here to avoid, on the
        // platform this repo is developed on. ATOMIC_MOVE is requested and retried without, because
        // it is not supported on every filesystem and a non-atomic move is still better than a
        // truncating write.
        val tmp = File(file.parentFile, "inventory.json.tmp")
        tmp.writeText(encodeLocalInventory(entries))
        val from = tmp.toPath()
        val to = file.toPath()
        try {
            java.nio.file.Files.move(
                from,
                to,
                java.nio.file.StandardCopyOption.REPLACE_EXISTING,
                java.nio.file.StandardCopyOption.ATOMIC_MOVE,
            )
        } catch (_: java.nio.file.AtomicMoveNotSupportedException) {
            java.nio.file.Files.move(from, to, java.nio.file.StandardCopyOption.REPLACE_EXISTING)
        }
    } catch (_: Throwable) {
        // A read-only or sandboxed home directory. Losing the record costs nicer labels, nothing more.
    }
}
