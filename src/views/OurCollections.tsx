import React from "react";
import { client } from "@/lib/sanityClient";
import { urlForImage } from "../../sanity/lib/image";
// import Product from "@/components/reusable/Product";
import { IProduct } from "@/lib/types";
// import { Carousel } from "@trendyol-js/react-carousel";
import CarouselProducts from "@/components/reusable/CarouselProducts";

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product" && is_main == true && !(_id in path("drafts.**"))] {
    "slug":slug.current,
      price, 
      _id,
      title,
      image,
      alt,
      category -> {
        name
      }
    }`);
  return res;
};

export default async function OurCollections() {
  const data: IProduct[] = await getProductData();

  return (
    <section className="mb-14 px-6 py-0" id="products">
      <h1 className="capitalize text-2xl sm:text-3xl lg:text-4xl text-white text-left font-semibold mb-10">
        EXPLORE OUR COLLECTIONS
      </h1>

      <div className="w-full overflow-x-auto pb-10 pt-1 scrollbar-hide">
        <ul className="flex gap-12 transition-transform duration-300"> {/* animate-carousel */}
          {data[0] &&
            data.map((product, i) => (
              <CarouselProducts
                key={product._id}
                imgSrc={urlForImage(product.image).url()}
                productName={product.title}
                productPrice={product.price}
                productId={product._id}
                slug={product.slug}
              />
            ))}
        </ul>
      </div>
      {/* <div className="flex justify-center my-2">
        <p className="text-center text-lg sm:text-xl lg:text-2xl border-b-2 text-white border-gray-300 inline-block tracking-widest animate-[pulse_2s_ease-in-out_infinite] select-none">
          SWIPE TO EXPLORE
        </p>
      </div> */}
    </section>
  );
}
