---
"@azphalt/web-handoff": minor
---

**web-handoff**: the storefront's own inventory of what it handed to a host.

`@azphalt/web-handoff@0.2.0` shipped the link half — build `azphalt://install`, attempt it, detect
that nothing claimed it, offer the hosts worth installing. This adds the half that remembers:
`loadInventory`, `saveInventory`, `recordInstalled`, `forgetInstall`, `isHeld`, and the
`InventoryEntry` / `InventoryState` types.

It exists because the link is one-way. A page fires `azphalt://install` and learns nothing back, so
without its own record a storefront offers every package as though it were new — including the one
the user installed a minute ago — and has no way to answer "what do I already have".

**The record is a guess and the API is shaped so callers cannot forget that.** `recordInstalled`
writes `installed` on a successful handoff, which means *a host claimed the link* — the last thing a
web page can observe — not that an install happened. Two things keep that honest rather than merely
convenient: a real host report supersedes it wherever the two disagree (the on-device channel of
`spec/state-reporting.md` § 3, which the Android store app receives), and `forgetInstall` lets the
user say the store was wrong, which matters because on a web visit nothing else ever will. A guess
with no correction is a wrong answer that persists.

`forgetInstall` deletes the entry rather than marking it `removed`: `removed` is a *host's* statement
that a package was uninstalled, and the store admitting it never knew is a different claim.

Storage is per-origin and never throws — a browser with site data blocked, or a full quota, costs the
caller nicer labels and nothing else.
