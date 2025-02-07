"use client";
import { fetchSession } from "@/app/actions";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import * as React from "react";

// Create the cart context
const CartContext = createContext<any>(null);

function useCart() {
  return useContext(CartContext);
}

// Create a provider for the cart context
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [name, setName] = useState("Login");

  useEffect(() => {
    async function userSession() {
      const response = await fetchSession();
      setName(response.name);
    }
    userSession();
  }, []);

  // console.log(cartCount)
  const contextValue = {
    cartCount,
    setCartCount,
    name,
    setName
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export { useCart, CartContext, CartProvider };
