"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LeftCont( {heading}: {heading:string} ) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
  
    const toastId = toast.loading("Sending message..."); 
    try {
      const response = await fetch("/api/emailSender", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
        }),
      });
  
      if (response.ok) {
        // alert("Message sent successfully!");
        toast.success("Message sent successfully!", {
            id: toastId,
        });
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.message}`);
        toast.error(`Failed to send message: ${errorData.message}`, {
            id: toastId,
          });
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        // alert("An unexpected error occurred. Please try again.");
        toast.error(`An unexpected error occurred. Please try again.`, {
            id: toastId,
        });
    }
  };      
  return (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">{heading}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Your Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Your Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
