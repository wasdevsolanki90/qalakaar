
import { client } from "@/lib/sanityClient";

const query = `
  *[_type == "privacyPolicyPage" && !(_id in path("drafts.**"))] {
    mainHeading,
    effectiveDate,
    introduction,
    sections[] {
      title,
      content[] {
        ...,
        _type == "listItem" => {
          text
        }
      }
    },
  }
`;

interface privacyPolicyData {
  mainHeading: string;
  effectiveDate: string;
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

export default async function PrivacyPolicyPage() {
  // Fetch data with revalidation (ISR)
  const data = await client.fetch(query, undefined, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  const policyData: privacyPolicyData = data[0]; // Assuming there's only one policy document
  // console.log(policyData);

  if (!policyData) {
    return <div>No data found</div>;
  }

  const { mainHeading, effectiveDate, introduction, sections } = policyData;

  return (
    <section className="px-6 pt-36 pb-20 bg-[#f5f5f5] min-h-screen">
    <div className="max-w-4xl mx-auto  px-6">
      <h1 className="text-4xl text-center font-bold mb-4">{mainHeading}</h1>
      <p className="text-lg mb-4">Effective Date: [{effectiveDate}]</p>
      <p className="mb-6 text-lg">{introduction}</p>

      {sections && sections.length > 0 && sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
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

      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Contact Us</h3>
        <p className="text-lg">If you have any questions or concerns about our Return and Exchange Policy, feel free to reach out:</p>
        <p>Email: <a href={`mailto:info@qalaakar.com`} className="text-blue-600 underline text-lg">info@qalaakar.com</a></p>
        <p>Website: <a href={"www.qalaakar.com"} className="text-blue-600 underline text-lg">www.qalaakar.com</a></p>
      </div>
    </div>
    </section>
  );
};