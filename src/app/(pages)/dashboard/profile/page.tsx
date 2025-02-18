"use client";

import React, { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateAuthUser, fetchAuthUser } from '@/app/actions';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

// User type for state management
type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  phone_no: string;
};

export default function Profile() {
  const router = useRouter();
  const cities:string[] = ["Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat" ]
  const countries = ["Pakistan"];

  const [user, setUser] = useState<User>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    phone_no: "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const authUser: any = await fetchAuthUser();
        if (authUser) {
          setUser({
            first_name: authUser.first_name,
            last_name: authUser.last_name || "",
            email: authUser.email,
            password: authUser.password,
            address: authUser.address || "",
            city: authUser.city || "",
            country: authUser.country || "",
            postal_code: authUser.postal_code || "",
            phone_no: authUser.phone_no || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user: ", error);
        toast.error("Failed to load user data.");
      }
    };
    getUser();
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const toastId = toast.loading("Saving...");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    if (!email || !email.includes("@")) {
        toast.error("Please enter a valid email address.", { id: toastId });
        return;
    }

    const result = await updateAuthUser(formData);
    if (!result.success) {
      toast.error(result.message || "An error occurred.", { id: toastId });
    } else {
      toast.success("Profile updated successfully.", { id: toastId });
      router.push('/dashboard');
    }
  };

  return (
    <section className="flex flex-col justify-center items-center px-6 pt-36 pb-20">
      <h1 className="capitalize text-white text-5xl text-center font-bold mb-10">Profile</h1>
      <div className="flex justify-center items-center border-2 w-full max-w-lg p-10 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full text-black">
          {/* First and Last Name */}
          <div className="flex gap-4">
            <Input
              placeholder="First Name"
              name="first_name"
              type="text"
              className="w-1/2"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              name="last_name"
              type="text"
              className="w-1/2"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
          </div>

          {/* Email */}
          <Input
            placeholder="Email"
            name="email"
            type="email"
            className="w-full"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          {/* Password */}
          <Input
            placeholder="New Password"
            name="password"
            type="password"
            className="w-full"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          {/* Shipping Address */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-white">Optional: Fill these fields to save time during checkout.</p>
            <Input
              placeholder="Address"
              name="address"
              type="text"
              className="w-full"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />

            {/* City Dropdown */}
            <select
              name="city"
              className="w-full border rounded p-2"
              value={user.city}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
            >
              <option value="">Select city</option>
              {cities.map((city, index) => (
                <option key={`${city}-${index}`} value={city}>{city}</option>
              ))}
            </select>

            {/* Country and Postal Code */}
            <div className="flex gap-4">
              <select
                name="country"
                className="w-1/2 border rounded p-2"
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <Input
                placeholder="Postal Code"
                name="postal_code"
                type="text"
                className="w-1/2"
                value={user.postal_code}
                onChange={(e) => setUser({ ...user, postal_code: e.target.value })}
              />
            </div>
          </div>

          {/* Phone Number */}
          <Input
            placeholder="Phone number (e.g., 03xx-xxxxxxx)"
            name="phone_no"
            type="tel"
            className="w-full"
            value={user.phone_no}
            onChange={(e) => setUser({ ...user, phone_no: e.target.value })}
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
              Save Profile
            </span>
          </button>
        </div>
        </form>
      </div>
    </section>
  );
}
