import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { UserT } from "@/lib/types"
import { eq, sql, inArray  } from "drizzle-orm";
import { cartTable, db, userTable, orderTable, orderDetailsTable, shippingChargesTable } from "@/lib/drizzle"; 
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

export async function updateProfile(formData: FormData) {
    try {   
        // Verify credentials and get the user
        const firstName = formData.get("first_name")?.toString();
        const lastName = formData.get("last_name")?.toString();
        const userEmail = formData.get("email")?.toString();
        const userPassword = formData.get("password")?.toString();
        const address = formData.get("address")?.toString();
        const city = formData.get("city")?.toString();
        const country = formData.get("country")?.toString();
        const postal_code = formData.get("postal_code")?.toString();
        const phone_no = formData.get("phone_no")?.toString();

        if (!firstName || !lastName || !userEmail) {
            throw new Error("Missing credentials")
        }
        
        const updateData: Record<string, string | undefined> = {
            first_name: firstName,
            last_name: lastName,
            address,
            city,
            country,
            postal_code,
            phone_no,
        };

        if (userPassword) {
            updateData.password = userPassword;
        }

        const res = await db
            .update(userTable)
            .set(updateData)
            .where(eq(userTable.email, userEmail))
            .returning();
        
        await updateCartTale(userEmail)

        if (!res) {
            throw new Error("User not found or update failed");
        }

        return NextResponse.json(updateData);

    } catch (error) {
        if (error instanceof Error) {
            console.error ("Update error:", error.message)
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

export async function getAuthUser() {
    const session = cookies().get("session")?.value
    if (!session) return null
    const auth = await decrypt(session)

    const user = await db
        .select({
            first_name: userTable.first_name,
            last_name: userTable.last_name,
            email: userTable.email,
            password: userTable.password,
            address: userTable.address,
            city: userTable.city,
            country: userTable.country,
            postal_code: userTable.postal_code,
            phone_no: userTable.phone_no,
            user_id: userTable.user_id,
        })
        .from(userTable)
        .where(eq(userTable.user_id, auth.user.user_id));

    return user.length > 0 ? user[0] : null;
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

export async function existShippingCharges(country: string) {
    const existingCharge = await db
        .select({
            country: shippingChargesTable.country,
        })
        .from(shippingChargesTable)
        .where(eq(shippingChargesTable.country, country))
        .limit(1);

    return existingCharge.length > 0;
}

export async function addShippingCharges(formData: FormData) {
    try {

        const country: string | undefined = formData.get("country")?.toString();
        const charges: string | undefined = formData.get("charges")?.toString();

        if (!country || !charges) {
            throw new Error("Country and charges are required fields.");
        }

        // Check if shipping charge for this country already exists
        const isExist = await existShippingCharges(country);
        if (isExist) {
            const updatedCharge = await db
            .update(shippingChargesTable)
            .set({
                charges,
            })
            .where(eq(shippingChargesTable.country, country))
            .returning();
            
            return NextResponse.json({
                status: 200,
                message: `Shipping charges is updated for ${country}`,
            });
        }

        const res = await db
        .insert(shippingChargesTable)
        .values({
            country: country,
            charges: charges,
        })
        .returning();
        
        return NextResponse.json({
            message: "Shipping charges added successful!",
            status: 200,
            data: res,
        })

    } catch (error) {
        if (error instanceof Error) {
            console.error ("Shipping charge error:", error.message)
            return NextResponse.json({ 
                error: error.message },
                { status: 409 }
            );
        }
    }
}

export async function getAllShippingCharges() {

    const shippingCharges = await db
        .select({
            id: shippingChargesTable.id,
            country: shippingChargesTable.country,
            charges: shippingChargesTable.charges,
            status: shippingChargesTable.status,
        })
        .from(shippingChargesTable)
        .orderBy(shippingChargesTable.id);

    return shippingCharges.length > 0 ? shippingCharges : null;
}

export async function getChargesByCountry(country: string) {
    try {
      const charges = await db
        .select({
          country: shippingChargesTable.country,
          charges: shippingChargesTable.charges,
        })
        .from(shippingChargesTable)
        .where(eq(shippingChargesTable.country, country))
        .limit(1);
  
      if (!charges || charges.length === 0) {
        return {
          status: 404,
          message: "Country not found",
        };
      }
  
      return {
        status: 200,
        data: charges,
      };
    } catch (error) {
      console.error("Database error fetching charges:", error);
      return {
        status: 500,
        message: "Server error fetching charges",
      };
    }
  }
  