import Header from "../components/header";
import Center from "../components/center";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import axios from "axios";
import Table from "../components/Table";
import Input from "../components/Input";
import Link from "next/link";
import { HiChevronRight } from 'react-icons/hi';

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(
    CartContext
  );
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart(); // Use clearCart from CartContext
    }
  }, [clearCart]); // Add clearCart as a dependency

  
  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }


  if (isSuccess) {
    return (
      <>
        <title>Cart</title>
        <Header />
        <Center>
          <div className="grid gap-4 md:grid-cols-2 ml-10 mt-10">
            <div className="bg-white rounded p-6">
              <h1 className="text-2xl font-bold">Thanks for your order!</h1>
              <p className="mt-4">
                We will email you when your order will be sent.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Link href="/" >
                <Button outline className="flex">Continue to Shop <HiChevronRight size={20} className="ml-1" /></Button>
              </Link>
            </div>

          </div>

        </Center>
      </>
    );
  }


  return (
    <>
      <title>Cart</title>
      <Header />
      <Center>
        <div className="grid gap-4 md:grid-cols-2 ml-10 mt-10">
          <div className="bg-white rounded p-6 md:w-7/10">
            <h2 className="text-2xl font-bold">Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table className="mt-10 font-bold ">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>
                      <p className="ml-2">Quantity</p>
                    </th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody className="text-sm ">
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="items-center">
                        <div className="w-16 h-16 mr-1 mt-5">
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {product.title}
                      </td>
                      <td className="">
                        <div className="flex mr-10 items-center">
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}
                            outline
                            className="mr-2"
                          >
                            -
                          </Button>
                          <span className="">
                            {cartProducts.filter((id) => id === product._id)
                              .length}
                          </span>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                            outline
                            className="ml-2"
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="">
                        €
                        {cartProducts.filter((id) => id === product._id).length *
                          product.price}
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td className="pt-10 text-lg">Total Price:</td>
                    <td></td>
                    <td className="pt-10 text-lg">€{total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>

          {!!cartProducts?.length && (
            <div className="bg-white rounded p-6 md:w-3/10">
              <h2 className="text-2xl font-bold">Order information</h2>
              <div className="grid grid-cols-2 gap-4 mt-10">
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
                className="mt-4"
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
                className="mt-4"
              />
              <Button
                black
                block
                onClick={goToPayment}
                className="mt-4"
              >
                Continue to checkout
              </Button>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Link href="/" >
              <Button outline className="flex">Continue to Shop <HiChevronRight size={20} className="ml-1" /></Button>
            </Link>
          </div>
        </div>
      </Center>
    </>
  );
}