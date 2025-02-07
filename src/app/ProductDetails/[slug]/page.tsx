import React from "react";
import { client } from "@/lib/sanityClient";
import { IProduct } from "@/lib/types";
import ProductDetailsComp from "@/components/reusable/ProductDetailsComp";

const createQuery = (slug: string) => `
  *[_type=="product" && slug.current=="${slug}" && !(_id in path("drafts.**"))] {
    slug,
    price, 
    _id,
    title,
    type,
    image,
    images[],
    description[], 
    about,
    frontDesign,
    backDesign,
    sizes[],
    colors[],
    careTips[],
    size[],
    length[],
    chest[],
    sleeve[],
    category -> {
      name
    }
  }
`;

const getProductData = async (slug: string) => {
  const data = await client.fetch(createQuery(slug), undefined, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (data && data[0]) {
    const product = data[0];
    console.log('Product: ', product); 
    // Ensure images array is valid and insert the main image at index 0
    product.images = Array.isArray(product.images)
      ? [product.image, ...product.images]
      : [product.image];
    return product;
  }

  return null;
};

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product: IProduct | null = await getProductData(params.slug);

  // If no product is found, return a fallback UI or redirect
  if (!product) {
    return (
      <div className="px-6 pt-36 pb-20 text-white text-5xl text-center font-bold mb-10">
        Product not found
      </div>
    );
  }
  
  return (
    <section className="px-6 pt-36 pb-20">
      <ProductDetailsComp product={product} />
    </section>
  );
}
