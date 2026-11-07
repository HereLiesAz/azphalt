# Depth Anything V2 Small

A free monocular depth model (role `depth`, type `onnx`) for any azphalt host that runs ONNX Runtime.
Header-pattern listing: **no weights are bundled or redistributed**. `remoteUrl` points at a Hugging Face
file pinned to a commit, and the host verifies the download against `checksum` before use.

## Model file

| | |
|---|---|
| File | `onnx/model_fp16.onnx` of [onnx-community/depth-anything-v2-small](https://huggingface.co/onnx-community/depth-anything-v2-small), commit `4472b7362082ad9968fee890ca0f1e5aca36b93d` |
| Size | 49,642,442 bytes |
| sha256 | `2df6223f206b5164e21f664ace61dabeb9bb6a49b8b5a3e00510b4807d0f5b04` |
| Format | ONNX, IR 9, opset 14 (`ai.onnx` only), produced by PyTorch 2.3.0; weights float16, inputs and outputs float32 |
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

**Variant choice (fp16 over fp32 and int8).** Agreement with the fp32 model (`model.onnx`, 99,060,839 bytes) over six
images (five photos and the synthetic scene) at 518x518 and 518x392:

| Variant | Size | MAE / output range | Pearson | Spearman |
|---|---|---|---|---|
| fp16 (listed) | 49.6 MB | 0.01 to 0.14 percent | 0.99999 to 1.00000 | 0.9996 to 1.0000 |
| int8 (`model_int8.onnx`) | 27.3 MB | 0.7 to 2.4 percent | 0.9977 to 0.9997 | 0.981 to 0.9993 |

fp16 is the smallest variant that matches fp32 closely, so it is the one listed. int8 is visibly less faithful
(worst case Spearman 0.981, on a football-match photo).

**Cost on CPU (x86, ONNX Runtime CPU provider, 4 threads, this is the thing to know).** ONNX Runtime's CPU provider
has no fast float16 kernels, so the fp16 file is download-light but slower and heavier to run than fp32:

| Input | fp32 | fp16 (listed) | int8 |
|---|---|---|---|
| 252x252 | 121 ms, peak 222 MB | 300 ms, peak 266 MB | 223 ms, peak 183 MB |
| 518x518 | 515 ms, peak 402 MB | 2543 ms, peak 619 MB | 555 ms, peak 425 MB |
| 518x392 | 281 ms, peak 356 MB | 1359 ms, peak 454 MB | 410 ms, peak 323 MB |
| 1036x770 | 2702 ms, peak 1698 MB | 23354 ms, peak 2830 MB | 2330 ms, peak 1488 MB |

(Peak is process peak resident memory including about 47 MB of interpreter baseline.) `requirements.minRamMB` is 640,
the measured fp16 peak at 518x518. Memory grows roughly with pixel count, so large inputs need much more. A host
on a phone, or one with a GPU/NNAPI/CoreML provider that has fp16 kernels, will see different timings. If CPU latency
matters more than a 50 MB download, switching the listing to `model.onnx` (fp32, 99 MB, exact) is a one-field change:
a new `remoteUrl`, `checksum`, `byteSize` and `quantization`.

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
