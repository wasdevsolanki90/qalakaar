import React from 'react';
import Image from "next/image";
import { client } from "@/lib/sanityClient";
import { urlForImage } from "../../sanity/lib/image";
import { Image as IImage } from "sanity";

export interface HomeImage {
    type: string,
    image: IImage,
}

const query = `
*[_type=="general" && type=="Banner" && !(_id in path("drafts.**"))] {
        image,
        type
      }
`;

export default async function Banner() {
  // Fetch aboutUs with revalidation (ISR)
  const data = await client.fetch(query, undefined, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  const bannerData: HomeImage = data[0]; // Assuming there's only one policy document
  // console.log(bannerData);

  if (!bannerData) {
    return <div className="px-6 pt-36 pb-20 text-white text-5xl text-center font-bold mb-10">No banner data found</div>;
  }

  return (
    <section className="relative w-full mb-10">
      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={urlForImage(bannerData.image).url()}
          alt="banner"
          layout="fill"
          objectFit="cover" // Ensures the image scales properly
          quality={100}
          className="absolute inset-0"
        />
      </div>
    </section>
  );
}
