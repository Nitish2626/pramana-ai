import { chat } from "@/lib/chat";
import { indexDocument } from "@/lib/prepate";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    // const filePath = "public/secret-of-vedas.pdf";
    // indexDocument(filePath);

    const { prompt } = await request.json();
    const response = await chat(prompt);
    // console.log("chat res", response);

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: response,
    });
  } catch (error) {
    console.log("Something went wrong !");
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !",
    });
  }
};
