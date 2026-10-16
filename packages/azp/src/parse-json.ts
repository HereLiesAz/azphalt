/**
 * Strict JSON parse that rejects duplicate object keys. The `.azp` signature is computed over the
 * raw `manifest.json` bytes (there is no canonicalization — see `sign.ts`), so a manifest with two
 * `"files"` objects is signed verbatim while `JSON.parse` silently keeps only the last. A verifier
 * that kept the *first* would read a different digest table under the same valid signature. Refusing
 * duplicate keys outright removes that cross-implementation ambiguity for everyone.
 *
 * The scanner is a single left-to-right pass that tracks, per object nesting level, which keys have
 * been seen. It only inspects structure (braces, brackets, strings, `:` / `,`); on the first
 * duplicate key it throws, otherwise it returns `JSON.parse(text)`.
 */

/** Parse `text` as JSON, throwing on a duplicate object key (message includes the key). */
export function parseJsonNoDuplicateKeys<T = unknown>(text: string): T {
  // Frames: one per open `{`/`[`. For objects we collect keys and remember whether the next string
  // is a key (true just after `{` or `,` inside an object) or a value.
  interface Frame {
    object: boolean;
    keys?: Set<string>;
    expectKey: boolean;
  }
  const stack: Frame[] = [];
  let expectingKey = false; // top-level is a value position

  let i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (c === '"') {
      // Read a full JSON string (with escapes) and advance i past the closing quote.
      const start = i;
      i++;
      let raw = "";
      while (i < n) {
        const ch = text[i];
        if (ch === "\\") {
          raw += ch + (text[i + 1] ?? "");
          i += 2;
          continue;
        }
        if (ch === '"') break;
        raw += ch;
        i++;
      }
      i++; // past closing quote
      const top = stack[stack.length - 1];
      if (top && top.object && expectingKey) {
        // This string is an object key. Decode just enough to compare (JSON.parse the token).
        const key = JSON.parse(text.slice(start, i)) as string;
        if (top.keys!.has(key)) throw new Error(`duplicate manifest key: ${JSON.stringify(key)}`);
        top.keys!.add(key);
        expectingKey = false; // now expect `:` then a value
      }
      continue;
    }
    if (c === "{") {
      stack.push({ object: true, keys: new Set(), expectKey: true });
      expectingKey = true;
      i++;
      continue;
    }
    if (c === "[") {
      stack.push({ object: false, expectKey: false });
      expectingKey = false;
      i++;
      continue;
    }
    if (c === "}" || c === "]") {
      stack.pop();
      expectingKey = false;
      i++;
      continue;
    }
    if (c === ",") {
      const top = stack[stack.length - 1];
      expectingKey = !!(top && top.object);
      i++;
      continue;
    }
    // `:` and whitespace and primitive characters — a key is only ever a string, so after `:` the
    // next string is a value; expectingKey stays false until the next `,`/`{`.
    i++;
  }

  return JSON.parse(text) as T;
}
