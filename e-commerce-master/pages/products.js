import Header from "../components/header";
import Center from "../components/center";
import {mongooseConnect} from "../database/mongoose";
import {Product} from "../models/Product";
import ProductsGrid from "../components/ProductGrid";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import Button from "../components/Button";

export default function ProductsPage({products}) {
  return (
    <>
     
      <Header />
      <Center>
      <h1 className="text-2xl m-10 md:text-4xl font-extrabold">All Products</h1>
      <div className="flex justify-start mt-4 mb-5">
            <Link href="/" >
              <Button outline className="flex"><HiArrowLeft size={20} className="ml-1" />Back to Home</Button>
            </Link>
          </div>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {sort:{'_id':-1}});
  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}