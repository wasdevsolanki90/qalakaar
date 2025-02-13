"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Logo from "../../../public/images/logo_transparent2.png";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { logoutUser, fetchSession } from "@/app/actions";
import toast from "react-hot-toast";
import { User2Icon, ShoppingBag, MenuIcon, XIcon } from "lucide-react";
import Strip from "./Strip";
import { useRouter } from 'next/navigation';

export default function Navbar({ cartItemsCount }: { cartItemsCount: number }) {
  const router = useRouter()
  const [toggleNav, setToggleNav] = useState(false); // make responsive navbar with hamburger menu
  const [dropDownOpen, setDropDownOpen] = useState(false); // make responsive navbar with hamburger menu
  const { name, setName } = useCart()
  const { cartCount, setCartCount, setUserId } = useCart();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Only enable scroll functionality on pages other than `/aboutUs` or `/shippingPolicy`
    if (pathname !== "/aboutUs" && pathname !== "/shippingPolicy" && pathname !== "/returnPolicy" && pathname !== "/contactUs" && pathname !== "/privacyPolicy" && pathname !== "/terms" ) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };

      // Set initial scroll state
      setIsScrolled(window.scrollY > 0);

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // Ensure the navbar remains black on `/aboutUs` and `/shippingPolicy`
      setIsScrolled(true);
    }
  }, [pathname]);

  const links = [
    { linkName: "Men", linkPath: "/MaleProducts" },
    { linkName: "Women", linkPath: "/FemaleProducts" },
    { linkName: "Collections", linkPath: "/AllProducts" },
    // { linkName: "Qalaakar Exclusive Edition", linkPath: "/QalaakarExclusiveEdition" },
  ];

  useEffect(() => {
    setCartCount(cartItemsCount);
  }, [cartItemsCount,setCartCount]);

  const handleLinkClick = () => {
    setToggleNav(false); // Close the sidebar when a link is clicked
  };

  const handleDashboardLink = () => {
    setDropDownOpen(false);
  };

  const handleLogout = async () => {
    // console.log("Logging out")
    const toastId = toast.loading("Logging out...");
    await logoutUser()
    setName("Login")
    setUserId(null)
    toast.success("Logged out", {
      id: toastId,
    });
    router.push('/login')
  };

  return (
    <div className="relative">
      <div className="sticky top-0 z-40">
        <Strip />
      </div>
      <header 
        className={`fixed left-0 py-0 px-6 w-full z-50 transition-colors duration-300 ${
          isScrolled ? "bg-black bg-opacity-90 shadow-md top-0" : "bg-transparent top-8"
        }`}
      >
        <nav className="flex items-center justify-between my-2 relative">

          {/* Hamburger Menu for Mobile Screens */}
          <button
            className={`block lg:hidden`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <MenuIcon className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Menu for Computer Screens */}
          <div className="hidden lg:block justify-items-start">
            <ul className="flex gap-x-8 text-lg text-white font-semibold">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    onClick={handleLinkClick}
                    className={pathname === link.linkPath ? "text-red-500" : "text-white"}
                    href={link.linkPath}
                  >
                    {link.linkName.split("").join(" ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo for All Screens */}
          <div className="flex-1 flex justify-center ml-10 mr-0 lg:mr-44 lg:ml-0">
            <Link href={"/"} onClick={handleLinkClick}>
              <Image 
                src={"/images/qalakaar-logo.png"} 
                width={150} 
                height={150} 
                alt="Logo" 
                className="h-16 w-32 lg:h-20 lg:w-44"
              />
            </Link>
          </div>

          {/* Cart and Profile Icons for Mobile Screens */}
          <div className="flex items-center gap-0 lg:hidden">
            <Link href={"/Cart"} onClick={handleLinkClick}>
              <button className="p-2 relative">
                <ShoppingBag className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
                    {cartCount}
                  </div>
                )}
              </button>
            </Link>
            {name === 'Login' ? (
              <Link href={'/login'} className="flex flex-col justify-center items-center">
                <button className="flex items-center gap-x-2 text-white rounded-lg p-2">
                  <User2Icon className="w-6 h-6 text-white" />
                </button>
              </Link>
            ) : (
              <div className="relative">
                <div className="flex gap-x-1 items-center cursor-pointer" onClick={()=>setDropDownOpen(true)}>
                  <p className="text-white text-lg font-semibold">{name}</p>
                  <ChevronDown className="w-4 h-4 mt-1 text-white" />
                </div>
                {dropDownOpen && (
                  <ul
                    className="absolute right-0 mt-2 w-24 bg-slate-50 text-xs sm:text-base font-normal rounded-md shadow-md py-2 border border-slate-200"
                  >
                    <li className="py-1 px-2">
                      <button onClick={handleLogout} type="button">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Cart and Profile for Computer Screens */}
          <div className="hidden lg:flex lg:gap-5 lg:items-center">
            <Link href={"/Cart"} onClick={handleLinkClick}>
              <button className="p-2 relative">
                <ShoppingBag className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
                    {cartCount}
                  </div>
                )}
              </button>
            </Link>
            {name === 'Login' ? (
              <Link href={'/login'} className="flex flex-col justify-center items-center">
                <button className="flex items-center gap-x-2 text-white rounded-lg p-2">
                  <User2Icon className="w-6 h-6 text-white" />
                </button>
              </Link>
            ) : (
              <div className="relative">
                <div className="flex gap-x-1 items-center cursor-pointer" onClick={()=>setDropDownOpen(true)}>
                  <p className="text-white text-lg font-semibold">{name}</p>
                  <ChevronDown className="w-4 h-4 mt-1 text-white" />
                </div>
                {dropDownOpen && (
                  <ul
                    className="absolute right-0 mt-2 w-24 bg-slate-50 text-xs sm:text-base font-normal rounded-md shadow-md py-2 border border-slate-200"
                  >
                    <li className="py-1 px-2">
                      <Link 
                        onClick={handleDashboardLink}
                        href={'/dashboard'}>
                        Dashboard
                      </Link>
                    </li>
                    <li className="py-1 px-2">
                      <button onClick={handleLogout} type="button">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Hamburger Menu Content */}
          <div
            className={`lg:hidden absolute w-full bg-black text-white flex flex-col mx-auto text-center gap-y-8 shadow-lg ${
              toggleNav ? "top-0 duration-300" : "-top-[26rem] duration-300"
            }`}
          >
            <button onClick={() => setToggleNav(!toggleNav)} className="self-end">
              <XIcon className="w-6 h-6 text-white" />
            </button>
            <ul className="text-lg text-white font-semibold">
              {links.map((link, index) => (
                <li key={index} className="mb-6">
                  <Link
                    onClick={handleLinkClick}
                    className={pathname === link.linkPath ? "text-red-500" : "text-white"}
                    href={link.linkPath}
                  >
                    {link.linkName.split("").join(" ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
