import React from "react";
import Image from "next/image";
import Prom1 from "/public/images/prom1.webp";
import Prom2 from "/public/images/prom2.webp";
import Prom3 from "/public/images/prom3.webp";

export default function Promotions() {
  return (
    <section className="mb-32 px-6 py-0">
      <h3 className="uppercase text-base text-center mb-2 text-white font-semibold">
        Promotions
      </h3>
      <h1 className="capitalize text-4xl text-center text-white font-semibold mb-10">
        our promotions events
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="grid lg:col-span-2 gap-4">
          <div className="bg-[#d6d6d8] flex flex-col md:flex-row justify-between items-center">
            <div className="text-center mx-4">
              <h1 className="uppercase text-3xl font-bold mt-4 md:mt-0">
                get upto <span className="text-4xl">60%</span>
              </h1>
              <p className="text-lg">For the summer season</p>
            </div>
            <Image
              className="h-auto max-w-full rounded-lg mx-auto self-end"
              src={Prom1}
              alt=""
            />
          </div>
          <div className="bg-[#212121] text-white uppercase text-center py-10 space-y-2">
            <h2 className="text-3xl md:text-5xl">Get 30% off</h2>
            <p>use promo code</p>
            <button className="bg-[#474747] text-white text-xl py-2 px-6 md:px-10 uppercase rounded-[8px]">
              dineweekwndsale
            </button>
          </div>
        </div>
        <div className="grid lg:col-span-2 grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#efe1c7] flex flex-col justify-between">
            <div className="my-6 mx-8 text-lg">
              <p>Flex T-Shirt</p>
              <p className="font-semibold">
                <span className="line-through font-normal">$100.00</span> $75.00
              </p>
            </div>
            <Image
              className="self-center max-w-full h-auto"
              src={Prom2}
              alt="Flex Sweatshirt Image"
            />
          </div>
          <div className="bg-[#d7d7d9] flex flex-col">
            <div className="my-6 mx-8 text-lg">
              <p>Flex Push Button Bomber</p>
              <p className="font-semibold">
                <span className="line-through font-normal">$225.00</span>{" "}
                $190.00
              </p>
            </div>
            <Image
              className="self-center max-w-full h-auto"
              src={Prom3}
              alt="Flex Push Button Bomber image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
