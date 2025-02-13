'use server'
import { passwordHasher } from '@/lib/password';
import { getSession, login, logout, signup } from '@/lib/serverLib';
 
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

export async function loginUser(formData: FormData) {
    const res = await login(formData)
    const result = await res?.json()
    if (res?.ok) {
        return { success: true, message: "Login successful", name: result.name }
    } else {
        return { success: false, message: result.error }
    }
}

// export async function fetchOrders() {
//     try {
//         const res = await orders();
//         if (!res?.ok) {
//             return { success: false, message: "Failed to fetch orders" };
//         }

//         const userOrder = await res.json(); 
//         return { success: true, userOrder };
//     } catch (error) {
//         console.error("Error in fetchOrders:", error);
//         return { success: false, message: "An error occurred" };
//     }
// }

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

export async function createOrder(formData: FormData) {
    
}