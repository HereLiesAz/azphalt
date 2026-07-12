import type {
  Host,
  LayerRef,
  Bitmap,
  RGBA,
  CanvasApi,
  LayersApi,
  BitmapApi,
  SelectionApi,
  ColorApi,
  ParamsApi,
  AssetsApi,
  Control,
} from "@azphalt/sdk";

class FakeLayer implements LayerRef {
  constructor(public readonly id: string, public name: string) {}
  opacity = 1.0;
  blendMode = "normal";
}

class FakeCanvas implements CanvasApi {
  size() { return { width: 1024, height: 1024 }; }
  dpi() { return 72; }
  requestRedraw() {}
}

class FakeLayers implements LayersApi {
  private _layers: FakeLayer[] = [new FakeLayer("layer-0", "Background")];
  private _active: LayerRef = this._layers[0];

  active() { return this._active; }
  list() { return [...this._layers]; }
  create(opts?: { name?: string }) {
    const l = new FakeLayer(`layer-${this._layers.length}`, opts?.name ?? "New Layer");
    this._layers.push(l);
    return l;
  }
  opacity(layer: LayerRef) { return (layer as FakeLayer).opacity; }
  setOpacity(layer: LayerRef, value: number) { (layer as FakeLayer).opacity = value; }
  blendMode(layer: LayerRef) { return (layer as FakeLayer).blendMode; }
  setBlendMode(layer: LayerRef, mode: string) { (layer as FakeLayer).blendMode = mode; }
}

class FakeBitmap implements BitmapApi {
  private _buffers = new Map<string, Bitmap>();

  read(layer: LayerRef): Bitmap {
    if (!this._buffers.has(layer.id)) {
      this._buffers.set(layer.id, this.alloc(1024, 1024));
    }
    return this._buffers.get(layer.id)!;
  }
  write(layer: LayerRef, bitmap: Bitmap) {
    this._buffers.set(layer.id, bitmap);
  }
  alloc(width: number, height: number): Bitmap {
    return { width, height, data: new Uint8ClampedArray(width * height * 4) };
  }
}

class FakeSelection implements SelectionApi {
  private _mask: Bitmap | null = null;
  mask() { return this._mask; }
  set(mask: Bitmap) { this._mask = mask; }
  clear() { this._mask = null; }
}

class FakeColor implements ColorApi {
  private _active: RGBA = { r: 0, g: 0, b: 0, a: 255 };
  active() { return this._active; }
  setActive(color: RGBA) { this._active = color; }
  palette() { return [this._active]; }
}

export class FakeParams implements ParamsApi {
  private _values = new Map<string, unknown>();

  setValuesFromUI(controls: Control[]) {
    // simplified extraction
    for (const ctrl of controls) {
      if (ctrl.type === "group") {
        this.setValuesFromUI(ctrl.controls);
      } else if ("default" in ctrl) {
        this._values.set(ctrl.key, ctrl.default);
      }
    }
  }

  value<T = unknown>(key: string): T { return this._values.get(key) as T; }
  number(key: string): number { return this.value<number>(key); }
  bool(key: string): boolean { return this.value<boolean>(key); }
  string(key: string): string { return this.value<string>(key); }
  color(key: string): RGBA { return this.value<RGBA>(key); }
}

export class FakeAssets implements AssetsApi {
  constructor(private _payload: Record<string, Uint8Array>) {}
  read(path: string): Uint8Array {
    const data = this._payload[path];
    if (!data) throw new Error(`Asset not found: ${path}`);
    return data;
  }
}

export class FakeHost implements Host {
  canvas = new FakeCanvas();
  layers = new FakeLayers();
  bitmap = new FakeBitmap();
  selection = new FakeSelection();
  color = new FakeColor();
  params = new FakeParams();
  assets: FakeAssets;

  constructor(payload: Record<string, Uint8Array> = {}) {
    this.assets = new FakeAssets(payload);
  }
}
