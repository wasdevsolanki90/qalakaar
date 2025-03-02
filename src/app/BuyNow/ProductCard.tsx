import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { client } from '@/lib/sanityClient';
import { IProduct, getUserLocation, getPrice, getCurrencySymbol } from "@/lib/types";
import { urlForImage } from "../../../sanity/lib/image";

export default function ProductCard(props: {
  product_id: string;
  quantity: number;
  size: string;
  color: string;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}) {
  
    const [product, setProduct] = useState<IProduct[]>();
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

        // if(!country) {
        //   const fetchCountry = async () => {
        //     try {
        //       const res = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=6a12a8b094a94b72bd6e761d959f064a", { cache: "no-store" });
        //       const data = await res.json();
        //       console.log(data.country_code2);
        //     } catch (error) {
        //       console.error("Error fetching country:", error);
        //     }
        //   };
      
        //   fetchCountry();
        // }
        if (!country) return;

        client
          .fetch(
            `*[_type=="product" && _id == "${props.product_id}"] {
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
          .then((res) => res)
          .then((data) => {
            setProduct(data);
            if (data) {
              // props.setTotalPrice((prevTotal: number) => { 
                
              //   const price = getPrice(data[0], country);
              //   if(!price) {
              //     return prevTotal; 
              //   }

              //   return price * props.quantity + prevTotal; 
              // });
              props.setTotalPrice((prevTotal: number) => {

                // if(country == 'US') {
                //   return data[0].price_usd * props.quantity + prevTotal;
                // } else if( country == 'AE') {
                //   return data[0].price_uae * props.quantity + prevTotal;
                // } else {
                //   return data[0].price * props.quantity + prevTotal;
                // }

                if(country == 'PK') {
                  return data[0].price * props.quantity + prevTotal;
                } else if( country == 'AE') {
                  return data[0].price_uae * props.quantity + prevTotal;
                } else {
                  return data[0].price_usd * props.quantity + prevTotal;
                }

              });
            }
          })
          .catch((error) => {
            console.log("Error fetching data:", error);
          });
      }, [props.product_id, country]);

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
        <p>{getCurrencySymbol(country)} {getPrice(product[0], country).toFixed(2)}</p>
      </div>
    )}
}
