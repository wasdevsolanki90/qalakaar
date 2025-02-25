"use client";

import { Product } from "@/lib/types";
import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useCart } from "@/components/context/CartContext";
import { IProduct, getUserLocation, getPrice, getCurrencySymbol } from "@/lib/types";

export default function BuyNow() {
  const cities:string[] = [ "Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat" ]
  const provinces:string[] = ["Sindh", "Punjab", "Balochistan", "KPK"];
  const countries:string[] = ["Pakistan"];
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [subTotal, setSubTotal] = useState<number>(0);
  const router = useRouter();

  const [country, setCountry] = useState<string | null>(null);
  const fetched = useRef(false); // Prevent double fetch in Strict Mode  
  
  const { name, setName, setCartCount, userId } = useCart();
  const [products, setProducts] = useState<Product[]>();
  
  useEffect(() => {
    if (fetched.current) return; // Avoid re-fetching
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
    setProducts([]);
    fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const shippingTotal = 0;

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Placing your order");

    // Create FormData object from the form
    const formData = new FormData(e.currentTarget);

    // Collect form data
    const formDataObj = Object.fromEntries(formData);

    // Include product details
    const productsData = products?.map((product) => ({
      product_id: product.product_id,
      user_id: userId ? userId : product.user_id,
      quantity: product.quantity,
      size: product.size,
      color: product.color,
    }));

    // Prepare the full data
    const requestData = {
      ...formDataObj,  
      products: productsData,  
      order_subtotal: subTotal,
      order_total: subTotal + shippingTotal,
      delivery_charges: shippingTotal,
    };

    // console.log("Request data with products: ", requestData);

    // Send request to API
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "api/order", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Order placed successfully", { id: toastId });
        // console.log(data);
        setCartCount(0);
        router.push('/');
      } else {
        toast.error("Failed to place order", { id: toastId });
        console.error(data);
      }
    } catch (error) {
      toast.error("An error occurred", { id: toastId });
      console.error("Checkout error:", error);
    }
  };

  return (
    <section className="px-6 pt-20 pb-20">
      <div className="flex flex-col lg:flex-row p-6">
        {/* Left Section: Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          {/* Contact Section */}

          {name === 'Login' && (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <Link href="/login" className="text-base text-gray-500 underline">Login</Link>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleCheckout}>
            <div>
              <label htmlFor="contactEmail" className="block font-medium">Email</label>
              <input
                id="contactEmail"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Email me with news and offers</span>
              </label>
            </div>

            {/* Delivery Section */}
            <h2 className="text-xl font-bold mt-6">Delivery</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="city" className="block font-medium">City</label>
                <select id="city" name="city" className="w-full p-2 border rounded-lg">
                  {/* Add cities of Pakistan */}
                  <option value="">Select city</option>
                  {cities.map((city:string, index:number)=>(
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="province" className="block font-medium">Province</label>
                <select id="province" name="province" className="w-full p-2 border rounded-lg">
                  {/* Add provinces of Pakistan */}
                  <option value="">Select province</option>
                  {provinces.map((province:string, index:number)=>(
                    <option key={index} value={province}>{province}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="country" className="block font-medium">Country/Region</label>
                <select id="country" name="country" className="w-full p-2 border rounded-lg">
                  {/* Add countries */}
                  {/* <option value="">Select country</option> */}
                  {countries.map((country:string, index:number)=>(
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="firstName" className="block font-medium">First Name</label>
                <input id="firstName" name="first_name" type="text" className="w-full p-2 border rounded-lg" required />
              </div>
              <div>
                <label htmlFor="lastName" className="block font-medium">Last Name</label>
                <input id="lastName" name="last_name" type="text" className="w-full p-2 border rounded-lg" required />
              </div>
              <div>
                <label htmlFor="address" className="block font-medium">Address</label>
                <input id="address" name="address" type="text" className="w-full p-2 border rounded-lg" required />
              </div>
              <div>
                <label htmlFor="postalCode" className="block font-medium">Postal Code (Optional)</label>
                <input id="postalCode" name="postal_code" type="text" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label htmlFor="phone" className="block font-medium">Phone Number</label>
                <input 
                    placeholder="Phone number (e.g., 03xx-xxxxxxx)" 
                    name="phone_no" 
                    type="tel"
                    // pattern="\+\d{3}-\d{7}"
                    className="w-full p-2 border rounded-lg" 
                    title="Please enter a valid phone number in the format 03xx-xxxxxxx"
                    required
                />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Save this information for next time</span>
                </label>
              </div>
            </div>

            {/* Shipping Method Section */}
            <h2 className="text-xl font-bold mt-6">Shipping Method</h2>
            <div className="border-2 border-blue-500 bg-blue-100 p-4 rounded-lg flex justify-between">
              <span>Standard Shipping</span>
              <span>PKR 0</span>
            </div>

            {/* Payment Method Section */}
            <h2 className="text-xl font-bold mt-6">Payment Method</h2>
            <div className="border-2 border-blue-500 bg-blue-100 p-4 rounded-lg flex justify-between">
              <span>Cash on Delivery (COD)</span>
            </div>

            {/* Billing Address Section */}
            <h2 className="text-xl font-bold mt-6">Billing Address</h2>
            <div className="space-y-2">
              <label htmlFor="billing" className="flex items-center space-x-2">
                <input
                  id="billing"
                  type="radio"
                  name="billing_address"
                  value="same"
                  checked={billingSameAsShipping}
                  onChange={() => setBillingSameAsShipping(true)}
                />
                <span>Same as shipping address</span>
              </label>
              <label htmlFor="billing" className="flex items-center space-x-2">
                <input
                  id="billing"
                  type="radio"
                  name="billing_address"
                  value="different"
                  checked={!billingSameAsShipping}
                  onChange={() => setBillingSameAsShipping(false)}
                />
                <span>Use a different billing address</span>
              </label>
              {!billingSameAsShipping && (
                <div className="space-y-4 mt-4">
                  {/* Reuse delivery fields */}
                  <>
                    <div>
                      <label htmlFor={`City`} className="block font-medium">
                        City
                      </label>
                      <select
                        id={`City`}
                        name="city_bill"
                        className="w-full p-2 border rounded-lg"
                        required
                      >
                        {cities.map((city: string, index: number) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`Province`} className="block font-medium">
                        Province
                      </label>
                      <select
                        id={`Province`}
                        name="province_bill"
                        className="w-full p-2 border rounded-lg"
                        required
                      >
                        {provinces.map((province: string, index: number) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`Country`} className="block font-medium">
                        Country/Region
                      </label>
                      <select
                        id={`Country`}
                        name="country_bill"
                        className="w-full p-2 border rounded-lg"
                        required
                      >
                        {countries.map((country: string, index: number) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`FirstName`} className="block font-medium">
                        First Name
                      </label>
                      <input
                        id={`FirstName`}
                        name="first_name_bill"
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`LastName`} className="block font-medium">
                        Last Name
                      </label>
                      <input
                        id={`LastName`}
                        name="last_name_bill"
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`Address`} className="block font-medium">
                        Address
                      </label>
                      <input
                        id={`Address`}
                        name="address_bill"
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`PostalCode`} className="block font-medium">
                        Postal Code (Optional)
                      </label>
                      <input
                        id={`PostalCode`}
                        name="postal_code_bill"
                        type="text"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor={`Phone`} className="block font-medium">
                        Phone Number
                      </label>
                      <input
                        placeholder="Phone number (e.g., +92-300-1234567)" 
                        id={`Phone`}
                        name="phone_no_bill"
                        type="tel"
                        pattern="\+\d{1,3}-\d{3}-\d{7}" 
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                  </>
                </div>
              )}
            </div>

            <div>
              <label htmlFor={`Instructions`} className="block font-medium">
                Instructions
              </label>
              <textarea
                id={`Instructions`}
                name="instructions"
                rows={3}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <button type="submit" className="w-full bg-black text-white py-2 rounded-lg mt-6">
              Complete Order
            </button>
          </form>
        </div>

        {/* Right Section: Cart Summary */}
        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md mt-6 lg:mt-0 lg:ml-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                {/* Loop through cart items */}
                <div className="space-y-4">
                    {/* Example of Cart Item */}
                    {products && products.length > 0 &&
                        products.map((product, index) => (
                          <ProductCard 
                            key={index}
                            product_id={product.product_id}
                            quantity={product.quantity}
                            size={product.size}
                            color={product.color}
                            setTotalPrice={setSubTotal}
                          />
                    ))}
                </div>
                <div className="mt-4">
                <p>Subtotal: {getCurrencySymbol(country)}{subTotal.toFixed(2)}</p>
                <p>Shipping: {getCurrencySymbol(country)}{shippingTotal.toFixed(2)}</p>
                <p>Total: {getCurrencySymbol(country)}{(Number(subTotal || 0) + Number(shippingTotal || 0)).toFixed(2)}</p>
                </div>
            </div>
      </div>
    </section>
  );
};