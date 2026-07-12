/** A representative ISF shader exercising every input type, for the tests. */
export const ISF = `/*{
  "ISFVSN": "2.0",
  "DESCRIPTION": "Test Grade",
  "CATEGORIES": ["Color"],
  "INPUTS": [
    { "NAME": "inputImage", "TYPE": "image" },
    { "NAME": "amount", "TYPE": "float", "DEFAULT": 0.5, "MIN": 0.0, "MAX": 1.0, "LABEL": "Amount" },
    { "NAME": "gain", "TYPE": "float", "DEFAULT": 1.0 },
    { "NAME": "invert", "TYPE": "bool", "DEFAULT": false },
    { "NAME": "mode", "TYPE": "long", "DEFAULT": 1, "VALUES": [0, 1, 2], "LABELS": ["Off", "Soft", "Hard"] },
    { "NAME": "tint", "TYPE": "color", "DEFAULT": [1.0, 0.5, 0.0, 1.0] },
    { "NAME": "center", "TYPE": "point2D", "DEFAULT": [0.5, 0.5] },
    { "NAME": "reset", "TYPE": "event" }
  ]
}*/
void main() {
  gl_FragColor = vec4(1.0);
}
`;

export const LICENSE = "MIT License\n\nCopyright (c) 2026 Az\n";
