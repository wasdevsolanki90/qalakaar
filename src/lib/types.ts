import { Image as IImage } from "sanity";
export interface IProduct {
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
