---
"@azphalt/azdk": minor
"@azphalt/azp": minor
"@azphalt/registry": minor
---

Surfaces: a new `surface` asset type (front/side/top profile curves only, `spec/package-format.md` § Surface format) listed as a pack of surfaces. `@azphalt/azp` adds the strict `parseSurface` validator and runs it in `verifyAzp`; `PreviewRef.surfaces` carries front-outline thumbnails.
