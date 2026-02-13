export class PrintfulClient {
  private apiKey: string;
  private baseUrl = "https://api.printful.com";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`Printful API Error: ${res.statusText}`);
    }

    return res.json();
  }

  // Fetch all products from your store
  async getProducts() {
    const data = await this.request("/store/products");
    return data.result; 
  }

  async uploadFile(url: string, filename: string) {
    const data = await this.request("/files", {
      method: "POST",
      body: JSON.stringify({
        role: "printfile",
        url,
        filename,
      }),
    });
    return data.result;
  }

  async createProduct(name: string, imageUrl: string) {
    // This is a simplified creation flow
    // In reality, you create a "Sync Product"
    const data = await this.request("/store/products", {
      method: "POST",
      body: JSON.stringify({
        sync_product: {
          name,
          thumbnail: imageUrl,
        },
        sync_variants: [
          {
            retail_price: 85.00,
            variant_id: 4011, // Example ID for a specific hoodie variant
            files: [
              {
                url: imageUrl,
              },
            ],
          },
        ],
      }),
    });
    return data.result;
  }

  async createVariant(productId: number, fileId: number, variantId: number) {
     // Placeholder for adding variants to existing products
     return { success: true };
  }
}