import React  from "react";
import { client } from "@/lib/sanityClient";
import Tabs from "./Tabs";

const getProductData = async () => {
  const query = `
    {
      "newReleases": *[_type=="product" && is_new_release == true && !(_id in path("drafts.**"))] {
        "slug":slug.current,
        price, 
        _id,
        title,
        image,
        alt,
        category -> { name }
      },
      "bestSellers": *[_type=="product" && is_best_seller == true && !(_id in path("drafts.**"))] {
        "slug":slug.current,
        price, 
        _id,
        title,
        image,
        alt,
        category -> { name }
      },
      "premiumTees": *[_type=="product" && is_premium_tee == true && !(_id in path("drafts.**"))] {
        "slug":slug.current,
        price, 
        _id,
        title,
        image,
        alt,
        category -> { name }
      },
      "standardTees": *[_type=="product" && is_standard_tee == true && !(_id in path("drafts.**"))] {
        "slug":slug.current,
        price, 
        _id,
        title,
        image,
        alt,
        category -> { name }
      }
    }
  `;
  const res = await client.fetch(query);
  return res;
};


export default async function MultipleCollections() {
  const data = await getProductData();
  // console.log(data)

  return (
    <section className="mb-14 px-6 py-0" id="products">
      <Tabs data={data}/>
      {/* <div className="flex justify-center my-5">
        <p className="text-center text-lg sm:text-xl lg:text-2xl border-b-2 text-white border-gray-300 inline-block tracking-widest animate-[pulse_2s_ease-in-out_infinite] select-none">
          SWIPE TO EXPLORE
        </p>
      </div> */}
    </section>
  );
}
