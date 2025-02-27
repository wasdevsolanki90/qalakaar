"use client";

import React, { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateAuthUser, fetchAuthUser } from '@/app/actions';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { GetCountries, GetState, GetCity } from "react-country-state-city";

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
  const countries = [ 
    {"name": "Afghanistan", "code": "AF"}, 
    {"name": "land Islands", "code": "AX"}, 
    {"name": "Albania", "code": "AL"}, 
    {"name": "Algeria", "code": "DZ"}, 
    {"name": "American Samoa", "code": "AS"}, 
    {"name": "AndorrA", "code": "AD"}, 
    {"name": "Angola", "code": "AO"}, 
    {"name": "Anguilla", "code": "AI"}, 
    {"name": "Antarctica", "code": "AQ"}, 
    {"name": "Antigua and Barbuda", "code": "AG"}, 
    {"name": "Argentina", "code": "AR"}, 
    {"name": "Armenia", "code": "AM"}, 
    {"name": "Aruba", "code": "AW"}, 
    {"name": "Australia", "code": "AU"}, 
    {"name": "Austria", "code": "AT"}, 
    {"name": "Azerbaijan", "code": "AZ"}, 
    {"name": "Bahamas", "code": "BS"}, 
    {"name": "Bahrain", "code": "BH"}, 
    {"name": "Bangladesh", "code": "BD"}, 
    {"name": "Barbados", "code": "BB"}, 
    {"name": "Belarus", "code": "BY"}, 
    {"name": "Belgium", "code": "BE"}, 
    {"name": "Belize", "code": "BZ"}, 
    {"name": "Benin", "code": "BJ"}, 
    {"name": "Bermuda", "code": "BM"}, 
    {"name": "Bhutan", "code": "BT"}, 
    {"name": "Bolivia", "code": "BO"}, 
    {"name": "Bosnia and Herzegovina", "code": "BA"}, 
    {"name": "Botswana", "code": "BW"}, 
    {"name": "Bouvet Island", "code": "BV"}, 
    {"name": "Brazil", "code": "BR"}, 
    {"name": "British Indian Ocean Territory", "code": "IO"}, 
    {"name": "Brunei Darussalam", "code": "BN"}, 
    {"name": "Bulgaria", "code": "BG"}, 
    {"name": "Burkina Faso", "code": "BF"}, 
    {"name": "Burundi", "code": "BI"}, 
    {"name": "Cambodia", "code": "KH"}, 
    {"name": "Cameroon", "code": "CM"}, 
    {"name": "Canada", "code": "CA"}, 
    {"name": "Cape Verde", "code": "CV"}, 
    {"name": "Cayman Islands", "code": "KY"}, 
    {"name": "Central African Republic", "code": "CF"}, 
    {"name": "Chad", "code": "TD"}, 
    {"name": "Chile", "code": "CL"}, 
    {"name": "China", "code": "CN"}, 
    {"name": "Christmas Island", "code": "CX"}, 
    {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
    {"name": "Colombia", "code": "CO"}, 
    {"name": "Comoros", "code": "KM"}, 
    {"name": "Congo", "code": "CG"}, 
    {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
    {"name": "Cook Islands", "code": "CK"}, 
    {"name": "Costa Rica", "code": "CR"}, 
    {"name": "Cote D\"Ivoire", "code": "CI"}, 
    {"name": "Croatia", "code": "HR"}, 
    {"name": "Cuba", "code": "CU"}, 
    {"name": "Cyprus", "code": "CY"}, 
    {"name": "Czech Republic", "code": "CZ"}, 
    {"name": "Denmark", "code": "DK"}, 
    {"name": "Djibouti", "code": "DJ"}, 
    {"name": "Dominica", "code": "DM"}, 
    {"name": "Dominican Republic", "code": "DO"}, 
    {"name": "Ecuador", "code": "EC"}, 
    {"name": "Egypt", "code": "EG"}, 
    {"name": "El Salvador", "code": "SV"}, 
    {"name": "Equatorial Guinea", "code": "GQ"}, 
    {"name": "Eritrea", "code": "ER"}, 
    {"name": "Estonia", "code": "EE"}, 
    {"name": "Ethiopia", "code": "ET"}, 
    {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
    {"name": "Faroe Islands", "code": "FO"}, 
    {"name": "Fiji", "code": "FJ"}, 
    {"name": "Finland", "code": "FI"}, 
    {"name": "France", "code": "FR"}, 
    {"name": "French Guiana", "code": "GF"}, 
    {"name": "French Polynesia", "code": "PF"}, 
    {"name": "French Southern Territories", "code": "TF"}, 
    {"name": "Gabon", "code": "GA"}, 
    {"name": "Gambia", "code": "GM"}, 
    {"name": "Georgia", "code": "GE"}, 
    {"name": "Germany", "code": "DE"}, 
    {"name": "Ghana", "code": "GH"}, 
    {"name": "Gibraltar", "code": "GI"}, 
    {"name": "Greece", "code": "GR"}, 
    {"name": "Greenland", "code": "GL"}, 
    {"name": "Grenada", "code": "GD"}, 
    {"name": "Guadeloupe", "code": "GP"}, 
    {"name": "Guam", "code": "GU"}, 
    {"name": "Guatemala", "code": "GT"}, 
    {"name": "Guernsey", "code": "GG"}, 
    {"name": "Guinea", "code": "GN"}, 
    {"name": "Guinea-Bissau", "code": "GW"}, 
    {"name": "Guyana", "code": "GY"}, 
    {"name": "Haiti", "code": "HT"}, 
    {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
    {"name": "Holy See (Vatican City State)", "code": "VA"}, 
    {"name": "Honduras", "code": "HN"}, 
    {"name": "Hong Kong", "code": "HK"}, 
    {"name": "Hungary", "code": "HU"}, 
    {"name": "Iceland", "code": "IS"}, 
    {"name": "India", "code": "IN"}, 
    {"name": "Indonesia", "code": "ID"}, 
    {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
    {"name": "Iraq", "code": "IQ"}, 
    {"name": "Ireland", "code": "IE"}, 
    {"name": "Isle of Man", "code": "IM"}, 
    {"name": "Israel", "code": "IL"}, 
    {"name": "Italy", "code": "IT"}, 
    {"name": "Jamaica", "code": "JM"}, 
    {"name": "Japan", "code": "JP"}, 
    {"name": "Jersey", "code": "JE"}, 
    {"name": "Jordan", "code": "JO"}, 
    {"name": "Kazakhstan", "code": "KZ"}, 
    {"name": "Kenya", "code": "KE"}, 
    {"name": "Kiribati", "code": "KI"}, 
    {"name": "Korea, Democratic People\"S Republic of", "code": "KP"}, 
    {"name": "Korea, Republic of", "code": "KR"}, 
    {"name": "Kuwait", "code": "KW"}, 
    {"name": "Kyrgyzstan", "code": "KG"}, 
    {"name": "Lao People\"S Democratic Republic", "code": "LA"}, 
    {"name": "Latvia", "code": "LV"}, 
    {"name": "Lebanon", "code": "LB"}, 
    {"name": "Lesotho", "code": "LS"}, 
    {"name": "Liberia", "code": "LR"}, 
    {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
    {"name": "Liechtenstein", "code": "LI"}, 
    {"name": "Lithuania", "code": "LT"}, 
    {"name": "Luxembourg", "code": "LU"}, 
    {"name": "Macao", "code": "MO"}, 
    {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
    {"name": "Madagascar", "code": "MG"}, 
    {"name": "Malawi", "code": "MW"}, 
    {"name": "Malaysia", "code": "MY"}, 
    {"name": "Maldives", "code": "MV"}, 
    {"name": "Mali", "code": "ML"}, 
    {"name": "Malta", "code": "MT"}, 
    {"name": "Marshall Islands", "code": "MH"}, 
    {"name": "Martinique", "code": "MQ"}, 
    {"name": "Mauritania", "code": "MR"}, 
    {"name": "Mauritius", "code": "MU"}, 
    {"name": "Mayotte", "code": "YT"}, 
    {"name": "Mexico", "code": "MX"}, 
    {"name": "Micronesia, Federated States of", "code": "FM"}, 
    {"name": "Moldova, Republic of", "code": "MD"}, 
    {"name": "Monaco", "code": "MC"}, 
    {"name": "Mongolia", "code": "MN"}, 
    {"name": "Montenegro", "code": "ME"},
    {"name": "Montserrat", "code": "MS"},
    {"name": "Morocco", "code": "MA"}, 
    {"name": "Mozambique", "code": "MZ"}, 
    {"name": "Myanmar", "code": "MM"}, 
    {"name": "Namibia", "code": "NA"}, 
    {"name": "Nauru", "code": "NR"}, 
    {"name": "Nepal", "code": "NP"}, 
    {"name": "Netherlands", "code": "NL"}, 
    {"name": "Netherlands Antilles", "code": "AN"}, 
    {"name": "New Caledonia", "code": "NC"}, 
    {"name": "New Zealand", "code": "NZ"}, 
    {"name": "Nicaragua", "code": "NI"}, 
    {"name": "Niger", "code": "NE"}, 
    {"name": "Nigeria", "code": "NG"}, 
    {"name": "Niue", "code": "NU"}, 
    {"name": "Norfolk Island", "code": "NF"}, 
    {"name": "Northern Mariana Islands", "code": "MP"}, 
    {"name": "Norway", "code": "NO"}, 
    {"name": "Oman", "code": "OM"}, 
    {"name": "Pakistan", "code": "PK"}, 
    {"name": "Palau", "code": "PW"}, 
    {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
    {"name": "Panama", "code": "PA"}, 
    {"name": "Papua New Guinea", "code": "PG"}, 
    {"name": "Paraguay", "code": "PY"}, 
    {"name": "Peru", "code": "PE"}, 
    {"name": "Philippines", "code": "PH"}, 
    {"name": "Pitcairn", "code": "PN"}, 
    {"name": "Poland", "code": "PL"}, 
    {"name": "Portugal", "code": "PT"}, 
    {"name": "Puerto Rico", "code": "PR"}, 
    {"name": "Qatar", "code": "QA"}, 
    {"name": "Reunion", "code": "RE"}, 
    {"name": "Romania", "code": "RO"}, 
    {"name": "Russian Federation", "code": "RU"}, 
    {"name": "RWANDA", "code": "RW"}, 
    {"name": "Saint Helena", "code": "SH"}, 
    {"name": "Saint Kitts and Nevis", "code": "KN"}, 
    {"name": "Saint Lucia", "code": "LC"}, 
    {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
    {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
    {"name": "Samoa", "code": "WS"}, 
    {"name": "San Marino", "code": "SM"}, 
    {"name": "Sao Tome and Principe", "code": "ST"}, 
    {"name": "Saudi Arabia", "code": "SA"}, 
    {"name": "Senegal", "code": "SN"}, 
    {"name": "Serbia", "code": "RS"}, 
    {"name": "Seychelles", "code": "SC"}, 
    {"name": "Sierra Leone", "code": "SL"}, 
    {"name": "Singapore", "code": "SG"}, 
    {"name": "Slovakia", "code": "SK"}, 
    {"name": "Slovenia", "code": "SI"}, 
    {"name": "Solomon Islands", "code": "SB"}, 
    {"name": "Somalia", "code": "SO"}, 
    {"name": "South Africa", "code": "ZA"}, 
    {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
    {"name": "Spain", "code": "ES"}, 
    {"name": "Sri Lanka", "code": "LK"}, 
    {"name": "Sudan", "code": "SD"}, 
    {"name": "Suriname", "code": "SR"}, 
    {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
    {"name": "Swaziland", "code": "SZ"}, 
    {"name": "Sweden", "code": "SE"}, 
    {"name": "Switzerland", "code": "CH"}, 
    {"name": "Syrian Arab Republic", "code": "SY"}, 
    {"name": "Taiwan, Province of China", "code": "TW"}, 
    {"name": "Tajikistan", "code": "TJ"}, 
    {"name": "Tanzania, United Republic of", "code": "TZ"}, 
    {"name": "Thailand", "code": "TH"}, 
    {"name": "Timor-Leste", "code": "TL"}, 
    {"name": "Togo", "code": "TG"}, 
    {"name": "Tokelau", "code": "TK"}, 
    {"name": "Tonga", "code": "TO"}, 
    {"name": "Trinidad and Tobago", "code": "TT"}, 
    {"name": "Tunisia", "code": "TN"}, 
    {"name": "Turkey", "code": "TR"}, 
    {"name": "Turkmenistan", "code": "TM"}, 
    {"name": "Turks and Caicos Islands", "code": "TC"}, 
    {"name": "Tuvalu", "code": "TV"}, 
    {"name": "Uganda", "code": "UG"}, 
    {"name": "Ukraine", "code": "UA"}, 
    {"name": "United Arab Emirates", "code": "AE"}, 
    {"name": "United Kingdom", "code": "GB"}, 
    {"name": "United States", "code": "US"}, 
    {"name": "United States Minor Outlying Islands", "code": "UM"}, 
    {"name": "Uruguay", "code": "UY"}, 
    {"name": "Uzbekistan", "code": "UZ"}, 
    {"name": "Vanuatu", "code": "VU"}, 
    {"name": "Venezuela", "code": "VE"}, 
    {"name": "Viet Nam", "code": "VN"}, 
    {"name": "Virgin Islands, British", "code": "VG"}, 
    {"name": "Virgin Islands, U.S.", "code": "VI"}, 
    {"name": "Wallis and Futuna", "code": "WF"}, 
    {"name": "Western Sahara", "code": "EH"}, 
    {"name": "Yemen", "code": "YE"}, 
    {"name": "Zambia", "code": "ZM"}, 
    {"name": "Zimbabwe", "code": "ZW"} 
    ];

  const [country, setCountry] = useState<number | undefined>();
  const [currentState, setcurrentState] = useState<number>();
  const [city, setCity] = useState<number>();
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [citiesList, setCitiesList] = useState<any[]>([]);

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
          console.log('authUser: ', authUser);
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

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);
  
  useEffect(() => {
    if (country) {
      GetState((country)).then((result) => {
        setStateList(result);
      });
    }
  }, [country]);
  
  useEffect(() => {
    if (currentState && country)
      GetCity((country),(currentState)).then((result) => {
        setCitiesList(result);
      });
  }, [currentState]);

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

    if(country) {
      if(formData.get('country') === ""){
        toast.error("Please select country", { id: toastId });
        return;
      }
      
      let selectedCountry = countriesList.find((c) => c.id == formData.get('country'));
      if(selectedCountry){
        formData.set('country', selectedCountry.name);
      }
    } else {
      formData.set('country', user.country);
    }

    if(currentState) {
      if(formData.get('province') === ""){
        toast.error("Please select state", { id: toastId });
        return;
      }
  
      let selectedState = stateList.find((s) => s.id == formData.get('province'));
      if(selectedState){
        formData.set('province', selectedState.name);
      }
    }

    if(city) {
      if(formData.get('city') === ""){
        toast.error("Please select city", { id: toastId });
        return;
      }
  
      let selectedCity = citiesList.find((ct) => ct.id == formData.get('city'));
      if(selectedCity){
        formData.set('city', selectedCity.name);
      }
    } else {
      formData.set('city', user.city);
    }
    // console.log('form data:', formData.get('country'));
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
            {/* <select
                name="country"
                className="w-full border rounded p-2"
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              >
                {countries.map((item, index) => (
                  <option key={index} value={item.name}>{item.name}</option>
                ))}
            </select> */}
            <div className="flex gap-4">
              <select id="country" name="country" className="w-1/2 border rounded p-2" 
                    onChange={(e) => setCountry(Number(e.target.value))}
                    value={country}
                  >
                <option value="">Select country</option>
                {countriesList.map((item)=>(
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>

              <select id="province" name="province" className="w-1/2 p-2 border rounded"
                onChange={(e) => setcurrentState(Number(e.target.value))}
                value={currentState}
              >
                {/* Add provinces of Pakistan */}
                <option value="">Select province</option>
                {stateList.map((item)=>(
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            {/* Country and Postal Code */}
            <div className="flex gap-4">
              {/* <select
                name="city"
                className="w-1/2 border rounded p-2"
                value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
              >
                <option value="">Select city</option>
                {cities.map((city, index) => (
                  <option key={`${city}-${index}`} value={city}>{city}</option>
                ))}
              </select> */}
                <select id="city" name="city" className="w-1/2 p-2 border rounded"
                  onChange={(e) => setCity(Number(e.target.value))}
                  value={city}
                >
                  {/* Add cities of Pakistan */}
                  <option value="">Select city</option>
                  {citiesList.map((item)=>(
                    <option key={item.id} value={item.id}>{item.name}</option>
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
