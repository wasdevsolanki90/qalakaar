import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { client } from '@/lib/sanityClient';
import { IProduct } from '@/lib/types';
import { urlForImage } from "../../../sanity/lib/image";

export default function ProductCard(props: {
  product_id: string;
  quantity: number;
  size: string;
  color: string;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}) {
  
    const [product, setProduct] = useState<IProduct[]>();
      useEffect(() => {
        client
          .fetch(
            `*[_type=="product" && _id == "${props.product_id}"] {
          price, 
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
          .then((res) => res)
          .then((data) => {
            setProduct(data);
            if (data) {
              props.setTotalPrice(
                (prevTotal: number) => data[0].price * props.quantity + prevTotal
              );
            }
          })
          .catch((error) => {
            console.log("Error fetching data:", error);
          });
      }, [props.product_id]);

if (product) {
    return (
      <div key={props.product_id} className="flex justify-between rounded-md shadow-md p-2">
        <div className="flex gap-x-2">
            <Image
                    src={urlForImage(product[0].image).url()}
                    alt="product1"
                    width={400}
                    height={400}
                    className="w-16 h-16 rounded-lg"
                />
            <div>
                <p>{product[0].title}</p>
                <p>Size: {props.size}, Color: {props.color}, Quantity: {props.quantity}</p>
            </div>
        </div>
        <p>PKR {product[0].price}</p>
      </div>
    )}
}
