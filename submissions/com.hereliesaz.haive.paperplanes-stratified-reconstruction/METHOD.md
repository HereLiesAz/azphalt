# PaperPlanes — Stratified Scene Reconstruction

This workflow extracts the reusable method behind [HereLiesAz/PaperPlanes](https://github.com/HereLiesAz/PaperPlanes) and replaces the fragile parts with an occlusion-aware, confidence-aware layered-scene pipeline.

## What PaperPlanes already got right

PaperPlanes treats a flat artwork as a spatial reconstruction problem rather than a filter. Its original pipeline established four useful ideas:

1. perspective correction before inference;
2. an optional semantic reconstruction to help a depth model interpret stylized art;
3. human correction when generated geometry drifts from the source;
4. export as ordered transparent planes rather than a single depth map.

The later `api.py` improves further by combining semantic segmentation with median object depth so objects are not blindly shredded by per-pixel depth bins.

## What this workflow changes

### 1. The generated photograph is evidence, not truth

The original sequential path estimates depth from a generated photorealistic proxy. That can make a stylized scene easier for a depth model, but it can also move objects, invent surfaces, or change perspective before geometry is ever measured.

This workflow always estimates depth on the source first. Structure-preserving generated proxies are optional secondary hypotheses. Disagreement is retained and reconciled instead of silently choosing the prettier hallucination.

### 2. Semantics and geometry are inferred independently, then fused

Semantic decomposition and depth inference run in parallel. Their outputs meet in a source-registered scene graph containing masks, depth evidence, confidence, and explicit front/behind relationships.

Current examples of suitable model families include SAM 3-class promptable concept segmentation and Depth Anything 3-class geometry. They are examples, not dependencies: use stronger successors when available.

### 3. Occlusion order replaces grayscale slicing

Equal-width depth bins are a convenient arithmetic fiction. Paper layers care about what is in front of what, whether a silhouette survives, and whether an object must remain intact.

Plane allocation therefore respects an occlusion graph and minimizes perceptual depth error under semantic constraints. The requested layer count is a target or bound unless the user explicitly fixes it.

### 4. Hidden surfaces are completed before separation

Moving foreground planes exposes pixels that do not exist in the original image. The workflow identifies only those future disocclusion regions and reconstructs their hidden color and depth. Visible source pixels are immutable.

This borrows the useful principle behind Layered Depth Images and current de-occlusion work: hidden geometry belongs in the scene representation before novel viewpoints or separated planes reveal the holes.

### 5. Alignment is not limited to five affine sliders

Affine correction remains a good first fallback, but proxy-to-source drift can be local. The workflow permits homography or dense correspondence when a single translate/scale/rotate transform cannot register the inferred geometry without distortion.

### 6. Layer count is optimized

Instead of hard-coding six planes or uniformly spacing thresholds, the workflow chooses the smallest useful set of planes that preserves important silhouettes, semantic objects, and occlusion relationships within the user's bounds.

### 7. QC tests the product, not the intermediate heatmap

A depth map can look convincing while producing terrible separated art. Draft planes are therefore tested by:

- zero-offset recomposition against the normalized source;
- small positive and negative parallax renders;
- explicit inspection for disocclusion holes, halos, inverted depth, duplicated content, missing thin structures, warped geometry, and redundant planes.

A repair pass consumes the QC ledger before final packaging.

## Deliverables

The final package should contain, as applicable:

- ordered transparent PNG planes;
- machine-readable layer/depth manifest;
- normalized source reference;
- masks, transforms, depth/confidence evidence, and plane assignments for later revision;
- composite proof and parallax proof;
- optional SVG/PDF cut contours, bleed/trap, registration marks, scale, bridges/tabs, and assembly notes for physical fabrication.

## Research lineage

Useful current references for implementations of the method include:

- Meta Segment Anything Model 3: https://ai.meta.com/research/sam3/
- Depth Anything 3, ICLR 2026: https://proceedings.iclr.cc/paper_files/paper/2026/hash/e4cd50120b6d7e8daff1749d6bbaa889-Abstract-Conference.html
- DeOcc-1-to-3, AAAI 2026: https://ojs.aaai.org/index.php/AAAI/article/view/37820
- Layered depth prediction / RGB-D inpainting background: https://www.sciencedirect.com/science/article/pii/S0167865518307062
- SLIDE soft layering and depth-aware inpainting: https://openaccess.thecvf.com/content/ICCV2021/papers/Jampani_SLIDE_Single_Image_3D_Photography_With_Soft_Layering_and_Depth-Aware_ICCV_2021_paper.pdf

The workflow is intentionally model-agnostic. The scene representation and gates should survive the annual ritual in which last year's state of the art is led quietly behind the shed.
