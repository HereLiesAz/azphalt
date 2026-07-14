import { example, utf8, type Example } from "../shared.js";

/**
 * A minimal, valid glTF 2.0 triangle. One buffer holds three `VEC3` positions followed by three
 * `UNSIGNED_SHORT` indices, inlined as a self-contained `data:` URI so the `.gltf` needs no sidecar.
 */
const TRIANGLE_GLTF = {
  asset: { version: "2.0", generator: "azphalt examples" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "Triangle" }],
  meshes: [{ name: "Triangle", primitives: [{ attributes: { POSITION: 0 }, indices: 1 }] }],
  accessors: [
    { bufferView: 0, componentType: 5126, count: 3, type: "VEC3", min: [0, 0, 0], max: [1, 1, 0] },
    { bufferView: 1, componentType: 5123, count: 3, type: "SCALAR" },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: 36, target: 34962 },
    { buffer: 0, byteOffset: 36, byteLength: 6, target: 34963 },
  ],
  buffers: [
    {
      byteLength: 42,
      uri: "data:application/octet-stream;base64,AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAABAAIA",
    },
  ],
};

/**
 * A minimal, valid glTF 2.0 quad built from two triangles (four positions, six indices). Same inline
 * single-buffer layout as the triangle, so it round-trips through any glTF 2.0 loader on its own.
 */
const QUAD_GLTF = {
  asset: { version: "2.0", generator: "azphalt examples" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "Quad" }],
  meshes: [{ name: "Quad", primitives: [{ attributes: { POSITION: 0 }, indices: 1 }] }],
  accessors: [
    { bufferView: 0, componentType: 5126, count: 4, type: "VEC3", min: [0, 0, 0], max: [1, 1, 0] },
    { bufferView: 1, componentType: 5123, count: 6, type: "SCALAR" },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: 48, target: 34962 },
    { buffer: 0, byteOffset: 48, byteLength: 12, target: 34963 },
  ],
  buffers: [
    {
      byteLength: 60,
      uri: "data:application/octet-stream;base64,AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAgD8AAAAAAAAAAAAAgD8AAAAAAAABAAIAAAACAAMA",
    },
  ],
};

/** `mesh` — self-contained glTF 2.0 geometry a host imports into its 3D scene. */
export const meshes: Example[] = [
  example({
    slug: "mesh-triangle",
    summary: "A single-triangle glTF 2.0 mesh with an inline buffer (.gltf).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.mesh-triangle",
      name: "Triangle Mesh",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "The smallest drawable glTF 2.0 document: three vertices, one indexed triangle.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "mesh", path: "assets/mesh-triangle.gltf", tags: ["gltf", "primitive"] }],
    },
    payload: { "assets/mesh-triangle.gltf": utf8(JSON.stringify(TRIANGLE_GLTF, null, 2)) },
  }),
  example({
    slug: "mesh-quad",
    summary: "A two-triangle glTF 2.0 quad with an inline buffer (.gltf).",
    manifest: {
      azphalt: "0.1",
      id: "com.azphalt.example.mesh-quad",
      name: "Quad Mesh",
      version: "1.0.0",
      kind: "asset",
      license: "MIT",
      compat: ">=0.1",
      description: "A unit quad in glTF 2.0 — four positions triangulated into a flat plane.",
      author: "azphalt examples",
      capabilities: ["assets"],
      assets: [{ type: "mesh", path: "assets/mesh-quad.gltf", tags: ["gltf", "plane"] }],
    },
    payload: { "assets/mesh-quad.gltf": utf8(JSON.stringify(QUAD_GLTF, null, 2)) },
  }),
];
