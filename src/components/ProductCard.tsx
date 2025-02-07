"use client";

import { Image as IImage } from "sanity";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import { FC } from "react";

interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: IImage;
  alt: string;
  category: string;
}

const ProductCard: FC<{ product: IProduct }> = ({ product }) => {
  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: product.id,
      }),
    });
    const result = await res.json();
    // console.log(result);
  };
  return (
    <>
      <Image
        src={urlForImage(product.image).url()}
        width={400}
        height={400}
        className="max-h-[400px] object-cover"
        alt={product.alt}
      />
      <h2>{product.title}</h2>
      <h3>{product.price} Rs</h3>
      <button
        onClick={handleAddToCart}
        className="border py-2 px-6 rounded-md bg-blue-600 text-white text-lg"
      >
        Add to Cart
      </button>
    </>
  );
};

export default ProductCard;
