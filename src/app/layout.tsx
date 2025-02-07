import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { CartProvider } from "@/components/context/CartContext";
import { Product } from "@/lib/types";
import Policy from "@/views/Policy";

import localFont from 'next/font/local'
 
const myFont = localFont({
  src: "./fonts/00260-Regular.ttf",
  display: 'swap',
})


export const metadata = {
  title: "Qalaakar",
  description: "Your one-stop solution for clothing.",
};

async function getData() {
  let user_id = cookies().get("user_id")?.value;

  if (user_id) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?user_id=${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch data");
      const products = await res.json();
 
      return products;
    } catch (error) {
      console.log("error: ", error);
    }
  } else {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let products: Product[] = await getData();
  let totalQuantity = 0;
  if (products) {
    totalQuantity = products.reduce((acc, item) => acc + item.quantity, 0);
    totalQuantity = totalQuantity > 0 ? totalQuantity : 0;
  }

  return (
    <html lang="en" className={myFont.className}>
      <body>
        <CartProvider>
          <Navbar cartItemsCount={totalQuantity} />
          <main className="bg-black">{children}</main>
          <Policy />
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
