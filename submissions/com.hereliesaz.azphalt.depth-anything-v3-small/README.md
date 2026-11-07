# Depth Anything V3 Small

A free monocular depth model (role `depth`, type `onnx`, **multi-file**) for any azphalt host that runs ONNX Runtime.
Header-pattern listing: **no weights are bundled or redistributed**. Each file in `files[]` points at a Hugging Face file
pinned to a commit and carries its own checksum.

> **Read this first.** The output of this model is **depth** (larger is **farther**). Depth Anything V2 and MiDaS
> output **inverse depth** (larger is **nearer**). A host that wires this model into a pipeline written for V2 or MiDaS
> without inverting will show the scene upside down in depth. The manifest says so in `outputs[0].decode`
> (`kind: relative-depth`, `higherIsNearer: false`).

## Model files

Both files must sit in the **same directory under these exact names**: the graph refers to its weights by the relative
location `model.onnx_data` (checked: 218 external initializers, all `location = model.onnx_data`), and ONNX Runtime
resolves it next to the graph.

| `files[].name` | Size | sha256 |
|---|---|---|
| `model.onnx` (graph, entry point) | 640,691 bytes | `396008798244a074297fd88e450433b1357fc687f534939375c804ded86e7b2a` |
| `model.onnx_data` (weights) | 104,702,464 bytes | `802bb24741e67f5bb2b369fc64d40afe11439cc895d676d658d65cfb75c9860f` |

Source: `onnx/` of [onnx-community/depth-anything-v3-small](https://huggingface.co/onnx-community/depth-anything-v3-small),
commit `0b6a7f3bf5595f9950b91389e0da3a0de130324c`. Total 105.3 MB. Only float32 is published there (no fp16/int8 variant).

| | |
|---|---|
| Format | ONNX, IR 8, **opset 18** (`ai.onnx` only), produced by PyTorch 2.9.1; float32 |
| Licence | Apache-2.0 (DA3-Small and DA3-Base only; the Large, Giant and Nested models are CC-BY-NC-4.0 and are NOT this model) |
| Upstream | Haotong Lin et al. (ByteDance Seed), [Depth Anything 3](https://arxiv.org/abs/2511.10647); converted by onnx-community |

## Input

| | |
|---|---|
| name | `pixel_values` |
| dtype / layout | float32, **5-D**: `[batch, views, 3, height, width]`, NCHW per view, RGB |
| normalisation | `(x/255 - mean) / std`, ImageNet mean `[0.485, 0.456, 0.406]`, std `[0.229, 0.224, 0.225]` (matches the upstream `InputProcessor`) |
| size | **multiples of 14**; height and width dynamic. Upstream default is the long side resized to 504 (e.g. 504x378) |

For a single image use `views = 1`: shape `[1, 1, 3, H, W]`. With `views > 1` the model treats the images as views of one
scene (multi-view depth and pose); that path was only checked for running and shape (2 views gave 2 depth maps), not for quality.

## Outputs

| name | shape | meaning |
|---|---|---|
| `predicted_depth` | `[batch, views, H, W]` | **relative depth, larger is farther.** Not metric; arbitrary per-image scale; observed 0.4 to 1.8 on photos |
| `confidence` | `[batch, views, H, W]` | depth confidence, at least 1 (upstream computes `exp(x)+1`), unbounded |
| `extrinsics` | `[batch, views, 3, 4]` | estimated camera pose; not validated here |
| `intrinsics` | `[batch, views, 3, 3]` | estimated pinhole intrinsics in pixels of the model input (observed focal about 0.94 x width, principal point at the image centre); not validated here |

`predicted_depth` and `confidence` have the same height and width as the input (for multiples of 14). Use only the first
output if depth is all you need; the other three still run.

## Depth or inverse depth: how this was determined

1. **Upstream source** (ByteDance-Seed/Depth-Anything-3, `model/dualdpt.py`, config `da3-small.yaml`): the main head is
   `DualDPT` with `activation: "exp"`, so the depth output is `exp(x)`, a positive depth. The upstream README states the
   models "directly predict depth", unlike disparity-based Depth Anything 2. The sky-to-max-depth post-processing in
   `da3.py` applies only to models that have a sky head; DA3-Small does not, and the ONNX graph has no such step.
2. **Synthetic perspective scene** (checkered floor receding to a horizon, sky above, box on the floor, known true depth z, ONNX
   Runtime): on floor pixels the output rises with distance, Spearman +0.990 against z and -0.989 against 1/z. Mean output:
   floor at the bottom of the frame (near) 0.40, floor just below the horizon (far) 1.62. Down a column from the horizon to the
   bottom of the frame the output falls monotonically (0.88, 0.68, 0.55, 0.46, 0.40).
3. **Against Depth Anything V2 on real photos** (same size, same images): Spearman between this output and V2's disparity
   is -0.94 (cats), -0.98 (city street), -0.95 (tiger), -0.51 (football match), -0.60 (bread): always negative, i.e. the
   opposite sign to V2, as expected for depth vs inverse depth.

Two caveats from the same synthetic scene: the output is **not linear in true depth** (an affine fit to z gives R squared
0.30, to 1/z 0.90, and Pearson with log z is 0.96, so it is closer to a compressive function of depth), and the **sky is
not pushed to the farthest value** (sky 1.20, below the far floor at 1.62). Do not treat it as a calibrated distance; treat
it as an ordering (nearer than / farther than) with a per-image arbitrary scale.

## Verified facts

Measured with ONNX Runtime 1.29.0 (CPU, 4 threads).

**Sizes.** Height and width are dynamic. Tested (width x height): 28x28, 100x100, 252x252, 266x350, 504x378, 504x504, 700x518,
1008x504 all ran. Batch 2 and views 2 ran. Output size equals `14*floor(H/14)` by `14*floor(W/14)` (500x333 in gives 490x322
out). **14x14 returns NaN** for every output; stay at 28 px or more, and in practice at about 252 px or more (a 100x100 input
gives a nearly flat map).

**Cost on CPU.**

| Input | time | peak memory |
|---|---|---|
| 252x252 | 101 ms | 248 MB |
| 504x378 | 286 ms | 390 MB |
| 504x504 | 482 ms | 458 MB |
| 1008x756 | 1869 ms | 773 MB |

(Peak is process peak resident memory including about 47 MB of interpreter baseline.) `requirements.minRamMB` is 512, the
measured peak at 504x504. The weights alone load at about 170 MB resident.

## Limitations

- **The host must be able to materialise a `files[]` bundle** (two files in one directory) and must feed a 5-D tensor. A host
  that only supports a single `remoteUrl` per asset, or assumes a 4-D `[1,3,H,W]` input, cannot use this listing yet.
- Depth, not inverse depth (see the top of this file). Relative only: no metric scale.
- Per-image scale is unknown; video flickers unless a host aligns frames.
- Only float32 is published by the converter: 105 MB to download.
- The camera outputs are estimates that were not validated.

## How it works: the header pattern

The `.azp` carries the manifest only. The host downloads each `files[].remoteUrl`, checks each sha256 and re-fetches only a
corrupt member (spec/extension-manifest.md, Multi-file model bundles). The URLs are pinned to a commit
(`/resolve/<commit>/...`), never a branch. Hugging Face honours HTTP `Range` requests for both files (checked), hence
`supportsRange: true`.

See `NOTICE` for attribution and `LICENSE` for the Apache-2.0 text.
