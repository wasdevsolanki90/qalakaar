"use client";

import React, { useEffect, useState, useRef } from "react";
import { client } from "@/lib/sanityClient";
import { IProduct, getUserLocation, getPrice, getCurrencySymbol } from "@/lib/types";

interface OrderDetail {
  product_name: string;
  product_id: string;
  quantity: number;
  price?: number;
}

interface Order {
  order_id: string;
  order_total: number;
  order_date: string;
  payment_method: string;
  order_details: OrderDetail[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    const handleOrder = async () => {
      const country = await getUserLocation();
      setCountry(country);

      try {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/order`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!res.ok) throw new Error("Orders not found!");
        const result = await res.json();

        // Transform API response to match expected structure
        const formattedOrders = result.map((item: any) => ({
          order_id: item.order.order_id,
          order_total: item.order.order_total,
          order_date: item.order.order_date,
          payment_method: item.order.payment_method,
          order_details: Array.isArray(item.details) ? item.details : [item.details], 
        }));
        // console.log('Result:', formattedOrders);
        // setOrders(formattedOrders);

        // Fetch prices for each order detail
        const ordersWithPrices = await Promise.all(
          formattedOrders.map(async (order:any) => {
            const detailsWithPrices = await Promise.all(
              order.order_details.map(async (detail:any) => {
                const product = await client.fetch(
                  `*[_type=="product" && _id == "${detail.product_id}"][0]`
                );
                const price = getPrice(product, country);
                return { ...detail, price };
              })
            );
            return { ...order, order_details: detailsWithPrices };
          })
        );

        setOrders(ordersWithPrices);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    handleOrder();
  }, []);

  
  return (
    <section className="px-6 pt-36 pb-20 bg-black min-h-screen">
      <h5 className="text-2xl text-center font-bold text-white mb-6">My Orders</h5>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Order Number</th>
              <th scope="col" className="px-6 py-3">QTY</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Order Date</th>
              <th scope="col" className="px-6 py-3">Payment Method</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-600">
                  Loading...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-600">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order, index) =>
                order.order_details.map((detail, detailIndex) => (
                  <tr key={`${index}-${detailIndex}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {index + 1 + detailIndex}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {detail.product_name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {order.order_id}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {detail.quantity}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {getCurrencySymbol(country)} {detail.price ?? "N/A"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {order.payment_method.toUpperCase()}
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>

        </table>
      </div>
    </section>
  );
}
