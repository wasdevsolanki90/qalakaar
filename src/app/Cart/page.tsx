"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/reusable/CartItem";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { Product, getUserLocation, getPrice, getCurrencySymbol } from "@/lib/types";
import { useCart } from "@/components/context/CartContext";
import Link from "next/link";

export default function Cart() { 
  const { setCartCount } = useCart();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>();
  const [deleteCall, setDeleteCall] = useState(0);
  const [check, setCheck] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const deliveryCharges = 0;

  const [country, setCountry] = useState<string | null>(null);
  const fetched = useRef(false); // Prevent double fetch in Strict Mode  

  useEffect(() => {
    setProducts([]);
    setSubTotal(0);
    fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [deleteCall]);

  useEffect(() => {
    if (fetched.current) return; // Avoid re-fetching
    fetched.current = true;

    const fetchCountry = async () => {
      try {
        const userCountry = await getUserLocation();
        setCountry(userCountry);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, []);

  const handleDeleteCall = (a: number, price: number, quantity: number) => {
    setDeleteCall((prevSubTotal) => prevSubTotal + a);
    const amount = price * quantity;
    setSubTotal((prevSubTotal) => prevSubTotal - amount);
  };

  const handleDeleteAll = () => {
    if (!products) return;
    setDeleteAll(!check);
    const toastId = toast.loading("Deleting from cart...");
    fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}api/clear-cookies?user_id=${products[0].user_id}`,
      {
        cache: "no-store",
      }
    )
      .then((data) => {
        setProducts([]);
        toast.success("Cart cleard", {
          id: toastId,
        });
        setCartCount(0);
        setDeleteAll(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.success("Can't clear cart at this moment", {
          id: toastId,
        });
        setDeleteAll(false);
      });
  };

  if (products) {
    return (
      <section className=" px-6 pt-36 pb-20">
        <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-y-3 sm:gap-y-0">
          <h2 className="text-4xl font-bold text-white">Shopping Cart</h2>
          {products.length > 0 ? (
            <Button
              className="bg-black text-white rounded-lg border-2 border-white text-lg self-end"
              onClick={handleDeleteAll}
            >
              <ShoppingCart className="mr-2" />
              <>Clear Cart</>
            </Button>
          ) : (
            <></>
          )}
        </div>
        {products.length > 0 ? (
          <div className="flex flex-col xl:flex-row xl:justify-around xl:items-start mt-10 gap-y-4 gap-x-10">
            <div className="flex-[2_1_0%]">
              {products.map((product, index) => (
                <CartItem
                  key={product.product_id + index}
                  product_id={product.product_id}
                  quantity={product.quantity}
                  size={product.size}
                  color={product.color}
                  updateDeleteCall={handleDeleteCall}
                  setSubTotalPrice={setSubTotal}
                />
              ))}
            </div>

            <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-full flex-1 shadow-lg rounded-xl bg-white text-black p-3 self-center xl:self-start">
              <div className="w-full p-4 bg-black border border-gray-200 rounded-lg shadow sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold leading-none text-white dark:text-black">
                    Order Summary
                  </h5>
                </div>
                <div className="flow-root">
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate dark:text-gray-900">
                            Subtotal
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-white duration-700 ease-in-out">
                          {getCurrencySymbol(country)} {subTotal}
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate dark:text-gray-900">
                            Delivery Charges
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-white dark:text-gray-900">
                        {getCurrencySymbol(country)} {deliveryCharges}
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate dark:text-gray-900">
                            Order total
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-white dark:text-gray-900">
                          {getCurrencySymbol(country)} &nbsp;
                           {(
                            subTotal +
                            deliveryCharges
                          )}
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="">
                    <Link href="/BuyNow" className="group flex items-center">
                      <button
                        className="relative overflow-hidden w-full flex justify-center items-center bg-black text-white border-2 border-white py-3 gap-2 transition-all duration-300"                   >
                        {/* Sliding White Background */}
                        <span
                          className="absolute inset-0 bg-white translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0"
                          aria-hidden="true"
                        ></span>

                        {/* Button Text */}
                        <span
                          className="relative z-10 transition-colors duration-300 group-hover:text-black font-semibold"
                        >
                          Buy now
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center gap-y-4 mt-10 pb-20">
            <ShoppingCart className="w-32 h-32 text-white" />
            <h3 className="text-3xl text-white sm:text-5xl font-bold">
              Your cart is empty!
            </h3>
          </div>
        )}
      </section>
    );
  }
  return (
    <section className="px-6 pt-36 pb-20">
      <h2 className="text-4xl font-bold text-white">Shopping Cart</h2>
      <div className="text-center mt-32">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </section>
  );
}
