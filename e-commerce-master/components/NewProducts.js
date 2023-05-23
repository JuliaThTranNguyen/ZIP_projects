import styled from "styled-components";
import Center from "./center";
import ProductsGrid from "./ProductGrid";

export default function NewProducts({ products }) {
  return (
    <Center >
      <h1 className="text-2xl m-10 md:text-4xl font-extrabold">New Arrivals</h1>
      <div className="bg-gray-200">
        <ProductsGrid products={products} />
      </div>
    </Center>
  );
}