import { writeAzp } from "@azphalt/azp";
import type { Manifest, Control, Panel } from "@azphalt/sdk";

export interface ImportOptions {
  id: string;
  version: string;
  author: string;
}

interface IsfInput {
  NAME: string;
  TYPE: string;
  DEFAULT?: any;
  MIN?: any;
  MAX?: any;
  LABEL?: string;
}

interface IsfHeader {
  CREDIT?: string;
  DESCRIPTION?: string;
  INPUTS?: IsfInput[];
}

/**
 * Parses an ISF/GLSL shader, translates its UI inputs into the azphalt schema,
 * and packages it into an .azp asset package.
 */
export function importIsf(shaderText: string, opts: ImportOptions): Uint8Array {
  // Extract ISF JSON header if present
  let header: IsfHeader = {};
  const start = shaderText.indexOf("/*{");
  if (start !== -1) {
    const end = shaderText.indexOf("}*/", start);
    if (end !== -1) {
      try {
        const jsonStr = shaderText.substring(start + 2, end + 1);
        header = JSON.parse(jsonStr) as IsfHeader;
      } catch (e) {
        throw new Error("Failed to parse ISF JSON header: " + (e as Error).message);
      }
    }
  }

  const controls: Control[] = [];

  if (header.INPUTS) {
    for (const input of header.INPUTS) {
      const label = input.LABEL || input.NAME;
      if (input.TYPE === "float") {
        controls.push({
          type: "slider",
          key: input.NAME,
          label,
          min: typeof input.MIN === "number" ? input.MIN : 0,
          max: typeof input.MAX === "number" ? input.MAX : 1,
          default: typeof input.DEFAULT === "number" ? input.DEFAULT : 0
        });
      } else if (input.TYPE === "bool") {
        controls.push({
          type: "toggle",
          key: input.NAME,
          label,
          default: !!input.DEFAULT
        });
      } else if (input.TYPE === "color") {
        let defColor = "#000000";
        if (Array.isArray(input.DEFAULT) && input.DEFAULT.length >= 3) {
          const r = Math.round(input.DEFAULT[0] * 255).toString(16).padStart(2, "0");
          const g = Math.round(input.DEFAULT[1] * 255).toString(16).padStart(2, "0");
          const b = Math.round(input.DEFAULT[2] * 255).toString(16).padStart(2, "0");
          defColor = `#${r}${g}${b}`;
        }
        controls.push({
          type: "color",
          key: input.NAME,
          label,
          default: defColor,
          alpha: Array.isArray(input.DEFAULT) && input.DEFAULT.length === 4
        });
      }
    }
  }

  const payload: Record<string, Uint8Array> = {};
  const encoder = new TextEncoder();
  
  payload["assets/effect.isf"] = encoder.encode(shaderText);
  
  const hasUi = controls.length > 0;
  if (hasUi) {
    const uiSchema: Panel = { controls };
    payload["assets/ui.json"] = encoder.encode(JSON.stringify(uiSchema, null, 2));
  }

  const manifest: Omit<Manifest, "files"> = {
    azphalt: "0.1",
    id: opts.id,
    name: "ISF Shader",
    version: opts.version,
    kind: "asset",
    license: "MIT",
    compat: ">=0.1",
    author: header.CREDIT || opts.author,
    description: header.DESCRIPTION || "Imported ISF/GLSL Shader",
    assets: [
      {
        type: "shader",
        path: "assets/effect.isf",
        ...(hasUi ? { ui: "assets/ui.json" } : {})
      }
    ]
  };

  const { azp } = writeAzp({ manifest, payload, license: "MIT License" });
  return azp;
}
