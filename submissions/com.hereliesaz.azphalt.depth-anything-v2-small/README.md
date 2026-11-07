# Depth Anything V2 Small

A free monocular depth model (role `depth`, type `onnx`) for any azphalt host that runs ONNX Runtime.
Header-pattern listing: **no weights are bundled or redistributed**. `remoteUrl` points at a Hugging Face
file pinned to a commit, and the host verifies the download against `checksum` before use.

## Model file

| | |
|---|---|
| File | `onnx/model.onnx` of [onnx-community/depth-anything-v2-small](https://huggingface.co/onnx-community/depth-anything-v2-small), commit `4472b7362082ad9968fee890ca0f1e5aca36b93d` |
| Size | 99,060,839 bytes |
| sha256 | `afb6a5c28f3b6bf1618c6e43f02073ef9dfdc70e937502d51603e57b0a1df10c` |
| Format | ONNX, IR 9, opset 14 (`ai.onnx` only), produced by PyTorch 2.3.0; float32 weights, inputs and outputs |
| Licence | Apache-2.0 (Depth Anything V2 Small, and the converter). The Base/Large/Giant V2 models are CC-BY-NC and are NOT this model. |
| Upstream | Lihe Yang et al., [Depth Anything V2](https://arxiv.org/abs/2406.09414); converted by onnx-community |

The card of the converter repository lists `onnx-community/depth-anything-v2-small-ONNX` as a `new_version`. This
listing pins the commit above; a successor repository is not followed automatically.

## Input

| | |
|---|---|
| name | `pixel_values` |
| dtype / layout | float32, NCHW, RGB channel order |
| shape | `[batch, 3, height, width]`, batch, height and width all dynamic |
| normalisation | `(x/255 - mean) / std`, ImageNet mean `[0.485, 0.456, 0.406]`, std `[0.229, 0.224, 0.225]` |
| size | **use multiples of 14** (the ViT patch size). The model is not fixed-size. Recommended: long side about 518 |

Resize with bicubic interpolation (the reference `DPTImageProcessor` does). The reference preprocessor keeps the
aspect ratio and rounds to a multiple of 14, with a 518 target.

## Output

| | |
|---|---|
| name | `predicted_depth` |
| dtype / shape | float32, `[batch, 14*floor(H/14), 14*floor(W/14)]` (no channel axis) |
| meaning | **relative inverse depth** (disparity-like): **larger is nearer**, smaller is farther, 0 is the farthest |

It is not metric and has an arbitrary, per-image scale and shift: values are not comparable between images and
are not range-bounded (observed 0 to about 8). Normalise each result (per-image min-max) before display or before
combining it with another depth source, and resize it back to the source resolution yourself. Do not read it
as metres or as 1/metres.

It has the same sign convention as MiDaS and the opposite one to Depth Anything V3 (see that listing).

## Verified facts

All of this was measured by running the files in ONNX Runtime 1.29.0 (CPU, 4 threads), not taken from the model cards.

**Sizes.** Height and width are truly dynamic. Tested (width x height): 14x14, 28x28, 100x100, 252x252, 266x350,
504x378, 518x518, 700x518, 1036x518, 1400x700: all ran. Batch 2 ran. The output is always
`14*floor(H/14)` by `14*floor(W/14)`: 500x333 in gives 490x322 out, 100x100 in gives 98x98 out. Pass multiples
of 14 to get an output the same size as the input. Very small inputs (below about 100 px) run but are not meaningful.

**Semantics (synthetic perspective scene: a checkered floor receding to a horizon, a sky above, a box on the floor,
known true depth z).** On the floor pixels the output correlates with 1/z at Pearson 0.996 (Spearman 0.986) and
with z at Spearman -0.987. The sky reads 0.00 (the farthest), the floor just below the horizon 1.8, the floor at the
bottom of the frame 6.8. So: nearer is larger, and it is inverse depth, not depth.

**Normalisation matters but the model is tolerant.** Feeding raw `x/255` with no mean/std changes the result by about
1.4 to 2.0 percent of the output range (Pearson 0.996 to 0.999) on four real photos. Use the normalisation anyway.

**Variant choice (fp32 listed; fp16 and int8 exist but are not listed).** The owner chose fp32: it is the exact
reference and the fastest on a CPU. The converter also publishes `model_fp16.onnx` (49.6 MB) and `model_int8.onnx`
(27.3 MB). Agreement with fp32 over six images (five photos and the synthetic scene) at 518x518 and 518x392:

| Variant | Size | MAE / output range | Pearson | Spearman | Why not listed |
|---|---|---|---|---|---|
| fp32 (listed) | 99.1 MB | reference | reference | reference | |
| fp16 | 49.6 MB | 0.01 to 0.14 percent | 0.99999 to 1.00000 | 0.9996 to 1.0000 | 5x slower and heavier on the CPU provider (no fast fp16 kernels) |
| int8 | 27.3 MB | 0.7 to 2.4 percent | 0.9977 to 0.9997 | 0.981 to 0.9993 | visibly less faithful |

**Cost on CPU (x86, ONNX Runtime CPU provider, 4 threads), fp32 (listed):**

| Input | Time | Peak memory |
|---|---|---|
| 252x252 | 121 ms | 222 MB |
| 518x392 | 281 ms | 356 MB |
| 518x518 | 515 ms | 402 MB |
| 1036x770 | 2702 ms | 1698 MB |

(Peak is process peak resident memory including about 47 MB of interpreter baseline; the weights alone load at about
186 MB.) `requirements.minRamMB` is 448, the measured peak at 518x518 rounded up. Memory grows roughly with pixel count,
so large inputs need much more. A phone, or a GPU/NNAPI/CoreML provider, will see different timings.

## Limitations

- Relative depth only: no metric scale, no camera intrinsics.
- Per-image scale and shift are unknown, so frame-to-frame (video) results flicker unless a host aligns them.
- Output size is rounded down to a multiple of 14 (see above).
- Thin structures, glass, mirrors and the sky depend on the training data; the model is a 25 M-parameter student and
  is the least detailed of the V2 family.

## How it works: the header pattern

The `.azp` carries the manifest only. The host downloads `remoteUrl`, checks the sha256 and refuses on mismatch
(spec/extension-manifest.md, Remote Assets). The URL is pinned to a commit (`/resolve/<commit>/...`), never a branch,
so the signed manifest keeps resolving to the exact bytes it was checksummed against. Hugging Face honours HTTP
`Range` requests for this file (checked), so resumable download managers work.

See `NOTICE` for attribution and `LICENSE` for the Apache-2.0 text.
