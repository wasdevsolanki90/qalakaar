"use client";

import React, { useEffect, useState } from "react";
import { Input } from '@/components/ui/input';
import { GetCountries } from "react-country-state-city";
import toast from "react-hot-toast";
import { addShippingCharge, fetchAllShippingCharges } from '@/app/actions'; 

export default function Charges() {
    const [charge, setCharge] = useState('');
    const [defaultCharge, setDefaultCharge] = useState('');
    const [country, setCountry] = useState('');
    const [countriesList, setCountriesList] = useState<any[]>([]);
    const [chargeList, setChargeList] = useState<any[]>([]);

    useEffect(() => {
        GetCountries().then((result) => {
            setCountriesList(result);
        });

        const getChargeList = async () => {
            try {
            const result: any = await fetchAllShippingCharges();
            if (result) {
                setChargeList(result);
            }
            } catch (error) {
                console.error("Failed to fetch charges: ", error);
                toast.error("Failed to load charges data.");
            }
        };
        getChargeList();
    }, []);

    // Handle form submission
    const handleDefaultSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const toastId = toast.loading("Saving...");
        const formData = new FormData(event.currentTarget);
        const charges = formData.get("charges");

        if(formData.get('charges') === ""){
            toast.error("Please enter charges", { id: toastId });
            return;
        }

        formData.set('country', 'Default');
        const result = await addShippingCharge(formData);
        if (result?.success) {

            if(result.data) {
                setChargeList(result.data);
            }
            
            toast.success(result.message, {
                id: toastId,
            })

            setCharge('');
            setCountry('');
            setDefaultCharge('');
            
        } else {
            toast.error(result.message, { id: toastId, });
        }

    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const toastId = toast.loading("Saving...");
        const formData = new FormData(event.currentTarget);

        if(formData.get('country') === ""){
            toast.error("Please select country", { id: toastId });
            return;
        }

        if(formData.get('charges') === ""){
            toast.error("Please enter charges", { id: toastId });
            return;
        }

        const result = await addShippingCharge(formData);
        if (result?.success) {

            if(result.data) {
                setChargeList(result.data);
            }
            
            toast.success(result.message, {
                id: toastId,
            })

            setCharge('');
            setCountry('');
            
        } else {
            toast.error(result.message, { id: toastId, });
        }
    };

    return (
        <section className="flex flex-col justify-center items-center px-6 pt-36 pb-20">
            <h5 className="capitalize text-white text-2xl text-center font-bold mb-10">Product Shipping Charges</h5>
            
            {/* Side-by-side container */}
            <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl">
                
                {/* Left Column - Form */}
                <div className="border-2 w-full lg:w-1/2 p-10 rounded-lg shadow-lg">
                    <h6 className="text-white text-base mb-2">Default charges in $</h6>
                    <form onSubmit={handleDefaultSubmit} className="flex flex-col gap-4 w-full text-black mb-10">
                        <Input
                            placeholder="Enter default charges"
                            name="charges"
                            type="number"
                            className="w-full"
                            value={defaultCharge}
                            onChange={(e) => setDefaultCharge(e.target.value)}
                        />

                        <div className="group flex items-center">
                            <button
                                type="submit"
                                className="relative overflow-hidden w-full flex justify-center items-center bg-black text-white border-2 border-white py-3 gap-2 transition-all duration-300"
                            >
                                <span className="absolute inset-0 bg-white translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0" aria-hidden="true"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                                    Save default Charges
                                </span>
                            </button>
                        </div>
                    </form>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full text-black">
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-white">Select Country</p>
                            <select 
                                id="country" 
                                name="country" 
                                className="w-full border rounded p-2" 
                                onChange={(e) => setCountry(e.target.value)}
                                value={country}
                            >
                                <option value=""> ---- Select country ---- </option>
                                {countriesList.map((item) => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <Input
                            placeholder="Enter Charges"
                            name="charges"
                            type="number"
                            className="w-full"
                            value={charge}
                            onChange={(e) => setCharge(e.target.value)}
                        />

                        <div className="group flex items-center">
                            <button
                                type="submit"
                                className="relative overflow-hidden w-full flex justify-center items-center bg-black text-white border-2 border-white py-3 gap-2 transition-all duration-300"
                            >
                                <span className="absolute inset-0 bg-white translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0" aria-hidden="true"></span>
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                                    Save Charges
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column - Country Charges List */}
                <div className="border-2 w-full lg:w-1/2 p-10 rounded-lg shadow-lg">
                    <h6 className="text-white text-base mb-2">Country Charges List</h6>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 text-white">
                            <thead>
                                <tr>
                                    <th className="border border-gray-500 px-4 py-2">#</th>
                                    <th className="border border-gray-500 px-4 py-2">Country</th>
                                    <th className="border border-gray-500 px-4 py-2">Charge</th>
                                </tr>
                            </thead>
                            <tbody>

                                {chargeList.length > 0 ? (
                                    chargeList.map((charge, index) => (
                                        <tr key={index} className="bg-gray-800">
                                            <td className="border border-gray-500 px-4 py-2 text-center">{index + 1}</td>
                                            <td className="border border-gray-500 px-4 py-2">{charge.country}</td>
                                            <td className="border border-gray-500 px-4 py-2 text-center">{charge.charges}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-gray-800">
                                        <td colSpan={3} className="border border-gray-500 px-4 py-2 text-center">No charges available</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </section>
    );
}
