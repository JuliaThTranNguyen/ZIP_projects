import ProductBox from "./ProductBox";

export default function ProductsGrid({products}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductBox key={product._id} {...product} />
      ))}
    </div>
  );
}