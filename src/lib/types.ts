import { Image as IImage } from "sanity";
export interface IProduct {
  price_uae: number;
  price_usd: number;
  _id: string;
  title: string;
  about: string;
  frontDesign: string;
  backDesign: string;
  description: string[];
  price: number;
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
  productPrice: string;
  country: string;
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
    const res = await fetch("https://ipinfo.io/json", { cache: "no-store" });
    const data = await res.json();

    return data.country; // Returns country code like "US", "AE", "PK"
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

export function getPrice(product: IProduct, country: any): number {
  switch (country) {
    case 'US':
      return product.price_usd;
    case 'UAE':
      return product.price_uae;
    default:
      return product.price;
  }
}

export function getCurrencySymbol(country: string | null): string {
  switch (country) {
    case 'US':
      return '$';  // US Dollar
    case 'UAE':
      return 'AED'; // UAE Dirham
    default:
      return 'PKR'; // Pakistani Rupee
  }
}
