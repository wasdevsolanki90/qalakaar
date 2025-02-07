import React from 'react'
import Image from "next/image";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";

const query = `*[_type=="general" && type=="Wear your art image" && !(_id in path("drafts.**"))] {
      image
    }`

export default async function Qalakaar() {
  // Fetch data with revalidation (ISR)
  const data = await client.fetch(query, undefined, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  const qalaakarImage: IImage = data[0].image; // Assuming there's only one policy document
  return (
    <section className="flex justify-center items-center mt-0 mb-14">
        <Image 
            src={urlForImage(qalaakarImage).url()}
            alt="qalkaar banner"
            className="w-full h-1/5"
            width={600}
            height={600}
        />
    </section>
  )
}
