const PRINTFUL_API_URL = "https://api.printful.com";

interface PrintfulFile {
  id: number;
  url: string;
  filename: string;
}

interface PrintfulProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
}

export class PrintfulClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async request(endpoint: string, method: string = "GET", body?: any) {
    const headers = {
      "Authorization": `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    const res = await fetch(`${PRINTFUL_API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`Printful API Error: ${JSON.stringify(error)}`);
    }

    return res.json();
  }

  // 1. Upload the AI Design to Printful
  async uploadFile(imageUrl: string, filename: string): Promise<PrintfulFile> {
    const data = await this.request("/files", "POST", {
      role: "printfile",
      url: imageUrl,
      filename: filename,
      visible: true,
    });
    return data.result;
  }

  // 2. Create a Sync Product (The Container)
  async createProduct(name: string, thumbnail_url: string): Promise<PrintfulProduct> {
    const data = await this.request("/store/products", "POST", {
      sync_product: {
        name: name,
        thumbnail: thumbnail_url,
      },
    });
    return data.result;
  }

  // 3. Add a Variant (e.g., Large Black Hoodie)
  async createVariant(productId: number, fileId: number, variantId: number = 4011) {
    // 4011 is a generic ID for a Gildan 18500 Black Hoodie (L), used for example
    // In production, we would map multiple sizes
    
    await this.request(`/store/products/${productId}/variants`, "POST", {
      sync_variant: {
        variant_id: variantId, 
        files: [
          {
            id: fileId,
          },
        ],
      },
    });
  }
}
