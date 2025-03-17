// import { drizzle } from "drizzle-orm/vercel-postgres";
// import { sql } from "@vercel/postgres";
// import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { pgTable, varchar, serial, integer, date, boolean, text, decimal } from "drizzle-orm/pg-core";
import { Pool } from "@neondatabase/serverless";

// CREATE TABLE users (
//   user_id SERIAL,
//   first_name VARCHAR(255),
//   last_name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   address VARCHAR(255),
//   city VARCHAR(20),
//   country VARCHAR(20),
//   postal_code VARCHAR(10),
//   phone_no VARCHAR(15),
//   PRIMARY KEY (email)
// );
export const userTable = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  first_name: varchar("first_name", {
    length: 255,
  }).notNull(),
  last_name: varchar("last_name", {
    length: 255,
  }),
  // date_of_birth: date("date_of_birth"),
  email: varchar("email").primaryKey(),
  password: varchar("password").notNull(),
  address: varchar("address", {
    length: 255,
  }),
  city: varchar("city", {
    length: 50,
  }),
  country: varchar("country", {
    length: 50,
  }),
  postal_code: varchar("postal_code", {
    length: 10,
  }),
  phone_no: varchar("phone_no", {
    length: 15,
  })
});

export const shippingChargesTable = pgTable("shipping_charges", {
  id: serial("id").primaryKey(),
  country: varchar("country").notNull(),
  charges: varchar("charges").notNull(),
  status: boolean("status").default(true),
})

// CREATE TABLE cart (
//   id SERIAL,
//   user_id VARCHAR(255) NOT NULL,
//   product_id VARCHAR(255) NOT NULL,
//   quantity INTEGER NOT NULL,
//   size VARCHAR(10) NOT NULL,
//   color VARCHAR(20) NOT NULL,
//   email VARCHAR(255),
//   PRIMARY KEY (user_id, product_id, size, color),
//   FOREIGN KEY (email) REFERENCES users(email)
//       ON DELETE CASCADE
//       ON UPDATE CASCADE
// );
export const cartTable = pgTable("cart", {
  id: serial("id"),
  user_id: varchar("user_id", {
    length: 255,
  }).primaryKey(),
  product_id: varchar("product_id", {
    length: 255,
  }).primaryKey(),
  quantity: integer("quantity").notNull(),
  size: varchar("size", {
    length: 10,
  }).primaryKey(),
  color: varchar("color", {
    length: 20,
  }).primaryKey(),
  email: varchar("email", {
    length: 255
  }).references(() => userTable.email)
});

// CREATE TABLE orders (
//   order_id VARCHAR(15),
//   user_id VARCHAR(255) NOT NULL,
//   first_name VARCHAR(255) NOT NULL,
//   last_name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   -- delivery details
//   city VARCHAR(255) NOT NULL,
//   province VARCHAR(255) NOT NULL,
//   country VARCHAR(255) NOT NULL,
//   postal_code VARCHAR(10),
//   phone_no VARCHAR(15) NOT NULL,
//   shipping_method VARCHAR(255) NOT NULL,
//   delivery_charges INT NOT NULL,
//   payment_method VARCHAR(255) NOT NULL,
//   billing_address BOOLEAN NOT NULL,
//   city_bill VARCHAR(255),
//   province_bill VARCHAR(255),
//   country_bill VARCHAR(255),
//   postal_code_bill VARCHAR(10),
//   phone_no_bill VARCHAR(15),
//   instructions text,
//   order_date DATE NOT NULL,
//   order_subtotal INT NOT NULL,
//   order_total INT NOT NULL,
//   PRIMARY KEY (order_id)
// );
export const orderTable = pgTable("orders", {
  order_id: varchar("order_id", {
    length: 15,
  }).primaryKey(),
  user_id: varchar("user_id", {
    length: 255,
  }).notNull(),
  email: varchar("email", {
    length: 255,
  }).notNull(),
  first_name: varchar("first_name", {
    length: 255,
  }).notNull(),
  last_name: varchar("last_name", {
    length: 255,
  }).notNull(),
  city: varchar("city", {
    length: 255,
  }).notNull(),
  province: varchar("province", {
    length: 255,
  }).notNull(),
  country: varchar("country", {
    length: 255,
  }).notNull(),
  postal_code: varchar("postal_code", {
    length: 255,
  }),
  phone_no: varchar("phone_no", {
    length: 255,
  }).notNull(),
  shipping_method: varchar("shipping_method", {
    length: 255,
  }).notNull(),
  delivery_charges: integer("delivery_charges").notNull(),
  payment_method: varchar("payment_method", {
    length: 255,
  }).notNull(),
  billing_address: boolean("billing_address").notNull(),
  city_bill: varchar("city_bill", {
    length: 255,
  }),
  province_bill: varchar("province_bill", {
    length: 255,
  }),
  country_bill: varchar("country_bill", {
    length: 255,
  }),
  postal_code_bill: varchar("postal_code_bill", {
    length: 255,
  }),
  phone_no_bill: varchar("phone_no_bill", {
    length: 255,
  }),
  instructions: text("instructions"),
  order_date: date("order_date").notNull(),
  order_subtotal: integer("order_subtotal").notNull(),
  order_total: integer("order_total").notNull(),
});

// CREATE TABLE order_details (
//   order_detail_id SERIAL,
//   product_id VARCHAR(255) NOT NULL,
//   product_name VARCHAR(255) NOT NULL,
//   quantity INT NOT NULL,
//   size VARCHAR(10) NOT NULL,
//   color VARCHAR(20) NOT NULL,
//   order_id VARCHAR(15) NOT NULL,
//   PRIMARY KEY (order_detail_id),
//   FOREIGN KEY (order_id) REFERENCES orders(order_id)
//       ON DELETE CASCADE
//       ON UPDATE CASCADE
// );
export const orderDetailsTable = pgTable("order_details", {
  order_detail_id: serial("order_detail_id").primaryKey(),
  product_id: varchar("product_id", {
    length: 255,
  }).notNull(),
  product_name: varchar("product_name", {
    length: 255,
  }).notNull(),
  quantity: integer("quantity").notNull(),
  size: varchar("size", {
    length: 10,
  }).notNull(),
  color: varchar("color", {
    length: 20,
  }).notNull(),
  order_id: varchar("order_id", {
    length: 15,
  }).references(() => orderTable.order_id).notNull(),
});


// Initialize Neon client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in your environment variables
});

export const db = drizzle(pool); // Connect Drizzle ORM with Neon

// Query to describe table
// SELECT 
//    c.table_name,
//    c.column_name,
//    c.data_type,
//    coalesce(constraint_type, 'No Constraint') as constraint_type
// FROM 
//    information_schema.columns c
// LEFT JOIN 
//    information_schema.constraint_column_usage ccu 
// ON 
//    c.column_name = ccu.column_name AND c.table_name = ccu.table_name
// LEFT JOIN 
//    information_schema.table_constraints tc 
// ON 
//    tc.constraint_name = ccu.constraint_name
// WHERE 
//    c.table_name = 'cart';
