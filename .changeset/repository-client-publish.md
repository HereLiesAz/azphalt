---
"@azphalt/repository-client": minor
---

`publish(azp)` — `POST /packages` (`repository-api.md` § 9). Resolves to the pending review (`202`) or the live package (`201`); a refusal throws `PublishError` carrying the status, the envelope's `code` and any per-problem `details`.
