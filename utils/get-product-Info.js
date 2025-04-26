export function getProductInfo(id) {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const product = products.find((p) => p.id === id);

  if (!product) return null;

  const { name, unit_name, color } = product;
  return { name, unit_name, color };
}
