import Center from "../../components/center";
import Header from "../../components/header";
import { mongooseConnect } from "../../database/mongoose";
import { Product } from "../../models/Product";
import ProductImages from "../../components/ProductImage";
import Button from "../../components/Button";
import { useContext } from "react";
import { CartContext } from "../../components/CartContext";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";


export default function ProductPage({ product }) {
    const { addProduct } = useContext(CartContext) || {}; // Initialize the context with an empty object if it's not available

    return (
        <>
            <title>Product details</title>
            <Header />
            <Center>
            <div className="flex justify-start mt-10 mb-5 ml-0">
            <Link href="/" >
              <Button outline className="flex mr-10 ml-0 text-gray-600"><HiArrowLeft size={30} className="ml-1" />Back to Home</Button>
            </Link>
          </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-12 my-8 mt-20 max-w-screen mb-15">
                    <div className="col-span-1 md:col-span-3 max-h-full max-w-full">
                        <div className="mt-15">
                            <ProductImages images={product.images} />
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <h1 className="text-2xl mb-10 md:text-4xl font-extrabold">{product.title}</h1>
                        <p>{product.description}</p>

                        <div className="flex py-5 mt-10 w-4/5">
                            <div className=" text-3xl mt-2 mr-5 font-extrabold text-left flex-grow">
                                € {product.price}
                            </div>
                            <div className="flex text-lg mb-5 mt-2 w-15 h-15 font-extrabold text-left flex-grow bg-black text-white rounded-lg" >
                                <Button
                                    block
                                    onClick={() => addProduct(product._id)}
                                    primary
                                    outline
                                >
                                    +Add
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    };
}
