# State reporting

How a host application tells a store app what it has done with the extensions it acquired, and how a
repository learns aggregate install numbers without learning anything about a device.

Related: [`store-app.md`](store-app.md) (delegated acquisition), [`repository-api.md`](repository-api.md)
§ 8 (the wire endpoint).

## Why this exists

A store that cannot tell "you have this" from "you could have this" is a catalogue, not a store. The
button on a card should read *Get*, *Open*, *Enable* or *Update* — and only the host knows which,
because only the host knows what it did with the bytes it was handed. Acquisition and installation are
separate events in this architecture (`store-app.md` § The result hands over bytes; the host verifies
and installs them itself), so "downloaded but not installed" is a real state that nothing currently
records.

There is a second consumer. A developer choosing whether to publish here wants to know how many
installs a package has, and the download tally is a poor proxy: it counts transfers, including the ones
that were verified and then discarded.

These two needs pull in opposite directions on privacy, so they are served by **two separate channels**
with different rules:

| | On-device channel (§ 3) | Aggregate channel (§ 4) |
| --- | --- | --- |
| Who learns what | The store app learns one host's extension states | The repository learns counts per package |
| Granularity | Per extension, per host | Totals only |
| Leaves the device | Never | Counts only, never an inventory |
| Identity | None — the host is the caller | None — no device, user or install id exists in the protocol |

The division is the point. Per-item state is what makes the UI correct, and it never needs to leave the
device to do that. Counts are what a developer needs, and they never need to name a device to be
useful.

## 1. States

A host reports exactly **one** state per package id. States are lowercase strings; a consumer MUST
ignore an unrecognised state rather than reject the whole report, so this vocabulary can grow.

| State | Meaning |
| --- | --- |
| `downloaded` | The host holds verified bytes and has **not** installed them. The user acquired it and the install has not happened yet, or is waiting on something. |
| `installed` | Installed and present, but not enabled — the user turned it off, or the host has not activated it. |
| `active` | Installed and enabled. The extension is available to the user right now. |
| `failed` | Acquisition or installation did not complete. Carries an optional `reason`. |
| `removed` | The host had it installed and no longer does. Distinct from *never had it*: it means the user can be offered a reinstall rather than a first purchase. |

`downloaded` and `failed` are the two states that exist only because of delegated acquisition: a host
that installs directly from a repository never sees bytes it has not committed to. They are also the
two most useful to surface, because each represents a user who wanted something and did not get it.

**Update availability is not a state.** Whether a newer version exists is the repository's knowledge,
not the host's — a store app derives *Update* by comparing a reported `version` against the catalogue
(or `repository-api.md` § 6). Making it a state would put a fact in the host's mouth that the host has
no way to know while offline.

### Entry shape

An entry is a JSON object. The same shape is used on both channels:

```json
{
  "id": "com.hereliesaz.azphalt.halftone",
  "version": "1.2.0",
  "state": "active",
  "at": "2026-07-30T02:14:00Z",
  "reason": null
}
```

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | **yes** | Package id, exactly as in the manifest. |
| `version` | string | **yes** | The version the host holds. For `removed`, the last version it held. |
| `state` | string | **yes** | One of § 1. |
| `at` | string | no | ISO-8601 instant the state was entered. |
| `reason` | string | no | Free text, `failed` only — e.g. `integrity-mismatch`, `publisher-change`, `incompatible`. |

A consumer MUST tolerate unknown fields.

## 2. What MUST NOT be reported

These are normative, and they apply to both channels:

- A report MUST NOT contain a device identifier, an advertising identifier, an installation id, a user
  id, an account, an email, or any value whose purpose is to link two reports to the same device.
- A report MUST NOT contain the names of other applications on the device. A host reports **its own**
  extension states and nothing else.
- A report MUST NOT contain anything the user made — no file names, no paths, no project contents, no
  content of any kind that an extension was used on.
- The aggregate channel MUST NOT carry an inventory. One request describes state transitions for
  packages, not "here is everything I have".
- A store app MUST NOT enumerate installed applications to discover hosts. It learns about a host when
  that host calls it (§ 3) and at no other time. On Android this is also why no `QUERY_ALL_PACKAGES`
  permission appears anywhere in this specification: a store app that could list the user's apps would
  be a worse thing than the problem it solved.

A repository or store app that needs something this section forbids is asking for a different feature
and should say so plainly rather than smuggling it through this one.

## 3. The on-device channel

Two transports, for two situations. Both are host → store app; the store app never pushes.

### 3.1 With a browse request (the common case)

The host adds its inventory to the `store.azphalt.action.BROWSE` request (`store-app.md` § The request):

| Extra | Type | Meaning |
| --- | --- | --- |
| `azphalt.extra.INVENTORY` | `String` | A JSON document `{"entries":[…]}` of § 1 entries. |
| `azphalt.extra.STATE_AUTHORITY` | `String` | Optional. The authority of the host's state provider (§ 3.2), so the store can re-read state later. |

A **JSON string** rather than a `Parcelable` because the extra crosses an application boundary: a
custom `Parcelable` needs a class both sides have, which would make the contract a shared library
instead of a document. JSON needs nothing shared.

An `Intent` is delivered over Binder, whose transaction buffer is a shared, small, fixed budget — a
large inventory in an extra fails as `TransactionTooLargeException`, and it fails in the *caller*. A
host MUST therefore keep the document under **256 KiB**, and SHOULD send at most 500 entries. A host
with more than that SHOULD send the entries relevant to this browse request (those matching the
declared `kinds` / `mediaDomains`) and expose the rest through § 3.2.

A store app MUST treat the inventory as a **hint for presentation only**. It is unauthenticated input
from another application, and it MUST NOT influence pricing, entitlement, or whether a package may be
acquired — a host that claims `active` on a paid package it never bought has claimed nothing of value.

### 3.2 Over a host-exposed provider (the standalone case)

When the user opens the store app on its own rather than through a host, there is no browse request and
therefore no inventory. A host MAY expose its states through a `ContentProvider` so the store app can
read them anyway.

- **Authority**: `<host-package>.azphalt.state`, declared to the store in
  `azphalt.extra.STATE_AUTHORITY` on a browse request. The store app MAY persist the authority for
  hosts that have called it, and MUST NOT query one it was not given.
- **Path**: `content://<authority>/extensions` — one row per package id.
- **Columns**: `id`, `version`, `state`, `at`, `reason` (§ 1). `TEXT` in all cases; `at` is the ISO-8601
  string, not a numeric timestamp, so the column matches the wire format exactly.
- **Permission**: the host MUST protect the provider with `android:readPermission`. The store app holds
  `azphalt.permission.READ_EXTENSION_STATE` (protection level `normal`). A host MAY use a
  `signature`-level permission instead when it ships its own store app.
- The provider MUST be read-only. A store app has no business writing a host's state.

A host that implements neither transport is still conforming. It gets a store that shows *Get* on
everything, which is the behaviour before this document existed.

## 4. The aggregate channel

The wire format is normative in [`repository-api.md`](repository-api.md) § 8. This section is the
reasoning.

### 4.1 Why counts alone are not enough

An endpoint that accepts "one install of package X happened" and increments a counter is trivially
abusable: anyone with `curl` can run a package's install count to a million, and a store whose entire
argument is verifiable integrity — signed packages, pinned publisher keys, committed digests — cannot
then present a fabricated number as a fact about a package.

Rate limiting does not fix it. It raises the cost of inflation without changing the kind of thing the
number is, and the number is what a developer makes a decision on.

### 4.2 Report tokens

So an install report must be tied to something the repository itself witnessed: the download.

1. A full `200` download response carries an `azphalt-report-token` header — an opaque, single-use,
   random string. It identifies **that transfer** and nothing else. It is not derived from the client,
   the request, the address, or the time, and two downloads of the same version by the same client
   produce unrelated tokens.
2. An `installed` report presents that token. The repository accepts it **once** and then discards it,
   so an install can be reported at most once per download it actually served.
3. Accepting an `installed` report returns a **receipt** — again opaque and single-use — which is what
   an `uninstalled` report presents. Uninstalls are therefore bounded by installs, and nobody can drive
   a competitor's number down without first having driven it up.

**Who holds the token.** Under delegated acquisition the store app performs the download and the host
performs the install, so the token is minted to one party and spent by another. The store app therefore
passes it to the host in `azphalt.extra.REPORT_TOKEN` (`store-app.md` § The result) and does **not**
report the install itself: it cannot know whether the host installed the bytes, verified them and
declined, or crashed. A host that reports nothing simply leaves the token unspent, and the count stays
honest — an unreported install is a smaller error than a reported one that never happened.

A store app that downloads for its own sake (a standalone browse with no host) holds the token and MAY
report its own install.

`activated` / `deactivated` reports are accepted without a token, because they are unbounded by nature
(a user may toggle an extension any number of times) and are stored as a coarse ratio rather than a
count. A repository MAY ignore them entirely.

The tokens carry no identity and are not linkable: the repository stores an unredeemed token as a bare
string with no record of who received it. A token is a bearer capability to increment one counter once.

### 4.3 What the numbers mean, and what they do not

This design yields **installs** and **uninstalls**, and therefore net installs. It does **not** yield
"active installs" in the sense an app store means it — a live gauge of how many devices have the thing
right now. A gauge requires each device to re-report periodically and requires the server to recognise
a repeat report from the same device, which requires exactly the identifier § 2 forbids.

A repository MUST NOT present net installs as active installs. Naming the number honestly costs
nothing; a store that inflates its own metrics has the same problem as a publisher who does.

### 4.4 Optional, everywhere

The endpoint is **optional** for a conforming repository, like § 7 (`/entitlements/play`): a repository
that does not want install statistics answers `501`, and a client MUST treat that as final and stop
reporting rather than retrying. A store app or host that reports nothing at all is fully conforming —
this channel is a courtesy to publishers, not a condition of using the network.

## 5. Ordering and idempotency

- Reports are **transitions**, not snapshots. A host reports when a state changes, and does not
  re-report unchanged state on a timer — there is no identity, so a re-report is indistinguishable from
  a new install and would corrupt the count.
- Reports MAY arrive out of order and MAY be lost. A repository MUST NOT infer anything from an
  `uninstalled` receipt it does not recognise beyond "ignore this".
- A host that is offline SHOULD queue transitions and send them later, and MUST drop a queued
  transition rather than resend one whose token it has already spent.
- The on-device channel is the opposite: it carries a **snapshot**, because it is read live by a UI and
  a stale snapshot is a wrong button label.

## 6. Open questions

- **Update push.** With `azphalt.extra.STATE_AUTHORITY`, a store app now knows a host's library and
  could notify it of updates instead of waiting to be asked. That is the first of `store-app.md`'s open
  questions, and this document supplies the missing half without answering it.
- **Shared library.** Several hosts holding their own copy of the same extension is still the case. The
  states here are per host by design; a shared library would need a state per (host, package) pair,
  which is what this shape already is.
