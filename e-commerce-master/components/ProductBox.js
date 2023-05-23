import Button from "./Button";
import { HiShoppingCart } from 'react-icons/hi';
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + _id;

  return (
    <div className="flex flex-col items-center bg-gray-100 bg-opacity-40 p-4 rounded-lg border border-gray-400">
      <Link href={url}>
        <div className="bg-white h-32 max-w-full flex items-center justify-center rounded-lg">
          <img className="max-w-full max-h-20" src={images?.[0]} alt="" />
        </div>
      </Link>
      <div className="mt-2 flex flex-col items-center w-full">
        <Link href={url}>
          <div className="font-bold text-md mt-5 text-black hover:text-gray-700 text-center">
            {title}
          </div>
        </Link>
        <div className="flex items-center justify-between ml-0 mt-10 w-full">
          <div className="text-base font-bold text-left flex-grow">
          € {price}
          </div>
          <div className="flex items-center">
            <Button
              block
              onClick={() => addProduct(_id)}
              primary
              outline
              className="flex items-center"
            >
              <HiShoppingCart size={30} className="ml-0" />
            </Button>
           
          </div>
        </div>
      </div>
    </div>
  );
}