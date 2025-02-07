import React from "react";
import { BadgeCheck, HeadphonesIcon, Undo2Icon, Truck } from "lucide-react";


export default function Policy() {
  return (
    <section className="font-sans grid grid-cols-1 md:grid-cols-4 gap-10 mb-0 px-6 py-20 bg-[#D7D7D7]">
        <div className="flex flex-col justify-center items-center text-black">
            <HeadphonesIcon className='w-10 h-10 text-black mb-5' />
            <h3 className="text-xl text-center font-semibold">Support 24/7</h3>
            <p className="text-base text-center text-gray-800">Contact us 24 hours a day 7 days a week</p>
        </div>
        <div className="flex flex-col justify-center items-center text-black">
            <Undo2Icon className='w-10 h-10 text-black mb-5' />
            <h3 className="text-xl text-center font-semibold">Hassle Free Exchange</h3>
            <p className="text-base text-center text-gray-800">Smooth and convenient exchange experience</p>
        </div>
        <div className="flex flex-col justify-center items-center text-black">
            <BadgeCheck className='w-10 h-10 text-black mb-5' />
            <h3 className="text-xl text-center font-semibold">Top Notch Craftsmanship</h3>
            <p className="text-base text-center text-gray-800">Premium Fabrics, Timeless Artistry</p>
        </div>
        <div className="flex flex-col justify-center items-center text-black">
            <Truck className='w-10 h-10 text-black mb-5' />
            <h3 className="text-xl text-center font-semibold">Free Shipping Nationwide</h3>
            <p className="text-base text-center text-gray-800">We provide free shipping across Pakistan at no additional cost</p>
        </div>
    </section>
  )
}
