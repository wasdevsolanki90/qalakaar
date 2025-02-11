import React from 'react';
import { client } from "@/lib/sanityClient";

const query = `
  *[_type=="aboutUsPage" && !(_id in path("drafts.**"))] {
      mainHeading,
      mainText,
      subHeading1,
      text1,
      subHeading2,
      text2,
      subHeading3,
      standForPoints,
      subHeading4,
      text4,
      subHeading5,
      text5,
      subHeading6,
      text6,
      text7,
      subHeading7,
    }
`;

interface AboutUsaboutUs {
    mainHeading: string,
    mainText: string,
    subHeading1: string,
    text1: string,
    subHeading2: string,
    text2: string,
    subHeading3: string,
    standForPoints: string[],
    subHeading4: string,
    text4: string,
    subHeading5: string,
    text5: string,
    subHeading6: string,
    text6: string,
    text7: string,
    subHeading7: string,
}

export default async function AboutUs() {
  // Fetch aboutUs with revalidation (ISR)
    const data = await client.fetch(query, undefined, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    const aboutUs: AboutUsaboutUs = data[0]; // Assuming there's only one policy document
    // console.log(aboutUs);
  
    if (!aboutUs) {
      return <div>No aboutUs found</div>;
    }
  
  return (
    <section className="px-6 pt-36 pb-20 bg-[#f5f5f5] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl text-center font-bold text-gray-800 mb-6">{aboutUs.mainHeading}</h1>
        <p className="text-lg text-gray-700 mb-6">
          {aboutUs.mainText}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{aboutUs.subHeading1}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {aboutUs.text1}
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{aboutUs.subHeading2}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {aboutUs.text2}
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{aboutUs.subHeading3}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {aboutUs.text2}
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{aboutUs.subHeading4}</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {aboutUs.standForPoints?.length > 0 ? (
              aboutUs.standForPoints.map((point: string, idx: number) => (
                <li key={idx} className="text-lg">{point}</li>
              ))
            ) : (
              <li className="text-lg">No points available.</li>
            )}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{aboutUs.subHeading5}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {aboutUs.text5}
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{aboutUs.subHeading6}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {aboutUs.text6}
          </p>
          <p className="text-lg text-gray-700 mb-6 font-semibold">
            {aboutUs.text7}
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{aboutUs.subHeading7}</h2>
        </div>
      </div>
    </section>
  );
}
