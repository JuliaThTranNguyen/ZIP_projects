import Center from "./center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { HiShoppingCart, HiChevronRight } from 'react-icons/hi';
import {useContext} from "react";
import {CartContext} from "./CartContext";

export default function Featured({ product }) {
  const {addProduct} = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <div className="bg-black p-1 mt-1 mb-1 rounded text-white py-8">
      <Center>
        <div className="grid gap-8 md:grid-cols-2 ml-10">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl mb-10 mt-10 md:text-4xl font-extrabold">
                {product.title}
              </h1>
              <p className="text-md font-extrabold text-gray-400 mt-15">{product.description}</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mt-10 mb-10">
              <ButtonLink
                href={'/product/'+product._id}
                outline={1}
                white={1}
                className="text-white border border-white rounded px-4 py-2 flex items-center mb-4 md:mb-0"
              >
                Product details <HiChevronRight size={20} className="ml-1" />
              </ButtonLink>
              <Button
                white
                className="bg-white text-black w-auto flex items-center px-4 py-2 rounded"
                onClick={addFeaturedToCart}
              >
                Add to cart <HiShoppingCart size={20} className="ml-2" />
              </Button>
            </div>
          </div>
          <div>
            <img
              src="https://sm.ign.com/ign_ap/deal/d/deal-alert/deal-alert-price-drop-on-the-new-2023-apple-macbook-pro-14-l_fya1.jpg"
              alt=""
              className="max-w-full"
            />
          </div>
        </div>
      </Center>
    </div>
  );
}