import React from 'react';
import Link from "next/link";
import { User2Icon, ShoppingBag, } from "lucide-react";

export default async function dashboard() {
  
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
        </div>

      </div>
    </section>
  );
}
