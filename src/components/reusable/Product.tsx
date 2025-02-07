import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";

export default function Product({
  imgSrc,
  productName,
  productPrice,
  productId,
  slug,
}: {
  imgSrc: any;
  productName: string;
  productPrice: number;
  productId: string;
  slug: string;
}) {
  return (
    <Link href={`/ProductDetails/${slug}`}>
      <div className="group">
        <Image
          src={urlForImage(imgSrc).url()}
          alt={productName}
          width={500}
          height={500}
          className="object-cover object-center h-[400px] w-full mb-2 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
        />
        <h3 className="text-lg text-white font-semibold">{productName}</h3>
        <p className="text-lg text-white font-bold">PKR {productPrice}</p>
      </div>
    </Link>
  );
}
