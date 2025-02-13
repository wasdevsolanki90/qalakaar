import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { UserT } from "@/lib/types"
import { eq, and, sql, inArray  } from "drizzle-orm";
import { cartTable, db, userTable, orderTable, orderDetailsTable } from "@/lib/drizzle"; 
import { bcryptCompare } from "./password";
import { insert } from "sanity";

const secret = process.env.JWT_SECRET
const key = new TextEncoder().encode(secret) 

// function searchUser(email: string, password:string): UsersT | boolean {
//     const users = getUsers();
//     // console.log(users)
//     const user: UsersT | undefined = users.find((user) => 
//         user.email === email
//     )
    
//     if (!user)
//         return false;
//     else if (user.password !== password) 
//         return true;

//     // console.log("User found,", user);
//     return user
// }

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(key)
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    })

    return payload
}

async function updateCartTale(userEmail: string) {
    const user_id:string | undefined = cookies().get("user_id") ?.value

    if (user_id) {
        await db
            .update(cartTable)
            .set({email: userEmail})
            .where(eq(cartTable.user_id, user_id))
            .returning()
    }
}

export async function login(formData: FormData) {
    try {   
        // Verify credentials and get the user
        const userEmail: string | undefined = formData.get("email")?.toString()
        const userPassword: string | undefined = formData.get("password")?.toString()

        // console.log(userEmail, userPassword)

        if (!userEmail || !userPassword) 
            throw new Error("Missing credentials")
        
        const res = await db
        .select({
            name: userTable.first_name,
            email: userTable.email,
            password: userTable.password,
            user_id: userTable.user_id,
        })
        .from(userTable)
        .where(eq(userTable.email, userEmail));
        
        // console.log("Name in server action:", res[0].name)

        // console.log(res[0].password, userPassword)
        const comparePassword:boolean = await bcryptCompare(userPassword, res[0].password)
        if (comparePassword) {
            const user: {name:string, email: string, password: string, user_id: number} = {
                name: res[0].name,
                email: userEmail,
                password: userPassword,
                user_id: res[0].user_id,
            }
            // Create the session for the user
            const expires = new Date(Date.now() + 1 * 60 * 60 * 1000)
            const session = await encrypt({ user, expires })
    
            // Save the session in a cookie
            cookies().set("session", session, { expires, httpOnly:true })

            await updateCartTale(userEmail)
            
        } else {
            throw new Error("Invalid credentials")
        }

        return NextResponse.json({
            message: "Login successful",
            status: 200,
            name: res[0].name
        })

    } catch (error) {
        if (error instanceof Error) {
            console.error ("Login error:", error.message)
            return NextResponse.json({ 
                error: error.message }, 
                { status: 404 }
            );
        }
    }
}

export async function logout() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) })
    
}

export async function signup(formData: FormData) {
    try {   
        // Verify credentials and get the user
        const firstName: string | undefined = formData.get("first_name")?.toString()
        const lastName: string | undefined = formData.get("last_name")?.toString()
        // const dateOfBirth: string | undefined = formData.get("date_of_birth")?.toString()
        const userEmail: string | undefined = formData.get("email")?.toString()
        const userPassword: string | undefined = formData.get("password")?.toString()
        const address: string | undefined = formData.get("address")?.toString()
        const city: string | undefined = formData.get("city")?.toString()
        const country: string | undefined = formData.get("country")?.toString()
        const postal_code: string | undefined = formData.get("postal_code")?.toString()
        const phone_no: string | undefined = formData.get("phone_no")?.toString()

        if (!firstName || !lastName || !userEmail || !userPassword) 
            throw new Error("Missing credentials")

        const res = await db
            .insert(userTable)
            .values({
                first_name: firstName,
                last_name: lastName,
                email: userEmail,
                password: userPassword,
                address: address,
                city: city,
                country: country,
                postal_code: postal_code,
                phone_no: phone_no
            })
            .returning();
        
        await updateCartTale(userEmail)

        // console.log("Inserted:", res);
        return NextResponse.json(res);

        return NextResponse.json({
            message: "Signup successful",
            status: 200,
        })

    } catch (error) {
        if (error instanceof Error) {
            console.error ("SignUp error:", error.message)
            return NextResponse.json({ 
                error: error.message },
                { status: 409 }
            );
        }
    }
}

export async function getSession() {
    const session = cookies().get("session")?.value
    if (!session) return null
    return await decrypt(session)
}

export async function updateSession(request: NextRequest, session:string) {
    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 1 * 60 * 60 * 1000)
    const res = NextResponse.next()
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    })

    return res
}

