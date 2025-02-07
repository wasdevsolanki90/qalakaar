**Project Description: E-Commerce Website**

This project is an interactive and user-friendly e-commerce website that offers a seamless shopping experience. Leveraging a combination of advanced technologies and design principles, the website caters to users' needs through its intuitive interface and engaging user experience.

**Technology Stack:**

- Frontend and Backend: Next.js
- Styling: Tailwind CSS and Shadcn UI
- Database: Vercel Postgres
- APIs: REST APIs for backend and frontend interaction
- Icons: Lucid React Icons
- Content Management: Sanity
- Checkout and Payment: Stripe integration via Sanity
- Webhooks: Stripe webhooks to throw events and add orders
- State Management: Context API
- Notifications: React-hot-toast library

**Functionalities:**

1. **Home Page:** The home page offers an enticing introduction to the platform, featuring promotions and a newsletter subscription option.

2. **Social Media Integration:** The footer section provides quick access to social media links for users to engage further.

3. **Product Categories:** Users can explore products across distinct categories: Male, Female, and Kids, or view all products collectively.

4. **Product Details:** Each product has a dedicated page that presents its description, sizes, and other relevant information.

5. **Cart Management:** Users can add selected items to their cart, which is stored in the database with a unique user ID generated through cookies.

6. **Cart Overview:** The cart page offers an overview of the order and the items added to it, helping users make informed decisions.

7. **Checkout Process:** Users can proceed to checkout, entering necessary information. Successful payment redirects them to the home page, while an unsuccessful attempt returns them to the cart page.

8. **Order Mangement:** Users orders will be stored in database with their order details after payment is done. Webhooks are used to ensure the checkout successfull completion and orders in database.

9. **User-Centric Experience:** The website focuses on enhancing user experience through smooth navigation, logical flow, and interactive design.

This e-commerce website serves as a comprehensive platform, integrating advanced technologies to ensure an enjoyable and efficient shopping journey for users.

---------------------------------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
