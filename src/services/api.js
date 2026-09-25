import { products } from "../data/products";

// Local mock API layer. Keeping data access behind these functions makes it easy
// to replace the local dataset with a real REST API in a future version.
export async function getProducts() {
  return products.map((product) => ({ ...product }));
}

export async function getProduct(id) {
  const product = products.find((item) => String(item.id) === String(id));
  return product ? { ...product } : null;
}

export async function getProductsByCategory(category) {
  const normalized = String(category || "").toLowerCase();
  return products.filter((item) => item.category.toLowerCase() === normalized).map((item) => ({ ...item }));
}
