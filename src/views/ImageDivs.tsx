import React from 'react';
import { client } from "@/lib/sanityClient";
import { urlForImage } from "../../sanity/lib/image";
import { Image as IImage } from "sanity";
import clsx from "clsx";

export interface HomeImage {
    type: string,
    position: number,
    mainHeading: string,
    text: string,
    image: IImage,
}

const getBoxImages = async () => {
    const res = await client.fetch(`*[_type=="general" && type=="Box" && !(_id in path("drafts.**"))] {
        image,
        type,
        position,
        mainHeading,
        text
      }`);
    return res;
};

export default async function ImageDivs() {
  const images: HomeImage[] = await getBoxImages();

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {images.map((imageData: HomeImage, index: number) => (
          <div
            key={index}
            className="relative w-full h-[50vh] md:h-screen bg-cover bg-center flex items-center justify-center text-white"
            style={{
              backgroundImage: `url(${urlForImage(imageData.image).url()})`,
            }}
          >
            <div
              className={clsx("", {
                "absolute inset-0 bg-black bg-opacity-30": imageData.mainHeading,
              })}
            ></div>
            <div className="relative bg-opacity-40 p-6 sm:p-10 md:p-20 rounded">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                {imageData.mainHeading}
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-lg">
                {imageData.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

  );
};
