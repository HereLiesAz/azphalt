# Node Creature Rig Pipeline

Download this workflow into The Aive from the Azphalt Store.

## Launch input

Before running, enter the batch in **Run objective / inputs**:

```text
workflow: My New Workflow
roles: Quality Guardian; Test Explorer; Deployment Pilot
```

Choose 1-10 source roles. If a role has multiple supplied variants, use its exact variant name from the source catalog.

## Exact pipeline

For each selected role, in order:

1. Resolve the role to one canonical character from the supplied Aive Node Creature sheets.
2. Load only that character's exact crop and its approved role-specific prompt.
3. Give image generation only that crop plus the accepted rig-sheet rules.
4. Generate one transparent flat 2D puppet-rig sprite sheet for that one character.
5. Inspect the source crop and proposed rig sheet together.
6. If inspection fails, correct that same rig sheet in a bounded retry loop.
7. Do not advance to the next slot until the current character passes.
8. After all assigned slots pass, audit the batch and create one final overview sheet showing all selected Node Creatures with their role names.

A batch of ten means ten separate generation jobs. It never means one ten-character rig image.

## Hard constraints

- Never invent a stand-in.
- Never substitute a similar creature.
- Never feed a full character sheet or neighboring characters to image generation.
- Never combine multiple creatures into one rig generation.
- Preserve the source creature's unique body, proportions, faceting, palette, shading, and source-relative scale.
- Eye sockets that belong to the body are valid.
- Detached appendage ends may overlap for rotation but must not have sockets, holes, hollow tube ends, collars, plugs, pegs, or visible connector hardware.
- Eye whites contain no baked-in pupils; pupils are separate; upper/lower eyelids are separate when required.
- No cast shadow, floor, scenery, labels, text, borders, alternate views, or assembled-character example on a rig sheet.
- Use actual alpha transparency and generous spacing for rectangular slicing.
- The final workflow overview is the only combined multi-character output.

## Source library

The catalog is pinned to the exact Aive source-character library at commit `86d1c4a9534c144f4df71367c6cdad48236746a3`. The catalog includes 70 character variants and the exact approved prompt accompanying each character.

## Roles

**Node Creature Batch Controller** checks source provenance and batch validity before generation.

**Node Creature Rig QC Auditor** verifies that every assigned slot produced the required crop, prompt, rig sheet, and passing visual-QC evidence before the overview sheet is created.
