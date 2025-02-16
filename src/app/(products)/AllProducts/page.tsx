import React from "react";
import Product from "@/components/reusable/Product";
import { client } from "@/lib/sanityClient";
import { IProduct, getUserLocation, getPrice, getCurrencySymbol } from "@/lib/types";

// Sanity query for fetching products
const query = `
  *[_type=="product" && !(_id in path("drafts.**"))] {
    "slug":slug.current,
      price, 
      price_usd, 
      price_uae,
      _id,
      title,
      image,
      alt,
      category -> {
        name
      }
    }
`;

// **Main Server Component**
export default async function AllProducts() {

  const country = await getUserLocation();
  
  // Fetch products from Sanity
  const products: IProduct[] = await client.fetch(query, undefined, {
    next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
  });

  if (!products || products.length === 0) {
    return (
      <div className="px-6 pt-36 pb-20 text-white text-5xl text-center font-bold mb-10">
        No products found
      </div>
    );
  }

  return (
    <section className="px-6 pt-36 pb-20">
      <h1 className="capitalize text-white text-5xl text-center font-bold mb-10">
        Our Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-10">
        {products.map((product, index) => (
          <Product
            key={product._id + index}
            imgSrc={product.image}
            Currency={getCurrencySymbol(country)}
            productPrice={getPrice(product, country)}
            productName={product.title}
            productId={product._id}
            slug={product.slug}
          />
        ))}
      </div>
    </section>
  );
}
