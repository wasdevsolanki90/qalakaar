"use client"; 

import React, { useState } from 'react';
import { IProduct } from '@/lib/types';
import CarouselProducts from "@/components/reusable/CarouselProducts";
import { urlForImage } from "../../sanity/lib/image";

export default function Tabs({ data }: { data: { [key: string]: IProduct[] } }) {
  const tabs = ["NEW RELEASES", "BEST SELLERS", "PREMIUM TEES", "STANDARD TEES"];
  const [activeTab, setActiveTab] = useState(0); // Default to the first tab

  // // Helper function to rotate the products array
  // const rotateArray = (arr: IProduct[], positions: number): IProduct[] => {
  //   return [...arr.slice(positions), ...arr.slice(0, positions)];
  // };

  // // Rotate the data based on the activeTab
  // const rotatedData = rotateArray(data, activeTab);

  // Determine which category to display based on the active tab
  const categories = ["newReleases", "bestSellers", "premiumTees", "standardTees"];
  const activeCategory: string = categories[activeTab];
  const products: IProduct[] = data[activeCategory] || [];

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 justify-center">
        {tabs.map((tab, index) => (
          <div 
            key={index} 
            className="relative group cursor-pointer"
            onClick={() => setActiveTab(index)}
          >
            <h1
              className={`capitalize text-lg sm:text-3xl lg:text-4xl font-semibold mb-10 relative w-max ${
                activeTab === index ? "text-red-500" : "text-white"
              }`}
            >
              {tab}
              <span
                className={`absolute -bottom-2 left-0 h-0.5 bg-red-500 transition-transform duration-300 ease-in-out ${
                  activeTab === index ? "w-full scale-x-100" : "w-0 scale-x-0"
                }`}
              ></span>
            </h1>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto pb-10 pt-1 scrollbar-hide">
        <ul className="flex gap-10">
          {products.length > 0 ? (
            products.map((product) => (
              <CarouselProducts
                key={product._id}
                imgSrc={urlForImage(product.image).url()}
                productName={product.title}
                productPrice={product.price}
                productId={product._id}
                slug={product.slug}
              />
            ))
          ) : (
            <p className="text-base sm:text-xl lg:text-2xl text-white text-center w-full">No {tabs[activeTab].toLowerCase()} available right now.</p>
          )}
        </ul>
      </div>
    </>
  );
}
