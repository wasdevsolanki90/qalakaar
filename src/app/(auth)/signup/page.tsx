"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signupUser } from '@/app/actions'; 
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter()
  const cities:string[] = ["Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat" ]
  const provinces:string[] = ["Sindh", "Punjab", "Balochistan", "KPK"];
  const countries:string[] = ["Pakistan"];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const toastId = toast.loading("Signing up...");

    const formData = new FormData(event.currentTarget);

    const result = await signupUser(formData)

    if (!result.success) {
        toast.error("An account with this email already exists.", {
            id: toastId,
        })
    } else {
        toast.success("Congratulations, Account created.", {
            id: toastId,
        });
        router.push('/login')
    }
  };
  return (
    // <section className="h-screen flex flex-col justify-cente items-center px-6 pt-36 pb-20">
    //     <h1 className="capitalize text-white text-5xl text-center font-bold mb-10">
    //         Create a new Account / Signup
    //     </h1>
    //     <div className="flex justify-center items-center border-2 w-full max-w-md p-10 rounded-lg shadow-lg">
    //         <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 w-full text-black">
    //             <Input placeholder="First name" name="first_name" type="text" className="w-full sm:w-3/4" required/>
    //             <Input placeholder="Last name" name="last_name" type="text" className="w-full sm:w-3/4" required/>
    //             <Input placeholder="Email" name="email" type="email" className="w-full sm:w-3/4" required/>
    //             <Input placeholder="New Password" name="password" type="password" className="w-full sm:w-3/4" required/>
    //             <Input placeholder="Shipping address" name="shipping_address" type="text" className="w-full sm:w-3/4"/>
    //             <Input placeholder="Phone number" name="phone_no" type="tel" className="w-full sm:w-3/4"/>
    //             <hr className="h-0.5 w-full bg-gray-300" />
    //             <Button type="submit" className="bg-white text-black text-base">Signup</Button>
    //         </form>
    //     </div>
    // </section>
    <section className="flex flex-col justify-center items-center px-6 pt-36 pb-20">
      <h1 className="capitalize text-white text-5xl text-center font-bold mb-10">
        Create a new Account / Signup
      </h1>
      <div className="flex justify-center items-center border-2 w-full max-w-lg p-10 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full text-black"
        >
          {/* First and Last Name */}
          <div className="flex gap-4">
            <Input
              placeholder="First Name"
              name="first_name"
              type="text"
              className="w-1/2"
              required
            />
            <Input
              placeholder="Last Name"
              name="last_name"
              type="text"
              className="w-1/2"
              required
            />
          </div>

          {/* Email */}
          <Input
            placeholder="Email"
            name="email"
            type="email"
            className="w-full"
            required
          />

          {/* Password */}
          <Input
            placeholder="New Password"
            name="password"
            type="password"
            className="w-full"
            required
          />

          {/* Shipping Address */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-white">
              Optional: Fill these fields to save time during checkout.
            </p>
            <Input
              placeholder="Address"
              name="address"
              type="text"
              className="w-full"
            />
            <div className="flex gap-4">
              <select
                name="city"
                className="w-1/2 border rounded p-2"
              >
                  <option value="">
                    Select city
                  </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                name="province"
                className="w-1/2 border rounded p-2"
              >
                  <option value="">
                    Select province
                  </option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <select
                name="country"
                className="w-1/2 border rounded p-2"
              >
                  {/* <option value="">
                    Select country
                  </option> */}
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Postal Code"
                name="postal_code"
                type="text"
                className="w-1/2"
              />
            </div>
          </div>

          <Input 
            placeholder="Phone number (e.g., 03xx-xxxxxxx)" 
            name="phone_no" 
            type="tel" 
            pattern="\+\d{3}-\d{7}" 
            className="w-full" 
            title="Please enter a valid phone number in the format 03xx-xxxxxxx"
        />

          <hr className="h-0.5 w-full bg-gray-300" />

          <div className="group flex items-center">
          <button
            type="submit"
            className={"relative overflow-hidden w-full flex justify-center items-center bg-black text-white border-2 border-white py-3 gap-2 transition-all duration-300"}
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
              Sign up
            </span>
          </button>
        </div>
        </form>
      </div>
    </section>
  )
}
