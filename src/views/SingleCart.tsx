import React from "react";
import ProductDetailsComp from "@/components/reusable/ProductDetailsComp";
import { client } from "@/lib/sanityClient";
import { IProduct } from "@/lib/types";

const getProductData = async () => {
    const res = await client.fetch(`*[_type=="product" && is_featured == true && !(_id in path("drafts.**"))] {
      "slug":slug.current,
        price, 
        _id,
        title,
        type,
        image,
        description,
        about,
        frontDesign,
        backDesign,
        sizes[],
        size[],
        length[],
        chest[],
        sleeve[],
        images[],
        colors[],
        careTips[],
        category -> {
          name
        }
      }`);
      
      if (res && res.length > 0) {
        // Update each product to include the main image at index 0 in the images array
        return res.map((product: IProduct) => ({
          ...product,
          images: Array.isArray(product.images)
            ? [product.image, ...product.images]
            : [product.image],
        }));
      }
    
      return []; // Return an empty array if no products are found
};

export default async function SingleCart() {
    const data: IProduct[] = await getProductData();
    if (!data) {
      return (
        <section className="px-6 py-20">
          <h1 className="text-center text-xl text-white">
            No featured product found.
          </h1>
        </section>
      );
    }
    return (
    <section className="px-6 py-20">
        <h1 className="flex justify-center capitalize text-4xl text-white text-left font-semibold mb-10">
            FEATURED PRODUCTS
        </h1>
        <div className="mb-10">
          {
            data[0] && 
            <ProductDetailsComp product={data[0]} />
          }
        </div>
        <div className="">
          {
            data[1] && 
            <ProductDetailsComp product={data[1]} />
          }
        </div>
    </section>
    );
}