# UI schema

*Normative. A declarative description of an extension's control panel. The host renders it as native widgets — Compose, SwiftUI, whatever it is. No HTML, no DOM, no React: that is precisely what keeps the standard cross-app.*

## Model
A panel is a JSON object with a `controls` array. Each control has a `type`, a unique `key`, a `label`, and type-specific fields. The extension reads values through the `params` capability; the host owns rendering and layout. UI schemas can be attached to code contributions (`filters`, `tools`) or to configurable assets (like `shader`).

## Core controls (`0.1`)
| `type` | Fields | Value |
|---|---|---|
| `slider` | `min`, `max`, `step`, `default` | number |
| `number` | `min?`, `max?`, `step?`, `default` | number |
| `toggle` | `default` | boolean |
| `select` | `options: [{value,label}]`, `default` | option value |
| `color` | `default`, `alpha?` | RGBA |
| `text` | `default`, `placeholder?` | string |
| `button` | `action` | fires `action` on the entry |
| `group` | `label`, `controls[]` | container |

Kept deliberately small so every host can render it natively. Richer controls — tone `curve`, `gradient`, conditional visibility — are candidate extensions to the schema, not part of `0.1`.

## Update model
- Controls update live by default: a change pushes new `params` and the host MAY re-run a preview.
- A `button` with an `action` is the apply/commit path for expensive operations.

## Example
~~~
{
  "controls": [
    { "type": "slider", "key": "cellSize", "label": "Cell size", "min": 2, "max": 40, "step": 1, "default": 8 },
    { "type": "select", "key": "shape", "label": "Dot shape",
      "options": [{ "value": "circle", "label": "Circle" }, { "value": "square", "label": "Square" }],
      "default": "circle" },
    { "type": "color", "key": "ink", "label": "Ink", "default": "#000000", "alpha": true },
    { "type": "toggle", "key": "cmyk", "label": "CMYK separation", "default": true }
  ]
}
~~~

## Open
- The expressiveness ceiling — rich enough for real tool UIs vs. renderable natively on every host. The central UI tension of the whole standard.
- Localization of labels/options; conditional show-hide; validation messages.
