# example: invert

A minimal, complete azphalt extension — a filter that inverts a layer's colors by an adjustable
`strength`. Use it as a template for a `code` extension, and read it next to
[`@azphalt/runtime-reference`](../../packages/runtime-reference), which runs it against the
capability contract.

## Shape

- [`src/main.ts`](src/main.ts) — the filter, written against `@azphalt/sdk`. Its export name
  (`invert`) matches `contributes.filters[].entry`.
- [`manifest.json`](manifest.json) — identity + the three capabilities it uses
  (`bitmap`, `params`, `canvas`) + the contribution. `files` is populated at package time by
  `writeAzp`; it is left `{}` here because this is source, not a built `.azp`.
- [`ui/panel.json`](ui/panel.json) — the host-rendered control (`strength` slider).

## Run it

`test/invert.test.ts` loads the manifest + panel and runs the filter through the reference
runtime — asserting a full inverse at `strength: 1`, a no-op at `0`, and that the ungranted
`layers`/`selection`/`color` capabilities are absent.

~~~sh
pnpm --filter @azphalt/example-invert test
~~~
