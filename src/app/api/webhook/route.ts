import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Product } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
  typescript: true,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const createOrder = async (
  products: Product[],
  amount: number,
  delivery: number
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/order`, {
      method: "POST",
      body: JSON.stringify({
        order_amount: amount,
        products: products,
        order_delivery_charges: delivery/100,
      }),
    });
    if (!res.ok) throw new Error("Can't make order.");
    return res;
  } catch (error) {
    console.log("Error making order:", error);
  }
};

export async function POST(request: Request) {
  const body = await request.text();

  const signature = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    console.log("weebhook verified");
  } catch (err: any) {
    console.log("weebhook failed");
    return NextResponse.json(`Webhook Error: ${err.message}`);
  }

  switch (event?.type) {
    case "payment_intent.succeeded":
      const paymentIntentSuccess = event.data.object;
      break;
    // ... handle other event types
    case "checkout.session.completed":
      console.log("session completed");
      const paymentIntent: any = event.data.object;
      const customer: any = await stripe.customers.retrieve(
        paymentIntent.customer
      );
      console.log("Customer:", customer);
      const order = await createOrder(
        JSON.parse(customer.metadata.cartItems),
        customer.metadata.total_amount,
        customer.metadata.delivery_charges
      );
      if (!order?.ok) throw new Error("error making order");
    // console.log("OrderW:", order);
    default:
      console.log(`Unhandled event type ${event?.type}`);
  }
  return NextResponse.json({ result: event, ok: true });
}
