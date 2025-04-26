const ProductNames = ({ id, products }) => {
  const product = products.find((p) => p.id === id);
  return <span>{product?.name || "-"}</span>;
};

export default ProductNames;
