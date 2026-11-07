# MoGe-2 Small (Metric Depth)

Metric depth in meters from one photo, indoors or outdoors, from the author-published ONNX export of
MoGe-2 ViT-S (35.1M parameters, 140,852,051 bytes, float32, ONNX opset 14). Nothing is re-hosted: the
manifest points at a pinned Hugging Face commit and a SHA-256 digest. Weights licence: MIT (Microsoft);
DINOv2 backbone Apache-2.0. See `NOTICE`.

## Running it (ONNX Runtime)

Inputs: `image` float32 `[1,3,H,W]`, RGB, values 0..1 (no mean/std, the model normalises internally;
H and W free, aspect ratio between 1:2 and 2:1), and `num_tokens` int64 scalar (1200 fast, 1800 default,
max 3600). Downscale the camera frame to a long side of about 640 first: outputs are full input size.
Outputs: `points` `[1,H,W,3]`, `normal` `[1,H,W,3]`, `mask` `[1,H,W]`, `scale` `[1]`.

The `points` map is affine (unknown z shift, and unknown focal unless you supply it), so the host does:

1. `valid = mask > 0.5`.
2. Subsample `points` and the uv grid at rows/cols `floor(i * N / 64)` (nearest, 64x64), keep valid pixels.
   `uv_x = (col - (W-1)/2) * 2 / diag`, `uv_y = (row - (H-1)/2) * 2 / diag`, `diag = hypot(W, H)`.
3. Known camera focal (recommended; ARCore/CameraX): `f = fx_px_of_the_resized_image / (diag / 2)`.
   Solve scalar `shift` minimising `sum |f * xy / (z + shift) - uv|^2` (start 0, Levenberg-Marquardt, converges in a few steps).
   Unknown focal: fit `f` jointly (closed form for `f` given `shift`). Then `fx_px = f * diag / 2`.
4. `depth_m = (points.z + shift) * scale`; invalid where `!valid` or `depth <= 0`.
   3D point for a pixel: `ray * depth` with the pinhole intrinsics from step 3.

## Verification (done in CI-less sandbox, 4-core x86 CPU, onnxruntime 1.31)

* ONNX vs PyTorch with the authors' `onnx_compatible_mode`: points relative error 4e-7 to 3e-6, scale 4e-7 (4 images, incl. portrait).
  Versus PyTorch default mode: 0.1% to 1% mean relative points error (the authors' compat path interpolates position embeddings slightly differently).
* Plain-numpy post-processing above vs `MoGeModel.infer()` depth: mean relative error 0.06% to 0.9% (p99 below 2.7%), same valid-pixel fraction, for both unknown and known (65 deg) focal; 8 runs.
* Sanity: indoor rooms 1.2 to 4.4 m, street scene 5 to 100 m, mountain scene up to about 1.4 km.
* NOT verified: accuracy against ground-truth depth, and anything on a real phone.

## Limitations

* Size/speed: 141 MB download. About 0.9 s (1200 tokens) to 1.5 s (1800 tokens) per 640px frame on desktop CPU; expect several times slower on mid-range phones. Peak RSS measured 1.1 to 1.9 GB with default ORT arenas, so treat 3 GB+ devices as the floor.
* Needs a full onnxruntime build (standard ops incl. Erf, Resize, ConvTranspose); reduced-operator mobile builds may fail. GPU/NNAPI delegates untested.
* Metric scale is inferred from image content, so it can be off by tens of percent on unusual scenes (mirrors, close-ups, miniatures, heavy zoom). Providing the true focal length fixes the shift but not the scale.
* A wrong focal length warps geometry and distances; use the camera's reported value for the exact image crop and size.
* Far/sky regions are masked; depth beyond roughly 100 m is unreliable. Single frame, no temporal consistency.
* Training data licences (24 datasets) are unaudited by azphalt; see `NOTICE`.
