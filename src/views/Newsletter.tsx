"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useCart } from "@/components/context/CartContext";

export default function Newsletter({ id }: { id: string | undefined }) {
  const { setCartCount } = useCart();
  useEffect(() => {
    if (id) {
      fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/clear-cookies?user_id=${id}`,
        {
          cache: "no-store",
        }
      ).then((data) => {
        // console.log("first");
        setCartCount(0);
      });
    } else {
      // console.log("first 1");
    }
  }, [id, setCartCount]);
  return (
    <section className="flex justify-center text-center px-6 py-0">
      <div className="space-y-6 relative text-white">
        <h2 className="text-4xl font-bold">Subscribe Our Newsletter</h2>
        <p className="text-xl text-white">
          Get the latest information and promo offers directly
        </p>
        <form className="flex justify-center flex-wrap gap-x-2 gap-y-4 sm:gap-y-0">
          <Input placeholder="Email" type="email" className="w-full sm:w-3/4" />
          <Button className="bg-white text-black">Get Started</Button>
        </form>
      </div>
    </section>
  );
}
