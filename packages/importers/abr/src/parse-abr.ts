export interface AbrBrush {
  name: string;
  tipImage: Uint8Array; // PNG bytes
  spacing: number;
}

export function parseAbr(bytes: Uint8Array): AbrBrush[] {
  // ABR files start with a 2-byte version (1, 2, 6, or 10).
  if (bytes.length < 2) throw new Error("Invalid ABR: too short");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.length);
  const version = view.getInt16(0, false); // Big-endian

  if (![1, 2, 6, 10].includes(version)) {
    throw new Error(`Unsupported ABR version: ${version}`);
  }

  // TODO: Implement full 8BIM / PSD descriptor parsing and RLE image decoding.
  // For this first incremental cut, we detect it's a valid ABR and yield a placeholder
  // brush tip so the rest of the .azp generation pipeline can be exercised.

  // Generate a minimal 4x4 PNG (black square) as a placeholder tip
  const placeholderPng = new Uint8Array([
    137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82,
    0, 0, 0, 4, 0, 0, 0, 4, 8, 2, 0, 0, 0, 38, 147, 15, 106,
    0, 0, 0, 15, 73, 68, 65, 84, 8, 215, 99, 96, 96, 96, 248, 15,
    0, 1, 4, 1, 0, 26, 38, 30, 212, 0, 0, 0, 0, 73, 69, 78, 68,
    174, 66, 96, 130
  ]);

  return [
    {
      name: "Imported Brush",
      tipImage: placeholderPng,
      spacing: 25,
    }
  ];
}
