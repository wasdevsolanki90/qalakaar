'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";
import { IProduct, getUserLocation, getPrice, getCurrencySymbol } from "@/lib/types";
import { client } from "@/lib/sanityClient";

export default function Product({
  imgSrc,
  productName,
  productPrice,
  productId,
  slug,
  Currency,
}: {
  imgSrc: any;
  productName: string;
  productPrice: number;
  productId: string;
  slug: string;
  Currency: string;
}) {

  const [price, setPrice] = useState<number | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {

    // Avoid re-fetching
    if (fetched.current) return; 
    fetched.current = true;

    const fetchCountry = async () => {
      try {
        const userCountry = await getUserLocation();
        setCountry(userCountry);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };
    

    fetchCountry();
  }, []);

  useEffect(() => {
    if (!country) return;

    client
      .fetch(
        `*[_type=="product" && _id == "${productId}"] {
      price, 
      price_usd, 
      price_uae,
      _id,
      title,
      type,
      image,
      description,
      sizes[],
      category -> {
        name
      }
    }`
      )
      .then((res) => {
        return res;
      })
      .then((data) => {
        setPrice(getPrice(data[0], country));
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [country]);

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
        <p className="text-lg text-white font-bold">{getCurrencySymbol(country)}  {price !== null ? price.toFixed(2) : ''}</p>
      </div>
    </Link>
  );
}
