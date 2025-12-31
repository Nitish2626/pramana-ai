import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ChatModel } from "../../../../../models/chatModel";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDatabase();

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    console.log("params", await params?.id);

    // if (!params?.id) {
    //   return NextResponse.json({
    //     status: 400,
    //     message: "Conversation id not found !",
    //   });
    // }

    const getChats = await ChatModel.find({
      userId: session?.user?.id,
      conversationId: await params?.id,
    });
    console.log("getchats", getChats);

    return NextResponse.json({
      status: 200,
      message: "Chats found successfully!",
      data: getChats
    });
  } catch (error) {
    console.log("B_GET_CHAT ERROR", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error !",
    });
  }
};
