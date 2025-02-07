import React from "react";
// import { stripe } from "@/lib/stripe";
// import { useCart } from "@/components/context/CartContext";
// import { Product } from "@/lib/types";
// import Stripe from "stripe";
import { cookies } from "next/headers";

// const key = process.env.STRIPE_SECRET_KEY || "";

// const stripe = new Stripe(key, {
//   apiVersion: "2022-11-15",
//   typescript: true,
// });

// const getProducts = async (user_id: string) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?user_id=${user_id}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (!res.ok) throw new Error("Error fetching data");
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getSessionAndOrder = async (
//   sessionId: string,
//   amount: number,
//   user_id: string
// ) => {
//   const session = await stripe.checkout.sessions.retrieve(sessionId);
//   // console.log("MyProducts:", myProducts.data);
//   // console.log("MyProducts:", myProducts.data[0].price?.metadata);

//   if (session && session.status === "complete") {
//     const products: Product[] = await getProducts(user_id);
//     // console.log("products:", products);
//     try {
//       if (products.length === 0) throw new Error("No products retrieved.");

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_SITE_URL}api/order?user_id=${user_id}`,
//         {
//           method: "POST",
//           body: JSON.stringify({
//             order_amount: amount,
//             products: products,
//           }),
//         }
//       );
//       // console.log("response:", res.ok);
//       if (!res.ok) throw new Error("Can't make order.");
//       // console.log("Status:", res.status);
//       return session;
//     } catch (error) {
//       console.log("Error here:", error);
//     }
//   }
// };

export default function Order({
  searchParams,
}: {
  searchParams: {
    // user_id: string;
    // amount: number;
    success?: boolean;
    // session_id: string;
  };
}) {
  // const { setCartCount } = useCart();
  // const [text, setText] = useState<string | undefined>();

  if (searchParams.success) {
    // const sessionId = searchParams.session_id;
// 
    // if (!sessionId) throw new Error("Invalid Callback");

    cookies().delete("user_id");

    // getSessionAndOrder(sessionId, searchParams.amount, searchParams.user_id)
    //   .then((session) => {
    //     setCartCount(0);
    //     setText("Your order has been placed");
    //     // console.log(session);
    //   })
    //   .catch((err) => {
    //     setText("No order");
    //     console.log("Error dekho:", err);
    //   });
  }

  return (
    <section className="px-6 pt-36 py-0">
      <h2 className="text-4xl font-bold">Your order has been placed!</h2>
    </section>
  );
}
