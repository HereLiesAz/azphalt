import type { 
  RepositoryIndex, 
  PackageSearchResponse, 
  Manifest, 
  AssetType 
} from "@azphalt/sdk";

export interface ClientOptions {
  url: string;
  token?: string;
  /**
   * This host app's reverse-DNS id. When set, browse/search results are scoped to this app: global
   * packages plus those whose `targetApps` include it. Per-call `SearchOptions.app` overrides it.
   */
  app?: string;
}

export interface SearchOptions {
  q?: string;
  types?: AssetType[];
  tags?: string[];
  page?: number;
  /** Override the client's `app` for this search (see {@link ClientOptions.app}). */
  app?: string;
}

export class RepositoryClient {
  private baseUrl: string;
  private token?: string;
  private app?: string;

  constructor(opts: ClientOptions) {
    this.baseUrl = opts.url.replace(/\/$/, "");
    this.token = opts.token;
    this.app = opts.app;
  }
  
  public setToken(token: string) {
    this.token = token;
  }

  private get headers(): Record<string, string> {
    const h: Record<string, string> = {
      "Accept": "application/json"
    };
    if (this.token) {
      h["Authorization"] = `Bearer ${this.token}`;
    }
    return h;
  }

  public async getIndex(): Promise<RepositoryIndex> {
    const res = await fetch(`${this.baseUrl}/.well-known/azphalt-repository.json`);
    if (!res.ok) throw new Error(`Failed to fetch index: ${res.status}`);
    return res.json();
  }

  public async search(opts: SearchOptions = {}): Promise<PackageSearchResponse> {
    const params = new URLSearchParams();
    if (opts.q) params.set("q", opts.q);
    if (opts.types && opts.types.length > 0) params.set("types", opts.types.join(","));
    if (opts.tags && opts.tags.length > 0) params.set("tags", opts.tags.join(","));
    if (opts.page) params.set("page", opts.page.toString());
    const app = opts.app ?? this.app;
    if (app) params.set("app", app);

    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`${this.baseUrl}/packages${query}`, { headers: this.headers });
    if (!res.ok) throw new Error(`Search failed: ${res.status}`);
    return res.json();
  }

  public async getPackage(id: string): Promise<Manifest> {
    const res = await fetch(`${this.baseUrl}/packages/${id}`, { headers: this.headers });
    if (!res.ok) throw new Error(`Get package failed: ${res.status}`);
    return res.json();
  }

  public async download(id: string, version: string): Promise<Uint8Array> {
    const res = await fetch(`${this.baseUrl}/packages/${id}/versions/${version}/download`, {
      headers: this.headers
    });
    
    if (res.status === 401) {
      throw new Error("401 Unauthorized: A valid token is required for this paid asset.");
    }
    if (res.status === 402) {
      throw new Error("402 Payment Required: You do not have a license for this paid asset.");
    }
    if (!res.ok) {
      throw new Error(`Download failed: ${res.status}`);
    }
    
    const arrayBuffer = await res.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }
}
