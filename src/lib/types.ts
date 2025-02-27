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
    // const res = await fetch("https://ipinfo.io/json?token=bd0812f343aac7", { cache: "no-store" });
    const res = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=6a12a8b094a94b72bd6e761d959f064a",);
    const data = await res.json();

    // Returns country code like "US", "AE", "PK"
    // console.log('current country code:', data.country_code2);
    return data.country_code2; 
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}; 

export function getPrice(product: IProduct, country: any): number {
  switch (country) {
    case 'PK':
      return product.price;
    case 'AE':
      return product.price_uae;
    default:
      return product.price_usd;
  }
}

export function getCurrencySymbol(country: string | null): string {
  switch (country) {
    case 'PK':
      return 'PKR';  // US Dollar
    case 'AE':
      return 'AED'; // UAE Dirham
    default:
      return '$'; // Pakistani Rupee
  }
}
