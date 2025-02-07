import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook,
         Instagram,
         Mail,
         Phone,
} from "lucide-react";
import { client } from "@/lib/sanityClient";

const query = `*[_type=="general" && type=="Footer text" && !(_id in path("drafts.**"))] {
      text
    }`

export default async function Footer() {
    // Fetch data with revalidation (ISR)
    const data = await client.fetch(query, undefined, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    const footerText: { text:string } = data[0];
    // console.log(footerText);
  return (
    <footer className="px-6 py-20 bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0">
        <div className="grid gap-y-4 mr-20">
          <Link href={"/"}>
            <Image src={"/images/qalakaar-logo.png"} width={150} height={150} alt="Logo" />
          </Link>
          <p className="text-lg">
            {footerText?.text || "Footer text"}
          </p>
          <div className="flex">
            <Link target="_blank" href="https://www.facebook.com/qalaakar.official">
              <div className="p-2 mr-4 rounded-xl bg-black text-white hover:scale-105 duration-200">
                <Facebook className="w-6 h-6" />
              </div>
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/qalaakar.official/profilecard/?igsh=MTF6Y2R0b3FyYnN6dg=="
            >
              <div className="p-2 mr-4 rounded-xl bg-black text-white hover:scale-105 duration-200">
                <Instagram className="w-6 h-6" />
              </div>
            </Link>
            <Link
              target="_blank"
              href="mailto:info@qalaakar.com"
            >
              <div className="p-2 mr-4 rounded-xl bg-black text-white hover:scale-105 duration-200">
                <Mail className="w-6 h-6" />
              </div>
            </Link>
            <Link
              target="_blank"
              href="https://wa.me/03462326463 "
            >
              <div className="p-2 mr-4 rounded-xl bg-black text-white hover:scale-105 duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="0"
                className="w-6 h-6"
              >
                <path
                  fill="currentColor"
                  d="M16.03 0C7.173 0 .001 7.175.001 16c0 2.828.741 5.59 2.144 8.002L.013 32l8.167-2.11a15.957 15.957 0 0 0 7.85 1.99C24.9 31.88 32 24.708 32 15.99 31.999 7.177 24.857 0 16.03 0Zm.03 29.25c-2.599 0-5.133-.683-7.357-1.97l-.526-.31-4.851 1.252 1.273-4.732-.341-.585c-1.282-2.22-1.952-4.762-1.952-7.254C2.276 8.282 8.31 2.251 16.06 2.25c7.748 0 13.774 6.032 13.776 13.739 0 7.682-6.109 13.762-13.776 13.762Zm7.716-10.009c-.425-.212-2.512-1.243-2.9-1.387-.388-.145-.671-.212-.955.213-.276.418-1.098 1.386-1.347 1.668-.248.282-.497.318-.922.106-.425-.212-1.795-.662-3.42-2.11-1.265-1.126-2.12-2.516-2.37-2.94-.248-.424-.026-.654.19-.865.194-.191.425-.497.637-.745.212-.25.283-.425.425-.71.141-.283.071-.532-.035-.745-.106-.213-.955-2.294-1.31-3.135-.345-.832-.694-.719-.955-.732l-.815-.014c-.276 0-.725.106-1.1.532-.361.424-1.41 1.38-1.41 3.363 0 1.982 1.442 3.894 1.64 4.165.212.283 2.819 4.3 6.827 6.03.954.41 1.694.654 2.276.838a5.478 5.478 0 0 0 2.445.16c.747-.113 2.312-.945 2.64-1.854.33-.91.33-1.694.23-1.855-.099-.16-.387-.259-.812-.47Z"
                />
              </svg>              
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-y-0">
          {/* Centered Single Heading */}
          <h3 className="col-span-full text-2xl lg:text-3xl font-bold mb-4">
            How to reach us?
          </h3>
          <ul className="space-y-3 text-base">
            <li>
              <Link href={`/aboutUs`}>About Us</Link>
            </li>
            <li>
              <Link href={"/shippingPolicy"}>Shipping Policy</Link>
            </li>
            <li>
              <Link href={"/returnPolicy"}>Return & Refund Policy</Link>
            </li>
            <li>
              <Link href={"/contactUs"}>Contact Us</Link>
            </li>
            <li>
              <Link href={"/privacyPolicy"}>Privacy Policy</Link>
            </li>
            <li>
              <Link href={"/terms"}>Terms of Services</Link>
            </li>
          </ul>
          <ul className="space-y-3 text-base">
            <li>
              <div className="flex items-center gap-x-2 text-white">
                <Phone className="w-5 h-5"/>03462326463
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2 text-white">
                <Mail className="w-5 h-5" /> info@qalaakar.com
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
