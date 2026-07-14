# Governance

*azphalt is shared infrastructure or it is nothing. This is what "neutral" commits to, how decisions get made, and the honest state of a standard that currently has one maintainer.*

## The commitment

- **No host is privileged.** The API is identical for every adopter. There is no back channel that gives GraffitiXR, Guillotine — or anyone — engine access the spec denies to others. The never-list protects every host equally; that symmetry *is* the neutrality.
- **The standard and registry stay open and self-hostable, permanently.** Anyone can implement azphalt, run their own registry, and never touch a hosted service. This is a guarantee, not a phase — adoption is a control decision, and no serious app builds on infrastructure a rival can meter or revoke.
- **The fee lives only in the optional storefront.** The registry is free and rail-free. Money exists in the consignment marketplace and nowhere else, and adopting the standard never requires going through it. If that line ever blurs, the standard has stopped being neutral.

## How decisions are made

- **The spec is versioned and moves in the open.** Changes land as issues/RFCs against this repo. The `Open` questions marked throughout `/spec` are the live agenda — each resolves through a proposal, not a quiet commit.
- **Breaking changes bump the format version** (`azphalt` / `compat`). Additive changes (new control types, new capabilities) extend without breaking existing packages.
- **Anyone can propose; the maintainer currently decides.** No pretense otherwise — see below.

## The honest part

This is a solo project. The person who seeds a standard and benefits from it deciding its direction is a real tension, and it caps adoption: a competitor won't bet its ecosystem on a rival's judgment. Pretending a governance board exists wouldn't fix that; stating it plainly at least lets adopters weigh it.

The path out is earned, not declared: **if azphalt gains real cross-app traction, it moves to a neutral foundation** — the Open VSX/Eclipse model, where the registry and spec sit under an entity no single vendor controls. Until there's traction to steward, that structure would be theater. The trigger is concrete: a second independent host adopting in earnest is the signal to start that transfer, not to keep control.

Openness drives adoption; the hosted marketplace monetizes the audience openness creates. That sequence only holds if the standard stays genuinely free to leave. Keeping it so is the one governance rule everything else serves.
