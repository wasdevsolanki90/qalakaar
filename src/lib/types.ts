import { Image as IImage } from "sanity";
export interface IProduct {
  price_uae: any;
  price_usd: any;
  _id: string;
  title: string;
  about: string;
  frontDesign: string;
  backDesign: string;
  description: string[];
  price: string;
  image: IImage;
  alt: string;
  category: string;
  type: string;
  sizes: string[];
  colors: string[];
  careTips: string[];
  images: IImage[];
  slug: string,
  isMain:boolean,
  size: string[];
  length: number[];
  chest: number[];
  sleeve: number[];
  productPrice: any;
}

export type Product = {
  id: number;
  user_id: string;
  product_id: string;
  quantity: number;
  size: string;
  color: string;
};

export type UserT = {
  // user_id: number,
  first_name: string,
  last_name: string,
  date_of_birth: string,
  email: string,
  password: string
}

// Function to fetch user's location
export const getUserLocation = async (): Promise<string | null> => {
  try {
    const res = await fetch("https://geolocation-db.com/json/", { cache: "no-store" });
    const data = await res.json();
    return data.country_code; // Returns country code like "US", "AE", "PK"
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

// Function to determine the correct price (returns a number)
export function getPrice(product: IProduct, country: string | null): string {
  switch (country) {
    case 'US':
      return `$ ${product.price_usd}`;
    case 'UAE':
      return `Dirham ${product.price_uae}`;
    default:
      return `PKR ${product.price}`;
  }
}