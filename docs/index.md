---
layout: home
hero:
  name: "azphalt"
  text: "The open standard for portable extensions."
  tagline: One host-agnostic package format for brushes, LUTs, shaders, models, video, audio, and code — plus a neutral marketplace at azphalt.store that any app can consume and any creator can publish to.
  actions:
    - theme: brand
      text: Use the Store in Your App
      link: /hosts/getting-started
    - theme: alt
      text: Build & Publish an Extension
      link: /creators/getting-started
    - theme: alt
      text: Browse azphalt.store ↗
      link: https://azphalt.store
features:
  - title: Consume the marketplace
    details: "azphalt.store implements the normative Repository API, so your app browses, searches, and downloads .azp packages with one small client — no store-specific code. Free packages are open; paid ones unlock with a signed, offline-verifiable entitlement token."
    link: /hosts/getting-started
    linkText: Consume a repository
  - title: Build once, run everywhere
    details: "Bundle a sandboxed code extension (JS/WASM) or an asset pack (brushes, LUTs, shaders, meshes, video, audio, fonts) into a single .azp. Capability-gated by construction — an extension reaches exactly what it declares and nothing else."
    link: /creators/getting-started
    linkText: Get started
  - title: Publish — free or paid
    details: "Ship to the open registry lane for reach without a fee, or consign onto the paid lane and keep your split via Stripe Connect. The fee lives only on listings; it never leaks into the open registry."
    link: /creators/getting-started
    linkText: Publish & sell
  - title: Neutral & self-hostable
    details: "The standard is open and the Repository API is self-hostable — azphalt.store is one repository, not a gatekeeper. Run your own catalog with @azphalt/repository-server and the same client works against it."
    link: /specs/repository-api
    linkText: Read the spec
---
