import React from "react";
import Product from "@/components/reusable/Product";
import { client } from "@/lib/sanityClient";
import { IProduct,  getUserLocation, getPrice, getCurrencySymbol } from "@/lib/types";

const query = `
*[_type=="product" && category->name == 'Women' && !(_id in path("drafts.**"))] {
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
    }`;

export default async function FemaleProducts() {
 
  const country = await getUserLocation();
  
  // Fetch aboutUs with revalidation (ISR)
  const data = await client.fetch(query, undefined, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  const products: IProduct[] = data; // Assuming there's only one policy document
  // console.log(aboutUs);

  if (!products) {
    return <div className="px-6 pt-36 pb-20 text-white text-5xl text-center font-bold mb-10">No products found</div>;
  }
  return (
    <section className="px-6 pt-36 pb-20">
      <h1 className="capitalize text-white text-5xl text-center font-bold mb-10">
        Women&apos;s Collection
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-10">
          {products.map((product, index) => (
              <Product
                key={product._id + index}
                imgSrc={product.image}
                productName={product.title}
                Currency={getCurrencySymbol(country)}
                productPrice={getPrice(product, country)}
                productId={product._id}
                slug={product.slug}
              />
          ))}
        </div>
      ) : (
        <h2 className=" text-white text-4xl font-semibold">No products available.</h2>
      )}
    </section>
  );
}
