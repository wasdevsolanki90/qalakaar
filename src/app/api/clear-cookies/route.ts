import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const uid = searchParams.get("user_id") as string;
  const setCookies = cookies();
  if (uid === setCookies.get("user_id")?.value) {
    setCookies.delete("user_id");
    console.log("cleared");
  }
  return NextResponse.json("success");
};
