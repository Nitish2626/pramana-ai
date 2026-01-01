import { auth } from "@/lib/auth";
import { chat } from "@/lib/chat";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }
    
    const { prompt } = await request.json();
    const response = await chat(prompt);
    // console.log("chat res", response);

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: response,
    });
  } catch (error) {
    console.log("B_GET_CHAT ERROR");
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !",
    });
  }
};
