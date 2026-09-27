---
"@azphalt/conformance": minor
---

`runLlmConformance` certifies an `"llm"` host (`spec/llm.md` § Conformance), and `HostProfile` gains `"llm"`. The host must:
- refuse tampered, unsafe-path, non-`llm`, over-permissioned and incompatible packages;
- disclose the tier, prompt handling and setup-token permissions before install, and keep setup off the device;
- translate rolling delimiters so no tag or native control marker reaches the model, checked against the reference runner's vectors;
- reject output carrying any session tag.
