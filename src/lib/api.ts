import { Product, ApiResponse } from "@/types";

const API_BASE = "https://v2.api.noroff.dev";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/online-shop`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const json: ApiResponse<Product[]> = await res.json();
  return json.data;
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/online-shop/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  const json: ApiResponse<Product> = await res.json();
  return json.data;
}
