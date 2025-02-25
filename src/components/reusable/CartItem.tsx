import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CalendarClock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { client } from "@/lib/sanityClient";
import { urlForImage } from "../../../sanity/lib/image";
import toast from "react-hot-toast";
import { IProduct, getUserLocation, getPrice, getCurrencySymbol } from "@/lib/types";
import { useCart } from "@/components/context/CartContext";

export default function CartItem(props: {
  product_id: string;
  quantity: number;
  size: string;
  color: string;
  updateDeleteCall: (a: number, price: number, quantity: number) => void; // Callback function
  setSubTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setCartCount } = useCart(); 
  const [product, setProduct] = useState<IProduct[]>();
  const [newQuantity, setNewQuantity] = useState(props.quantity);
  const [updating, setUpdating] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    // Avoid re-fetching
    if (fetched.current) return; 
    fetched.current = true;

    const fetchCountry = async () => {
      try {
        const userCountry = await getUserLocation();
        setCountry(userCountry);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };
    

    fetchCountry();
  }, []);

  useEffect(() => {
    if (!country) return;

    client
      .fetch(
        `*[_type=="product" && _id == "${props.product_id}"] {
      price, 
      price_usd, 
      price_uae,
      _id,
      title,
      type,
      image,
      description,
      sizes[],
      category -> {
        name
      }
    }`
      )
      .then((res) => {
        // console.log("res")
        return res;
      })
      .then((data) => {
        setProduct(data);
        if (data) {
          props.setSubTotalPrice((prevTotal: number) => {
            if(country == 'US') {
              return data[0].price_usd * props.quantity + prevTotal;
            } else if( country == 'AE') {
              return data[0].price_uae * props.quantity + prevTotal;
            } else {
              return data[0].price * props.quantity + prevTotal;
            }
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [country]);

  // useEffect(() => {
  //   if (product) {
  //     props.setSubTotalPrice((prev: number) => {

  //       console.log(product[0].price * props. quantity)
  //       return prev + product[0].price * props.quantity

  //     }
  //     );
  //   }
  // }, [product]);

  const handleDelete = async (price: number) => {
    try {
      const toastId = toast.loading("Deleting from cart...");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}api/cart?product_id=${props.product_id}&size=${props.size}&color=${props.color}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          props.updateDeleteCall(1, price, newQuantity);
          toast.success("Product has been deleted from cart", {
            id: toastId,
          });
          setCartCount((prevCount: number) => prevCount - props.quantity);
        })
        .catch((error) => {
          console.log("Error deleting data:", error);
        });
    } catch (error) {
      console.log("error: ", error);
      toast.error("Can't delete!");
    }
  };

  const handleQuantityCount = (action: string, price: number) => {
    if (action === "increment") {
      setNewQuantity(newQuantity + 1);
      props.setSubTotalPrice((prevTotal: number) => prevTotal + price);
    } else if (action === "decrement" && newQuantity !== 1) {
      // console.log('price - :', price);
      setNewQuantity(newQuantity - 1);
      props.setSubTotalPrice((prevTotal: number) => prevTotal - price);
    }
  };

  const handleQuantityUpdate = async (id: string, price: number) => {
    setUpdating(true);
    if (props.quantity === newQuantity) return;
    try {
      const toastId = toast.loading("Updating cart...");
      const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
        method: "PUT",
        body: JSON.stringify({
          product_id: id,
          quantity: newQuantity,
          size: props.size,
          color: props.color,
          action: "update",
        }),
      });
      if (!res.ok) throw new Error("Cannot update");
      // const result = await res.json();
      // console.log(res);
      props.updateDeleteCall(1, price, newQuantity);
      toast.success("Cart has been updated", {
        id: toastId,
      });
      setCartCount(
        (prevCount: number) => prevCount + (newQuantity - props.quantity)
      );
    } catch (error) {
      console.log(error);
      toast.error("Can't update!");
    } finally {
      setUpdating(false);
    }
  };

  if (product) {
    return (
      <div className="flex flex-col sm:flex-row gap-y-4 gap-x-10 border-b-2 border-b-gray-400 py-4">
        <Image
          src={urlForImage(product[0].image).url()}
          alt="product1"
          width={400}
          height={300}
          className="max-h-[300px] min-w-[100px] object-cover object-top rounded-xl"
        />
        <div className="w-full space-y-4">
          <div className="w-full grid grid-cols-2 text-white">
            <div>
              <h3 className="text-white text-2xl font-semibold">
                {product[0].title}
              </h3>
              <p className="text-lg font-semibold text-gray-400">
                {product[0].type}
              </p>
              <p className="text-base font-semibold">
                Price: {getCurrencySymbol(country)}{getPrice(product[0], country)}
              </p>
            </div>
            <Button
              onClick={() => handleDelete(product[0].price)}
              className="justify-self-end hover:text-red-600"
            >
              <Trash2 />
            </Button>
          </div>
          <div className="text-white w-full grid grid-cols-1 lg:grid-cols-2 items-baseline justify-between">
            <p className="text-base font-semibold">
              Item Total: {getCurrencySymbol(country)}{getPrice(product[0], country) * newQuantity}
            </p>
            <div className="order-1 md:order-last">
              <div className="flex items-baseline justify-between space-y-2">
                <p className="text-base font-semibold">Quantity</p>
                <div className="flex-[2_1_0%] flex items-center justify-around">
                  <Button
                    onClick={() =>
                      handleQuantityCount("decrement", getPrice(product[0], country))
                    }
                    className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
                  >
                    -
                  </Button>
                  <p>{newQuantity}</p>
                  <Button
                    onClick={() =>
                      handleQuantityCount("increment", getPrice(product[0], country))
                    }
                    className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-white space-y-2 text-base font-semibold">
            Size: {props.size}
          </p>
          <p className="text-white space-y-2 text-base font-semibold">
            Color: {props.color}
          </p>
          <div className="text-white grid grid-cols-1 md:grid-cols-2 items-baseline justify-between gap-y-2.5 md:gap-y-0">
            <div className="inline-flex space-x-2">
              <CalendarClock /> <p>Shipment in 1 week</p>
            </div>
            <div className="flex-[2_1_0%] flex items-center lg:justify-around rounded-lg md:ml-20">
              <Button
                variant="outline"
                onClick={() =>
                  handleQuantityUpdate(product[0]._id, product[0].price)
                }
                className={`flex justify-center items-center bg-black text-white rounded-lg hover:border-2 hover:border-white duration-300 py-3 gap-2 ${
                  props.quantity === newQuantity || updating
                    ? "pointer-events-none cursor-pointer"
                    : ""
                }`}
                disabled={props.quantity === newQuantity || updating}
              >
                <ShoppingCart />
                Update Quantity
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
