import { SignJWT, jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server";
import { db, orderTable, orderDetailsTable } from "@/lib/drizzle";
import { eq, and, sql, inArray  } from "drizzle-orm";
import { formatDateTime } from "@/lib/dateFormatter";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";

import { Product as BaseProduct } from "@/lib/types";
import { client } from "@/lib/sanityClient";

import { fetchSession } from "@/app/actions";


interface Product extends BaseProduct {
  product_name: string;
}

const secret = process.env.JWT_SECRET
const key = new TextEncoder().encode(secret) 

class OrderIdGenerator {
  private static readonly PREFIX = "qalaakar-";
  private static readonly CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  private static readonly ID_LENGTH = 6;
  private generatedIds = new Set<string>();

  /**
   * Generates a unique order ID.
   * @returns {string} Unique order ID
   */
  public generateOrderId(): string {
    let uniqueId: string;

    do {
      // Generate a random 6-character string
      const randomString = this.generateRandomString();
      // Combine with the prefix
      uniqueId = OrderIdGenerator.PREFIX + randomString;
    } while (this.generatedIds.has(uniqueId)); // Ensure uniqueness

    // Store the generated ID
    this.generatedIds.add(uniqueId);

    return uniqueId; 
  }

  /**
   * Generates a random string of a fixed length from the character pool.
   * @returns {string} Randomly generated string
   */
  private generateRandomString(): string {
    let result = "";
    for (let i = 0; i < OrderIdGenerator.ID_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * OrderIdGenerator.CHAR_POOL.length);
      result += OrderIdGenerator.CHAR_POOL[randomIndex];
    }
    return result;
  }
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
  })

  return payload
}

const getProductTitle = async (product_id: string) => {
  try {
    const res = await client.fetch(`*[_type=="product" && _id == "${product_id}"] {title}`);
    if (!res) throw new Error("error");
      return res[0].title;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export const GET = async () => {
  try {

    const session = cookies().get("session")?.value
    if (!session) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    const getUser = await decrypt(session);

    const userOrders = await db.select({
        order: orderTable,
        details: orderDetailsTable
      })
      .from(orderTable)
      .leftJoin(
        orderDetailsTable,
        eq(orderTable.order_id, orderDetailsTable.order_id)
      )
      .where(eq(orderTable.user_id, getUser.user.user_id));

    return NextResponse.json(userOrders, { status: 200 });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {

  const fetchUser = await fetchSession();
  const userId = fetchUser.userId ? fetchUser.userId : null;
  const body = await request.json();
  const uid = userId ? userId : body.products[0].user_id;
  const orderIdGenerator = new OrderIdGenerator();
  const orderId = orderIdGenerator.generateOrderId()
  // console.log(orderId); // e.g., "qalaakar-Xy3P2z

  const shipping_method = "standard";
  const payment_method = "cod";

  const { email, first_name, last_name, address, city, province, country, postal_code, phone_no, billing_address, address_bill, city_bill, province_bill, country_bill, postal_code_bill, phone_no_bill, instructions, order_subtotal, order_total, delivery_charges } = body;

  const requiredFields = {
    email,
    first_name,
    last_name,
    address,
    city,
    province,
    country,
    phone_no,
    shipping_method,
    payment_method,
    billing_address,
    order_subtotal,
    order_total,
    delivery_charges,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([, value]) => value === null || value === undefined) // Explicitly check for null or undefined
    .map(([key]) => key); // Extract the names of the missing fields

  if (missingFields.length > 0) {
    return new Response(
      JSON.stringify({ error: "Missing required fields", missingFields }),
      { status: 400 }
    );
  }

  const requireFieldsBilling = {
    address_bill, city_bill, province_bill, country_bill, phone_no_bill,
  };

  const missingFieldsBilling = Object.entries(requireFieldsBilling)
    .filter(([, value]) => !value) // Check if the value is falsy (null, undefined, empty string, etc.)
    .map(([key]) => key); // Extract the names of the missing fields

  if (billing_address === "different" && missingFieldsBilling.length > 0) {
    return new Response(
      JSON.stringify({ error: "Missing required fields for different billing address", missingFieldsBilling }),
      { status: 400 }
    );
  }

  try {
    // make a order record in the database
    // Start a transaction
    await db.transaction(async (trx) => {
      // Insert order record
      let res = await trx.insert(orderTable).values({
        user_id: uid,
        order_id: orderId,
        email: email,
        first_name: first_name,
        last_name: last_name,
        city: city,
        province: province,
        country: country,
        postal_code: postal_code,
        phone_no: phone_no,
        shipping_method: shipping_method,
        payment_method: payment_method,
        billing_address: billing_address === "different" ? true : false,
        city_bill: city_bill,
        province_bill: province_bill,
        country_bill: country_bill,
        postal_code_bill: postal_code_bill,
        phone_no_bill: phone_no_bill,
        instructions: instructions,
        order_date: formatDateTime(new Date().toString()),
        order_subtotal: body.order_subtotal,
        order_total: body.order_total,
        delivery_charges: body.delivery_charges,
      }).returning();
      
      const order = res[0];
      // console.log("Order:", order);

      // Insert order details only if the order was created successfully
      if (order) {
        let cartItems = await Promise.all(body.products.map(async (product: Product) => {
          return {
            product_id: product.product_id,
            product_name: await getProductTitle(product.product_id),
            quantity: product.quantity,
            size: product.size,
            color: product.color,
            order_id: order.order_id,
          };
        }));

        // Insert order details
        await trx.insert(orderDetailsTable).values(cartItems);
        // console.log("Order details inserted successfully");

        // Email formatting
        const fullName = `${first_name} ${last_name}`;
        const orderDetailsHtml = cartItems.map(item => `
          <li>
            <strong>Product:</strong> ${item.product_name}<br>
            <strong>Quantity:</strong> ${item.quantity}<br>
            <strong>Size:</strong> ${item.size || "N/A"}<br>
            <strong>Color:</strong> ${item.color || "N/A"}<br>
          </li>
        `).join("");

        const billing_info = billing_address === "different" ? 
          `<p>${address_bill}, ${city_bill}, ${province_bill}, ${country_bill}, ${postal_code_bill}</p>
           <p><strong>Phone:</strong> ${phone_no_bill}</p>` : `<p>Same as shipping information</p>`;

        const emailBody = `
          <h1>Order</h1>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Customer Name:</strong> ${fullName}</p>
          <p><strong>Customer Email:</strong> ${email}</p>
          <p><strong>Order Date:</strong> ${order.order_date}</p>
          <h2>Shipping Information</h2>
          <p>${address}, ${city}, ${province}, ${country}, ${postal_code}</p>
          <p><strong>Phone:</strong> ${phone_no}</p>
          <h2>Billing Information</h2>
          ${billing_info}
          <h2>Order Details</h2>
          <ul>
            ${orderDetailsHtml}
          </ul>
          <p><strong>Instructions:</strong> ${instructions}</p>
          <p><strong>Subtotal:</strong> ${order_subtotal}</p>
          <p><strong>Delivery Charges:</strong> ${delivery_charges}</p>
          <p><strong>Total:</strong> ${order_total}</p>
        `;

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Qalaakar Orders" <${process.env.EMAIL_USER}>`,
          // to: "sb03750@gmail.com",
          to: "qalaakar.orders@gmail.com",
          subject: "Order Confirmation - Qalaakar",
          html: emailBody,
        };

        await transporter.sendMail(mailOptions);
        cookies().delete("user_id");
      }
      // Transaction is automatically committed if no errors occur
    });

    return NextResponse.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log("Something went wrong,", error);
  }
};
