import { mongooseConnect } from "../../database/mongoose";
import { Product } from "../../models/Product";
import { Order } from "../../models/Order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;
  
  await mongooseConnect();
  
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  let total = 0; // Initialize total price

  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity =
      productsIds.filter((id) => id === productId)?.length || 0;
      
    if (quantity > 0 && productInfo) {
      const productPrice = productInfo.price ; // Calculate product price
      total += productPrice; // Update total price

      line_items.push({
        quantity,
        price_data: {
          currency: "EUR",
          product_data: { name: productInfo.title },
          unit_amount: Math.round(productPrice * 100),
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  res.json({
    url: session.url,
    total: total.toFixed(2), // Return the total price to the client
  });
}

// fake card :
// 4242424242424242