"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User2Icon, ShoppingBag, Truck } from "lucide-react";
import { fetchAuthUser } from '@/app/actions';

export default function Dashboard() {
  const [id, setId] = useState<number | undefined>();

  // Fetch user data on component mount
  useEffect(() => {
    const getUser = async () => {

      try {
        const authUser: any = await fetchAuthUser();
        if (authUser) {
          setId(authUser.user_id);
        }
      } catch (error) {
        console.error("Failed to fetch user: ", error);
      }
    };
    getUser();
  }, []);

  return (
    <section className="px-6 pt-36 pb-20 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-2xl text-center font-bold text-white mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <Link href="/dashboard/orders" className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <ShoppingBag className="h-10 w-10 text-blue-500 mb-2" />
            <span className="text-lg font-semibold text-gray-700">My Orders</span>
          </Link>
          
          <Link href="/dashboard/profile" className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <User2Icon className="h-10 w-10 text-green-500 mb-2" />
            <span className="text-lg font-semibold text-gray-700">Profile</span>
          </Link>

          {id === 5 && (
            <Link href="/dashboard/charges" className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <Truck className="h-10 w-10 text-yellow-500 mb-2" />
              <span className="text-lg font-semibold text-gray-700">Shipping Charges</span>
            </Link>
          )}

        </div>

      </div>
    </section>
  );
}
