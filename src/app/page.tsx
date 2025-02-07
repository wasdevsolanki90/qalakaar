import Hero from "@/views/Hero";
import OurCollections from "@/views/OurCollections";
import MultipleCollections from "@/views/MultipleCollections";
import ImageDivs from "@/views/ImageDivs";
import SingleCart from "@/views/SingleCart";
import Banner from "@/views/Banner";
import Qalakaar from "@/views/Qalakaar";

export default async function Home() {
  return (
    <>
      <Hero />
      <Qalakaar />
      <OurCollections />
      <Banner />
      <MultipleCollections />
      <ImageDivs />
      <SingleCart />
    </>
  );
}
