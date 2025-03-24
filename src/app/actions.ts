'use server'

import { passwordHasher } from '@/lib/password';
import { 
    getSession, 
    login, 
    logout, 
    signup, 
    getAuthUser, 
    updateProfile, 
    addShippingCharges,
    getAllShippingCharges, 
    getChargesByCountry,
    updateQuantity,
} from '@/lib/serverLib';
 
export async function signupUser(formData: FormData) {

    const password = formData.get("password")
    if (typeof password === 'string') {
        const hashedPassword = await passwordHasher(password);
        formData.set("password", hashedPassword); 
    }


    const res = await signup(formData)
    const result = await res?.json()
    // console.log(res, result)
    if (res?.ok) {
        return { success: true, message: "Signup successful"  }
    } else {
        return { success: false, message: result.error }
    }
}

export async function updateAuthUser(formData: FormData) {
    const password = formData.get("password");
    if (password && typeof password === 'string') {
        const hashedPassword = await passwordHasher(password);
        formData.set("password", hashedPassword);
    }

    const res = await updateProfile(formData);
    const result = await res?.json();

    if (res?.ok) {
        return { success: true, message: "Update successful", result: result };
    } else {
        return { success: false, message: result?.error || "Update failed" };
    }
}

export async function loginUser(formData: FormData) {
    const res = await login(formData)
    const result = await res?.json()
    if (res?.ok) {
        return { success: true, message: "Login successful", name: result.name }
    } else {
        return { success: false, message: result.error }
    }
}

export async function logoutUser() {
    await logout()
}

export async function fetchSession() {
    const session = await getSession();
    if (!session) {
        return { name: "Login" }
    }
    return { 
        name: session.user.name, 
        userId: session.user.user_id,
    }
}

export async function fetchAuthUser() {
    const session = await getAuthUser();
    if (!session) {
        return { name: "Login" }
    }

    return session;
}

export async function createOrder(formData: FormData) {
    
}

export async function addShippingCharge(formData: FormData) {

    const res = await addShippingCharges(formData)
    const result = await res?.json()

    if (res?.ok ) {
        const getAllCharges = await getAllShippingCharges();
        return {
            success: true, 
            message: result.message,  
            data: getAllCharges,  
        }

    } else {
        return { 
            success: false, 
            message: result.error 
        }
    }
}

export async function fetchAllShippingCharges() {
    const result = await getAllShippingCharges();
    return result;
}

export async function fetchChargesByCountry(country: string) {
    try {
      const res = await getChargesByCountry(country);
      const result = await res; // No need to call .json() again
  
      if (result?.status === 200 && result?.data && result.data.length > 0) {
        return {
          success: true,
          data: result.data,
        };
      } else {
        console.error("Failed to fetch charges:", result);
        return {
          success: false,
          message: result?.message || "Unknown error",
        };
      }
    } catch (error) {
      console.error("fetchChargesByCountry error:", error);
      return {
        success: false,
        message: "Request failed",
      };
    }
}

export async function handlechangeQuantity(
        id: string, 
        q: number, 
        price: number,
        size: string,
        color: string,
    ) {
    try {

        const res = await updateQuantity(id, q, price, size, color);
        const result = await res; // No need to call .json() again
    
        if (result?.status === 200) {
            return {
              success: true,
              data: result,
            };
          } else {
            return {
              success: false,
              message: "Failed to update quantity",
            };
        }
          
    } catch (error) {
      console.error("fetchChargesByCountry error:", error);
      return {
        success: false,
        message: "Request failed",
      };
    }
}
  