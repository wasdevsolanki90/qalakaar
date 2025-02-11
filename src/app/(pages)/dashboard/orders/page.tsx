"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/lib/sanityClient";
import { User2Icon, ShoppingBag, MenuIcon, XIcon } from "lucide-react";

interface Order {
  order_id: string;
  order_total: number;
  order_date: string;
  payment_method: string;
}

export default function Orders() {  // Renamed 'orders' to 'Orders' (PascalCase for components)
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/order`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data.orders || []);
        console.log('Orders: ', data.orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="px-6 pt-36 pb-20 bg-[#f5f5f5] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl text-center font-bold text-gray-800 mb-6">My Orders</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {orders.map((order) => (
              <div key={order.order_id} className="p-4 bg-white rounded-lg shadow-md">
                <p className="text-lg font-semibold">Order ID: {order.order_id}</p>
                <p className="text-gray-600">Total: ${order.order_total}</p>
                <p className="text-gray-600">Date: {order.order_date}</p>
                <p className="text-gray-600">Payment: {order.payment_method}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
