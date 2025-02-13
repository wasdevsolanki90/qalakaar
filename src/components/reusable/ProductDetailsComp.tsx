"use client";

import React, { useState } from "react";
import { IProduct } from "@/lib/types";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { Button } from "../ui/button";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import clsx from "clsx";
import { Image as IImage } from "sanity";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

export default function ProductDetailsComp({ product }: { product: IProduct }) {
  // console.log("Product in details component: ", product);
  const [quantity] = useState(1); // state to track quantity changes
  const { setCartCount } = useCart(); // context api's state to change cartCount state globally
  const [requireSize, setRequireSize] = useState<string>(); // size state
  const [requireColor, setRequireColor] = useState<string>(); // color state
  const [check, setCheck] = useState<boolean>(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState<boolean>(false); // state for collapsible size chart
  const [selectedImage, setSelectedImage] = useState<IImage>(product.image); // Main image state
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // Index of the main image

  const handleNextImage = () => {
    if (product.images === null) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    setSelectedImage(product.images[(currentImageIndex + 1) % product.images.length]);
  };

  const handlePreviousImage = () => {
    if (product.images === null) return;
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length
    );
    setSelectedImage(product.images[(currentImageIndex - 1 + product.images.length) % product.images.length]);
  };

  const sizeChartColumnNames = ["size", "length", "chest", "sleeve"];
  
  const sizeChart = product.size?.map((size, index) => ({
    size,
    length: product.length[index],
    chest: product.chest[index],
    sleeve: product.sleeve[index],
  }));


  const handleAddToCart = async () => {
    setCheck(!check);
    // This function will insert an item to cart table in the databse, quantity and size is required
    // Toast notifications are used which will show loader and on sucess show show success notification
    // Cart count will be updated to the quantity added to previous cart count
    if (!requireColor) {
      toast.error("Please select a color!");
      setCheck(false);
      return;
    } 
    if (!requireSize) {
      toast.error("Please select a size!");
      setCheck(false);
      return;
    } 
    const mySize = requireSize;
    setRequireSize("");
    const myColor = requireColor;
    setRequireColor("");
    const toastId = toast.loading("Adding to cart...");
    
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
        method: "POST",
        body: JSON.stringify({
          product_id: product._id,
          quantity: quantity,
          size: mySize,
          color: myColor,
        }),
      });

      if (!res.ok) throw new Error("error insertion");

      const result = await res.json();
      toast.success("Product has been added to cart", {
        id: toastId,
      });
      setCartCount((prevCount: number) => prevCount + quantity);
      setRequireSize("");
      setCheck(false);
    } catch (error) {
      console.log("Error adding to cart:", error);
      setRequireSize("");
      setCheck(false);
      toast.error("Error adding to cart!", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch space-y-10 sm:space-y-0 sm:space-x-10">
      
      {/* Left Side: Full Image with Navigation Buttons */}
      <div className="w-full sm:w-3/5 h-auto">
        <div className="relative">
          <Image
            src={urlForImage(selectedImage).url()}
            alt="product-main"
            width={1000}
            height={1000}
            className="w-full h-[500px] md:h-[1000px] object-cover"
          />

          {/* Navigation Buttons */}
          <button
            onClick={handlePreviousImage}
            className="absolute top-1/2 left-2 text-white p-2 rounded"
          >
            <ChevronLeft className="w-5 h-5"/>
          </button>

          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-2 text-white p-2 rounded"
          >
            <ChevronRight className="w-5 h-5"/>
          </button>
        </div>

        {product.images &&
          <div className="grid grid-cols-4 gap-2 mt-4 w-full">
            {product.images.length > 0 && product.images.map((image, index) => (
              <Image
                key={index}
                src={urlForImage(image).url()}
                alt={`thumbnail-${index}`}
                width={500}
                height={500}
                className={`w-full h-full object-cover cursor-pointer border-2 transition ${
                  index === currentImageIndex ? "border-white" : "border-transparent"
                }`}
                onClick={() => { 
                  setSelectedImage(image); 
                  setCurrentImageIndex(index); 
                }}
              />
            ))}
          </div>
        }
      </div>

      {/* Right Side: Content */}
      <div className="w-full sm:w-2/5 self-start flex flex-col justify-center space-y-8 px-4 sm:px-10">
        {/* Title and Type */}
        <div>
          <h3 className="text-white text-4xl font-semibold">{product.title}</h3>
          <p className="text-lg font-semibold text-red-500">{product.type}</p>
        </div>

        {/* Description */}
        <div>
          <p className="text-base text-white font-semibold font-sans">
            {product.about} 
          </p>
        </div>
        <div className="font-sans space-y-2">
          <h3 className="text-lg font-bold text-white">Design Features</h3>
          {/* <br /> */}
          <p className="text-base text-white">
            <span className="text-lg font-semibold">Back Design: </span>
            {product.backDesign} 
          </p>
          {/* <br /> */}
          <p className="text-base text-white">
            <span className="text-lg font-semibold">Front Design: </span>
            {product.frontDesign} 
          </p>
        </div>

        {/* Colors */}
        <div className="space-y-2 font-sans">
          <p className="text-white text-base font-semibold">Select color</p>
          <div>
            {product.colors ? (
              product.colors.map((color, index) => (
                <Button
                  onClick={() => setRequireColor(color)}
                  key={index}
                  className={`border-[1px] border-gray-500 text-gray-300 rounded-none duration-300 hover:shadow-lg mr-2 w-auto h-10 p-5 ${
                    requireColor === color
                      ? "border-red-500 text-red-500"
                      : "border-gray-500 text-white"
                  }`}
                >
                  {color}
                </Button>
              ))
            ) : (
              <p className="text-base font-semibold text-red-500">Not Available</p>
            )}
          </div>
        </div>
        {/* Sizes */}
        <div className="space-y-2 font-sans">
          <p className="text-white text-base font-semibold">Select size</p>
          <div>
            {product.sizes ? (
              product.sizes.map((size, index) => (
                <Button
                  onClick={() => setRequireSize(size)}
                  key={index}
                  className={`border-[1px] border-gray-500 text-gray-300 rounded-none duration-300 hover:shadow-lg mr-2 w-10 h-10 ${
                    requireSize === size
                      ? "border-red-500 text-red-500"
                      : "border-gray-500 text-white"
                  }`}
                >
                  {size}
                </Button>
              ))
            ) : (
              <p className="text-base font-semibold text-red-500">Not Available</p>
            )}
          </div>
        </div>

        {/* Quantity */}
        {/* <div className="flex items-center justify-between space-y-2">
          <p className="text-white text-base font-semibold">Quantity</p>
          <div className="flex-1 flex items-center justify-evenly">
            <Button
              onClick={() => quantity !== 1 && setQuantity(quantity - 1)}
              className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
            >
              -
            </Button>
            <p className="text-white">{quantity}</p>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-100 rounded-full text-gray-600 text-2xl shadow-lg hover:scale-105 duration-300"
            >
              +
            </Button>
          </div>
        </div> */}

        {/* Add to Cart */}
        <div className="group flex items-center font-sans">
          <button
            onClick={handleAddToCart}
            className={`relative overflow-hidden w-full flex justify-center items-center bg-black text-white border-2 border-white py-3 gap-2 transition-all duration-300 ${
              check ? "cursor-not-allowed pointer-events-none" : ""
            }`}
            disabled={check}
          >
            {/* Sliding White Background */}
            <span
              className="absolute inset-0 bg-white translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0"
              aria-hidden="true"
            ></span>

            {/* Button Text */}
            <span
              className="relative z-10 transition-colors duration-300 group-hover:text-black"
            >
              ADD TO CART
            </span>
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-4 font-sans">
          <p className="text-white text-xl font-semibold">
            PKR {product.price}
          </p>
        </div>

        {/* Other description */}
        <div className="flex flex-col gap-8 text-white font-sans">
          <h2 className="text-2xl font-bold border-b-2 border-b-gray-200 py-2">
            Product Information
          </h2>
          {/* <div className="flex">
            <h4 className="flex-1 text-xl font-semibold w-full">
              Product Details
            </h4>
            <p className="flex-[2_1_0%] text-justify">{product.description}</p>
          </div> */}
          {product.description &&
              <div className="flex">
                <h4 className="flex-1 text-xl font-semibold w-full">
                  Product Description
                </h4> 
                <ul className="flex-[2_1_0%] list-disc font-semibold ml-5">
                  {product.description.map((description, index) => (
                    <li key={index}>{description}</li>
                  )) }
                </ul>
              </div>    
            }
            {product.careTips &&
              <div className="flex">
                <h4 className="flex-1 text-xl font-semibold w-full">
                  Product Care
                </h4> 
                <ul className="flex-[2_1_0%] list-disc font-semibold ml-5">
                  {product.careTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  )) }
                </ul>
              </div>    
            }
            
            {/* Size Chart */}
            <div className={clsx("mt-6 p-5 transition-colors duration-500 ease-in-out", {
              "bg-black bg-opacity-80": isSizeChartOpen
            })}>
              <button
                onClick={() => setIsSizeChartOpen(!isSizeChartOpen)}
                className="w-full text-white font-semibold flex items-center justify-between space-x-2"
              >
                <span className="text-lg underline-offset-2">Size Chart</span>
                <span className="text-2xl">{isSizeChartOpen ? "−" : "+"}</span>
              </button>

              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  isSizeChartOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="relative overflow-x-auto pt-5">
                  <table className="w-full text-sm">
                    <thead className="text-white uppercase">
                      <tr className="flex justify-between gap-2">
                        {sizeChartColumnNames.map((name, index) => (
                          <th
                            key={index}
                            scope="col"
                            className="flex-1 px-6 py-3 border-2 border-white rounded-full"
                          >
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="text-white uppercase">
                      {sizeChart?.map((row, index) => (
                        <tr key={index} className="flex justify-between gap-2 border-b-2 border-zinc-200">
                          <td className="flex-1 px-6 py-4 text-center">{row.size}</td>
                          <td className="flex-1 px-6 py-4 text-center">{row.length}</td>
                          <td className="flex-1 px-6 py-4 text-center">{row.chest}</td>
                          <td className="flex-1 px-6 py-4 text-center">{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>

  );
}
