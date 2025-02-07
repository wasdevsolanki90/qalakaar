"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { loginUser } from '@/app/actions';
import PassEye from "./PassEye"
import { useCart } from '@/components/context/CartContext';

export default function Login() {
  const router = useRouter();
  const { setName } = useCart()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const toastId = toast.loading("Logging in...");

    const formData = new FormData(event.currentTarget);

    const result = await loginUser(formData)

    if (!result.success) {
        toast.error(result.message, {
            id: toastId,
        })
    } else {
        toast.success(result.message, {
            id: toastId,
        });
        // localStorage.setItem("currUserName", result.name)
        setName(result.name)
        // router.back()
        router.push("/")
    }
  };

  return (
    <section className="h-screen flex flex-col justify-cente items-center px-6 pt-36 pb-20">
        <h1 className="capitalize text-white text-5xl text-center font-bold mb-10">
            Login
        </h1>
        <div className="flex justify-center items-center border-2 w-full max-w-md p-10 rounded-lg">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 w-full">
                <Input placeholder="Email" name="email" type="email" className="w-full sm:w-3/4 bg-white" />
                <PassEye />
                <Button type="submit" className="bg-white text-black text-base">Login</Button>
                <hr className="h-0.5 w-full bg-gray-300" />
                <div className="flex items-center gap-3">
                    <p className="text-lg text-white">Don&apos;t have an account?</p>
                    <Link href={"/signup"}>
                        <Button type="button" className="bg-white text-black text-base">Sign Up</Button>
                    </Link>
                </div>
            </form>
        </div>
    </section>
  )
}
