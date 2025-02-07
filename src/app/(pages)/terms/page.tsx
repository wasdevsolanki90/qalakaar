import React from 'react';
import { client } from "@/lib/sanityClient";

const query = `
  *[_type == "termsPage" && !(_id in path("drafts.**"))] {
    mainHeading,
    lastUpdateddate,
    introduction,
    sections[] {
      title,
      content[] {
        ...,
        _type == "listItem" => {
          text
        }
      }
    }
  }
`;

interface TermsData {
  mainHeading: string;
  lastUpdateddate: string;
  introduction: string;
  sections: {
    title: string;
    content: {
      _type: string;
      text?: string;
      children?: { text: string }[];
    }[];
  }[];
}

export default async function Terms() {
  // Fetch data with revalidation (ISR)
  const data = await client.fetch(query, undefined, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  const termsData: TermsData = data[0]; // Assuming there's only one policy document
  // console.log(termsData);

  if (!termsData) {
    return <div>No data found</div>;
  }

  const { mainHeading, lastUpdateddate, introduction, sections } = termsData;
  
  return (
    <section className="px-6 pt-36 pb-20 bg-[#f5f5f5] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl text-center font-bold text-gray-800 mb-6">{mainHeading}</h1>
        <p className="text-lg text-gray-600 mb-6">Last Updated: <span className="font-medium">[{lastUpdateddate}]</span></p>

        <p className="text-lg text-gray-700 mb-6">
          {introduction}
        </p>

        <hr className="my-6 border-gray-300" />

        {/** Section Component */}
        {sections && sections.length > 0 && sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{index + 1}. {section.title}</h2>
          <div className="space-y-2">
            {section.content.map((item, idx) =>
              item._type === 'listItem' ? (
                <li key={idx} className="list-disc ml-6 text-lg">{item.text}</li>
              ) : (
                <p key={idx} className="text-lg">{item.children?.map(child => child.text).join(' ')}</p>
              )
            )}
          </div>
        </div>
      ))}

        {/* <hr className="my-6 border-gray-300" /> */}

        <div className="text-gray-700 text-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">17. Contact Us</h2>
          <p>
            For any questions or concerns regarding these Terms and Conditions, feel free to reach out:
          </p>
          <ul className="list-none mt-2">
            <li>Email: <a href="mailto:info@qalaakar.com" className="text-blue-500 underline">info@qalaakar.com</a></li>
            <li>Website: <a href="https://www.qalaakar.com" className="text-blue-500 underline">www.qalaakar.com</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
