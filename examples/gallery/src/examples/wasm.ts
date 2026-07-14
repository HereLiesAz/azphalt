import type { Manifest } from "@azphalt/sdk";
import { example, type Example } from "../shared.js";

/**
 * Hand-assemble a minimal `runtime: "wasm"` filter module: it exports `memory` and
 * `filter(ptr, width, height, stride)`, walks `[ptr, ptr + height*stride)` applying a per-byte op,
 * and calls the imported `env.requestRedraw`. `op` is the bytecode that — with the target address
 * already on the stack — computes and stores the new byte. This is the raw-WASM counterpart to the
 * JS filters, over the shared-memory image ABI (`spec/capability-model.md`).
 */
function buildWasmFilter(op: number[]): Uint8Array {
  const uleb = (n: number): number[] => {
    const out: number[] = [];
    do {
      let b = n & 0x7f;
      n >>>= 7;
      if (n) b |= 0x80;
      out.push(b);
    } while (n);
    return out;
  };
  const section = (id: number, content: number[]): number[] => [id, ...uleb(content.length), ...content];
  const str = (s: string): number[] => [...uleb(s.length), ...[...s].map((c) => c.charCodeAt(0))];

  // Types: t0 = () -> (); t1 = (i32,i32,i32,i32) -> ()
  const types = section(1, [0x02, 0x60, 0x00, 0x00, 0x60, 0x04, 0x7f, 0x7f, 0x7f, 0x7f, 0x00]);
  const imports = section(2, [0x01, ...str("env"), ...str("requestRedraw"), 0x00, 0x00]); // env.requestRedraw : t0 (func 0)
  const funcs = section(3, [0x01, 0x01]); // filter : t1 (func 1)
  const mem = section(5, [0x01, 0x00, 0x01]); // memory min 1 page
  const exports = section(7, [0x02, ...str("memory"), 0x02, 0x00, ...str("filter"), 0x00, 0x01]);
  const body = [
    0x20, 0x02, 0x20, 0x03, 0x6c, 0x20, 0x00, 0x6a, 0x21, 0x04, // local4 end = ptr + height*stride
    0x20, 0x00, 0x21, 0x05, // local5 i = ptr
    0x02, 0x40, 0x03, 0x40, // block { loop {
    0x20, 0x05, 0x20, 0x04, 0x4f, 0x0d, 0x01, // if i >= end br 1
    0x20, 0x05, ...op, // push address i, then the per-byte op stores mem[i]
    0x20, 0x05, 0x41, 0x01, 0x6a, 0x21, 0x05, // i = i + 1
    0x0c, 0x00, // br 0
    0x0b, 0x0b, // } }
    0x10, 0x00, // call requestRedraw
    0x0b, // end
  ];
  const funcBody = [0x01, 0x02, 0x7f, ...body]; // one local group of 2 i32 (locals 4,5)
  const code = section(10, [0x01, ...uleb(funcBody.length), ...funcBody]);
  return new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, ...types, ...imports, ...funcs, ...mem, ...exports, ...code]);
}

// mem[i] = 255 - mem[i]
const INVERT_OP = [0x41, 0xff, 0x01, 0x20, 0x05, 0x2d, 0x00, 0x00, 0x6b, 0x3a, 0x00, 0x00];
// mem[i] = mem[i] >> 1  (halve every channel — a darken)
const DARKEN_OP = [0x20, 0x05, 0x2d, 0x00, 0x00, 0x41, 0x01, 0x76, 0x3a, 0x00, 0x00];

function wasmManifest(id: string, name: string, description: string): Omit<Manifest, "files"> {
  return {
    azphalt: "0.1",
    id,
    name,
    version: "1.0.0",
    kind: "code",
    license: "MIT",
    compat: ">=0.1",
    description,
    author: "azphalt examples",
    runtime: "wasm",
    entry: "code/filter.wasm",
    capabilities: ["bitmap", "canvas"],
    contributes: { filters: [{ id: name.toLowerCase(), name, entry: "filter" }] },
  };
}

/** Raw `runtime: "wasm"` filters — the same contract as a JS filter, run on the host's WebAssembly. */
export const wasm: Example[] = [
  example({
    slug: "wasm-invert",
    summary: "A raw-WASM filter that inverts every channel over the shared-memory image ABI.",
    manifest: wasmManifest("com.azphalt.example.wasm-invert", "WasmInvert", "Invert, hand-written as a raw WebAssembly module."),
    payload: { "code/filter.wasm": buildWasmFilter(INVERT_OP) },
    run: {
      world: { params: {}, bitmap: { data: [10, 20, 30, 255, 200, 100, 50, 128], width: 2, height: 1 } },
      assert: (r) => {
        if (JSON.stringify(r.bitmap.data) !== JSON.stringify([245, 235, 225, 0, 55, 155, 205, 127])) throw new Error(`wasm-invert: ${r.bitmap.data}`);
        if (r.redraws !== 1) throw new Error(`wasm-invert redraws: ${r.redraws}`);
      },
    },
  }),
  example({
    slug: "wasm-darken",
    summary: "A raw-WASM filter that halves every channel (right-shift) — a second ABI example.",
    manifest: wasmManifest("com.azphalt.example.wasm-darken", "WasmDarken", "Halve every channel, as a raw WebAssembly module."),
    payload: { "code/filter.wasm": buildWasmFilter(DARKEN_OP) },
    run: {
      world: { params: {}, bitmap: { data: [10, 20, 30, 254, 200, 100, 50, 128], width: 2, height: 1 } },
      assert: (r) => {
        if (JSON.stringify(r.bitmap.data) !== JSON.stringify([5, 10, 15, 127, 100, 50, 25, 64])) throw new Error(`wasm-darken: ${r.bitmap.data}`);
        if (r.redraws !== 1) throw new Error(`wasm-darken redraws: ${r.redraws}`);
      },
    },
  }),
];
