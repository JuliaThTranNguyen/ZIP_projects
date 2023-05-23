import Header from "../components/header";
import Featured from "../components/featured";
import connectToMongoDB from "../database/database";
import Product from "../models/Product";
import NewProducts from "../components/NewProducts";

export default function HomePage({ featuredProduct,newProducts }) {
  console.log(newProducts );

  return (
    <main>
      <title>Juju App</title>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts} />
    </main>
  )
}



export async function getServerSideProps() {
  const featuredProductId = '646613ff1172d694eb74a754';
  const connection = await connectToMongoDB();
  const Product = connection.model('Product'); // Assuming 'Product' is your Mongoose model name
  const featuredProduct = await Product.findById(featuredProductId).lean();
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      
    },
  };
}
