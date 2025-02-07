import React from "react";
import { 
    Mail,
    Phone,
} from "lucide-react";
import { client } from "@/lib/sanityClient";
import LeftCont from "./LeftCont";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";

const query = `
  *[_type=="contactUsPage" && !(_id in path("drafts.**"))] {
    bannerImage,
    contactFormHeading,
    mainHeading,
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
`

interface ContactUsData {
  bannerImage: IImage,
  contactFormHeading: string,
  mainHeading: string;
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

export default async function ContactUs() {
    // Fetch data with revalidation (ISR)
    const data = await client.fetch(query, undefined, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    const contactUsData: ContactUsData = data[0]; // Assuming there's only one policy document
    // console.log(contactUsData);
  
    if (!contactUsData) {
      return <div>No data found</div>;
    }
  
    const { bannerImage, contactFormHeading, mainHeading, introduction, sections } = contactUsData;

  return (
    <div>

      {/* Banner Section */}
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url('${urlForImage(bannerImage).url()}')` }}>
        <div className="flex items-center justify-center">
          {/* <h1 className="text-white text-5xl font-bold">Contact Us</h1> */}
        </div>
      </div>
      {/* Contact Section */}
      <section className="px-6 py-20 bg-gray-100">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Form */}
          <LeftCont heading={contactFormHeading} />

          {/* Right: Contact Information */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold mb-6">{mainHeading}</h2>
            <p className="text-lg text-gray-700 mb-4">
              {introduction}
            </p>
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
          </div>
        </div>
      </section>
    </div>
  );
}
